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
    [Authorize()]
    public class SalasController : ApiController
    {
        public IEnumerable<Sala> Get()
        {
            return Construtor.SalaAplicacaoMongo().ListarTodos().OrderBy(x => x.Nome).ToList();
        }

        public Sala Get(string id)
        {
            return Construtor.SalaAplicacaoMongo().ListarPorId(id);
        }

        public HttpResponseMessage Post(Sala sala)
        {
            if (!ModelState.IsValid)
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);

            var app = Construtor.SalaAplicacaoMongo();
            app.Salvar(sala);

            return Request.CreateResponse(HttpStatusCode.Created, sala);
        }

        public HttpResponseMessage Put(string id, Sala sala)
        {
            if (!ModelState.IsValid)
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);

            if (id != sala.Id)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            var app = Construtor.SalaAplicacaoMongo();
            var salaBanco = app.ListarPorId(id);
            if (salaBanco == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            app.Salvar(sala);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(string id)
        {
            var app = Construtor.SalaAplicacaoMongo();
            var salaBanco = app.ListarPorId(id);
            if (salaBanco == null)
                return Request.CreateResponse(HttpStatusCode.NotFound);

            app.Excluir(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}