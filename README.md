jQuery.dataformValidate
=======================

Validate a form based on data-validate html5 attributes.

Very simple to execute:

    $.('.myform').dataformValidate([options])
    
The HTML required data-validate="" attributes. The "parent" dom element should be given to the validator.

    <div class="myform">
        Required: <input type="text" data-validate="required" />
        Phonenumber: <input type="text" data-validate="phonenumber" />
        E-mail address: <input type="text" data-validate="email" />
        Minimum 4 character: <input type="text" data-validate="minlength=4" />
        Maximum 10 character: <input type="text" data-validate="maxlength=10" />
        Numeric: <input type="text" data-validate="numeric" />
        Date: <input type="text" data-validate="date" />
    </div>
    
Options are optional, and set automatically when given to the validator

    var options = {
        debug: false, // debug mode
        hightlightField: true, // do you want to highlight error input fields (ie. add the errorClass)
        errorClass: 'dataform-validate-error', // provide the class used for styling error input fields
        dateFormat: 'mdy' // provide in what format the date should be validated on.
    };
    
<b>dateFormat</b> should only contain "m", "d" and/or "y" for validation. They represent month/day/year.