/**
 * 
 * @param {Number} x integer [1-0xFFFFFFFF]
 * @param {Number} y integer [1-0xFFFFFFFF]
 * @returns {Number} if error => 0
 */
const NOD = function (x, y) {
  if (!x || !y) return 0;
  if (typeof (x) !== 'number') return 0;
  if (typeof (y) !== 'number') return 0;
  if (!Number.isInteger(x)) return 0;
  if (!Number.isInteger(y)) return 0;
  if (x <= 0) return 0;
  if (y <= 0) return 0;
  if (x > 0xFFFFFFFF) return 1;
  if (y > 0xFFFFFFFF) return 1;

  try {
    return NOD._next(x, y);
  } catch (e) {
    return 1;
  }
};
NOD._next = (x, y) => {
  if (y > x) return NOD._next(y, x);
  if (!y) return x;
  return NOD._next(y, x % y);
};

export default NOD;