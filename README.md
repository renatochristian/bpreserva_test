# BPReserva

Projeto de teste para entrega do BPReserva, um sistema de cadastro de clientes e corretores para agendamento de reuniões


## Funcionalidades solicitadas

Observação: Nesse desafio persista os dados da maneira como preferir, pode usar um backend próprio, um Baas ou o próprio localstorage 
- utilizado um container no docker para rodar o backend da aplicação.

Desafio

1 - Deverá ser criado um CRUD de cadastro de usuários. Os usuários do Reserva BP podem ser Corretores de Seguro ou Clientes, utilize Vuejs; 
Crud criado, funções de remove e update a serem reimplementadas usando backend do docker

2 - Deverá ser criado uma tela de login para gerenciar a autenticação;  (criado, não consegui criar um controle de rotas obrigatório dentro da aplicação)

4 Deverá ser criado um sistema de agendamento entre Clientes e Corretores de Seguro:
 - Esse sistema poderá agendar reuniões de 30 minutos a 2 horas; - verificado
 - O Cliente escolhe o Consultor e a Data e a Duração que deseja agendar; - verificado
 - Caso um Cliente tente agendar em um horário ocupado com determinado Corretor de Seguro, deve receber uma mensagem notificando que o Corretor está ocupado; - verificado
 - Um Corretor de Seguro não pode agendar um horário; - não implementado

5 - Utilize alguma biblioteca comum de de estilização(Chakra UI, Material UI, Tailwind) - utilizado

6 - Utilize SSR – usado

7 - Crie um gerenciamento de erros amigável para o usuário - implementado toasts para aviso ao usuário e redirect para login em caso de acesso a paginas inexistentes, sem page 404 desenvolvida

8 - Utilize Composition API - utilizado

9 - O desafio deverá ser feito em Typescript; - não utilizado

10 - Testes; - nao realizado

11 - Faça um vídeo de no máximo 5 minutos mostrando o funcionamento da aplicação e justificando suas escolhas;

12 - Faça uma Documentação no README da aplicação; - realizado

13 - Coloque seu código no Github. - realizado


Para execução da aplicação, baixe via link do github para a maquina do usuário, em seguida execute os comandos

- npm install
- npm run dev (para visualização local)
- npm run build (para realizar o build do projeto)
- npm run serve (para execução em modo de produção usando SSR)

para executar o backend da aplicação:
cd backend
npm run container - (o projeto inicializará no docker na porta local :3000)

O projeto conta com 3 telas
/login
/usuarios
/agendamentos

não foi desenvolvido a tela de profile onde se poderia editar os dados do usuário.
Adições futuras
 * variaveis globais ao projeto (setCurrentUser);
 * Finalizar o cadastro de agendamentos e controle de telas (Corretor apenas acessa os agendamentos para seu usuário, cliente acessa apenas os agendamentos criados por ele mesmo)
 * controle de rotas e autenticação (o projeto nao impede que as outras telas sejam acessadas sem o login do usuário, imcompleto)
 * testes na aplicação (não foram realizados testes devido a falta de avanço no projeto para chegar neles)
 * Typescript (falta de familiaridade no uso)
