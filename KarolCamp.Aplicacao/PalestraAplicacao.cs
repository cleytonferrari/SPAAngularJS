using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using KarolCamp.Dominio;
using KarolCamp.Dominio.Interfaces;



namespace KarolCamp.Aplicacao
{
    public class PalestraAplicacao
    {

        private readonly IRepositorio<Palestra> contexto;

        public PalestraAplicacao(IRepositorio<Palestra> repositorio)
        {
            contexto = repositorio;
        }

        public void Salvar(Palestra palestra)
        {
            contexto.Salvar(palestra);
        }

        public void Excluir(string id)
        {
            contexto.Excluir(id);
        }

        public IEnumerable<Palestra> ListarTodos()
        {
            return contexto.ListarTodos();
        }

        public Palestra ListarPorId(string id)
        {
            return contexto.ListarPorId(id);
        }
    }
}