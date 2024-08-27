using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculos.Test
{
    public class CalculoUnitTest
    {
        //AAA : Act,Arrange,Assert
        //AAA : Agir, Organizar e Assertir


        [Fact]
        public void TestarMetodoSomar()
        {
            //Arrange : Organizar
            var x1 = 4.1;
            var x2 = 5.9;
            var valorEsperado = 10;

            // Act : Agir
            var soma = Calculo.Somar(x1, x2);

            // Assert : Provar
            Assert.Equal(valorEsperado, soma);

        }
    }
}
