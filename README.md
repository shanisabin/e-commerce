# Nike E-Commerce Store

A premium Nike-inspired e-commerce platform built with Next.js, featuring a smooth, animated shopping experience and a robust authentication flow.

---

## 🚀 Setup Instructions

Follow these steps to get the project running locally:

### 1. Prerequisite
Ensure you have **Node.js (v18+)** and **npm** installed on your system.

### 2. Clone and Install
```bash
git clone <repository-url>
cd e-commerce
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add the following:
```env
NEXT_PUBLIC_API_BASE_URL=https://skilltestnextjs.evidam.zybotechlab.com
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🛠 Tech Decisions

### ⚡ Framework: Next.js (App Router)
Chosen for its robust Server-Side Rendering (SSR) capabilities, optimized routing, and excellent SEO performance. The App Router allows for efficient data fetching at the component level.

### 🎨 Styling: Tailwind CSS
Used to implement a premium, dark-themed UI with maximum flexibility. Tailwind's utility-first approach ensures consistent spacing and typography while maintaining a small CSS bundle size.

### ✨ Animations: GSAP (GreenSock Animation Platform)
Integrated in the `ProductCard` and other interactive elements to provide high-performance, complex animations that standard CSS transitions can't easily handle, enhancing the "premium" feel.

### 🏪 State Management: Zustand
A lightweight, fast, and scalable state management solution used primarily for handling User Authentication (tokens) across the application. It provides a cleaner API compared to Redux or Context API for this use case.

### 🔐 Authentication Flow
Implemented a secure **Phone + OTP** login system. 
- **Session Management**: JWT tokens are stored in secure cookies (`access`) and synced with the Zustand store for client-side accessibility.
- **Route Protection**: Next.js Middleware is utilized to protect `/profile` and other authenticated routes.

### 📡 Data Fetching: Native Fetch + apiFetch Wrapper
Standardized API calls using a custom `apiFetch` wrapper in `lib/api.ts`. This ensures consistent error handling, automatic base URL injection, and standardized JSON parsing across all services.

### 📦 Modular Architecture
Organized into clear service layers (`services/`) and reusable components (`components/`), adhering to the "Separation of Concerns" principle to ensure the codebase remains maintainable as it scales.

---

## 📱 Features
- **Dynamic Product Grid**: Real-time fetching from the backend API.
- **Variation Support**: Dynamic switching between product colors and sizes with instant image updates.
- **Order History**: Personalized profile page showing purchase history with precise date formatting.
- **Success Tracking**: Dedicated order success page with summarized order details.
