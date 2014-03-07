getJasmineRequireObj().nullEquality = function() {
  function nullEquality(a, b, util, customEqualityTesters) {
    // A strict comparison is necessary because `null == undefined`.
    if (a === null || b === null) { return a === b; }
  }

  return nullEquality;
};
