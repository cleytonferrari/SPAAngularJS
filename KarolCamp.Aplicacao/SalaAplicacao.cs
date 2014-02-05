using System.Collections.Generic;
using KarolCamp.Dominio;
using KarolCamp.Dominio.Interfaces;


namespace KarolCamp.Aplicacao
{
    public class SalaAplicacao
    {
        private readonly IRepositorio<Sala> contexto;
        
        public SalaAplicacao(IRepositorio<Sala> repositorio )
        {
            contexto = repositorio;
        }

        public void Salvar(Sala sala)
        {
            contexto.Salvar(sala);
        }

        public void Excluir(string id)
        {
            contexto.Excluir(id);
        }

        public IEnumerable<Sala> ListarTodos()
        {
            return contexto.ListarTodos();
        }

        public Sala ListarPorId(string id)
        {
            return contexto.ListarPorId(id);
        }

    }
}