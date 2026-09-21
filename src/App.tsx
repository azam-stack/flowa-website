import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollManager } from "@/components/ScrollManager";
import { HomePage } from "@/pages/HomePage";
import { ServicesHubPage } from "@/pages/ServicesHubPage";
import { ServicePage } from "@/pages/ServicePage";
import { CasesPage } from "@/pages/CasesPage";
import { PricingPage } from "@/pages/PricingPage";
import { WhyFlowaPage } from "@/pages/WhyFlowaPage";
import { LegalPage } from "@/pages/LegalPage";
import { legalDocs } from "@/content/legal";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { getService } from "@/content/services";

/** /services/:slug renders the template for any live service in the registry; anything else is a 404. */
function ServiceRoute() {
  const { slug } = useParams();
  const service = getService(slug);
  return service ? <ServicePage key={service.slug} service={service} /> : <NotFoundPage />;
}

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <BrowserRouter basename={basename}>
      <ScrollManager />
      <div className="min-h-screen overflow-x-hidden bg-bg text-fg">
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesHubPage />} />
            {/* Cold calling is no longer a service. The page is retired, not deleted:
                the URL keeps working and sends people to the page that replaced it.
                GitHub Pages cannot issue a real 301, so the prerendered HTML carries
                a canonical and a meta refresh and the router redirects in-app. */}
            <Route path="/services/cold-calling" element={<Navigate to="/why-flowa" replace />} />
            <Route path="/services/:slug" element={<ServiceRoute />} />
            <Route path="/why-flowa" element={<WhyFlowaPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/cases" element={<CasesPage />} />
            {/* Privacy, cookies, terms and refunds all render from one template. */}
            {legalDocs.map((doc) => (
              <Route key={doc.slug} path={`/${doc.slug}`} element={<LegalPage doc={doc} />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
