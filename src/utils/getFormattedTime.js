const getFormattedTime = (seconds) => {
  const padLeftZero = (text) => String(text).padStart(2, "0");

  const SECONDS_IN_MINUTE = 60;
  const MINUTES_IN_HOUR = 60;

  const hourInSeconds = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
  const minutesLeft = seconds % hourInSeconds;
  const secondsLeft = minutesLeft % SECONDS_IN_MINUTE;

  const formattedHours = Math.floor(seconds / hourInSeconds);
  const formattedMinutes = Math.floor(minutesLeft / SECONDS_IN_MINUTE);
  const formattedSeconds = Math.ceil(secondsLeft);

  const formattedTime = {
    hours: padLeftZero(formattedHours.toString()),
    minutes: padLeftZero(formattedMinutes.toString()),
    seconds: padLeftZero(formattedSeconds.toString()),
  };
  return formattedTime;
};

export default getFormattedTime;
