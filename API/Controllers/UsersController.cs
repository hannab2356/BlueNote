using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IBlueNoteRepository _repo;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        public UsersController(IBlueNoteRepository repo, IMapper mapper, SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("getUserInfo/{userId}")]
        public async Task<ActionResult<UserUpdateDto>> GetUserInfo(int userId)
        {
            var userFromRepo = await _repo.GetUser(userId);

            var userForReturn = _mapper.Map<UserUpdateDto>(userFromRepo);

            return Ok(userForReturn);
        }

        [HttpPut("updateUser/{userId}")]
        public async Task<ActionResult<User>> UpdateUser(int userId, UserUpdateDto userUpdateDto)
        {
            var user = await _repo.GetUser(userId);

            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value))
            //     return Unauthorized();
            userUpdateDto.BirthDate = userUpdateDto.BirthDate.AddDays(1);
            var updatedUser = _mapper.Map(userUpdateDto, user);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            throw new Exception("Zapisanie zmian nie powiodło się.");
        }

        [HttpPut("updatePassword/{userId}")]
        public async Task<ActionResult<User>> UpdatePassword(int userId, [FromBody] UserUpdatePasswordDto userUpdatePasswordDto)
        {
            var user = await _repo.GetUser(userId);

            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value))
            //     return Unauthorized();
            var userLogin = await _userManager.Users
                .SingleOrDefaultAsync(x => x.UserName == user.UserName.ToLower());

            if (user == null) return Unauthorized();

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, userUpdatePasswordDto.CurrentPassword, false);

            if (!result.Succeeded) return Unauthorized("Błędne hasło");

            userLogin.PasswordHash = _userManager.PasswordHasher.HashPassword(userLogin, userUpdatePasswordDto.Password);
            var updatedUser = await _userManager.UpdateAsync(userLogin);

            //var updatedUser = _mapper.Map(userUpdatePasswordDto, user);

            if (!updatedUser.Succeeded) return BadRequest(updatedUser.Errors);

            return Ok();
        }
    }
}