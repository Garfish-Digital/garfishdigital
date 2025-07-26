# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Garfish Digital is a portfolio website built with Next.js 15, featuring a clean landing page, interactive gallery, contact form, and client authentication system. The project combines modern web technologies with a Brutalist design approach using OKLCH color spaces and Font Awesome Pro+ icons.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: JavaScript (converted from TypeScript)
- **Styling**: Tailwind CSS with OKLCH color system
- **Animations**: Framer Motion
- **Icons**: Font Awesome Pro+ Classic Regular
- **Fonts**: Cutive Mono (via Google Fonts CDN), Courier New fallback

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
  - `src/app/page.jsx` - Clean, professional landing page
  - `src/app/gallery/` - Interactive 3x3 grid portfolio showcase
  - `src/app/contact/` - Professional contact form with cycling placeholders
  - `src/app/client/` - Client authentication portal with nested sub-pages
    - `src/app/client/page.jsx` - Dashboard and authentication form
    - `src/app/client/project/page.jsx` - Project milestone tracking table
    - `src/app/client/documents/page.jsx` - Document access center
    - `src/app/client/payment/page.jsx` - Payment management interface
- `src/components/` - Reusable React components
  - `src/components/Navigation.jsx` - Context-aware navigation system
  - `src/components/Minimap.jsx` - Gallery grid navigation
- `src/config/` - Configuration files
  - `src/config/navigation.js` - Centralized navigation configuration
- `src/hooks/` - Custom React hooks
  - `src/hooks/useClientAuth.js` - Client authentication state management

### Key Pages
- **Landing Page**: Brutalist typography with clean hierarchy
- **Gallery**: Interactive 3x3 grid with dynamic navigation and demo cards
- **Contact**: Professional form with real-time validation and cycling placeholders
- **Client Portal**: Password-protected dashboard with persistent authentication
  - **Client Dashboard**: Welcome interface with navigation to sub-pages
  - **Project Page**: Comprehensive milestone tracking with scrollable table
  - **Documents Page**: Document access center with three main document types
  - **Payment Page**: Payment management interface (structure established)

### Design Philosophy
- **Brutalist Aesthetics**: Bold typography, OKLCH colors, clean geometric layouts
- **Progressive Disclosure**: Simple landing → portfolio showcase → client portal
- **Client-First UX**: Professional impression with accessible functionality
- **Context-Aware Navigation**: Icons appear/disappear based on page and authentication state

### Navigation System
- **Centralized Configuration**: All navigation items defined in `src/config/navigation.js`
- **Dynamic Visibility**: Icons filter based on page context and authentication state
- **Persistent Authentication**: Client login state persists via localStorage
- **Font Awesome Integration**: Pro+ icons with global library registration

### Color System
- **OKLCH Colors**: Modern color space with semantic naming conventions
- **CSS Variables**: `--color-black`, `--color-gray-dark`, `--color-gray-light`, `--color-green-light`, `--color-green-dark`, etc.
- **Tailwind Integration**: Custom color mapping via @theme inline syntax
- **Recent Additions**: Green color variants for enhanced UI feedback

### Authentication Flow
- **Current System**: JSON-based authentication using `src/data/clients.json`
- **Test Users**: Two clients configured ("garfish123", "robinson0430") 
- **Data Structure**: Each client has password, project name, milestones, and document paths
- **State Persistence**: localStorage-based authentication across sessions
- **Icon Enablement**: Project/Payment/Contract icons appear after authentication
- **Cross-Page Consistency**: Authentication state shared via custom hook
- **Future Migration**: Planned transition to Firebase Auth for production scalability

### Client Portal Features
- **Project Tracking**: 40+ milestone entries across 6 project phases (Discovery, Design, Development, Testing, Launch, Post-Launch)
- **Document Management**: Three document types (Scope, Agreement, Handoff) with contextual descriptions
- **Sticky Table Headers**: Optimized scrolling experience for large datasets
- **Status Indicators**: Color-coded status badges (Completed, In Progress, Pending)
- **Responsive Design**: Bottom margin spacing to accommodate navigation icons

## Development Notes

- All client-side components must include `'use client'` directive
- Framer Motion animations use staggered delays and smooth transitions
- Font Awesome icons must be imported in `src/app/layout.jsx` and added to library
- Navigation changes require updates to both `navigation.js` and `Navigation.jsx`
- Client authentication uses localStorage for persistence across sessions
- OKLCH colors provide better color space than hex/rgb for modern displays
- Component-specific CSS files used for complex styling (gallery.css, contact.css, client.css)
- Client sub-pages follow nested directory structure under `/client/`
- Input field styling now includes consistent background colors and placeholder behavior

## Client Authentication System

### Current Implementation
- **Data Source**: `src/data/clients.json` contains client credentials and project data
- **Authentication Logic**: Currently hardcoded in `src/app/client/page.jsx` (needs integration)
- **Client Data Structure**:
  ```json
  {
    "password": "unique_client_password",
    "project": "Project Name",
    "milestones": "[]", 
    "documents": {
      "scope": "/documents/client-scope.pdf",
      "agreement": "/documents/client-agreement.pdf", 
      "handoff": "/documents/client-handoff.pdf"
    }
  }
  ```

### Integration Strategy
1. **Phase 1**: Replace hardcoded password validation with `clients.json` lookup
2. **Phase 2**: Store authenticated client object (not just boolean) for personalization
3. **Phase 3**: Display client-specific project names and documents
4. **Phase 4**: Migrate to Firebase Auth for production scalability

### Future Enhancements
- **Firebase Auth**: Real user management with email verification, password reset
- **Client-Specific Content**: Dynamic project names, milestone tracking, document access
- **Enhanced Security**: Password hashing, session management, account lockout protection