class Persona {
    constructor(nombre) {
        this.nombre = nombre;
    }

    static variableEstatica = 'Soy una variable estática';

    // getNombre() {
    //     return this.nombre;
    // }

    getNombre = () => {
        return this.nombre;
    }
}

const instancia1 = new Persona('Carlos');
const instancia2 = new Persona('María');

console.log(instancia1.getNombre());
console.log(instancia2.getNombre());

console.log(Persona.variableEstatica);

//Una variable estática es una propiedad que pertenece a la CLASE, NO a los objetos que creás con esa clase.
//?-- La clase es como una “receta”. Los objetos son los “productos” hechos con esa receta. La variable estática está en la receta, no en cada producto.