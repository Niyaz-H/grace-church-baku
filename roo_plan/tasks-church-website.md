# Engineering Task List: Grace Church Baku Website

This document breaks down the work required to build the Grace Church Baku website, based on the `prd-church-website.md`.

## Phase 1: Landing Page (MVP) - Completed & Enhanced

### 1.  **Project Setup**
    -   [x] Initialize a new Next.js project with TypeScript and Tailwind CSS.
    -   [x] Set up the basic project structure with `src` directory.
    -   [x] Install necessary dependencies like `framer-motion`, `lucide-react`, and `shadcn/ui`.

### 2.  **Header & Footer**
    -   [x] Create a responsive header with the church logo, navigation links, and a language switcher placeholder.
    -   [x] Create a footer with contact information, social media links, and copyright notice.
    -   [x] Update header and footer to use the official logo.

### 3.  **Hero Section**
    -   [x] Create the hero section with a high-quality background image/video.
    -   [x] Add the main headline and tagline.
    -   [x] Update hero section with new church description.

### 4.  **"New Here? / Plan Your Visit" Section**
    -   [x] Create the layout for the "Plan Your Visit" section, ensuring it is highly visible.
    -   [x] Add service times and location details.
    -   [x] Embed a mobile-friendly map (e.g., Google Maps).
    -   [x] Update map with correct address.
    -   [x] Add a "What to Expect" text block.
    -   [x] Add a "Plan Your Visit" button linking to the contact form.

### 5.  **Core Content Sections**
    -   [x] Create the "About Us (Mission & Beliefs)" section.
    -   [x] Create the "Latest Sermon" section with a high-quality thumbnail, title, speaker, and a "Watch Now" button.
    -   [x] Create the "Community (Stories)" section with a placeholder for a member photo and a quote.
    -   [x] Create the "Events & Announcements" section.
    -   [ ] **New:** Create "Our Mission" section.
    -   [ ] **New:** Create "Our Work" section (Bible distribution, discipleship, church planting).
    -   [ ] **New:** Enhance "Community" section to a full "Testimonies" section.
    -   [ ] **New:** Create "Our Needs / How to Help" section.

### 6.  **Contact Form & Information**
    -   [x] Create the HTML structure for the contact form.
    -   [x] Add basic styling to the form.
    -   [x] Implement front-end validation (e.g., for email format).
    -   [x] Create a `contacts.json` file to store contact and social media information.
    -   [x] Update the contact section to use data from `contacts.json`.
    -   [x] Make contact information (phone, email) clickable.
    -   [x] Add social media links (Facebook, YouTube, Instagram, TikTok).

### 7.  **Styling & Theming**
    -   [x] Create a primary CSS file (`globals.css`).
    -   [x] Define the color palette, typography, and button styles using CSS variables for theming.
    -   [x] Apply styles to all sections of the landing page using Tailwind CSS.
    -   [x] Implement dark mode support.
    -   [x] Fix theme toggle icon visibility.
    -   [x] Fix button colors in dark mode.
    -   [x] Fix contact form field visibility in light mode.

### 8. **Mobile Responsiveness & UI Fixes**
    -   [x] Implement a mobile-first approach in the CSS.
    -   [x] Use media queries to adjust layouts for tablet and desktop screen sizes.
    -   [x] Ensure navigation is mobile-friendly (e.g., a hamburger menu).
    -   [x] Fix play/pause icon size and centering.
    -   [x] Fix community paging dot visibility.
    -   [x] Add search icon to the search box.
    -   [x] Fix events filter scroll issue.
    -   [x] Test and verify the design on a range of mobile device sizes.

### 9.  **Deployment & Git**
    -   [x] Push the project to the "Niyaz-H" GitHub repository.
    -   [x] Create the first commit.
    -   [ ] Deploy the initial static landing page to Vercel.

## Phase 2: Full-Featured Website

### 10.  **Backend & CMS Setup**
    -   [ ] Connect Supabase for database and authentication.
    -   [ ] Create database tables for sermons, events, blogs, testimonies, etc.
    -   [ ] Implement user authentication for the Admin Dashboard.

### 11. **Content-Managed Features**
    -   [ ] **About Us (Expanded):**
        -   [ ] Create a detailed "Our Beliefs" page.
        -   [ ] Create a "Leadership" page to introduce pastors and leaders.
        -   [ ] Create an "Our History" page.
    -   [ ] **Sermon Archive:**
        -   [ ] Create a dedicated, searchable page for all sermon recordings.
        -   [ ] Implement synchronization with the Grace Church Baku YouTube channel.
    -   [ ] **Events Calendar:**
        -   [ ] Create a full calendar page for all church events.
        -   [ ] Add filtering options (e.g., by ministry).
    -   [ ] **Ministries Pages:**
        -   [ ] Create a page for Children's Ministry (RESkids).
        -   [ ] Create a page for Youth Ministry (RESstudents).
        -   [ ] Create a page for Community Groups.
        -   [ ] Create a page for Missions & Outreach.
    -   [ ] **Resources:**
        -   [ ] **Daily Devotionals Blog:** Create a blog for daily messages.
        -   [ ] **Daily Bible Readings:** Create a resource page with passages in all three languages.
    -   [ ] **