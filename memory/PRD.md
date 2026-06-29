# Beautymanntra Unisex Salon & Spa — PRD

## Problem Statement (original)
Award-winning, high-end, fully animated cinematic website for **Beautymanntra Unisex Salon & Spa** (Vadodara, Gujarat — rating 4.6 / 1,012 reviews, phone 0265 225 0077). Dark luxury theme. Marketing site + online appointment booking with available time slots.

## Architecture
- **Frontend**: React 19 + Tailwind + shadcn/ui, Framer Motion for cinematic animations, lucide-react icons.
- **Backend**: FastAPI + Motor (MongoDB) — bookings, slots, newsletter, services catalogue.
- **Theme**: Dark luxury (#0c0a09 background, #C29F72 champagne primary). Cormorant Garamond + Outfit fonts.

## User Personas
1. **First-time guest** — browses services, gallery, pricing → books appointment.
2. **Bridal lead** — explores bridal package, reads FAQ, calls or books trial.
3. **Returning client** — uses navbar Book Now to reserve next visit quickly.

## Core Requirements (static)
- Premium loader, cinematic hero with parallax + particles.
- All sections from brief: About, Services (interactive cards + dialog), Gallery (masonry), Process, Pricing, Team, Testimonials, FAQ, Contact + Map, Footer with newsletter.
- Booking flow: date picker (next 14 days), live slot availability from backend, confirmation in-app.
- Magnetic CTAs, marquee, animated counters, scroll-triggered reveals.

## Implemented (Feb 2026)
- Full marketing site with 12+ sections, dark luxury aesthetic.
- Backend endpoints: `GET /api/`, `GET /api/slots?date=`, `POST /api/bookings`, `GET /api/bookings`, `POST /api/newsletter`, `GET /api/services`.
- MongoDB collections: `bookings`, `newsletter`.
- Booking dialog with date+slot picker, real-time availability, success state.
- Newsletter signup in footer.
- Map embed with dark filter, click-to-call, social links.

## Backlog
- **P1**: Email confirmation for bookings (needs Resend/SendGrid key).
- **P1**: Admin panel to view/cancel bookings.
- **P2**: WhatsApp click-to-chat float button.
- **P2**: Real Instagram feed for gallery.
- **P2**: Before/after slider for portfolio.
- **P2**: Multi-language (Hindi/Gujarati) toggle.
- **P3**: Blog/CMS, payments, analytics dashboard.
