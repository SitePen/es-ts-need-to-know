var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "util", "path", "intern", "istanbul/lib/collector", "glob", "istanbul/lib/report/json", "istanbul/lib/instrumenter", "istanbul/index", "intern/lib/reporters/Runner", "intern/lib/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var fs = require("fs");
    var nodeUtil = require("util");
    var path = require("path");
    var intern = require("intern");
    var Collector = require("istanbul/lib/collector");
    var glob = require("glob");
    var JsonReporter = require("istanbul/lib/report/json");
    var Instrumenter = require("istanbul/lib/instrumenter");
    require("istanbul/index");
    var Runner = require("intern/lib/reporters/Runner");
    var util = require("intern/lib/util");
    var LIGHT_RED = '\x1b[91m';
    var LIGHT_GREEN = '\x1b[92m';
    var LIGHT_MAGENTA = '\x1b[95m';
    var Reporter = (function (_super) {
        __extends(Reporter, _super);
        function Reporter(config) {
            if (config === void 0) { config = {}; }
            var _this = _super.call(this, config) || this;
            _this._errors = {};
            _this._filename = config.file || 'coverage-final.json';
            _this._collector = new Collector();
            _this.reporter = {
                writeReport: function () { }
            };
            _this._reporter = new JsonReporter({
                file: _this._filename,
                watermarks: config.watermarks
            });
            return _this;
        }
        Reporter.prototype.coverage = function (sessionId, coverage) {
            if (intern.mode === 'client' || sessionId) {
                var session = this.sessions[sessionId || ''];
                session.coverage = true;
                this._collector.add(coverage);
            }
        };
        Reporter.prototype.runEnd = function () {
            var _this = this;
            var numEnvironments = 0;
            var numTests = 0;
            var numFailedTests = 0;
            var numSkippedTests = 0;
            for (var sessionId in this.sessions) {
                var session = this.sessions[sessionId];
                ++numEnvironments;
                numTests += session.suite.numTests;
                numFailedTests += session.suite.numFailedTests;
                numSkippedTests += session.suite.numSkippedTests;
            }
            this.charm.write('\n');
            if (intern.mode === 'client') {
                for (var sid in this._errors) {
                    this._errors[sid].forEach(function (test) {
                        _this.charm
                            .write(LIGHT_RED)
                            .write('× ' + test.id)
                            .foreground('white')
                            .write(' (' + (test.timeElapsed / 1000) + 's)')
                            .write('\n')
                            .foreground('red')
                            .write(test.error)
                            .display('reset')
                            .write('\n\n');
                    });
                }
            }
            var message = "TOTAL: tested " + numEnvironments + " platforms, " + numFailedTests + "/" + numTests + " failed";
            if (numSkippedTests) {
                message += " (" + numSkippedTests + " skipped)";
            }
            if (this.hasErrors && !numFailedTests) {
                message += '; fatal error occurred';
            }
            this.charm
                .foreground(numFailedTests > 0 || this.hasErrors ? 'red' : 'green')
                .write(message)
                .display('reset')
                .write('\n');
            this._writeCoverage();
        };
        Reporter.prototype.suiteStart = function (suite) {
            if (!suite.hasParent) {
                this.sessions[suite.sessionId || ''] = { suite: suite };
                if (suite.sessionId) {
                    this.charm.write('\n‣ Created session ' + suite.name + ' (' + suite.sessionId + ')\n');
                }
            }
        };
        Reporter.prototype.suiteEnd = function (suite) {
            var _this = this;
            if (!suite.hasParent) {
                // runEnd will report all of this information, so do not repeat it
                if (intern.mode === 'client') {
                    return;
                }
                // Runner mode test with no sessionId was some failed test, not a bug
                if (!suite.sessionId) {
                    return;
                }
                var session = this.sessions[suite.sessionId];
                if (session.coverage) {
                    this.reporter.writeReport(session.coverage);
                }
                else {
                    this.charm
                        .write('No unit test coverage for ' + suite.name)
                        .display('reset')
                        .write('\n');
                }
                this.charm
                    .write('\n\n');
                if (this._errors[suite.sessionId]) {
                    this._errors[suite.sessionId].forEach(function (test) {
                        _this.charm
                            .write(LIGHT_RED)
                            .write('× ' + test.id)
                            .foreground('white')
                            .write(' (' + (test.timeElapsed / 1000) + 's)')
                            .write('\n')
                            .foreground('red')
                            .write(test.error)
                            .display('reset')
                            .write('\n\n');
                    });
                }
                var name_1 = suite.name;
                var hasError = (function hasError(suite) {
                    return suite.tests ? (suite.error || suite.tests.some(hasError)) : false;
                })(suite);
                var numFailedTests = suite.numFailedTests;
                var numTests = suite.numTests;
                var numSkippedTests = suite.numSkippedTests;
                var summary = nodeUtil.format('%s: %d/%d tests failed', name_1, numFailedTests, numTests);
                if (numSkippedTests) {
                    summary += ' (' + numSkippedTests + ' skipped)';
                }
                if (hasError) {
                    summary += '; fatal error occurred';
                }
                this.charm
                    .write(numFailedTests || hasError > 0 ? LIGHT_RED : LIGHT_GREEN)
                    .write(summary)
                    .display('reset')
                    .write('\n\n');
            }
        };
        Reporter.prototype.testFail = function (test) {
            if (!this._errors[test.sessionId]) {
                this._errors[test.sessionId] = [];
            }
            this._errors[test.sessionId].push({
                id: test.id,
                timeElapsed: test.timeElapsed,
                error: util.getErrorMessage(test.error)
            });
            this.charm
                .write(LIGHT_RED)
                .write('×')
                .display('reset');
        };
        Reporter.prototype.testPass = function (test) {
            this.charm
                .write(LIGHT_GREEN)
                .write('✓')
                .display('reset');
        };
        Reporter.prototype.testSkip = function (test) {
            this.charm
                .write(LIGHT_MAGENTA)
                .write('~')
                .display('reset');
        };
        Reporter.prototype._writeCoverage = function () {
            var coverage;
            if (fs.existsSync(this._filename)) {
                coverage = JSON.parse(fs.readFileSync(this._filename, { encoding: 'utf8' }));
            }
            else {
                coverage = {};
                var coveredFiles_1 = this._collector.files();
                var instrumenter_1 = new Instrumenter({
                    noCompact: true,
                    noAutoWrap: true
                });
                glob.sync('dev/**/*.js').filter(function (filepath) {
                    return !intern.executor.config.excludeInstrumentation.test(filepath) && coveredFiles_1.indexOf(path.resolve(filepath)) === -1;
                }).forEach(function (filepath) {
                    try {
                        var wholename = path.resolve(filepath);
                        instrumenter_1.instrumentSync(fs.readFileSync(wholename, 'utf8'), wholename);
                        coverage[wholename] = instrumenter_1.lastFileCoverage();
                        for (var i in coverage[wholename].s) {
                            coverage[wholename].s[i] = 0;
                        }
                    }
                    catch (error) {
                        console.error(filepath + ': ' + error);
                    }
                });
            }
            this._collector.add(coverage);
            this._reporter.writeReport(this._collector, true);
        };
        return Reporter;
    }(Runner));
    return Reporter;
});
