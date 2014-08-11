/**
 * @preserve Copyright (c) 2013 British Broadcasting Corporation
 * (http://www.bbc.co.uk) and TAL Contributors (1)
 *
 * (1) TAL Contributors are listed in the AUTHORS file and at
 *     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
 *     not this notice.
 *
 * @license Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * All rights reserved
 * Please contact us for an alternative licence
 */

require.def("sampleapp/appui/components/maincomponent",
    [
        "antie/widgets/component",
        "antie/widgets/label",
        "antie/widgets/container",
        "antie/widgets/horizontalslider"
    ],
    function (Component, Label, Container, HorizontalSlider) {
        
        // All components extend Component
        return Component.extend({

            _truncationLabelContainers: null,
            _sizeSlider: null,
            _txtTruncationContainer: null,
            _placeholderText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum, nisi at pellentesque bibendum, sapien metus bibendum nisi, at malesuada ipsum erat et ligula. Nulla tincidunt purus non enim vestibulum placerat. Aliquam pretium risus sed est scelerisque dignissim. Cras id tristique mi. Cras vehicula neque ut lectus consectetur, ac fringilla erat sagittis. Etiam in rhoncus eros, in facilisis erat. Cras luctus elit ac pharetra vestibulum. Etiam eros eros, vehicula eget aliquam quis, consectetur porta dui. Maecenas venenatis, sem sed vestibulum imperdiet, tellus orci rhoncus lacus, nec interdum ipsum nunc sit amet velit. Sed lectus felis, venenatis non mollis et, rutrum eu dui. Donec eu venenatis odio, eget iaculis elit. Maecenas ultricies molestie molestie. Curabitur aliquam nunc a lacus porttitor viverra. In volutpat nisi eget fringilla gravida. Sed quis rhoncus metus.",

            init: function () {
                var self, headingLabel;

                self = this;

                // It is important to call the constructor of the superclass
                this._super("maincomponent");

                // Add the labels to the component
                headingLabel = new Label("heading", "Text Truncation");
                this.appendChildWidget(headingLabel);

                var scrubBarContainer = new Container();
                this._sizeSlider = new HorizontalSlider(null, 0, 0.01, 0.1);
                scrubBarContainer.appendChildWidget(this._sizeSlider);
                this.appendChildWidget(scrubBarContainer);

                self._txtTruncationContainer = new Container("txt-truncation-container");
                this.appendChildWidget(self._txtTruncationContainer);

                // Add a 'beforerender' event listener to the component to do anything specific that might need to be done
                // before rendering the component
                this.addEventListener("beforerender", function (evt) {
                    self._onBeforeRender(evt);
                });

                // calls Application.ready() the first time the component is shown
                // the callback removes itself once it's fired to avoid multiple calls.
                this.addEventListener("aftershow", function appReady(evt) {
                    self.getCurrentApplication().ready();
                    self.removeEventListener('aftershow', appReady);

                    self._sizeSlider.addEventListener("sliderchange", function() {
                        var fontSize = Math.ceil(self._sizeSlider.getValue() * 100);
                        self.renderTextTruncationBox(self._placeholderText, fontSize);
                    });
                });
            },

            renderTextTruncationBox: function(txt, fontSize) {
                if (this._truncationLabelContainers !== null) {
                    for (var i=0; i<this._truncationLabelContainers.length; i++) {
                        this._txtTruncationContainer.removeChildWidget(this._truncationLabelContainers[i]);
                    }
                }
                this._truncationLabelContainers = [];
                this._txtTruncationContainer.outputElement.style.fontSize = fontSize+"px";
                for (var i=0; i<4; i++) {
                    var container = new Container();
                    container.addClass("txt-truncation-block")
                    var label = new Label(txt);
                    label.setTruncationMode(Label.TRUNCATION_MODE_RIGHT_ELLIPSIS);
                    label.setMaximumLines(i === 0 ? null : i);
                    label.useCssForTruncationIfAvailable(i !== 0);
                    label.setSplitAtWordBoundary(i === 0);
                    if(i === 0) {
                        label.addClass("fill-container");
                    }
                    this._truncationLabelContainers.push(container);
                    container.appendChildWidget(label);
                    this._txtTruncationContainer.appendChildWidget(container);
                }
            },

            // Appending widgets on beforerender ensures they're still displayed
            // if the component is hidden and subsequently reinstated.
            _onBeforeRender: function () {

            }
        });
    }
);