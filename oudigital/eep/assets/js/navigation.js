var int_ou_navigation = {

    nav_open_class: 'int-nav-open',

    toggleMenu: function (target) {
        $('#' + target).toggleClass(this.nav_open_class);
    },

    enableMenuToggle: function (linkId, target) {
        $('#' + linkId).on('click', function (e) {
            e.preventDefault();
            int_ou_navigation.toggleMenu(target);
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
            int_ou_navigation.enableMenuToggle('int-nav-toggle', 'int-nav-mob');
            // hide nav menu when overlay is clicked
            $('.int-nav-mob-overlay').on('click', function (e) {
                e.preventDefault();
                int_ou_navigation.toggleMenu('int-nav-mob');
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
            int_ou_navigation.primaryNav.enableMobileNav();
            int_ou_navigation.primaryNav.enablePrimaryNav();
        }

    },

    courseNav: {
        
        stickyNavTop: 0,
        
        stickyNav: function() {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > this.stickyNavTop) {
                $('.int-sticky-inpage').addClass('int-sticky');
            } else {
                $('.int-sticky-inpage').removeClass('int-sticky');
            }
        },
        
        enableStickyNav: function() {
            $('.int-sticky-inpage').removeClass('int-sticky');
            int_ou_navigation.courseNav.stickyNavTop = $('.int-sticky-inpage').offset().top;
            this.stickyNav();
        },
        
        init: function () {
            int_ou_navigation.enableMenuToggle('int-course-nav-toggle', 'int-course-nav');
            
            $("#int-course-detail-tabs").tabs({
                activate: function( event, ui ) {
                    console.log(ui.newPanel.offset().top);
                    $(window).scrollTop($("#int-course-detail-tabs").offset().top);
                }
            });
            
            $('.int-sticky-inpage ul a').on('click', function (e) {
                //$('.int-sticky-inpage .int-nav-active').removeClass('int-nav-active'); // remove current active state
                //$(this).parent().addClass('int-nav-active'); // add new active state
                //$('.int-section.int-section-active').removeClass('int-section-active');
                //$($(this).attr('href')).addClass('int-section-active');
                $('#int-course-nav-toggle .int-active-section').text($(this).text()); // set current active section title
                int_ou_navigation.toggleMenu('int-course-nav'); // close the menu
            });
            
            $(window).scroll(function () {
               int_ou_navigation.courseNav.stickyNav(); 
            });
            
            $(window).smartresize(function() {
                int_ou_navigation.courseNav.enableStickyNav(); 
            });
            
            this.enableStickyNav();
            
        }
    },

    init: function () {
        int_ou_navigation.metaNav.init();
        int_ou_navigation.primaryNav.init();
        int_ou_navigation.courseNav.init();
    }

};