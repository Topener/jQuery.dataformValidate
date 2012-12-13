/* 
 * Validator based on data-attributes. Give it the parent dom element.
 * 
 * @author Rene Pot <rene@topener.nl>
 * @link http://topener.github.com/jQuery.dataformValidate/
 * @version 0.2.0
 */


(function($) {
    
    var _helpers = [];
    
    var _options = {
        debug: false, // debug mode
        hightlightField: true, // do you want to highlight error input fields (ie. add the errorClass)
        errorClass: 'dataform-validate-error', // provide the class used for styling error input fields
        dateFormat: 'mdy', // provide in what format the date should be validated on.
        ignorePlaceholders: true, // whether or not placeholders should be removed before validating
        placeholderElement: 'placeholder' // this will be prepended with 'data-'
    };
    
    $.fn.dataformValidate = function(options){
        
        _setOptions(options || []);
        var self = this;
        self.valid = false;
        
        return this.each(function(){
            
            var $this = $(this);
            _validate($this);
            self.valid = $this.find('.' + _options.errorClass + ':visible').length > 0 ? false : true;
            
        });
        
    };
    
    /*
     * This will set all options (automated)
     */
    var _setOptions = function (options){
        $.each(options,function(key, val){
            _options[key] = val;
        });
    };
    
    /*
     * find all the data-validate="" elements in the given dom element, and validate it based on the given rules
     */
    var _validate = function(dom) {
        
        dom.find('[data-validate]').each(function(key ,elem){
            
            var validField = true;
            var val = $(elem).val();
            var isRequired = false;
            
            var requirements = $(elem).data('validate').split(' ');
            
            if (true === _options.ignorePlaceholders && $(elem).data(_options.placeholderElement) && val == $(elem).data(_options.placeholderElement))
                val = '';
            
            for (var i = 0, l = requirements.length; i < l; ++i){
                
                var requirement = requirements[i].split('=');
                
                
                switch (requirement[0]){
                    case 'required':
                        validField = true === validField ? _helpers.required(val) : false;
                        isRequired = true;
                        break;
                    case 'minlength':
                        if (requirement.length == 2)
                        validField = true === validField ? _helpers.minLength(val, requirement[1]): false;
                        break;
                    case 'maxlength':
                        if (requirement.length == 2)
                        validField = true === validField ? _helpers.maxLength(val, requirement[1]): false;
                        break;
                    case 'email':
                        validField = true === validField ? _helpers.email(val) : false;
                        break;
                    case 'numeric':
                        validField = true === validField ? _helpers.numeric(val) : false;
                        break;
                    case 'date':
                        validField = true === validField ? _helpers.date(val) : false;
                        break;
                    case 'phonenumber':
                    case 'phone': 
                        validField = true === validField ? _helpers.phoneNumber(val) : false;
                        break;
                };
               
            };
            
            if (isRequired === false && validField === false && val.length == 0)
                validField = true;
            
            if (false === validField && true === _options.hightlightField) 
                $(elem).addClass(_options.errorClass);
            else
                $(elem).removeClass(_options.errorClass);
            
        });
        
    };
    
    /**
     * Check if there is at least a value
     */
    _helpers.required = function(value){
        var test = value.length > 0 ? true : false;
        _logDisplay('validate required', test);
        return test;
    };
    
    /*
     * Check if the given value is at least the minimum length given
     */
    _helpers.minLength = function(value, minlength){
        var test = value.length >= minlength ? true : false;
        _logDisplay('validate minlength', test);
        return test;
    };
    
    _helpers.maxLength = function(value, maxlength){
        var test = value.length >= length ? true : false;
        _logDisplay('validate maxlenght', test);
        return test;
    };
    
    /*
     * Basic e-mail validation to test on this: [anystring]@[anystring].[anystring]
     */
    _helpers.email = function(email){
        var test = /\S+@\S+\.\S+/.test( email );
        _logDisplay('validate email', test);
        return test;
    };
    
    /*
     * Check if the value is a number
     */
    _helpers.numeric = function(number){
        var test = !isNaN(parseFloat(number)) && isFinite(number);
        _logDisplay('validate numeric', test);
        return test;
    }
    /*
     * validate the phone number
     */
    _helpers.phoneNumber = function(number){
         return /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d+)(( x| ext)\d{1,5}){0,1}$/.test(number);
    }
    
    /*
     * Validate the date based on the _options.dateFormat
     */
    _helpers.date = function(date){

        var dateFormat = _options.dateFormat;
        
        dateFormat = dateFormat.split('').join("[./-]")
                            .replace('d',"(0?[1-9]|[1|2][0-9]|[3][0|1])")
                            .replace('m',"(0?[1-9]|1[012])")
                            .replace('y',"([0-9]{4}|[0-9]{2})");
                        
        var validateRegex = new RegExp('^'+dateFormat+'$');
        
        var test = validateRegex.test(date);
        _logDisplay('validate date ' + _options.dateFormat,test,dateFormat);
        return test;
        
    }
    
    var _logDisplay = function(){
        if (_options.debug) console.log(arguments);
    }

})(jQuery);