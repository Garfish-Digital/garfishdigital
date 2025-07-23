# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Garfish Digital is a portfolio website built with Next.js 15, featuring a clean landing page and an interactive gallery section. The project combines modern web technologies including Tailwind CSS for styling and Framer Motion for animations.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/app/page.tsx` - Clean, professional landing page
- `src/app/gallery/` - Portfolio demos and interactive experiences
- `src/app/contact/` - Contact form page
- `src/components/` - Reusable React components

### Key Pages
- **Landing Page**: Clean, minimal design showcasing professionalism first
- **Gallery**: Interactive 3x3 grid navigation showcasing portfolio projects
- **Contact**: Professional contact form with animated placeholders

### Design Philosophy
- **Progressive Disclosure**: Simple landing → portfolio showcase
- **Client-First UX**: Professional impression first, technical capability second
- **Clean Architecture**: Streamlined components with focused functionality

### Components
- **Minimap**: Dynamic navigation component for gallery grid navigation

## Development Notes

- All client-side components must include `'use client'` directive
- Framer Motion animations use staggered delays and smooth transitions
- Tailwind utility classes are preferred over custom CSS
- Component-specific CSS files are used for complex styling (gallery.css, contact.css)