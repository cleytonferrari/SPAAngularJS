using System.Collections.Generic;
using System.Linq;
using KarolCamp.Dominio;
using KarolCamp.Dominio.Interfaces;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;

namespace KarolCamp.Repositorio.Mongo
{
    public class RepositorioSala:IRepositorio<Sala>
    {
        private readonly Contexto<Sala> contexto;

        public RepositorioSala()
        {
            contexto = new Contexto<Sala>();
        }

        public void Salvar(Sala entidade)
        {
            contexto.Collection.Save(entidade);
        }

        public void Excluir(string id)
        {
            contexto.Collection.Remove(Query.EQ("_id", id));
        }

        public IEnumerable<Sala> ListarTodos()
        {
            return contexto.Collection.AsQueryable();
        }

        public Sala ListarPorId(string id)
        {
            return contexto.Collection.AsQueryable().FirstOrDefault(x => x.Id == id);
        }
    }
}
