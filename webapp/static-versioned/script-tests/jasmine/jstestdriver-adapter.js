TestCase = function (description, testSuiteClass) {
    function createWrappedTearDown(originalTearDown) {
        return function() {
            if (originalTearDown) {
                originalTearDown.apply(this);
            }

            if (window._currentExpectedAsserts !== undefined) {
                if (window._currentExpectedAsserts !== window._currentActualAsserts) {
                    throw new Error('Expected ' + window._currentExpectedAsserts + ' assertions, got ' + window._currentActualAsserts);
                }
            }
        };
    }
    
    function createWrappedSetUp(originalSetUp, additionalFns) {
        return function () {
            window._currentExpectedAsserts = undefined;
            window._currentActualAsserts = undefined;
            
            for (var fnName in additionalFns) {
                if (!(fnName in this)) {
                    this[fnName] = additionalFns[fnName];
                }
            }
            
            if (originalSetUp) {
                originalSetUp.apply(this);
            }
        };
    }

    var testFns = {};
    var setup;
    var tearDown;
    var otherFns = {};

    for (var propertyName in testSuiteClass) {
        var fn = testSuiteClass[propertyName];

        if (propertyName.indexOf("test") === 0) {
            testFns[propertyName] = fn;
        } else if (propertyName === "setUp") {
            setup = fn;
        } else if (propertyName === "tearDown") {
            tearDown = fn;
        } else {
            otherFns[propertyName] = fn;
        }
    }

    var specDefinitions = function () {
        beforeEach(createWrappedSetUp(setup, otherFns));

        for (var testName in testFns) {
            it(testName, testFns[testName]);
        }

        afterEach(createWrappedTearDown(tearDown));
    };

    describe(description, specDefinitions);
};

testCase = TestCase;

expectAsserts = function(count) {
    window._currentExpectedAsserts = count;
};

assert = function (msg, condition) {
    if (arguments.length < 2) {
        condition = msg;
    }
    expect(condition).toBe(true);
    increaseCurrentAssertionCount();
};

assertTrue = assert;

assertFalse = function (msg, condition) {
    if (arguments.length < 2) {
        condition = msg;
    }
    expect(condition).toBe(false);
    increaseCurrentAssertionCount();
};

assertEquals = function (msg, thing1, thing2) {
    if (arguments.length < 3) {
        thing2 = thing1;
        thing1 = msg;
    };
    expect(thing2).toEqual(thing1);
    increaseCurrentAssertionCount();
};

assertNotEquals = function (msg, thing1, thing2) {
    if (arguments.length < 3) {
        thing2 = thing1;
        thing1 = msg;
    };
    expect(thing2).not.toEqual(thing1);
    increaseCurrentAssertionCount();
};

assertSame = function (msg, thing1, thing2) {
    if (arguments.length < 3) {
        thing2 = thing1;
        thing1 = msg;
    };
    expect(thing2).toBe(thing1);
    increaseCurrentAssertionCount();
};

assertNull = function (msg, thing) {
    if (arguments.length < 2) {
        thing = msg;
    }
    expect(thing).toBe(null);
    increaseCurrentAssertionCount();
};

assertNaN = function (thing) {
    expect(isNaN(thing)).toBe(true);
    increaseCurrentAssertionCount();
};

assertNotNull = function (msg, thing) {
    if (arguments.length < 2) {
        thing = msg;
    }
    expect(thing).not.toBe(null);
    increaseCurrentAssertionCount();
};

assertInstanceOf = function (msg, clazz, thing) {
    if (arguments.length < 3) {
        thing = clazz;
        clazz = msg;
    };
    expect(thing instanceof clazz).toBe(true);
    increaseCurrentAssertionCount();
};

assertUndefined = function (msg, thing) {
    if (arguments.length < 2) {
        thing = msg;
    }
    expect(thing).toBeUndefined();
    increaseCurrentAssertionCount();
};

assertNotUndefined = function (msg, thing) {
    if (arguments.length < 2) {
        thing = msg;
    }
    expect(thing).toBeDefined();
    increaseCurrentAssertionCount();
};

assertObject = function (msg, thing) {
    if (arguments.length < 2) {
        thing = msg;
    }
    expect(thing).toEqual(jasmine.any(Object));
    increaseCurrentAssertionCount();
};

assertNumber = function(msg, thing) {
    if (arguments.length < 2) {
        thing = msg;
    }
    expect(thing).toEqual(jasmine.any(Number));
    increaseCurrentAssertionCount();
};

assertFunction = function (msg, thing) {
    if (arguments.length < 2) {
        thing = msg;
    }
    expect(thing).toEqual(jasmine.any(Function));
    increaseCurrentAssertionCount();
};

assertException = function (msg, fn, error) {
    if (arguments.length < 3) {
        error = fn;
        fn = msg;
    }

    expect(fn).toThrow();
    increaseCurrentAssertionCount();
};

assertNoException = function (msg, fn) {
    if (arguments.length < 2) {
        fn = msg;
    }

    expect(fn).not.toThrow();
    increaseCurrentAssertionCount();
};

increaseCurrentAssertionCount = function () {
    if (window._currentActualAsserts === undefined) {
        window._currentActualAsserts = 0;
    }
    
    window._currentActualAsserts++;
};

jstestdriver = {
    console: {
        log: function( msg ){
            console.log( msg )
        },
        warn: function(msg) {
            console.warn(msg)
        },
        error: function(msg) {
            console.error(msg);
        },
        debug: function(msg) {
            console.debug(msg);
        }
    }
};
