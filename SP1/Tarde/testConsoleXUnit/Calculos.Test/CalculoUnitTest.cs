using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculos.Test
{
    public class CalculoUnitTest
    {
        //princípio AAA : Act, Arrange e Assert
        //princípio AAA : Agir, Organizar e Provar

        [Fact]
        public void SomarDoisNumeros()
        {
            //Organizar (Arrange)
            var n1 = 3.3;
            var n2 = 2.2;
            var valorEsperado = 5.5;

            //Agir (Act)
            var soma = Calculo.Somar(n1,n2);

            //Provar (Asset)
            Assert.Equal(valorEsperado, soma);
        }
    }
}