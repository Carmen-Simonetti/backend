class Contador {
    constructor(nombre){
        this.nombre = nombre;
        this.contador = 0;
    }

    static contadorGlobal = 0;

    getResponsable = () => {
        return this.nombre;
    }

    getCuentaGlobal = () => {
        return Contador.contadorGlobal;
    }

    getCuentaIndividual = () => {
        return this.contador;
    }

    contar = () =>{
        this.contador++;
        Contador.contadorGlobal++;
    }
}

const contador1 = new Contador('Miguel');
const contador2 = new Contador('Leandro');

console.log(contador1.getResponsable());
console.log(contador2.getResponsable());
console.log('suma 2 al contador de Miguel');
contador1.contar();
contador1.contar();
console.log('Cuenta individual de Miguel:', contador1.getCuentaIndividual());
console.log('Cuenta global:', contador1.getCuentaGlobal());
console.log('suma 3 al contador de Leandro');
contador2.contar();
contador2.contar();
contador2.contar();
console.log('Cuenta individual de Leandro:', contador2.getCuentaIndividual());
console.log('Cuenta global:', Contador.contadorGlobal);


/* ------------------------------------ Herencia ----------------------------------- */

class Animal {
    constructor(nombre){
        this.nombre = nombre;
    }

    sonido = () => {
        return 'Sonido genérico';
    }

    getNombre = () => {
        return this.nombre;
    }
}

class Perro extends Animal {
    constructor(nombre){
        super(nombre);
    }
}

const perro1 = new Perro('Firulais');

console.log(perro1.getNombre());