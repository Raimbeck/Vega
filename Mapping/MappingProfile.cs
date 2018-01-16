using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vega.Controllers.Resources;
using Vega.Core.Models;

namespace Vega.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Photo, PhotoResource>();
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();

            CreateMap<SaveVechileResource, Vechile>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) => {
                    // Remove  unselected features
                    var removedFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId)).ToList(); 
                    foreach(var f in removedFeatures) 
                        v.Features.Remove(f);
                    
                    // Add new features
                    var addedFeatures = vr.Features.Where(id => !v.Features.Any(f => f.FeatureId == id)).Select(id => new VechileFeature{ FeatureId = id }).ToList();
                    foreach(var f in addedFeatures)
                         v.Features.Add(f);
                });

            CreateMap<Vechile, SaveVechileResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource{
                    Name = v.ContactName,
                    Email = v.ContactEmail,
                    Phone = v.ContactPhone
                }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(f => f.FeatureId)));

            CreateMap<Vechile, VechileResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource{
                    Name = v.ContactName,
                    Email = v.ContactEmail,
                    Phone = v.ContactPhone
                }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairResource { Id = vf.Feature.Id, Name = vf.Feature.Name })))
                .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make));

            CreateMap<VechileQueryResource, VechileQuery>();

            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));
            
        }
    }
}
