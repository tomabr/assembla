(function() {
  'use strict';

  var fieldsetObject = {
    fieldset: undefined,
    buttonNext: undefined,
    checkSign: undefined,
    errorMessage: undefined,
    last: undefined,
    inputs: [],

    initialize: function(fieldset, buttonNext, checkSign, errorMessage, last) {
      this.fieldset = fieldset;
      this.buttonNext = this.fieldset.querySelector(buttonNext);
      this.inputs = this.fieldset.querySelectorAll('input');
      this.checkSign = checkSign;
      this.errorMessage = errorMessage;
      this.last = last;

      return this;
    },

    listen: function() {
      (function(context) {
        if (context.buttonNext)
          context.buttonNext.addEventListener('click', function(e) {

            var inputs = this.inputs;
            for (var i = 0; i < inputs.length; i++) {

              var checkSign = inputs[i].parentElement.querySelector(this.checkSign);
              var errorMessage = inputs[i].parentElement.querySelector(this.errorMessage);

              if ($(inputs[i]).is(":invalid")) {
                if (checkSign)
                  checkSign.style.display = "none";

                if (errorMessage)
                  errorMessage.style.display = "block";

                return false;
              } else {
                if (checkSign)
                  checkSign.style.display = "block";

                if (errorMessage)
                  errorMessage.style.display = "none";
                localStorage.setItem(inputs[i].name, inputs[i].value.trim());
              }
            }



            if (this.last) {
              var length = localStorage.length;

              for (var j = 0; j < length; j++) {
                var name = localStorage.key(j);
                var value = localStorage.getItem(localStorage.key(j));


                var part = '[name=' + name + ']';
                var input = this.last.querySelector(part);
                input.value = value;
                var edit = input.parentElement.querySelector('button');


                edit.addEventListener('click', function(ev) {
                  ev.preventDefault();
                  var input=this.parentElement.querySelector('input');
                  $(input).prop('disabled', false);
                  return false;
                });

                input.addEventListener('blur', function(ev){
                  ev.preventDefault();
                  $(this).prop('disabled', true);
                  return false;
                });
              }

            }

            context.fieldset.style.display = 'none';
            context.fieldset.nextElementSibling.style.display = 'flex';



          }.bind(context));


      })(this);


    }
  };


  var formObject = {
    form: undefined,
    checkSign: undefined,
    errorMessage: undefined,
    buttonNext: undefined,
    fieldsets: [],

    initialize: function(obj) {
      this.form = document.querySelector(obj.form);
      this.checkSign = obj.checkSign;
      this.errorMessage = obj.errorMessage;
      this.buttonNext = obj.buttonNext;
      this.fieldsets = this.form.querySelectorAll('fieldset');
      return this;
    },

    listen: function() {

      var fieldsets = [];
      var length = this.fieldsets.length;
      var last = this.fieldsets[length - 1];
      for (var i = 0; i < length; i++) {
        if (i === length - 2)
          fieldsets.push(Object.create(fieldsetObject).initialize(this.fieldsets[i], this.buttonNext, this.checkSign, this.errorMessage, last).listen());
        else
          fieldsets.push(Object.create(fieldsetObject).initialize(this.fieldsets[i], this.buttonNext, this.checkSign, this.errorMessage).listen());
      }



      this.form.addEventListener('submit', function(e) {
        e.preventDefault();

        return false;
      });

    }
  };

  var form = Object.create(formObject).initialize({
    form: '.form',
    checkSign: '.form_check',
    errorMessage: '.form_input-error',
    buttonNext: '.form__button',
  }).listen();


var password = document.getElementById('password');
var meter = document.getElementById('meter');


password.addEventListener('input', function()
{
    var val = password.value.length;
    if(val>12)
    meter.value = 4;
    else if(val>10)
    meter.value = 3;
   else if(val >8)
    meter.value = 2;
  else if(val>6)
    meter.value =1;
  else
    meter.value =0;
});

var inputs = document.querySelectorAll('input');
for(var i=0; i< inputs.length; i++) {
  inputs[i].addEventListener('change', function(){
    if($(this).hasClass('form__input--pristine')){
      $(this).removeClass('form__input--pristine');
    }
  });
}



})();
