using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using KarolCamp.Aplicacao;
using KarolCamp.Dominio;

namespace KarolCamp.API.Controllers
{
    public class PalestrantesController : ApiController
    {
        public IEnumerable<Palestrante> Get()
        {
            return Construtor.PalestranteAplicacaoMongo().ListarTodos().ToList();
        }
    }
}
