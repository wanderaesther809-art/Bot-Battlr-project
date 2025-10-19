import React, { useState, useEffect, useCallback } from "react";

// --- BotCard Component (Represents a single bot in the collection or army) ---
const BotCard = ({ bot, onCardClick, showDischargeButton, onDischarge }) => {
  // Handles the main card click (enlist or release)
  const handleCardClick = () => {
    // onCardClick will be either handleEnlist or handleRelease
    onCardClick(bot);
  };

  // Handles the permanent discharge (DELETE) button click
  const handleDischargeClick = (e) => {
    e.stopPropagation(); // Stop the card click event from firing when the 'x' is clicked
    // Replaced alert() with window.confirm() as a temporary measure for simple UI prompt
    if (
      window.confirm(
        `Are you sure you want to permanently discharge ${bot.name}? This cannot be undone.`
      )
    ) {
      onDischarge(bot.id);
    }
  };

  // Determine the color of the bot class tag
  const classColor = (botClass) => {
    switch (botClass) {
      case "Support":
        return "bg-blue-600";
      case "Medic":
        return "bg-green-600";
      case "Assault":
        return "bg-red-600";
      case "Defender":
        return "bg-yellow-600";
      case "Captain":
        return "bg-purple-600";
      case "Witch":
        return "bg-pink-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div
      className="relative flex flex-col w-full max-w-xs sm:max-w-none bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-[1.03] cursor-pointer border-4 border-transparent hover:border-indigo-500"
      onClick={handleCardClick}
    >
      {/* Bot Image */}
      <div className="relative h-40 bg-gray-100 flex items-center justify-center">
        <img
          src={bot.avatar_url}
          alt={bot.name}
          className="h-full w-auto object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/150x150/000000/FFFFFF?text=BOT";
          }}
        />
        <div
          className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold text-white rounded-full ${classColor(
            bot.bot_class
          )}`}
        >
          {bot.bot_class}
        </div>
      </div>

      {/* Discharge Button (Only for Army) */}
      {showDischargeButton && (
        <button
          className="absolute top-0 left-0 m-1 p-2 bg-red-600 text-white rounded-full text-xs font-bold transition duration-200 hover:bg-red-700 z-10"
          onClick={handleDischargeClick}
          title="Discharge Bot Forever"
        >
          &times;
        </button>
      )}

      {/* Bot Details */}
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
          {bot.name}
        </h3>
        <p className="text-sm text-gray-600 italic leading-snug h-10 overflow-hidden">
          "{bot.catchphrase}"
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex justify-around p-3 border-t bg-gray-50">
        <StatBar icon="❤️" value={bot.health} label="Health" />
        <StatBar icon="⚔️" value={bot.damage} label="Damage" />
        <StatBar icon="🛡️" value={bot.armor} label="Armor" />
      </div>
    </div>
  );
};

// Helper component for displaying stats
const StatBar = ({ icon, value, label }) => (
  <div className="text-center">
    <div className="text-sm font-semibold text-gray-800">
      {icon} {value}
    </div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

// --- YourBotArmy Component (Enlisted Bots) ---
const YourBotArmy = ({ army, onRelease, onDischarge }) => {
  if (army.length === 0) {
    return (
      <div className="bg-indigo-100 p-6 rounded-xl shadow-inner text-center my-6 border-2 border-indigo-300">
        <p className="text-lg font-semibold text-indigo-700">
          Your army is empty! Enlist bots from the collection below.
        </p>
      </div>
    );
  }

  return (
    <div className="my-8">
      <h2 className="text-3xl font-extrabold text-indigo-800 mb-6 border-b-4 border-indigo-300 pb-2">
        <span role="img" aria-label="Army Helmet">
          💂
        </span>{" "}
        Your Bot Army
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {army.map((bot) => (
          <BotCard
            key={`army-${bot.id}`}
            bot={bot}
            onCardClick={onRelease}
            showDischargeButton={true}
            onDischarge={onDischarge}
          />
        ))}
      </div>
    </div>
  );
};

// --- BotCollection Component (All Available Bots) ---
const BotCollection = ({ bots, onEnlist }) => {
  return (
    <div className="my-8">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-4 border-gray-300 pb-2">
        <span role="img" aria-label="Robot Face">
          🤖
        </span>{" "}
        Available Bots
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {bots.map((bot) => (
          <BotCard
            key={`collection-${bot.id}`}
            bot={bot}
            onCardClick={onEnlist}
            showDischargeButton={false}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  // Load Tailwind CSS script right at the start
  useEffect(() => {
    if (!document.querySelector('script[src*="tailwindcss.com"]')) {
      const script = document.createElement("script");
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
  }, []);

  const [allBots, setAllBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [enlistedBotIds, setEnlistedBotIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Memoized function for fetching data with exponential backoff
  const fetchBots = useCallback(async (retries = 3) => {
    try {
      const response = await fetch("http://localhost:8001/bots");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAllBots(data);
    } catch (error) {
      if (retries > 0) {
        const delay = Math.pow(2, 3 - retries) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        await fetchBots(retries - 1);
      } else {
        console.error("Error fetching bots after multiple retries:", error);
      }
    } finally {
      if (retries === 3) setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchBots();
  }, [fetchBots]);

  // --- Handler: Enlist a Bot ---
  const handleEnlist = (botToEnlist) => {
    // Core Deliverable: The bot can be enlisted only once.
    if (!enlistedBotIds.has(botToEnlist.id)) {
      setArmy((prevArmy) => [...prevArmy, botToEnlist]);
      setEnlistedBotIds((prevIds) => new Set(prevIds).add(botToEnlist.id));
    }
  };

  // --- Handler: Release a Bot from the Army ---
  const handleRelease = (bot) => {
    // Core Deliverable: Release a bot from my army by clicking on it.
    setArmy((prevArmy) => prevArmy.filter((b) => b.id !== bot.id));
    setEnlistedBotIds((prevIds) => {
      const newIds = new Set(prevIds);
      newIds.delete(bot.id);
      return newIds;
    });
  };

  // --- Handler: Discharge a Bot Forever (DELETE) ---
  const handleDischarge = useCallback(async (botId, retries = 3) => {
    try {
      const response = await fetch(`http://localhost:8001/bots/${botId}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      // Successfully deleted from backend, now update frontend states
      setArmy((prevArmy) => prevArmy.filter((bot) => bot.id !== botId));
      setEnlistedBotIds((prevIds) => {
        const newIds = new Set(prevIds);
        newIds.delete(botId);
        return newIds;
      });
      setAllBots((prevBots) => prevBots.filter((bot) => bot.id !== botId));
    } catch (error) {
      if (retries > 0) {
        const delay = Math.pow(2, 3 - retries) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        await handleDischarge(botId, retries - 1);
      } else {
        console.error("Error discharging bot after multiple retries:", error);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl font-semibold text-indigo-600">
          Loading Bots...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <header className="text-center py-6 bg-white shadow-md rounded-lg mb-8">
        <h1 className="text-5xl font-extrabold text-indigo-700 tracking-tighter">
          <span className="text-gray-900">Bot</span> Battlr
        </h1>
        <p className="text-xl text-gray-500 mt-2">
          Custom Build Your Own Galactic Bot Army!
        </p>
      </header>

      <main className="container mx-auto">
        <YourBotArmy
          army={army}
          onRelease={handleRelease}
          onDischarge={handleDischarge}
        />

        <BotCollection bots={allBots} onEnlist={handleEnlist} />
      </main>
    </div>
  );
};

export default App;
