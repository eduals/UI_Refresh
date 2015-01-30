/* TODO: MOVE THIS BEFORE GIVING IT TO ANY DEVELOPERS TO IMPLEMENT ON A SITE */

var OU = OU || {};                                                      //Add OU namespace, check for existing usages.

OU.DigitalFramework = OU.DigitalFramework || {};                        //Add Digital Framework Namespace, check for existing usages.

//Closure to protect $ usage in case of use by other libraries.
(function ($, window, df, undefined) {
	//Extend jQuery function to be able to generate unique ids - used for aria.
    $.fn.OUId = function () {
        return this.each(function () {
            if (typeof $(this).attr('id') === 'undefined') {
                $(this).attr('id', 'OU-' + ($.fn.OUId.counter += 1));
            }
        });
    };
    $.fn.OUId.counter = 0;

    var BackToParentButton = function ($item) {
        return $('<a href="#" class="ou-backToMainMenu"><span><i class="int-icon int-icon-chevron-left"></i>Back to ' + $($item).children("a").text() + '</span></a>');
    };
    
    // Toggle the responsive nav bar    
    $( document ).on('click', '#ou-nav-toggle', function() {
    	 if ($( this ).data('toggled')) {
            $('.ou-secondary-nav').removeClass('ou-nav-open-active');
        }
        else {
        	$('.ou-secondary-nav').addClass('ou-nav-open-active');
        }
        $( this ).data('toggled', !$( this ).data('toggled'));
    });
    
    // Toggle any menu items
    $(document).on('click', '.int-nav-trigger', function () {
        var $this = $(this),
            $dataActive = $this.data('active'),
            active = (typeof $dataActive === 'undefined' ? false : $dataActive);

        if (!active) {
            showNav($this);
        }
        else {
            hideNav($this);
        }
        $this.data('active', !$this.data('active'));
    });


    function showNav($this) {
        //////////////////////////////
        // Make this menu item active
        //////////////////////////////

        var $parentListItem = $this.parent('li'),
            $parentSiblings = $parentListItem.siblings();

        // Activate this menu
        $parentListItem.addClass("ou-nav-active").removeClass('ou-nav-inactive');
        // Disable all other menus
        $parentListItem.siblings('li').removeClass("ou-nav-active").addClass("ou-nav-inactive");

        // Turn off all child rows cheverons
        $('li', $this.parent('li')).addClass('ou-nav-inactive');

        // Show this menu
        $parentListItem.children('.ou-nav-sub-menu').show();
        // hide all other menus
        $parentSiblings.find('.ou-nav-sub-menu').hide();

        // Reset the active data for all nav triggers bar this.
        $parentSiblings.children('.int-nav-trigger').data('active', false);
    }

    function hideNav($this) {

        /////////////////////////////////
        // Make this menu item inactive
        /////////////////////////////////

        var $parentListItem = $this.parent('li');

        // Toggle this cheveron
        $parentListItem.removeClass("ou-nav-active").addClass("ou-nav-inactive");

        // Turn off all child rows cheverons
        $('li', $this.parent('li')).addClass('ou-nav-inactive');

        // Show and hide the correct rows
        $parentListItem.children('.ou-nav-sub-menu').hide();
    };
   
	// Add all the markup required to make the menu responsive   
    $( document ).ready( function() {
    	addResponsiveNavigation($('.ou-secondary-nav'));
    	activateExistingBreadcrumbs($('.ou-secondary-nav'));
    } );
      
    function addResponsiveNavigation($nav) {
    	
    	$($nav).before('<div class="ou-nav-mob-overlay"></div>');
    	$($nav).prepend('<a href="#" id="ou-nav-toggle" class="ou-nav-toggle"><i class="int-icon int-icon-bars int-icon-lg"></i> <i class="int-icon int-icon-times int-icon-lg"></i></a>');
    	$nav.each(function(index) {
    		$subnav = $('li:has(ul)', $nav);
    		$subnav.each(function(index){
    			$(this).children('a').after('<a href="#" class="int-nav-trigger" role="button"> <span> <i class="fa fa-chevron-down"></i> <i class="fa fa-chevron-right"></i> <i class="fa fa-chevron-up"></i> </span></a>');
    			$(this).children('ul').wrap('<div class="ou-nav-sub-menu"><div class="ou-container"></div></div>');
    			$(this).children('.ou-nav-sub-menu').children('.ou-container').prepend(attachBackParentButtonClickHandler(new BackToParentButton(this)));
    			/*$(this).wrap('<div class="int-nav-sub-menu"><div class="int-container"></div></div>');
    			console.log( index + ":" + $(this).html());	
    			addResponsiveNavigation($(this));*/
    			
    		});	
    	});
    }
    
    function activateExistingBreadcrumbs($nav) {

		$trail = $('.ou-nav-active', $nav);
		$trail.each(function (index) {
		    var $this = $(this);
		    $this.children('.int-nav-trigger').data('active', true);
		    $this.children('.ou-nav-sub-menu').show();
		    $this.siblings('li').addClass('ou-nav-inactive');
		    $this.siblings().children('a.int-nav-trigger').data('active', false);
		});

    }
   
	function activateSelectedBreadcrumbs() {
	
	}

    //TODO refactor
	function attachBackParentButtonClickHandler($backToParentButton) {
	    $backToParentButton.click(function () {
	        var $this = $(this);

	        $this.closest('.ou-nav-sub-menu').prev('.int-nav-trigger').trigger('click');
	    });

        return $backToParentButton
	}
    
})(jQuery, window, window.OU.DigitalFramework.Global = window.OU.DigitalFramework.Global || {});    //If using multiple jquery objects, pass in an alias instead of jQuery