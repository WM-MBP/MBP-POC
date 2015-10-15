var financialSettingApp = angular.module("financialSettingApp",[]);

financialSettingApp.service('getCropDB', ['$http', function($http) {
    var corpDB = this;

    corpDB.getCorpDBHierarchy = function(url) {
        return $http.get('http://adcvdijva022:3000/api' + url);
    };

}]);

financialSettingApp.controller("financialSettingController", ['$scope', 'getCropDB', function($scope, getCropDB){
    $scope.groups = [
        {
            value: "South",
            ID: "G00005"
        }, {
            value: "North",
            ID: "G00004"
        }
    ];


    
    $scope.$watch('group', function(newVal) {        
        if(newVal) {           
            getCropDB.getCorpDBHierarchy('/group/' + $scope.group.ID + '/marketArea')
                .success(function(response) {
                    $scope.marketAreas = response;
                }).error(function(err, status) {
                    console.log(err);
                });   
        }
    });

    $scope.$watch('marketArea', function(newVal) {
        if(newVal) {
            getCropDB.getCorpDBHierarchy('/marketArea/'+ $scope.marketArea.ma_id + '/facilities') 
                .success(function(response) {
                    $scope.facilities = response;
                }).error(function(err, status) {
                    console.log(err);
                });   
        }
    });


    $scope.$watch('facility', function(newVal) {
        if(newVal) {
            getCropDB.getCorpDBHierarchy('/marketArea/' + $scope.marketArea.ma_id + '/facilities/'+ $scope.facility + '/businessUnit')
                .success(function(response) {
                    $scope.businessUnits = response;
                }).error(function(err, status) {
                    console.log(err);
                });  
        }
    });


    $scope.$watch('businessUnit', function(newVal) {
        if( newVal ) {
            if($scope.facility === 1){
                console.log($scope.facility);
             $scope.collectionSelected = true;
                getCropDB.getCorpDBHierarchy('/marketArea/' + $scope.marketArea.ma_id +'/facilities/' + $scope.facility + '/businessUnit/'+ $scope.businessUnit.bu_id + '/lobMaterialStream')
                .success(function(response) {
                    $scope.LOBs = response;
                }).error(function(err, status) {
                    console.log(err);
                });
            }else{
                                console.log($scope.facility);

                $scope.collectionSelected = false;
                console.log("Collection not selected")
;            } 
        }
    });
}]);




    