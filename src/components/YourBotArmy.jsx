import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({ army, onRelease, onDischarge }) {
  return (
    <div className="p-4 bg-indigo-100 rounded-lg shadow-inner mb-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Your Bot Army</h2>

      {army && army.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {army.map((bot) => (
            <BotCard
              key={bot.id}
              bot={bot}
              onClick={() => onRelease(bot)}
              onDischarge={() => onDischarge(bot)}
              inArmy={true}
            />
          ))}
        </div>
      ) : (
        <p className="text-indigo-600 italic font-medium">
          Your army is empty! Enlist bots from the collection below.
        </p>
      )}
    </div>
  );
}

export default YourBotArmy;
