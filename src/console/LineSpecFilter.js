getJasmineRequireObj().LineSpecFilter = function () {
    function LineSpecFilter(options) {
        this.options = options;
        this.parse = parse;

        function lineIsInRunnable(suite, line) {
            return !suite.callInfo || (line >= suite.callInfo.lineNumber && line <= suite.callInfo.lastLine);
        }

        function parse(suite) {
            if (!lineIsInRunnable(suite, options[0].line)) {
                return [];
            }

            if (suite instanceof j$.Spec) {
                return [suite.id];
            }

            var childrenWithMatch = suite.children.reduce(function (children, child) {
                return children.concat(parse(child));
            }, []);

            if (childrenWithMatch.length > 0) {
                return childrenWithMatch;
            }

            return suite.children.reduce(function (children, child) {
                return children.concat(child.id);
            }, []);
        }
    }

    return LineSpecFilter;
};
