# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Garfish Digital is a portfolio website built with Next.js 15, featuring a clean landing page with advanced interactive demos in the gallery section. The project combines modern web technologies including Tailwind CSS for styling, Framer Motion for animations, and sophisticated navigation systems.

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
- **3D Graphics**: Three.js with @react-three/fiber and @react-three/drei

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/app/page.tsx` - Clean, professional landing page
- `src/app/gallery/` - Portfolio demos and interactive experiences
- `src/app/gallery/interactive-nav/` - Advanced scroll navigation demo
- `src/components/` - Reusable React components

### Key Pages
- **Landing Page**: Clean, minimal design showcasing professionalism first
- **Gallery Demos**: Advanced interactive experiences that demonstrate technical capabilities
- **Interactive Navigation Demo**: Multi-directional scroll system with atmospheric backgrounds

### Design Philosophy
- **Progressive Disclosure**: Simple landing → complex demos
- **Client-First UX**: Professional impression first, technical wizardry second
- **Clean Architecture**: Sophisticated features isolated in dedicated demo pages

### Components
- **Minimap**: Dynamic navigation component with corner positioning
- **BackgroundSwitcher**: Image cycling with atmospheric filter testing
- **Grid3D**: Three.js components for 3D visualization

### CSS Filter System
- Filter testing available in `src/app/globals.css`
- `.grid-background` class for atmospheric background effects
- Spooky/atmospheric presets: Haunted, Nightmare, Shadow, Toxic, Ethereal

## Development Notes

- All client-side components must include `'use client'` directive
- Framer Motion animations use staggered delays and smooth transitions
- Background images for demos go in `/public/backgrounds/`
- Filter effects can be tested by editing globals.css
- Tailwind utility classes are preferred over custom CSS