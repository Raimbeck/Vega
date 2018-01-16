using System.ComponentModel.DataAnnotations.Schema;

namespace Vega.Core.Models
{
    [Table("VechileFeatures")]
    public class VechileFeature
    {
        public int VechileId { get; set; }
        public int FeatureId { get; set; }

        public Vechile Vechile { get; set; }
        public Feature Feature { get; set; }
    }
}