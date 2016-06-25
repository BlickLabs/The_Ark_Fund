$(document).ready(function () {
  var previousScroll = 0,
    initialTitleTop = $('.section-title').offset().top ? $('.section-title').offset().top : null;
  $(window).scroll(function (e) {
    if ($('#navbar-trigger').is(':checked')) {
      e.preventDefault();
    } else {
      if ($(window).scrollTop() > 70) {
        $('#mavericks-logo').addClass('hide-text')
      } else {
        $('#mavericks-logo').removeClass('hide-text')
      }
    }

    // Wave effect
    var footerHeight = $('footer').outerHeight(),
      windowHeight = window.innerHeight,
      scroll = $(window).scrollTop(),
      footerTop = $('footer').offset().top;
    if ((parseInt(footerTop - scroll) - windowHeight - footerHeight <= footerHeight) && !$('#form-section').hasClass('animate-wave')) {
      $('#form-section').addClass('animate-wave');
    }

    // Sections' titles effect
    var coverHeight = null,
      coverTop = null,
      titleTop = null,
      titleHeight = null,
      navbarHeight = null;

    if ($('.section-title').length > 0) {
      // console.log($('.section-title')[0]);
      coverHeight = $('.sections-cover-container .cover').outerHeight();
      coverTop = $('.sections-cover-container .cover').offset().top;
      titleTop = $('.section-title').offset().top;
      titleHeight = $('.section-title').outerHeight();
      navbarHeight = $('#mavericks-navbar').outerHeight();

      if (scroll > previousScroll && scroll > 110) {
        if (!$('.section-title').hasClass('fixed')
           && !$('.section-title').hasClass('bottom')) {
          $('.section-title').addClass('fixed');
        }
        else if (scroll >= coverTop + coverHeight - navbarHeight - titleHeight/2
          && !$('.section-title').hasClass('bottom')) {
          $('.section-title').removeClass('fixed');
          $('.section-title').addClass('bottom');
        }
      }
      else if (scroll < previousScroll &&
          scroll <= coverTop + coverHeight - navbarHeight - titleHeight/2
          && scroll > 110) {
        if ($('.section-title').hasClass('bottom')) {
          $('.section-title').removeClass('bottom');
          $('.section-title').addClass('fixed');
        }
      }
      else if (scroll < previousScroll && scroll < 110) {
        $('.section-title').removeClass('fixed');
      }
    }

    // Set previous scroll
    previousScroll = scroll;
  });
});