const http = require('http'); //importo módulo nativo de node

const products = [
    {
        name: 'prod1',
        price: 100
    },
    {
        name: 'prod2',
        price: 200
    },
    {
        name: 'prod3',
        price: 300
    }
]

const server = http.createServer((req, res)=>{ //con createServer creo el servidor recibe funcion callback q recibe los objetos req y res son 2 obj; en req recibo la info q viene del cliente, q viene del frond; y en res vamos a tener métodos para crear la respuesta q le voy a dar al frond; 
    // console.log(req.url);
    if(req.url === '/'){
        res.end('Mi primer servidor http')
    }
    if(req.url === '/products'){
        res.end(JSON.stringify(products)) //paso el array q esta en formato JavaScript a JSON para q lo pueda leer el cliente 
    }
})

server.listen(8080, ()=>{ //con el metodo listen le digo qué puerto escuchar; recibe numero de puerto (8080 x ej)
    console.log('Server ok, puerto 8080');
})