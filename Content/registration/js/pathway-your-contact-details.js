//Version: 25 - Refactored so TitleSelect is reusable
//console.time("1");
(function ($, pathway) {
    var page = pathway.YourContactDetails = {},
        $addressFormContainer = undefined,
        $addressRegion = $('#addressListRegion'),
        $aboutYouRegion = $('#aboutYouRegion'),
        $findPostCodeButton = $('#findPostCodeButton'),
        $postcodeInput = $('#postcodeInput'),
        postcode,
        viewModel,
        $alertRegion = $('#alertRegion'),
        fastTransition = 250,
        slowTransition = 1000,
        titleSelect,
        region = {
            updateAboutYouRegion: function (result) {
                $aboutYouRegion.prepend(result);
            },
            display: function ($el, speed) {
                $el.slideDown(speed);
            },
            emptyAll: function () {
                $aboutYouRegion.empty();
                $addressRegion.empty();
                $alertRegion.empty();
            },
            hide: function ($el, speed) {
                $el.slideUp(speed);
            }
        },
        ajaxErrorMessage = function () {
            pathway.displayAlert({
                message: page.ajaxMessages.error.general,
                $alertRegion: $alertRegion
            });
        };

    page.titleGenderMapping = {
        male: [1, 8],
        female: [2, 3, 4, 7],
        neutral: [5, 6, 9, NaN],
        other: 10
    };
    page.UKViewModelMapping = [
        {
            inputSelector: '#addressInputLine1',
            jsonKey: 'AddressLine1'
        },
        {
            inputSelector: '#addressInputLine2',
            jsonKey: 'AddressLine2'
        },
        {
            inputSelector: '#addressInputLine3',
            jsonKey: 'AddressLine3'
        },
        {
            inputSelector: '#addressTownCityInput',
            jsonKey: 'Town'
        },
        {
            inputSelector: '#addressPostCodeInput',
            jsonKey: 'Postcode'
        }
    ];
    page.BFPOViewModelMapping = [
        {
            inputSelector: '#addressInputLine1',
            jsonKey: 'AddressLine1'
        },
        {
            inputSelector: '#addressInputLine2',
            jsonKey: 'AddressLine2'
        },
        {
            inputSelector: '#addressInputLine3',
            jsonKey: 'AddressLine3'
        },
        {
            inputSelector: '#addressTownCityInput',
            jsonKey: 'Town'
        },
        {
            inputSelector: '#addressPostCodeInput',
            jsonKey: 'Postcode'
        },
        {
            inputSelector: '#addressInputLine1Hidden',
            jsonKey: 'AddressLine1'
        },
        {
            inputSelector: '#addressPostCodeInputHidden',
            jsonKey: 'Postcode'
        }
    ];
    page.urls = {
        partialViews: {
            UK: 'Views/Shared/_AboutYouUK.html',
            Overseas: 'Views/Shared/_AboutYouNonUK.html',
            BFPO: 'Views/Shared/_AboutYouBFPO.html'
        },
        postcodeSearch: 'Data/AddressList2.json'
    };
    page.ajaxMessages = {
        noAddressFound: '<p>Sorry, we could not find your address.</p>' +
        '<p>If you live within a BFPO location, please enter a valid BFPO postcode in the field above and click the \'Find\' button.</p>' +
        '<p>If you live within the UK, please enter your address manually in the form below.</p>',
        addressFoundOneAddress: 'We have populated the form below from the postcode you gave us. Please correct if necessary and fill in the other details.',
        addressFoundMultipleAddresses: 'We have populated the form below from the address you selected. Please correct if necessary and fill in the other details.',
        addressNotListed: 'Please fill in the form below.',
        overseas: 'Please fill in the form below.',
        bfpo: 'Please fill in the form below.',
        error: {
            general: 'An error has occurred.'
        }
    };

    page.Postcode = function () {
        var postcode = undefined,
            lastSubmittedPostcode = undefined;

        return {
            setPostcode: function (val) {
                postcode = val;
            },
            getPostcode: function () {
                return postcode;
            },
            setLastSubmittedPostcode: function (val) {
                lastSubmittedPostcode = val;
            },
            getLastSubmittedPostcode: function () {
                return lastSubmittedPostcode;
            },
            isNewPostcode: function () {
                return lastSubmittedPostcode !== postcode;
            },
            hasLength: function () {
                return postcode.length > 0;
            },
            postcodeSearch: function (val, emptyRegionsEnableButton, searchPostcode, getOverseasPartialView) {
                this.setPostcode(val);

                if (this.isNewPostcode()) {
                    emptyRegionsEnableButton();
                    if (this.hasLength()) {
                        searchPostcode(postcode);
                    } else {
                        getOverseasPartialView();
                    }
                }

                this.setLastSubmittedPostcode(this.getPostcode());
            }
        };
    };
    page.ViewModel = function () {
        var viewModel = undefined,
            addressList = undefined;

        return {
            setViewModel: function (result) {
                viewModel = result;
                addressList = result.AddressList;
            },
            setAddressList: function (addressListArray) {
                addressList = addressListArray;
            },
            getAddressList: function () {
                return addressList;
            },
            determinePostcodeRoute: function (result) {
                this.setViewModel(result);
                var route = 0;

                //Routes
                //0 = UK no addresses,
                //1 = UK 1 Address,
                //2 = UK more than 1 Address,
                //3 = BFPO

                if (viewModel.PostcodeFormatValid) {
                    if (viewModel.IsBfpo) {
                        route = 3;
                    } else {
                        var addressArray = viewModel.AddressList;

                        if (addressArray === null) {
                            route = 0;
                        } else {
                            var numberOfAddresses = addressArray.length,
                                oneAddress = numberOfAddresses === 1,
                                moreThanOneAddress = numberOfAddresses >= 2;

                            if (oneAddress) {
                                route = 1;
                            }

                            if (moreThanOneAddress) {
                                route = 2;
                            }
                        }

                    }
                }

                return route;
            },
            postcodeRoute: function (result, routeFunctions) {
                routeFunctions[this.determinePostcodeRoute(result)]();
            },
            addressSelectBuilder: function () {
                var optionsMarkup = '', i,
                    addressCount = addressList.length;

                for (i = 0; i < addressCount; i++) {
                    var currentAddress = addressList[i],
                        optionText = (currentAddress.AddressLine1.length ? currentAddress.AddressLine1 : '')
                            + (currentAddress.AddressLine2.length ? ', ' + currentAddress.AddressLine2 : '')
                            + (currentAddress.AddressLine3.length ? ', ' + currentAddress.AddressLine2 : '')
                            + (currentAddress.Town.length ? ', ' + currentAddress.Town : '')
                            + (currentAddress.County.length ? ', ' + currentAddress.County : '');

                    optionsMarkup = optionsMarkup + '<option value="' + i + '">' + optionText + '</option>';
                }

                return '<div class="int-row hidden" id="addressListSelectContainer">' +
                '<div class="int-grid3"><label for="addressListSelect" class="int-floatRight">Address list</label></div>' +
                '<div class="int-grid6">' +
                '<select id="addressListSelect" aria-controls="yourDetailsRegion">' +
                '<option value="-1" disabled selected>Please select an address</option>' +
                '<option value="-1">Address is not listed</option>'
                + optionsMarkup +
                '</select>' +
                '</div>' +
                '</div>';
            }
        };
    };
    page.TitleSelect = function ($region, map, titleSelectSelector, genderSelectSelector, genderRowSelector, otherTitleInputSelector, otherTitleRowSelector) {
        var titleValue,
            $genderSelect,
            $genderSelectRow,
            val,
            isMaleTitle,
            isFemaleTitle,
            isOtherTitle,
            isGenderNeutralTitle,
            $otherTitleContainer,
            $otherTitleInput;

        function setGenderValue() {
            if (isMaleTitle) {
                val = "M";
                region.hide($genderSelectRow, 0);
            }
            if (isFemaleTitle) {
                val = "F";
                region.hide($genderSelectRow, 0);
            }
            if (isGenderNeutralTitle) {
                val = undefined;
            }

            $genderSelect.val(val);
        }

        function setOtherTitleValue() {
            $otherTitleInput.val((isOtherTitle ? '' : 'NA'));
        }

        function displayGenderSelect() {
            if (isGenderNeutralTitle || isOtherTitle) {
                region.display($genderSelectRow, fastTransition);
            }
        }

        function setOtherTitleInputVisibility() {
            region.hide($otherTitleContainer, 0);
            if (isOtherTitle) {
                region.display($otherTitleContainer, fastTransition);
            }
        }

        function isInArray(selectValue, array) {
            var intValue = parseInt(selectValue);

            return ($.inArray(intValue, array) > -1);
        }

        $region.on('change', titleSelectSelector, function () {
            titleValue = parseInt($(this).val());
            $genderSelect = $(genderSelectSelector);
            $genderSelectRow = $(genderRowSelector);
            isMaleTitle = isInArray(titleValue, map.male);
            isFemaleTitle = isInArray(titleValue, map.female);
            isOtherTitle = titleValue === map.other;
            isGenderNeutralTitle = $.inArray(titleValue, map.neutral) > -1 || isOtherTitle;
            $otherTitleContainer = $(otherTitleRowSelector);
            $otherTitleInput = $(otherTitleInputSelector);

            setGenderValue();
            setOtherTitleInputVisibility();
            setOtherTitleValue();
            displayGenderSelect();
        });
    };

    postcode = new page.Postcode();
    viewModel = new page.ViewModel();
    titleSelect = new page.TitleSelect($aboutYouRegion, page.titleGenderMapping, '#titleListSelect', '#genderSelect', '#genderSelectRow', '#otherTitleInput', '#otherTitleInputContainer');

    //Prevent submitting of main form when enter is triggered on the find postcode input
    pathway.inputEnter($postcodeInput, $findPostCodeButton);

    //Give first input focus when alert is dismissed
    pathway.alertDismissFocusJumper($alertRegion, $aboutYouRegion);

    //Submit Main Form
    $('#nextButton').click(function () {
        $aboutYouRegion.find('form').submit();
    });

    //Partial View Handlers
    function getBFPOPartialView() {
        $.ajax({
            url: page.urls.partialViews.BFPO,
            success: function (result) {
                region.updateAboutYouRegion(result);
                $addressFormContainer = $('#yourDetailsBFPOInteraction');
                pathway.displayAlert({
                    message: page.ajaxMessages.bfpo,
                    $alertRegion: $alertRegion,
                    type: 'success'
                });
                pathway.jsonBinder(page.BFPOViewModelMapping, viewModel.getAddressList()[0]);
                region.display($addressFormContainer, slowTransition);
                $.validator.unobtrusive.parse($addressFormContainer);
                pathway.nextButton.enable();
            },
            error: ajaxErrorMessage
        });
    }

    function getOverseasPartialView() {
        $.ajax({
            url: page.urls.partialViews.Overseas,
            success: function (result) {
                region.updateAboutYouRegion(result);
                $addressFormContainer = $('#yourDetailsNonUKInteraction');
                pathway.displayAlert({
                    message: page.ajaxMessages.overseas,
                    $alertRegion: $alertRegion,
                    type: 'success'
                });
                region.display($addressFormContainer, slowTransition);
                $.validator.unobtrusive.parse($addressFormContainer);
                pathway.nextButton.enable();
            },
            error: ajaxErrorMessage
        });
    }

    function getUKPartialView(initialiseSelectBinder, successCallbackFunction) {
        $.ajax({
            url: page.urls.partialViews.UK,
            success: function (result) {
                region.updateAboutYouRegion(result);
                $addressFormContainer = $('#yourDetailsUKInteraction');
                if (typeof successCallbackFunction === 'function') {
                    successCallbackFunction();
                }
                region.display($addressFormContainer, slowTransition);
                if (initialiseSelectBinder) {
                    pathway.selectBinder({
                        $select: $('#addressListSelect'),
                        viewModel: viewModel.getAddressList(),
                        inputsArray: page.UKViewModelMapping
                    });
                }
                $.validator.unobtrusive.parse($addressFormContainer);
                pathway.nextButton.enable();
            },
            error: ajaxErrorMessage
        });
    }

    function getAddressListPartialView() {
        $(viewModel.addressSelectBuilder())
            .prependTo($addressRegion)
            .find('#addressListSelect').one('change', function () {
                var optionValue = parseInt($(this).val());
                getUKPartialView(true, function () {
                    pathway.displayAlert({
                        type: 'success',
                        message: (optionValue === -1 ? page.ajaxMessages.addressNotListed : page.ajaxMessages.addressFoundMultipleAddresses),
                        $alertRegion: $alertRegion
                    });
                });
            });

        region.display($('#addressListSelectContainer'), fastTransition);
    }

    //Initialise click handler for find postcode button
    $findPostCodeButton.click(function () {
        postcode.postcodeSearch($postcodeInput.val(),
            function () {
                region.emptyAll();
                pathway.nextButton.disable();
            },
            function (postcode) {
                $.ajax({
                    url: page.urls.postcodeSearch,
                    type: "GET",
                    data: {"Postcode": postcode.toString()},
                    datatype: "application/json",
                    success: function (result) {
                        viewModel.postcodeRoute(result.Data, [
                            function () {
                                getUKPartialView(false, function () {
                                    $('#addressPostCodeInput').val($postcodeInput.val().toString().toUpperCase());
                                    pathway.displayAlert({
                                        message: page.ajaxMessages.noAddressFound,
                                        $alertRegion: $alertRegion
                                    });
                                });
                            },
                            function () {
                                getUKPartialView(false, function () {
                                    pathway.jsonBinder(page.UKViewModelMapping, viewModel.getAddressList()[0]);
                                    pathway.displayAlert({
                                        type: 'success',
                                        message: page.ajaxMessages.addressFoundOneAddress,
                                        $alertRegion: $alertRegion
                                    });
                                });
                            },
                            getAddressListPartialView,
                            getBFPOPartialView
                        ]);
                    },
                    error: ajaxErrorMessage
                });
            },
            function () {
                getOverseasPartialView();
            });
    });

})(jQuery, window.Pathway);
//console.timeEnd("1");