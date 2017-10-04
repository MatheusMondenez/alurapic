angular.module('minhasDiretivas', [])
.directive('meuPainel', function(){

    var ddo = {};

    ddo.restrict = 'AE'; // Atributo e Elemento

    ddo.scope = {
        // titulo = '@titulo' // Como é igual pode ser passado apenas o '@' - Se for diferente tem que escrever tudo
        titulo : '@'
    };

    ddo.transclude = true; // Para manter elementos filhos

    ddo.templateUrl = 'js/directives/meu-painel.html'; // Poderia ser apenas ddo.template e escrever a string

    return ddo;
})
.directive('minhaFoto', function(){

    var ddo = {};

    ddo.restrict = "AE";

    ddo.scope = {
        titulo: '@',
        url: '@'
    };

    ddo.template = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}">';

    return ddo;

})
.directive('meuBotaoPerigo', function(){

    var ddo = {};

    ddo.restrict = "E";

    ddo.scope = {
        nome: '@',
        acao: '&' // Passa expressões - O @ só recebe strings
    };

    ddo.template = '<button ng-click="acao(foto)" type="button" class="btn btn-danger btn-block">{{nome}}</button>';

    return ddo;

})
.directive('meuFocus', function(){

    var ddo = {};

    ddo.restrict = "A";

    // ddo.scope = {
    //     focado: '='
    // }

    ddo.link = function(scope, element){
        // scope.$watch('focado', function(){ // Substituído pelo $broadcast
        //     if(scope.focado){
        //         element[0].focus();
        //         scope.focado = false;
        //     }
        // });
        scope.$on('fotoCadastrada', function(){ // Pega o evento do controller
            element[0].focus();
        });
    }

    return ddo;

})
.directive('meusTitulos', function() {
    var ddo = {};
    ddo.restrict = 'E';
    ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';
    ddo.controller = function($scope, recursoFoto) {
      recursoFoto.query(function(fotos) {
          $scope.titulos = fotos.map(function(foto) {
              return foto.titulo;
          });
      });
    };
    return ddo;
});
