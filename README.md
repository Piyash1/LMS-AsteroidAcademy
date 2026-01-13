# 🚀 Asteroid Academy

Asteroid Academy is a modern, full-stack Learning Management System (LMS) designed for a premium learning experience. Built with a focus on speed, aesthetics, and user engagement.

![Dashboard Preview](https://moniruzzamanpiyash.netlify.app/assets/img/hero-img.png)
_Note: Add your own platform screenshot here_

## ✨ Features

- **🎓 Student Dashboard**: Track your enrolled courses and progress with a clean, intuitive interface.
- **🛠️ Admin Panel**: Robust course creation and management tools for administrators.
- **📱 Fully Responsive**: Optimized for every screen size—from mobile phones to desktop monitors.
- **🎉 Interactive UX**: Delightful user interactions with confetti bursts on lesson completion and instant toast notifications.
- **🔒 Secure Auth**: Advanced authentication powered by `better-auth`, featuring email OTP and admin-level protection.
- **🧭 Smart Navigation**: Dynamic breadcrumbs and intelligent redirects after sign-in.
- **⚡ Performance**: Built on Next.js 15 for lightning-fast server-side rendering and static generation.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) & [Shadcn UI](https://ui.shadcn.com)
- **Database**: [PostgreSQL](https://www.postgresql.org) with [Prisma ORM](https://www.prisma.io)
- **Auth**: [Better-Auth](https://better-auth.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Validation**: [Zod](https://zod.dev) & [React Hook Form](https://react-hook-form.com)
- **Animations**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- **Notifications**: [Sonner](https://sonner.stevenly.me)

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- PostgreSQL database
- `pnpm` (recommended)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/piyash1/asteroid-academy.git
   cd asteroid-academy
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file based on the `.env.example` provided in the root directory.

4. **Initialize Database:**

   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Run the development server:**
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application locally.

## 📄 License & Attribution

This project was created with ❤️ by [Moniruzzaman Piyash](https://moniruzzamanpiyash.netlify.app/).

---

_Built for the future of learning._
