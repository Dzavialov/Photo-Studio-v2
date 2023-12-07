using api.DTOs;
using api.Entities;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipmentController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public EquipmentController(IUnitOfWork uow, IMapper mapper, IPhotoService photoService)
        {
            _uow = uow;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpGet("{roomId}")]
        public async Task<ActionResult<IEnumerable<EquipmentItemDto>>> GetRoomEquipmentItems(int roomId)
        {
            var eqItems = (await _uow.EquipmentRepository.GetEquipmentAsync()).Where(e => e.RoomId == roomId);

            return Ok(_mapper.Map<IEnumerable<EquipmentItemDto>>(eqItems));
        }

        [HttpGet("get-item/{id}")]
        public async Task<ActionResult<EquipmentItemDto>> GetEquipmentItem(int id)
        {
            var eqItem = await _uow.EquipmentRepository.GetEquipmentItemByIdAsync(id);
            return Ok(_mapper.Map<EquipmentItemDto>(eqItem));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("create-item/{roomId}")]
        public async Task<ActionResult<EquipmentItemDto>> CreateEquipmentItem(EquipmentItemDto eqItemDto, [FromRoute]int roomId)
        {
            if (eqItemDto is null) return BadRequest("Object is empty");

            eqItemDto.RoomId = roomId;

            var eqItem = _mapper.Map<EquipmentItemDto, EquipmentItem>(eqItemDto);
            _uow.EquipmentRepository.AddEquipment(eqItem);

            if (await _uow.Complete()) return CreatedAtAction(nameof(GetEquipmentItem), new { id = eqItem.Id }, _mapper.Map<EquipmentItemDto>(eqItem));

            return BadRequest("Failed to create an item.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{itemId}")]
        public async Task<ActionResult> UpdateEquipmentItem(EquipmentItemUpdateDto eqItemUpdateDto, [FromRoute] int itemId)
        {
            var eqItem = await _uow.EquipmentRepository.GetEquipmentItemByIdAsync(itemId);

            if (eqItem is null) return NotFound();

            _mapper.Map(eqItemUpdateDto, eqItem);

            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update an item.");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{itemId}")]
        public async Task<ActionResult> DeleteEquipmentItem(int itemId)
        {
            var eqItem = await _uow.EquipmentRepository.GetEquipmentItemByIdAsync(itemId);

            if (eqItem is null) return NotFound();

            _uow.EquipmentRepository.RemoveEquipment(eqItem);

            if (await _uow.Complete()) return Ok();

            return BadRequest("Failed to delete an item.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-image/{itemId}")]
        public async Task<ActionResult<EquipmentItemImageDto>> AddImage(IFormFile file, [FromRoute] int itemId)
        {
            var eqItem = await _uow.EquipmentRepository.GetEquipmentItemByIdAsync(itemId);

            if (eqItem is null) return NotFound();

            if (eqItem.Image is not null) return BadRequest("This equipment item already has image.");

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error is not null) return BadRequest(result.Error.Message);

            var photo = new EquipmentItemImage
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            eqItem.Image = photo;

            if (await _uow.Complete())
            {
                return CreatedAtAction(nameof(GetEquipmentItem), new { id = eqItem.Id }, _mapper.Map<EquipmentItemImageDto>(photo));
            }

            return BadRequest("Failed to add an image.");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete-image/{itemId}")]
        public async Task<ActionResult> DeletePhoto(int itemId)
        {
            var eqItem = await _uow.EquipmentRepository.GetEquipmentItemByIdAsync(itemId);

            if (eqItem is null) return NotFound();

            var image = eqItem.Image;

            if (image is null) return NotFound();

            if (image.PublicId is not null)
            {
                var result = await _photoService.DeletePhotoAsync(image.PublicId);
                if (result.Error is not null) return BadRequest(result.Error.Message);
            }

            eqItem.Image = null;

            if (await _uow.Complete()) return Ok();

            return BadRequest("Failed to delete an image.");
        }
    }
}
