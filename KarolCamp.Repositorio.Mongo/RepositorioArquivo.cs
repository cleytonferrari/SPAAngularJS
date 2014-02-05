using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KarolCamp.Dominio;
using KarolCamp.Dominio.Interfaces;

namespace KarolCamp.Repositorio.Mongo
{
    public class RepositorioArquivo:IRepositorioArquivo
    {
        private readonly Contexto<Palestrante> contexto;

        public RepositorioArquivo()
        {
            contexto = new Contexto<Palestrante>();
        }
        public string SalvarArquivo(System.IO.Stream arquivo, string nome, string contentType)
        {
            return contexto.InserirArquivo(arquivo, nome, contentType);
        }

        public void ExcluirArquivo(string idArquivo)
        {
            contexto.ExcluirArquivo(idArquivo);
        }

        public Dictionary<string, string> RetornaArquivo(string id, ref System.IO.MemoryStream retorno)
        {
            return contexto.BuscarArquivo(id, ref retorno);
        }
    }
}
