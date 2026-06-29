import { useState } from "react";
import { Loader } from "@/components/site/Loader";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { Process } from "@/components/site/Process";
import { Pricing } from "@/components/site/Pricing";
import { Team } from "@/components/site/Team";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Booking } from "@/components/site/Booking";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [presetService, setPresetService] = useState(null);

  const openBooking = (service) => {
    if (typeof service === "string") setPresetService(service);
    else setPresetService(null);
    setBookingOpen(true);
  };

  return (
    <main data-testid="home-page" className="min-h-screen bg-background text-foreground">
      <Loader />
      <Navbar onBook={() => openBooking()} />
      <Hero onBook={() => openBooking()} />
      <Marquee />
      <About />
      <Services onBook={openBooking} />
      <Gallery />
      <Process />
      <Pricing onBook={openBooking} />
      <Team />
      <Testimonials />
      <FAQ />
      <Contact onBook={() => openBooking()} />
      <Footer />
      <Booking
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedService={presetService}
      />
    </main>
  );
}
