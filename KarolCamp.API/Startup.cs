using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(KarolCamp.API.Startup))]

namespace KarolCamp.API
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}