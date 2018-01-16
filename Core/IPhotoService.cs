using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Vega.Core.Models;

namespace Vega.Core
{
    public interface IPhotoService
    {
         Task<Photo> UploadPhoto(Vechile vechile, IFormFile file, string uploadsFolderPath);
    }
}