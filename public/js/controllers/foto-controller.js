angular.module('alurapic').controller('FotoController', function($scope, $http, $routeParams, recursoFoto, cadastroDeFotos){ // $resource foi substituído por recursoFoto -- $http pode ser retirado

// angular.module('alurapic').controller('FotoController', ['$scope', 'recursoFoto', '$routeParams', 'cadastroDeFotos', function($scope, recursoFoto, $routeParams, cadastroDeFotos) {
//         // código omitido
// }]); Se for minificar o código deve conter um segundo parâmetro que é um array que recebe primeiro todos os artefatos que o controller do Angular receberá e por último a função que define o controller

    $scope.foto = {};
    $scope.mensagem = '';

    // var recursoFoto = $resource('/v1/fotos/:fotoId', null, { // Está no meus-servicos
    //     update: {
    //         method: 'PUT'
    //     }
    // });

    if($routeParams.fotoId){
        $http.get('v1/fotos/' + $routeParams.fotoId)
        .success(function(foto){
            $scope.foto = foto;
        })
        .error(function(erro){
            console.log(erro);
            $scope.mensagem = 'Não foi possível obter a foto';
        })
    }

    // $scope.submeter = function(){
    //     if($scope.formulario.$valid){
    //         if($scope.foto._id){
    //
    //             recursoFoto.update({fotoId: $scope.foto._id}, $scope.foto, function(){
    //                 $scope.mensagem = 'Foto ' + $scope.foto.titulo + ' foi alterada com sucesso';
    //             }, function(erro){
    //                 console.log(erro);
    //                 $scope.mensagem = 'Não foi possível alterar a foto ' + $scope.foto.titulo;
    //             });
    //
    //             // $http.put('v1/fotos/' + $scope.foto._id, $scope.foto) // Substituída pelo resource
    //             // .success(function(){
    //             //     $scope.mensagem = 'Foto ' + $scope.foto.titulo + ' foi alterada com sucesso';
    //             // })
    //             // .error(function(){
    //             //     $scope.mensagem = 'Não foi possível alterar a foto ' + $scope.foto.titulo;
    //             // });
    //         } else {
    //
    //             recursoFoto.save($scope.foto, function(){
    //                 $scope.foto = {};
    //                 $scope.formulario.$setPristine(); // Não exibe as mensagens de validação após limpar o formulário
    //                 $scope.mensagem = 'Foto incluída com sucesso';
    //             }, function(erro){
    //                 $scope.mensagem = 'Não foi possível incluir a foto';
    //             });
    //
    //             // $http.post('v1/fotos', $scope.foto) // Substituída pelo resource
    //             // .success(function(){
    //             //     $scope.foto = {};
    //             //     $scope.formulario.$setPristine(); // Não exibe as mensagens de validação após limpar o formulário
    //             //     $scope.mensagem = 'Foto incluída com sucesso';
    //             // })
    //             // .error(function(){
    //             //     $scope.mensagem = 'Não foi possível incluir a foto';
    //             // });
    //         }
    //     }
    // } // Substituído pelo serviço cadastroDeFotos

    $scope.submeter = function(){
        if($scope.formulario.$valid){
            cadastroDeFotos.cadastrar($scope.foto)
            .then(function(dados){
                $scope.mensagem = dados.mensagem;
                if(dados.inclusao){
                    $scope.foto = {};
                    $scope.formulario.$setPristine();
                    // $scope.focado = true; // Usado pelo $watch
                    // $scope.$broadcast('fotoCadastrada'); // Transferido para o serviço
                }
            })
            .catch(function(dados){
                $scope.mensagem = dados.mensagem;
            })
        }
    }

});
