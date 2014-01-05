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
$(function(){
	$("ul.dropdown li").hover(function(){
		$(this).addClass("hover");
		$('ul:first',this).css('visibility', 'visible');
	}, function(){
		$(this).removeClass("hover");
		$('ul:first',this).css('visibility', 'hidden');
	});
	$("ul.dropdown li ul li:has(ul)").find("a:first").append(" &raquo; ");
});