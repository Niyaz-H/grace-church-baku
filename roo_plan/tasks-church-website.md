# Church Website Project Tasks

This file outlines the tasks for creating the Grace Church Baku website.

## Phase 1: Initial Setup & Design

- [x] **Set up Next.js project:** Initialize a new Next.js project with TypeScript and Tailwind CSS.
- [x] **Design initial layout:** Create a basic layout including a header, main content area, and footer.
- [x] **Implement theme switching:** Add a light/dark theme toggle.
- [x] **Create reusable components:** Build basic UI components like buttons, cards, and navigation elements.

## Phase 2: Content & Feature Implementation

- [x] **Add Hero Section:** Create a compelling hero section with a background image and call-to-action buttons.
- [x] **Add Mission Section:** Detail the church's mission and vision.
- [x] **Add Service Times Section:** Display the weekly service schedule.
- [x] **Add Sermons Section:** Include an audio player and a library of recent sermons.
- [x] **Add Testimonials Section:** Feature quotes from church members.
- [x] **Add Events Section:** List upcoming events with filtering and search functionality.
- [x] **Add Needs Section:** Outline the church's current needs and how to support them.
- [x] **Add Contact Section:** Provide a contact form and detailed contact information.
- [x] **Implement Footer:** Design and implement the website footer.
- [x] **Add animated link underlines:** Add a sliding underline animation to all clickable links.
- [x] **Implement theme-aware Google Map:** Make the embedded Google Map switch styles based on the current theme.

## Phase 3: Internationalization (i18n)

- [x] **Extract all text strings:** Go through the codebase and extract all hardcoded text into a single file.
- [x] **Create translation files:** Create `en.json`, `az.json`, and `ru.json` files with the extracted text.
- [x] **Translate content:** Translate the English text into Azerbaijani and Russian.
- [x] **Implement LanguageContext:** Create a React context to manage the application's language state.
- [x] **Refactor components:** Replace all hardcoded text with the `useTranslation` hook.
- [x] **Update language selector:** Wire up the language toggle to switch the active language.
- [x] **Set default language:** Configure Azerbaijani as the default language.

## Phase 4: Final Touches & Deployment

- [ ] **Optimize for performance:** Improve loading times and overall performance.
- [ ] **Ensure responsiveness:** Test and refine the website's appearance on all devices.
- [ ] **SEO optimization:** Add meta tags and other SEO improvements.
- [ ] **Deploy to Vercel:** Deploy the finished website to a hosting provider.