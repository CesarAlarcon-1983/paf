'use strict';

// Constructor
var Header = function() {
    var header = $('.header');
    var body = $('body');
    var menuOpen = $('.header__button');

    menuOpen.on('click', function(){
        header.toggleClass('-open');
        body.toggleClass('-hideOverflow');
    });
    
    $(window).scroll(function(){
        if ($(this).scrollTop() > 750){      
            header.addClass('js-scroll');
        } else {
            header.removeClass("js-scroll");
        }
      });
};

module.exports = Header;
