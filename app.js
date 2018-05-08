var app = angular.module('app', ['ngMaterial', 'md.data.table']);

app.controller('controlador', function($scope, $http, $mdDialog, $httpParamSerializerJQLike) {


    $scope.ordenar = "nombre";


    $scope.eliminar = function($id) {
        $http({
            method: 'POST',
            url: './backend/eliminar.php',
            data: "id=" + $id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {
            $scope.consultar();
        }, function errorCallback(response) {
            console.error(response);
        });
    };

    $scope.consultar = function() {
        $http({
            method: 'POST',
            url: './backend/consultar.php'
        }).then(function successCallback(response) {
            $scope.consulta = response.data;
            console.log('datos de consulta', $scope.consulta);
        }, function errorCallback(response) {
            console.error(response);
        });
    };

    $scope.consultar();


    $scope.dialog = function(ev, url, data) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: url,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {
                    items: data
                },
            })
            .then(function(answer) {
                console.log(answer);
                $scope.consultar();
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };


    function DialogController($scope, $http, $mdDialog, items, $httpParamSerializerJQLike) {

        if (items == '') {
            $scope.DataForm = {};

        } else { $scope.DataForm = items; }



        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        $scope.guardar = function(datos) {

            console.log('enviar datos:', datos);

            $http({
                method: 'POST',
                url: './backend/guardar.php',
                data: $httpParamSerializerJQLike(datos),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {
                console.info(response);
                $scope.answer(response);
            }, function errorCallback(response) {
                console.error(response);
            });
        };


        $scope.actualizar = function($datos) {

            console.info($datos);

            $http({
                method: 'POST',
                url: './backend/actualizar.php',
                data: $httpParamSerializerJQLike($datos),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {
                console.info(response);
                $scope.answer(response);
            }, function errorCallback(response) {
                console.error(response);
            });
        };


    }


});