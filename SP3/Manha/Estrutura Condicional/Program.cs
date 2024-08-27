// 1) Implementar um programa que recebe a nota de um aluno e imprime se ele está aprovado, reprovado ou em recuperação.
// obs: criar um projeto de console no visual studio code c#

Console.WriteLine($"Informe a nota do aluno : ");
double nota = Convert.ToDouble(Console.ReadLine());

if (nota > 7)
{
    Console.WriteLine($"Está aprovado !");
}
else if(nota >= 5)
{
    Console.WriteLine($"Está em recuperação !");
}
else{
    Console.WriteLine($"Reprovado, tente novamente!");   
}