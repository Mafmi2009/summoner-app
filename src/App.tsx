import React, { useState } from "react";
import demonsData from "./demons.json";
import { Demon, Region } from "./types";
import { summonDemon } from "./summoningLogic";

const REGIONS: Region[] = ["hominum", "orc"];

function App() {
  const [region, setRegion] = useState<Region>("hominum");
  const [pityCounter, setPityCounter] = useState(0);
  const [summonHistory, setSummonHistory] = useState<Demon[]>([]);
  const [lastDemon, setLastDemon] = useState<Demon | null>(null);

  const handleSummon = () => {
    const demon = summonDemon(demonsData, region, pityCounter);
    setLastDemon(demon);
    setSummonHistory((prev) => [demon, ...prev]);
    setPityCounter(
      demon.level <= 4 ? pityCounter + 1 : 0
    );
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 16 }}>
      <h1>Summoner: Demon Summoning Simulator</h1>
      <div>
        <label>
          Region:{" "}
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as Region)}
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button style={{ margin: "16px 0" }} onClick={handleSummon}>
        Summon Demon
      </button>
      {lastDemon && (
        <div style={{ border: "1px solid #333", padding: 12, marginBottom: 16 }}>
          <h2>Summoned:</h2>
          <b>{lastDemon.name}</b> (Level {lastDemon.level})<br />
          Rarity: {lastDemon.realmRarity[region]} <br />
          Element: {lastDemon.element}<br />
          <small>{lastDemon.notes}</small>
        </div>
      )}
      <div>
        <h3>Summon History</h3>
        <div style={{ maxHeight: 200, overflowY: "auto", border: "1px solid #ccc", padding: 8 }}>
          {summonHistory.length === 0 && <i>No summons yet.</i>}
          {summonHistory.map((d, i) => (
            <div key={i}>
              {d.name} (Level {d.level}) - {d.realmRarity[region]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;