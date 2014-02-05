using System.Collections.Generic;
using System.Linq;
using KarolCamp.Dominio;
using KarolCamp.Dominio.Interfaces;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;

namespace KarolCamp.Repositorio.Mongo
{
    public class RepositorioPalestra:IRepositorio<Palestra>
    {
        private readonly Contexto<Palestra> contexto;

        public RepositorioPalestra()
        {
            contexto = new Contexto<Palestra>();
        }

        public void Salvar(Palestra entidade)
        {
            contexto.Collection.Save(entidade);
        }

        public void Excluir(string id)
        {
            contexto.Collection.Remove(Query.EQ("_id", id));
        }

        public IEnumerable<Palestra> ListarTodos()
        {
            return contexto.Collection.AsQueryable();
        }

        public Palestra ListarPorId(string id)
        {
            return contexto.Collection.AsQueryable().FirstOrDefault(x => x.Id == id);
        }
    }
}
