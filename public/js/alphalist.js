angular.module('imageGallery').controller('aplhalistController', function($scope, $http,) {
	angular.element(".progress-indicator").show();
	$('#example').dataTable().fnDestroy();
	
    $.ajax({
	    'url': "/record?type=alpha",
	    'method': "GET",
	    'contentType': 'application/json'
	}).done( function(data) {
	    $('#example').dataTable( {
	    	"bDestroy": true,
	        "aaData": data.data,
	        "columns": [
	            { "data": "alpha" },
	            { "data": "count" },
	        ]
	    })
	}).error(function(err){
		alert(err.responseJSON.msg)
	})
});

