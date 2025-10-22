import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({ army, onRelease, onDischarge }) {
  return (
    // Uses simple CSS class names for styling (defined in index.css)
    <div className="bot-army-container">
      <h2 className="army-heading">🛡️ Your Bot Army</h2>

      {/* Conditional rendering: show bots if array has content, otherwise show message */}
      {army && army.length > 0 ? (
        // Uses the common CSS grid class for layout
        <div className="bot-grid">
          {army.map((bot) => (
            // CRITICAL FIX: Now correctly uses the BotCard component
            <BotCard
              key={bot.id}
              bot={bot}
              onCardClick={onRelease} // Clicking a bot in the army releases it
              showDischargeButton={true} // Show the 'X' button in the army
              onDischarge={onDischarge} // Pass the permanent delete function
            />
          ))}
        </div>
      ) : (
        // Simple message for an empty army
        <p className="empty-message">
          Your army is empty! Enlist bots from the collection below.
        </p>
      )}
    </div>
  );
}

export default YourBotArmy;
