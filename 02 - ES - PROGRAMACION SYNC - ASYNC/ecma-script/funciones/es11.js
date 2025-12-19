// 0, null, undefined, false, NaN, '' --- falsey values

let altura = 0;

// console.log(altura || 100);  //100

/* --------------------------------- nullish -------------------------------- */

console.log(altura ?? 100);

console.log(false ?? 'falsey');

/* --------------------------- variables privadas --------------------------- */

class Persona {
    #fullName;
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.#fullName = `${firstName} ${lastName}`;
    }

    #createId = () => {
        return `${this.firstName.substring(0, 2)}-${Math.floor(Math.random() * 1000)}`;
    }

    createUser = () => {
        return {
            id: this.#createId(),
            name: this.#fullName
        }
    }
}

const persona = new Persona('Juan', 'Pérez');

// persona.#fullName; // SyntaxError: Private field '#fullName' must be declared in an enclosing class