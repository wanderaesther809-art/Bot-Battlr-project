import "./index.css";
import React, { useEffect, useState } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/bots")
      .then((res) => res.json())
      .then((data) => setBots(data))
      .catch((err) => console.error("Error fetching bots:", err));
  }, []);

  function enlistBot(bot) {
    if (!army.find((b) => b.id === bot.id)) {
      setArmy([...army, bot]);
    }
  }

  function releaseBot(bot) {
    setArmy(army.filter((b) => b.id !== bot.id));
  }

  function dischargeBot(bot) {
    fetch(`http://localhost:8001/bots/${bot.id}`, {
      method: "DELETE",
    }).then(() => {
      setArmy(army.filter((b) => b.id !== bot.id));
      setBots(bots.filter((b) => b.id !== bot.id));
    });
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
        🤖 Bot Battlr
      </h1>

      <YourBotArmy
        army={army}
        onRelease={releaseBot}
        onDischarge={dischargeBot}
      />

      <BotCollection bots={bots} onEnlist={enlistBot} />
    </div>
  );
}

export default App;
