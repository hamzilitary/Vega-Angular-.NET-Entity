using VEGA1.Models;

namespace VEGA1.Persistence
{
    public class VehicleRepository
    {
        public Vehicle GetVehicle(int id)
        {
            var vehicle = await context.Vehicles
            .Include(v => v.Features)
            .ThenInclude(vf => vf.Feature)
            .Include(v => v.Model)
            .ThenInclude(m => m.Make)
            .SingleOrDefaultAsync(v => v.Id == id);

        }
    }
}