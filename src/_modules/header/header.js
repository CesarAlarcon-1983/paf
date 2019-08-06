'use strict';

// Constructor
var Header = function() {
    var header = $('.header');
    var body = $('body');
    var menuOpen = $('.header__button');
    var contactTitle = $('.contact__hero__title');

    menuOpen.on('click', function(){
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

    menuOpen.on('mouseenter mouseleave', function() {
        header.toggleClass('js-hovered');
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
        }, 2000)
    }
    $(window).on('scroll mousewheel touchmove', function(e) {

        if(!isChanging && e.originalEvent.deltaY > 0 && (projectIndex + 1) < projectContainer.length) {
            this.console.log('scroll down', projectIndex);
            proyectIsChanging();
            
            $(projectContainer).addClass('js-overlay-down');

            setTimeout(function() {
                $(projectContainer[projectIndex]).removeClass('js-active')
                $(projectContainer[projectIndex + 1]).addClass('js-active')
                projectIndex ++;
            }, 500);
            
        }
        
        if(!isChanging && e.originalEvent.deltaY < 0 && projectIndex > 0) {
            this.console.log('scroll up', projectIndex);
            proyectIsChanging();
            $(projectContainer).addClass('js-overlay-up');

            setTimeout(function() {
                $(projectContainer[projectIndex]).removeClass('js-active')
                $(projectContainer[projectIndex - 1]).addClass('js-active')
                projectIndex --;
            }, 500);
            
        }
    });

     
    init();
};

module.exports = Header;
