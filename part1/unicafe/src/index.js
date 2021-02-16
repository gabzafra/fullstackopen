import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistic = ({ value, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {text === "positive" ? " %" : ""}
      </td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  let total = good + bad + neutral;

  if (total) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic value={good} text="good" />
            <Statistic value={neutral} text="neutral" />
            <Statistic value={bad} text="bad" />
            <Statistic value={total} text="all" />
            <Statistic value={(good - bad) / total} text="average" />
            <Statistic value={(100 * good) / total} text="positive" />
          </tbody>
        </table>
      </>
    );
  }

  return (
    <>
      <h1>statistics</h1>
      <p>No feedback given</p>
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
