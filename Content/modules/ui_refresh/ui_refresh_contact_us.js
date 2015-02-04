(function ($, cl) {
    var viewModel = {
            addressList: undefined,
            addressListLength: undefined
        },
        url,
        $retypeEmail = $('#txtEmailConfirm'),
        $postcodeSearchRegion = $('#postcodeSearchRegion'),
        $addressRegion = $('#addressRegion'),
        $locationSelect = $('#locationSelect'),
        $postcodeSearchInput = $('#txtPostcode'),
        $postcodeSearchButton = $('#btnFindAddress'),
        retypeInputOptions = {
            alert: true,
            customTrigger: true,
            customTriggerShowEvent: 'paste retypeMatch',
            customTriggerHideEvent: 'blur'
        },
        $seeOnMap = $('#seeOnMap'),
        slowTransition = 1000,
        $addressList = $('#ddlSelectAddress'),
        $addressListContainer = $('#divSelectAddress'),
        $addressLine1 = $(".txtAddressLine1"),
        $addressLine2 = $(".txtAddressLine2"),
        $addressLine3 = $(".txtAddressLine3"),
        $town = $(".txtTown"),
        $county = $(".txtCounty"),
        $postcodeInput = $('#postcode'),
        $postcodeErrorAlert = $("#divFindAddressError");

    //Date of birth
    new cl.Tooltip($('#txtDateOfBirth'), $('#dobFi'));

    //Email
    new cl.Tooltip($retypeEmail, $('#retypeEmailFi'), retypeInputOptions);
    new cl.EventPreventDefault($retypeEmail, {events: 'paste'});

    //Other ways to contact us modal
    new cl.Modal($('#otherWaysToContactUsModal'), {
        $modalOpener: $("#otherWaysToContactUsModalOpener"),
        hideModalCallback: function () {
            $seeOnMap.attr('src', '');
        },
        showModalCallback: function () {
            $seeOnMap.attr('src', 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9820.03089022188!2d-0.707872!3d52.024957!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x26f33d629ce23606!2sOpen+University+Worldwide+Ltd!5e0!3m2!1sen!2suk!4v1423053543926');
        }
    });

    //Address Section
    new cl.Tooltip($postcodeSearchInput, $('#postcodeTooltip'));
    cl.preventFormSubmit($postcodeSearchInput, $postcodeSearchButton);
    cl.maxCharLengthReached($postcodeSearchInput);
    new cl.Tooltip($locationSelect, $('#locationSelectTooltip'));
    $locationSelect.change(function () {
        if (this.value == '1') {
            showPostcodeSearchForm();
        } else {
            $postcodeSearchRegion.hide();
        }
    });

    //Uncomment in live version Todo
    //url = "/" + window.location.pathname.split('/')[1] + "/CMSPages/OU/AddressSearchService.asmx/FindAddresses";
    //!Uncomment in live version

    //Delete in live version Todo
    var dummy0 = 'Content/modules/ui_refresh/data/dummy_data0.json';
    var dummy1 = 'Content/modules/ui_refresh/data/dummy_data2.json';
    url = dummy1;
    //!Delete in live version

    //Postcode Search
    $postcodeSearchButton.click(function () {
        clearAddressFields();
        hideAddressFinderError();
        hideAddressRegion();
        getAddressList();
        return false;
    });

    function getAddressList() {
        $.ajax({
            type: "POST",
            url: url, //Todo change this to a variable not an invocation
            crossDomain: true,
            contentType: "application/json",
            data: '{ postcode: "' + $postcodeSearchInput.val() + '" }',
            dataType: "json",
            error: function () {
                showAddressFinderError();
            },
            success: function (data) {
                viewModel.addressList = data.d;
                viewModel.addressListLength = data.d.length;

                emptyAddressList();

                if (viewModel.addressListLength == 0) {
                    hideAddressList();
                    showAddressFinderError();
                    showAddressRegion();
                } else {
                    buildAddress();
                    showAddressList();
                    $addressList.on('change', function (e) {
                        var valueSelected = this.value;
                        if (valueSelected == "-1") {
                            clearAddressFields();
                            $addressRegion.slideDown(1000);
                        } else {
                            $addressRegion.hide();
                            setAddressFields(viewModel.addressList[valueSelected]);
                        }
                    });
                }
            }
        });
    }

    function emptyAddressList() {
        $addressList.empty();
    }

    function showAddressList() {
        $addressListContainer.show();
    }

    function hideAddressList() {
        $addressListContainer.hide();
    }

    function buildAddress() {
        $addressList.append('<option value="" selected disabled>Select</option><option value="-1">Address is not listed</option>');
        var length = viewModel.addressListLength;

        for (var i = 0; i < length; i++) {
            var currentAddress = viewModel.addressList[i];
            $addressList.append("<option value='" + i + "'>" + currentAddress.TrimmedAddress + "</option>");
        }
        $addressListContainer.slideDown();
    }

    function hideAddressFinderError() {
        $postcodeErrorAlert.hide();
    }

    function showAddressFinderError() {
        $postcodeErrorAlert.slideDown();
    }

    function clearAddressFields() {
        $addressLine1.val('');
        $addressLine2.val('');
        $addressLine3.val('');
        $town.val('');
        $county.val('');
        $postcodeInput.val('');
    }

    function setAddressFields(selectedAddress) {
        $addressLine1.val(removeCommas(selectedAddress.AddressLine1));
        $addressLine2.val(removeCommas(selectedAddress.AddressLine2));
        $addressLine3.val(removeCommas(selectedAddress.AddressLine3));
        $town.val(removeCommas(selectedAddress.Town));
        $county.val(removeCommas(selectedAddress.County));
        $postcodeInput.val(removeCommas(selectedAddress.PostCode));
    }

    function removeCommas(str) {
        return str.replace(/,/g, '');
    }

    function showPostcodeSearchForm() {
        hideAddressRegion();
        $postcodeSearchRegion.slideDown();
    }

    function showAddressRegion() {
        $addressRegion.slideDown(slowTransition);
    }

    function hideAddressRegion() {
        $addressRegion.hide();
    }

    function showMessage() {
        var msgText = $(".ppt-alert").attr("value");
        if (msgText) {
            alert(msgText);
        }
    }

})(jQuery, window.cl5976);