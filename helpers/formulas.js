const calcDailyRate = (height, age, desiredWeight, currentWeight) => {
  const dWeight = currentWeight - desiredWeight;
  const dailyRate = Math.round(
    9.99 * currentWeight + 6.25 * height - 4.92 * age - 161 - 10 * dWeight,
  );
  return Number(dailyRate);
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
  const percent = Math.round((100 * path) / whole);
  return Number(percent);
};
// example
// calcPercentOf(100, 1000)
// (100 * 100) / 1000
// ==> 10

const calcProportion = (whole, kKal, path) => {
  const newValue = Math.round((path * kKal) / whole);
  return Number(newValue);
};
// example
// calcProportion(100, 320, 112)
// (100 gram / 320 kkal) = (112 gram / x kkal)
// ==> 358.4 kkal

const formatDate = date => {
  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yyyy = date.getFullYear();

  return yyyy + '-' + mm + '-' + dd;
};

// example
// formatDate("2012-01-26T13:51:50.417Z")
// ==> "2021-01-26"

module.exports = {
  calcDailyRate,
  calcConsumed,
  calcLeft,
  calcPercentOf,
  calcProportion,
  formatDate,
};
