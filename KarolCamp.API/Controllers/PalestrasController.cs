using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KarolCamp.Aplicacao;
using KarolCamp.Dominio;

namespace KarolCamp.API.Controllers
{
    public class PalestrasController : ApiController
    {
        public IEnumerable<Palestra> Get()
        {
            return Construtor.PalestraAplicacaoMongo().ListarTodos().ToList();
        }
    }
}
