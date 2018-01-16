using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Core.Models;

namespace Vega.Core
{
    public interface IVechileRepository
    {
         Task<Vechile> GetVechile(int id, bool includeRelated = true);
         Task<QueryResult<Vechile>> GetVechiles(VechileQuery filter);
         void Add(Vechile vechile);
         void Remove(Vechile vechile);
    }
}