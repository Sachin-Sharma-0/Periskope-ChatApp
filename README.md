# Periscope Chat Application

A modern real-time chat application I built using Next.js and Supabase, featuring a clean and intuitive user interface.

## Features

- **User Authentication**: Secure login system with email and password
- **Real-time Messaging**: Instant message delivery with read receipts
- **Group Chat**: Create and participate in group conversations
- **Modern UI**: Clean and responsive interface built with Tailwind CSS
- **Semantic HTML**: Proper use of semantic tags for better accessibility
- **Chat Management**: Easily switch between different conversations
- **Message Status**: See when messages are delivered and read

## Tech Stack

- **Frontend**: Next.js 15.3.2 with React 19
- **Styling**: Tailwind CSS 4
- **Backend & Authentication**: Supabase
- **Icons**: React Icons
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm, yarn, pnpm, or bun

### Setup

1. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. Set up environment variables
   Create a `.env.local` file in the root directory with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Project Structure

```
├── app/
│   ├── components/       # Reusable UI components
│   ├── context/          # React context providers
│   ├── dashboard/        # Dashboard page
│   ├── lib/              # Utility functions and API clients
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Login page
├── public/               # Static assets
├── .gitignore
├── next.config.ts       # Next.js configuration
├── package.json         # Project dependencies
├── postcss.config.mjs   # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

## Future Enhancements

I'm planning to add these features in the future:

- Filters and search functionality for chats
- Chat labeling system
- Member assignment to different chats
- File attachment support (images, videos, documents)
- Offline support using IndexedDB

## Made by Sachin Sharma
