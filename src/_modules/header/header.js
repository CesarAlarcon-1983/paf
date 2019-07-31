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
    
    $(window).scroll(function(){
        if ($(this).scrollTop() > 200){      
            header.addClass('js-scroll');
        } else {
            header.removeClass("js-scroll");
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
    
    var projectContainer = $('.work__proyect');
    var scrollOffset = 0;
    var isChanging = false;
    var index = 0;
    
    function proyectIsChanging() {
        isChanging = true;

        setTimeout(function() {
            isChanging = false;
        }, 1000)
    }
    $(window).on('scroll mousewheel touchmove', function(e) {
        console.log(this);
        console.log(e);
        if(!isChanging && e.originalEvent.deltaY > 0 && (index + 1) < projectContainer.length) {
            proyectIsChanging();
            $(projectContainer[index]).removeClass('js-active')
            $(projectContainer[index + 1]).addClass('js-active')
            index ++;
        }
        
        if(!isChanging && e.originalEvent.deltaY < 0 && index > 0) {
            index --;
        }
        console.log(index);
    });

     
    init();
};

module.exports = Header;
