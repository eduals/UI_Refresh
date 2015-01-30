//v1.0 Added first draft
describe("pathway.js", function () {
    var page;

    describe("pathway-your-contact-details.js", function () {
        page = window.Pathway.YourContactDetails;

        var json = {
                invalidFormat: {
                    "ContentEncoding": null,
                    "ContentType": null,
                    "Data": {
                        "PostcodeFormatValid": false,
                        "PostcodeInvalidMessage": "",
                        "IsBfpo": false,
                        "AddressList": null
                    },
                    "JsonRequestBehavior": 1
                },
                noAddress: {
                    "ContentEncoding": null,
                    "ContentType": null,
                    "Data": {
                        "PostcodeFormatValid": true,
                        "PostcodeInvalidMessage": "",
                        "IsBfpo": false,
                        "AddressList": null
                    },
                    "JsonRequestBehavior": 1
                },
                oneAddress: {
                    "ContentEncoding": null,
                    "ContentType": null,
                    "Data": {
                        "PostcodeFormatValid": true,
                        "PostcodeInvalidMessage": "",
                        "IsBfpo": false,
                        "AddressList": [
                            {
                                "AddressLine1": "Driver \u0026 Vehicle Licensing Agency",
                                "AddressLine2": "Vehicle Registrations",
                                "AddressLine3": "Driver \u0026 Vehicle Licensing Centre",
                                "Town": "SWANSEA",
                                "County": "",
                                "Postcode": "SA99 1AR"
                            }
                        ]
                    },
                    "JsonRequestBehavior": 1
                },
                moreThanOneAddress: {
                    "ContentEncoding": null,
                    "ContentType": null,
                    "Data": {
                        "PostcodeFormatValid": true,
                        "PostcodeInvalidMessage": "",
                        "IsBfpo": false,
                        "AddressList": [
                            {
                                "AddressLine1": "10 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "13 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "15a Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "15b Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "34 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "36 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "38 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "40 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "41 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "42 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "43 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "44 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "46 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "56 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "58 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "60 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "62 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "64 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "66 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "68 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "88 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "93 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "95 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "105 Park Road",
                                "AddressLine2": "Stevington",
                                "AddressLine3": "",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "Evening House",
                                "AddressLine2": "Park Road",
                                "AddressLine3": "Stevington",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "Old Chapel",
                                "AddressLine2": "Park Road",
                                "AddressLine3": "Stevington",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            },
                            {
                                "AddressLine1": "Park Road House",
                                "AddressLine2": "Park Road",
                                "AddressLine3": "Stevington",
                                "Town": "BEDFORD",
                                "County": "",
                                "Postcode": "MK43 7QG"
                            }
                        ]
                    },
                    "JsonRequestBehavior": 1
                },
                bfpo: {
                    "ContentEncoding": null,
                    "ContentType": null,
                    "Data": {
                        "PostcodeFormatValid": true,
                        "PostcodeInvalidMessage": "",
                        "IsBfpo": true,
                        "AddressList": [
                            {
                                "AddressLine1": "BFPO 58",
                                "AddressLine2": "",
                                "AddressLine3": "",
                                "Town": "BFPO",
                                "Postcode": "BF1 2AU"
                            }
                        ]
                    },
                    "JsonRequestBehavior": 1
                }
            },
            addressListArray1 = [
                {
                    AddressLine1: "42 Park Road",
                    AddressLine2: "Stevington",
                    AddressLine3: "",
                    County: "",
                    Postcode: "MK43 7QG",
                    Town: "BEDFORD"
                }],
            addressListArray2 = [
                {
                    AddressLine1: "42 Park Road",
                    AddressLine2: "Stevington",
                    AddressLine3: "",
                    County: "",
                    Postcode: "MK43 7QG",
                    Town: "BEDFORD"
                },
                {
                    AddressLine1: "43 Park Road",
                    AddressLine2: "Stevington",
                    AddressLine3: "",
                    County: "",
                    Postcode: "MK43 7QG",
                    Town: "BEDFORD"
                },
                {
                    AddressLine1: "",
                    AddressLine2: "",
                    AddressLine3: "",
                    County: "",
                    Postcode: "",
                    Town: ""
                }];

        describe("page.ViewModel", function () {
            var viewModel;

            beforeEach(function () {
                viewModel = new page.ViewModel();
            });

            afterEach(function () {
                viewModel = null;
            });

            describe("addressSelectBuilder()", function () {
                it("Creates a select list of addresses from an array of object literals", function () {
                    viewModel.setAddressList(addressListArray1);
                    expect(viewModel.addressSelectBuilder(addressListArray1)).toEqual('<div class="int-row hidden" id="addressListSelectContainer"><div class="int-grid3"><label for="addressListSelect" class="int-floatRight">Address list</label></div><div class="int-grid6"><select id="addressListSelect" aria-controls="yourDetailsRegion"><option value="-1" disabled selected>Please select an address</option><option value="-1">Address is not listed</option><option value="0">42 Park Road, Stevington, BEDFORD</option></select></div></div>');

                    viewModel.setAddressList(addressListArray2);
                    expect(viewModel.addressSelectBuilder(addressListArray2)).toEqual('<div class="int-row hidden" id="addressListSelectContainer"><div class="int-grid3"><label for="addressListSelect" class="int-floatRight">Address list</label></div><div class="int-grid6"><select id="addressListSelect" aria-controls="yourDetailsRegion"><option value="-1" disabled selected>Please select an address</option><option value="-1">Address is not listed</option><option value="0">42 Park Road, Stevington, BEDFORD</option><option value="1">43 Park Road, Stevington, BEDFORD</option><option value="2"></option></select></div></div>');
                });
            });
            describe("determinePostcodeRoute()", function () {
                it("Determines the postcode view route taken", function () {
                    expect(viewModel.determinePostcodeRoute(json.noAddress.Data)).toEqual(0);
                    expect(viewModel.determinePostcodeRoute(json.invalidFormat.Data)).toEqual(0);
                    expect(viewModel.determinePostcodeRoute(json.oneAddress.Data)).toEqual(1);
                    expect(viewModel.determinePostcodeRoute(json.moreThanOneAddress.Data)).toEqual(2);
                    expect(viewModel.determinePostcodeRoute(json.bfpo.Data)).toEqual(3);
                });
            });
            describe("postcodeRoute()", function () {
                it("Fires the function related to the postcode route", function () {
                    var message;

                    var routeFunctions = [
                        function () {
                            message = 'noAddress or invalidFormat';
                        },
                        function () {
                            message = 'oneAddress';
                        },
                        function () {
                            message = 'moreThanOneAddress';
                        },
                        function () {
                            message = 'bfpo';
                        }
                    ];
                    viewModel.postcodeRoute(json.noAddress.Data, routeFunctions);
                    expect(message).toEqual('noAddress or invalidFormat');
                    viewModel.postcodeRoute(json.invalidFormat.Data, routeFunctions);
                    expect(message).toEqual('noAddress or invalidFormat');
                    viewModel.postcodeRoute(json.oneAddress.Data, routeFunctions);
                    expect(message).toEqual('oneAddress');
                    viewModel.postcodeRoute(json.moreThanOneAddress.Data, routeFunctions);
                    expect(message).toEqual('moreThanOneAddress');
                    viewModel.postcodeRoute(json.bfpo.Data, routeFunctions);
                    expect(message).toEqual('bfpo');
                });
            });
        });
        describe("page.Postcode", function () {
            var postcode;

            beforeEach(function () {
                postcode = new page.Postcode();
            });

            afterEach(function () {
                postcode = null;
            });

            describe("getPostcode() and setPostcode()", function () {
                it("Getter and setter of the postcode property in the object instance", function () {
                    expect(postcode.getPostcode()).toBe(undefined);
                    postcode.setPostcode('MK43 7QG');
                    expect(postcode.getPostcode()).toEqual('MK43 7QG');
                });
            });
            describe("getLastSubmittedPostcode() and setLastSubmittedPostcode()", function () {
                it("Getter and setter of the lastSubmittedPostcode property in the object instance", function () {
                    expect(postcode.getLastSubmittedPostcode()).toBe(undefined);
                    postcode.setLastSubmittedPostcode('MK43 7QG');
                    expect(postcode.getLastSubmittedPostcode()).toEqual('MK43 7QG');
                });
            });
            describe("isNewPostcode()", function () {
                it("Checks if the postcode entered is a new postcode by comparing the postcode with the lastSubmittedPostcode", function () {
                    postcode.setLastSubmittedPostcode('MK43 7QG');
                    postcode.setPostcode('MK43 7QG');
                    expect(postcode.isNewPostcode()).toBe(false);
                    postcode.setLastSubmittedPostcode('MK43 7QG');
                    postcode.setPostcode('SA99 1AR');
                    expect(postcode.isNewPostcode()).toBe(true);
                });
            });
            describe("hasLength()", function () {
                it("Checks if the postcode entered as length", function () {
                    postcode.setPostcode('MK43 7QG');
                    expect(postcode.hasLength()).toBe(true);
                    postcode.setPostcode('');
                    expect(postcode.hasLength()).toBe(false);
                });
            });
            describe("postcodeSearch()", function () {
                it("Used to determine the actions taken when the submit button is triggered on the postcode search", function () {
                    var routes;

                    function postcodeSearch(val) {
                        postcode.postcodeSearch(val, function () {
                            routes.push(1);
                        }, function () {
                            routes.push(2);
                        }, function () {
                            routes.push(3);
                        });
                    }

                    routes = [];
                    postcodeSearch('MK43 7QG');
                    expect(routes).toEqual([1, 2]);

                    routes = [];
                    postcodeSearch('MK43 7QG');
                    expect(routes).toEqual([]);

                    routes = [];
                    postcodeSearch('');
                    expect(routes).toEqual([1, 3]);
                });
            });
        });
    });

    describe("Blank", function () {

    });
});