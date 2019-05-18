using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using VEGA1.Models;
using VEGA1.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using AutoMapper;
using VEGA1.Controllers.Resources;

namespace VEGA1.Controllers
{
    public class MakesController : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public MakesController(VegaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;

        }
        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
             var makes = await context.Makes.Include(m => m.Models).ToListAsync();
             return mapper.Map<List<Make>, List<MakeResource>>(makes);
        }
    }
}