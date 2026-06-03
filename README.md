Student Dashboard
Overview

Student Dashboard is a modern learning analytics dashboard built as part of the Frontend Intern Challenge. The application helps students track course progress, visualize study activity, and monitor learning performance through an interactive and responsive interface.

Tech Stack
Next.js 15 (App Router)
TypeScript
Tailwind CSS
Framer Motion
Supabase
Lucide React Icons
Features
Responsive Bento Grid Dashboard
Sidebar Navigation
Dynamic Course Progress Cards
Learning Activity Heatmap
Smooth Animations using Framer Motion
Dark Theme UI
Supabase Database Integration
Loading States and Skeleton Components
Architecture Decisions

The application follows a component-based architecture to improve maintainability and reusability.

The UI is divided into independent components such as:

Sidebar
Hero Tile
Activity Tile
Course Tiles
Bento Layout Components

Reusable UI components were created to keep the code modular and easy to extend.

Supabase is used as the backend service for storing and retrieving dashboard data.

Server / Client Component Split

Next.js App Router was used to separate rendering responsibilities.

Server Components

Server Components are used for:

Initial page rendering
Data fetching
Improved performance
Reduced client-side JavaScript
Client Components

Client Components are used for:

Framer Motion animations
Interactive dashboard elements
Activity heatmap interactions
State management using React hooks

This approach helps balance performance and user experience.

Challenges Faced
1. Activity Heatmap Implementation

Creating a GitHub-style heatmap required organizing activity data into weekly and monthly groups while maintaining proper alignment across different months.

2. Responsive Dashboard Layout

Designing a dashboard that works across desktop, tablet, and mobile devices required careful layout planning and responsive styling.

3. Supabase Integration

Managing environment variables, database connectivity, and fallback handling was an important part of the implementation.

4. Deployment

The application was deployed on Vercel and configured with Supabase environment variables for production usage.

Environment Variables

Create a .env.local file and add the following variables:

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

Running Locally

Install dependencies:

npm install

Start the development server:

npm run dev

Open:

http://localhost:3000

Deployment

The project is deployed using Vercel.

Author

Suhani Jha