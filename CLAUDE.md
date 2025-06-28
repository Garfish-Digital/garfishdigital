# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Garfish Digital is a portfolio website built with Next.js 15, featuring a 3x3 grid navigation system. The project combines modern web technologies including Tailwind CSS for styling, Framer Motion for animations, and Three.js for 3D components.

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
- `src/components/` - Reusable React components
- `src/app/page.tsx` - Main portfolio grid page
- `src/components/Grid3D.tsx` - Three.js 3D grid component

### Key Components
- **Portfolio Grid**: 3x3 grid layout with Framer Motion animations
- **Grid3D**: Three.js component for 3D grid visualization
- Each grid item includes hover animations and scaling effects

### Design System
- **Color Scheme**: Dark theme with black background and gray accents
- **Typography**: Clean, modern font hierarchy
- **Animations**: Staggered entrance animations with hover effects
- **Responsive**: Grid adapts to different screen sizes

## Development Notes

- All client-side components must include `'use client'` directive
- Framer Motion animations use staggered delays for grid items
- Three.js components are isolated in separate files for better organization
- Tailwind utility classes are preferred over custom CSS