jQuery.dataformValidate (v0.2)
=======================

Validate a form based on the html5 data attribute `data-validate=""`.

<i><b>Note</b>: It will validate hidden fields, but <b>dataformValidate().valid</b> will return true if all visible elements are valid

<h3>JavaScript</h3>

Very simple to execute:

    $.('.myform').dataformValidate([options])
    
Simple use in an <b>if statement</b>:

    if (true === $.('.myform').dataformValidate(options).valid){
        // do stuff here.
    }
    
Options are optional, and set automatically when given to the validator

    var options = {
        debug: false, // debug mode
        hightlightField: true, // do you want to highlight error input fields (ie. add the errorClass)
        errorClass: 'dataform-validate-error', // provide the class used for styling error input fields
        dateFormat: 'mdy', // provide in what format the date should be validated on.
        ignorePlaceholders: true, // whether or not placeholders should be removed before validating
        placeholderElement: 'placeholder' // this will be prepended with 'data-'. In this case data-placeholder="my default value"
    };
    
<b>dateFormat</b> should only contain "m", "d" and/or "y" for validation. They represent month/day/year.    
<h3>HTML</h3>

The HTML required data-validate="" attributes. The "parent" dom element should be given to the validator.

    <div class="myform">
        Required: <input type="text" data-validate="required" /> (synonym: mandatory)
        Phonenumber: <input type="text" data-validate="phonenumber" /> (synonym: phone)
        E-mail address: <input type="text" data-validate="email" />
        Minimum 4 character: <input type="text" data-validate="minlength=4" />
        Maximum 10 character: <input type="text" data-validate="maxlength=10" />
        Numeric: <input type="text" data-validate="numeric" />
        Date: <input type="text" data-validate="date" />
    </div>
    
Validating mandatory checkbox/radiobutton. Valid if any has been selected

    <div data-validate="required">
        <input type="radio" name="my_radio" />
        <input type="radio" name="my_radio" />
    </div>

    <div data-validate="required">
        <input type="checkbox" name="my_checkbox[]" />
        <input type="checkbox" name="my_checkbox[]" />
    </div>


Of course, any combination is valid. The seperator to be used is a whitespace. 

This would also be possible:

    Required: <input type="text" data-validate="required minlength=4 maxlength=12 numeric" />
    
<h3>CSS</h3>

The only CSS required, is to highlight the fields. This is a simple, but effective example:

    .dataform-validate-error {
        background-color: #FAD7D7 !important;
          color: #858585 !important;
    	font-weight: bold !important;
    }
