import LiquidGlass from "liquid-glass-react";
import "./App.css";

export default function App() {
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