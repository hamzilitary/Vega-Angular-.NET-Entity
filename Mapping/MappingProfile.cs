using AutoMapper;
using VEGA1.Controllers.Resources;
using VEGA1.Models;

namespace VEGA1.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, FeatureResource>();
        }
    }
}