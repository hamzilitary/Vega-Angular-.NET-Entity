using System.Collections.Generic;
using System.Threading.Tasks;
using VEGA1.Core.Models;

namespace VEGA1.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}