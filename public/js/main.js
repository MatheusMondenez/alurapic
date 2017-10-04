angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute', 'meusServicos']) // 'ngResource' pode ser removido, pois foi configurado no meus-servicos
.config(function($routeProvider , $locationProvider){

    $locationProvider.html5Mode(true); // Permite omitir o # se o navegador e servidor estiverem preparados - De definir o base no <head>

    $routeProvider.when('/fotos', {
      templateUrl: 'partials/principal.html',
      controller: 'FotosController'
    });

    $routeProvider.when('/fotos/new', {
      templateUrl: 'partials/foto.html',
      controller: 'FotoController'
    });

    $routeProvider.when('/fotos/edit/:fotoId', {
      templateUrl: 'partials/foto.html',
      controller: 'FotoController'
    });

    $routeProvider.otherwise({redirectTo: '/fotos'});

})
