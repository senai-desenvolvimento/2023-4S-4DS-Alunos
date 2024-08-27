using apiTestxUnit.Domains;
using apiTestxUnit.Repositories;
using Moq;

namespace testApixUnit.Test
{
    public class ProductsTest
    {
        //Indica que o método é de teste de unidade
        [Fact]
        public void Get()
        {
            //Arrange : Organizar (Cenário)

            //Lista de produtos
            var products = new List<Products>
            {
                new Products {IdProduct = Guid.NewGuid(), Name = "Produto 1", Price = 10},
                new Products {IdProduct = Guid.NewGuid(), Name = "Produto 2", Price = 20},
                new Products {IdProduct = Guid.NewGuid(), Name = "Produto 3", Price = 30}
            };

            //Cria um obj de simulação do tipo IProductsRepository
            var mockRepository = new Mock<ProductsRepository>();

            //Configura o método GetProducts para retornar a lista de produtos "mock"
            mockRepository.Setup(x => x.GetProducts()).Returns(products);

            //Act : Agir

            //Executa o método GetProducts() e armazena o resultado em result
            //Object : propriedade do Mock<ProductsRepository> que retorna uma instância real do repositório
            var result = mockRepository.Object.GetProducts();

            //Assert : Provar

            //Prova se o resultado esperado é igual ao resultado obtido através da busca
            Assert.Equal(3, result.Count);
        }

        //Post
        [Fact]
        public void Post()
        {
            //Arrange
            Products product = new Products { IdProduct = Guid.NewGuid(), Name = "Kiwi", Price = 0.5m };

            var productList = new List<Products>();

            //Cria um obj de simulação do tipo IProductsRepository
            var mockRepository = new Mock<ProductsRepository>();

            mockRepository.Setup(x => x.AddProduct(product)).Callback<Products>(x => productList.Add(product));

            //Act

            //Executa o método para adicionar o produto
            //Object : propriedade do Mock<ProductsRepository> que retorna uma instância real do repositório
            mockRepository.Object.AddProduct(product);

            //Assert

            // Verifica se contém o produto na lista productList
            Assert.Contains(product, productList);
        }

        //Delete
        [Fact]
        public void Delete()
        {
            // Arrange

            //Cria um produto
            var product = new Products { IdProduct = Guid.NewGuid(), Name = "Kiwi", Price = 0.5m };

            //Adiciona na Lista
            var productList = new List<Products> { product };

            //Cria um mock do repositório de produtos 
            var mockRepository = new Mock<ProductsRepository>();

            //Configura o mock para executar uma ação quando o método DeleteProduct for chamado
            //Callback : especifica um retorno de chamada a ser invocado quando o método é chamado
            mockRepository.Setup(x => x.DeleteProduct(product.IdProduct)).Callback(() => productList.Remove(product));

            // Act

            //Executa o método para deletar o produto
            //Object : propriedade do Mock<ProductsRepository> que retorna uma instância real do repositório
            mockRepository.Object.DeleteProduct(product.IdProduct);

            // Assert

            // Verifica se não contém o produto na lista productList
            Assert.DoesNotContain(product, productList);
        }

        //Desafio : Update , GetById

    }
}