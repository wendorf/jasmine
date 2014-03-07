getJasmineRequireObj().requireEqualityTesters = function(jRequire, j$) {
  var availableTesters = [
      'isAny',
      'isObjectContaining',
      'errorEquality',
      'zeroEquality',
      'nullEquality',
      'differingTypeEquality'
    ],
    testers = [];

  for (var i = 0; i < availableTesters.length; i++) {
    var name = availableTesters[i];
    testers.push(jRequire[name](j$));
  }

  return testers;
};
