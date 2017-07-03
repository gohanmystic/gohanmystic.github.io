(function(){
	'use strict';
	angular.module('myApp', [])
	.controller('ShoppingListAddController', ShoppingListAddController)
	.controller('ShoppingListShowController', ShoppingListShowController)
	.service('ShoppingListService', ShoppingListService);

	ShoppingListAddController.$inject = ['ShoppingListService'];
	function ShoppingListAddController (ShoppingListService) {
		var itemAdder = this;

		itemAdder.itemName = "";
		itemAdder.itemQuantity = "";

		itemAdder.addItem = function () {
			ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
		}
	}
	
	ShoppingListShowController.$inject = ['ShoppingListService'];
	function ShoppingListShowController (ShoppingListService) {
		var showList = this;

		var items = ShoppingListService.getsItem();
		showList.items = items;

		showList.removeItem = function (itemIndex) {
			if(confirm("are you sure?")){
				ShoppingListService.removeItem(itemIndex);
			}
		};
		showList.editItem = function (itemIndex) {
			ShoppingListService.editItem(itemIndex);
		}
	}

	function ShoppingListService () {
		var service = this;
		//list of shopping items
		var items = [];

		service.addItem = function (itemName, itemQuantity) {
			var item = {
				name: itemName,
				quantity: itemQuantity
			};
			var itemsLength = items.length;
			if(checkExistItemName(item.name, items)){
				items.push(item);				
			}else{
				alert("Item Name is Existed!");
			}
		};
		service.getsItem = function () {
			return items;
		};
		service.removeItem = function (itemIndex) {
			items.splice(itemIndex, 1);
		};
		service.editItem = function (itemIndex) {
			var itemName = prompt("Please enter new item name");
			if(checkExistItemName(itemName, items)) {
				var itemQuantity = prompt("Please enter new item Quantity");
				var item = {
					name: itemName,
					quantity: itemQuantity
				}
				items[itemIndex] = item;
			}else {
				alert("Items name is already existed!");
			}
			
		};
	}
	function checkExistItemName(itemName, items) {
		var length = items.length;
		for (var i = 0; i < length; i++) {
			if (items[i].name.indexOf(itemName) == 0) {
				return false;
			}
		}
		return true;
	}
})();