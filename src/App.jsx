import { useState } from "react";
import { useInterval } from "./hooks/useInterval";
import "./App.css";

function App() {
  const [waterLevels, setWaterLevels] = useState(0); // Keep track of water level
  const [error, setError] = useState("");
  // Creating increase and decrease to help stop the intervals
  const [increase, setIncrease] = useState(false);
  const [decrease, setDecrease] = useState(false);
  const [waterDivs, setWaterDivs] = useState([]);

  const handleIncreaseWater = () => {
    setIncrease(true);
    setDecrease(false);
  };

  const handleDecreaseWater = () => {
    setIncrease(false);
    setDecrease(true);
  };

  // Increase waterLevels by 1 every 2 seconds and adds an element "waterlevel + amount" to waterDivs array
  useInterval(() => {
    if (waterLevels < 5 && increase === true) {
      let blueDiv = `"waterLevel ${waterLevels + 1}"`;
      waterDivs.push(blueDiv);
      setWaterLevels(waterLevels + 1);
      setError("");
    } else if (waterLevels === 5) {
      setError(
        "The bathtub is now full, you are no longer able to add more water!"
      );
      return;
    }
  }, 2000);

  // Decrease waterLevels by 1 every 2 seconds and removes an element from the waterDivs array
  useInterval(() => {
    if (waterLevels > 0 && decrease === true) {
      waterDivs.pop();
      setWaterLevels(waterLevels - 1);
      setError("");
    } else if (waterLevels === 0 && decrease === true) {
      setError("The bathtub is empty, you cannot remove anymore water!");
      return;
    }
  }, 2000);

  return (
    <div>
      {error ? <h4 style={{ color: "red" }}>{error}</h4> : ""}
      <h1>Water level of bathtub: {waterLevels}</h1>
      <button onClick={handleIncreaseWater}>Increase Water</button>
      <button onClick={handleDecreaseWater}>Decrease Water</button>
      <div className="bathtub">
        {waterDivs.map((item, index) => (
          <div key={index} className="blue-div"></div>
        ))}
      </div>
    </div>
  );
}

export default App;
