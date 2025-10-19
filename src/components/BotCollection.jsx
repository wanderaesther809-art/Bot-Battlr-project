import React from "react";
import BotCard from "./BotCard"; // <-- Import the new component

function BotCollection({ bots, onEnlist }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Available Bots
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {bots.length > 0 ? (
          bots.map((bot) => (
            <BotCard
              key={bot.id}
              bot={bot}
              onCardClick={onEnlist} // Clicking the card enlists the bot
              showDischargeButton={false} // Discharge button not shown in collection
            />
          ))
        ) : (
          <p className="text-gray-500 italic text-center col-span-full">
            No bots available in the collection.
          </p>
        )}
      </div>
    </div>
  );
}

export default BotCollection;
