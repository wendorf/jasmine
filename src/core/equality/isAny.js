getJasmineRequireObj().isAny = function() {
  function isAny(a, b, util, customEqualityTesters) {
    customEqualityTesters = customEqualityTesters || [];

    if (a instanceof j$.Any) {
      result = a.jasmineMatches(b);
      if (result) {
        return true;
      }
    }

    if (b instanceof j$.Any) {
      result = b.jasmineMatches(a);
      if (result) {
        return true;
      }
    }
  }

  return isAny;
};
