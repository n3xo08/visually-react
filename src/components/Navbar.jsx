export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50">
      <div className="text-xl font-bold tracking-widest">VISUALLY</div>
      <div className="flex gap-8 text-sm text-white/70">
        <a href="#" className="hover:text-white">Start</a>
        <a href="#" className="hover:text-white">Usługi</a>
        <a href="#" className="hover:text-white">Wyniki</a>
        <a href="#" className="hover:text-white">Cennik</a>
        <a href="#" className="hover:text-white">Kontakt</a>
      </div>
    </nav>
  );
}
