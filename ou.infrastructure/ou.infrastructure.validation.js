/// <reference path="../../tests/ou.infrastructure.validation.tests/client/lib/jquery/jquery-1.7.1.js" />
/// <reference path="../../tests/ou.infrastructure.validation.tests/client/lib/jquery/jquery.validate.js" />
/// <reference path="../../tests/ou.infrastructure.validation.tests/client/lib/jquery/jquery.validate.unobtrusive.js" />

(function ($) {

    $.validator.addMethod("pastdatevalidator", function (value, element, params) {

        var minYear = params.minyear;
        var maxYear = params.maxyear;
        var blankInputErrorMessage = params.blankinputerrormessage;
        var invalidRangeErrorMessage = params.invalidrangeerrormessage;
        var dateMustBeInPastErrorMessage = params.datemustbeinpasterrormessage;

        // Compress spacing and trim.
        value = $.trim(value.replace(/\s+/g, ' '));

        // Optional?
        if (params.optional == "true" && value == "")
            return true;

        // Empty string?
        if (value == "") {
            $.validator.messages["pastdatevalidator"] = blankInputErrorMessage;
            return false;
        }

        // Formatting
        try {
            var date = new window.OuFormatters().pastDateFormatter(value, params);
        } catch (e) {
            $.validator.messages["pastdatevalidator"] = e;
            return false;
        }

        // Date range?
        if (date.getFullYear() < minYear || date.getFullYear() > maxYear) {
            $.validator.messages["pastdatevalidator"] = invalidRangeErrorMessage;
            return false;
        }

        // Date not in the past?
        var now = new Date();
        var nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (date >= nowDate) {
            $.validator.messages["pastdatevalidator"] = dateMustBeInPastErrorMessage;
            return false;
        }

        return true;
    });

    $.validator.addMethod("postcodevalidator", function (value, element, params) {

        if (params.optional == "true" && value == "")
            return true;

        var minLength = params.minimumlength;
        var maxLength = params.maximumlength;
        var lengthErrorMessage = params.lengtherrormessage;
        var regexErrorMessage = params.regexerrormessage;
        var invalidBfpoErrorMessage = params.invalidbfpoerrormessage;
        var invalidPostcodeErrorMessage = params.invalidpostcodeerrormessage;

        value = value.replace(/\s/g, '').toUpperCase();

        // Length check        
        if (value.length < minLength || value.length > maxLength) {
            $.validator.messages["postcodevalidator"] = lengthErrorMessage;
            return false;
        }

        // Regex check
        if (!value.match(/^\w*$/)) {
            $.validator.messages["postcodevalidator"] = regexErrorMessage;
            return false;
        }

        // Validate BFPO postcode
        // Must start with BFPO and be followed by 1-4 digits
        if (value.indexOf("BFPO") == 0) {
            if (!value.match(/^BFPO\d{1,4}$/)) {
                $.validator.messages["postcodevalidator"] = invalidBfpoErrorMessage;
                return false;
            }
            return true;
        }

        // Validate standard postcode. Formats allowed:
        // AN NAA
        // ANN NAA
        // AAN NAA
        // ANA NAA
        // AANN NAA
        // AANA NAA
        if (!value.match(/^(([A-Z]{1,2}\d{1,2})|([A-Z]\d[A-Z])|([A-Z]{2}\d[A-Z]))\d[A-Z]{2}$/)) {
            $.validator.messages["postcodevalidator"] = invalidPostcodeErrorMessage;
            return false;
        }

        return true;
    });

    $.validator.addMethod("namevalidator", function (value, element, params) {

        if (params.optional == "true" && value == "")
            return true;

        value = $.trim(value.replace(/\s+/g, ' '));

        var result = $.validator.methods.regexvalidator(value, null, params);
        if (result === false) {
            $.validator.messages["namevalidator"] = $.validator.messages["regexvalidator"];
            return false;
        }

        if (value.match(/^\//)) {
            $.validator.messages["namevalidator"] = params.errormessage;
            return false;
        }
        return true;
    });

    $.validator.addMethod("regexvalidator", function (value, element, params) {

        if (params.optional == "true" && value == "")
            return true;

        var minlength = params.minlength;
        var maxlength = params.maxlength;
        var regexpattern = params.regexpattern;

        if (value.length < minlength) {
            if (minlength == 1) {
                $.validator.messages["regexvalidator"] = "Cannot be blank";
            } else {
                $.validator.messages["regexvalidator"] = "Minimum length is " + minlength;
            }
            return false;
        }

        if (value.length > maxlength) {
            $.validator.messages["regexvalidator"] = "Maximum length is " + maxlength;
            return false;
        }

        $.validator.messages["regexvalidator"] = params.regexerrormessage;
        var pattern = new RegExp(regexpattern);
        return pattern.test(value);

    });

    $.validator.addMethod("integervalidator", function (value, element, params) {

        if (params.optional == "true" && value == "")
            return true;

        var minvalue = parseInt(params.minvalue);
        var maxvalue = parseInt(params.maxvalue);
        var libraryminvalue = parseFloat(params.libraryminvalue);
        var librarymaxvalue = parseFloat(params.librarymaxvalue);
        var minmaxerrormessage = params.minmaxerrormessage;
        var digitsonlyerrormessage = params.digitsonlyerrormessage;
        var atleastonedigiterrormessage = params.atleastonedigiterrormessage;
        var digitsdecimalandminusonlyerrormessage = params.digitsdecimalandminusonlyerrormessage;
        var valuetoobigerrormessage = params.valuetoobigerrormessage;

        var countOccurance = function (string, word) {
            var substrings = string.split(word);
            return substrings.length - 1;
        }

        value = $.trim(value);
        if (value == "") {
            return true;
        }

        var minusCount = countOccurance(value, "-");
        if (minusCount > 1) {
            $.validator.messages["integervalidator"] = digitsdecimalandminusonlyerrormessage;
            return false;
        }

        if (minusCount == 1 && value.substring(0, 1) != "-") {
            $.validator.messages["integervalidator"] = digitsdecimalandminusonlyerrormessage;
            return false;
        }

        var valueDigitCount = ((value.match(/\d/g, "") === null) ? 0 : value.match(/\d/g, "").length);
        if (value.length != (minusCount + valueDigitCount)) {
            $.validator.messages["integervalidator"] = digitsdecimalandminusonlyerrormessage;
            return false;
        }

        if (value === "-") {
            $.validator.messages["integervalidator"] = atleastonedigiterrormessage;
            return false;
        }

        // Check if number
        if (isNaN(value) || parseInt(value) != value || value.indexOf(".") > 0) {
            $.validator.messages["integervalidator"] = digitsonlyerrormessage;
            return false;
        }

        // Value too big exception
        if (parseInt(value) < libraryminvalue || parseInt(value) > librarymaxvalue) {
            $.validator.messages["integervalidator"] = valuetoobigerrormessage;
            return false;
        }

        // MinMaxlength check        
        if (parseInt(value) < minvalue || parseInt(value) > maxvalue) {
            $.validator.messages["integervalidator"] = minmaxerrormessage;
            return false;
        }

        return true;
    });

    $.validator.addMethod("stringvalidator", function (value, element, params) {
        if (params.optional == "true" && value == "")
            return true;

        var doublequoteserrormessage = params.doublequoteserrormessage;

        value = $.trim(value.replace(/\s+/g, ' '));

        var result = $.validator.methods.lengthvalidator(value, null, params);
        if (result === false) {
            $.validator.messages["stringvalidator"] = $.validator.messages["lengthvalidator"];
            return false;
        }

        // count the number of double quotes
        var doubleQuoteCount = (value.match(/\"/g) || []).length;

        if (doubleQuoteCount % 2 > 0) {
            $.validator.messages["stringvalidator"] = doublequoteserrormessage;
            return false;
        }

        return true;
    });

    $.validator.addMethod("decimalvalidator", function (value, element, params) {

        if (params.optional == "true" && value == "")
            return true;

        var minvalue = parseFloat(params.minvalue);
        var maxvalue = parseFloat(params.maxvalue);
        var decimalplaces = params.decimalplaces;
        var minussign = (params.minussign == "true") ? true : false;
        var libraryminvalue = parseFloat(params.libraryminvalue);
        var librarymaxvalue = parseFloat(params.librarymaxvalue);
        var minmaxerrormessage = params.minmaxerrormessage;
        var valuetoobigerrormessage = params.valuetoobigerrormessage;
        var digitsanddecimalerrormessage = params.digitsanddecimalerrormessage;
        var digitsdecimalandminusonlyerrormessage = params.digitsdecimalandminusonlyerrormessage;
        var decimalpointerrormessage = params.decimalpointerrormessage;
        var atleastonedigiterrormessage = params.atleastonedigiterrormessage;

        var countDecimalsPlaces = function (valueToCountDecimals) {
            if (valueToCountDecimals.indexOf(".") > 0) {
                if (Math.floor(valueToCountDecimals) !== valueToCountDecimals)
                    return valueToCountDecimals.toString().split(".")[1].length || 0;
            }
            return 0;
        }

        var countOccurance = function (string, word) {
            var substrings = string.split(word);
            return substrings.length - 1;
        }

        value = $.trim(value);
        if (value === "") {
            value = "0";
        }

        if (value === "-") {
            $.validator.messages["decimalvalidator"] = atleastonedigiterrormessage;
            return false;
        }

        var decimalCount = countOccurance(value, ".");
        if (decimalCount > 1) {
            if (minussign) {
                $.validator.messages["decimalvalidator"] = digitsdecimalandminusonlyerrormessage;
            } else {
                $.validator.messages["decimalvalidator"] = digitsanddecimalerrormessage;
            }
            return false;
        }

        var minusCount = countOccurance(value, "-");
        if (!minussign && minusCount > 0) {
            $.validator.messages["decimalvalidator"] = digitsanddecimalerrormessage;
            return false;
        }

        if (minussign) {
            if (minusCount > 1) {
                $.validator.messages["decimalvalidator"] = digitsdecimalandminusonlyerrormessage;
                return false;
            }

            if (minusCount == 1 && $.trim(value).substring(0, 1) != "-") {
                $.validator.messages["decimalvalidator"] = digitsdecimalandminusonlyerrormessage;
                return false;
            }
        }

        var valueDigitCount = ((value.match(/\d/g, "") === null) ? 0 : value.match(/\d/g, "").length);
        if (value.length != (decimalCount + minusCount + valueDigitCount)) {
            if (minussign) {
                $.validator.messages["decimalvalidator"] = digitsdecimalandminusonlyerrormessage;
            } else {
                $.validator.messages["decimalvalidator"] = digitsanddecimalerrormessage;
            }
            return false;
        }


        //Only digits check
        if (isNaN(value) || isNaN(parseFloat(value)) || value == "") {
            if (minussign) {
                $.validator.messages["decimalvalidator"] = digitsdecimalandminusonlyerrormessage;
            } else {
                $.validator.messages["decimalvalidator"] = digitsanddecimalerrormessage;
            }
            return false;
        }

        // If minus value not allowed than value must be gt 0
        if (parseFloat(value) < 0 && (!minussign)) {
            $.validator.messages["decimalvalidator"] = minmaxerrormessage;
            return false;
        }

        // decimal places check
        switch (decimalplaces) {
            case 1:
            case 3:
            case 4:
            case 6:
                // Check if the input has more than one decimal places, throw exception
                if (countDecimalsPlaces(value) > decimalplaces) {
                    $.validator.messages["decimalvalidator"] = decimalpointerrormessage;
                    return false;
                }
                break;
            default:
                // Check if the input has more than two decimal places, throw exception
                if (countDecimalsPlaces(value) > decimalplaces) {
                    $.validator.messages["decimalvalidator"] = decimalpointerrormessage;
                    return false;
                }
                break;
        }

        // Value too big exception
        if (parseFloat(value) < libraryminvalue || parseFloat(value) > librarymaxvalue) {
            $.validator.messages["decimalvalidator"] = valuetoobigerrormessage;
            return false;
        }

        // MinMaxlength check        
        if (parseFloat(value) < minvalue || parseFloat(value) > maxvalue) {
            $.validator.messages["decimalvalidator"] = minmaxerrormessage;
            return false;
        }

        return true;
    });

    $.validator.addMethod("addressvalidator", function (value, element, params) {

        if (params.optional == "true" && value == "")
            return true;

        var minlength = parseInt(params.minlength);
        var maxlength = parseInt(params.maxlength);
        var cannotbelessthanncharacterserrormessage = params.cannotbelessthanncharacterserrormessage;
        var cannotbemorethanncharacterserrormessage = params.cannotbemorethanncharacterserrormessage;
        var doublequoteserrormessage = params.doublequoteserrormessage;
        var allowablecharserrormessage = params.allowablecharserrormessage;

        value = $.trim(value.replace(/\s+/g, ' '));

        var actualLength = parseInt(value.length);
        // Check minimum length
        if (!hasValidCharacters(value)) {
            $.validator.messages["addressvalidator"] = allowablecharserrormessage;
            return false;
        }

        if (actualLength < minlength) {
            $.validator.messages["addressvalidator"] = cannotbelessthanncharacterserrormessage;
            return false;
        }

        if (actualLength > maxlength) {
            $.validator.messages["addressvalidator"] = cannotbemorethanncharacterserrormessage;
            return false;
        }

        // count the number of double quotes
        var doubleQuoteCount = (value.match(/\"/g) || []).length;

        if (doubleQuoteCount % 2 > 0) {
            $.validator.messages["addressvalidator"] = doublequoteserrormessage;
            return false;
        }

        return true;

        function hasValidCharacters(myVal) {
            var pattern = new RegExp("^[a-zA-Z0-9 /()\"&':#-]*$");

            if (!pattern.test(myVal)) {
                $.validator.messages["addressvalidator"] = allowablecharserrormessage;
                return false;
            }
            return true;
        }
    });

    $.validator.addMethod("phonenumberdetailsvalidator", function (value, element, params) {

        if (params.optional === "true" && value === "")
            return true;

        var cannotbemorethan25Characters = params.cannotbemorethan25characters;
        var canonlycontaindigitsxfornonuknumbers = params.canonlycontaindigitsxfornonuknumbers;
        var cannotbelongerthan11Characters = params.cannotbelongerthan11characters;

        // Formatting
        var formatters = new window.OuFormatters();
        value = formatters.phoneNumberFormatter(value);

        // Actual Validation

        // Check invalid characters in string.
        var actualLength = parseInt(value.length);
        var noOfExtensions = value.split('x').length - 1;
        var noOfPlusCharacters = value.split('+').length - 1;

        // Regex check
        if (!value.match(/^\+?\d*x?\d+$/)) {
            $.validator.messages["phonenumberdetailsvalidator"] = canonlycontaindigitsxfornonuknumbers;
            return false;
        }

        // check max length
        if (actualLength > 25) {
            $.validator.messages["phonenumberdetailsvalidator"] = cannotbemorethan25Characters;
            return false;
        }

        // only if UK.
        if (noOfPlusCharacters === 0) {
            var uklen = noOfExtensions === 1 ? value.indexOf("x") : actualLength;
            if (value.substring(0, 6) === '180015') {
                uklen = uklen - 6;
            }
            else if (value.substring(0, 5) === '18001' || value.substring(0, 5) === '18002') {
                uklen = uklen - 5;
            }
            if (uklen > 11) {
                $.validator.messages["phonenumberdetailsvalidator"] = cannotbelongerthan11Characters;
                return false;
            }
        }

        return true;
    });

    $.validator.addMethod("lengthvalidator", function (value, element, params) {

        if (params.optional == "true" && value == "")
            return true;

        var minlength = parseInt(params.minlength);
        var maxlength = parseInt(params.maxlength);
        var mustbeexactlyonecharactererrormessage = params.mustbeexactlyonecharactererrormessage;
        var mustbeexactlyncharacterserrormessage = params.mustbeexactlyncharacterserrormessage;
        var cannotbeblankerrormessage = params.cannotbeblankerrormessage;
        var cannotbelessthanncharacterserrormessage = params.cannotbelessthanncharacterserrormessage;
        var cannotbemorethanonecharactererrormessage = params.cannotbemorethanonecharactererrormessage;
        var cannotbemorethanncharacterserrormessage = params.cannotbemorethanncharacterserrormessage;

        var actualLength = parseInt(value.length);
        // Check minimum length
        if (actualLength < minlength) {
            if (minlength === maxlength) {
                if (minlength === 1) {
                    $.validator.messages["lengthvalidator"] = mustbeexactlyonecharactererrormessage;
                    return false;
                }
                $.validator.messages["lengthvalidator"] = mustbeexactlyncharacterserrormessage;
                return false;
            }
            if (actualLength === 0 && minlength === 1) {
                $.validator.messages["lengthvalidator"] = cannotbeblankerrormessage;
                return false;
            }
            $.validator.messages["lengthvalidator"] = cannotbelessthanncharacterserrormessage;
            return false;
        }

        // Check maximum length
        if (actualLength > maxlength) {
            if (minlength === maxlength) {
                if (minlength === 1) {
                    $.validator.messages["lengthvalidator"] = mustbeexactlyonecharactererrormessage;
                    return false;
                }
                $.validator.messages["lengthvalidator"] = mustbeexactlyncharacterserrormessage;
                return false;
            }
            if (maxlength === 1) {
                $.validator.messages["lengthvalidator"] = cannotbemorethanonecharactererrormessage;
                return false;
            }
            $.validator.messages["lengthvalidator"] = cannotbemorethanncharacterserrormessage;
            return false;
        }

        return true;
    });

    $.validator.addMethod("apptemplatecodevalidator", function (value, element, params) {

        if (params.optional == "true" && value == "")
            return true;

        var firstcharerrormessage = params.firstcharerrormessage;
        var secondthirdcharserrormessage = params.secondthirdcharserrormessage;
        var fourthcharerrormessage = params.fourthcharerrormessage;
        var firstcharregexpattern = params.firstcharregexpattern;
        var secondthirdcharregexpattern = params.secondthirdcharregexpattern;
        var fourthcharregexpattern = params.fourthcharregexpattern;

        if (new RegExp(firstcharregexpattern).test(value) === false) {
            $.validator.messages["apptemplatecodevalidator"] = firstcharerrormessage;
            return false;
        }

        if (new RegExp(secondthirdcharregexpattern).test(value) === false) {
            $.validator.messages["apptemplatecodevalidator"] = secondthirdcharserrormessage;
            return false;
        }

        if (new RegExp(fourthcharregexpattern).test(value) === false) {
            $.validator.messages["apptemplatecodevalidator"] = fourthcharerrormessage;
            return false;
        }

        return true;

    });

    // Formatters

    (function () {

        window.OuFormatters = window.OuFormatters || function () { };

        window.OuFormatters.prototype.phoneNumberFormatter = function (value) {
            // Remove all white spaces
            value = $.trim(value.replace(/[-\s,\(\)]/g, ''));

            // convert to lower case
            value = value.toLowerCase();

            // convert 'extension', 'extn' and 'ext' to just 'x'.
            value = value.replace(/extension|extn|ext/g, 'x');

            // convert international number
            value = value.replace(/^00/g, '+');

            // Remove international code for UK numbers
            if (value.substring(0, 3) === "+44") {
                value = value.replace("+44", '');
                if (value.substring(0, 1) !== '0') {
                    value = '0' + value;
                }
            }
            return value;
        }

        window.OuFormatters.prototype.pastDateFormatter = function (value, params) {

            var invalidDateFormatErrorMessage = params.invaliddateformaterrormessage;

            // Add separators if there are no separators.
            if (value.match(/^\d{6}$/) || value.match(/^\d{8}$/)) {
                value = value.substring(0, 2) + "/" + value.substring(2, value.length);
                value = value.substring(0, 5) + "/" + value.substring(5, value.length);
            }
            else if (value.match(/^\d{2}\w{3}(\d{2}|\d{4})$/)) {
                value = value.substring(0, 2) + "/" + value.substring(2, value.length);
                value = value.substring(0, 6) + "/" + value.substring(6, value.length);
            }

            // Standardise all separators to '/'
            value = value.replace(/[\.\s\-]/g, '/');

            if (!value.match(/^\d{1,2}\/(\d{1,2}|[A-Za-z]{3})\/(\d{2}|\d{4})$/)) {
                throw invalidDateFormatErrorMessage;
            }

            // Get the parts of the date.
            var dateParts = value.split('/');

            if (dateParts.length != 3) {
                throw invalidDateFormatErrorMessage;
            }

            // Validate day.
            dateParts[0] = parseInt(dateParts[0]);
            if (dateParts[0] < 1 || dateParts[0] > 31) {
                throw invalidDateFormatErrorMessage;
            }

            // Month as str? Convert to number
            if (dateParts[1].match(/^[A-Za-z]{3}$/)) {
                var now = new Date();
                var tmpDateStr = dateParts[1] + " 1, " + now.getFullYear();
                var tmpDate = new Date(Date.parse(tmpDateStr));
                dateParts[1] = tmpDate.getMonth() + 1;
            } else {
                dateParts[1] = parseInt(dateParts[1]);
            }

            // Validate month.
            if (dateParts[1] > 12 || dateParts[1] < 1) {
                throw invalidDateFormatErrorMessage;
            }

            // Two digit year?
            var twoDigitYear = !value.match(/\d{4}$/);

            if (twoDigitYear) {

                // Calculate century.
                var fullYear = new Date().getFullYear().toString();
                var currentYr = parseInt(fullYear.substr(fullYear.length - 2)) + 100;

                if (currentYr - parseInt(dateParts[2]) >= 50) {
                    dateParts[2] = "20" + dateParts[2];
                } else {
                    dateParts[2] = "19" + dateParts[2];
                }
            }

            // Parse the date. Minus 1 on the month as months are zero-indexed.
            var date = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));

            if (isNaN(date) || date === undefined || date === null) {
                throw invalidDateFormatErrorMessage;
            }

            // Return the valid, parsed date.
            return date;
        }

    })();

    // Register validators
    (function () {

        $.validator.unobtrusive.adapters.add(
                   "lengthvalidator",
                   [
                       "minlength",
                       "maxlength",
                       "mustbeexactlyonecharactererrormessage",
                       "mustbeexactlyncharacterserrormessage",
                       "cannotbeblankerrormessage",
                       "cannotbelessthanncharacterserrormessage",
                       "cannotbemorethanonecharactererrormessage",
                       "cannotbemorethanncharacterserrormessage",
                       "optional"
                   ],
                   function (options) {
                       options.rules["lengthvalidator"] = options.params;
                   });

        $.validator.unobtrusive.adapters.add(
                   "stringvalidator",
                   [
                       "minlength",
                       "maxlength",
                       "mustbeexactlyonecharactererrormessage",
                       "mustbeexactlyncharacterserrormessage",
                       "cannotbeblankerrormessage",
                       "cannotbelessthanncharacterserrormessage",
                       "cannotbemorethanonecharactererrormessage",
                       "cannotbemorethanncharacterserrormessage",
                       "doublequoteserrormessage",
                       "optional"
                   ],
                   function (options) {
                       options.rules["stringvalidator"] = options.params;
                   });

        $.validator.unobtrusive.adapters.add(
                                "regexvalidator",
                                [
                                    "minlength",
                                    "maxlength",
                                    "regexpattern",
                                    "regexerrormessage",
                                    "optional"
                                ],
                                function (options) {
                                    options.rules["regexvalidator"] = options.params;
                                });

        $.validator.unobtrusive.adapters.add(
                          "apptemplatecodevalidator",
                          [
                              "firstcharerrormessage",
                              "secondthirdcharserrormessage",
                              "fourthcharerrormessage",
                              "firstcharregexpattern",
                              "secondthirdcharregexpattern",
                              "fourthcharregexpattern",
                              "optional"
                          ],
                          function (options) {
                              options.rules["apptemplatecodevalidator"] = options.params;
                          });

        $.validator.unobtrusive.adapters.add(
                        "namevalidator",
                        [
                            "errormessage",
                            "minlength",
                            "maxlength",
                            "regexpattern",
                            "regexerrormessage",
                            "optional"
                        ],
                        function (options) {
                            options.rules["namevalidator"] = options.params;
                        });

        $.validator.unobtrusive.adapters.add(
                           "integervalidator",
                           [
                               "minvalue",
                               "maxvalue",
                               "libraryminvalue",
                               "librarymaxvalue",
                               "digitsonlyerrormessage",
                               "minmaxerrormessage",
                               "atleastonedigiterrormessage",
                               "digitsdecimalandminusonlyerrormessage",
                               "valuetoobigerrormessage",
                               "optional"
                           ],
                           function (options) {
                               options.rules["integervalidator"] = options.params;
                           });

        $.validator.unobtrusive.adapters.add(
                               "decimalvalidator",
                               [
                                   "minvalue",
                                   "maxvalue",
                                   "decimalplaces",
                                   "minussign",
                                   "libraryminvalue",
                                   "librarymaxvalue",
                                   "minmaxerrormessage",
                                   "valuetoobigerrormessage",
                                   "digitsanddecimalerrormessage",
                                   "digitsdecimalandminusonlyerrormessage",
                                   "decimalpointerrormessage",
                                   "optional"
                               ],
                               function (options) {
                                   options.rules["decimalvalidator"] = options.params;
                               });

        $.validator.unobtrusive.adapters.add(
                           "addressvalidator",
                           [
                               "minlength",
                               "maxlength",
                               "cannotbelessthanncharacterserrormessage",
                               "cannotbemorethanncharacterserrormessage",
                               "doublequoteserrormessage",
                               "allowablecharserrormessage",
                               "optional"
                           ],
                           function (options) {
                               options.rules["addressvalidator"] = options.params;
                           });

        $.validator.unobtrusive.adapters.add(
                           "postcodevalidator",
                           [
                               "minimumlength",
                               "maximumlength",
                               "lengtherrormessage",
                               "regexerrormessage",
                               "invalidbfpoerrormessage",
                               "invalidpostcodeerrormessage",
                               "optional"
                           ],
                           function (options) {
                               options.rules["postcodevalidator"] = options.params;
                           });


        $.validator.unobtrusive.adapters.add(
                          "phonenumberdetailsvalidator",
                          [

                              "cannotbemorethan25characters",
                              "canonlycontaindigitsxfornonuknumbers",
                              "cannotbelongerthan11characters",
                              "optional"
                          ],
                          function (options) {
                              options.rules["phonenumberdetailsvalidator"] = options.params;
                          });

        $.validator.unobtrusive.adapters.add(
                  "pastdatevalidator",
                  [
                      "minyear",
                      "maxyear",
                      "blankinputerrormessage",
                      "invalidrangeerrormessage",
                      "datemustbeinpasterrormessage",
                      "invaliddateformaterrormessage",
                      "optional"
                  ],
                  function (options) {
                      options.rules["pastdatevalidator"] = options.params;
                  });
    })();

}(jQuery));