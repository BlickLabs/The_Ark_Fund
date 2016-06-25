$(document).ready(function () {
  $(window).scroll(function (e) {
    if ($('#navbar-trigger').is(':checked')) {
      e.preventDefault();
    } else {
      if ($(window).scrollTop() > 100) {
        $('#mavericks-logo').addClass('hide-text')
      } else {
        $('#mavericks-logo').removeClass('hide-text')
      }
    }
    var footerHeight = $('footer').outerHeight(),
      windowHeight = window.innerHeight,
      scroll = $(window).scrollTop(),
      footerTop = $('footer').offset().top;
    if ((parseInt(footerTop - scroll) - windowHeight - footerHeight <= footerHeight) && !$('#form-section').hasClass('animate-wave')) {
      $('#form-section').addClass('animate-wave');
    }
  });
});