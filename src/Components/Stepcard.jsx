const StepCard = ({
  stepNumber,
  icon,
  title,
  description,
  gradientSpots,
  actionElement,
}) => (
  <div className="w-full md:w-1/3 h-80 bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-3xl relative overflow-hidden shadow-2xl group hover:scale-105 transition-transform duration-300 border border-zinc-700/50">
    <div className="absolute inset-0 bg-white/5"></div>
    {gradientSpots}

    {/* SVG Icon in top right corner */}
    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-600 rounded-full shadow-lg flex items-center justify-center border border-zinc-600/50 z-20">
      {icon}
    </div>

    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold text-white mb-3 mt-8">{title}</h3>
        <p className="text-zinc-200 text-sm leading-relaxed">{description}</p>
      </div>
      <div className="flex justify-center mt-6">{actionElement}</div>
    </div>

    {/* Decorative elements */}
    <div className="absolute bottom-8 left-6 w-1 h-1 bg-white rounded-full opacity-20"></div>
    <div className="absolute top-6 left-6 text-sm font-bold text-white/60 bg-zinc-800/50 rounded-full w-8 h-8 flex items-center justify-center">
      {stepNumber}
    </div>
  </div>
);

export default StepCard;
