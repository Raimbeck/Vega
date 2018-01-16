using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Vega.Core.Models;

namespace Vega.Core
{
    public class PhotoService : IPhotoService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IPhotoStorage photoStorage;
        public PhotoService(IUnitOfWork unitOfWork, IPhotoStorage photoStorage)
        {
            this.photoStorage = photoStorage;
            this.unitOfWork = unitOfWork;

        }
        public async Task<Photo> UploadPhoto(Vechile vechile, IFormFile file, string uploadsFolderPath)
        {
            var photo = new Photo { FileName = await photoStorage.StorePhoto(uploadsFolderPath, file)};
            vechile.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return photo;
        }
    }
}