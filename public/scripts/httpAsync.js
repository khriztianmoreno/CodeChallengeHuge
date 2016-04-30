/**
 * @module httpAsync
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */

/**
 * XMLHttpRequest javascript module to get JSON data from server
 * @type {{get}}
 */
var httpAsync = (function (url, callback) {

  /**
   * Function that called ajax to retrieve data from the menu
   * @param {string} url -  containing the url data menu
   * @param {function} callback - function to call with response
   */
  var getData = function(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function()  {
      if (request.readyState === 4) {
        if (request.status === 200) {
          var response = JSON.parse(request.responseText);
          callback(response);
        };
      };
    };

    request.open('GET', url,  true); // '/api/nav.json',
    request.send(null);
  };

  return {
    get: getData
  }
})();
