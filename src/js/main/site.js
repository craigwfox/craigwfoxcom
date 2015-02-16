/* *******************************************************
   _____            __                                    
  / __(_)_ _  ___  / /__                                  
 _\ \/ /  ' \/ _ \/ / -_)                                 
/___/_/_/_/_/ .__/_/\__/          ________                
  / __/ /__/_/_____/ /____ ____  /_  __/ /  ___ __ _  ___ 
 _\ \/ __/ _ `/ __/ __/ -_) __/   / / / _ \/ -_)  ' \/ -_)
/___/\__/\_,_/_/  \__/\__/_/     /_/ /_//_/\__/_/_/_/\__/ 
                                                                        
By Craig Fox @ craigwfox.com
https://github.com/craigwfox/Simple-Starter-Theme.git
******************************************************* */
(function($){
  var scrollNav = function(){

    var nav = $('.site-nav');

    nav.on('click', 'a', function(event){
      event.preventDefault();

      var el = $(this),
          curNav = el.attr('data-nav'),
          curSec = $('body').find('*[id="'+curNav+'"]'),
          curLoc = curSec.position().top;

      $('body').animate({
        scrollTop: curLoc
      },200);
    });
  };

  scrollNav();
})(jQuery);