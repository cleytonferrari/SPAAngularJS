using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KarolCamp.Dominio;
using KarolCamp.Dominio.Interfaces;


namespace KarolCamp.Aplicacao
{
    public class TrilhaAplicacao
    {
        private readonly IRepositorio<Trilha> contexto;

        public TrilhaAplicacao(IRepositorio<Trilha> repositorio )
        {
            contexto = repositorio;
        }

        public void Salvar(Trilha trilha)
        {
            contexto.Salvar(trilha);
        }

        public void Excluir(string id)
        {
            contexto.Excluir(id);
        }

        public IEnumerable<Trilha> ListarTodos()
        {
            return contexto.ListarTodos();
        }

        public Trilha ListarPorId(string id)
        {
            return contexto.ListarPorId(id);
        }

    }
}