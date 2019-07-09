angular.module('imageGallery').controller('homeController', function($scope, $http) {
	$scope.form = {};
	$scope.form.isShow = false;
	$scope.form.text = "";
	$scope.btnsubmit = function (){
		if(!$scope.form.text){
			$scope.form.isShow = true;
			$scope.form.msg = "Please insert text!";
			return;
		}

		var obj = {text : $scope.form.text}
		$http.post("/record/",JSON.stringify(obj)).success(function(data, status) {
			angular.element(".progress-indicator").hide();
			
			$scope.form.text = "";
			$scope.form.isShow = true;
			$scope.form.msg = "Record is successfully inserted";
			setTimeout(function(){
				$('#errorMsg').hide();
			},5000)
		}).error(function (error, status){
				$scope.form.isShow = true;
				$scope.form.msg = error;
  		});
	};

});