getJasmineRequireObj().isObject = function() {
  function isObject(a, b, util, customEqualityTesters) {
    if (typeof a != 'object' || typeof b != 'object') { return false; }
  }

  return isObject;
};
