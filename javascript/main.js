(function() {

  var inputs = $('#article-6 .form__field');
  Array.from(inputs, function(e) {
    var p = document.createElement("span");


    var input = e.querySelector('.form__input');
    var span, spanText;
    if (input.name === 'password') {
      spanText = document.createTextNode("\u2E31\u2E31\u2E31\u2E31\u2E31\u2E31\u2E31\u2E31");
      span = document.createElement('span');
      span.className = "form__dot";
    } else {
      spanText = document.createTextNode(input.value);
      span = document.createElement('span');
    }
    span.appendChild(spanText);
    input.parentNode.insertBefore(span, input.nextSibling);
  });






  var editButtons = $('button.form__edit');
  for (var i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', function(e) {
      e.preventDefault();
      var field = $(this).closest('.form__field');
      field.find('input').show();
      field.find('span').hide();
      field.find('.form__edit').hide();
    });
  }


  function removeClass(el, className) {
    if (el.classList)
      el.classList.remove(className);
    else if (hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    }
  }

  var inputObject = {
    element: undefined,
    checkSign: undefined,
    errorMessage: undefined,

    initialize: function(input, checkSign, errorMessage) {
      this.element = input;
      this.checkSign = input.parentElement.querySelector(checkSign);
      this.errorMessage = input.parentElement.querySelector(errorMessage);

      return this;
    },
    listen: function() {

      this.element.addEventListener('change', function() {

        if (this.validate()) {
          if (!!this.checkSign) this.checkSign.style.display = 'block';
          removeClass(this.element, '--error');
          if (!!this.errorMessage) this.errorMessage.style.display = 'none';
        } else {
          if (!!this.checkSign) this.checkSign.style.display = 'none';
          this.element.className = this.element.className + ' --error';
          if (!!this.errorMessage) this.errorMessage.style.display = 'block';
        }

      }.bind(this));

      return this;
    },
    validate: function() {
      var value = this.element.value.trim();
      var required = this.element.required;

      if (!!this.element.getAttribute("pattern"))
        var pattern = new RegExp(this.element.getAttribute("pattern"));


      if (!!pattern && !pattern.test(value))
        return false;

      if (required && value.length < 1) {
        return false;
      }

      return true;
    }
  };

  var inputsObject = {
    inputs: undefined,
    checkSign: undefined,
    errorMessage: undefined,
    initialize: function(element, checkSign, errorMessage) {
      this.inputs = element.querySelectorAll('input');
      this.checkSign = checkSign;
      this.errorMessage = errorMessage;
      return this;
    },
    listen: function() {
      var inputs = this.inputs;
      for (var i = 0; i < inputs.length; i++) {
        Object.create(inputObject).initialize(inputs[i], this.checkSign, this.errorMessage).listen();
      }
      return this.inputs;
    }
  };

  var formObject = {
    forms: undefined,
    checkSign: undefined,
    errorMessage: undefined,
    inputs: [],
    initialize: function(selector, checkSign, errorMessage) {
      this.forms = document.querySelectorAll(selector);
      this.checkSign = checkSign;
      this.errorMessage = errorMessage;
      return this;
    },
    listen: function() {
      var forms = this.forms;
      var length = forms.length;
      for (var i = 0; i < length; i++) {
        this.inputs.push(Object.create(inputsObject).initialize(forms[i], this.checkSign, this.errorMessage).listen());
      }

      for (var i = 0; i < length; i++) {
        (function(i, context, checkSign, errorMessage) {

          var param = {
            inputs: context[i],
            checkSign: checkSign,
            errorMessage: errorMessage,
            article: $(forms[i]).closest('article')
          };

          var refresh = forms[i].querySelector('button.form__refresh');

          if (refresh)
            refresh.addEventListener('click', function() {
              $(checkSign).hide();
              $(errorMessage).hide();
            });

          forms[i].addEventListener('submit', function(e) {
            e.preventDefault();
            var inputs = this.inputs;
            var checkSign = this.checkSign;
            var errorMessage = this.errorMessage;
            var article = this.article;

            for (var i = 0; i < this.inputs.length; i++) {
              response = Object.create(inputObject).initialize(inputs[i], checkSign, errorMessage).validate();

              if (response === false)
                return false;
            }

            article.hide();
            if (article.next()[0] !== undefined) {
              article.next().show();
            } else {
              $('article').eq(0).show();
            }




          }.bind(param));
        })(i, this.inputs, this.checkSign, this.errorMessage);
      }

    }
  };

  var form = Object.create(formObject).initialize('.form', '.form__check', '.form__input-error').listen();

})();
