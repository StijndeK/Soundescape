// Polyfill for always positive modulo for numbers
Number.prototype.mod = function(n) {
  return ((this % n) + n) % n;
};

// Polyfill for array range
Array.range = function(min, max) {
  let a = [];
  for (let i = min; i <= max; i ++)
    a.push(i);
  return a;
};
