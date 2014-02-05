using KarolCamp.Dominio;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KarolCamp.API.Provider
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;
        private readonly Func<UserManager<Usuario>> _userManagerFactory;

        public ApplicationOAuthProvider(string publicClientId, Func<UserManager<Usuario>> userManagerFactory)
        {
            if (publicClientId == null) throw new ArgumentNullException("publicClientId");

            if (userManagerFactory == null) throw new ArgumentNullException("userManagerFactory");

            _publicClientId = publicClientId;
            _userManagerFactory = userManagerFactory;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            using (var userManager = _userManagerFactory())
            {
                var user = await userManager.FindAsync(context.UserName, context.Password);

                if (user == null)
                {
                    context.SetError("invalid_grant", "Usuário ou senhas invalidos.");
                    return;
                }

                var oAuthIdentity = await userManager.CreateIdentityAsync(user, context.Options.AuthenticationType);
                var cookiesIdentity = await userManager.CreateIdentityAsync(user, CookieAuthenticationDefaults.AuthenticationType);
                var properties = CreateProperties(user.UserName, user.Roles);
                var ticket = new AuthenticationTicket(oAuthIdentity, properties);
                context.Validated(ticket);
                context.Request.Context.Authentication.SignIn(cookiesIdentity);
            }
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (var property in context.Properties.Dictionary)
                context.AdditionalResponseParameters.Add(property.Key, property.Value);

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            if (context.ClientId == null) context.Validated();

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId != _publicClientId) return Task.FromResult<object>(null);

            var expectedRootUri = new Uri(context.Request.Uri, "/");

            if (expectedRootUri.AbsoluteUri == context.RedirectUri) context.Validated();

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string userName, List<string> roles)
        {
            var permissao = "logado,";
            foreach (var role in roles)
            {
                permissao += role+",";
            }

            var data = new Dictionary<string, string>
            {
                { "userName", userName },
                { "roles",   permissao.TrimEnd(',') },
            };
            return new AuthenticationProperties(data);
        }
    }
}