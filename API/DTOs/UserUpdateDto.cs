using System;

namespace API.DTOs
{
    public class UserUpdateDto
    {
        public string Username { get; set; }
        public DateTime BirthDate { get; set; }
        public string Description { get; set; }
    }
}