'use strict';

// Constructor
var Header = function() {
    var header = $('.header');
    var body = $('body');
    var menuOpen = $('.header__button');
    var contactTitle = $('.contact__hero__title');

    menuOpen.on('click', function(){
        // if (header.hasClass('-open')) {
        //     header.removeClass('js-hovered');
        // }

        header.toggleClass('-open');
        body.toggleClass('-hideOverflow');        
    });

    var language = [
        'Hello.',
        'Hola.',
        'Buenas.',
        'Ola.',
        'Ei.',
        '你好.',
        'E\'yo',
        'Ello.',
        'Aye.'
    ];

    var index = 0;

    setInterval(function() {
        contactTitle.html(language[index]);
        index == (language.length - 1) ? index = 0 : index++;
    }, 800);
    
    // $(window).scroll(function(){
    //     if ($(this).scrollTop() > 200){      
    //         header.addClass('js-scroll');
    //     } else {
    //         header.removeClass("js-scroll");
    //     }
    // });

    menuOpen.on('mouseenter mouseleave', function(e) {
        console.log(e.type);
        if (e.type !== 'click') {
            header.toggleClass('js-hovered');
        }
    });

    // Header Button Overlay

    const nodes = [].slice.call($('.header__button'), 0);
    const directions  = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
    const classNames = ['in', 'out'].map((p) => Object.values(directions).map((d) => `${p}-${d}`)).reduce((a, b) => a.concat(b));
    
    const getDirectionKey = (ev, node) => {
      const { width, height, top, left } = node.getBoundingClientRect();
      const l = ev.pageX - (left + window.pageXOffset);
      const t = ev.pageY - (top + window.pageYOffset);
      const x = (l - (width/2) * (width > height ? (height/width) : 1));
      const y = (t - (height/2) * (height > width ? (width/height) : 1));
      return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    }
    
    class Item {
      constructor(element) {
        this.element = element;    
        this.element.addEventListener('mouseover', (ev) => this.update(ev, 'in'));
        this.element.addEventListener('mouseout', (ev) => this.update(ev, 'out'));
      }
      
      update(ev, prefix) {
        this.element.classList.remove(...classNames);
        this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
      }
    }
    
    nodes.forEach(node => new Item(node));    

    // Work Page Scroll Functionality

    
    
    function init() {
        $(projectContainer[0]).addClass('js-active');
    }
    
    var workPage = $('.work');
    var projectContainer = $('.work__proyect');
    var scrollOffset = 0;
    var isChanging = false;
    var projectIndex = 0;

    function proyectIsChanging() {
        isChanging = true;

        setTimeout(function() {
            isChanging = false;
            $(projectContainer).removeClass('js-overlay-down');
            $(projectContainer).removeClass('js-overlay-up');
        }, 1000)
    }

    var ts;
    $(window).on('touchstart', function(e) {
        ts = e.originalEvent.touches[0].clientY;
    });
    
    $(window).on('scroll mousewheel touchmove', function(e) {

        if (e.type !== 'touchmove') {
            if(!isChanging && e.originalEvent.deltaY > 0 && (projectIndex + 1) < projectContainer.length) {
                nextProject();
            }
            
            if(!isChanging && e.originalEvent.deltaY < 0 && projectIndex > 0) {
                prevProject();
            }
        }

        if (e.type === 'touchmove') {
            var te = e.originalEvent.changedTouches[0].clientY;

            if (!isChanging && ts > te && (projectIndex + 1) < projectContainer.length) {
                nextProject();
            }
            
            if (!isChanging && ts < te && projectIndex > 0) {
                console.log('up');
                prevProject();
            }
        }
    });

    var scrollCount = 0

    console.log('Project Containers',projectContainer.length);
    
    function nextProject() {
        proyectIsChanging();

        
        $(projectContainer).addClass('js-overlay-down');
        
        setTimeout(function() {
            console.log(projectIndex);
            $(projectContainer[projectIndex]).removeClass('js-active')
            $(projectContainer[projectIndex + 1]).addClass('js-active')

            if((projectIndex + 2) > (projectContainer.length - 1)) {
                workPage.addClass('-footer-active');
            }

            projectIndex ++;
        }, 300);

        // scrollCount ++
    }

    function prevProject() {
        proyectIsChanging();
        $(projectContainer).addClass('js-overlay-up');

        console.log(projectIndex);

        setTimeout(function() {
            $(projectContainer[projectIndex]).removeClass('js-active')
            $(projectContainer[projectIndex - 1]).addClass('js-active')

            projectIndex --;

            if((projectIndex + 1) < (projectContainer.length)) {
                workPage.removeClass('-footer-active');
            }

        }, 300); 

    }

     
    init();

    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#buscar"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .not('[href="#registro"]')
    .not('[href="#login"]')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top + -50
                }, 1000, function() {
                // Callback after animation
                // Must change focus!
                    var $target = $(target);
                    $target.focus();
                });
            }
        }
    });

    var contactPage = $('.contact');

    if (contactPage.length > 0) {
        if (location.hash === '#contact') {
            $('.js-fields').addClass('js-hidden');
            $('.js-message').removeClass('js-hidden');
        }
    }
};

module.exports = Header;
