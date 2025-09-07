# Pickle Store (React + Tailwind)

A simple e-commerce web application built with **React** and **Tailwind CSS**, featuring product listing, search & filter, cart management, and dark mode support.  
Products are fetched from **MockAPI**, and the app is designed with **responsive UI/UX** and modern Tailwind-first styling.

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Setup & Run Locally](#-setup--run-locally)
- [Future Enhancements](#-future-enhancements)
- [Screenshots](#-screenshots-optional)
- [License](#-license)

## Features

### 1. Product Listing

- Fetch products (name, price, image, category) from MockAPI
- Responsive product grid layout with Tailwind

### 2. Search & Filter

- Search products by name
- Filter by category (**Veg, Non-Veg, Groceries**)
- Sort products by price (low → high, high → low)

### 3. Cart Management

- Add/remove items to/from cart
- Update item quantities
- Cart total calculation (subtotal, tax, total)
- Cart persistence with **localStorage**

### 4. User Features

- **Dark mode toggle** (Tailwind `dark:` classes)
- Mobile, tablet, and desktop responsive

## Tech Stack

- React (functional components + hooks)
- Tailwind CSS (dark mode, responsive design)
- MockAPI (for product data)
- LocalStorage (persistence)
- React Context API + useReducer (state management)
- React Hot Toast / Sonner (notifications)

## Setup & Run Locally

### 1. Clone the repository

- git clone https://github.com/tarunguduru/Pickle-Store.git
- cd pickle-store

### 2. Install dependencies

- npm install

### 3. Start the devolopment server

- npm run dev

## Future Enhancements

- Authentication → User login/signup with JWT or Firebase Auth
- Wishlist / Favorites → Save items for later purchase
- Checkout flow → Add address, payment, and order confirmation
- Backend Integration → Replace MockAPI with Node.js/Express or serverless backend

### Screenshots

- Yet to upload
