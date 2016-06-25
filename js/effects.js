$(document).ready(function () {
  var previousScroll = 0,
    initialTitleTop = $('.section-title').length ? $('.section-title').offset().top : null;
  $(window).scroll(function (e) {
    if ($(window).scrollTop() > 70) {
      $('#mavericks-logo').addClass('hide-text')
    } else {
      $('#mavericks-logo').removeClass('hide-text')
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

    if ($('.sections-cover-container .section-title').length > 0) {
      coverHeight = $('.sections-cover-container .cover').outerHeight();
      coverTop = $('.sections-cover-container .cover').offset().top;
      titleTop = $('.section-title').offset().top;
      titleHeight = $('.section-title').outerHeight();
      navbarHeight = $('#mavericks-navbar').outerHeight();

      //Move title
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

      // Change image color
      if (scroll > previousScroll &&
         scroll > coverTop + coverHeight/2 - 2*navbarHeight &&
         !$('.sections-cover-container .cover').hasClass('color')) {
        $('.sections-cover-container .cover').addClass('color');
      }
      else if (scroll < previousScroll &&
         scroll < coverTop + coverHeight/2 - 2*navbarHeight &&
         $('.sections-cover-container .cover').hasClass('color')) {
        $('.sections-cover-container .cover').removeClass('color');
      }

    }

    // Set previous scroll
    previousScroll = scroll;
  });
});