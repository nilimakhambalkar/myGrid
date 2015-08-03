(function ($) {
	$.extend(true, window, {
	    MySlickGrid: {
	      MyGrid: ExtendedSlickGrid
	    }
  	});
	function ExtendedSlickGrid(container, data, gridColumns, options) {
		var searchTemplate = '<div id="inlineFilterPanel" style="background:#dddddd;padding:3px;color:black; position: relative;left: 0px;top: 0px;">Search :  <input type="text" id="txtSearch"></div><div id="gContainer"></div>';
		$(container).append(searchTemplate);
		$("#gContainer").height($(container).height() - $("#inlineFilterPanel").height() - 6);

		var columns = [];
	
		if( gridColumns == null){
			$.each(data[0], function(key, val ) {
			  columns.push({id: key, name: key, field: key, sortable: true});
			});
		}
		if(options == null){
			 options = {
			    enableCellNavigation: true,
			    enableColumnReorder: false
			   	
			  };
		}
		var grid = new Slick.Grid("#gContainer", data, columns, options);	 
	}
	var dataView;
	var searchString = "";
	// wire up the search textbox to apply the filter to the model
	  $("#txtSearch").keyup(function (e) {
	    Slick.GlobalEditorLock.cancelCurrentEdit();
	    // clear on Esc
	    if (e.which == 27) {
	      this.value = "";
	    }
	    searchString = this.value;
	    updateFilter();
	  });
	  function updateFilter() {
	    dataView.setFilterArgs({
	      percentCompleteThreshold: percentCompleteThreshold,
	      searchString: searchString
	    });
	    dataView.refresh();
	  }

}(jQuery));