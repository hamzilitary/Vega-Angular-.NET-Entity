using System.Threading.Tasks;

namespace VEGA1.Persistence
{
    
     public interface IUnitOfWork
  {
    Task CompleteAsync();
  }
}