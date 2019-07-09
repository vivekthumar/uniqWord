angular.module('imageGallery').controller('listController', function($scope, $http,) {
	angular.element(".progress-indicator").show();
	$('#example').dataTable().fnDestroy();
	
    $.ajax({
	    'url': "/record",
	    'method': "GET",
	    'contentType': 'application/json'
	}).done( function(data) {
	    $('#example').dataTable( {
	    	"bDestroy": true,
	        "aaData": data.data,
	        "columns": [
	            { "data": "word" },
	            { "data": "count" },
	        ]
	    })
	}).error(function(err){
		alert(err.responseJSON.msg)
	})
});

