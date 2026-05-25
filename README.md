# 🛒 Modern E-Commerce Platform

A fully functional, highly interactive, and responsive E-Commerce web application built with **React.js** and **Vite**. This project offers a seamless shopping experience featuring dynamic product filtering, a user dashboard, a comprehensive shopping cart, and more.

## 🚀 Live Demo
**[View Live Project - Onsus E-Commerce](https://onsus-orcin.vercel.app/)**

## 🌟 Key Features
- **Dynamic Product Browsing:** Extensive filtering (by price, category, etc.), sorting, and searching.
- **Interactive Product Cards:** Hover effects, Quickview modal, Add to Cart, Wishlist, and Compare capabilities.
- **Shopping Cart & Checkout Flow:** Real-time cart updates, sidebar cart, and precise total calculations.
- **User Dashboard:** Dedicated pages for user account management, orders history, and address settings.
- **Fully Responsive:** Pixel-perfect design adapted for desktops, tablets, and mobile devices.
- **State Management:** Efficient global state handling using React Context API for Cart, Auth, and Notifications (Toasts).
- **Multiple Layouts:** Diverse home page variations and customizable headers/footers.

## 🛠️ Tech Stack
- **Frontend Framework:** React.js
- **Build Tool:** Vite ⚡
- **Styling:** SCSS/Sass, Bootstrap
- **State Management:** React Context API & `useReducer`
- **Sliders/Carousels:** Swiper.js, React Slick
- **Animations:** Animate.css, WOW.js

## 📂 Folder Structure Highlights
```text
src/
├── components/       # Reusable UI components (Headers, Footers, Modals, Product Cards)
├── context/          # React Contexts (AuthContext, Context, ToastContext)
├── data/             # Static data & mocks (products, blogs, collections)
├── pages/            # View components (Home, Shop, Dashboard, Product Details)
├── reducer/          # Complex state logic (e.g., filterReducer)
├── utlis/            # Utility functions and helpers
├── App.jsx           # Main application component
└── main.jsx          # Entry point
```

## 💻 Getting Started (Local Setup)

To get a local copy up and running, follow these simple steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v14 or higher) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/onsus-e-commerce.git
   ```
2. Navigate to the project directory:
   ```bash
   cd onsus-reactjs
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173/`

## 📜 Available Scripts
- `npm run dev`: Starts the development Vite server.
- `npm run build`: Compiles and bundles the application for production.
- `npm run preview`: Locally previews the production build.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/YourUsername/onsus-e-commerce/issues).

## 📄 Contact
Crafted with ❤️ by Omar Kareem. Connect with me on [LinkedIn](https://www.linkedin.com/in/engomarkarim/).
