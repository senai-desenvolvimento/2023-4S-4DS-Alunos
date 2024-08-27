using apiTestxUnit.Domains;
using Microsoft.EntityFrameworkCore;

namespace apiTestxUnit.Contexts
{
    public class ProductsContext : DbContext
    {
        public DbSet<Products> Products { get; set; }

        /// <summary>
        /// Define as opções de construção do banco
        /// </summary>
        /// <param name="optionsBuilder">Objeto com as configurações definidas</param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //string conexão local Carlos
            optionsBuilder.UseSqlServer("Server=DESKTOP-B541VSR; Database=Products_manha; Integrated Security=True; TrustServerCertificate=true;");
            base.OnConfiguring(optionsBuilder);

        }
    }
}
