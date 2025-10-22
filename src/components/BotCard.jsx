import React from "react";

function BotCard({ bot, onCardClick, onDischarge, showDischargeButton }) {
  // Use simple CSS class names for styling
  return (
    <div className="bot-card" onClick={() => onCardClick(bot)}>
      <img src={bot.avatar_url} alt={bot.name} />
      <h3>{bot.name}</h3>
      <p className="bot-class">{bot.bot_class}</p>
      <p className="catchphrase">"{bot.catchphrase}"</p>

      {/* Stat Bar using CSS classes */}
      <div className="stats">
        <span>❤️ {bot.health}</span>
        <span>⚔️ {bot.damage}</span>
        <span>🛡️ {bot.armor}</span>
      </div>

      {/* Discharge button only visible in the army */}
      {showDischargeButton && (
        <button
          className="discharge-btn"
          onClick={(e) => {
            e.stopPropagation(); // Prevents enlisting/releasing when discharging
            onDischarge(bot);
          }}
        >
          X
        </button>
      )}
    </div>
  );
}

export default BotCard;
