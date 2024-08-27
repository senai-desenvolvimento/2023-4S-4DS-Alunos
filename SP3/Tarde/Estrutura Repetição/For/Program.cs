// 2) Implementar um programa que solicita ao usuário um número e imprime a tabuada desse número.

Console.WriteLine($"Informe um número: ");
int numero = Convert.ToInt32(Console.ReadLine());

for (int i = 1; i <= 10; i++)
{
    Console.WriteLine($"{numero} x {i} = {numero * i}");
}