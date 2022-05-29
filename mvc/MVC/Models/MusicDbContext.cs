using System.Data.Entity;


namespace MVC.Models
{
    public class MusicDbContext : DbContext
    {
        public DbSet<Song> Songs { get; set; }

        public DbSet<Genre> Genres { get; set; }
    }
}