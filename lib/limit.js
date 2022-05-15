
/**
 * 
 * @param {Number} value - checked value
 * @param {Number} min - lower limit
 * @param {Number} max - upper limit
 * @returns value in selected limit
 */
const limit = (value, min, max) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

export { limit };