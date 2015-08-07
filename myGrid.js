(function ($) {
	$.extend(true, window, {
	    MySlickGrid: {
	      MyGrid: ExtendedSlickGrid
	    }
  	});
  	var grid,
	 	dataView;
		searchList = [],
	 	searchValue = "",
		searchColumnValue = "",
	  	searchColumnIndex = -1,
	 logCounter = 0,
	 visibleColumns = [],//this will allow us to search only on visible fields
	 columns = [];
	 visibleColumnsValues = "visibleColumnsValues";


	function ExtendedSlickGrid(container, data, gridColumns, options) {
		var searchTemplate = '<div id="inlineFilterPanel" style="background:#dddddd;padding:3px;color:black; position: relative;left: 0px;top: 0px;">Search :  <input type="text" id="txtSearch"></div><div id="gContainer"></div>';
		$(container).append(searchTemplate);
		$("#gContainer").height($(container).height() - $("#inlineFilterPanel").height() - 6);
		$("#txtSearch").addClear({
		  onClear: function(){
		    $('.slick-cell').removeHighlight( );
		  }
		});
		  	
		if( gridColumns == null){
			$.each(data[0], function(key, val ) {
				if(key!="id"){
					var colDef = {id: key, name: key, field: key, sortable: true, width:250}
					visibleColumns.push(key);
			  		columns.push(colDef);
				}
				
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
		 grid.onSort.subscribe(function(e, args) {
		   var comparer = function(a, b) {
		    return (a[args.sortCol.field] > b[args.sortCol.field]) ? 1 : -1;
		  }
			dataView.sort(comparer, args.sortAsc);
			$('.slick-cell').highlight( searchValue );
		});

		  // wire up model events to drive the grid
		  dataView.onRowCountChanged.subscribe(function (e, args) {
		    grid.updateRowCount();
		    grid.render();
		  });
		  dataView.onRowsChanged.subscribe(function (e, args) {
		    grid.invalidateRows(args.rows);
		    grid.render();
		  });
		  grid.onScroll.subscribe(function (e, args) {
		   	$('.slick-cell').highlight( searchValue );
		  });


		  $(container).on('keyup', '#txtSearch', function(e) {
			console.log(this.value)
			logCounter = 0;
			searchColumnIndex = -1; //reset search column index every time on change;
			searchField = visibleColumnsValues;
			$('.slick-cell').removeHighlight();

	        if (e.which == 27) {
	            this.value = "";
	        }
	        searchValue = this.value;

	        var searchParts = searchValue.split(":");

	        if(searchParts.length > 1){
	        	searchColumnIndex = parseInt(searchParts[0]) - 1;
	        	searchValue = searchColumnValue = searchParts[1];
	        	searchField = (grid.getColumns()[searchColumnIndex]).field
	        }
	        var filterData = [];
	        var len = dataView.getLength();

	        for (i = 0; i < len; i++) { 
			    filterData.push(dataView.getLength());
			}

	        dataView.setItems(data);
	    	dataView.setFilter(myFilter);
	        dataView.refresh();

	        if(e.keyCode == 8){

	        }
	        if ( searchValue ) {
            	// highlight the new term
            	if(searchColumnIndex==-1)
            	$('.slick-cell').highlight( searchValue );
            	else
            	$('.l'+searchColumnIndex).highlight( searchValue );
        	}


		});
		

	    dataView.beginUpdate();
	    dataView.setItems(data);
	    dataView.setFilter(myFilter);
	    dataView.endUpdate(); 
	    this.dataView = dataView;
	}

	function myFilter(item, args) {
	  
	  if(!item.hasOwnProperty(visibleColumnsValues)){
	  		var searchStr = "";
	  		for(var prop in item){
	  			//console.log(prop, visibleColumns);
	  			if(visibleColumns.indexOf(prop)!=-1)
	  			searchStr+=searchStr.length == 0 ? item[prop] : "~" + item[prop];

	  		}

	  		item[visibleColumnsValues] = searchStr.toLowerCase();
	  }

	  logCounter++;
	  
		if(searchValue.length == 0){
			return true;
		}
		else if (item[searchField].toLowerCase().indexOf(searchValue.toLowerCase()) != -1) {
		    return true;
		}

		console.log(item[searchField]);
		return false;
	}


	
}(jQuery));