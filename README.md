# Ajay Bhosale Photography

A modern, immersive, and cinematic photography portfolio website built with React, Vite, and Tailwind CSS. The website features smooth scrolling, dynamic 3D elements, and elegant animations to showcase photography work beautifully.

**Live Demo:** [https://ajay-bhosale-photography.vercel.app/](https://ajay-bhosale-photography.vercel.app/)
## 🚀 Features

- **Cinematic Hero Section**: Features an immersive intro video experience with sound controls.
- **Smooth Scrolling**: Implemented using [Lenis](https://github.com/studio-freight/lenis) for a fluid user experience.
- **Dynamic Animations**: Powered by [Framer Motion](https://www.framer.com/motion/) and [GSAP](https://gsap.com/) for seamless page transitions and scroll-triggered animations.
- **3D Elements**: Uses [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & Drei for subtle 3D interactions.
- **Fully Responsive**: Optimized for all screen sizes using Tailwind CSS.
- **Contact Form**: Integrated with [EmailJS](https://www.emailjs.com/) for direct messaging from the website.
- **Dark/Light Mode**: Smooth theme toggling support.
- **WhatsApp Integration**: Floating quick-contact button for direct communication.

## 🛠 Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Animations**: Framer Motion, GSAP
- **3D Rendering**: Three.js, React Three Fiber
- **Icons**: React Icons
- **Smooth Scroll**: Lenis

## 📂 Project Structure

- `src/components/`: Reusable UI components (Lightbox, BeforeAfterSlider, CameraScene, etc.)
- `src/pages/`: Main application pages (HomePage, GalleryPage, ServicesPage, VideosPage, ContactPage)
- `src/data/`: Static data for portfolio items and config
- `src/hooks/`: Custom React hooks

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd AjayBhosalePhotography
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

To start the local development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build:
```bash
npm run build
```
The optimized files will be generated in the `dist` directory.

### Previewing the Production Build

To preview the production build locally:
```bash
npm run preview
```

## 📝 Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Bundles the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build.

## 📄 License

This project is private and proprietary.
