angular.module('meusServicos', ['ngResource'])
.factory('recursoFoto', function($resource){

    return $resource('/v1/fotos/:fotoId', null, {
        update: {
            method: 'PUT'
        }
    });

})
.factory('cadastroDeFotos', function(recursoFoto, $q, $rootScope){ // $q cria promessas -- Todos os $scope de todos os controllers herdam de $rootScope

    var servico = {};
    var evento = 'fotoCadastrada'

    servico.cadastrar = function(foto){
        return $q(function(resolve, reject){
            if(foto._id){
                recursoFoto.update({fotoId: foto._id}, foto, function(){
                    $rootScope.$broadcast(evento); // Dispara o evento para setar o focus no botão voltar
                    resolve({
                        mensagem: 'Foto ' + foto.titulo + ' alterada com sucesso',
                        inclusao: false
                    });
                }, function(erro){
                    console.log(erro);
                    reject({
                        mensagem: 'Não foi possível alterar a foto ' + foto.titulo
                    });
                });
            }else{
                recursoFoto.save(foto, function(){
                    $rootScope.$broadcast(evento); // Dispara o evento para setar o focus no botão voltar
                    resolve({
                        mensagem: 'Foto ' + foto.titulo + ' incluída com sucesso',
                        inclusao: true
                    });
                }, function(erro){
                    console.log(erro);
                    reject({
                        mensagem: 'Não foi possível incluir a foto ' + foto.titulo
                    });
                })
            }
        });
    };

    return servico;

});
