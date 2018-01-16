using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vega.Core;
using Vega.Core.Models;

namespace Vega.Persistence
{
    public class PhotoRepository: IPhotoRepository
    {
        private readonly VegaDbContext context;
        public PhotoRepository(VegaDbContext context)
        {
            this.context = context;

        }
        public async Task<IEnumerable<Photo>> GetPhotos(int vechileId)
        {
            return await context.Photos
                .Where(p => vechileId == p.VechileId)
                .ToListAsync();
        }
    }
}