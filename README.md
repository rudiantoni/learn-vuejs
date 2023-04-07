# learn-vuejs

Este repositório contém projetos referentes a minha aprendizagem pessoal sobre o framework VueJS feito utilizando a linguagem JavaScript/Typescript.

## Curso 1

Este curso foi feito com base no conteúdo disponibilizado pelo Curso de Vue 3, disponibilizado através do site Youtube, no canal Matheus Battisti - Hora de Codar.

Referências no fim da seção.

### Conteúdo e projetos relacionados

Todos os projetos desenvolvidos possuem o objetivo único de aprender e praticar. Aqui segue uma lista do conteúdo teórico criado e cada projeto relacionado a ele quando aplicável:

| Conteúdo teórico e link do MD | Projeto e link |
|---|---|
| [01 - Iniciando com VueJS e CDN](./course_01/docs/01_iniciando_vuejs_cdn.md) | [01_iniciando_vuejs_cdn](./course_01/01_iniciando_vuejs_cdn/) |
| [02 - Input e data binding](./course_01/docs/02_data_binding.md) | [02_data_binding](./course_01/02_data_binding/) |
| [03 - O CLI do Vue, componentes e dados](./course_01/docs/03_vue_project.md) | [03_vue_project](./course_01/03_vue_project/) |
| [04 - Hooks, diretivas, componentes e argumentos](./course_01/docs/04_hooks_dirs_comps_args.md) | [04_hooks_dirs_comps_args](./course_01/04_hooks_dirs_comps_args/) |
| [05 - Métodos, CSS, listas e eventos](./course_01/docs/05_methods_and_events.md) | [05_methods_and_events](./course_01/05_methods_and_events/) |
| [06 - Reutilização de componentes, props e emit](./course_01/docs/06_advanced_components.md) | [06_advanced_components](./course_01/06_advanced_components/) |
| [07 - Início do projeto Prototipação de API com JSON Server Router e layout base](./course_01/docs/07_course_project.md) | [07_make_your_burger](./course_01/07_make_your_burger/) |
| [07A - HTTP GET para popular dados dinamicamente POST no banco e componente de mensagens](./course_01/docs/07a_course_project.md) | - |
| [07B - Criando tela de Dashboard GET, DELETE e PATCH com fetch() Componente de Mensagem com $refs GET, POST, PATCH e DELETE com api.js](./course_01/docs/07b_course_project.md) | - |

### Observações

#### Inicialização de projetos usando CDN do VueJS com servidor HTTP

Alguns projetos não estão usando a CLI do VueJS, portanto foram executados através de um servidor HTTP Apache em um container Docker, para iniciá-los, basta navegar até a pasta do curso `cd course_01` e iniciar a aplicação com `sh [project_name].sh` e acessar através de http://localhost. É importante observar que ele usa a porta 80, então se tiver algo sendo executado nessa porta a aplicação não vai subir. Ao término da utilização, use Ctrl + C para cancelar e remover o container. Os valores de *[project_name]* podem ser:
- [01_iniciando_vuejs_cdn](./course_01/01_iniciando_vuejs_cdn/)
- [02_data_binding](./course_01/02_data_binding/)

### Referências

Este curso foi feito através do conteúdo apresentado no site [Youtube](http://www.youtube.com):
- Canal: [Matheus Battisti - Hora de Codar](https://www.youtube.com/@MatheusBattisti)
- Playlist: [Curso de Vue 3](https://www.youtube.com/watch?v=wsAQQioPIJs&list=PLnDvRpP8BnezDglaAvtWgQXzsOmXUuRHL&ab_channel=MatheusBattisti-HoradeCodar)
- Repositório do curso [matheusbattisti/curso_vue_yt](https://github.com/matheusbattisti/curso_vue_yt)

| Conteúdo teórico e link do MD | Conteúdo original |
|---|---|
| [01 - Iniciando com VueJS e CDN](./course_01/docs/01_iniciando_vuejs_cdn.md) | [Curso de Vue 3: #01 - Introdução](https://www.youtube.com/watch?v=wsAQQioPIJs&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #02 - Como instalar o Vue (2021)](https://www.youtube.com/watch?v=-w1VVGycLRM&ab_channel=MatheusBattisti-HoradeCodar) |
| [02 - Input e data binding](./course_01/docs/02_data_binding.md) | [Curso de Vue 3: #03 - Inputs e Data Binding](https://www.youtube.com/watch?v=bdD04cHOKfY&ab_channel=MatheusBattisti-HoradeCodar) |
| [03 - O CLI do Vue, componentes e dados](./course_01/docs/03_vue_project.md) | [Curso de Vue 3: #04 - Utilizando o Vue CLI](https://www.youtube.com/watch?v=yrxG24n1oXI&&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #05 - Criando componentes](https://www.youtube.com/watch?v=ec046jmrgXQ&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #06 - Dados em componentes (data)](https://www.youtube.com/watch?v=_BXj6CwuL0Q&ab_channel=MatheusBattisti-HoradeCodar) |
| [04 - Hooks, diretivas, componentes e argumentos](./course_01/docs/04_hooks_dirs_comps_args.md) | [Curso de Vue 3: #07 - Entendendo os Lifecycle hooks (ciclo de vida)](https://www.youtube.com/watch?v=yzXOZZQPSeM&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #08 - Hierarquia de componentes](https://www.youtube.com/watch?v=H5PopRSJBTY&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #09 - Conhecendo as diretivas (v-if, v-show, v-for)](https://www.youtube.com/watch?v=5XJHIoK_nHU&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #10 - Atributos dinâmicos](https://www.youtube.com/watch?v=FtcreaLDeWA&ab_channel=MatheusBattisti-HoradeCodar) |
| [05 - Métodos, CSS, listas e eventos](./course_01/docs/05_methods_and_events.md) | [Curso de Vue 3: #11 - Métodos](https://www.youtube.com/watch?v=745aPtV_W60&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #12 - CSS Scoped e CSS global](https://www.youtube.com/watch?v=kMpeOHM4fZg&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #13 - Renderização de listas (v-for)](https://www.youtube.com/watch?v=GvGYlBYtlAk&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #14 - Eventos (@submit e @click)](https://www.youtube.com/watch?v=h8Z-pRhe-dw&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #15 - Múltiplos eventos](https://www.youtube.com/watch?v=AKXG0SblA1w&ab_channel=MatheusBattisti-HoradeCodar) |
| [06 - Reutilização de componentes, props e emit](./course_01/docs/06_advanced_components.md) | [Curso de Vue 3: #16 - Reutilização de componentes](https://www.youtube.com/watch?v=njcYIgHhFMc&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #17 - Utilizando props](https://www.youtube.com/watch?v=-B78d9052zY&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #18 - Emit](https://www.youtube.com/watch?v=RXldGbtzZdI&ab_channel=MatheusBattisti-HoradeCodar) |
| [07 - Início do projeto Prototipação de API com JSON Server Router e layout base](./course_01/docs/07_course_project.md) | [Curso de Vue 3: #19 - Criando o projeto do curso](https://www.youtube.com/watch?v=CtVhIITICF8&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #20 - Criando uma API com JSON server](https://www.youtube.com/watch?v=bleEztMsSDk&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #21 - Implementando o Vue Router](https://www.youtube.com/watch?v=B5NX9oPf5fI&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #22 - Finalizando cabeçado e rodapé do projeto](https://www.youtube.com/watch?v=UyOv6PTY50Y&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #23 - Criando banner da aplicação](https://www.youtube.com/watch?v=ihCBurkrFyc&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #24 - Criando formulário de cadastro](https://www.youtube.com/watch?v=mCfqTo9LdL8&ab_channel=MatheusBattisti-HoradeCodar) |
| [07A - HTTP GET para popular dados dinamicamente POST no banco e componente de mensagens](./course_01/docs/07a_course_project.md) | [Curso de Vue 3: #25 - Resgatando dados do banco e inserindo no formulário](https://www.youtube.com/watch?v=DxYc2CUan_4&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #26 - Inserindo dados no banco](https://www.youtube.com/watch?v=Z5eTqFtCZHk&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #27 - Criando componente de mensagens do sistema](https://www.youtube.com/watch?v=5WXWoe2t_00&ab_channel=MatheusBattisti-HoradeCodar) |
| [07B - Criando tela de Dashboard GET, DELETE e PATCH com fetch() Componente de Mensagem com $refs GET, POST, PATCH e DELETE com api.js](./course_01/docs/07b_course_project.md) | [Curso de Vue 3: #28 - Criando a tela de pedidos (Dashboard)](https://www.youtube.com/watch?v=a5ALeXKWGJM&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #29 - Resgatando pedidos do banco](https://www.youtube.com/watch?v=noQdE8weGv4&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #30 - Recebendo os status dos pedidos](https://www.youtube.com/watch?v=a7Z-hoIfAnE&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #31 - Removendo pedidos do sistema](https://www.youtube.com/watch?v=u8Nb1SBX-GQ&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #32 - Atualização de pedidos](https://www.youtube.com/watch?v=_i-vRSlKgkI&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #33 - Mensagens nas atualizações e remoções de pedido](https://www.youtube.com/watch?v=Rq51X_-0QaU&ab_channel=MatheusBattisti-HoradeCodar)<br>[Curso de Vue 3: #34 - Conclusão do curso](https://www.youtube.com/watch?v=DU2mQusXf-s&ab_channel=MatheusBattisti-HoradeCodar) |
