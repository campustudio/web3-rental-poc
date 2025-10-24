# web3-rental-poc

# 🏠 Upland Web3 Real Estate Rental Platform (Demo)

> **By Chris Du — Senior Software Engineer**  
> A functional Web3-powered rental platform demo showcasing blockchain integration, responsive UI, and clean modern React architecture.

![Web3 Rental Platform Preview](https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop)

---

## 🌍 Project Overview

This project demonstrates how a **Web3 Real Estate Rental Platform** could be architected and implemented with:

- Secure wallet connection (MetaMask, multi-chain ready)
- Interactive property listings
- Rental transaction flow using `ethers.js`
- Dark/light mode and responsive dashboard UI
- Real-time state management with **Redux Toolkit + RTK Query**
- Ready-to-deploy architecture for **Vercel**

It’s a front-end proof-of-concept designed for **Upland’s Web3 Real Estate Platform** recruitment project — reflecting strong ownership, modern design, and production-grade scalability.

---

## ⚙️ Tech Stack

| Layer            | Technology                             |
| ---------------- | -------------------------------------- |
| Framework        | **Next.js (App Router)**               |
| State Management | **Redux Toolkit + RTK Query**          |
| Blockchain       | **Ethers.js (Ethereum, Polygon, BSC)** |
| Styling          | **TailwindCSS + Framer Motion**        |
| Deployment       | **Vercel**                             |
| Language         | **TypeScript**                         |

---

## ✨ Key Features

✅ Wallet connection (MetaMask, Ethers.js)  
✅ Property listing + mock API integration  
✅ Rent transaction simulation (async contract mock)  
✅ Global theme management (dark/light)  
✅ Fully modular Redux + RTK Query architecture  
✅ Responsive and animated UI with Framer Motion  
✅ Scalable structure for future backend and smart contracts

---

## 🧠 Architectural Highlights

```
src/
├─ app/                    → Next.js App Router pages
├─ features/               → Redux slices + RTK Query endpoints
│   ├─ wallet/              → Wallet connect API + slice
│   ├─ properties/          → Property list + rent mutation
│   └─ theme/               → Theme state
├─ components/             → UI components (WalletButton, PropertyCard…)
├─ store/                  → Root Redux store setup
└─ lib/                    → Blockchain utils and config
```

**🔍 Design Principles:**

- Separation of concerns — blockchain logic isolated under `lib/`
- Declarative UI — React hooks + motion-based transitions
- Predictable data flow — RTK Query caching + invalidation
- Extensible — ready for GraphQL/IPFS/contract integration

---

## 🚀 Getting Started

### 1️⃣ Install

```bash
npm install
```

### 2️⃣ Run Locally

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

### 3️⃣ Deploy to Vercel

One-click deploy:

```bash
vercel
```

---

## 🧩 Demo Scenario

> 1. Click **Connect Wallet** to link MetaMask.
> 2. View available properties with images, prices, and status.
> 3. Click **Rent** to simulate a blockchain transaction (mocked).
> 4. Switch to **Dark Mode** for sleek UI experience.

This mirrors a real Web3 rental flow where tenants rent property using crypto on Ethereum or Polygon.

---

## 💬 Interview Talking Points

**If discussed during the interview:**

- This project demonstrates _full-stack readiness_ for Web3 UI challenges.
- It reflects modern engineering practices (RTK Query, multi-chain design, modular state).
- Code is production-deployable and readable, highlighting scalability and UX focus.

---

## 👨‍💻 Author

**Chris Du**  
Senior Software Engineer — Frontend / Fullstack / Web3  
🌐 [GitHub](https://github.com/campustudio)  
📧 878697969@qq.com

> “Building interactive, scalable, and blockchain-ready web applications.”
