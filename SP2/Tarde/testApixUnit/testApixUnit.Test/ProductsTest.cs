using apiTestxUnit.Domains;
using apiTestxUnit.Interfaces;
using apiTestxUnit.Repositories;
using Moq;

namespace testApixUnit.Test
{
    public class ProductsTest
    {
        /// <summary>
        /// Teste para a funcionalidade de listar todos os produtos
        /// </summary>
        [Fact]
        public void Get()
        {
            //Arrange

            //Lista de produtos
            List<Products> productList = new List<Products>
            {
                new Products {IdProduct = Guid.NewGuid(), Name="Produto 1", Price= 78},
                new Products {IdProduct = Guid.NewGuid(), Name="Produto 2", Price= 90},
                new Products {IdProduct = Guid.NewGuid(), Name="Produto 3", Price= 787}
            };

            //Cria um objeto de simulação do tipo ProductRepository
            var mockRepository = new Mock<IProductsRepository>();

            //Configura o método "GetProducts" para que quando for acionado retorne a lista "mockada"
            mockRepository.Setup(x => x.GetProducts()).Returns(productList);

            //Act

            //Executando o método "GetProducts" e atribue a resposta em result
            var result = mockRepository.Object.GetProducts();

            //Assert
            Assert.Equal(3, result.Count);
        }

        [Fact]
        public void Post()
        {
            //Arrange

            //Criar o objeto
            Products product = new Products { IdProduct = Guid.NewGuid(), Name = "Rolex", Price = 99 };

            //Criar a lista
            List<Products> productList = new List<Products>();

            var mockRepository = new Mock<IProductsRepository>();

            mockRepository.Setup(x => x.AddProduct(product)).Callback<Products>(x => productList.Add(product));

            //Act
            mockRepository.Object.AddProduct(product);

            //Assert
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