
(function($) {
	$.simpleTags = function (element, options) {
		var defaults = {
			prefix: 'simpleTags_',
			minchars: 3,
			maxchars: 20
		};

		var plugin = this;	
		var $source_element = $(element);
		var $container_element = null;


		
		var tags = []; //tags stored here
		
		
		// INITIALIZE PLUGIN
		plugin.init = function () {
			plugin.settings = $.extend({}, defaults, options);

			//console.log (options);
			//console.log (defaults);
			
			// create container element
			$container_element = $("<div/>")
								.addClass("simpleTags")
								.prop("tabindex",1);
			
								
			if ($source_element.attr('id') !== undefined) {
				$container_element.attr('id', plugin.settings.prefix + $source_element.attr('id'));
			}			
			
			
			$source_element.after($container_element);
			$source_element.hide();			
			$container_element.focus();			
			
			//configure container element for keypress
			$container_element.on('keypress', function( event ) {
		
				//check to see if the last item in the selector is a textbox, and if not, add it.
				var $textbox = $container_element.find("#textinput");						
				if ($textbox.length == 0)
				{
					$textbox = $("<input/>")
								.prop("id","textinput")
								.addClass("simpleTags_InputBox")
								.appendTo($container_element);
					
					$textbox.focusout(function() {//remove on loss of focus
						$textbox.remove();
					});				
				}	

				$textbox.focus();
				
				if (event.keyCode == 13 &&  $textbox.val().length < defaults.minchars  ){
					event.preventDefault();
				}
				else if (event.keyCode == 13 && $textbox.val().length >=  defaults.minchars
					//add the text to
					&& $textbox.val().length <= defaults.maxchars ){
					addToken ($textbox.val());
					$textbox.remove();		
					$container_element.focus();	
				}
				else if ($textbox.val().length <= defaults.maxchars ){							
					$textbox.append (event);			
				}

			});
		};
				
		var addToken = function (pTokenText)
		{
			storeData(pTokenText);
						
			var $token = $("<div/>")
				.addClass("simpleTags_chosen_item")
				.html(pTokenText)
				.appendTo($container_element);
								
			var $removebutton = $("<div/>")
				.addClass('simpleTags_chosen_item_remove')
				.html('X')				
				.appendTo($token);
				
			$removebutton.on('mousedown', 
					function(e) {						
						var $parent = $(this).parent();			
						removeData($parent.index());				
						$parent.remove();	
						$container_element.focus();				
						});
			
														
		}		
		
		var storeData = function (pText)
		{			
			tags.push(pText);	
		}
		
		var removeData = function (pPos)
		{
			tags.splice(pPos,1);
		}
	
		
		// Initialize plugin
		plugin.init();

	};
	


	 $.fn.simpleTags = function(options,data) {
																		
		 console.log(data);
									
		 options = options !== undefined ? options : {};
		 return this.each(function () {
			 if (typeof(options) === 'object') {
				 if (undefined === $(this).data('simpleTags')) {
					 var plugin = new $.simpleTags(this, options);
					 $(this).data('simpleTags', plugin);
				 }
			 } else if ($(this).data('simpleTags')[options]) {
				$(this).data('simpleTags')[options].apply(this, Array.prototype.slice.call(arguments, 1));
			 } else {
				 $.error('Method ' + options + ' does not exist in $.simpleTags');
			 }
		 });
	 };

}(jQuery));
