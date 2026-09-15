import { useEffect, useRef, useState } from "react";
import { LiquidForm } from "./LiquidForm";

/**
 * The hero's living object: a raymarched glass form rendered in WebGL.
 * One sphere, deformed by slow 3D noise, lit by a synthetic environment
 * in Flowa's palette (deep orange below, cream and slate above) that is
 * refracted through the body with a little chromatic split, reflected at
 * the rim (Fresnel) and given two specular highlights. ~4 KB of shader,
 * no library.
 *
 * Costs are kept in check: renders only while on screen and the tab is
 * visible, pixel ratio capped (1.5 desktop, 1 mobile), 30 fps on small
 * screens. prefers-reduced-motion renders a single still frame. Without
 * WebGL the CSS LiquidForm stands in.
 */
const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const FRAG = `
precision highp float;
uniform vec2 uRes;uniform float uTime;uniform vec2 uMouse;uniform float uPulse;uniform float uDark;
float hash(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float noise(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
 return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
            mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
float sdf(vec3 p){float t=uTime*.11;float d=length(p)-1.;
 float n=noise(p*1.5+vec3(t,t*.7,-t*.5))-.5;float n2=noise(p*3.1-vec3(t*.8,t*.4,t))-.5;
 return d+n*.26+n2*.06;}
vec3 nrm(vec3 p){vec2 e=vec2(.0025,0.);return normalize(vec3(sdf(p+e.xyy)-sdf(p-e.xyy),sdf(p+e.yxy)-sdf(p-e.yxy),sdf(p+e.yyx)-sdf(p-e.yyx)));}
vec3 env(vec3 d){float y=d.y*.5+.5;
 vec3 deep=vec3(.79,.45,.12),warm=vec3(.93,.62,.28),cream=vec3(.98,.975,.965),slate=vec3(.43,.44,.47);
 vec3 ink=vec3(.07,.066,.063),inkSoft=vec3(.16,.15,.14);
 vec3 c=mix(deep,warm,smoothstep(0.,.30,y));c=mix(c,mix(cream,inkSoft,uDark),smoothstep(.30,.50,y));c=mix(c,mix(slate,ink,uDark),smoothstep(.78,1.,y));
 c+=vec3(1.,.96,.88)*pow(max(dot(d,normalize(vec3(-.5,.85,.3))),0.),28.)*(.6+uPulse*.9);return c;}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*uRes)/min(uRes.x,uRes.y);
 vec3 ro=vec3(uMouse.x*.22,uMouse.y*.16,3.4);vec3 rd=normalize(vec3(uv,-1.02)-vec3(uMouse.x*.05,uMouse.y*.035,0.));
 float t=0.,d=1.,md=1.;bool hit=false;
 for(int i=0;i<72;i++){vec3 p=ro+rd*t;d=sdf(p);md=min(md,d);if(d<.0015){hit=true;break;}t+=d*.75;if(t>6.)break;}
 if(!hit){float a=1.-smoothstep(0.,.012,md);vec3 rim=vec3(.99,.86,.66);gl_FragColor=vec4(rim*a,a);return;}
 vec3 p=ro+rd*t;vec3 n=nrm(p);
 float fres=pow(1.-max(dot(-rd,n),0.),3.);
 vec3 r1=refract(rd,n,1./1.44),r2=refract(rd,n,1./1.47),r3=refract(rd,n,1./1.50);
 float t2=.02;for(int i=0;i<20;i++){float dd=-sdf(p+r2*t2);if(dd<.002)break;t2+=dd*.9;}
 float thick=clamp(t2/2.4,0.,1.);
 vec3 refr=vec3(env(r1).r,env(r2).g,env(r3).b);
 vec3 col=refr*mix(vec3(1.),vec3(.96,.76,.50),thick*.6);
 col=mix(col,env(reflect(rd,n)),fres*.85);
 vec3 h=normalize(normalize(vec3(-.6,.9,.5))-rd);col+=vec3(1.,.97,.9)*pow(max(dot(n,h),0.),160.)*.8;
 h=normalize(normalize(vec3(.7,-.35,.6))-rd);col+=vec3(1.,.85,.6)*pow(max(dot(n,h),0.),70.)*.35;
 col+=vec3(1.,.9,.75)*pow(fres,2.)*(.3+uPulse*.5);
 gl_FragColor=vec4(col,1.);
}`;

/**
 * `tone` — "light" over the page, "dark" inside the ink band. `still`
 * renders one frame and stops (a brand mark, not a performance cost).
 * The object also listens for `flowa:booked` (dispatched by the pipeline
 * panel when a row reaches "Meeting booked") and brightens briefly: the
 * flow and the system are one thing.
 */
export function FluidObject({ className = "", tone = "light", still = false, frame: stillFrame }: { className?: string; tone?: "light" | "dark"; still?: boolean; frame?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: "low-power" });
    if (!gl) {
      setFailed(true);
      return;
    }
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader");
      return s;
    };
    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
    } catch {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(a);
    gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uPulse = gl.getUniformLocation(prog, "uPulse");
    const uDark = gl.getUniformLocation(prog, "uDark");
    gl.uniform1f(uDark, tone === "dark" ? 1 : 0);
    let pulseAt = -10;
    const onBooked = () => (pulseAt = performance.now());
    window.addEventListener("flowa:booked", onBooked);

    const small = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5);

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (0.5 - e.clientY / window.innerHeight) * 2;
    };
    if (!small && !reduced) window.addEventListener("mousemove", onMove, { passive: true });

    const draw = (t: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      const age = (performance.now() - pulseAt) / 1400;
      gl.uniform1f(uPulse, age < 1 ? Math.sin(age * Math.PI) : 0);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let raf = 0;
    let last = 0;
    const start = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      if (small && now - last < 33) return; // 30 fps on small screens
      last = now;
      draw((now - start) / 1000 + 7);
    };
    if (reduced || still) draw(stillFrame ?? (tone === "dark" ? 11 : 7));
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("flowa:booked", onBooked);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [tone, still, stillFrame]);

  if (failed) return <LiquidForm className={className} />;
  return <canvas ref={ref} className={`pointer-events-none block ${className}`} aria-hidden="true" />;
}
