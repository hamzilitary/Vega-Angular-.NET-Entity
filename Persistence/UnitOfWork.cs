using System.Threading.Tasks;
using VEGA1.Core; 

namespace VEGA1.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
    
    private readonly VegaDbContext context;

    public UnitOfWork(VegaDbContext context)
    {
      this.context = context;
    }

    public async Task CompleteAsync()
    {
      await context.SaveChangesAsync();
    }
  }
}