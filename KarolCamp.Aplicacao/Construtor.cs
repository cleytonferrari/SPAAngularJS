using KarolCamp.Dominio;
using KarolCamp.Dominio.Interfaces;
using KarolCamp.Security;
using Microsoft.AspNet.Identity;

namespace KarolCamp.Aplicacao
{
    public class Construtor
    {
        public static PalestraAplicacao PalestraAplicacaoMongo()
        {
            return new PalestraAplicacao(new Repositorio.Mongo.RepositorioPalestra());
        }

        public static PalestranteAplicacao PalestranteAplicacaoMongo()
        {
            return new PalestranteAplicacao(new Repositorio.Mongo.RepositorioPalestrante(), new Repositorio.Mongo.RepositorioArquivo());
        }

        public static SalaAplicacao SalaAplicacaoMongo()
        {
            return new SalaAplicacao(new Repositorio.Mongo.RepositorioSala());
        }

        public static TrilhaAplicacao TrilhaAplicacaoMongo()
        {
            return new TrilhaAplicacao(new Repositorio.Mongo.RepositorioTrilha());
        }

        public static IRepositorio<Usuario> UsuarioAplicacaoMongo()
        {
            return new Repositorio.Mongo.RepositorioUsuario();
        }

        public static IUserStore<Usuario> UsuarioAplicacao()
        {
            return new UsuarioAplicacao<Usuario>(UsuarioAplicacaoMongo());
        }
    }
}
