using System.Collections.Generic;
using System.Linq;
using KarolCamp.Dominio;
using KarolCamp.Dominio.Interfaces;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;

namespace KarolCamp.Repositorio.Mongo
{
    public class RepositorioPalestrante:IRepositorio<Palestrante>
    {
        private readonly Contexto<Palestrante> contexto;

        public RepositorioPalestrante()
        {
            contexto = new Contexto<Palestrante>();
        }

        public void Salvar(Palestrante entidade)
        {
            contexto.Collection.Save(entidade);
        }

        public void Excluir(string id)
        {
            contexto.Collection.Remove(Query.EQ("_id", id));
        }

        public IEnumerable<Palestrante> ListarTodos()
        {
            return contexto.Collection.AsQueryable();
        }

        public Palestrante ListarPorId(string id)
        {
            return contexto.Collection.AsQueryable().FirstOrDefault(x => x.Id == id);
        }
    }
}
