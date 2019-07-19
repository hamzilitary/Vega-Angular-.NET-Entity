using System;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VEGA1.Controllers.Resources;
using VEGA1.Core;
using VEGA1.Core.Models;

namespace VEGA1.Controllers {
    [Route ("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller {
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IHostingEnvironment host;

        
        public PhotosController (IHostingEnvironment host, IVehicleRepository repository, IUnitOfWork unitOfWork, IMapper mapper) 
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.host = host;
        }

        [HttpPost]
        public async Task<IActionResult> Upload (int vehicleId, IFormFile file) {
            var vehicle = await repository.GetVehicle (vehicleId, includeRelated : false);
            if (vehicle == null) {
                return NotFound ();
            }
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

            return Ok(mapper.Map<Photo, PhotoResource> (photo));
        }

    }
}