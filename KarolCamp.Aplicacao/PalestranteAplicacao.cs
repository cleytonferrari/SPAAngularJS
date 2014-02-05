using System.Collections.Generic;
using System.IO;
using KarolCamp.Dominio;
using KarolCamp.Dominio.Interfaces;

namespace KarolCamp.Aplicacao
{
    public class PalestranteAplicacao
    {
        private readonly IRepositorio<Palestrante> contexto;
        private readonly IRepositorioArquivo contextoArquivo;
        
        public PalestranteAplicacao(IRepositorio<Palestrante> repositorio, IRepositorioArquivo repositorioArquivo )
        {
            contexto = repositorio;
            contextoArquivo = repositorioArquivo;
        }

        public void Salvar(Palestrante palestrante)
        {
            contexto.Salvar(palestrante);
        }

        public void Excluir(string id)
        {
            //Exclui a foto do palestrante
            var palestrante = ListarPorId(id);
            ExcluirArquivo(palestrante.FotoId);

            contexto.Excluir(id);
        }

        public IEnumerable<Palestrante> ListarTodos()
        {
            return contexto.ListarTodos();
        }

        public Palestrante ListarPorId(string id)
        {
            return contexto.ListarPorId(id);
        }

        public string SalvarArquivo(Stream arquivo, string nome, string contentType)
        {
            return contextoArquivo.SalvarArquivo(arquivo, nome, contentType);
        }
        public void ExcluirArquivo(string idArquivo)
        {
            contextoArquivo.ExcluirArquivo(idArquivo);
        }

        public Dictionary<string, string> RetornaArquivo(string id, ref MemoryStream retorno)
        {
            return contextoArquivo.RetornaArquivo(id, ref retorno);
        }
    }
}