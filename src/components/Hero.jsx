import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidGlass from "liquid-glass-react";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {

  const videoRef = useRef(null);
useEffect(() => {

  gsap.to(videoRef.current, {

    y: -150,

    ease: "none",

    scrollTrigger: {

      trigger: ".hero",

      start: "top top",

      end: "bottom top",

      scrub: 2

    }

  });

}, []);
  return (
    <div className="app">
      <div className="background"></div>

      <LiquidGlass
        displacementScale={64}
        blurAmount={0.1}
        saturation={130}
        aberrationIntensity={2}
        elasticity={0.35}
        cornerRadius={999}
        padding="10px 20px"
      >
        <nav className="menu">
          <a href="#">Start</a>
          <a href="#">Usługi</a>
          <a href="#">Portfolio</a>
          <a href="#">Kontakt</a>
        </nav>
      </LiquidGlass>

      <div className="hero">
        <h1>VISUALLY</h1>
        <p>Premium Content Creation</p>
      </div>
    </div>
  );
}