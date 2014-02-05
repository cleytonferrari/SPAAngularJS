using System;

namespace KarolCamp.Dominio
{
    public class Palestra : Entidade
    {
        public string Titulo { get; set; }
        public string Codigo { get; set; }
        public string Descricao { get; set; }
        public Palestrante Palestrante { get; set; }
        public Trilha Trilha { get; set; }
        public string  Nivel { get; set; }
        public Sala Sala { get; set; }
        public DateTime Horario { get; set; }
    }
}