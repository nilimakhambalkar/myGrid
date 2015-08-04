(function ($) {
	$.extend(true, window, {
	    MySlickGrid: {
	      MyGrid: ExtendedSlickGrid
	    }
  	});
  	var grid;
	var dataView;
	var searchList = [];
	var searchString = "";
	var logCounter = 0;

	function ExtendedSlickGrid(container, data, gridColumns, options) {
		var searchTemplate = '<div id="inlineFilterPanel" style="background:#dddddd;padding:3px;color:black; position: relative;left: 0px;top: 0px;">Search :  <input type="text" id="txtSearch"></div><div id="gContainer"></div>';
		$(container).append(searchTemplate);
		$("#gContainer").height($(container).height() - $("#inlineFilterPanel").height() - 6);
		 $("#txtSearch").addClear();
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
		 dataView = new Slick.Data.DataView();
		 grid = new Slick.Grid("#gContainer", dataView, columns, options);	


		  // wire up model events to drive the grid
		  dataView.onRowCountChanged.subscribe(function (e, args) {
		    grid.updateRowCount();
		    grid.render();
		  });
		  dataView.onRowsChanged.subscribe(function (e, args) {
		    grid.invalidateRows(args.rows);
		    grid.render();
		  });

		  $(container).on('keyup', '#txtSearch', function(e) {
			    console.log(this.value)
			    logCounter = 0;
	        if (e.which == 27) {
	            this.value = "";
	        }
	        searchString = this.value;
	        if ( searchString ) {
            // highlight the new term
            $('.slick-cell').highlight( searchString );
        	}
	        dataView.refresh();
		});
		

	    dataView.beginUpdate();
	    dataView.setItems(data);
	    dataView.setFilter(myFilter);
	    dataView.endUpdate(); 
	}

	function myFilter(item, args) {
	  var searchStrParts = searchString.split(":"),
	  	searchField = "searchStr",
	  	columnIndex,
	  	searchFor;

	  if(!item.hasOwnProperty("searchStr")){
	  		var searchStr = "";
	  		for(var prop in item){
	  			searchStr+=item[prop];

	  		}

	  		item["searchStr"] = searchStr.toLowerCase();
	  }

	  if(searchStrParts.length > 1){
	  	searchFor = searchStrParts[1];
	  	columnIndex = parseInt(searchStrParts[0]);
	  	searchField = (grid.getColumns()[columnIndex-1]).field;

	  }
	  else{
	  	searchFor = searchString.toLowerCase();
	  }
	  console.log("myFilter", logCounter, searchField, searchString, JSON.stringify(columnIndex));
	  
	  logCounter++;

	  if (searchFor != "" && item[searchField].toLowerCase().indexOf(searchFor.toLowerCase()) == -1) {
	    return false;
	  }
	  return true;
	}


	
}(jQuery));