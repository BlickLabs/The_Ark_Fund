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
      navbarHeight = null,
      scrollIs = null,
      adjustTitleBottom = null,
      adjustTitleTop = null,
      dirtyPreviousScroll = null,
      moveTitle = null,
      scrollTopLimit = null,
      scrollBottomLimit = null;

    if ($('.sections-cover-container .section-title').length > 0) {
      coverHeight = $('.sections-cover-container .cover').outerHeight();
      coverTop = $('.sections-cover-container .cover').offset().top;
      titleTop = parseFloat($('.section-title').css('top'));
      titleHeight = $('.section-title').outerHeight();
      navbarHeight = $('#mavericks-navbar').outerHeight();

      //Move title code
      scrollTopLimit = initialTitleTop - navbarHeight;
      scrollBottomLimit = coverHeight + coverTop - titleHeight - navbarHeight;
      scrollIs = function (direction) {
        var scrollDir = scroll > previousScroll ? 'down' : 'top';
        return scrollDir == direction;
      };
      dirtyPreviousScroll = function () {
        return previousScroll != 0;
      };
      moveTitle = function (direction) {
        $('.section-title').css('top', 
          parseInt($('.section-title').css('top')) + 1.5*(scroll - previousScroll)
        );
      };
      adjustTitleBottom = function () {
        $('.section-title').css('top', 
          $('.sections-cover-container').outerHeight()
          - titleHeight/2
        );
      };
      adjustTitleTop = function () {
        $('.section-title').css('top', 0);
      };
      if (dirtyPreviousScroll()) {
        if (scrollIs('down')) {
          if (scroll > scrollTopLimit) {
            if (titleTop < $('.sections-cover-container').outerHeight()
          - titleHeight/2) {
              moveTitle();
            } else if (titleTop > $('.sections-cover-container').outerHeight()
          - titleHeight/2) {
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
      } else {
        if (scroll >= scrollTopLimit) {
          moveTitle();
          if (parseFloat($('.section-title').css('top')) > $('.sections-cover-container').outerHeight()
          - titleHeight/2 || scroll >= scrollBottomLimit) {
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
      }
    }

    // Set previous scroll
    previousScroll = scroll;
  });
});