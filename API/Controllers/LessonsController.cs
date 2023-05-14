using System;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LessonsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IBlueNoteRepository _repo;
        public LessonsController(IBlueNoteRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;

        }

        // [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("addLesson/{adminId}")]
        public async Task<ActionResult<Lesson>> AddLesson(int adminId, NewLessonDto newLessonDto)
        {
            var createdBy = await _repo.GetUser(adminId);

            // if (createdBy.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var lesson = _mapper.Map<Lesson>(newLessonDto);
            lesson.AdminId = adminId;
            // lesson.CategoryName = Lesson.Category.Tabulatury;

            _repo.Add(lesson);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            throw new Exception("Zapisanie lekcji nie powiodło się");
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("adminLessons/{adminId}")]
        public async Task<ActionResult<LessonForReturnDto>> GetAdminLessons(int adminId)
        {
            var createdBy = await _repo.GetUser(adminId);

            if (createdBy.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var lessonsFromRepo = await _repo.GetAdminLessons(adminId);   

            var lessonsForReturn = _mapper.Map<IEnumerable<LessonForReturnDto>>(lessonsFromRepo);

            return Ok(lessonsForReturn);
        }

        [HttpGet("allLessons")]
        public async Task<ActionResult<LessonForReturnDto>> GetAllLessons()
        {
            var lessonsFromRepo = await _repo.GetAllLessons();   

            var lessonsForReturn = _mapper.Map<IEnumerable<LessonForReturnDto>>(lessonsFromRepo);

            return Ok(lessonsForReturn);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("updateLesson/{adminId}/{lessonId}")]
        public async Task<ActionResult<LessonForUpdateDto>> UpdateLesson(int adminId, int lessonId, [FromBody] LessonForUpdateDto lessonForUpdateDto)
        {
            var createdBy = await _repo.GetUser(adminId);

            if (createdBy.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var lessonsFromRepo = await _repo.GetLesson(lessonId); 

            var updatedLesson = _mapper.Map(lessonForUpdateDto, lessonsFromRepo);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            throw new Exception("Zapisanie lekcji nie powiodło się");
        }
    }
}