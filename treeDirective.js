var app = angular.module('myApp',[]);

app.controller('treeCtrl',function($scope){

	$scope.treeData = [ {"id":"E001", "text":"E2E", "parent":"#", "description":"Please enter description"}];
	$scope.selectedNode;
	$scope.$on('changed.jstree', function(event,eArgs){
        $scope.selectedNode = eArgs;
      }); 
	$scope.treeJSON = [];

	$scope.saveNode = function(process){
		$scope.treeJSON.push({
			id:$scope.selectedNode.id,
			process_name:process.name,
			description:process.description,
			parent:$scope.selectedNode.parent
		})
		console.log($scope.treeJSON);
	}

})
app.directive('tree', function($rootScope) {
		
   return {
      restrict: 'E',
      replace:'true',
      template:'<div id="tree" style="width:1000px;height:500px;"></div>',
      link: function($scope, elem, attrs) {
         var tree = null;

        $scope.$watch("notControllerData", function(newValue, oldValue){
   			console.log(newValue);

   		});
   		var treeData = [ {"id":"E001", "text":"E2E", "parent":"#", "description":"Please enter description"}];
   		tree = new JSTree.ExtendedJSTree(elem,treeData);
        
        
   		var jtree = tree.myTree;

         jtree.on('changed.jstree', function (e, data) {
         	//alert("hii")
	  		//var selectedNode = data.node;
		     
		    console.log("****",data.selected);
		    // $(this).attr("id", "test1");
		    var v = jtree.jstree(true).get_json('#', {flat:true})
			var treeData = JSON.stringify(v);
			console.log(treeData);


		     $rootScope.$broadcast('changed.jstree',data.node);
		    

		 })
      }
   }
})

