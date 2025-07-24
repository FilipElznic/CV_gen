const FeatureCard = ({
  icon,
  title,
  description,
  gradientColors,
  iconColor,
}) => (
  <div className="text-center group">
    <div
      className={`bg-gradient-to-br ${gradientColors}/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-${iconColor}-500/30 group-hover:border-${iconColor}-400 transition duration-300 shadow-lg`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-base text-gray-300 leading-relaxed">{description}</p>
  </div>
);
export default FeatureCard;
