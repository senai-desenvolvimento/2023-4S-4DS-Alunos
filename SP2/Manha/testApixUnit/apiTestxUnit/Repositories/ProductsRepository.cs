using apiTestxUnit.Contexts;
using apiTestxUnit.Domains;
using apiTestxUnit.Interfaces;

namespace apiTestxUnit.Repositories
{
    public class ProductsRepository : IProductsRepository
    {
        ProductsContext _context = new ProductsContext();

        public void AddProduct(Products product)
        {
            try
            {
                _context.Products.Add(product);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DeleteProduct(Guid id)
        {
            try
            {
                Products product = _context.Products.Find(id)!;

                if (product != null)
                {
                    _context.Products.Remove(product);
                    _context.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Products GetProductById(Guid id)
        {
            try
            {
                return _context.Products.Find(id)!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Products> GetProducts()
        {
            try
            {
                return _context.Products.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void UpdateProduct(Guid id, Products changedProduct)
        {
            try
            {
                Products product = _context.Products.Find(id)!;

                if (product != null)
                {
                    product.Name = changedProduct.Name;
                    product.Price = changedProduct.Price;
                }
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
