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
                    // back back to main link
                    $(this).find('.int-nav-sub-menu .int-container').prepend('<a href="#" class="int-backToMainMenu"><span><i class="int-icon int-icon-chevron-left"></i> Back to Main menu</span></a>');
                }
            });
            
            $('.int-nav-alt-primary').clone().appendTo('#int-nav-mob'); // copy primary nav and insert it into mob nav div
            
            // add sub menu div's for alt mobile nav
            $('.int-nav-alt-mob .int-nav-alt-primary > ul > li > ul')
                .wrap('<div class="int-nav-sub-menu"><div class="int-container"></div></div>')
                .find('ul') // add sub sub menu divs
                    .wrap('<div class="int-nav-sub-sub-menu"><div class="int-container"></div></div>');
            
            // loop throughtop level nav item
            $('.int-nav-alt-mob .int-nav-alt-primary > ul > li').each(function () {
                if ($(this).find('.int-nav-sub-menu').length > 0) { // if nav item has a sub menu
                    // add sub menu toggle nav items
                    $(this).append('<a href="#" class="int-showSubMenu"><i class="int-icon int-icon-chevron-right"></i></a>');
                    // add back to main link
                    $(this).find('.int-nav-sub-menu > .int-container').prepend('<a href="#" class="int-backToMainMenu"><span><i class="int-icon int-icon-chevron-left"></i> Back to Main menu</span></a>');
                    
                    // loop through sub nav item
                    $(this).find('.int-nav-sub-menu > .int-container > ul > li').each(function () {
                        var prevNav = $(this).find(' > a').text();
                        if($(this).find('.int-nav-sub-sub-menu').length > 0) { // in nav item has a sub sub menu
                            // add sub menu toggle nav items
                            $(this).append('<a href="#" class="int-showSubSubMenu"><i class="int-icon int-icon-chevron-right"></i></a>');
                            
                            $(this).find('.int-nav-sub-sub-menu > .int-container').prepend('<a href="#" class="int-backToSubMenu"><span><i class="int-icon int-icon-chevron-left"></i> Back to ' + prevNav + '</span></a>');
                        
                        }
                    });
                }
            });
            
            OUApp.Modules.navigation.enableMenuToggle('int-nav-toggle', 'int-nav-mob');
            // hide nav menu when overlay is clicked
            $('.int-nav-mob-overlay').on('click', function (e) {
                e.preventDefault();
                OUApp.Modules.navigation.toggleMenu('int-nav-mob');
            });
            $('.int-showSubMenu, .int-showSubSubMenu').on('click', function (e) {
                e.preventDefault();
                $(this).parent().addClass('int-nav-active');
            });
            $('.int-backToMainMenu').on('click', function (e) {
                e.preventDefault();
                $('#int-nav-mob .int-nav-active').removeClass('int-nav-active');
            });
            $('.int-backToSubMenu').on('click', function (e) {
                e.preventDefault();
                $(this).closest('li').removeClass('int-nav-active');
            });
        },
        
        sfHover: function () {
            var sfEls = document.getElementById("int-nav-alt-primary").getElementsByTagName("LI");
            for (var i=0; i<sfEls.length; i++) {
                sfEls[i].onmouseover=function() {
                    this.className+=(this.className.length>0? " ": "") + "sfhover";
                }
                sfEls[i].onmouseout=function() {
                    this.className=this.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
                }
            }
        },
        mcAccessible: function () {
            var mcEls = document.getElementById("int-nav-alt-primary").getElementsByTagName("A");
            for (var i=0; i<mcEls.length; i++) {
                mcEls[i].onfocus=function() {
                    this.className+=(this.className.length>0? " ": "") + "sffocus"; //a:focus
                    this.parentNode.className+=(this.parentNode.className.length>0? " ": "") + "sfhover"; //li < a:focus
                    if(this.parentNode.parentNode.parentNode.nodeName == "LI") {
                        this.parentNode.parentNode.parentNode.className+=(this.parentNode.parentNode.parentNode.className.length>0? " ": "") + "sfhover"; //li < ul < li < a:focus
                        if(this.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "LI") {
                            this.parentNode.parentNode.parentNode.parentNode.parentNode.className+=(this.parentNode.parentNode.parentNode.parentNode.parentNode.className.length>0? " ": "") + "sfhover"; //li < ul < li < ul < li < a:focus
                        }
                    }
                }
                mcEls[i].onblur=function() {
                    this.className=this.className.replace(new RegExp("( ?|^)sffocus\\b"), "");
                    this.parentNode.className=this.parentNode.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
                    if(this.parentNode.parentNode.parentNode.nodeName == "LI") {
                        this.parentNode.parentNode.parentNode.className=this.parentNode.parentNode.parentNode.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
                        if(this.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "LI") {
                            this.parentNode.parentNode.parentNode.parentNode.parentNode.className=this.parentNode.parentNode.parentNode.parentNode.parentNode.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
                        }
                    }
                }
            }
        },

        init: function () {
            this.enableMobileNav();
            this.enablePrimaryNav();
            if($('#int-nav-alt-primary').length > 0) { this.mcAccessible(); }
        }

    },

    init: function () {
        if (!OUApp.Helpers.isIE7()) {
            this.primaryNav.init();
        }
        this.metaNav.init();
    }

};