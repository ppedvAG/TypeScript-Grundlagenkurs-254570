const MY_STRING_READONLY = 'Hello World';

// MY_STRING_READONLY = 'Hello TypeScript';

let explicitStringType: string;
let implicitByAssignment = 'Hello TypeScript';
implicitByAssignment = 'Hello World';
console.log(implicitByAssignment);

// Im Gegensatz zu JS koennen wir hier kein anderen Typen zuweisen
// implicitByAssignment = 42;

// Var sollte nicht verwendet werden
// weil es global sichtbar ist
var notRecommended = 'Hello TypeScript';
notRecommended = 'Hello World';
console.log(notRecommended);

console.log(implicitByAssignment + ' ist vom Typen ' + typeof implicitByAssignment);

let myNumber: number;
myNumber = 42;
myNumber = 12.234;
myNumber = 12e8;
myNumber = 42 / 11; // wird automatisch als double gespeichert
myNumber = 0b10101; // Binaer
myNumber = 0o744; // Octal
myNumber = 0xff; // Hexadezimal

let myBoolean: boolean;
myBoolean = true;
myBoolean = false;
console.log(myBoolean + ' ist vom Typen ' + typeof myBoolean);

// Mit einem 'Union Operator' kombinieren wir mehrere Typen
let myBooleanOrNumber: boolean | number;
myBooleanOrNumber = true;
myBooleanOrNumber = 42;
console.log(myBooleanOrNumber + ' ist vom Typen ' + typeof myBooleanOrNumber);

let anotherNumber: number | undefined; // Nullable in C# entsprechen
console.log(anotherNumber + ' ist vom Typen ' + typeof anotherNumber);

anotherNumber = 42;
console.log(anotherNumber + ' ist jetzt vom Typen ' + typeof anotherNumber);

let nullObject: null = null;
console.log(nullObject + ' ist vom Typen ' + typeof nullObject);
console.log();

// Object-Type-Literal
type User = {
    name: string;
    age: number;
    email: string;
};

// Interface (was voellig anders als in C# und nicht vergleichbar)
interface IUser {
    name: string;
    age: number;
    email: string;
    nickName: string | undefined; // optional (quasi)
    isMarried?: boolean; // optional (absolut)
}

const peter: IUser = {
    name: 'Peter',
    age: 42,
    email: 'j4E2o@example.com',
    nickName: undefined,
    // color: 'red' // geht nicht!
};

// peter.color = 'blue';
console.log(peter + ' ist vom Typen ' + typeof peter); // [object Object]
console.log();

// Arrays in TypeScript
let arrayOfNumbers: number[];
arrayOfNumbers = [1, 2, 3 /* null, undefined */];
arrayOfNumbers[8] = 42;
arrayOfNumbers.push(37);
console.log(arrayOfNumbers);

// let mixedArray: (string | number | null)[];
// oder die generische Schreibweise
let mixedArray: Array<string | number | null>;
mixedArray = ['Hello', 42, null, 'World'];
mixedArray[0] = 42;
console.log(mixedArray);

// let anyArray: any[]; // Equivalent zum JS-Array
let unknownArray: Array<unknown>;
unknownArray = [1, 'Hello', true, null, undefined];
console.log(unknownArray);
console.log('first type of unknownArray: ' + typeof unknownArray[0]);
console.log('second type of unknownArray: ' + typeof unknownArray[1]);

// Union Types
type MixedType = number | undefined | 'default' | 'peter';
let randomVar: MixedType;
randomVar = 42;
randomVar = undefined;
randomVar = 'default';
randomVar = 'peter';
// randomVar = 'hugo'; // geht nicht
console.log(randomVar + ' ist vom Typen ' + typeof randomVar);
console.log();

// Tuples
type StringNumberPair = [string, number];
const pair: StringNumberPair = ['Hello', 42];
pair[1] = 37;
// pair[0] = 0; // geht nicht: weil Typ ein stirng ist
// pair[2] = 'Hello'; // geht nicht: weil IndexOutOfBounds

console.log(pair);
console.log(pair[0] + ' ist vom Typen ' + typeof pair[0]);
console.log(pair[1] + ' ist vom Typen ' + typeof pair[1]);
console.log();
