using VEGA1.Core.Models;
using System.Threading.Tasks;

namespace VEGA1.Core
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle (int id, bool includeRelated = true);
         void Add(Vehicle vehicle);
         void Remove(Vehicle vehicle);
    }
}