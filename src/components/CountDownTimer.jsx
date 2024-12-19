import React, { useState } from "react";

const CountDown = ({ expiryDate }) => {
  // Define the CountDown component, which takes an `expiryDate` prop.
  // This prop was retrieved from the API call in the newItems component.

  const [timeInTextFormat, setTimeInTextFormat] = useState("");
  // Declare a state variable `timeInTextFormat` to store the countdown text (e.g., "2h 30m 15s").
  // `setTimeInTextFormat` is the function to update this state.

  const [intervalId, setIntervalId] = useState();
  // Declare another state variable `intervalId` to store the ID of the interval timer.
  // This is used to clear the interval when the countdown ends.

  React.useEffect(() => {

    calculateTime();
    // Call the `calculateTime` function immediately to initialize the countdown.
    // Time is caluclated in seconds (1000ms)

    // clearInterval() and setInterval() are functions in JavaScript (clearInterval) is used to stop
    // a timer that was previously established by using (setInterval())

    const intervalId = setInterval(() => {
      calculateTime();
      // Set up an interval to call `calculateTime` every second (1000ms).
    }, 1000);

    setIntervalId(intervalId);
    // Save the interval ID in state so it can be cleared later.

    return () => {
      clearInterval(intervalId);
      // Cleanup function: clear the interval when the component unmounts.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // The empty dependency array ensures this effect runs only once, when the component mounts.

  function calculateTime() {
    // Define the `calculateTime` function to compute the remaining time.
    const millisecondsLeft = expiryDate - Date.now();
    // Calculate the number of milliseconds left until the expiry date.

    if (millisecondsLeft < 0) {
      clearInterval(intervalId);
      setTimeInTextFormat("TIME EXPIRED");
      return;
    }

    const secondsLeft = millisecondsLeft / 1000;
    const minutesLeft = secondsLeft / 60;
    const hoursLeft = minutesLeft / 60;

    setTimeInTextFormat(
      `${Math.floor(hoursLeft)}h ${Math.floor(minutesLeft % 60)}m ${Math.floor(
        secondsLeft % 60
      )}s`
    );
    // Update the `timeText` state with the formatted countdown string.
    // Use `Math.floor` to round down the hours, minutes, and seconds.
    // `% 60` ensures that minutes and seconds are displayed as their remainder within an hour or minute.
  }

  return <div className="de_countdown">{timeInTextFormat}</div>;
  // Render a `div` element with the class `de_countdown` that displays the current countdown text.
};

export default CountDown;
// Export the CountDown component as the default export so it can be imported and used in other files.
// Particularly, by the newItem Component
