var myApp = angular.module("myApp", []);

myApp.controller("mainCtrl", function($scope, getUserInfo) {
  var self = this;
  var lastLogin = new Date();
  self.accountType = [];
  self.selectedAccount = [];
  self.lastLoginDetails = lastLogin.toLocaleString();
  self.sort = 'order';
  self.showDetailsTab = false;

  getUserInfo.getUserAccountDetails().then(function(response) {
    self.userData = response.data.profile;
    console.log(self.userData);
    self.userFulName = self.userData.salutation + ' ' + self.userData.name;
    angular.forEach(self.userData.accounts, function(allAccount) {

      for (var prop in allAccount) {
        var obj = {
          'AccountList': [],
          'Category': ''
        };
        obj.AccountList = allAccount[prop];
        obj.Category = prop;
        self.accountType.push(obj);
      }

    });

  });


  self.showDetails = function(accountType) {
    self.showDetailsTab = true;
    self.detailedAccount = accountType;
  };


  self.sorterFunc = function(allAccount) {
    if (self.sort === 'name') {
      return allAccount.name;
    } else {
      return parseInt(allAccount.order);
    }
  };

});

myApp.factory("getUserInfo", function($http) {
  return {
    getUserAccountDetails: function() {
      return $http.get('http://demo5624426.mockable.io/getUserData');
    }

  };

});


myApp.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  };
});
