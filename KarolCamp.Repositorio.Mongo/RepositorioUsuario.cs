using KarolCamp.Dominio;
using KarolCamp.Dominio.Interfaces;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using System.Collections.Generic;
using System.Linq;

namespace KarolCamp.Repositorio.Mongo
{
    public class RepositorioUsuario:IRepositorio<Usuario>
    {
        private readonly Contexto<Usuario> contexto;

        public RepositorioUsuario()
        {
            contexto = new Contexto<Usuario>();
        }

        public void Salvar(Usuario entidade)
        {
            contexto.Collection.Save(entidade);
        }

        public void Excluir(string id)
        {
            contexto.Collection.Remove(Query.EQ("_id", id));
        }

        public IEnumerable<Usuario> ListarTodos()
        {
            return contexto.Collection.AsQueryable();
        }

        public Usuario ListarPorId(string id)
        {
            return contexto.Collection.AsQueryable().FirstOrDefault(x => x.Id == id);
        }
    }
}
