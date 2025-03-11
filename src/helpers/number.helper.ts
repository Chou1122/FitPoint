export const roundToTwo = (num: number | undefined | null, tp: number) => {
  if (num === undefined || num === null) return undefined;
  return Math.round(num * Math.pow(10, tp)) / Math.pow(10, tp);
};
