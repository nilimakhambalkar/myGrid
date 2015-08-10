(function ($) {
	$.extend(true, window, {
	    JSTree: {
	      ExtendedJSTree: ExtendedJSTree
	    }
  	});



	function ExtendedJSTree(treeContainer,url) {
		$(treeContainer).jstree({
		    'core' : {
		      'data' : {
		        "url" : url,
		        "dataType" : "json" // needed only if you do not supply JSON headers,
		       
		      }
		    }
		  }).bind("loaded.jstree", function (event, data) {
			    $(this).jstree("open_all");
			});
		
	}
	
}(jQuery));