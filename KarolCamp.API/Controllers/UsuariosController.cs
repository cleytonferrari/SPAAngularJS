using System.Net;
using KarolCamp.Dominio;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace KarolCamp.API.Controllers
{

    /*
     Fiddler
     POST http://localhost:6882/Api/Usuarios/Token para pegar o Token

        User-Agent: Fiddler
        Content-Length: 38
        Host: localhost:6882
        Content-Type: application/json


        {
        Login:'cleyton',
        Senha:'171099'
        }
     
     GET http://localhost:6882/Api/Salas para acessar conteudo bloqueado
        
        User-Agent: Fiddler
        Content-Type: application/json
        Content-Length: 0
        Authorization: Bearer isdfzPRwxOnsnFKHvkcQfePKaQlw...
     */

    /*
     EXEMPLO DE USO DE AUTENTICACAO E AUTORIZACAO POR TOKEN
     */

    [RoutePrefix("api/Usuarios")]
    [Authorize]
    public class UsuariosController : ApiController
    {
        #region Construtor
        public UserManager<Usuario> UserManager { get; private set; }
        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }
        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        public UsuariosController()
            : this(Startup.UserManagerFactory(), Startup.OAuthOptions.AccessTokenFormat)
        {
        }

        public UsuariosController(UserManager<Usuario> userManager, ISecureDataFormat<AuthenticationTicket> accessTokenFormat)
        {
            UserManager = userManager;
            AccessTokenFormat = accessTokenFormat;
        }
        #endregion

        [AllowAnonymous]
        [Route("Adicionar")]
        public async Task<IHttpActionResult> PostAdicionar(Usuario usuario)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await UserManager.CreateAsync(usuario, usuario.PasswordHash);
            var errorResult = GetErrorResult(result);

            return errorResult ?? Ok();
        }

        [Route("MudarSenha")]
        public async Task<IHttpActionResult> PostMudarSenha(SenhaModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.SenhaVelha,
                model.SenhaNova);
            var errorResult = GetErrorResult(result);

            return errorResult ?? Ok();
        }

        [Route("AdicionarPermissao")]
        public async Task<IHttpActionResult> PostAdicionarPermissao(PermissaoModel permissao)
        {
            //Todo: Validar a permissao recebida, e aceitar somente permissão da lista de permissões usadas no atributo [Authorize]

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await UserManager.AddToRoleAsync(User.Identity.GetUserId(), permissao.Permissao);
            var errorResult = GetErrorResult(result);

            return errorResult ?? Ok();
        }

        [Route("RemoverPermissao")]
        public async Task<IHttpActionResult> PostRemoverPermissao(PermissaoModel permissao)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await UserManager.RemoveFromRoleAsync(User.Identity.GetUserId(), permissao.Permissao);
            var errorResult = GetErrorResult(result);

            return errorResult ?? Ok();
        }

        [Route("Info")]
        public async Task<IHttpActionResult> GetInfo()
        {
            if (!User.Identity.IsAuthenticated) return BadRequest("Usuário não autenticado");

            var usuario = UserManager.FindById(User.Identity.GetUserId());
            if (usuario == null) return BadRequest();

            var retorno = new
            {
                id = User.Identity.GetUserId(),
                nome = usuario.UserName,
                telefone = usuario.Telefone,
                permissoes = usuario.Roles.ToArray()
            };

            return Ok(retorno);
        }

        [Route("Sair")]
        public IHttpActionResult PostSair()
        {
            Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            return Ok();
        }

        [AllowAnonymous]
        [Route("Token")]
        public async Task<IHttpActionResult> PostToken(LoginModel login)
        {
            var baseUrl = string.Format((HttpContext.Current.Request.Url.Port != 80) ? "{0}://{1}:{2}" : "{0}://{1}",
                HttpContext.Current.Request.Url.Scheme, HttpContext.Current.Request.Url.Host, HttpContext.Current.Request.Url.Port);

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                var content = new FormUrlEncodedContent(new[] {
                 new KeyValuePair<string, string>("grant_type", "password"),
                 new KeyValuePair<string, string>("username", login.Login),
                 new KeyValuePair<string, string>("password", login.Senha)
             });
                var result = client.PostAsync("/token", content).Result;
                var resultContent = result.Content.ReadAsStringAsync().Result;

                if (result.StatusCode == HttpStatusCode.BadRequest)
                    return BadRequest(JsonConvert.DeserializeObject(resultContent).ToString());

                return Ok(JsonConvert.DeserializeObject(resultContent));
            }
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null) return InternalServerError();

            if (result.Succeeded) return null;

            if (result.Errors != null)
                foreach (var error in result.Errors)
                    ModelState.AddModelError("", error);

            if (ModelState.IsValid) return BadRequest();

            return BadRequest(ModelState);
        }
    }

    #region ViewsModels
    public class SenhaModel
    {

        public string SenhaVelha { get; set; }
        public string SenhaNova { get; set; }
    }

    public class LoginModel
    {
        public string Login { get; set; }
        public string Senha { get; set; }
    }

    //Se usar tipo primitivo ele não entende os varios POST da api
    public class PermissaoModel
    {
        public string Permissao { get; set; }
    }
}
    #endregion
