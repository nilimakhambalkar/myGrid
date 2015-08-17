(function ($) {
	$.extend(true, window, {
	    JSTree: {
	      ExtendedJSTree: ExtendedJSTree
	    }
  	});

	function ExtendedJSTree(treeContainer,data) {
		  $(treeContainer).jstree({
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
			                "action": false,
			                "submenu" :{
			                	"create_process" : {
			                        "seperator_before" : false,
			                        "seperator_after" : false,
			                        "label" : "Process",
			                        action : function (obj) {
			       
			                    		var ref = $(treeContainer).jstree('create_node', selectedNodeId, {'id' : _.uniqueId('P_'), 'text' : 'New Process', 'processName' : "New Process" }, 'last');
										$(treeContainer).jstree('edit', ref);

			                        }
			                    },
			                    "create_activity" : {
			                        "seperator_before" : false,
			                        "seperator_after" : false,
			                        "label" : "Activity",
			                        action : function (obj) {
			       
			                    		var ref = $(treeContainer).jstree('create_node', selectedNodeId, {'id' : _.uniqueId('A_'), 'text' : 'New Activity'}, 'last');
										$(treeContainer).jstree('edit', ref);

			                        }
			                    }
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
		var selectedNodeId;

	  	$(treeContainer).on('changed.jstree', function (e, data) {
	  		selectedNodeId = data.node;
		     var i, j, r = [];
		    // for(i = 0, j = data.selected.length; i < j; i++) {
		    //   r.push(data.instance.get_node(data.selected[i]).text);
		    // }
		    // $('#event_result').html('Selected: ' + r.join(', '));

		    console.log("****",data.selected);
		    // $(this).attr("id", "test1");
		    
		 })

	  	this.getTreeData = function(){
	  		var v = $(treeContainer).jstree(true).get_json('#', {flat:true})
			var treeData = JSON.stringify(v);
			console.log(treeData);
	  	} 
	  	this.getSelectedNode = function(){
	  		return selectedNodeId;
	  	}
		
	}
	
}(jQuery));