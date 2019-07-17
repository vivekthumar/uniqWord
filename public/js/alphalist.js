angular.module('imageGallery').controller('aplhalistController', function($http, $rootScope) {
	angular.element(".progress-indicator").show();
	$('#example').dataTable().fnDestroy();
		$rootScope.loader = true;
    $http({
	    'url': "/record?type=alpha",
	    'method': "GET",
	    'contentType': 'application/json'
	}).success( function(data) {
		$rootScope.loader = false;
	    $('#example').dataTable( {
	    	"bDestroy": true,
	        "aaData": data.data,
	        "columns": [
	            { "data": "alpha" },
	            { "data": "count" },
	        ]
	    })
	}).error(function(err){
		$rootScope.loader = false;
		alert(err.responseJSON.msg)
	})
});

