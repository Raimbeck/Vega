using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Vega.Controllers.Resources;
using Vega.Core;
using Vega.Core.Models;

namespace Vega.Controllers
{
    [Route("/api/vechiles/{vechileId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly IVechileRepository repository;
        private readonly IMapper mapper;
        private readonly int MAX_BYTES = 10 * 1024 * 1024;
        private readonly string[] ACCEPTED_FILE_TYPES = {".jpg", ".jpeg", ".png"};
        private readonly IPhotoRepository photoRepository;
        private readonly IPhotoService photoService;

        public PhotosController(
            IHostingEnvironment host, IVechileRepository repository, IPhotoService photoService,
            IMapper mapper, IPhotoRepository photoRepository)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.host = host;
            this.photoRepository = photoRepository;
            this.photoService = photoService;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vechileId, IFormFile file)
        {
            var vechile = await repository.GetVechile(vechileId, includeRelated: false);
            if (vechile == null) return NotFound();

            if (file == null) return BadRequest("Null file");
            if (file.Length == 0) return BadRequest("Empty file");
            if (file.Length > MAX_BYTES) return BadRequest("Max file size exceeded |current: " + file.Length + " |max: " + MAX_BYTES);
            if (!ACCEPTED_FILE_TYPES.Any(s => s == Path.GetExtension(file.FileName))) return BadRequest("Invalid file type");

            // wwwroot/uploads
            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            var photo = await photoService.UploadPhoto(vechile, file, uploadsFolderPath);

            return Ok(Mapper.Map<Photo, PhotoResource>(photo));
        }

        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vechileId) {
            var photos = await photoRepository.GetPhotos(vechileId);

            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
        }
    }
}