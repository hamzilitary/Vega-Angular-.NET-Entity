using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using VEGA1.Controllers.Resources;
using VEGA1.Core;
using VEGA1.Core.Models;
using VEGA1.Persistence;

namespace VEGA1.Controllers {
    [Route ("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller {
        //private readonly int MAX_BYTES = 1 * 1024 * 1024;
        //private readonly string[] ACCEPTED_FILE_TYPES = new[] {".jgp", ".jpeg", ".png" };
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IHostingEnvironment host;
        private readonly PhotoSettings photoSettings;
        private readonly IPhotoRepository photoRepository;

        public PhotosController (IHostingEnvironment host, IVehicleRepository repository, IUnitOfWork unitOfWork, IMapper mapper, IOptionsSnapshot<PhotoSettings> options, IPhotoRepository photoRepository) {
            this.photoRepository = photoRepository;
            this.photoSettings = options.Value;
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.host = host;
        }

        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhotos (int vehicleId)
        {
            var photos = await photoRepository.GetPhotos (vehicleId);
            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>> (photos);

        }

        [HttpPost]
        public async Task<IActionResult> Upload (int vehicleId, IFormFile file) {
            var vehicle = await repository.GetVehicle (vehicleId, includeRelated : false);
            if (vehicle == null) {
                return NotFound ();
            }
            if (file == null) {
                return BadRequest ("Null File");
            }
            if (file.Length == 0) {
                return BadRequest ("Emplty File");
            }
            if (!photoSettings.IsSupported (file.FileName)) {
                return BadRequest ("Invalid File Type");
            }
            if (file.Length > photoSettings.MaxBytes) return BadRequest ("Maximum File Size Exceeded");
            var uploadsFolderPath = Path.Combine (host.WebRootPath, "uploads");
            if (!Directory.Exists (uploadsFolderPath)) {
                Directory.CreateDirectory (uploadsFolderPath);
            }
            var fileName = Guid.NewGuid ().ToString () + Path.GetExtension (file.FileName);
            var filePath = Path.Combine (uploadsFolderPath, fileName);

            using (var stream = new FileStream (filePath, FileMode.Create)) {
                await file.CopyToAsync (stream);
            }

            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add (photo);
            await unitOfWork.CompleteAsync ();

            return Ok (mapper.Map<Photo, PhotoResource> (photo));
        }

    }
}