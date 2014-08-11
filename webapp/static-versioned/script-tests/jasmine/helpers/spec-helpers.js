function getMockDevice () {
    return {
        setElementClasses: function () {},
        createContainer: function () {
            console.log("Creating container.");
        },
        appendChildElement: function () {
            console.log("Appending child element.");
        },
        setApplication: function () {},
        addKeyEventListener: function () {},
        getScreenSize: function () {},
        getConfig: function () {},
        getTopLevelElement: function () {},
        getCurrentRoute: function () {},
        exit: function () {},
        getHistorian: function () {},
        getFocussedWidget: function () {},
        createBroadcastSource : function () {},
        isBroadcastSourceSupported: function () {},
        arrayIndexOf: function() {}
    };
}


function setupApplicationMock(Application, mockDevice) {
    var mockCurrentApplication = createSpyInstance(Application);
    mockCurrentApplication.getDevice.and.returnValue(mockDevice);
    mockCurrentApplication.appendChildWidget.call
    spyOn(Application, "getCurrentApplication").and.returnValue(mockCurrentApplication);
    
    return mockCurrentApplication;
}