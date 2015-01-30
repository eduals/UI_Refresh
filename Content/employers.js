window.Employers = window.Employers || {};

(function ($, em, document) {
    var $contactRegion = $('#contactRegion'),
        radioForm = document.getElementById('contactUsRadioForm'),
        $contactUsRadioFieldset = $('#contactUsRadioFieldset'),
        $document = $(document),
        throbber = window.OU.EEP.Throbber,
        fastTransition = 250,
        mediumTransition = 500,
        slowTransition = 1000,
        vm,
        changeCounter = 0;

    em.url = {
        contactForm: 'Views/_ContactForm.html',
        callBack: 'Views/_CallBackForm.html',
        webChat: {
            outOfHours: 'Views/_WebChatOutOfHours.html',
            busy: 'Views/_WebChatBusy.html'
        },
        callBDT: 'Views/_CallBDT.html'
    };
    em.ViewModel = function (obj) {
        this.viewModel = obj;
    };
    em.ViewModel.prototype = {
        bindViewModelToView: function () {
            var viewModelName,
                val,
                base = this,
                $this,
                inputType;

            $('[data-view-model]').each(function () {
                $this = $(this);
                viewModelName = $this.data('view-model');
                inputType = $this.prop('type');
                val = base.viewModel[viewModelName];

                if(inputType === 'text' || inputType === 'textarea' || inputType === 'select-one'){
                    $this.val(val);
                }
                if(inputType === 'radio'){
                    if($this.val() === val){
                        $this.prop('checked', true).trigger('change');
                    }
                }
            });

            return base;
        },
        setViewModel: function () {
            var base = this,
                $this,
                inputType;

            $('[data-view-model]').each(function () {
                $this = $(this);
                inputType = $this.prop('type');

                if(inputType === 'text' || inputType === 'textarea' || inputType === 'select-one'){
                    base.viewModel[$this.data('view-model')] = $this.val();
                }
                if(inputType === 'radio'){
                    if($this.prop('checked')){
                        base.viewModel[$this.data('view-model')] = $this.val();
                    }
                }
            });

            return base;
        }
    };

    var test = {
        blank:{
            country: '',
            firstName: '',
            lastName: '',
            organisation: '',
            jobRole: '',
            email: '',
            telephone: '',
            preferredMethodOfContact: '',
            enquiry: '',
            preferredCallBackTime: ''
        },
        filled:{
            country: 'NI|GB',
            firstName: 'Paul',
            lastName: 'Liu',
            organisation: 'OU',
            jobRole: 'Developer',
            email: 'paul.liu@open.ac.uk',
            telephone: '01234750690',
            preferredMethodOfContact: 'Email',
            enquiry: 'Hello, I was wandering about this and that',
            preferredCallBackTime: 'AM'
        }
    };

    vm = em.viewModel = new em.ViewModel(test.blank);



    //Global Ajax Throbber Calls
    $document.ajaxStart(function () {
        throbber.Start();
    }).ajaxStop(function () {
        throbber.Stop();
    }).ajaxError(function () {
        throbber.Stop();
    });

    $contactUsRadioFieldset.on('change', '[name="contactUsRadio"]', function () {
        var radioValue = parseInt($(this).val());
        changeCounter += 1;

        vm.setViewModel();
        emptyContactRegion();

        if (radioValue === 1) {
            $.ajax({
                url: em.url.contactForm,
                success: function (result) {
                    $contactRegion.html(result);
                    displayRegion($('.contactSection'), slowTransition);
                    vm.bindViewModelToView();
                }
            });
        }
        if (radioValue === 2) {
            $.ajax({
                url: em.url.callBack,
                success: function (result) {
                    $contactRegion.html(result);
                    displayRegion($('.contactSection'), slowTransition);
                    vm.bindViewModelToView();
                }
            });
        }
        if (radioValue === 3) {
            $.ajax({
                url: em.url.webChat.busy,
                success: function (result) {
                    $contactRegion.html(result);
                    displayRegion($('.contactSection'), fastTransition);
                }
            });
        }
        if (radioValue === 4) {
            $.ajax({
                url: em.url.callBDT,
                success: function (result) {
                    $contactRegion.html(result);
                    displayRegion($('.contactSection'), mediumTransition);
                }
            });
        }
    });

    $contactRegion.on('click', '.submit', function () {
        var $this = $(this),
            formId = $this.data('form').toString();

        if (formId === "contactForm" || formId === "callBackForm") {
            //$('#' + formId).submit();
            emptyContactRegion();
            $.ajax({
                url: 'Views/_FormSubmitFeedback.html',
                success: function (result) {
                    $contactRegion.html(result);
                    displayRegion($('.contactSection'), fastTransition);
                }
            });
        }
    });

/*    $contactRegion.on('click', '.dismissAlert', function () {
        radioForm.reset();
    });*/

    $contactRegion.on('change', '[name="preferredMethodOfContact"]', function () {
        $('#' + $(this).attr('aria-controls')).slideDown(500);
        $('#' + $(this).data('hide')).hide(0);
    });

    function emptyContactRegion() {
        $contactRegion.empty();
    }

    function displayRegion($el, speed) {
        $el.slideDown(speed);
    }

})(jQuery, window.Employers, document);
