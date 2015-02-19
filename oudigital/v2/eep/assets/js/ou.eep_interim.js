// ----------------------------------------------------------
// OU.EEP (Interim)
// ----------------------------------------------------------
// The Open University � Copyright 2014. All rights reserved
// Written by Paul Liu
// paul.liu@open.ac.uk
// ----------------------------------------------------------
// v0.24 / Interim
// Interim version of OU.EEP which excludes the initialisations
// ----------------------------------------------------------
window.OU = window.OU || {};

(function ($, EEP, window, document) {
    EEP.version = "OU.EEP | v0.24" | 'Interim';

    var $window = $(window),
        $document = $(document),
        $HTMLBody = $('html, body');

    EEP.helpers = {
        scrollPageTo: function (ele) {
            var $el = $(ele);
            if ($el.length > 0) {
                $HTMLBody.animate({ scrollTop: $el.offset().top }, "slow");
            }
        },
        getMQ: function () {
            return window.getComputedStyle(document.body, ':after').getPropertyValue('content'); // returns xs, sm, md, lg - depending on screen size
        },
        isIE7: function () {
            if (navigator.appVersion.indexOf("MSIE 7.") !== -1) return true;
            return false;
        },
        positionModal: function (target) {
            var modal = $(target),
                modalH = 0,
                modalW = 0,
                winH = $window.height(),
                winW = $document.width(),
                modalLeft,
                modalTop = 15,
                isOpen = modal.hasClass('int-active');
            if (modal) {
                // if modal is not active, quickly activate is to get dimensions
                if (!isOpen) {
                    modal.addClass('int-active');
                }
                modalH = modal.find('.int-modal-inner').height();
                modalW = modal.width();
                if (!isOpen) {
                    modal.removeClass('int-active');
                }
                // position modal in the centre of the screen
                modalLeft = ((winW - modalW) / 2) + 'px';
                if (modalH < winH) {
                    modalTop = ((winH - modalH) / 2) + 'px';
                    modal.css('position', 'fixed');
                } else {
                    // if modal is taller than the screen set position to absolute allow user to scroll
                    if (target !== "#int-study-plan") {
                        modal.css('position', 'fixed').css('height', (winH - (modalTop * 2)) + 'px')
                            .find('.interaction').css('padding-top', '15px')
                            .find('.int-modal-inner').css('height', (winH - (modalTop * 3)) + 'px')
                            .css('overflow-y', 'scroll')
                            .css('webkit-overflow-scroll', 'scroll');
                        modal.css('bottom', modalTop);
                    }
                }
                modal.css('top', modalTop).css('left', modalLeft);
            }
        }
    };
    EEP.accessibility = (function () {
        //Country Selector Dialog
        var $countrySelectorDialog = $('#country_selection_dialog'),
            $studyPlan = $('a[href="#int-study-plan"], #int-study-plan');

        if ($countrySelectorDialog.length) {
            $countrySelectorDialog.attr({
                'aria-live': 'assertive',
                'role': 'alert'
            });
        }

        if ($studyPlan.length) {
            $studyPlan.attr({
                'aria-hidden': 'true'
            });
        }
    })();
    EEP.spinner = (function () {
        if (window.Spinner && window.OU.Widgets.Throbber) {
            $('<style>#int-throbber { display: none; position: fixed !important; top: 50% !important; left: 50% !important;} .int-throbberOverlay { z-index: 9999999; background: #000; position: fixed; width: 100%; height: 100%; top: 0; left: 0; visibility: visible; opacity: .5; filter: alpha(opacity=50); }</style>').appendTo('head');

            EEP.Throbber = new window.OU.Widgets.Throbber($('<div id="int-throbber" class="int-throbber"><div class="int-throbberOverlay"></div></div>').appendTo('body'), {
                lines: 10, // The number of lines to draw
                length: 30, // The length of each line
                width: 8, // The line thickness
                radius: 25, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                color: '#fff', // #rgb or #rrggbb
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: true, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'int-throbber', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto' // Left position relative to parent in px
            });

            return true;
        } else {
            return false;
        }
    })();

    EEP.Tooltip = function ($el, options) {
        this.options = $.extend({}, this.defaults, options);
        this.$trigger = $el;
        this.$context = this.options.contextSelector ? $(this.options.contextSelector) : $el;
        this.$tooltip = $(this.options.tooltipSelector);
        this.$tooltipContent = this.$tooltip.find(this.options.tooltipContentContainerSelector);
        this.$closeTooltipButton = this.$tooltip.find(this.options.closeTooltipButtonSelector);
        this.init();
    };
    EEP.Tooltip.prototype = {
        defaults: {
            contextSelector: undefined,
            tooltipSelector: undefined,
            toggle: false,
            inputTooltip: false,
            closeTooltipButtonSelector: '.close-tooltip',
            tooltipContentContainerSelector: '.tooltip-content-container',
            positionOptions: function (context) {
                return {
                    my: "left top",
                    at: "right+20 top",
                    of: context,
                    collision: "flipfit"
                }
            },
            triggerATTR: {
                'role': 'button',
                'aria-controls': ''
            },
            tooltipATTR: {
                'aria-live': 'assertive',
                'tabindex': '0',
                'aria-label': 'Button controlled tooltip',
                'role': 'tooltip'
            },
            tooltipContentATTR: {
                'tabindex': '0',
                'aria-label': 'Begin tooltip information'
            },
            tooltipContentCSS: {
                'margin-top': '2em'
            },
            closeTooltipButtonCSS: {
                'position': 'absolute',
                'top': '.5em',
                'right': '.5em'
            },
            closeTooltipButtonATTR: {
                'aria-label': 'Close tooltip',
                'role': 'button',
                'aria-controls': '',
                'title': 'Close tooltip'
            }
        },
        init: function () {
            this.$tooltip.hide();

            return this
                .setTriggerClickHandler()
                .setTriggerFocusBlurHandler()
                .setCloseTooltipButtonClickHandler()
                .aria();
        },
        setTriggerClickHandler: function () {
            var base = this;

            if (!base.options.inputTooltip) {
                this.$trigger.click(function (e) {
                    e.preventDefault();
                    if (base.options.toggle) {
                        base.$tooltip.toggle().filter(':visible').focus();
                    } else {
                        base.$tooltip.show().focus();
                    }
                    base.positionTooltip();
                });
            }

            return this;
        },
        setTriggerFocusBlurHandler: function () {
            var base = this;

            if (base.options.inputTooltip) {
                this.$trigger.on({
                    'focus': function () {
                        base.$tooltip.show();
                        base.positionTooltip();
                    },
                    'blur': function () {
                        base.$tooltip.hide();
                    }
                });
            }

            return this;
        },
        positionTooltip: function () {
            var base = this;

            base.$tooltip.position(base.options.positionOptions(base.$context));

            return this;
        },
        setCloseTooltipButtonClickHandler: function () {
            var base = this;

            if (!base.options.inputTooltip) {
                this.$closeTooltipButton.click(function (e) {
                    e.preventDefault();
                    base.$tooltip.hide();
                    base.$trigger.focus();
                });
            }

            return this;
        },
        aria: function () {
            var base = this,
                o = base.options,
                $tooltip = this.$tooltip.uniqueId(),
                tooltipId = $tooltip.attr('id');

            o.triggerATTR['aria-controls'] = tooltipId

            this.$trigger.attr(o.triggerATTR);

            $tooltip.attr(o.tooltipATTR);

            this.$tooltipContent.attr(o.tooltipContentATTR).append('<div aria-label="End tooltip information"></div>');

            if (this.$closeTooltipButton.length) {
                this.$tooltipContent.css(o.tooltipContentCSS);

                o.closeTooltipButtonATTR['aria-controls'] = tooltipId;

                this.$closeTooltipButton.attr(o.closeTooltipButtonATTR).css(o.closeTooltipButtonCSS);
            }

            return this;
        }
    };

    EEP.AccountsTab = function ($el, options) {
        this.options = $.extend({}, this.defaults, options);
        this.$container = $el;
        this.$pills = $el.find('nav').find('ul').find('li');
        this.$tabs = this.$pills.find('a');
        this.$mobileNavToggle = $(this.options.mobileNavToggleSelector);
        this.$accountTabsNav = $(this.options.accountTabsNavSelector);
        this.$lastTabClicked = undefined;
        this.init();
    };
    EEP.AccountsTab.prototype = {
        defaults: {
            isFormClean: undefined,
            formHasChanged: undefined,
            formHasChangedFunction: undefined,
            mobileNavToggleSelector: '#account-tabs-toggle',
            accountTabsNavSelector: '#account-tabs-nav',
            navOpenClass: 'int-nav-open',
            activeSectionClass: 'int-active-section'
        },
        init: function () {
            return this
                .showActiveTabSection()
                .setTabClickHandler()
                .enableMobileTabs();
        },
        setTabClickHandler: function () {
            var base = this;

            this.$tabs.click(function (e) {
                e.preventDefault();
                base.$lastTabClicked = $(this);

                var formIsClean = typeof base.options.isFormClean === 'function' ? base.options.isFormClean() : true;

                if (formIsClean) {
                    base.showLastClickedTabSection();
                }
            });
            return this;
        },
        showLastClickedTabSection: function () {
            var $lastTabClicked = this.$lastTabClicked;

            if (typeof $lastTabClicked !== 'undefined') {
                var $thisPill = $lastTabClicked.parent('li');

                this.$pills.removeClass('active');
                $thisPill.addClass('active');
                this.hideInactiveTabSection();
                this.showActiveTabSection();
            }
        },
        showActiveTabSection: function () {
            $(this.$pills.filter('.active').children('a').attr('href')).show();

            return this;
        },
        hideInactiveTabSection: function () {
            this.$pills.not('.active').children('a').each(function () {
                $($(this).attr('href')).hide();
            });

            return this;
        },
        enableMobileTabs: function () {
            var base = this,
                navOpenClass = this.options.navOpenClass,
                activeSectionSelector = '.' + this.options.activeSectionClass;

            base.$mobileNavToggle.click(function (e) {
                e.preventDefault();
                base.$accountTabsNav.toggleClass(navOpenClass);
            });

            // set current active section title when it new tab is selected
            base.$tabs.on('click', function (e) {
                e.preventDefault();
                base.$mobileNavToggle.find(activeSectionSelector).text($(this).text());
                base.$accountTabsNav.removeClass(navOpenClass);
            });

            return this;
        }
    };

    EEP.Toggler = function ($el, options) {
        this.options = $.extend({}, this.defaults, options);
        this.$container = $el;
        this.$trigger = $el.find('.' + this.options.triggerClass);
        this.triggerText = this.$trigger.text();
        this.init();
    };
    EEP.Toggler.prototype = {
        defaults: {
            triggerClass: 'int-toggleTrigger',
            togglerActiveClass: 'int-active'
        },
        init: function () {
            return this
                .setTriggerHTML()
                .setTriggerClickHandler();
        },
        setTriggerHTML: function () {
            this.$trigger.html('<a href="#"><b class="int-icon-btn closed"><i class="int-icon int-icon-plus"></i></b><b class="int-icon-btn open"><i class="int-icon int-icon-minus"></i></b><span>' + this.triggerText + '</span></a>');
            return this;
        },
        setTriggerClickHandler: function () {
            var base = this;
            this.$trigger.click(function (e) {
                e.preventDefault();
                base.$container.toggleClass(base.options.togglerActiveClass);
            });
            return this;
        }
    };

    EEP.SkipToMainContentButton = function ($el, options) {
        this.options = $.extend({}, this.defaults, options);
        this.$button = $el;
        this.$mainContentArea = $(this.options.mainContentAreaSelector);
        this.$siteArea = $(this.options.siteAreaSelector);
        this.init();
    };
    EEP.SkipToMainContentButton.prototype = {
        defaults: {
            siteAreaSelector: '#int-site',
            mainContentAreaSelector: '#int-content'
        },
        init: function () {

            return this
                .setJumpLinkClickHandler()
                .setSkipToMainContentButtonClickHandler();
        },
        setJumpLinkClickHandler: function () {
            $('body').not('.fn-jumplinks').addClass('fn-jumplinks').on('click', 'a[href^="#"]', function () {
                $('#' + $(this).attr('href').slice(1) + "").focus(); // give that id focus (for browsers that didn't already do so)
            });
            this.$mainContentArea.attr('tabindex', '-1').css("outline", "0");
            this.$siteArea.attr('tabindex', '-1').css("outline", "0"); //Removes orange outline in chrome on focus.

            return this;
        },
        setSkipToMainContentButtonClickHandler: function () {
            var base = this;

            this.$button.click(function () {
                EEP.helpers.scrollPageTo(base.$mainContentArea);
            });

            return this;
        }
    };

    EEP.BackToTopButton = function ($el, options) {
        this.options = $.extend({}, this.defaults, options);
        this.$button = $el;
        this.$mainContentArea = $(this.options.mainContentAreaSelector);
        this.$siteArea = $(this.options.siteAreaSelector);
        this.$window = $(window);
        this.init();
    };
    EEP.BackToTopButton.prototype = {
        defaults: {
            siteAreaSelector: '#int-site',
            mainContentAreaSelector: '#int-content',
            backToTopButtonSelector: '#int-btn-top',
            mainContentTop: 0
        },
        init: function () {
            return this
                .setWindowScrollHandler()
                .setBackToTopButtonClickHandler();
        },
        checkScrollPosition: function () {
            if (this.$window.scrollTop() > this.options.mainContentTop) {
                this.$button.addClass('scrollIn');
            } else {
                this.$button.removeClass('scrollIn');
            }
            return this;
        },
        setWindowScrollHandler: function () {
            var base = this;

            this.$window.scroll(function () {
                base.checkScrollPosition();
            });

            return base;
        },
        setBackToTopButtonClickHandler: function () {
            var base = this;

            this.$button.click(function () {
                EEP.helpers.scrollPageTo(base.$siteArea);
            });

            return base;
        }
    };

    EEP.InPageStickyTabs = function ($el, options) {
        this.options = $.extend({}, this.defaults, options);
        this.$stickyTabs = $el;
        this.$tabs = $el.find('ul').find('a');
        this.$mobileNavToggle = $el.find('.' + this.options.mobileNavToggleClass);
        this.$activeSection = this.$mobileNavToggle.find('.' + this.options.activeSectionClass);
        this.stickyNavTop = 0;
        this.$courseTabs = $(this.options.courseTabsSelector);
        this.$studyPlan = $(this.options.studyPlanSelector);
        this.$studyPlanTabs = $(this.options.studyPlanTabsSelector);
        this.init();
    };
    EEP.InPageStickyTabs.prototype = {
        defaults: {
            stickyClass: 'int-sticky',
            activeSectionClass: 'int-active-section',
            mobileNavToggleClass: 'int-sticky-toggle',
            courseTabsSelector: '#int-course-detail-tabs',
            studyPlanSelector: '#int-study-plan',
            studyPlanTabsSelector: '#int-study-plan-tabs'
        },
        init: function () {
            return this
                .enableTabs()
                .positionStickyNav()
                .setWindowScrollHandler()
                .setWindowResizeHandler()
                .enableMenuToggle('int-course-nav') // enable mobile nav toggle
                .setTabClickHandler();
        },
        stickyNav: function () {
            var $stickyTabs = this.$stickyTabs,
                stickyClass = this.options.stickyClass,
                scrollTop = $window.scrollTop(); // check how far the window has scrolled

            if (scrollTop > this.stickyNavTop) { // check if sticky item is passed top of screen
                $stickyTabs.addClass(stickyClass);
            } else {
                $stickyTabs.removeClass(stickyClass);
            }

            return this;
        },
        positionStickyNav: function () {
            var $stickyTabs = this.$stickyTabs;

            if ($stickyTabs.length > 0) {
                $stickyTabs.removeClass('int-sticky'); // put sticky back in original position
                this.stickyNavTop = $stickyTabs.offset().top; // get top value of sticky item
                this.stickyNav();
            }

            return this;
        },
        setWindowScrollHandler: function () {
            var base = this;

            $window.scroll(function () {
                base.stickyNav(); // check nav pos on scroll
            });

            return base;
        },
        setWindowResizeHandler: function () {
            var base = this;

            $window.resize(function () {
                base.positionStickyNav(); // reposition nav when window resizes
            });

            return base;
        },
        toggleMenu: function (target) {
            $('#' + target).toggleClass('int-nav-open');

            return this;
        },
        enableMenuToggle: function (target) {
            var base = this;

            this.$mobileNavToggle.click(function (e) {
                e.preventDefault();
                base.toggleMenu(target);
            });

            return this;
        },
        setTabClickHandler: function () {
            var base = this;

            // set current active section title when it new tab is selected
            this.$tabs.click(function () {
                base.$activeSection.text($(this).text());
                base.toggleMenu('int-course-nav'); // close the menu
            });

            return this;
        },
        //Todo Refactor below, and decouple
        setStudyPlanPanelHeight: function () {
            var $studyPlanTabs = this.$studyPlanTabs,
                tabHeight = $studyPlanTabs.height(),
                headHeight = $studyPlanTabs.find('nav').height(),
                winHeight = $window.height() - 30,
                targetTab = $studyPlanTabs.find('.ui-tabs-active a').attr('href');

            if (tabHeight > winHeight) {
                $(targetTab).css('height', (winHeight - headHeight) + 'px');
            }

        },
        enableTabs: function () {
            var base = this,
                $courseTabs = this.$courseTabs;

            // enable tabs - jquery UI control
            $courseTabs.tabs({
                activate: function (event, ui) {
                    // scroll page to top of tabs when a new tab is activated
                    EEP.helpers.scrollPageTo(base.options.courseTabsSelector);
                }
            });

            this.$studyPlanTabs.tabs({
                activate: function (event, ui) {
                    base.setStudyPlanPanelHeight();
                    EEP.helpers.positionModal(base.$studyPlan);
                }
            });

            this.positionStickyNav();

            // enable other tab initializing links
            $('.loadTab').on('click', function (e) {
                e.preventDefault();
                var tab = $(this).attr('href'), // get target tabs
                    tabIndex = $('section', $courseTabs).index($(tab)), // get tab index
                    activeTab = $courseTabs.tabs("option", "active"); // get active tab index
                if (tabIndex !== activeTab) {
                    $courseTabs.tabs("option", "active", tabIndex); // activate tab
                } else {
                    EEP.helpers.scrollPageTo(base.options.courseTabsSelector);
                }
            });

            return this;
        }
    };

    //TODO REFACTOR Courses form. Is this used?
    EEP.CoursesForms = function ($el, options) {
        this.options = $.extend({}, this.defaults, options);
        this.init();
    };
    EEP.CoursesForms.prototype = {
        defaults: {
            feesFundingItems: ['credits', 'degree', 'income', 'employed'] // array of form items
        },
        init: function () {
            return this.enableFeesFundingForm();
        },
        hideFeesOption: function () {
            $('.int-fees-option').removeClass('int-fees-option-active');
        },
        showFeesOption: function () {
            this.hideFeesOption();
            $('#int-fees-option1').addClass('int-fees-option-active');
            OUApp.Helpers.scrollPageTo('#int-fees-option1');
        },
        setButtonState: function (btn, enabled) {
            var that = this,
                btn = $('#' + btn);

            if (enabled) {
                btn.removeAttr('disabled').removeClass('int-button-disabled');
                btn.on('click', function () {
                    that.showFeesOption();
                });
            } else {
                btn.attr('disabled', true);
            }
        },
        checkFeesFundingForm: function () {
            var i,
                valid = true;
            for (i = 0; i < this.feesFundingItems.length; i = i + 1) {
                if (this.feesFundingItems[i] === "credits") { // credits is a selectbox
                    if ($('#' + this.feesFundingItems[i]).val() === "") {
                        valid = false;
                    }
                } else {
                    if ($('input[name=' + this.feesFundingItems[i] + ']:checked').length < 1) {
                        valid = false;
                    }
                }
            }
            this.setButtonState('int-btn-feesFunding', valid);
        },// validate form items
        enableFeesFundingForm: function () {
            var that = this;
            $('#int-fees-funding-form input[type=radio], #int-fees-funding-form select').on('change', function () {
                that.checkFeesFundingForm();
            });
            this.setButtonState('int-btn-feesFunding', false);

            return this;
        } // validate form every time an item changes
    };

})(jQuery, window.OU.EEP = window.OU.EEP || {}, window, document);