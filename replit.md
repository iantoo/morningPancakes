# Morning Glory Pancake Delivery Service

## Overview

This is a full-stack web application for ordering fresh pancakes for delivery to hostels. The application features a React frontend with a modern UI using shadcn/ui components, an Express.js backend with REST API endpoints, and PostgreSQL database integration using Drizzle ORM. The system allows users to select hostels, flavors, and place orders with a clean, responsive interface.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theming for pancake-themed colors
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod schemas shared between frontend and backend
- **Session Management**: PostgreSQL session store ready (connect-pg-simple)

### Database Design
- **Primary Database**: PostgreSQL via Neon Database serverless
- **Tables**: 
  - `orders` - Customer orders with hostel, room, flavors, and contact info
  - `hostels` - Available delivery locations
  - `flavors` - Available pancake flavors with emojis
- **Migrations**: Drizzle Kit for schema management

## Key Components

### Data Models
- **Orders**: Include hostel selection, room number, quantity, flavor selection, customer details, and order total
- **Hostels**: Predefined delivery locations with display names and values
- **Flavors**: Pancake varieties with names, values, and emoji representations

### API Endpoints
- `GET /api/hostels` - Retrieve available hostels
- `GET /api/flavors` - Retrieve available pancake flavors  
- `POST /api/orders` - Create new pancake order
- `GET /api/orders/:id` - Retrieve specific order details

### Frontend Features
- Responsive pancake-themed landing page with order form
- Multi-flavor selection with visual emoji indicators
- Quantity controls with increment/decrement buttons
- Form validation with real-time feedback
- Toast notifications for order confirmations
- Mobile-optimized interface

## Data Flow

1. **Page Load**: Frontend fetches hostels and flavors from API
2. **Form Interaction**: User selects hostel, room, quantity, and flavors
3. **Validation**: Client-side validation using shared Zod schemas
4. **Order Submission**: POST request to `/api/orders` with validated data
5. **Storage**: Backend validates and stores order in PostgreSQL
6. **Confirmation**: Success response triggers toast notification

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: Via `@neondatabase/serverless` driver

### UI Components
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first styling

### Development Tools
- **Replit Integration**: Cartographer plugin and error overlay for development
- **TypeScript**: Type safety across the stack

## Deployment Strategy

### Development
- Vite dev server for frontend hot reloading
- tsx for TypeScript execution in development
- Concurrent frontend and backend development

### Production Build
1. Frontend: Vite builds React app to `dist/public`
2. Backend: esbuild bundles Express server to `dist/index.js`
3. Static files served from Express in production

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)

## Changelog
- July 04, 2025. Initial setup
- July 04, 2025. Implemented two-page website with Morning Glory color palette
  - Added About page (/about) with comprehensive business information
  - Updated color scheme to Morning Glory palette: Sunrise Orange, Lemon Yellow, Cream White, Strawberry Pink, Maple Brown, Mint Green
  - Added navigation between home and about pages
  - Redesigned UI with new color scheme throughout the application

## Recent Changes
- **Playful, artistic redesign**: Complete overhaul with animated landing page and engaging order form
- **Two-page experience**: Welcoming landing page + dedicated order page with smooth animations
- **Morning Glory color palette**: Bright, warm colors creating joyful breakfast experience
- **Advanced animations**: Framer Motion integration with floating elements, sparkles, and smooth transitions
- **Enhanced UX**: Large rounded cards, playful interactions, and memorable visual elements
- **Individual flavor quantities**: Customers can select different amounts per flavor
- **WhatsApp integration**: Orders sent to +254794056800

## User Preferences

Preferred communication style: Simple, everyday language.
Design preference: Morning Glory color palette with warm, cheerful tones.