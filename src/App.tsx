import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollManager } from "@/components/ScrollManager";
import { HomePage } from "@/pages/HomePage";
import { ServicesHubPage } from "@/pages/ServicesHubPage";
import { ServicePage } from "@/pages/ServicePage";
import { CasesPage } from "@/pages/CasesPage";
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
            <Route path="/services/:slug" element={<ServiceRoute />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
