# :bamboo: Tienda de Bonsai 

Ecommerce con productos de árboles estilo Bonsai.

## :rocket: Instalar el proyecto
Ejecuta los siguientes comandos:
```
git clone https://github.com/Pablo-gm/bonsai-gomez.git
cd bonsai-gomez
npm install
cp .env.example .env
npm start
```

> Nota:
> El proyecto requiere una conexión a Firebase. Modifica el archivo .env con las credenciales apropiadas.

## :orange_book: Estructura de Firebase
El proyecto requiere de 3 colecciones:

### categories
Se requiere añadir una entrada por cada categoría de producto.
```javascript
{
    name: "Bonsai", // string
    key: "bonsai", // string
}
```

### products
Se requiere añadir una entrada por cada producto.
```javascript
{
    category: "bonsai", // string
    description: "Arbol de Bonsai de la región de Hokkaido en Japón.", // string
    imageUrl: "https://i.imgur.com/aIdJeNH.png", // string
    name: "Hokkaido Blanco", // string
    price: 840, // number
    stock: 20 , // number
}
```

### orders
Las entradas se crean automáticamente con la siguiente estructura:
```javascript
{
    buyer: {
        name: "Mike",
        email: "example@mail.com",
        confirmEmail: "example@mail.com",
        deliveryAddress: "43 High St",
        telephone: "1234",
    },
    date: "July 17, 2022 at 9:05:11 PM UTC-5",
    items: [
        {
            id: "mPK6CwfieWq4sGbnmY0D",
            imageUrl: "https://i.imgur.com/aIdJeNH.png",
            name: "Maceta",
            price: 220,
            quantity: 1
        }
    ],
    shipping: 120
    subtotal: 220
    total: 340
}
```

## :camera: Previews
Home component
![Showing home component](/public/imgs/navigation/home.gif)