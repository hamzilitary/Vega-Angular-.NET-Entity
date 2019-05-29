using VEGA1.Models;
using System.Threading.Tasks;

namespace VEGA1.Persistence
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle (int id, bool includeRelated = true);
         void Add(Vehicle vehicle);
         void Remove(Vehicle vehicle);
    }
}