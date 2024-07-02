using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    [Required]
    public int userID { get; set; }

    [Required]
    public string username { get; set; }

    [Required]
    [EmailAddress]
    public string email { get; set; }

    [Required]
    public string pass { get; set; }

    [Required]
    public DateTime data_ora_creare { get; set; }

    public string firstname { get; set; }

    public string lastname { get; set; }

    public string address { get; set; } // New address property
}
