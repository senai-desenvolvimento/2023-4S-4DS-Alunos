//4) Crie um programa que gere um número aleatório entre 1 e 10. O usuário deve tentar adivinhar esse número. O programa deve continuar pedindo um palpite até que o usuário acerte o número. Ao final, mostre quantas tentativas foram necessárias.


using System.ComponentModel;

Random random = new Random();

int aleatorio = random.Next(1, 11);
bool returnTry;
int chute;
int tentativas = 0;

do
{
    Console.WriteLine("Tente adivinhar o número : ");
    returnTry = int.TryParse(Console.ReadLine(), out chute);

    if (!returnTry)
    {
        Console.WriteLine("Número digitado é inválido");
    }

    tentativas++;
    
} while (chute != aleatorio);

Console.WriteLine($"O número de tentativas foi de: {tentativas}");