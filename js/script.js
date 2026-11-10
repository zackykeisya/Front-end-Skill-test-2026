$(function () {
  window.dataLayer = window.dataLayer || [];

  $('[data-track]').on('click', function () {
    var $link = $(this);
    window.dataLayer.push({
      event: $link.attr('data-track'),
      link_text: $link.attr('data-track-label') || $.trim($link.text()),
      link_url: $link.attr('href')
    });
  });

  $('a[href^="#"]').on('click', function (e) {
    var id = $(this).attr('href');
    var $target = id.length > 1 ? $(id) : $();
    if (!$target.length) { return; }
    e.preventDefault();
    $('html, body').animate({ scrollTop: $target.offset().top }, 400);
    $('#mainNav').removeClass('open');
    $('#menuToggle').attr('aria-expanded', 'false');
  });

  $('#menuToggle').on('click', function () {
    var open = $('#mainNav').toggleClass('open').hasClass('open');
    $(this).attr('aria-expanded', open ? 'true' : 'false').text(open ? 'Close' : 'Menu');
  });

  $('.tab-btn').on('click', function () {
    var name = $(this).attr('data-tab');
    $('.tab-btn').removeClass('active');
    $('.tab-panel').removeClass('active');
    $(this).addClass('active');
    $('#tab-' + name).addClass('active');
  });

  var current = 0;
  var $track = $('#sliderTrack');
  var total = $track.children().length;

  function visibleSlides() {
    return $(window).width() <= 767 ? 1 : 2;
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    var offset = Math.min(current, total - visibleSlides());
    var pct = -(offset * 100 / visibleSlides());
    $track.css({ '-webkit-transform': 'translateX(' + pct + '%)', '-ms-transform': 'translateX(' + pct + '%)', 'transform': 'translateX(' + pct + '%)' });
    $('.dot').removeClass('active').eq(current).addClass('active');
  }

  $('#nextSlide').on('click', function () { goTo(current + 1 >= total ? 0 : current + 1); });
  $('#prevSlide').on('click', function () { goTo(current - 1 < 0 ? total - 1 : current - 1); });
  $('.dot').on('click', function () { goTo(parseInt($(this).attr('data-index'), 10)); });
  $(window).on('resize', function () { goTo(current); });
});