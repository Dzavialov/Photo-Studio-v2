using api.DTOs;
using api.Entities;
using api.Extensions;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SendGrid.Helpers.Mail;
using SendGrid;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EditsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public EditsController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EditItemDto>>> GetEditItems()
        {
            var editItems = await _uow.EditRepository.GetEditItemsAsync();

            return Ok(_mapper.Map<IEnumerable<EditItemDto>>(editItems));
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<EditItemDto>> GetEditItem(int id)
        {
            var editItem = await _uow.EditRepository.GetEditItemByIdAsync(id);
            return Ok(_mapper.Map<EditItemDto>(editItem));
        }

        [Authorize(Roles = "User")]
        [HttpPost("create-edit")]
        public async Task<ActionResult<EditItemDto>> CreateEditItem(EditItemDto editItemDto)
        {
            if (editItemDto is null) return BadRequest("Object is empty");

            editItemDto.UserId = User.GetUserId();
            editItemDto.Username = User.GetUsername();
            editItemDto.Status = "In Process";

            var editItem = _mapper.Map<EditItemDto, EditItem>(editItemDto);
            _uow.EditRepository.AddEditItem(editItem);

            if (await _uow.Complete()) return CreatedAtAction(nameof(GetEditItem), new { id = editItem.Id }, _mapper.Map<EditItemDto>(editItem));

            return BadRequest("Failed to create an edit.");
        }

        [Authorize(Roles = "User, Admin")]
        [HttpDelete("{editId}")]
        public async Task<ActionResult> DeleteEditItem(int editId)
        {
            var editItem = await _uow.EditRepository.GetEditItemByIdAsync(editId);

            if (editItem is null) return NotFound();

            _uow.EditRepository.RemoveEditItem(editItem);

            if (await _uow.Complete()) return Ok();

            return BadRequest("Failed to delete an edit.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{editId}")]
        public async Task<ActionResult> FinishEdit(EditItemUpdateDto editItemUpdateDto, int editId)
        {
            var editItem = await _uow.EditRepository.GetEditItemByIdAsync(editId);

            if (editItem is null) return NotFound();

            editItemUpdateDto.Status = "Finished";

            _mapper.Map(editItemUpdateDto, editItem);

            if (await _uow.Complete())
            {
                await SendEmailAsync(editItem);
                return NoContent();
            }
            return BadRequest("Failed to finish equipment.");
        }

        public async Task SendEmailAsync(EditItem editItem)
        {
            var user = await _uow.UserRepository.GetUserByIdAsync(editItem.UserId);
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("forsteam0014@gmail.com", "Фотостудія Веселка"),
                Subject = "Результати редагування",
                PlainTextContent = $"Результати редагування ваших фото вже готові і знаходяться на сайті в розділі Мої Редагування або за посиланням {editItem.FileUrl}",
            };
            msg.AddTo(new EmailAddress(user.Email, user.UserName));
            await client.SendEmailAsync(msg);
        }
    }
}
