using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, User>();
            CreateMap<NewLessonDto, Lesson>().ReverseMap();
            CreateMap<Lesson, LessonForReturnDto>();
            CreateMap<LessonForUpdateDto, Lesson>();
            CreateMap<UserUpdateDto, User>();
        }
    }
}