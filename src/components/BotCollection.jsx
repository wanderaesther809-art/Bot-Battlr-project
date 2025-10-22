import React from "react";
import BotCard from "./BotCard";

function BotCollection({ bots, onEnlist }) {
  return (
    // Replaced Tailwind classes with Plain CSS classes
    <div className="bot-collection-container">
      <h2 className="collection-heading">🤖 Available Bots</h2>

      {bots.length > 0 ? (
        // Uses the common CSS grid class defined in index.css
        <div className="bot-grid">
          {bots.map((bot) => (
            // CRITICAL FIX: Now correctly uses the BotCard component
            <BotCard
              key={bot.id}
              bot={bot}
              onCardClick={onEnlist} // Clicking the card enlists the bot
              showDischargeButton={false} // Discharge button not shown in collection
            />
          ))}
        </div>
      ) : (
        <p className="empty-message">
          Fetching bots... or the collection is empty.
        </p>
      )}
    </div>
  );
}

export default BotCollection;
