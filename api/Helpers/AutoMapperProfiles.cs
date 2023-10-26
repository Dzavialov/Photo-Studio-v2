using api.DTOs;
using api.Entities;
using AutoMapper;

namespace api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, User>();
            CreateMap<RoomDto, Room>();
            CreateMap<Room, RoomDto>();
            CreateMap<RoomImage, RoomImageDto>();
            CreateMap<RoomUpdateDto, Room>();
            CreateMap<BookingDto, Booking>();
            CreateMap<Booking, BookingDto>();
            CreateMap<BookingUpdateDto, Booking>();
        }
    }
}
