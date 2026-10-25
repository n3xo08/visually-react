export default function BentoGrid() {
  const cardStyle = "bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {/* Kafelek 1 */}
      <div className={`${cardStyle} md:col-span-2`}>
        <h2 className="text-2xl font-bold text-white mb-2">Nasza Strategia</h2>
        <p className="text-white/60">Tworzymy treści, które przyciągają uwagę.</p>
      </div>
      
      {/* Kafelek 2 */}
      <div className={cardStyle}>
        <h2 className="text-2xl font-bold text-white mb-2">Video</h2>
        <p className="text-white/60">Produkcja wysokiej jakości.</p>
      </div>

      {/* Kafelek 3 */}
      <div className={cardStyle}>
        <h2 className="text-2xl font-bold text-white mb-2">Design</h2>
        <p className="text-white/60">Nowoczesny wygląd.</p>
      </div>
    </div>
  );
}