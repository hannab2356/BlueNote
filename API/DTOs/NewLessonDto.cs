using System;


namespace API.DTOs
{
    public class NewLessonDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int AdminId { get; set; }
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
        public DateTime CreatedDate { get; set; }
        public NewLessonDto()
        {
            CreatedDate = DateTime.Now;
        }
    }
}