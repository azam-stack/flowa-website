import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnnouncementBar } from "@/components/frank/AnnouncementBar";
import { ChatWidget } from "@/components/frank/ChatWidget";
import { Footer } from "@/components/frank/Footer";
import { Nav } from "@/components/frank/Nav";
import { ScrollManager } from "@/components/ScrollManager";
import { nav } from "@/content/frank/chrome";
import { legalDocs } from "@/content/legal";
import { AboutPage } from "@/pages/frank/AboutPage";
import { CasesPage } from "@/pages/frank/CasesPage";
import { ChannelPage } from "@/pages/frank/ChannelPage";
import { ContactPage } from "@/pages/frank/ContactPage";
import { FaqPage } from "@/pages/frank/FaqPage";
import { FrankPage } from "@/pages/frank/FrankPage";
import { HomePage } from "@/pages/frank/HomePage";
import { HowItWorksPage } from "@/pages/frank/HowItWorksPage";
import { NotFoundPage } from "@/pages/frank/NotFoundPage";
import { PricingPage } from "@/pages/frank/PricingPage";
import { SignalsPage } from "@/pages/frank/SignalsPage";
import { LegalPage } from "@/pages/LegalPage";
import { redirects } from "../scripts/routes";

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <BrowserRouter basename={basename}>
      <ScrollManager />
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-page text-ink-2">
        <a href="#main" className="sr-only z-[90] rounded-control bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          {nav.skipToContent}
        </a>
        <header className="sticky top-0 z-50">
          <AnnouncementBar />
          <Nav />
        </header>
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/frank" element={<FrankPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/signals" element={<SignalsPage />} />
            <Route path="/channels/email" element={<ChannelPage channel="email" />} />
            <Route path="/channels/linkedin" element={<ChannelPage channel="linkedin" />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/demo" element={<ContactPage mode="demo" />} />
            <Route path="/contact" element={<ContactPage mode="contact" />} />
            <Route path="/faq" element={<FaqPage />} />
            {/* Privacy, cookies, terms and refunds all render from one template, wording unchanged. */}
            {legalDocs.map((doc) => (
              <Route key={doc.slug} path={`/${doc.slug}`} element={<LegalPage doc={doc} />} />
            ))}
            {/* Old URLs redirect inside the draft (brief §5). The prerender writes a static stand-in for each. */}
            {redirects.map((r) => (
              <Route key={r.from} path={r.from} element={<Navigate to={r.to} replace />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </BrowserRouter>
  );
}
