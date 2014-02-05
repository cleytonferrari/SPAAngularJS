using System.Collections.Generic;
using System.IO;

namespace KarolCamp.Dominio.Interfaces
{
    public interface IRepositorioArquivo
    {
        string SalvarArquivo(Stream arquivo, string nome, string contentType);

        void ExcluirArquivo(string idArquivo);

        Dictionary<string, string> RetornaArquivo(string id, ref MemoryStream retorno);
    }
}
