using System;

namespace API.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public DateTime BirthDate { get; set; }
        public string Description { get; set; }
    }
}