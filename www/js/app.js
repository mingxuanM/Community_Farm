// Sutton Community Farm
// Volunteer Management App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.services' is found in services.js
// 'app.controllers' is found in controllers.js
var db = null;
angular.module('app', ['ionic', 'ngCordova', 'app.controllers', 'app.routes', 'app.directives','app.services',])

.config(function($ionicConfigProvider, $sceDelegateProvider){

    $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        //initialize the database connection.
        db = $cordovaSQLite.openDB({
            "name" : "suttonFarm.db",
            "location" : "default"
        });
        //Creating database tables.
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS volunteers (id text primary key, firstname text, lastname text, address text, phoneNo text, email text, over16 integer, q1 text, q2a integer, q2b integer, q2c integer, q2d integer, q2e integer, q2f integer, q2g text, q3a integer, q3b integer, q3c integer, q3d integer, q3e integer, q3f integer, q3g text, q4a text, q4b text, q5 text, q6a integer, q6b text, q7a text, q7b text, q8 integer, q9a text, q9b text, q10a text, q10b text, q10c text, q11a text, q11b text, q11c text, q12a integer, q12b integer, q12c integer, q12d text, q13a integer, q13b text)");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS inclusivity (id text primary key, q1 integer, q2a integer, q2b text, q3a integer, q3b text, q4a integer, q4b text, q5 integer, q6 integer, q7a integer, q7b text, q8a integer, q8b text, q9a integer, q9b text, q10 integer)");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS visitors (visitorID text primary key, firstname text, lastname text, email text, dateOfBirth text, phoneNo text)");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS sign (id text, firstname text, lastname text, signIn text, signOut text)");

        //The following lines add three test volunteers in to the database.
        $cordovaSQLite.execute(db, "INSERT INTO volunteers (id, firstname, lastname) VALUES ('10000', 'Mingxuan', 'Mei')");
        $cordovaSQLite.execute(db, "INSERT INTO volunteers (id, firstname, lastname) VALUES ('99999', 'Frederick', 'Russo')");
        $cordovaSQLite.execute(db, "INSERT INTO volunteers (id, firstname, lastname) VALUES ('11111', 'Guillaume', 'de Labelotterie')");
    });
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        link: function(scope, element, attrs) {
            var place = attrs['hrefInappbrowser'] || '_system';
            element.bind('click', function (event) {

                var href = event.currentTarget.href;

                window.open(href, place, 'location=yes');

                event.preventDefault();
                event.stopPropagation();

            });
        }
    };
});
