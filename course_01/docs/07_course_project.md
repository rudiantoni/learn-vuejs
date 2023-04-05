# Início do projeto, prototipação de API com JSON Server, Router e layout base

- Conteúdo
  - [Criando o projeto do curso](#criando-o-projeto-do-curso)
  - [Criando uma API com JSON server](#criando-uma-api-com-json-server)
    - [Instalando a dependência](#instalando-a-dependência)
    - [Criando o banco de dados](#criando-o-banco-de-dados)
    - [Executando](#executando)
  - [Implementando o Vue Router](#implementando-o-vue-router)
    - [Criando os arquivos de componentes alvo](#criando-os-arquivos-de-componentes-alvo)
    - [Criando o componente wrapper de rotas](#criando-o-componente-wrapper-de-rotas)
    - [Relacionando as rotas com os componentes](#relacionando-as-rotas-com-os-componentes)
  - [Finalizando cabeçalho e rodapé do projeto](#finalizando-cabeçalho-e-rodapé-do-projeto)
  - [Criando banner da aplicação](#criando-banner-da-aplicação)
  - [Criando formulário de cadastro](#criando-formulário-de-cadastro)

## Criando o projeto do curso

- Vamos usar o comando `npm init vue@latest` para criar um novo projeto
- Como nome do projeto: `07_make_your_burger`
- Nesse projeto vamos usar o Router.
- Navegar até a pasta do projeto: `cd 07_make_your_burger`
- Instalar as dependências: `npm install`
- Executar o projeto: `npm run dev`

## Criando uma API com JSON server

### Instalando a dependência

- Navegar até a raiz do projeto
- Usar o comando `npm install json-server --save-dev` para instalar a dependência como de desenvolvimento
  - Assim ela será salva na seção *devDependencies*, se quiser salvar no *dependencies* usar o comando `npm install json-server`.

### Criando o banco de dados

Para podermos executar o backend falso, aqui usando o json-server, vamos criar um script novo no package.json, vamos preenchê-lo assim:

```json
{
  ...
  "scripts": {
    ...
    "backend": "json-server --watch db/db.json"
    ...
  }
  ...
}  
```

Aqui estamos criando um novo script para ser executado com o `npm run`, será usado como `npm run backend`.

Neste comando estamos iniciando o json-server apontando um novo arquivo para ele usar como banco de dados: `db/db.json`.

Sendo assim vamos criar uma pasta *db* na raiz do projeto e então o arquivo *db.json*. Popular ele com o conteúdo:

```json
{
  "ingredientes": {
    "paes": [
      {
        "id": 1,
        "tipo": "Italiano Branco"
      },
      {
        "id": 2,
        "tipo": "3 Queijos"
      },
      {
        "id": 3,
        "tipo": "Parmesão e Orégano"
      },
      {
        "id": 4,
        "tipo": "Integral"
      }
    ],
    "carnes": [
      {
        "id": 1,
        "tipo": "Maminha"
      },
      {
        "id": 2,
        "tipo": "Alcatra"
      },
      {
        "id": 3,
        "tipo": "Picanha"
      },
      {
        "id": 4,
        "tipo": "Veggie burger"
      }
    ],
    "opcionais": [
      {
        "id": 1,
        "tipo": "Bacon"
      },
      {
        "id": 2,
        "tipo": "Cheddar"
      },
      {
        "id": 3,
        "tipo": "Salame"
      },
      {
        "id": 4,
        "tipo": "Tomate"
      },
      {
        "id": 4,
        "tipo": "Cebola roxa"
      },
      {
        "id": 4,
        "tipo": "Pepino"
      }
    ]
  },
  "status": [
    {
      "id": 1,
      "tipo": "Solicitado"
    },
    {
      "id": 2,
      "tipo": "Em produção"
    },
    {
      "id": 3,
      "tipo": "Finalizado"
    }
  ],
  "burgers": [
  ]
}
```

### Executando

Agora, para executar o backend, basta executar na raiz do projeto, o comando `npm run backend`.

O JSON Server será iniciado, e disponibilizará os endpoints disponíveis.

Por padrão ele inicia na porta 3000.

## Implementando o Vue Router

### Criando os arquivos de componentes alvo

Primeiramente, vamos criar dois componentes para testar o nosso router:

**Home.vue**

```html
<template>
  <h1>Home</h1>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>

</style>
```

**Pedidos.vue**

```html
<template>
  <h1>Pedidos</h1>
</template>

<script>
export default {
  name: 'Pedidos'
}
</script>

<style scoped>

</style>
```

### Criando o componente wrapper de rotas

Feito isso, vamos criar um componente wrapper do Router, como um navbar que vai os chamar:

**Navbar.vue**

```html
<template>
  <div>
    <nav id="navbar">
      <router-link to="/">Início</router-link> |
      <router-link to="/pedidos">Pedidos</router-link>
    </nav>
    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}

</script>

<style scoped>

</style>
```

Neste componente, vimos que estamos usando (mesmo sem importar) tags diferentes no template:

São as tags os componentes *router-link* e *router-view*, que não passam de atalhos para os componentes *RouterLink* e o *RouterView*, respectivamente.

Como se trata de um componente que automaticamente é inserido no *main.js*, ele já está importado em todo o projeto, então não é necessário importá-lo nos componentes para usá-lo.

O *RouterLink* serve para identificarmos uma rota e direcioná-la para um componente.

O *RouterView* serve para indicarmos o local onde o componente será exibido ao ser clicado. Aqui ele está comentado para mostrar que ele pode ser exibido em outro local.

Como por enquanto não estamos chamando nosso componente *Navbar*, vamos chamá-lo no *App*, aproveitando para chamar o *RouterView* para demonstrar que ele pode ser inserido em qualquer local. Aqui também vai um componente extra *Footer*, que possui apenas um parágrafo então não vamos especificar agora.

```html
<template>
  <Navbar />
  <router-view />
  <Footer />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>
```

### Relacionando as rotas com os componentes

Agora, vamos fazer o relacionamento de rotas no arquivo de configuração que normalmente fica em: `/src/router/index.js`

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
//import Pedidos from '../views/Pedidos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: () => import('../views/Pedidos.vue')
    },
  ]
})

export default router
```

Note que as duas maneiras (uma comentada) são válidas para importar os componentes.

## Finalizando cabeçalho e rodapé do projeto

**Home.vue**

```html
<p>banner</p>
<div class="main-container">
  <h1>Monte o seu burger:</h1>
  <p>formulário</p>
</div>
```

```javascript
export default {
  name: 'Home'
}
```

**App.vue**

```html
<Navbar :logo="logo_src" :alt="app_name" />
<router-view />
<Footer />
```

```javascript
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      logo_src: '/img/logo.png',
      app_name: 'Make Your Burger'
    }
  }
}
```

```css
* {
  font-family: Helvetica;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.main-container {
  margin: 50px;
  min-height: 250px;
}

h1 {
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #222;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
```

**Navbar.vue**

```html
<div>
  <nav id="navbar">
    <router-link id="logo-url" to="/"><img id="logo" :src="logo" :alt="alt" /></router-link>
    <router-link to="/">Início</router-link>
    <router-link to="/pedidos">Pedidos</router-link>
  </nav>
</div>
```

```javascript
export default {
  name: 'Navbar',
  props: ["logo", "alt"]
}
```

```css
#navbar {
  background-color: #222;
  border-bottom: 4px solid #111;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#navbar #logo-url {
  margin: auto;
  margin-left: 0;
}

#logo {
  width: 40px;
  height: 40px;
}

#navbar a {
  color: #FCBA03;
  text-decoration: none;
  margin: 12px;
  transition: 0.5s;
}

#navbar a:hover {
  color: #FFF;
}
```

**Footer.vue**

```html
<footer id="footer">
    <p>Make Your Burger &copy; 2023</p>
</footer>
```

```javascript
export default {
  name: 'Footer'
}
```

```css
#footer {
  height: 200px;
  background-color: #222;
  border-top: 4px solid #111;
  color: #FCBA03;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  margin-top: auto;
  width: 100%;
}
```

## Criando banner da aplicação

**Home.vue**

```html
<Banner />
<div class="main-container">
  <h1>Monte o seu burger:</h1>
  <p>formulário</p>
</div>
```

```javascript
import Banner from '../components/Banner.vue';

export default {
  name: 'Home',
  components: {
    Banner
  }
}
```

**Banner.vue**

```html
<div id="main-banner">
  <h1>Make Your Burger</h1>
</div>
```

```javascript
export default {
  name: 'Banner'
}
```

```css
#main-banner {
  background-image: url('/img/burger.jpg');
  background-position: 0 -250px;
  background-size: cover;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
#main-banner h1 {
  color: #FFF;
  text-align: center;
  font-size: 60px;
  background-color: #222;
  padding: 20px 40px;
}
```

## Criando formulário de cadastro

**Home.vue**

```html
<Banner />
<div class="main-container">
  <h1>Monte o seu burger:</h1>
  <BurgerForm />
</div>
```

```javascript
import Banner from '../components/Banner.vue';
import BurgerForm from '../components/BurgerForm.vue';

export default {
  name: 'Home',
  components: {
    Banner,
    BurgerForm
  }
}
```
