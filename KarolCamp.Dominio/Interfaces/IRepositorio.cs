using System.Collections.Generic;

namespace KarolCamp.Dominio.Interfaces
{
    public interface IRepositorio<T> where T : Entidade
    {
        void Salvar(T entidade);

        void Excluir(string id);

        IEnumerable<T> ListarTodos();

        T ListarPorId(string id);
    }
}


