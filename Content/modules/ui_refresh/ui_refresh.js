// ----------------------------------------------------------
// ui_refresh | Written by Paul Liu | paul.liu@open.ac.uk
// ----------------------------------------------------------
// The Open University © Copyright 2015. All rights reserved
// ----------------------------------------------------------

(function ($, ui) {
    ui.version = 'ui_refresh | Written by Paul Liu | paul.liu@open.ac.uk | v1.24 Re-namespace to ui_refresh';
    ui.dependencies = 'jQuery,jQueryUI';

    var $body = $('body');

    //Methods
    ui.maxCharLengthReached = function ($input, maximumCharLength, removeAlertFromDOMDelay) {
        var delay = removeAlertFromDOMDelay || 5000,
            valueLength,
            maxLength = maximumCharLength || $input.attr('maxlength'),
            message = '<p>The maximum character length of ' + maxLength + ' has been reached on this field.</p>';

        $input.keyup(function () {
            valueLength = this.value.length;

            if (valueLength == maxLength) {
                var alert = new aria.Alert({
                    message: message,
                    $alertTargetContainer: $body,
                    destroyDelay: delay
                });
            }
        });
    };
    ui.checkFunction = function (fn, base) {
        if (typeof fn === 'function') {
            fn(base);
        }
    };
    ui.matchChecker = function ($input1, $input2, event) {
        $input2.keyup(function () {
            var value = $(this).val(),
                input1Value = $input1.val();

            if (value === input1Value && input1Value.length > 0) {
                $input2.trigger(event);
            }
        });
    };
    ui.loopObject = function (object, callback) {
        var key;

        for (key in object) {
            if (object.hasOwnProperty(key)) {
                callback(key, object[key])
            }
        }
    };
    ui.preventFormSubmit = function ($input, $button) {
        $input.keydown(function (e) {
            if (e.which === 13) {
                e.preventDefault();
                if ($button.length) {
                    $button.focus().trigger('click');
                }
            }
        });
    };
    ui.obscurePasswordOnBlur = function ($input) {
        $input.on({
            blur: function () {
                $input.attr('type', 'password');
            },
            focus: function () {
                $input.attr('type', 'text');
            }
        });
    };

    //Aria
    var aria = {};
    aria.Alert = function (options) {
        var base = this;

        base.opts = $.extend({}, base.defaults, options);

        if (base.opts.init) {
            base.init(options);
        }
    };
    aria.Alert.prototype = {
        defaults: {
            init: true, //set as false to skip the automatic initialisation. Init manually.
            message: '',
            $alertTargetContainer: null, //Leave as null if you want to manually raise the alert by appending it to the DOM at a later time
            destroyDelay: null, //leave as null to prevent automatic removal of alert from dom. Remember to manually remove when alert not needed anymore.
            classes: 'cl-screenReaderAlert int-hide',
            attributes: {
                'role': 'alert'
            }
        },
        init: function () {
            var base = this,
                opts = base.opts;

            base.buildAlert(opts.message, opts.classes, opts.attributes);
            if (opts.$alertTargetContainer !== null) {
                base.appendAlertToDOM(opts.$alertTargetContainer);
            }
            if (opts.destroyDelay !== null) {
                base.removeAlertFromDOM(opts.destroyDelay);
            }

            return base;
        },
        buildAlert: function (message, classes, attributes) {
            var base = this,
                opts = base.opts;

            //Build alert
            base.$alert = $('<div>' + message + '</div>').addClass(classes);

            //Add attributes
            ui.loopObject(attributes, function (key, value) {
                base.$alert.attr(key.toString(), value.toString());
            });

            return base;
        },
        appendAlertToDOM: function ($container) {
            var base = this;

            $container.append(base.$alert);

            return base;
        },
        removeAlertFromDOM: function (delay) {
            var base = this;

            if (delay) {
                setTimeout(function () {
                    base.$alert.remove();
                }, delay);
            } else {
                base.$alert.remove();
            }

            return base;
        }
    };

    //Prototypes
    ui.EventPreventDefault = function ($el, options) {
        var base = this;

        base.opts = $.extend({}, this.defaults, options);
        base.$formEl = $el;
        base.init();
    };
    ui.EventPreventDefault.prototype = {
        defaults: {
            events: 'paste cut copy',
            ariaAlertsMarkup: {
                'paste': 'Paste prevented on this field. Please retype.',
                'cut': 'Cut prevented on this field.',
                'copy': 'Copy prevented on this field.'
            },
            destroyDelay: 5000
        },
        init: function () {
            return this.setEventHandler();
        },
        setEventHandler: function () {
            var base = this,
                o = base.opts,
                events = o.events,
                eventType;

            base.$formEl.on(events, function (e) {
                e.preventDefault();
                eventType = e.type;

                base.ariaAlert(o.ariaAlertsMarkup[eventType], o.destroyDelay);
            });

            return base;
        },
        ariaAlert: function (message, delay) {
            var alert = new aria.Alert({
                message: message,
                $alertTargetContainer: $body,
                destroyDelay: delay
            });
        }
    };

    ui.Tooltip = function ($input, $tooltipContainer, options) {
        this.opts = $.extend({}, this.defaults, options);
        this.$input = $input;
        this.$tooltipContainer = $tooltipContainer;
        this.$tooltip = $tooltipContainer.find('.cl-inputFocusTooltip').uniqueId();
        this.init(this.opts);
    };
    ui.Tooltip.prototype = {
        defaults: {
            alert: false,
            customTrigger: false,
            customTriggerShowEvent: undefined,
            customTriggerHideEvent: undefined,
            showTooltipCallback: undefined,
            hideTooltipCallback: undefined
        },
        init: function (opts) {
            var base = this;

            if (opts.customTrigger) {
                base.setCustomTriggerHandlers(opts);
            } else {
                base.setInputEventHandlers();
            }
            return base.aria();
        },
        setCustomTriggerHandlers: function (opts) {
            var base = this,
                eventHandlers = {};

            eventHandlers[opts.customTriggerShowEvent] = function () {
                base.showTooltip();
            };
            eventHandlers[opts.customTriggerHideEvent] = function () {
                base.hideTooltip();
            };

            base.$input.on(eventHandlers);

            return base.setEscapeHandler();
        },
        setInputEventHandlers: function () {
            var base = this;

            base.$input.on({
                focus: function () {
                    base.showTooltip();
                },
                blur: function () {
                    base.hideTooltip();
                }
            });

            return base.setEscapeHandler();
        },
        setEscapeHandler: function () {
            var base = this;

            base.$input.on({
                keyup: function (e) {
                    if (e.which == 27) {
                        base.hideTooltip();
                    }
                }
            });

            return base;
        },
        showTooltip: function () {
            var base = this,
                o = base.opts,
                $tooltip = base.$tooltip,
                tooltipIsVisible = $tooltip.is(':visible');

            if (!tooltipIsVisible) {
                $tooltip.show();
                base.setAriaHiddenExpanded();
                ui.checkFunction(o.showTooltipCallback, base);
            }
        },
        hideTooltip: function () {
            var base = this,
                o = base.opts,
                $tooltip = base.$tooltip,
                tooltipIsVisible = $tooltip.is(':visible');

            if (tooltipIsVisible) {
                $tooltip.hide();
                base.setAriaHiddenExpanded();
                ui.checkFunction(o.hideTooltipCallback, base);
            }
        },
        setAriaHiddenExpanded: function () {
            var $tooltip = this.$tooltip;

            $tooltip.attr({
                'aria-hidden': $tooltip.is(':hidden'),
                'aria-expanded': $tooltip.is(':visible')
            });
        },
        aria: function () {
            var base = this,
                o = base.opts,
                tooltipId = base.$tooltip.attr('role', (o.alert ? 'alert' : 'tooltip')).attr('id');

            base.$input.attr({
                'aria-haspopup': true,
                'aria-describedby': tooltipId,
                'aria-controls': tooltipId
            });

            base.setAriaHiddenExpanded();

            return base;
        }
    };

    ui.PasswordCheckList = function ($input, $checkList, options) {
        var base = this;

        base.opts = $.extend({}, this.defaults, options);
        base.$input = $input;
        base.$icons = $checkList.find('.cl-passwordCheckListBullet');
        base.$screenReaderAlertContainer = $('<div id="cl-passwordCheckList-screenReaderAlert" aria-live="assertive"></div>').appendTo('body');
        base.init();
    };
    ui.PasswordCheckList.prototype = {
        defaults: {
            regEx: {
                length: [8, 12],
                number: /[0-9]/,
                upperCase: /[A-Z]/,
                lowerCase: /[a-z]/,
                specialChar: /[!$%^&*\[\]@#\\\?\+\-_]/
            },
            iconsClasses: {
                defaultClass: 'int-icon-circle',
                checkedClass: 'int-icon-check-circle',
                uncheckedClass: 'int-icon-times-circle'
            },
            numberOfConditions: 5,
            alertConditions: [
                'be 8 to 12 characters in length',
                'include a number',
                'include a lower case letter',
                'include an upper case letter',
                'include a special character from the following, exclamation mark, dollar, percentage, caret, ampersand, ' +
                'asterisk, left bracket, right bracket, at sign, number sign, question mark, plus, hyphen, underscore'
            ],
            conditionsMetPrefixMarkup: '<p>The following password conditions have been met, password must: </p>',
            conditionsUnMetPrefixMarkup: '<p>Password conditions that still need to be met are, password must: </p>',
            conditionsAllMetMarkup: '<p>All 5 password conditions have been met.</p>'
        },
        init: function () {
            return this.setInputKeyUpHandler();
        },
        setInputKeyUpHandler: function () {
            var base = this,
                value,
                conditionsArray,
                o = base.opts,
                re = o.regEx,
                $input = base.$input,
                numberOfConditions = o.numberOfConditions;

            $input.keyup(function () {
                value = $input.val();
                conditionsArray = base.checkConditions(value, re);
                base.setIcons(value, numberOfConditions, conditionsArray);

                if ((value.length > 0)) {
                    var alert = new aria.Alert({
                        message: base.getScreenReaderAlertMessage(value, numberOfConditions, conditionsArray),
                        $alertTargetContainer: base.$screenReaderAlertContainer.empty()
                    });
                }
            });

            return base;
        },
        setIcons: function (value, numberOfConditions, conditionsArray) {
            var base = this,
                iconsClasses = base.opts.iconsClasses;

            if (value.length) {
                for (var i = 0; i < numberOfConditions; i++) {
                    base.$icons.eq(i)
                        .removeClass(iconsClasses.defaultClass)
                        .removeClass(iconsClasses.checkedClass)
                        .removeClass(iconsClasses.uncheckedClass)
                        .addClass((conditionsArray[i] ? iconsClasses.checkedClass : iconsClasses.uncheckedClass));
                }
            } else {
                base.$icons
                    .addClass(iconsClasses.defaultClass)
                    .removeClass(iconsClasses.checkedClass)
                    .removeClass(iconsClasses.uncheckedClass);
            }
        },
        checkConditions: function (inputValue, regEx) {
            var valueLength = inputValue.length;

            //8 to 12 characters long
            var reCharLength = (valueLength <= regEx.length[1] && valueLength >= regEx.length[0]);
            //A number
            var reNumber = regEx.number.test(inputValue);
            //An Upper Case
            var reUpperCase = regEx.upperCase.test(inputValue);
            //include one lowercase letter
            var reLowerCase = regEx.lowerCase.test(inputValue);
            //include one special-character from the following: ! $ % ^ & * [ ] @ # ? + - _
            var reSpecialChar = regEx.specialChar.test(inputValue);

            return [reCharLength, reNumber, reLowerCase, reUpperCase, reSpecialChar];
        },
        listItem: function (str) {
            return '<li>' + str + '</li>'
        },
        getScreenReaderConditionsMessage: function (conditionsArray) {
            var numberOfConditions = conditionsArray.length,
                listItems = '',
                base = this;

            if (numberOfConditions === 1) {
                return '<p>' + conditionsArray[0] + '</p>'
            } else {
                for (var i = 0; i < numberOfConditions; i++) {
                    listItems += base.listItem(conditionsArray[i]);
                }

                return '<ul>' + listItems + '</ul>';
            }
        },
        getScreenReaderAlertMessage: function (value, numberOfConditions, conditionsArray) {
            var base = this,
                o = base.opts,
                alertConditions = o.alertConditions,
                conditionsAllMetMarkup = o.conditionsAllMetMarkup,
                message,
                conditions = {
                    met: [],
                    unmet: []
                };

            for (var i = 0; i < numberOfConditions; i++) {
                conditions[(conditionsArray[i] ? 'met' : 'unmet')].push(alertConditions[i]);
            }

            if (conditions.met.length === numberOfConditions) {
                message = conditionsAllMetMarkup;
            } else {
                message =
                    o.conditionsMetPrefixMarkup + base.getScreenReaderConditionsMessage(conditions.met) +
                    o.conditionsUnMetPrefixMarkup + base.getScreenReaderConditionsMessage(conditions.unmet);
            }

            return message;
        }
    };

    ui.Modal = function ($container, options) {
        var base = this, o, s;
        base.$modalContainer = $container;
        base.opts = $.extend({}, base.defaults, options);

        o = base.opts;
        s = base.opts.selectors;

        base.$modal = $(s.modal, $container);
        base.modalId = base.$modal.uniqueId().attr('id');
        base.$overlay = $(s.overlay, $container);
        base.$closeButton = $(s.closeButton, $container);
        base.$background = $('html, body');
        base.$modalOpener = o.$modalOpener;
        base.$window = $(window);
        base.$scrollableElement = $(o.scrollableElementSelector);
        base.scrollPosition = undefined;
        base.init();
    };
    ui.Modal.prototype = {
        defaults: {
            selectors: {
                modal: '.cl-modal',
                overlay: '.cl-modal-overlay',
                closeButton: '.cl-modal-close-button'
            },
            closeModalButtonCallback: undefined,
            hideModalCallback: undefined,
            showModalCallback: undefined,
            $modalOpener: '',
            rememberScrollPosition: true,
            scrollableElementSelector: document,
            init: undefined //Define functions to fire on init;
        },
        init: function () {
            var base = this,
                o = base.opts;

            base.setCloseButtonClickHandler()
                .setModalOpenerClickHandler()
                .aria();

            base.invokeCallback(o.init);

            return base;
        },
        setCloseButtonClickHandler: function () {
            var base = this,
                callback = base.opts.closeModalButtonCallback,
                $modalOpener = base.$modalOpener;

            base.$closeButton.click(function () {
                base.hideModal();
                if ($modalOpener.length) {
                    $modalOpener.focus();
                }
                base.invokeCallback(callback);
            });

            return base;
        },
        invokeCallback: function (callback) {
            var base = this;

            if (typeof callback === 'function') {
                callback(base);
            }
        },
        setWindowsResizeHandler: function (bool) {
            var base = this,
                $window = base.$window;

            if (bool) {
                $window.on('resize.cl-modal', function () {
                    base.positionModal();
                });
            } else {
                $window.off('.cl-modal');
            }

            return base;
        },
        showModal: function () {
            var base = this,
                callback = base.opts.showModalCallback;

            base.$overlay.show(0, function () {
                base.positionModal()
                    .getBackgroundScrollPosition()
                    .setWindowsResizeHandler(true)
                    .setBackgroundScroll(false)
                    .setModalTabbing(true)
                    .setFocusToFirstTabbableElement()
                    .invokeCallback(callback);
            });

            return base;
        },
        hideModal: function () {
            var base = this,
                callback = base.opts.hideModalCallback;

            base.$overlay.hide(0, function () {
                base.setWindowsResizeHandler(false)
                    .setBackgroundScroll(true)
                    .setBackgroundScrollPosition()
                    .setModalTabbing(false)
                    .invokeCallback(callback);
            });

            return base;
        },
        setFocusToFirstTabbableElement: function () {
            var base = this;

            base.$modal.find(':tabbable').filter(':first').focus();

            return base;
        },
        positionModal: function () {
            var base = this;

            base.$modal.position({
                my: "center",
                at: "center",
                of: base.$overlay
            });

            return base;
        },
        setBackgroundScroll: function (bool) {
            var base = this,
                css = (bool ? {
                    'overflow': 'auto',
                    'height': 'auto'
                } : {
                    'overflow': 'hidden',
                    'height': '100%'
                });

            base.$background.css(css);

            return base;
        },
        getBackgroundScrollPosition: function () {
            var base = this,
                o = base.opts;

            if (o.rememberScrollPosition) {
                base.scrollPosition = base.$scrollableElement.scrollTop();
            }

            return base;
        },
        setBackgroundScrollPosition: function () {
            var base = this,
                o = base.opts;

            if (o.rememberScrollPosition) {
                base.$scrollableElement.scrollTop(base.scrollPosition);
            }

            return base;
        },
        aria: function () {
            var base = this;

            base.$modal.attr({
                'tabindex': -1,
                'role': 'dialog'
            });

            base.$overlay.attr({
                'role': 'presentation',
                'tabindex': '-1'
            });

            base.$closeButton.attr({
                'aria-label': 'Close modal'
            });

            return base;
        },
        setModalTabbing: function (bool) {
            var base = this;

            if (bool) {
                base.$modal.on('keydown.cl-modal', function (event) {
                    if (event.keyCode !== 9) {
                        return;
                    }
                    var tabbables = $(':tabbable', this),
                        first = tabbables.filter(':first'),
                        last = tabbables.filter(':last');

                    if (event.target === last[0] && !event.shiftKey) {
                        first.focus(1);
                        return false;
                    } else if (event.target === first[0] && event.shiftKey) {
                        last.focus(1);
                        return false;
                    }
                });
            } else {
                base.$modal.off('.cl-modal');
            }

            return base;
        },
        setModalOpenerClickHandler: function () {
            var base = this,
                $modalOpener = base.$modalOpener;

            if ($modalOpener.length) {
                $modalOpener.click(function (e) {
                    e.preventDefault();
                    base.showModal();
                }).attr('aria-controls', base.modalId);
            }

            return base;
        }
    };

    //jQuery Methods
    $.fn.autoFillChecker = function (callback, timeout) {
        var $base = $(this),
            lastValue = $(this).val(),
            currentValue = '',
            autoFillHasOccurred;
        setTimeout(checkInputValueForAutoFill, timeout);

        function checkInputValueForAutoFill() {
            currentValue = $base.val();
            autoFillHasOccurred = currentValue !== lastValue;

            if (autoFillHasOccurred) {
                lastValue = currentValue;
                callback();
            }
            setTimeout(checkInputValueForAutoFill, timeout);
        }

        return $base;
    };

    //Expose aria prototypes to global scope
    ui.aria = aria;

    //Create alias for ui_refresh
    window.cl5976 = ui;
})(jQuery, window.ui_refresh = window.ui_refresh || {});