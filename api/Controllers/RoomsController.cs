using api.DTOs;
using api.Entities;
using api.Interfaces;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomRepository _roomRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public RoomsController(IRoomRepository roomRepository, IMapper mapper, IPhotoService photoService)
        {
            _roomRepository = roomRepository;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomDto>>> GetRooms()
        {
            var rooms = await _roomRepository.GetRoomsAsync();

            return Ok(_mapper.Map<IEnumerable<RoomDto>>(rooms));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoomDto>> GetRoom(int id)
        {
            var room = await _roomRepository.GetRoomByIdAsync(id);
            return Ok(_mapper.Map<RoomDto>(room));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("create-room")]
        public async Task<ActionResult<RoomDto>> CreateRoom(RoomDto roomDto)
        {
            if (roomDto is null) return BadRequest("Object is empty");

            var room = _mapper.Map<RoomDto, Room>(roomDto);
            _roomRepository.AddRoom(room);

            if (await _roomRepository.SaveAllAsync()) return CreatedAtAction(nameof(GetRoom), new { id = room.Id }, _mapper.Map<RoomDto>(room));

            return BadRequest("Failed to create a room.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{roomId}")]
        public async Task<ActionResult> UpdateRoom(RoomUpdateDto roomUpdateDto, [FromRoute]int roomId)
        {
            var room = await _roomRepository.GetRoomByIdAsync(roomId);

            if (room is null) return NotFound();

            _mapper.Map(roomUpdateDto, room);

            if (await _roomRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update a room.");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{roomId}")]
        public async Task<ActionResult> DeleteRoom(int roomId)
        {
            var room = await _roomRepository.GetRoomByIdAsync(roomId);

            if (room is null) return NotFound();

            _roomRepository.RemoveRoom(room);

            if (await _roomRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete a room.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-image/{roomId}")]
        public async Task<ActionResult<RoomImageDto>> AddImage(IFormFile file, [FromRoute]int roomId)
        {
            var room = await _roomRepository.GetRoomByIdAsync(roomId);

            if (room is null) return NotFound();

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error is not null) return BadRequest(result.Error.Message);

            var photo = new RoomImage
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            room.Images.Add(photo);

            if (await _roomRepository.SaveAllAsync())
            {
                return CreatedAtAction(nameof(GetRoom), new { id = room.Id }, _mapper.Map<RoomImageDto>(photo));
            }

            return BadRequest("Failed to add an image.");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete-image/{roomId}/{imageId}")]
        public async Task<ActionResult> DeletePhoto(int roomId, int imageId)
        {
            var room = await _roomRepository.GetRoomByIdAsync(roomId);

            if (room is null) return NotFound();

            var image = room.Images.Find(i => i.Id == imageId);

            if (image is null) return NotFound();

            if (image.PublicId is not null)
            {
                var result = await _photoService.DeletePhotoAsync(image.PublicId);
                if (result.Error is not null) return BadRequest(result.Error.Message);
            }

            room.Images.Remove(image);

            if (await _roomRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete an image.");
        }
    }
}
