const calcDailyRate = (height, age, desiredWeight, currentWeight) => {
  const dWeight = currentWeight - desiredWeight;
  const dailyRate =
    9.99 * currentWeight + 6.25 * height - 4.92 * age - 161 - 10 * dWeight;
  return Number(dailyRate.toFixed(2));
};
// example
// calcDailyRate(160, 30, 50, 60)
// (9.99*60) + (6.25 * 160) - (4.92*30) -161 - (10 * 10)
// ==> 1190.8

const calcConsumed = arrayNumber => {
  return arrayNumber.reduce((prev, current) => prev + current, 0);
};
// example
// calcLeft([100, 300, 110, 140])
// ==> 650

const calcLeft = (dailyRate, consumed) => {
  return dailyRate - consumed;
};
// example
// calcLeft(1190.8, 580)
// ==> 610.8

const calcPercentOf = (path, whole) => {
  const percent = (100 * path) / whole;

  return Number(percent.toFixed(2));
};
// example
// calcPercentOf(100, 1000)
// (100 * 100) / 1000
// ==> 10

const calcProportion = (whole, kKal, path) => {
  const newValue = (path * kKal) / whole;
  return Number(newValue.toFixed(2));
};
// example
// calcProportion(100, 320, 112)
// (100 gram / 320 kkal) = (112 gram / x kkal)
// ==> 358.4 kkal

module.exports = {
  calcDailyRate,
  calcConsumed,
  calcLeft,
  calcPercentOf,
  calcProportion,
};
