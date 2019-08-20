using VEGA1.Core;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VEGA1.Extensions;
using System;
using System.Threading.Tasks;
using VEGA1.Core.Models;
using VEGA1.Persistence;
using Microsoft.EntityFrameworkCore;

namespace VEGA1.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDbContext context;
        public PhotoRepository (VegaDbContext context)
        {
            this.context = context;
        }
        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
            return await context.Photos
            .Where(p => p.VehicleId == vehicleId)
            .ToListAsync();
        }
    }
}