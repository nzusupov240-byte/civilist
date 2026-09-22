import { site } from "@/config/site";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Advantages from "@/components/Advantages";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import ApplicationForm from "@/components/ApplicationForm";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

// Микроразметка для поисковых систем (без выдуманных данных)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: site.contacts.companyName,
  description: site.seo.description,
  areaServed: "Бишкек, Кыргызстан",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Бишкек",
    addressCountry: "KG",
  },
  url: site.seo.url,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Advantages />
        <Process />
        <CTA />
        <ApplicationForm />
        <Contacts />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
