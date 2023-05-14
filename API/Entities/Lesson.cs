using System;

namespace API.Entities
{
    public class Lesson
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        private Category categoryName;
        public enum Category
        {
            Akordy, Skale, Tabulatury
        }
        public Category CategoryName
        {
            get { return categoryName; }
            set
            {
                categoryName = value;
            }
        }
        public int AdminId { get; set; }
    }
}