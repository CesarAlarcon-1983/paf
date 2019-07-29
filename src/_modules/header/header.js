'use strict';

// Constructor
var Header = function() {
    var header = $('.header');
    var body = $('body');
    var menuOpen = $('.header__button');
    // var menuClose = $('.header__logo');

    menuOpen.on('click', function(){
        header.toggleClass('-open');
        body.toggleClass('-hideOverflow');
    });
    
    // menuClose.on('click', function(){
    //     header.removeClass('-open');
    //     body.removeClass('-hideOverflow');
    // });
    // $(window).scroll(function(){
    //     if ($(this).scrollTop() > 750){      
    //         header.addClass('js-scroll');
    //     } else {
    //         header.removeClass("js-scroll");
    //     }
    //   });
};

module.exports = Header;
