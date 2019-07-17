angular.module('imageGallery').controller('homeController', function($scope, $http, $rootScope) {
	$scope.form = {};
	$scope.form.isShow = false;
	$scope.form.text = "";
	$rootScope.loader = false;
	$scope.btnsubmit = function (){
		if(!$scope.form.text){
			$scope.form.isShow = true;
			$scope.form.msg = "Please insert text!";
			return;
		}
		var obj = {text : $scope.form.text.toLowerCase()}
		$rootScope.loader = true;
		$http.post("/record/",JSON.stringify(obj)).success(function(data, status) {
			angular.element(".progress-indicator").hide();
			
			$scope.form.text = "";
			$scope.form.isShow = true;
			$rootScope.loader = false;
			$scope.form.msg = "Record is successfully inserted";
			setTimeout(function(){
				$('#errorMsg').hide();
			},5000)
		}).error(function (error, status){
				$rootScope.loader = false;
				$scope.form.isShow = true;
				$scope.form.msg = error;
  		});
	};

});