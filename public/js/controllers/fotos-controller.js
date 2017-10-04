angular.module('alurapic').controller('FotosController', function($scope, recursoFoto){ // $resource foi substituído por recursoFoto -- $http pode ser retirado

  $scope.fotos = [];
  $scope.filtro = ''; // O filtro busca em tudo (titulo, url...)
  $scope.mensagem = '';

  // var recursoFoto = $resource('/v1/fotos/:fotoId'); // Está no meus-servicos

  recursoFoto.query(function(fotos){
      $scope.fotos = fotos;
  }, function(erro){
      console.log(erro);
  });

  // var promise = $http.get('v1/fotos');
  //
  // promise.then(function(retorno){
  //     $scope.fotos = retorno.data;
  // }).catch(function(error){
  //   console.log(error);
  // });

  // var promise = $http.get('v1/fotos') // Não usa a variável promise // Substituído por resource
  // .success(function(fotos){
  //   $scope.fotos = fotos;
  // })
  // .error(function(erro){
  //   console.log(erro);
  // });

  $scope.remover = function(foto){
      recursoFoto.delete({fotoId: foto._id}, function(){
          var indiceFoto = $scope.fotos.indexOf(foto);
          $scope.fotos.splice(indiceFoto, 1); // splice() remove do array - Parâmetros (A partir de qual índice, quantidade)
          $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso';
      }, function(erro){
          console.log(erro);
          $scope.mensagem = 'Não foi possível remover a foto ' + foto.titulo;
      });

      // $http.delete('v1/fotos/' + foto._id) // Substituído pelo resource
      // .success(function(){
      //     var indiceFoto = $scope.fotos.indexOf(foto);
      //     $scope.fotos.splice(indiceFoto, 1); // splice() remove do array - Parâmetros (A partir de qual índice, quantidade)
      //     $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso';
      // })
      // .error(function(){
      //     $scope.mensagem = 'Não foi possível remover a foto ' + foto.titulo;
      // });
  };

});
