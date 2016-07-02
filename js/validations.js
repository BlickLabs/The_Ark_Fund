$(document).ready(function () {
  var selector = '';
  if ($('#form-container').length) {
    selector = '#contact-modal form, #form-container form';
  } else {
    selector = '#contact-modal form';
  }
  $(selector).each(function () {
    $(this).validate({
      rules: {
        'contact-name': { required: true, minlength: 2 },
        'contact-email': { required: true, email: true },
        'contact-type': { required: true },
        'contact-message': { required: true }
      },
      submitHandler: function(form) {
        $.ajax({
          type: 'POST',
          url: '',
          data: $(form).serialize(),
          success: function(data){
            $(form)
              .append('<div class="response ok">Your message was sent</div>');
          },
          error: function (data) {
            $(form)
              .append('<div class="response error">An error occured: <br/>' + data.statusText + '</div>');
          },
          complete: function () {
            $(form)[0].reset();
            setTimeout(function () {
              $(form).children('.response').remove();
            }, 5000);
          }
        });
      }
    });
  });
});