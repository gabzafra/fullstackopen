import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Scoreboard = ({ score, text }) => {
  return (
    <p>
      {text} {score}
      {text === "positive" ? " %" : ""}
    </p>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  let total = good + bad + neutral;
  let averageScore = (good - bad) / total || 0;
  let positivePercent = (100 * good) / total || 0;

  return (
    <>
      <h1>statistics</h1>
      <Scoreboard score={good} text="good" />
      <Scoreboard score={neutral} text="neutral" />
      <Scoreboard score={bad} text="bad" />
      <Scoreboard score={averageScore} text="average" />
      <Scoreboard score={positivePercent} text="positive" />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addFeedback = (feedback) => {
    switch (feedback) {
      case "good":
        return () => setGood(good + 1);
        break;
      case "neutral":
        return () => setNeutral(neutral + 1);
        break;
      case "bad":
        return () => setBad(bad + 1);
        break;
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={addFeedback("good")} text="good" />
      <Button handleClick={addFeedback("neutral")} text="neutral" />
      <Button handleClick={addFeedback("bad")} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
