require(
    [
        "antie/widgets/component",
        "antie/widgets/container",
        "antie/widgets/label",
        "antie/widgets/button",
        "antie/events/componentevent",
        "antie/application",
        "sampleapp/appui/components/maincomponent"
    ],
    function (Component, Container, Label, Button, ComponentEvent, Application, MainComponent) {

        "use strict";

        describe("Main Component", function () {

            var mainComponent;
            var mainComponentShown;

            beforeEach(function () {
                var device = getMockDevice();
                setupApplicationMock(Application, device);
                mainComponent = new MainComponent();
                mainComponentShown = false;
                mainComponent.addEventListener("aftershow", function() {
                    mainComponentShown = true;
                });
            });

            describe("on construction", function () {

                it("should have the correct ID", function () {
                    expect(mainComponent.id).toBe("maincomponent");
                });

            });

            describe("after MainComponent has been shown", function () {

                beforeEach(function(done) {
                    if (mainComponentShown) {
                        console.log("DONE 2");
                        done();
                    }
                    else {
                        mainComponent.addEventListener("aftershow", function() {
                            console.log("DONE");
                            mainComponentShown = true;
                            done();
                        });
                    }
                });

                describe("on text and font set to a string that should fit without truncation", function () {

                    it("the entire input text should be used in the output", function () {

                        mainComponent.renderTextTruncationBox("some text", 12);
                        expect(mainComponent.id).toBe("maincomponent");
                    });

                });

            });

        });
    });