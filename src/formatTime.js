const formatTime = (time) => {
  const getSeconds = time.seconds;
  // const minutes = "Your code here";
  const getMinutes = time.minutes;
  const getHours = time.hours;

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

export default formatTime;
