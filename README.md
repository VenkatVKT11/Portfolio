# Venkatesan G — Portfolio 🚀

> **Live Preview:** [venkatvkt11.github.io/Portfolio](https://venkatvkt11.github.io/Portfolio)

A modern, responsive, and interactive personal portfolio website built to showcase my skills as a Data Analyst and Python Developer. Designed with a premium aesthetic, smooth animations, and a focus on user experience.

---

## ✨ Features

- **🌓 Dark/Light Mode:** Seamless theme switching with smooth transitions and `localStorage` persistence.
- **⌨️ Dynamic Typing Animation:** Hero section cycles through roles (Data Analyst, Python Developer, etc.).
- **📊 Interactive Skill Bars:** Animated progress bars that fill up as you scroll down using `IntersectionObserver`.
- **📩 Fully Functional Contact Form:** Integrated with [Web3Forms](https://web3forms.com) to send messages straight to email (no backend required).
- **📱 Fully Responsive:** Carefully crafted breakpoints for mobile, tablet, and desktop views.
- **⏳ Custom Preloader:** A sleek "VG" monogram loading animation on initial page load.
- **📄 Downloadable CV:** Hero button linking directly to the latest resume.
- **🎯 Smooth Scrolling & Scroll Reveal:** Elegant fade-ups for elements as they enter the viewport.

---

## 🛠️ Tech Stack

This project was built without heavy frameworks to ensure maximum performance and control over the animations:

- **HTML5:** Semantic structure, SEO meta tags, and Open Graph optimization.
- **CSS3:** Custom properties (variables) for theming, advanced animations (keyframes, transitions), and flexbox/grid layouts.
- **Vanilla JavaScript (ES6+):** Form handling, DOM manipulation, `IntersectionObserver` for scroll animations, and custom typing logic.

---

## 🚀 Running Locally

Want to run this project on your local machine? It's completely static! 

1. Clone the repository:
   ```bash
   git clone https://github.com/VenkatVKT11/Portfolio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Portfolio
   ```
3. Open `index.html` in your favorite browser. Or use a local server like VS Code's Live Server extension for hot-reloading.

---

## 📬 Contact Setup (Web3Forms)

The contact form is powered by Web3Forms. If you want to fork this and use your own email:

1. Get a free access key from [web3forms.com](https://web3forms.com).
2. Open `index.html`.
3. Locate the hidden `access_key` input in the `<form>` element (around line ~516).
4. Replace the existing `value` with your new access key:
   ```html
   <input type="hidden" name="access_key" value="YOUR_NEW_ACCESS_KEY">
   ```

---

*Designed and built by Venkatesan G.*
