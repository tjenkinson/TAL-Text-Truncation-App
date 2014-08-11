/* jshint node: true */
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            all: [
                "webapp/static-versioned/script/**/*.js",
                "webapp/static-versioned/script-tests/tests/**/*.js",
                "!webapp/static-versioned/script/tvpjslib/**/*.js",
                "!webapp/static-versioned/script/appui/widgets/keyboard.js"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        jasmine: {
            src: "webapp/static-versioned/script/**/*.js",
            options: {
                specs: "webapp/static-versioned/script-tests/tests/**/*.js",
                vendor: [
                    "webapp/static-versioned/script-tests/lib/sinon.js",
                    "webapp/static-versioned/script-tests/jasmine/jstestdriver-adapter.js",
                    "webapp/static-versioned/script-tests/lib/require.js",
                    "webapp/static-versioned/script-tests/prelude.js"
                ],
                helpers: [
                    "webapp/static-versioned/script-tests/jasmine/helpers/jasmine-extensions.js",
                    "webapp/static-versioned/script-tests/jasmine/helpers/spec-helpers.js"
                ],
                template: "webapp/static-versioned/script-tests/jasmine/SpecRunner.html",
                outfile: "webapp/static-versioned/script-tests/jasmine/WebRunner.html",
                display: "full",
                templateOptions: {
                    scriptRoot: "../..",
                    frameworkVersion: "1.5.2"
                }
            }
        },
        watch: {
            pivotal: {
                files: ["webapp/static-versioned/script/**/*.js", "webapp/static-versioned/script-tests/**/*.js"],
                tasks: ["test"],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.registerTask("hint", ["jshint"]);
    grunt.registerTask("test", ["jasmine"]);

    grunt.registerTask("full", ["jshint", "jasmine"]);

    grunt.registerTask("spec", ["jasmine:src:build", "openspec"]);

    grunt.registerTask("setBuildPath", "Set template option for build path before grunt test", function() {
        grunt.config("jasmine.options.templateOptions.scriptRoot", "../../build");
    });

    grunt.registerTask("useCISpecRunner", "Use the SpecRunnerForCI file (written as part of the build to get around Biscuit/TVPJSLib paths being different on CI)", function() {
        grunt.config("jasmine.options.template", "webapp/static-versioned/script-tests/jasmine/SpecRunnerForCI.html");
    });

    grunt.registerTask("testci", ["useCISpecRunner", "jasmine", "jshint"]);

    grunt.registerTask("openspec", "Open the generated Jasmine spec file", function() {
        var childProcess = require('child_process');
        var outfile = grunt.config("jasmine.options.outfile");
        grunt.log.writeln('Opening ' + outfile + '...');
        childProcess.exec("open " + outfile);
    });

    // should be an entire run through of all tasks, but the
    // codebase is in such disarray that the hinting produces more errors that can be
    // fixed by one single check in.
    grunt.registerTask("default", ["test"]);

    // Only run on files that have changed.
    var changedFiles = Object.create(null);
    var inFailure = false;

    var onChange = grunt.util._.debounce(function () {
        var reToTest = /([a-z]*)\.js$/i;
        var changedFile = Object.keys(changedFiles).toString();
        inFailure = true;

        // The first block caters for cases where either an source file
        // is being changed, or test files have the same name as the source
        // anyway.
        if (changedFile.indexOf("Test.js") === -1) {
            // Rewrite script/ to script-tests/. May need to be modified if your tests
            // live under a different folder, e.g. script-tests/tests/
            changedFile = changedFile.replace("script/", "script-tests/");

            // Reinstate the following line if your tests have a suffix.
            //changedFile = changedFile.replace(reToTest,"$1Test.js");

            grunt.config("jasmine.src", Object.keys(changedFiles));
            grunt.config("jasmine.options.specs", changedFile);

            grunt.config("jshint.all",Object.keys(changedFiles) );
        } else {
            // Required where your tests have a suffix compared to your source
            // files. This prunes 'Test' off the end of a source filename.
            var srcFromTestFile = changedFile;
            srcFromTestFile.replace("script-tests/", "script/");
            srcFromTestFile = srcFromTestFile.replace("Test.js",".js");
            grunt.config("jasmine.src", srcFromTestFile);
            grunt.config("jasmine.options.specs", Object.keys(changedFiles));

            grunt.config("jshint.all",Object.keys(changedFiles) );
        }

        changedFiles = Object.create(null);

    }, 200);

    grunt.event.on("watch", function (action, filepath) {
        changedFiles[filepath] = action;
        onChange();
    });

    grunt.event.on("jasmine.reportSpecResults",function (specId, result, fullName) {
        if (!result.passed) {
            var terminal = require("child_process").exec;
            var command = "terminal-notifier -title \"Test Failure\" "+
                "-subtitle \""+fullName.split("::")[0]+"\" "+
                "-message \"" +result.description+ "\" "+
                "-sound Sosumi "+
                "-group \"grunt-tests\" "+
                "-sender \"com.jetbrains.intellij\" "+
                "-activate \"com.jetbrains.intellij\"";

            terminal(command, function () {
            });
        } else {
            if (inFailure) {
                // Retest everything to confirm the fix
                inFailure = false;
                grunt.config("jasmine.src", "script/**/*.js");
                grunt.config("jasmine.options.specs", "script-tests/**/*.js");
                grunt.task.run("test");
            }
        }
    });
};
