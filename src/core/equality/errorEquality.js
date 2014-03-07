getJasmineRequireObj().errorEquality = function() {
  function errorEquality(a, b, util, customEqualityTesters) {
    if (a instanceof Error && b instanceof Error) {
      return a.message == b.message;
    }
  }

  return errorEquality;
};
