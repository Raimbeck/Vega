using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vega.Core;
using Vega.Core.Models;
using Vega.Extensions;

namespace Vega.Persistence
{
    public class VechileRepository: IVechileRepository
    {
        private readonly VegaDbContext context;
        public VechileRepository(VegaDbContext context)
        {
            this.context = context;
        }
        public async Task<Vechile> GetVechile(int id, bool includeRelated = true)
        {
            if(!includeRelated)
                return await context.Vechiles.FindAsync(id);
            
            return await context.Vechiles
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        public async Task<QueryResult<Vechile>> GetVechiles(VechileQuery queryObj) {
            var result = new QueryResult<Vechile>();

            var query = context.Vechiles
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .AsQueryable();
            
            query = query.ApplyFiltering(queryObj);

            var columnsMap = new Dictionary<string, Expression<Func<Vechile, object>>>() {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName
            };

            query = query.ApplyOrdering(queryObj, columnsMap);

            result.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObj);
            
            result.Items =  await query.ToListAsync();

            return result;
        }
        
        

        public void Add(Vechile vechile) {
            context.Vechiles.Add(vechile);
        }

        public void Remove(Vechile vechile) {
            context.Vechiles.Remove(vechile);
        }
    }
}