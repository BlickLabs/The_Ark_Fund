$(document).ready(function () {
  var previousScroll = 0,
    initialTitleTop = $('.section-title').length ? $('.section-title').offset().top : null,
    scroll = $(window).scrollTop(),
    windowHeight = $(window).outerHeight(),
    animateNavbar = null,
    animateWave = null,
    animateTitle = null,
    animateAdvisors = null,
    changePlaceholders = null;

  animateNavbar = function () {
    if (scroll > 50) {
      $('#mavericks-logo').addClass('hide-text')
    } else {
      $('#mavericks-logo').removeClass('hide-text')
    }
  };

  animateWave = function () {
    var footerHeight = $('footer').outerHeight(),
      footerTop = $('footer').offset().top,
      contactFormBeforeHeight = parseInt(window.getComputedStyle(
        document.querySelector('#form-section'), ':before'
      ).getPropertyValue('height')),
      trigger = scroll + windowHeight - contactFormBeforeHeight/2;
    if (trigger >= footerTop - contactFormBeforeHeight) {
      $('#form-section').addClass('animate-wave');
    } else {
      $('#form-section').removeClass('animate-wave');
    }
  };

  animateTitle = function (pristineScroll) {
    var coverHeight = null,
    coverTop = null,
    titleTop = null,
    titleHeight = null,
    navbarHeight = null,
    scrollIs = null,
    moveTitle = null,
    adjustTitleBottom = null,
    adjustTitleTop = null,
    scrollBottomLimit = null,
    scrollTopLimit = null;

    coverHeight = $('.sections-cover-container .cover').outerHeight();
    coverTop = $('.sections-cover-container .cover').offset().top;
    titleTop = parseFloat($('.section-title').css('top'));
    titleHeight = $('.section-title').outerHeight();
    navbarHeight = $('#mavericks-navbar').outerHeight();
    scrollTopLimit = initialTitleTop - navbarHeight;
    scrollBottomLimit = coverHeight + coverTop - titleHeight - navbarHeight;

    scrollIs = function (direction) {
      var scrollDir = scroll > previousScroll ? 'down' : 'top';
      return scrollDir == direction;
    };

    moveTitle = function (direction) {
      $('.section-title').css('top', 
        parseInt($('.section-title').css('top')) + 1.5*(scroll - previousScroll)
      );
    };
    adjustTitleBottom = function () {
      $('.section-title').css('top', 
        $('.sections-cover-container').outerHeight()
        - 0.3*titleHeight
      );
    };
    adjustTitleTop = function () {
      $('.section-title').css('top', 0);
    };

    if (pristineScroll) {
      if (scroll >= scrollTopLimit) {
        moveTitle();
        if (parseFloat($('.section-title').css('top')) > $('.sections-cover-container').outerHeight()
        - 0.3*titleHeight || scroll >= scrollBottomLimit) {
          adjustTitleBottom();
        }
      }
      if (scroll > coverTop + coverHeight/2 - 2*navbarHeight &&
        !$('.sections-cover-container').hasClass('colour')) {
        $('.sections-cover-container').addClass('colour');
      }
      else if (scroll < coverTop + coverHeight/2 - 2*navbarHeight &&
         $('.sections-cover-container').hasClass('colour')) {
        $('.sections-cover-container').removeClass('colour');
      }
    } else {
      if (scrollIs('down')) {
        if (scroll > scrollTopLimit) {
          if (titleTop < $('.sections-cover-container').outerHeight()
        - 0.3*titleHeight) {
            moveTitle();
          } else if (titleTop > $('.sections-cover-container').outerHeight()
        - 0.3*titleHeight) {
            adjustTitleBottom();
          }
        }
        if (scroll > coverTop + coverHeight/2 - 2*navbarHeight &&
          !$('.sections-cover-container').hasClass('colour')) {
          $('.sections-cover-container').addClass('colour');
        }
      } else {
        if (scroll < scrollBottomLimit) {
          if (titleTop > 0) {
            moveTitle();
          } else if (titleTop < 0) {
            adjustTitleTop();
          }
        }
        if (scroll < coverTop + coverHeight/2 - 2*navbarHeight &&
           $('.sections-cover-container').hasClass('colour')) {
          $('.sections-cover-container').removeClass('colour');
        }
      }
    }
  };

  animateAdvisors = function() {
    var advisors = $('.advisor-item').toArray();
    advisors.forEach(function (elem, index) {
      var _elem = $(elem),
        top = _elem.offset().top,
        height = _elem.height(),
        trigger = scroll + windowHeight - height/2;
      if (trigger >= top) {
       _elem.addClass('show');
      } else {
       _elem.removeClass('show');
      }
    });
  };

  changePlaceholders = function (e) {
    var text = '';
    if ($(this).val() == 'startup') {
      text = '1. Tell us your story (personal pitch in 3 sentences).\n\n' +
      '2. Elevator pitch (problem solution and value proposition; 3 sentences).\n\n' +
      '3. Share with us your deck (Google Drive, Dropbox, Docksend).';
    } else {
      text = 'Share your interests to be part of an angel community.';
    }
    $(this).siblings('textarea').attr('placeholder', text);
  };

  // Animations
  animateNavbar();
  if ($('#form-section').length) {
    animateWave();
  }
  if ($('.sections-cover-container .section-title').length) {
    animateTitle(true);
    previousScroll = scroll;
  }
  if ($('.advisor-item').length) {
    animateAdvisors();
  }

  $('form textarea').attr('placeholder', '1. Tell us your story (personal pitch in 3 sentences).\n\n' +
      '2. Elevator pitch (problem solution and value proposition; 3 sentences).\n\n' +
      '3. Share with us your deck (Google Drive, Dropbox, Docksend).');

  $('#form-container form select').change(changePlaceholders);

  $('#contact-modal form select').change(changePlaceholders);

  if ($('.homepage-diagram').length) {
    $('html').click(function (e) {
      if (!$($(e.target).parent()).hasClass('homepage-diagram-text')) {
        $('.homepage-diagram-button')
          .removeClass('fa-minus')
          .addClass('fa-plus')
          .siblings('.homepage-diagram-tooltip')
          .removeClass('visible');
      } else {
        $(e.target)
          .parent().parent().siblings()
          .children('.homepage-diagram-text').children('.homepage-diagram-tooltip')
          .removeClass('visible');
        $(e.target)
          .parent().parent().siblings()
          .children('.homepage-diagram-text').children('.homepage-diagram-button')
          .removeClass('fa-minus').addClass('fa-plus');
      }
    });
    $('.homepage-diagram-button').click(function (e) {
      if ($(this).hasClass('fa-plus')) {
        $(this)
          .siblings('.homepage-diagram-tooltip').addClass('visible');
        $(this)
          .removeClass('fa-plus')
          .addClass('fa-minus');
      } else {
        $(this)
          .siblings('.homepage-diagram-tooltip').removeClass('visible');
        $(this)
          .removeClass('fa-minus')
          .addClass('fa-plus');
      }
    });
  }

  $(window).scroll(function (e) {
    scroll = $(window).scrollTop();

    animateNavbar();
    if ($('#form-section').length) {
      animateWave();
    }
    if ($('.sections-cover-container .section-title').length) {
      animateTitle(false);
    }
    if ($('.advisor-item').length) {
      animateAdvisors();
    }

    previousScroll = scroll;
  });
});