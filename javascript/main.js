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

  var buttons = $('button.form__button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e) {
      e.preventDefault();
      var article = $(this).closest('article');

      if (article.next()[0] !== undefined) {
        article.next().show();
        article.hide();
      } else {
        article.hide();
        $('article').eq(0).show();
      }
    });
  }

  var editButton = $('button.form__edit');
  for (var i = 0; i < buttons.length; i++) {
    editButton[i].addEventListener('click', function(e) {
      e.preventDefault();
      var field = $(this).closest('.form__field');
      field.find('input').show();
      field.find('span').hide();
      field.find('.form__edit').hide();
    });
  }


})();
