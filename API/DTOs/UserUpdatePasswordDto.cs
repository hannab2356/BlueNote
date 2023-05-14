using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UserUpdatePasswordDto
    {
        public string CurrentPassword { get; set; }
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
    }
}