// ----------------------------------------------------------
// OU.Widgets.Select
// ----------------------------------------------------------
// The Open University © Copyright 2014. All rights reserved
// Written by Paul Liu | paul.liu@open.ac.uk
// ----------------------------------------------------------

window.OU = window.OU || {};

(function ($, window, widgets, undefined) {

    widgets.Select = function ($element, options) {
        this.options = $.extend({}, this.defaults, options);
        var o = this.options;
        this.$container = $element;
        this.$input = $(o.inputSelector, $element);
        this.$select = $(o.selectSelector, $element).uniqueId();
        this.$menu = $(o.menuSelector, $element).uniqueId();
        this.$options = this.$menu.find('div');
        this.$selected = this.$options.filter('.selected');
        this.init();
    };
    widgets.Select.prototype = {
        version: 'OU.Widgets.Select | v0.11 | Changes to default class names',
        defaults: {
            inputSelector: '.select-widget-input',
            selectSelector: '.select-widget',
            selectDefaultText: 'Please select an option',
            selectActiveClass: 'active',
            menuDisplay: false,
            menuHideAfterSelection: true,
            menuSelector: '.select-widget-menu',
            menuHiddenEvent: 'OU.Widgets.Select.menu.hidden',
            menuShownEvent: 'OU.Widgets.Select.menu.shown',
            selectChangeCallback: undefined,
            offClick: true,
            ariaVisibilityAttributes: {
                visible: {
                    'aria-hidden': 'false',
                    'aria-expanded': 'true'
                },
                hidden: {
                    'aria-hidden': 'true',
                    'aria-expanded': 'false'
                }
            }
        },
        init: function () {
            return this
                .setSelectedOption(this.$selected, true)
                .attachMainHandlers()
                .aria();
        },
        attachMainHandlers: function () {
            var base = this,
                $select = base.$select,
                $menu = base.$menu,
                o = base.options;

            $select.click(function () {
                if (base.$menu.is(':visible')) {
                    base.hideMenu();
                } else {
                    base.showMenu();
                }
            });

            $menu.on({
                click: function (e) {
                    base.setSelectedOption($(this));

                    if (o.menuHideAfterSelection) {
                        base.hideMenu(true);
                    }
                }
            }, 'div');

            if (o.offClick) {
                $(document).click(function () {
                    base.hideMenu();
                });

                //Stop the propagation of document click event when component clicked.
                $select.click(function (e) {
                    e.stopPropagation();
                });
                $menu.click(function (e) {
                    e.stopPropagation();
                });
            }

            return base;
        },
        hideMenu: function (giveSelectFocus) {
            var base = this,
                o = base.options;

            if (base.$menu.is(':visible')) {
                base.$menu.hide();
                base.$container.trigger(o.menuHiddenEvent);
                base.$select.removeClass(o.selectActiveClass);
                if (giveSelectFocus) {
                    base.$select.focus();
                }
            }
        },
        showMenu: function () {
            var base = this,
                o = base.options;

            if (base.$menu.is(':hidden')) {
                base.$menu.show();
                base.$container.trigger(o.menuShownEvent);
                setMenuItemFocus();
                base.$select.addClass(o.selectActiveClass);
            }

            function setMenuItemFocus() {
                if (base.$selected.length)
                    base.$selected.focus();
                else
                    base.$options.eq(0).focus();
            }
        },
        getValue: function () {
            return this.value;
        },
        setSelectedOption: function ($selected, init) {
            var base = this,
                o = base.options;

            base.$options.removeClass('selected');
            base.$selected = $selected.addClass('selected');
            //Set the select text
            base.$select.text(base.$selected.length ? base.$selected.text() : base.options.selectDefaultText);
            //Set the hidden input value - this is what gets submitted
            base.$input.val(base.$selected.length ? base.$selected.data('value') : null);
            //Update the value property for external use.
            base.value = base.$input.val();

            if (o.selectChangeCallback && !init) {
                o.selectChangeCallback(base);
            }

            return base;
        },
        setKeyboardAccessibility: function (set) {
            var base = this,
                $select = base.$select,
                $menu = base.$menu,
                o = base.options,
                k = {
                    up: 38,
                    down: 40,
                    enter: 13,
                    space: 32,
                    tab: 9
                },
                $container = base.$container,
                ar = [33, 34, 35, 36, 37, 38, 39, 40],
                aria = o.ariaVisibilityAttributes;

            if (set) {
                $select.on('keyup', function (e) {
                    var key = e.which;

                    if (key === k.enter || key === k.space) {
                        base.$select.trigger('click');
                    }
                    if (key === k.up) {
                        base.hideMenu(true);
                    }
                    if (key === k.down) {
                        base.showMenu();
                    }
                });
                $menu.on({
                    keyup: function (e) {
                        var $this = $(this),
                            key = e.which;

                        if (key === k.enter) {
                            e.preventDefault();
                            $this.trigger('click');
                        }
                    },
                    keydown: function (e) {
                        var $this = $(this),
                            key = e.which;

                        if (key === k.up && $this.prev('div').length) {
                            base.setSelectedOption($this.prev('div').focus(), false);
                        }
                        if (key === k.down && $this.next('div').length) {
                            base.setSelectedOption($this.next('div').focus(), false);
                        }
                        if (key === k.tab) {
                            e.preventDefault();
                            base.hideMenu(true);
                        }
                    },
                    mouseover: function () {
                        $(this).focus();
                    }
                }, 'div');
                $container
                    .keydown(function (e) {  //Prevent page scroll with arrow keys when container has focus.
                        var key = e.which;

                        if ($.inArray(key, ar) > -1) {
                            e.preventDefault();
                            return false;
                        }
                        return true;
                    })
                    .on(o.menuHiddenEvent, function () {
                        $menu.attr(aria.hidden);
                    })
                    .on(o.menuShownEvent, function () {
                        $menu.attr(aria.visible);
                    });
            } else {
                $select.off('keyup');
                $menu.off('keyup').off('keydown').off('mouseover');
                $container.off('keydown').off(o.menuHiddenEvent).off(o.menuShownEvent);
            }

            return base;
        },
        aria: function () {
            var base = this,
                o = base.options,
                aria = o.ariaVisibilityAttributes;

            if (o.menuDisplay) {
                base.$menu.show();
            }

            base.$options.attr({
                'tabindex': '0',
                'role': 'option'
            });
            base.$container.attr({
                'role': 'listbox',
                'aria-haspopup': 'true'
            });
            base.$select.attr({
                'tabindex': '0',
                'role': 'button',
                'aria-controls': base.$menu.attr('id')
            });
            base.$menu.attr(base.$menu.is(':visible') ? aria.visible : aria.hidden).attr('role', 'listbox');
            base.setKeyboardAccessibility(true);

            return base;
        },
        menuBuilder: function ($menu, options) {
            var optsLength = options.length;

            for (var i = 0; i < optsLength; i++) {
                var obj, $div;

                obj = options[i];
                $div = $('<div></div>', {
                    text: obj.text,
                    'class': obj.selected ? 'selected' : ''
                }).attr({
                    'tabindex': '0',
                    'role': 'option'
                }).data('value', obj.value);

                if (obj.attr) {
                    $div.attr(obj.attr);
                }

                $div.appendTo($menu);
            }
        },
        ajaxLoadNewOptionsSet: function (options) {
            var base = this, $menu;

            $menu = base.$menu.detach().empty();
            base.menuBuilder($menu, options);
            $menu.appendTo(base.$container);

            base.$options = $menu.find('div');
            base.$selected = base.$options.filter('.selected');

            return base.setSelectedOption(this.$selected, true);
        }
    };

    if (widgets.Plugin) {
        new widgets.Plugin(widgets.Select, { name: 'OUSelect' });
    }

})(jQuery, window, window.OU.Widgets = window.OU.Widgets || {});