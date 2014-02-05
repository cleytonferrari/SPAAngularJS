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
    [Authorize]
    public class TrilhasController : ApiController
    {
        public IEnumerable<Trilha> Get()
        {
            return Construtor.TrilhaAplicacaoMongo().ListarTodos().ToList();
        }

        public Trilha Get(string id)
        {
            return Construtor.TrilhaAplicacaoMongo().ListarPorId(id);
        }

        [Authorize(Roles = "administrador")]
        public HttpResponseMessage Post(Trilha trilha)
        {
            if (!ModelState.IsValid)
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);

            var app = Construtor.TrilhaAplicacaoMongo();
            app.Salvar(trilha);

            return Request.CreateResponse(HttpStatusCode.Created, trilha);
        }

        public HttpResponseMessage Put(string id, Trilha trilha)
        {
            if (!ModelState.IsValid)
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);

            if (id != trilha.Id)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            var app = Construtor.TrilhaAplicacaoMongo();
            var trilhaBanco = app.ListarPorId(id);
            if (trilhaBanco == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            app.Salvar(trilha);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(string id)
        {
            var app = Construtor.TrilhaAplicacaoMongo();
            var trilhaBanco = app.ListarPorId(id);
            if (trilhaBanco == null)
                return Request.CreateResponse(HttpStatusCode.NotFound);

            app.Excluir(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
