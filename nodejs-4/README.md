# Parser de HTML usando NodeJS

Crie um parser para extrair dados da página de `Topics` no Github. Para isso, fará leitura de arquivos, parse de conteúdo HTML, escrita em arquivos e geração de JSON.

## Tópicos

Neste desafio você aprenderá:

- NodeJS
- Ler arquivos
- Fazer parse de conteúdo HTML
- Gerar JSON
- Escrever em arquivos

## Requisitos
​
Para este desafio você precisará de:

- NodeJS LTS (8.12.0+)


## Detalhes

Crie um módulo que receba o caminho de um arquivo `html` e o processe, gerando um arquivo `json` com o conteúdo, conforme o exemplo abaixo:

``` json
{
    "title": "Node.js",
    "description": "Node.js is a tool for executing JavaScript in a variety of environments. JavaScript had humble beginnings as a language that lived only in web browsers, but the Node.js project has expanded its reach and helped make it the most  popular programming language in the world. Node.js extends the creative potential of people with web development experience, enabling a new generation  of developers to create servers, command-line tools, desktop apps, and even robots.",
    "created_by": "Ryan Dahl",
    "released_at": "May 27, 2009",
    "repositories": 53041,
    "related_topics": [
        "node",
        "node-js",
        "mongodb",
        "gulp",
        "angularjs",
        "javascript",
        "angular",
        "react"
    ]
}
```