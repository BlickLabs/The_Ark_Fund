(function () {
  function detectTouch(e) {
    if (!$(e.target).is('nav .menu-trigger') && !$(e.target).is('nav .menu-container') && !$(e.target).closest('nav .menu-container').length && $('nav .menu-container').hasClass('active')) {
      e.preventDefault();
      $('nav .menu-container').removeClass('active');
      $('body').removeClass('noscroll');
    }
  }

  function detectClick() {
    if ($('nav .menu-container').hasClass('active')) {
      $('nav .menu-container').removeClass('active');
      $('body').removeClass('noscroll');
    } else {
      $('nav .menu-container').addClass('active');
      $('body').addClass('noscroll');
    }
  }

  $('body')[0].addEventListener('touchstart', detectTouch, false);
  $('body')[0].addEventListener('click', detectTouch, false);
  $('nav .menu-trigger').click(detectClick);
})();