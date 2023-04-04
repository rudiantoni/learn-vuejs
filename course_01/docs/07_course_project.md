# Título

- Conteúdo
  - [atualizar](atualizar)

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
    <RouterLink to="/">Início</RouterLink> | 
    <RouterLink to="/pedidos">Pedidos</RouterLink>
  </nav>

  <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  name: 'Navbar',
  components: {
    RouterLink,
    RouterView
  }
}

</script>

<style scoped>

</style>
```

Neste componente, vimos que importamos o *RouterLink* e o *RouterView*.

O *RouterLink* serve para identificarmos uma rota e direcioná-la para um componente.

O *RouterView* serve para indicarmos o local onde o componente será exibido ao ser clicado.

Como por enquanto não estamos chamando nosso componente *Navbar*, vamos chamá-lo no *App*.

```html
<template>
  <Navbar />
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
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
