using apiTestxUnit.Domains;
using apiTestxUnit.Repositories;
using Moq;

namespace testApixUnit.Test
{
    public class ProductsTest
    {
        //Indica que o m�todo � de teste de unidade
        [Fact]
        public void Get()
        {
            //Arrange : Organizar (Cen�rio)

            //Lista de produtos
            var products = new List<Products>
            {
                new Products {IdProduct = Guid.NewGuid(), Name = "Produto 1", Price = 10},
                new Products {IdProduct = Guid.NewGuid(), Name = "Produto 2", Price = 20},
                new Products {IdProduct = Guid.NewGuid(), Name = "Produto 3", Price = 30}
            };

            //Cria um obj de simula��o do tipo IProductsRepository
            var mockRepository = new Mock<ProductsRepository>();

            //Configura o m�todo GetProducts para retornar a lista de produtos "mock"
            mockRepository.Setup(x => x.GetProducts()).Returns(products);

            //Act : Agir

            //Executa o m�todo GetProducts() e armazena o resultado em result
            //Object : propriedade do Mock<ProductsRepository> que retorna uma inst�ncia real do reposit�rio
            var result = mockRepository.Object.GetProducts();

            //Assert : Provar

            //Prova se o resultado esperado � igual ao resultado obtido atrav�s da busca
            Assert.Equal(3, result.Count);
        }

        //Post
        [Fact]
        public void Post()
        {
            //Arrange
            Products product = new Products { IdProduct = Guid.NewGuid(), Name = "Kiwi", Price = 0.5m };

            var productList = new List<Products>();

            //Cria um obj de simula��o do tipo IProductsRepository
            var mockRepository = new Mock<ProductsRepository>();

            mockRepository.Setup(x => x.AddProduct(product)).Callback<Products>(x => productList.Add(product));

            //Act

            //Executa o m�todo para adicionar o produto
            //Object : propriedade do Mock<ProductsRepository> que retorna uma inst�ncia real do reposit�rio
            mockRepository.Object.AddProduct(product);

            //Assert

            // Verifica se cont�m o produto na lista productList
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

            //Cria um mock do reposit�rio de produtos 
            var mockRepository = new Mock<ProductsRepository>();

            //Configura o mock para executar uma a��o quando o m�todo DeleteProduct for chamado
            //Callback : especifica um retorno de chamada a ser invocado quando o m�todo � chamado
            mockRepository.Setup(x => x.DeleteProduct(product.IdProduct)).Callback(() => productList.Remove(product));

            // Act

            //Executa o m�todo para deletar o produto
            //Object : propriedade do Mock<ProductsRepository> que retorna uma inst�ncia real do reposit�rio
            mockRepository.Object.DeleteProduct(product.IdProduct);

            // Assert

            // Verifica se n�o cont�m o produto na lista productList
            Assert.DoesNotContain(product, productList);
        }

        //Desafio : Update , GetById

    }
}