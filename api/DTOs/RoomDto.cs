﻿using api.Entities;

namespace api.DTOs
{
    public class RoomDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AdditionalInformation { get; set; }
        public List<RoomImageDto> Images { get; set; }
        public List<BookingDto> Bookings { get; set; }
        public List<EquipmentItemDto> EquipmentItems { get; set; }
    }
}
