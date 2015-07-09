'use strict';

angular.module('geoEnrichment').controller('GeoEnrichmentController', ['$scope', '$stateParams', '$location', 'Authentication', 'GeoEnrichment',
  function($scope, $stateParams, $location, Authentication, GeoEnrichment) {
    $scope.search = function() {
      var target_location = new GeoEnrichment({
        location: this.location
      });
      target_location.$save(function(response) {
        $location.path('geoEnrichment/' + response._id);

        $scope.location = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };


  }


]);
