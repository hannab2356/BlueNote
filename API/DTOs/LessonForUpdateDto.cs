namespace API.DTOs
{
    public class LessonForUpdateDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
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
    }
}