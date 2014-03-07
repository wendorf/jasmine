getJasmineRequireObj().zeroEquality = function() {
  function zeroEquality(a, b, util, customEqualityTesters) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) { return a !== 0 || 1 / a == 1 / b; }
  }

  return zeroEquality;
};
