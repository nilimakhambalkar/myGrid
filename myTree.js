(function ($) {
	$.extend(true, window, {
	    JSTree: {
	      ExtendedJSTree: ExtendedJSTree
	    }
  	});

	function ExtendedJSTree(treeContainer,data) {
	
	  this.myTree = $(treeContainer).jstree({
			  "core" : {
			    "animation" : 0,
			    "check_callback" : true,
			    "themes" : { "stripes" : true },
			    'data' : data
			  },
			  "plugins" : [
			    "contextmenu", "dnd", "search",
			    "state", "types", "wholerow"
			  ],
			  "contextmenu":{         
			    "items": function($node) {
			        var tree = $(treeContainer).jstree(true);
			        return {
			            "Create": {
			                "separator_before": false,
			                "separator_after": false,
			                "label": "Create",
			                action : function (obj) {
	                    		var ref = $(treeContainer).jstree('create_node', obj.reference.attr("id"), {'id' : _.uniqueId('P_'), 'text' : 'New Process', 'processName' : "New Process" }, 'last');
								$(treeContainer).jstree('edit', ref);

	                        }
			                
			            },
			            "Rename": {
			                "separator_before": false,
			                "separator_after": false,
			                "label": "Rename",
			                "action": function (obj) { 
			                    tree.edit($node);
			                }
			            },                         
			            "Remove": {
			                "separator_before": false,
			                "separator_after": false,
			                "label": "Remove",
			                "action": function (obj) { 
			                    tree.delete_node($node);
			                }
			            }
			        };
			    }
			}

		})	
		

	  	
		
	}
	
}(jQuery));