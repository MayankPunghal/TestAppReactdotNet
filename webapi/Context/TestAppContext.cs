using Microsoft.EntityFrameworkCore;
using webapi.Models;
using webapi.common;


namespace webapi.Context
{
    public class TestAppContext : DbContext
    {
        internal TestAppContext() : base()
        {
        }
        internal TestAppContext(DbContextOptions<TestAppContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connection = AppSettings.Settings.SqlConnection.TestApp;
            var con = connection.ConnectionString;
            var to = connection.CommnadTimeout;
            optionsBuilder.UseSqlServer(con, sqlServerOptions => sqlServerOptions.CommandTimeout(to));

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            //builder.Entity<WorkOrders>().ToTable(tb => tb.HasTrigger("tr_WorkOrders"));

            //builder.Entity<RoleLevels>().ToTable("RoleLevels");
        }
        internal DbSet<Students> Students { get; set; }
    }
}
