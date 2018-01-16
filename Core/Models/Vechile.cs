using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Vega.Core.Models
{
    public class Vechile
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public Model Model { get; set; }   
        public bool IsRegistered { get; set; }

        [Required]
        [StringLength(255)]
        public string ContactName { get; set; } 

        [Required]
        [StringLength(255)] 
        public string ContactPhone { get; set; }  

        [StringLength(255)]
        public string ContactEmail { get; set; }  
        
        public DateTime LastUpdate { get; set; }

        public ICollection<VechileFeature> Features { get; set; }
        public ICollection<Photo> Photos { get; set; }

        public Vechile()
        {
            Features = new Collection<VechileFeature>();
            Photos = new Collection<Photo>();
        }
    }
}