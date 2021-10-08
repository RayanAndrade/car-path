# Car path
## Teste técnico Softruck cujo objetivo é realizar a animação de um carro em um mapa de acordo com o caminho escolhido

Tabela de conteúdos
=================
* [Status projeto](#status-projeto)
* [Features](#features)
* [Bibliotecas/Frameworks](#bibliotecas-e-frameworks)
* [Modelagem de dados](#modelagem-de-dados)
* [Tecnologias](#tecnologias)


### Status projeto

🚧 Em construção... 🚧


### Features

- [x] Divisão da tela entre componentes
- [x] Compartilhamento de dados entre componentes
- [x] Mapa gerado na tela
- [x] Carro adicionado no lugar do marcador padrão
- [x] Movimentação do carro ao clicar no caminho
- [ ] Animação do carro conforme passa pelo trajeto
- [ ] Utilizar velocidade do carro para realizar o trajeto

### Bibliotecas e Frameworks

- [React](https://pt-br.reactjs.org/) Utilizada devido a grande quantidade de material para estudo e pelo fato de possuir uma comunidade muito ativa. Foi de grande impacto para a curva de aprendizado durante o projeto.
- [Tailwind](https://tailwindcss.com) Utilizado devido a baixa complexidade de aprendizado e pelo grande impacto em um tempo pequeno (evitando muito tempo sendo gasto com a estilização da página de maneira desnecessária).

### Modelagem de dados

Os componentes foram divididos em relação as suas responsabilidades.
- App: É um componente pai, será o único componente injetado diretamente no front. É o componente pai dos demais. Seu state reflete a troca de dados entre os componentes filhos.
- ChooseCar: É o componente filho responsável por receber os dados brutos da aplicação, exibir as rotas na tela para o usuário e, ao selecionar a rota, enviar os dados para o componente do mapa (utilizando state do pai como intermédio, sempre).
- Map: É o componente filho responsável por receber os dados da localização escolhida pelo usuário e exibi-la com a animação do carro.

Os dados fonte para a aplicação são gerados a partir de um arquivo que simula a chamada de uma API e retorna os devidos dados. Armazenados dentro da camada de data, caso necessário expandir a fonte de dados da aplicação.

As imagens são guardadas na pasta img e possuem uma versão em png (para o desenvolvedor) e um base64 (para ser renderizado no front).

Os estilos estão na camada styles, onde estilos genéricos se encontram no index.css e estilos específicos de algum componente são declarados na camada e importados pelo index. 