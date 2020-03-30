# Superstars do Github usando NodeJS

Usando APIs externas, testes, entre outros, você deverá descobrir quais são os projetos de uma determinada linguagem que possuem mais estrelas no Github.

## Tópicos

Neste desafio você aprenderá:

- NodeJS
- Acessar APIs externas
- Testar APIs
- Gerar JSON
- Escrever em arquivos

## Requisitos
​
Para este desafio você precisará de:

- NodeJS LTS (8.12.0+)


## Detalhes

Crie um módulo que use a API do Github para listar os 10 repositórios de uma linguagem (recebida como parâmetro) no Github que possuem mais estrelas. Gere um arquivo chamado *stars.json* com o conteúdo, conforme o exemplo abaixo:


``` json
[
    {
        "name": "moby/moby",
        "description": "Moby Project",
        "url": "https://github.com/moby/moby",
        "stars":49409
    },
    {
        "name": "golang/go",
        "description": "The Go programming language",
        "url": "https://github.com/golang/go",
        "stars":43563
    }
]
```
Obs.: O método deverá retornar uma `promise` que deve ser resolvida apenas após o arquivo ser criado.
