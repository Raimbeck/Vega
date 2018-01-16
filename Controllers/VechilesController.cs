using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vega.Controllers.Resources;
using Vega.Core;
using System.Collections.Generic;
using Vega.Core.Models;
using Microsoft.AspNetCore.Authorization;

namespace Vega.Controllers
{
    [Route("/api/vechiles")]
    public class VechilesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVechileRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public VechilesController(IMapper mapper, IVechileRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateVechile([FromBody] SaveVechileResource vechileResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vechile = mapper.Map<SaveVechileResource, Vechile>(vechileResource);
            vechile.LastUpdate = DateTime.Now;

            repository.Add(vechile);
            await unitOfWork.CompleteAsync();

            vechile = await repository.GetVechile(vechile.Id);

            var result = mapper.Map<Vechile, VechileResource>(vechile);
            return Ok(result);
        }

        [HttpPut("{id}")] // /api/vechiles/{id}
        [Authorize]
        public async Task<IActionResult> UpdateVechile(int id, [FromBody] SaveVechileResource vechileResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vechile = await repository.GetVechile(id);

            if (vechile == null)
                return NotFound();

            mapper.Map<SaveVechileResource, Vechile>(vechileResource, vechile);
            vechile.LastUpdate = DateTime.Now;

            await unitOfWork.CompleteAsync();

            vechile = await repository.GetVechile(id);
            var result = mapper.Map<Vechile, VechileResource>(vechile);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteVechile(int id)
        {
            var vechile = await repository.GetVechile(id, includeRelated: false);

            if (vechile == null)
                return NotFound();

            repository.Remove(vechile);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVechile(int id)
        {
            var vechile = await repository.GetVechile(id);

            if (vechile == null) return NotFound();

            var result = mapper.Map<Vechile, VechileResource>(vechile);
            return Ok(result);
        }

        [HttpGet]
        public async Task<QueryResultResource<VechileResource>> GetVechiles(VechileQueryResource filterResource) {
            var filter = mapper.Map<VechileQueryResource, VechileQuery>(filterResource);

            var queryResult = await repository.GetVechiles(filter);

            return mapper.Map<QueryResult<Vechile>, QueryResultResource<VechileResource>>(queryResult);
        }
    }
}