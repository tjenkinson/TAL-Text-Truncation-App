(function() {
    // Stubbed device
    var stubbedDevice = {
        loadScript : function () {},
        getElementSize: function () {},
        setElementSize: function () {},
        scrollElementTo: function () {},
        getElementOffset: function () {},
        createBroadcastSource: function () {},
        isBroadcastSourceSupported: function () {},
        getConfig: function () {},
        exit: function () {},
        stopAnimation: function () {},
        moveElementTo: function () {},
        tweenElementStyle: function () {},
        showElement: function () {},
        hideElement: function () {},
        arrayIndexOf: function () {},
        setApplication: function () {},
        addKeyEventListener: function () {},
        getScreenSize: function () {},
        getCurrentRoute: function () {},
        getLogger: function () {},
        appendChildElement: function () {},
        getTopLevelElement: function () {},
        getStorage: function () {}
    };
    
    window.getDevice = function () {
        return stubbedDevice;
    };



    //Ignore Log messages
	window.log = {
		warn: function() {},
		info: function() {},
		error: function() {},
		debug: function() {}
	};

    this.antie = {
        framework: {
            deviceConfiguration: {"modules": {"base": "antie\/devices\/browserdevice", "modifiers": ["antie\/devices\/anim\/css3", "antie\/devices\/media\/html5", "antie\/devices\/data\/json2", "antie\/devices\/net\/default"]}, "mediasets": {"tv": "stb-all-h264", "radio": "stb-aac"}, "streaming": {"video": {"mediaSelectorAPI": "jsfunc", "mediaSelectorURI": "https:\/\/ipsecure.stage.bbc.co.uk\/mediaselector\/4\/jsfunc\/stream\/%vpid%\/%callback%", "mediaURIFormat": "%href%", "supported": [
                {"protocols": ["http"], "encodings": ["h264"], "maximumBitRate": 2800, "maximumVideoLines": 1080}
            ]}, "audio": {"mediaSelectorAPI": "jsfunc", "mediaSelectorURI": "https:\/\/ipsecure.stage.bbc.co.uk\/mediaselector\/4\/jsfunc\/stream\/%vpid%\/%callback%", "mediaURIFormat": "%href%", "supported": [
                {"protocols": ["http"], "encodings": ["aac"]}
            ]}}, "input": {"map": {"13": "ENTER", "37": "LEFT", "38": "UP", "39": "RIGHT", "40": "DOWN", "83": "SUBTITLE", "73": "INFO"}}, "accessibility": {"captions": {"supported": ["application\/ttaf+xml"]}}, "layouts": [
                {"width": 999999, "height": 999999, "module": "fixtures\/layouts\/toobig", "classes": ["toobig"]},
                {"width": 1280, "height": 720, "module": "fixtures\/layouts\/default", "classes": ["browserdevice720p"]}
            ], "deviceConfigurationKey": "devices-html5-1", "widgets": {"horizontalprogress": {"animate": false}, "componentcontainer": {"fade": false}, "horizontalcarousel": {"fade": true, "bindDelay": 10}}, "components": [], keycode: { accessDiagnostics: [7, 5, 9, 0] }}
        }
    };

        this.bbc = {
            redbuttonhtml : {
                config : {
                    istats: {
                        baseUrl: "http://sa.bbc.co.uk/bbc/int/s",
                        page: {
                            application: "name=home.redbutton.page",
                            redbutton: "name=redbutton.%page_name%.page",
                            global: "name=%page_name%.page"
                        }
                    },
                    stats: {
                        appName: "redbuttonhtml",
                        echoAPIKey: "1XXHMi3uHsG8nzAbiGvzdmdunFy5j4g5"
                    },
                    echoStats : {
                        baseUrl: "",
                        brand: "brand",
                        model: "model",
                        appName: "redbuttonhtml",
                        apiKey: "1XXHMi3uHsG8nzAbiGvzdmdunFy5j4g5",
                        runningEnvironment: "live",
                        traceId: "html-crb",
                        chamber: {
                            rum: "http://data.bbc.co.uk/v1/analytics-echo-chamber-inbound/rum",
                            comscore: "http://data.bbc.co.uk/v1/analytics-echo-chamber-inbound/comscore"
                        },
                        versions: {
                            echoClient: "0.8.0",
                            rumClient: "0.4.4",
                            appTag: "0.1.0"
                        }
                    },
                    timeouts: {
                        heartbeat_pulserate: 1
                    },
                    feeds: {
                        dataload: {
                            timeout: 30000
                        },
                        baseUrl: "http://open.live.bbc.co.uk/redbutton/",
                        navigation: "navigationprovider/navigation.json?platform=html"
                    },
                    resources: {
                        load: {
                            timeout: 10000
                        }
                    },
                    ignoreFlagpoles: true,
                    locale: "eng",
                    lang: {
                        eng: {
                            
                        }
                    },
                    featureToggles: {}
                }
            }
    };
            
    this.appConfig = this.bbc.redbuttonhtml.config;

    // Allows us to get round the JSHint failure related to runnning in strict mode
    // and using an uppercase method (which has to be assigned to a variable and used to pass JSLint)
    window.testCase = TestCase;

})();
