using apiTestxUnit.Domains;
using apiTestxUnit.Interfaces;
using apiTestxUnit.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace apiTestxUnit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ProductsController : ControllerBase
    {
        private IProductsRepository _productsRepository { get; set; }

        public ProductsController()
        {
            _productsRepository = new ProductsRepository();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_productsRepository.GetProducts());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("GetById/{id}")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                return Ok(_productsRepository.GetProductById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(Products product)
        {
            try
            {
                _productsRepository.AddProduct(product);
                return StatusCode(201, product);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public IActionResult Put(Guid id, Products product)
        {
            try
            {
                _productsRepository.UpdateProduct(id, product);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _productsRepository.DeleteProduct(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}