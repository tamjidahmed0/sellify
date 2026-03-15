# Sellify — Modern E-Commerce Platform

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

A full-stack e-commerce web application built with **Next.js** and **NestJS**, featuring a seamless shopping experience with product discovery, cart management, order tracking, and more.

---

##  Live Demo

> https://sellify-pi.vercel.app/

---

##  Features

-  **User Authentication** — Register, login with JWT-based auth
-  **Product Listing & Search** — Browse and filter products by category
-  **Cart & Checkout** — Add to cart, manage quantities, place orders
-  **Payment Integration** — Secure online payments via Stripe
-  **Order Management** — Track order status and history
-  **Reviews & Ratings** — Leave reviews and rate purchased products
-  **Image Uploads** — Product images hosted on Cloudinary
-  **Responsive Design** — Fully mobile-friendly UI
-  **Admin Panel** *(Coming Soon)* — Manage products, orders, and users

---

##  Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| [Next.js 16+](https://nextjs.org/) | React framework with App Router |
| [Ant Design](https://ant.design/) | UI component library |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Lucide React](https://lucide.dev/) | Icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| [NestJS](https://nestjs.com/) | Node.js backend framework |
| [Prisma ORM](https://www.prisma.io/) | Database ORM |
| [Cloudinary](https://cloudinary.com/) | Image storage & management |
| [JWT](https://jwt.io/) | Authentication |



##  Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn
- Backend server running ([sellify-server](https://github.com/tamjidahmed0/sellify-server))

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/tamjidahmed0/sellify.git
cd sellify
```

**2. Install dependencies**
```bash
npm install
```

**3. Setup environment variables**

Create a `.env.local` file in the root:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_STRIPE_PROMISE = pk_test*******
```

**4. Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔗 Related Repository

- **Backend (NestJS):** [sellify-server](https://github.com/tamjidahmed0/sellify-server)

---

##  Screenshots

> Screenshots will be added soon.


##  Author

**Md Tamjid Ahammed**
- Email: tamjidahmed050@gmail.com
- LinkedIn: [tamjidahmedofficial](https://linkedin.com/in/tamjidahmedofficial)
