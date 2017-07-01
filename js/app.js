(function () {
	'use strict';

	angular.module('ass1App', [])
	.controller('ass1Controller', ass1Controller);
	ass1Controller.$inject = ['$scope'];
	function ass1Controller ($scope) {
		$scope.showListDishes = function () {
			var listDishes = $scope.listDishes;
			
			if(checkEmpty(listDishes)) { // is empty
				$scope.showMessage = "Please enter data first";
			}else{ // not empty
				var dishesArray = listDishes.split(",");	
				var mess = countLength(dishesArray);
				
				$scope.showMessage = mess;
			}
			
		}

		function checkEmpty(string) {
			if(string == null || string == "") return true;
			return false;
		}

		function countLength(stringArr) {
			if(stringArr.length < 4) return "Enjoy!";
			else return "Too much!";
		}

	}
})();