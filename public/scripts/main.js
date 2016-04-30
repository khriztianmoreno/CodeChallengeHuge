/**
 * @module menu
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */

'use strict';

/**
 * define variable menu which will contain all our module
 * @type {{init}}
 */
var menu = (function(){

  /**
   * Object which sets the values you'll use later in this area
   * @type {{nav: string, navItem: string, subNavItem: string, bgScreen: string, menu: string, menuToggle: string, firstLevel: string}}
   * @private
   */
  var _st = {
    nav         : 'nav-wrapper',
    navItem     : 'nav-item ',
    subNavItem  : '.sub-nav-item',
    bgScreen    : 'bg-screen',
    menu        : 'menu',
    menuToggle  : 'menu-toggle',
    firstLevel  : 'first-level',
    url         : '/api/nav.json'
  };

  /**
   * Empty object that will keep items that are handled by HTML.
   * @type {{Object}}
   */
  var dom = {}

  /**
   * Build the main menu structure
   * @param {Object} data
   * @private
   */
  var _createMainMenu = function(data) {
    var navStructure = document.createElement('ul');
    for (var key in data.items) {
      if (data.items.hasOwnProperty(key)) {

        var menuItem = document.createElement('li');
        menuItem.className = _st.navItem;

        var anchorData = {
          classN: _st.firstLevel,
          label: data.items[key].label
        };

        var anchorItem = _createAnchorElement(anchorData);

        if (data.items[key].items.length > 0) {
          anchorItem.href = '/#/';
          menuItem.appendChild(anchorItem);
          menuItem.className += 'sub-menu';

          var subMenuItem = document.createElement('ul');
          subMenuItem.className = 'sub-nav-item';
          events.mobileSubMenu(menuItem);

          for (var keyTwo in data.items[key].items) {

            var anchorData = { label: data.items[key].items[keyTwo].label };
            var subAnchorElement = _createAnchorElement(anchorData);

            subAnchorElement.href = data.items[key].items[keyTwo].url;

            var subListElement = document.createElement('li');
            subListElement.appendChild(subAnchorElement);
            subMenuItem.appendChild(subListElement);
          }
          menuItem.appendChild(subMenuItem);
        } else {
          anchorItem.href = data.items[key].url;
          menuItem.appendChild(anchorItem);
        }

        navStructure.appendChild(menuItem);
      }
    }

    dom.menu.appendChild(navStructure);
  };

  /**
   * Create an anchor element
   * @param anchor
   * @returns {Element}
   * @private
   */
  var _createAnchorElement = function (anchor){
    var anchorElement = document.createElement('a');
    if (anchor.classN) {
      anchorElement.className = anchor.classN;
    }
    anchorElement.innerHTML = anchor.label;
    anchorElement.title = anchor.label;

    return anchorElement;
  };

  /**
   * Function object that fills the sun with HTML objects
   * @private
   */
  var _catchDom = function(){
    dom.navWrapper    =   document.getElementById(_st.nav);
    dom.bgScreen      =   document.getElementById(_st.bgScreen);
    dom.menu          =   document.getElementById(_st.menu);
    dom.menuToggle    =   document.getElementById(_st.menuToggle);
  };

  /**
   * Function where the events that will establish each element
   * @private
   */
  var _suscribeEvents = function(){
    dom.menuToggle.addEventListener('click', events.toggleMobile);
    dom.menu.addEventListener('mouseover',events.backgroundMouseOver);
    dom.menu.addEventListener('mouseout',events.backgroundMouseOut);
  };

  /**
   * Object-saving methods that will be used in each event defined in the function suscribeEvents
   * @type {{toggleMobile: events.toggleMobile, backgroundMouseOver: events.backgroundMouseOver, backgroundMouseOut: events.backgroundMouseOut, mobileSubMenu: events.mobileSubMenu}}
   */
  var events = {
    toggleMobile : function(){
      dom.navWrapper.classList.toggle('open-mobile');
      dom.bgScreen.classList.toggle('display');
      dom.menuToggle.classList.toggle('close');
    },

    backgroundMouseOver: function(){
      dom.bgScreen.className = 'block';
    },

    backgroundMouseOut: function(){
      dom.bgScreen.className = 'hidden';
    },

    mobileSubMenu: function(element){
      element.addEventListener('click', function()  {
        if (window.innerWidth < 768) {
          this.classList.toggle('open');
          this.querySelector(_st.subNavItem).classList.toggle('display');
        }
      });
    }
  };

  /**
   *Function initializes
   */
  var initialize = function(){
    _catchDom();

    _suscribeEvents();

    httpAsync.get(_st.url, _createMainMenu);
  };

  /**
   * Returns a literal object with the init method referring to initialize function.
   */
  return{
    init: initialize
  }
})();

/**
 * Running the "init" method menu module.
 */
menu.init();
