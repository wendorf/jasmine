describe("j$.LineSpecFilter", function () {
    var env,
        calls,
        suiteCallback,
        lineSpecFilter;

    function buildTests() {
        env = new j$.Env();
        calls = [];
        suiteCallback = jasmine.createSpy('suite callback');

        env.describe("first suite", function () {
            env.it("first spec", function () {
                calls.push('first spec');
            });

            env.it("second spec", function () {
                calls.push('second spec');
            });

            env.describe("nested suite", function() {
                env.it("first nested spec", function () {
                    calls.push('first nested spec');
                });

                env.it("second nested spec", function () {
                    calls.push('second nested spec');
                });
            })
        });

        env.describe("second suite", function () {
            env.it("third spec", function () {
                calls.push('third spec');
            });

            env.it("fourth spec", function () {
                calls.push('fourth spec');
            });
        });
    }

    var FIRST_SPEC_FIRST_LINE = 13;
    var FIRST_SPEC_MIDDLE_LINE = 14;
    var FIRST_SPEC_LAST_LINE = 15;
    var BETWEEN_FIRST_TWO_SPECS_LINE = 16;
    var BETWEEN_NESTED_SPECS_LINE = 25;

    describe("when the first line number of a single spec is specified", function () {
        it("runs only that spec", function (done) {
            lineSpecFilter = new j$.LineSpecFilter([
                {
                    filename: 'LineSpecFilter.js',
                    line: FIRST_SPEC_FIRST_LINE
                }
            ]);

            buildTests();

            var assertions = function () {
                expect(calls).toEqual([
                    'first spec'
                ]);
                done();
            };

            env.addReporter({jasmineDone: assertions});

            var runnables = lineSpecFilter.parse(env.topSuite());

            env.execute(runnables);
        });
    });

    describe("when the last line number of an it is specified", function() {
        it('runs only that spec', function(done) {
            lineSpecFilter = new j$.LineSpecFilter([
                {
                    filename: 'LineSpecFilter.js',
                    line: FIRST_SPEC_LAST_LINE
                }
            ]);

            buildTests();

            var assertions = function () {
                expect(calls).toEqual([
                    'first spec'
                ]);
                done();
            };

            env.addReporter({jasmineDone: assertions});

            var runnables = lineSpecFilter.parse(env.topSuite());

            env.execute(runnables);
        });
    });

    describe("when the any line number within an it is specified", function() {
        it('runs only that spec', function(done) {
            lineSpecFilter = new j$.LineSpecFilter([
                {
                    filename: 'LineSpecFilter.js',
                    line: FIRST_SPEC_MIDDLE_LINE
                }
            ]);

            buildTests();

            var assertions = function () {
                expect(calls).toEqual([
                    'first spec'
                ]);
                done();
            };

            env.addReporter({jasmineDone: assertions});

            var runnables = lineSpecFilter.parse(env.topSuite());

            env.execute(runnables);
        });
    });

    describe("when a line number is in a describe block", function() {
        describe("and the line number is not part of an it", function() {
            describe("and the describe has no children describes", function() {
                it("runs all its", function(done) {
                    lineSpecFilter = new j$.LineSpecFilter([
                        {
                            filename: 'LineSpecFilter.js',
                            line: BETWEEN_NESTED_SPECS_LINE
                        }
                    ]);

                    buildTests();

                    var assertions = function () {
                        expect(calls).toEqual([
                            'first nested spec', 'second nested spec'
                        ]);
                        done();
                    };

                    env.addReporter({jasmineDone: assertions});

                    var runnables = lineSpecFilter.parse(env.topSuite());

                    env.execute(runnables);
                });
            });

            describe("and the describe has children describes", function() {
                it("runs all its and the its of its children", function(done) {
                    lineSpecFilter = new j$.LineSpecFilter([
                        {
                            filename: 'LineSpecFilter.js',
                            line: BETWEEN_FIRST_TWO_SPECS_LINE
                        }
                    ]);

                    buildTests();

                    var assertions = function () {
                        expect(calls).toEqual([
                            'first spec', 'second spec', 'first nested spec', 'second nested spec'
                        ]);
                        done();
                    };

                    env.addReporter({jasmineDone: assertions});

                    var runnables = lineSpecFilter.parse(env.topSuite());

                    env.execute(runnables);
                });
            });

            //it('does not run its of another describe')
        });
    });

    //
    //describe('when it is outside of any describe or it of an file', function() {
    //    it('runs the whole file');
    //});
    //
    //describe('when the line number matches but the file does not', function() {
    //    it('does not run it');
    //})

    //it('works for fit, xit, fdescribe, xdescribe, etc.');
});