// Same silhouette traced from the real Flowa wordmark's O — the one
// background device used across the site (brief §3.1: "one background
// device only"), never a generic gradient or grid texture.
const BLOB_PATH =
  "M-5,-62C13,-64,34,-62,48,-48C58,-38,54,-28,46,-20C36,-10,22,-12,26,-2C30,8,50,4,50,22C50,38,36,36,26,46C16,56,4,64,-12,62C-30,60,-40,50,-46,36C-54,18,-58,4,-50,-14C-44,-28,-48,-38,-38,-48C-28,-58,-18,-60,-5,-62Z";

export function DecorativeBlob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-64 -68 128 136" className={className} aria-hidden="true">
      <path d={BLOB_PATH} fill="currentColor" />
    </svg>
  );
}
