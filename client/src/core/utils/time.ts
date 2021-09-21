export const getMinutesFromTime = (time: number): number => {
  return Math.floor(time / (60 * 1000));
};

export const getSecondsFromTime = (time: number): number => {
  return Math.floor((time / 1000) % 60);
};
