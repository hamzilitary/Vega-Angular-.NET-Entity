using VEGA1.Core.Models;
using Microsoft.EntityFrameworkCore;
using VEGA1.Persistence;
using System.Threading.Tasks;
using VEGA1.Core;

namespace VEGA1.Persistence {
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;
        public VehicleRepository (VegaDbContext context)
        {
            this.context = context;
        }
        public async Task<Vehicle> GetVehicle (int id, bool includeRelated = true) 
        {
            if (!includeRelated)
            return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
            .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
            .Include(v => v.Model)
                .ThenInclude(m => m.Make)
            .SingleOrDefaultAsync(v => v.Id == id);
        }
         public void Add(Vehicle vehicle) 
        {
            context.Vehicles.Add(vehicle);
        }
        public void Remove(Vehicle vehicle)
        {
            context.Remove(vehicle);
        }
    }
}