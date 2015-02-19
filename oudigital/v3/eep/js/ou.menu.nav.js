/* TODO: MOVE THIS BEFORE GIVING IT TO ANY DEVELOPERS TO IMPLEMENT ON A SITE */
/*
 OU Menu Nav | v3.01
 Notes:
 Aria follows guidlines set out for menubar http://www.w3.org/TR/wai-aria-practices/#menu
 */
//Closure to protect $ usage in case of use by other libraries.
(function ($, window, document) {
    //Extend jQuery function to be able to generate unique ids - used for aria.
    $.fn.OUId = function (prefix) {
        var p = prefix || 'OU-ID';
        return this.each(function () {
            var $this = $(this);
            if (typeof $this.attr('id') === 'undefined') {
                $this.attr('id', p + ($.fn.OUId.counter += 1));
            }
        });
    };
    $.fn.OUId.counter = 0;

    //For use on non jQuery Objects
    function getOUId(prefix) {
        var p = prefix || 'OU-ID';
        return p + ($.fn.OUId.counter += 1);
    }

    var ieVersion = (function () {
        var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');

        while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]);

        return v > 4 ? v : undef;
    })(),
        supportsMediaQueries = (function mediaQueriesSupported() {
            if (typeof window.matchMedia != "undefined" || typeof window.msMatchMedia != "undefined" || (ieVersion >= 9)) {
                return true;
            } else {
                return false;
            }
        })(),
        $window = $(window),
        menu,
        mobileMenu,
        $body,
        $secondaryNav,
        supportsjQueryOn = typeof $.fn.on === 'function';

    $window.load(function () {
        $body = $('body'),
            $secondaryNav = $('.ou-secondary-nav');

        if (!$secondaryNav.data('nav-init')) {

            // Make sure cookie policy ran
            if (typeof ouCookiePolicyDisplayNotification === "function") {
                ouCookiePolicyDisplayNotification();
            }

            menu = new Menu();
            mobileMenu = new MobileMenu();

            window.setTimeout(function () { $window.trigger('resize'); }, 50); //Fix height issue in drupal
        }
    });

    //Prototypes
    //Menu prototype deals with making the Menu responsive and sets click handlers to activate sub menus
    function Menu() {
        var base = this;
        base.$navHeightContainer = $('<div id="ou-nav-height" role="navigation" aria-label="Secondary"></div>');
        base.$menuTriggers = undefined;
        base.$subMenus = undefined;
        base.init();
    }
    Menu.prototype = {
        init: function () {
            $secondaryNav.attr({
                'role': 'menubar',
                'aria-label': 'Secondary navigation',
                'aria-live': 'polite',
                'aria-atomic': 'false'
            });;

            return this.addElementsToDOM()
                .setActiveItem()
                .setClickHandler()
                .setWindowResizeHandler()
                .setInitDataAttribute()
                .setKeyboardAccessibility()
                .showSecondaryMenu();
        },
        showSecondaryMenu: function () {
            //In pages where the page load takes a long time, the whole menu is displayed before the height settings
            //Hiding the secondary menu initially and then fading in the menu after page load gets around this issue.

            $secondaryNav.slideDown(50);

            return this;
        },
        setInitDataAttribute: function () {
            var base = this;

            $secondaryNav.data('nav-init', true); //To prevent multiple initialisation

            return base;
        },
        setWindowResizeHandler: function () {
            var base = this;

            $window.resize(function () {
                base.calcMenuSize();
            });

            return base;
        },
        setClickHandler: function () {
            var base = this,
                $trigger,
                $menu,
                $container;

            base.$menuTriggers.click(function (e) {

                e.preventDefault();

                $trigger = $(this);
                $menu = $trigger.next('.ou-nav-sub-menu');
                $container = $trigger.parent('li');

                if ($menu.is(':visible')) {
                    hideMenu();
                }
                else {
                    showMenu();
                }

                base.updateAriaStates(base.$subMenus);
                base.calcMenuSize();
            });

            function hideMenu() {
                // Set chevrons
                $container.removeClass("ou-nav-active").addClass("ou-nav-inactive");
                // Turn off the scroll system for this container, and add it to the parent container
                $container.find('.ou-container').removeClass('int-menu-scroll');
                $container.closest('.ou-container').closest('.ou-container').addClass('int-menu-scroll');

                // Turn off all child rows cheverons
                $('li', $container).addClass('ou-nav-inactive');

                // Show and hide the correct rows
                $menu.hide();

                //Give menu trigger focus
                $trigger.focus();

                //Hide all submenus of this 
                $menu.find('.ou-nav-sub-menu').hide();
            }

            function showMenu() {
                // Set chevrons
                $container.addClass('ou-nav-active').removeClass('ou-nav-inactive');
                $container.find('.ou-container').eq(0).addClass('int-menu-scroll');

                // Disable all other menus
                $container.siblings('li').removeClass('ou-nav-active').addClass('ou-nav-inactive');
                $container.closest('.ou-container').closest('.ou-container').removeClass('int-menu-scroll');

                // Turn off all child rows cheverons
                $('li', $container).addClass('ou-nav-inactive');

                // Show this menu and given focus
                $menu.show().find('ul').eq(0).find('li').eq(0).find('a').eq(0).focus();

                // hide all other menus
                $container.siblings().find('.ou-nav-sub-menu').hide();
            }

            return base;
        },
        addElementsToDOM: function () {
            var base = this, $li, $menu, $anchor, menuId, triggerId;

            $secondaryNav.wrap(base.$navHeightContainer).find('a').attr('role', 'menuitem');

            $('li:has(ul)', $secondaryNav).each(function () {
                $li = $(this);
                triggerId = getOUId();
                menuId = getOUId();
                $anchor = $li.children('a');

                createSubMenu($li, triggerId, menuId);
                createMobileBackToParentButton($menu = $li.children('.ou-nav-sub-menu'), $li);
                createSubMenuTrigger($anchor, $anchor.text(), triggerId);
            });

            //Cache the generated elements and make them available to the whole prototype
            base.$subMenus = $('.ou-nav-sub-menu');
            base.$menuTriggers = $('.int-nav-trigger');

            function createSubMenu($li, $triggerId, menuId) {
                $li.children('ul').wrap('<div class="ou-nav-sub-menu" id="' + menuId + '" tabindex="-1" role="menubar" aria-labelledby="' + $triggerId + '" aria-expanded="false" aria-hidden="true"><div class="ou-container"></div></div>');
            }

            function createMobileBackToParentButton($menu, $li) {
                $menu.children('.ou-container').prepend(MobileMenu.prototype.createBackToParentButton($li));
            }

            function createSubMenuTrigger($anchor, anchorText, triggerId) {
                $anchor.after('<a href="#" id="' + triggerId + '" class="int-nav-trigger" aria-label="' + anchorText + '" aria-haspopup="true" role="menuitem"><span><i class="fa fa-chevron-down"></i><i class="fa fa-chevron-right"></i><i class="fa fa-chevron-up"></i></span></a>');
            }

            return base;
        },
        setActiveItem: function () {
            var base = this,
                activeItemPageId = $body.data('page-id');

            if (activeItemPageId) {
                $('.' + activeItemPageId).parents('li').addClass('ou-nav-active');
                $('.' + activeItemPageId).closest('.ou-container').addClass('int-menu-scroll');
            }

            // once we've set a trail, activate it
            base.activateExistingBreadcrumbs();

            return base;
        },
        activateExistingBreadcrumbs: function () {
            var base = this;

            $('.ou-nav-active', $secondaryNav).each(function (index) {
                var $this = $(this);
                $this.children('.int-nav-trigger').data('active', true);
                $this.children('.ou-nav-sub-menu').show();
                $this.siblings('li').addClass('ou-nav-inactive');
                $this.siblings().children('a.int-nav-trigger').data('active', false);
            });

            // Once we've expanded our menu, recalculate the layout
            base.calcMenuSize();

            return base;
        },
        calcMenuSize: function () {
            // Set each list items position, and create a container big enough to push the 
            // page content down the required amount

            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

            // If we arent in responsive mode, we need to calculate the menu height
            if (supportsMediaQueries) {
                if (width > 767) {
                    setContainerHeight();
                }
                else {
                    // Set everything back to 0 and use the css to determine whats visible
                    var $subnav = $('li.ou-nav-active', $secondaryNav);
                    $subnav.each(function (index) {
                        // clear any top values that may have been set
                        $(this).find('.ou-nav-sub-menu').removeAttr('style');
                    });

                    // make sure the content sits right under the header bar
                    $('#ou-nav-height').height(0);
                }
            } else {
                setContainerHeight();
            }

            function setContainerHeight() {
                // Go through each active nav item
                var $subnav = $('li.ou-nav-active', $secondaryNav);
                $subnav.each(function () {
                    var $this = $(this),
                        $thisMenu = $this.find('.ou-nav-sub-menu'),
                        hasParent = $this.closest('.ou-nav-sub-menu').length,
                        height = (hasParent ? $this.closest('.ou-nav-sub-menu').outerHeight() : $this.closest('.ou-secondary-nav').outerHeight()),
                        start = (hasParent ? null : $this.closest('.ou-secondary-nav').offset().top),
                        top = (hasParent ? height + 'px' : (start + height) + 'px');

                    $thisMenu.css({ 'top': top });
                });

                // Now set the container big enough to push the content
                // down beneath the new menu height
                $('#ou-nav-height').height(function () {
                    // A function to calculate the height of this item + all decendants.
                    var outerHeight = $secondaryNav.outerHeight();
                    $secondaryNav.find('.ou-nav-active').each(function () {
                        outerHeight += $(this).find('.ou-nav-sub-menu').outerHeight();
                    });

                    return outerHeight;
                });
            }
        },
        updateAriaStates: function ($menus) {
            var base = this,
                $menu,
                menuHidden;

            $menus.each(function () {
                $menu = $(this);
                menuHidden = $menu.is(':hidden');

                $menu.attr({
                    'aria-expanded': !menuHidden,
                    'aria-hidden': menuHidden
                });
            });

            return base;
        },
        setKeyboardAccessibility: function () {
            var base = this,
                keys = {
                    space: 32,
                    enter: 13,
                    up: 38,
                    down: 40,
                    left: 37,
                    right: 39,
                    esc: 27
                };

            //jQuery on() is only supported in newer jQuery versions. For older versions we use delegate(). 
            $secondaryNav[(supportsjQueryOn ? 'on' : 'delegate')]('keyup', 'a', function (e) {
                e.preventDefault();
                var $anchor = $(this),
                    keyPressed = e.which;

                //Space, Up, Down on trigger triggers click
                if ($anchor.hasClass('int-nav-trigger') && $.inArray(keyPressed, [keys.space, keys.up, keys.down]) > -1) {
                    $anchor.trigger('click');
                }

                //Right key up moves focus on to the next anchor
                if (keyPressed === keys.right) {
                    giveNextLinkFocus($anchor);
                }

                //Left key up moves focus on the the previous anchor
                if (keyPressed === keys.left) {
                    givePreviousLinkFocus($anchor);
                }
            });

            function giveNextLinkFocus($anchor) {
                var $trigger = $anchor.next('a.int-nav-trigger'),
                    $nextParent = $anchor.parent('li').next('li');

                if ($trigger.length && $trigger.is(':visible')) {
                    $trigger.focus();
                } else {
                    if ($nextParent.length) {
                        $nextParent.find('a').filter(':visible').eq(0).focus();
                    }
                }
            }

            function givePreviousLinkFocus($anchor) {
                var isTrigger = $anchor.hasClass('int-nav-trigger'),
                    $prevParent = $anchor.parent('li').prev('li');

                if (isTrigger) {
                    $anchor.prev('a').focus();
                } else {
                    if ($prevParent.length) {
                        $prevParent.find('a').filter(':visible').eq(0).focus();
                    }
                }
            }


            //Esc submenu gives trigger focus
            base.$subMenus.each(function () {
                var $subMenu = $(this),
                    $trigger = $('#' + $subMenu.attr('aria-labelledby'));

                $subMenu.keyup(function (e) {
                    if (e.which === keys.esc) {
                        $trigger.trigger('click');
                        e.stopPropagation(); //Stops this event propogating up the tree so esc occurs on current level only
                    }
                });
            });

            return base;
        }
    };

    //MobileMenu prototype contains all the methods for dealing with the mobile menu
    function MobileMenu() {
        var base = this;

        base.$button = $('<a href="#" id="ou-nav-toggle" role="button" class="ou-nav-toggle"><i class="int-icon int-icon-bars int-icon-lg"></i> <i class="int-icon int-icon-times int-icon-lg"></i></a>').prependTo($secondaryNav);
        base.$overlay = $('<div class="ou-nav-mob-overlay" tabindex="-1"></div>');
        base.bodyScrollPosition = undefined;
        base.menuVisible = false;
        base.init();
    }
    MobileMenu.prototype = {
        init: function () {
            var base = this;

            //Add overlay to DOM
            $secondaryNav.before(base.$overlay);

            return base.setEventHandlers();
        },
        setEventHandlers: function () {
            var base = this;

            base.$button.click(function (e) {
                e.preventDefault();

                //Toggle mobile menu
                base[(base.menuVisible ? 'hideMenu' : 'showMenu')]();
            });

            $secondaryNav[(supportsjQueryOn ? 'on' : 'delegate')]('click', '.ou-backToMainMenu', function (e) {
                e.preventDefault();
                $(this).closest('.ou-nav-sub-menu').prev('.int-nav-trigger').trigger('click');
            });

            $window.resize(function () {
                base.hideMenu();
            });

            return base;
        },
        hideMenu: function () {
            var base = this;

            $secondaryNav.removeClass('ou-nav-open-active');
            base.$overlay.removeClass('ou-nav-open-active');
            base.setBodyScrollBarVisibility(true);          //put scrollbar back in place
            $body.scrollTop(base.bodyScrollPosition);    //set the cached scroll position
            base.menuVisible = false;
        },
        showMenu: function () {
            var base = this;

            $secondaryNav.addClass('ou-nav-open-active');
            base.$overlay.addClass('ou-nav-open-active');
            base.bodyScrollPosition = $body.scrollTop();
            base.setBodyScrollBarVisibility(false);
            base.menuVisible = true;
        },
        setBodyScrollBarVisibility: function (visible) {
            $body.css("overflow", (visible ? 'auto' : 'hidden'));
        },
        createBackToParentButton: function ($item) {    //Used by Menu prototype to create the backToMainMenu button, though this is defined here as it is part of the mobile menu
            return '<a href="#" class="ou-backToMainMenu" role="button"><span><i class="int-icon int-icon-chevron-left"></i>Back to ' + $item.children("a").text() + '</span></a>';
        }
    };

})(jQuery, window, document);    //If using multiple jquery objects, pass in an alias instead of jQuery