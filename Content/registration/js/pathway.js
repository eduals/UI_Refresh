// ----------------------------------------------------------
// Pathway | Written by Paul Liu | paul.liu@open.ac.uk
// ----------------------------------------------------------
// The Open University © Copyright 2014. All rights reserved
// ----------------------------------------------------------
//console.time("Pathway timer");
(function ($, document, window, pathway, eep, cl) {
    var $document = $(document),
        $body = $('body'),
        throbber = eep.Throbber,
        $nextButton = $("#nextButton"),
        $skipToHelpBox = $('#skipToHelpBoxButton'),
        $helpBox = $('#helpBox'),
        ie,
        $emailFormButton = $('#emailFormButton'),
        $emailFormModal = $('#emailFormModal'),
        $emailForm = $emailFormModal.find('#emailForm'),
        pageHasEmailForm = ($emailFormButton.length > 0 && $emailFormModal.length > 0);

    pathway.version = 'Pathway | v1.34 | Added cl5976 object';
    pathway.screenReader = false;
    pathway.setGlobalAjaxThrobber = (function () {
        //Global Ajax Throbber Calls
        $document.ajaxStart(function () {
            throbber.Start();
        }).ajaxStop(function () {
            throbber.Stop();
        }).ajaxError(function (event, jqxhr, settings, thrownError) {
            throbber.Stop();
        });
    })();
    pathway.ieVersion = (function () {
        var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');

        while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]);

        return v > 4 ? v : undef;
    })();

    ie = pathway.ieVersion;

    //Methods
    pathway.jsonBinder = function (inputsArray, jsonObject) {
        //Binds a set of json object values to a set of inputs
        var arrayLength = inputsArray.length;

        for (var i = 0; i < arrayLength; i++) {
            $(inputsArray[i].inputSelector).val(jsonObject[inputsArray[i].jsonKey]);
        }
    };
    pathway.inputEnter = function ($input, $button) {
        $input.keydown(function (e) {
            var keyPressed = e.which,
                isSubmit = keyPressed === 13;

            if (isSubmit) {
                e.preventDefault();
                $button.focus().trigger('click');
            }
        });
    };
    pathway.selectBinder = function (options) {
        var o = options,
            $select = o.$select,
            viewModel = o.viewModel,
            inputsArray = o.inputsArray,
            selectVal,
            currentDataSet;

        $select.change(function () {
            bindValuesToInputs();
        });

        bindValuesToInputs();

        function bindValuesToInputs() {
            selectVal = getSelectValue();
            currentDataSet = selectVal >= 0 ? viewModel[selectVal] : {};

            pathway.jsonBinder(inputsArray, currentDataSet);
        }

        function getSelectValue() {
            return parseInt($select.val());
        }
    };
    pathway.dateOfBirthInputGroup = function (options) {
        var defaults = {
                dayInputMaxLength: 2,
                monthInputMaxLength: 2,
                yearInputMaxLength: 4
            },
            o = $.extend({}, defaults, options),
            $dayInput = o.$dayInput.attr('maxlength', o.dayInputMaxLength),
            $monthInput = o.$monthInput.attr('maxlength', o.monthInputMaxLength),
            $yearInput = o.$yearInput.attr('maxlength', o.yearInputMaxLength),
            $exitInput = o.$exitInput;

        setInputKeyupHandler($dayInput, o.dayInputMaxLength, $monthInput);
        setInputKeyupHandler($monthInput, o.monthInputMaxLength, $yearInput);
        setInputKeyupHandler($yearInput, o.yearInputMaxLength, $exitInput);

        function setInputKeyupHandler($input, $inputMaxLength, $nextInput) {
            $input.keyup(function (e) {
                var maxCharactersReached = $input.val().length === $inputMaxLength,
                    keyPressed = e.which;

                //Prevent focusing next input if user is tabbing back.
                if (maxCharactersReached && keyPressed !== 9 && keyPressed !== 16) {
                    $nextInput.focus();
                }
            });
            return this;
        }
    };
    pathway.displayAlert = function (options) {
        var defaults = {
                type: 'default',
                message: '',
                $alertRegion: undefined,
                dismissible: true
            },
            o = $.extend({}, defaults, options),
            type = o.type,
            message = o.message,
            $alertRegion = o.$alertRegion,
            dismissible = o.dismissible,
            alertClass, iconClass;

        switch (type) {
            case 'error':
                alertClass = 'int-alert int-error';
                iconClass = ' int-icon-times-circle';
                dismissible = false;
                break;
            case 'success':
                alertClass = 'int-alert int-success';
                iconClass = ' int-icon-check-circle';
                break;
            default:
                alertClass = 'int-alert';
                iconClass = ' int-icon-exclamation-circle';
        }

        var $alert = $('' +
        '<div class="' + alertClass + '" role="alert">' + (dismissible ? '<a class="int-alertRemove int-icon-remove" href="#" title="Dismiss alert" role="button" aria-label="Dismiss alert"></a>' : '') +
        '<i  role="presentation" class="int-icon int-icon-2x' + iconClass + '"></i>' + message +
        '</div>');

        $alert.appendTo($alertRegion.empty());
    };
    pathway.nextButton = {
        setNextButton: function ($el) {
            $nextButton = $el;
        },
        setClickHandler: function ($form) {
            $nextButton.on('click.nextSubmit', function () {
                $form.submit();
            }).attr('aria-controls', $form.attr('id'));
        },
        removeClickHandler: function () {
            $nextButton.off('.nextSubmit');
        },
        enable: function () {
            $nextButton.prop('disabled', false);
        },
        disable: function () {
            $nextButton.prop('disabled', true);
        }
    };
    pathway.openPopup = function (sUrl, sType, sName, bClose, bNoFix, iW, iH) {
        var iPopUpErrors = 0;
        var oPopup = null;
        var bBigScreen = false;
        var sFeatures = 'scrollbars,resizable,location,status,menubar,toolbar';

        try {
            if (!sName) sName = '';
            if (screen.width > 1024 && screen.height > 768) bBigScreen = true;
            if (sType == 'info') {
                sFeatures = 'scrollbars,resizable';
                iW = 470;
                iH = 550;
            }
            if (sType == 'web') {
                sFeatures = 'scrollbars,resizable,location,status,menubar,toolbar';
                if (bBigScreen) {
                    iW = 750;
                    iH = 550;
                }
            }
            if (sType == 'webinfo') {
                sFeatures = 'scrollbars,resizable';
                if (bBigScreen) {
                    iW = 750;
                    iH = 550;
                }
            }
            if (iW && iH) sFeatures += ',width=' + iW.toString() + ',height=' + iH.toString();
        } catch (e) {
            LogError('OpenPopup error (' + sUrl + ',' + sType + ',' + sName + '): ' + e);
        }

        try {
            oPopup = window.open(sUrl, sName, sFeatures);
        } catch (e) {
            bClose = false;
            iPopUpErrors++;
            if (!bNoFix) window.location = sUrl;
        }
        if (oPopup)
            try {
                oPopup.focus();
            } catch (e) {
            }
        if (bClose) window.close();

        return oPopup;
    };
    pathway.alertDismissFocusJumper = function ($alertRegion, $formRegion) {
        $alertRegion.on('click', '.int-alertRemove', function () {
            $formRegion.find(':focusable').eq(0).focus();
        });
    };
    pathway.skipToHelpBox = (function () {
        $skipToHelpBox.click(function (e) {
            e.preventDefault();
            $helpBox.focus();
        });
    })();
    pathway.printPage = function (arrayOfContainers, url) {
        var w = window.open(url),
            content = '',
            html,
            lengthOfArray = arrayOfContainers.length;

        for (var i = 0; i < lengthOfArray; i++) {
            content += arrayOfContainers[i].html();
        }

        html = '<!DOCTYPE HTML>' +
        '<html lang="en-us">' +
        '<head>' +
        '<style>' +
        '.print-hide ' +
        '{' +
        'display: none;' +
        '}' +
        '.int-floatRight ' +
        '{' +
        'float: right;' +
        '}' +
        'a[href]:after ' +
        '{' +
        'content: "["attr(href)"]";' +
        '}' +
        'a[href*="#"]:after ' +
        '{' +
        'content: "";' +
        '}' +
        'dd ' +
        '{ ' +
        'display: block; ' +
        'margin:0;' +
        '}' +
        '</style>' +
        '</head>' +
        '<body>' + content + '</body></html>';

        if (w === null) {//This occurs when the enable protection mode is set in ie10.
            window.print();
        } else {
            w.document.write(html);
            w.document.close();
            w.focus();
            if (ie <= 9) {
                w.print();
                w.close();
            }
            if (ie === undefined || ie === null) {
                setTimeout(function () {
                    w.print();
                    w.close();
                }, 10);
            }
        }
    };
    pathway.setPrintButtonHandler = function ($button, $printContent, url) {
        $button.click(function (e) {
            e.preventDefault();
            pathway.printPage($printContent, url);
        });
    };

    //Prototypes
    pathway.Modal = cl.Modal;
    pathway.Modal.prototype = cl.Modal.prototype;

    //Initialisations
    if (pageHasEmailForm) {
        var emailFormModal = new pathway.Modal($emailFormModal, {
            $modalOpener: $emailFormButton,
            init: function () {
                $emailForm.submit(function (event) {

                    // Stop form from submitting normally
                    event.preventDefault();
                    console.log("submit");
                    // Get some values from elements on the page:
                    var $form = $emailForm,
                        term = $form.find("input[name='s']").val(),
                        url = $form.attr("action");

                    // Send the data using post
                    var posting = $.post(url, {s: term});

                    // Put the results in a div
                    posting.done(function (data) {
                        var content = $(data).find("#content");
                        $("#result").empty().append(content);
                    });
                });
            }
        });
    }

})(jQuery, document, window, window.Pathway = window.Pathway || {}, window.OU.EEP, window.cl5976 = window.cl5976 || {});
//console.timeEnd("Pathway timer");