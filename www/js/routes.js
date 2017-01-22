angular.module('app.routes', []) //This file gives id and address to each state and assigns them to templates & controllers.

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('menu.volunteers', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/volunteers.html',
        controller: 'volunteersCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.administraterLogin', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/administraterLogin.html',
        controller: 'administraterLoginCtrl'
      }
    }
  })

  .state('menu.signIn', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signIn.html',
        controller: 'signInCtrl'
      }
    }
  })

  .state('menu.signOut', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signOut.html',
        controller: 'signOutCtrl'
      }
    }
  })

  .state('menu.register', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
      }
    }
  })

  .state('menu.visitor', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/visitor.html',
        controller: 'visitorCtrl'
      }
    }
  })

  .state('menu.volunteersList', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/volunteersList.html',
        controller: 'volunteersListCtrl'
      }
    }
  })

  .state('menu.visitorsList', {
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/visitorsList.html',
        controller: 'visitorsListCtrl'
      }
    }
  })

  .state('menu.signingRecords', {
    url: '/page14',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signingRecords.html',
        controller: 'signingRecordsCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/page1')

});
