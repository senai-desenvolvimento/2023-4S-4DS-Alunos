// 3) Calcular a soma dos números pares de 1 a 100.

int contador = 1;
int soma = 0;

while (contador <= 100)
{
    if (contador % 2 == 0)
    {
        soma += contador;
    }
    contador++;
}
Console.WriteLine($"{soma}");