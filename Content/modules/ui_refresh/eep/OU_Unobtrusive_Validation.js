/// unobtrusive validation built using jquery validate
/// http://jquery.bassistance.de/validate/
/// dependencies
/// http://jquery.bassistance.de/validate/jquery.validate.js
/// http://jquery.bassistance.de/validate/additional-methods.js

/// implementation

window._form = $("form");

/// wire-up checkboxes and radios on blur to validate
$(document).on("ready", function () {
    $("form input[type=checkbox], form input[type=radio]").on("click change", function () {
        window._form.validate().element(this);
    });

    $(document).on("click", "li.is-error > a", function (e) {
        var formField = $(this).parent().attr('for');
        var formFieldId;
        if (formField.indexOf("$") > 0)
            formFieldId = $("[name='" + formField + "']").attr("id");
        else
            formFieldId = formField;

        $("#" + formFieldId).focus();
        if ($("#" + formFieldId).length > 0)
            $("html, body").animate({
                scrollTop: $("#" + formFieldId).offset().top
            }, "fast");
        e.stopImmediatePropagation();
        e.preventDefault();
    });

    $.validator.clearErrors = function () {
        // remove the red border
        var $errors = $(".is-error");
        $errors.removeClass("is-error");
        
        // remove items from the summary
        $("#error-box ul li").each(function () {
            $(this).remove();
        });

        
        setTimeout(function () {
            // hide the summary
          $('#error-box').hide();
        }, 1);

       

        //remove inline items
        $('span.int-errorMessage').each(function () {
            $(this).remove();
        });
    };
    
    $(".clear-errors").click($.validator.clearErrors);
});

/// attach validation to current <form>
function initValidation(showErrorMessagesInline) {
    window._form.validate({
        errorClass: "is-error",
        focusInvalid: false,
        invalidHandler: function (form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $("html, body").animate({
                    scrollTop: $("#error-wrapper").offset().top
                }, "fast");
            }
        },
        onclick: function(element) { },
        onfocusout: function (element) {
            this.element(element);
        },
        onkeyup: false,
        errorPlacement: function (error, element) {
            return true;
        },


        showErrors: function (errorMap, errorList) {
            this.defaultShowErrors();
            
            // when we show and hide validation messages, it causes elements to move up or down the page. 
            // if the user clicks on submit (for example), first validation kicks in, possibly causing the submit button to move, and 
            // so the button never actually receives the click event.
            // I have made a change so that when we hide or show anything, we do so by adding a class (show-me / remove-me)
            // and actually show or hide after a short delay

            var currentForm = this.currentForm;
            var errorBoxList = $("#error-box ul");

            $.each(errorList, function () {
                var currentElementPosition = getFormPosition(currentForm, this.element.id);
                var identifier = this.element.id;
                var errorMessage = errorBoxList.find("li[for='" + identifier + "']");
                var currentElement = $(this.element);
                var currentElementSpan = "span[for='" + identifier + "']";

                // remove error from summary if it already exists
                if (errorMessage.length) {
                    errorMessage.addClass("remove-me");
                }

                // add error to summary
                errorBoxList.append('<li for="' + identifier + '" pos="' + currentElementPosition + '" style="display: none;" class="show-me" data-validation-target-name="' + this.element.name + '">' + this.message + '</li>');

                if (showErrorMessagesInline && !currentElement.hasClass("validate-noinline")) {
                    // check if there is a span after the current element which matches the name of the element, and remove the message if it exists
                    if (currentElement.next(currentElementSpan).length) {
                        currentElement.next(currentElementSpan).addClass("remove-me");
                    }
                    // check if there is a span after the next element which matches the name of the element 
                    if (currentElement.next().next(currentElementSpan).length == 0) {
                        var elementToAppendMessageAfter = this.element;
                        // check if the element in focus is a checkbox
                        if ($(elementToAppendMessageAfter).is(':checkbox')) {
                            // set the element to append the inline error after to the next element and not the one in focus
                            var nextElement = $(elementToAppendMessageAfter).next();
                            if (nextElement.is('label')) {
                                elementToAppendMessageAfter = nextElement;
                            }
                        }

                        // display inline error message 
                        $('<span class="int-errorMessage show-me" for="' + identifier + '" role="alert" aria-live="assertive" style="display:none;" data-validation-target-name="' + this.element.name + '">' + this.message + '</span>').appendTo($(elementToAppendMessageAfter).parent());
                    }
                }
            });

            // persist sort order

            var arr = [];
            errorBoxList.find("li").each(function () {
                var meta = $(this);
                arr.push(meta);
            });
            arr.sort(compare);
            $.each(arr, function (index, item) {
                item.appendTo(item.parent());
            });

            if (errorBoxList.find("li").size() > 0) {
                $('#error-box').addClass("show-me");
            }

            if (errorList.length == 0) {
                if (this.currentElements.length > 0) {
                    if (this.currentElements[0]) {
                        if (this.currentElements[0].id == "txtAddressLine1" ||
                            this.currentElements[0].id == "txtTown" ||
                            this.currentElements[0].id == "txtLookUpPostCode") {
                            if ($('#txtAddressLine1').val() == '' &&
                                $('#txtTown').val() == '' &&
                                $('#txtLookUpPostCode').val() == '') {
                                $('li[for=txtAddressLine1]').remove();
                                $('li[for=txtTown]').remove();
                                $('li[for=txtLookUpPostCode]').remove();
                                $('#txtAddressLine1').removeClass("is-error");
                                $('#txtTown').removeClass("is-error");
                                $('#txtLookUpPostCode').removeClass("is-error");
                                $('.int-errorMessage[for=txtAddressLine1]').hide();
                                $('.int-errorMessage[for=txtTown]').hide();
                                $('.int-errorMessage[for=txtLookUpPostCode]').hide();
                            } else {
                                if (this.currentElements[0].id == "txtLookUpPostCode" && $('#txtLookUpPostCode').val() != '') {
                                    $('li[for=txtLookUpPostCode]').remove();
                                    $('#txtLookUpPostCode').removeClass("is-error");
                                    $('.int-errorMessage[for=txtLookUpPostCode]').hide();
                                }
                            }
                        }
                    }
                }

                //$('.show-me').hide();
                //$('.int-errorMessage').hide();
                //$('.show-me').removeClass("show-me");
            }

            //if (errorBoxList.find("li").size() < 1) {
            //    $('#error-box').addClass("remove-me");
            //    $('#error-box').removeClass("show-me");
            //}

            // now actually display the changes on the ui after a short delay
            setTimeout(function () {
                $(".show-me").show().removeClass("show-me");
                $(".remove-me").remove();
                if ($('#error-box ul li').length == 0 && $('#error-box').is(':visible'))
                    $('#error-box').hide();
            }, 250);
        },

        success: function (error) {
            var $errorBoxList = $("#error-box ul");
            var errorId = error.attr("for");

            $.each($errorBoxList.find("li"), function () {
                var $errorMessage = $(this);               
                if (errorId == $errorMessage.attr("for") || errorId == $errorMessage.attr("data-validation-target-name")) {
                    $errorMessage.remove();
                }
            });

            if ($errorBoxList.find("li").size() == 0) {
              $('#error-box').hide();
            }

            if (showErrorMessagesInline) {
                var $inlineErrors = $('span.int-errorMessage');
                $.each($inlineErrors, function () {
                    var $inlineError = $(this);
                    if (errorId == $inlineError.attr("for") || errorId == $inlineError.attr("data-validation-target-name")) {
                        $inlineError.remove();
                    }
                });
            }
        },
        submitHandler: function (form) {
            form.submit();
        },
        validClass: ""
    });

    /// custom methods

    /// letters and allowed characters (for use with address)
    $.validator.addMethod("addressalphas",
        function (value, element) {
            return this.optional(element) || value.match(/^[0-9a-zA-Z-'()"&/ ]+$/);
        },
        "Please enter only letters and the following characters - ' ( ) \" & /"
    );

    /// letters and allowed characters (for use with forename, surname, etc.)
    $.validator.addMethod("alphas",
        function (value, element) {
            return this.optional(element) || value.match(/^[a-zA-Z-'()@/ ]+$/);
        },
        "Please enter only letters and the following characters - ' ( ) @ /"
    );

    $.validator.addMethod("surnamealphas",
                function (value, element) {
                    return this.optional(element) || value.match(/^[a-zA-Z-'()@ ][a-zA-Z-'()@/ ]*$/);
                },
        "Please enter only letters and the following characters - ' ( ) @ /, you cannot have / at the beginning"
    );

    $.validator.addMethod("simplifiedEmail",
               function (value, element) {
                   return this.optional(element) || value.match(/^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}[\s]*$/);
               },
       "Please enter a valid email address"
   );
    //^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}[\\s]*$
    /// UK date format
    $.validator.addMethod("dateUK",
        function (value, element) {
            var check = false;
            var re = /^\d{2}\/\d{2}\/\d{4}$/;
            if (re.test(value)) {
                var adata = value.split('/');
                var dd = parseInt(adata[0], 10);
                var mm = parseInt(adata[1], 10);
                var yyyy = parseInt(adata[2], 10);
                var xdata = new Date(yyyy, mm - 1, dd);
                if ((xdata.getFullYear() == yyyy) && (xdata.getMonth() == mm - 1) && (xdata.getDate() == dd))
                    check = true;
                else
                    check = false;
            } else
                check = false;
            return this.optional(element) || check;
        },
        "Please enter a date in the format dd/mm/yyyy"
    );

    /// maximum age (for use with date of birth)
    $.validator.addMethod("maxage",
        function (value, element, params) {
            var adata = value.split('/');
            var dd = parseInt(adata[0], 10);
            var mm = parseInt(adata[1], 10);
            var yyyy = parseInt(adata[2], 10);
            var age = params;

            var mydate = new Date();
            mydate.setFullYear(yyyy, mm - 1, dd);

            var currdate = new Date();
            currdate.setFullYear(currdate.getFullYear() - age);

            return this.optional(element) || currdate < mydate;
        },
        "Please enter a valid age"
    );

    /// minimum age (for use with date of birth)
    $.validator.addMethod("minage",
        function (value, element, params) {
            var adata = value.split('/');
            var dd = parseInt(adata[0], 10);
            var mm = parseInt(adata[1], 10);
            var yyyy = parseInt(adata[2], 10);
            var age = params;

            var mydate = new Date();
            mydate.setFullYear(yyyy, mm - 1, dd);

            var currdate = new Date();
            currdate.setFullYear(currdate.getFullYear() - age);

            return this.optional(element) || currdate >= mydate;
        },
        "Please enter a valid age"
    );

    /// Check date is in the past
    $.validator.addMethod("mustbeinpast",
                function (value, element, params) {
                    var adata = value.split('/');
                    var dd = parseInt(adata[0], 10);
                    var mm = parseInt(adata[1], 10);
                    var yyyy = parseInt(adata[2], 10);

                    var mydate = new Date();
                    mydate.setFullYear(yyyy, mm - 1, dd);

                    var currdate = new Date();

                    return this.optional(element) || currdate > mydate;
                },
        "Date of birth must be in the past"
    );

    /// UK or international phone number
    $.validator.addMethod("phoneUK",
        function (value, element) {
            var valLength = value.replace(" ", "").length;
            if (valLength > 0) {
                if (value.replace(" ", "").match(/^(?:\+|00)/)) {
                    return this.optional(element) ||
                        value.match(/^(?:\+|00 ?)(?:[0-9] ?){10,16}$/);
                } else {
                    return this.optional(element) ||
                        value.match(/^(?:[0-9] ?){10,11}$/);
                }
            } else {
                return this.optional(element) && valLength == 0;
            }
        },
        "Please enter a valid phone number"
    );

    $.validator.addMethod("notEqualTo",
        function (value, element, param) {
            // bind to the blur event of the target in order to revalidate whenever the target field is updated
            var target = $(param);
            if (this.settings.onfocusout) {
                target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                    $(element).valid();
                });
            }
            return value != target.val();
        }
    );


    /// letters and allowed characters (for use with postcode)
    $.validator.addMethod("postcodealphas",
        function (value, element) {
            return this.optional(element) || value.match(/^[0-9a-zA-Z ]+$/);
        },
        "Please enter only letters and numbers"
    );


    $.validator.addMethod("password",
      function (value, element) {
          return this.optional(element) || value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[\!\*\^\?\]\[\+\-_@#$%&]).{8,12}$/);
      },
      "Please enter a valid password"
  );

    $.validator.addMethod("textareamax",
        function (value, element, params) {
            var tmpValue = value.replace(/\r?\n|\r/g, "----");
            return this.optional(element) || tmpValue.length <= params;
        },
        "Please enter the correct number of characters"
    );

    /// helper functions 


    function getFormPosition(currentForm, elementId) {
        for (var i = 0; i < currentForm.length; i++)
            if (currentForm[i].id == elementId)
                return i;
    }

    function compare(a, b) {
        return a.attr("pos") - b.attr("pos");
    }


}