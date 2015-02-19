/*******************************************

    App

*******************************************/

(function () {
    
    "use strict";

    var OUApp = {

        Modules: {},

        Helpers: {},

        init: function () {
            var x;
            for (x in OUApp.Modules) {
                if (OUApp.Modules.hasOwnProperty(x)) {
                    OUApp.Modules[x].init();
                }
            }
            $('input, textarea').placeholder();
            
            //$(window).smartresize(function () { console.log(OUApp.Helpers.getMQ()); });
        }

    };
    
    window.OUApp = OUApp;
    
}());


OUApp.Helpers.getMQ = function () {
    return window.getComputedStyle(document.body,':after').getPropertyValue('content');
}

OUApp.Modules.cookiesbar = {
    
    addCookie: function () {
        Cookies.set('ou_cookie_policy', true);
    },
    
    removeCookie: function () {
        Cookies.expire('ou_cookie_policy');
    },
    
    deactivateBar: function () {
        this.addCookie();
        $('#int-cookies-bar').animate({
            "max-height": "0"
        }, 300, function () { setTimeout(function () { $(this).removeClass('int-active'); }, 250); });
    },
    
    activateBar: function () {
        setTimeout(function () {
            $('#int-cookies-bar').addClass("int-active");
        }, 300);
    },
    
    init: function () {
        var that = this;
        if (!Cookies.get('ou_cookie_policy')) {
            this.activateBar();
            $('#int-cookies-bar .int-button').on('click', function (e) {
                e.preventDefault();
                that.deactivateBar();
            });
        }
    }
    
};

OUApp.Modules.course_details = {
    
    courseNav: {
        
        stickyNavTop: 0,
        
        stickyNav: function () {
            var scrollTop = $(window).scrollTop(); // check how far the window has scrolled
            if (scrollTop > this.stickyNavTop) { // check if sticky item is passed top of screen
                $('.int-sticky-inpage').addClass('int-sticky');
            } else {
                $('.int-sticky-inpage').removeClass('int-sticky');
            }
        },
        
        positionStickyNav: function () {
            if ($('.int-sticky-inpage').length > 0) {
                $('.int-sticky-inpage').removeClass('int-sticky'); // put sticky back in original position
                this.stickyNavTop = $('.int-sticky-inpage').offset().top; // get top value of sticky item
                this.stickyNav();
            }
        },
        
        enableStickyNav: function () {
            var that = this;
            that.positionStickyNav();
            $(window).scroll(function () { that.stickyNav(); }); // check nav pos on scroll
            $(window).smartresize(function () {that.positionStickyNav(); }); // reposition nav when window resizes
            OUApp.Modules.navigation.enableMenuToggle('int-course-nav-toggle', 'int-course-nav'); // enable mobile nav toggle
            // set current active section title when it new tab is selected
            $('.int-sticky-inpage ul a').on('click', function (e) {
                $('#int-course-nav-toggle .int-active-section').text($(this).text());
                OUApp.Modules.navigation.toggleMenu('int-course-nav'); // close the menu
            });
        },
        
        enableTabs: function () {
            // enable tabs - jquery UI control
            $("#int-course-detail-tabs").tabs({
                activate: function (event, ui) {
                    // scroll page to top of tabs when a new tab is activated
                    $(window).scrollTop($("#int-course-detail-tabs").offset().top);
                }
            });
        },
        
        init: function () {
            this.enableTabs();
            this.enableStickyNav();
        }
    },
    
    courseForms: {
        
        feesFundingItems: ['study', 'degree', 'income', 'employed'],
        
        enableButton: function (btn) {
            //console.log('enable button' + btn);
            $('#' + btn).removeAttr('disabled').removeClass('int-button-disabled');
        },
        
        checkFeesFundingForm: function () {
            var i;
            for (i = 0; i < this.feesFundingItems.length; i = i + 1) {
                //console.log(this.feesFundingItems[i] + ' : ' + $('input[name=' + this.feesFundingItems[i] + ']:checked').length);
                if ($('input[name=' + this.feesFundingItems[i] + ']:checked').length < 1) {
                    return false;
                }
            }
            this.enableButton('int-btn-feesFunding');
        },
        
        enableFeesFundingForm: function () {
            var that = this;
            //console.log('enable form');
            $('#int-fees-funding-form input[type=radio]').on('change', function () {
                //console.log('change');
                that.checkFeesFundingForm();
            });
        },
        
        init: function () {
            this.enableFeesFundingForm();
        }
        
    },
    
    init: function () {
        this.courseNav.init();
        this.courseForms.init();
    }
    
};

OUApp.Modules.navigation = {

    nav_open_class: 'int-nav-open',

    toggleMenu: function (target) {
        $('#' + target).toggleClass(this.nav_open_class);
    },

    enableMenuToggle: function (linkId, target) {
        $('#' + linkId).on('click', function (e) {
            e.preventDefault();
            OUApp.Modules.navigation.toggleMenu(target);
        });
    },

    metaNav: {

        init: function () {
            $(".int-nav-meta").accessibleMegaMenu({
            /* prefix for generated unique id attributes, which are required 
               to indicate aria-owns, aria-controls and aria-labelledby */
                uuidPrefix: "int-meta-megamenu",
                menuClass: "int-nav-meta-list", /* css class used to define the megamenu styling */
                topNavItemClass: "int-nav-meta-item", /* css class for a top-level navigation item in the megamenu */
                panelClass: "int-nav-meta-menu", /* css class for a megamenu panel */
                panelGroupClass: "int-nav-meta-menu-group", /* css class for a group of items within a megamenu panel */
                hoverClass: "int-nav-meta-hover", /* css class for the hover state */
                focusClass: "int-nav-meta-focus", /* css class for the focus state */
                openClass: "int-nav-meta-open", /* css class for the open state */
                clickToOpen: true /* Menu to open via a click */
            });
        }

    },

    primaryNav: {

        enablePrimaryNav: function () {
            $("nav[role=navigation] .int-nav-primary").accessibleMegaMenu({
            /* prefix for generated unique id attributes, which are required 
               to indicate aria-owns, aria-controls and aria-labelledby */
                uuidPrefix: "int-prim-megamenu",
                menuClass: "int-nav-prim-list", /* css class used to define the megamenu styling */
                topNavItemClass: "int-nav-prim-item", /* css class for a top-level navigation item in the megamenu */
                panelClass: "int-nav-sub-menu", /* css class for a megamenu panel */
                panelGroupClass: "int-nav-sub-menu-group", /* css class for a group of items within a megamenu panel */
                hoverClass: "int-nav-hover", /* css class for the hover state */
                focusClass: "int-nav-focus", /* css class for the focus state */
                openClass: "int-nav-open" /* css class for the open state */
            });
        },

        enableMobileNav: function () {
            $('.int-nav-primary').clone().appendTo('#int-nav-mob'); // copy primary nav and insert it into mob nav div
            $('#int-nav-mob .int-nav-primary > ul > li').each(function () {
                if ($(this).find('.int-nav-sub-menu').length > 0) { // if nav item has a sub menu
                    // add sub menu toggle nav items
                    $(this).append('<a href="#" class="int-showSubMenu"><i class="int-icon int-icon-chevron-right"></i></a>');
                    $(this).find('.int-nav-sub-menu .int-container').prepend('<a href="#" class="int-backToMainMenu"><span><i class="int-icon int-icon-chevron-left"></i> Back to Main menu</span></a>');
                }
            });
            OUApp.Modules.navigation.enableMenuToggle('int-nav-toggle', 'int-nav-mob');
            // hide nav menu when overlay is clicked
            $('.int-nav-mob-overlay').on('click', function (e) {
                e.preventDefault();
                OUApp.Modules.navigation.toggleMenu('int-nav-mob');
            });
            $('.int-showSubMenu').on('click', function (e) {
                e.preventDefault();
                $(this).parent().addClass('int-nav-active');
            });
            $('.int-backToMainMenu').on('click', function (e) {
                e.preventDefault();
                $('#int-nav-mob .int-nav-active').removeClass('int-nav-active');
            });
        },

        init: function () {
            this.enableMobileNav();
            this.enablePrimaryNav();
        }

    },

    init: function () {
        this.metaNav.init();
        this.primaryNav.init();
    }

};

OUApp.Modules.ui_widgets = {
    
    accordion: function () {
        //console.log('accordion init');
        $('.int-accordion').accordion({
            heightStyle: "content"
        });
        $('.int-accordion .ui-accordion-header').prepend('<span class="int-icon-btn int-accordion-closed"><i class="int-icon int-icon-chevron-right"></i></span><span class="int-icon-btn int-icon-btn-active int-accordion-open"><i class="int-icon int-icon-chevron-down"></i></span>');
    },
    
    init: function () {
        this.accordion();
    }
    
};

/*******************************************
	
	Main

*******************************************/

$(OUApp.init);