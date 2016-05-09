/**
 * Created by kathi on 04.05.16.
 */
app.controller('myCtrl', function ($scope, $http) {
    $scope.shoppingList = {};
    $scope.formData = {};

    $http.get('/api/items')
        .then(function success(response) {
            $scope.shoppingList = response.data;
            console.log(response.data);
        }, function myError(response) {
            console.log(response.statusText);
        });


    $scope.addShoppingItem = function () {
        $http.post('/api/items', $scope.formData)
            .success(function (data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.shoppingList = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };

    $scope.removeItem = function (index) {
        $scope.shoppingList.splice(index, 1);
    };

    $scope.testSearch = function () {
        $http.get('/api/search')
            .success(function (data) {})
            .error(function(data) {
               console.log('Error: ' + data);
            });
    }
})
;

   