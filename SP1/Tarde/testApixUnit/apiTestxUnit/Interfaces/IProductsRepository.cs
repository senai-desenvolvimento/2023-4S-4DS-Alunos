using apiTestxUnit.Domains;

namespace apiTestxUnit.Interfaces
{
    public interface IProductsRepository
    {
        List<Products> GetProducts();
        Products GetProductById(Guid id);
        void AddProduct(Products produto);
        void UpdateProduct(Guid id, Products produto);
        void DeleteProduct(Guid id);
    }
}
