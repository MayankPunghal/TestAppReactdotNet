using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    [Table("Students")]
    public class Students
    {
        [Key]
        public int StudentID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Contact { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Discipline { get; set; }

    }
}
