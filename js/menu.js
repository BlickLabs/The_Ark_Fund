(function () {
  function detectTouch(e) {
    if (!$(e.target).is('nav .menu-trigger') && !$(e.target).closest('nav .menu-trigger').length && !$(e.target).is('nav .navbar-list-container') && !$(e.target).closest('nav .navbar-list-container').length && $('nav .navbar-list-container').hasClass('active')) {
      e.preventDefault();
      $('nav .navbar-list-container').removeClass('active');
      $('body').removeClass('noscroll');
    }
  }

  function detectClick() {
    if ($('nav .navbar-list-container').hasClass('active')) {
      $('nav .navbar-list-container').removeClass('active');
      $('body').removeClass('noscroll');
    } else {
      $('nav .navbar-list-container').addClass('active');
      $('body').addClass('noscroll');
    }
  }

  $('body')[0].addEventListener('touchstart', detectTouch, false);
  $('body')[0].addEventListener('click', detectTouch, false);
  $('nav .menu-trigger').click(detectClick);
})();