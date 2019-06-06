using System.Threading.Tasks;

namespace VEGA1.Core
{
     public interface IUnitOfWork
  {
    Task CompleteAsync();
  }
}