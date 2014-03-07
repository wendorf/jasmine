getJasmineRequireObj().isObjectContaining = function() {
  function isObjectContaining(a, b, util, customEqualityTesters) {
    customEqualityTesters = customEqualityTesters || [];

    if (b instanceof j$.ObjectContaining) {
      result = b.jasmineMatches(a, util, customEqualityTesters);
      if (result) {
        return true;
      }
    }
  }

  return isObjectContaining;
};
