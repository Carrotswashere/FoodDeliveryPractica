namespace FoodDevRaloo.Models
{
    public class ChangePasswordViewModel
    {
        public int UserID { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }
    }
}
