let value: unknown = 'Hello World';
value = 10; // okay, Wert ist jetzt eine number
// value.toFixed(); // Fehler, weil value unknown ist

let number = 42;
number.toFixed(2); // .toFixed() ist eine Methode von number

// Type Assertion (!= Type Casting in C#, d. h. der Typ wird nicht umgewandelt
// sondern wir sagen dem TS-Compiler, dass es sich um eine Zahl handelt)
let newValue = (<number>value).toFixed(2);
let newValue2 = (value as number).toFixed(2); // exakt gleich wie oben
console.log('newValue: ' + newValue2);

// Wenn Typ nicht passt, bekommen wir einen Laufzeitfehler
value = 'string';
// Laufzeitfehler: value.toFixed is not a function
// let stringValue = (<number>value).toFixed(2);

// Narrowing (Operatoren)
const someDate = new Date(1990, 1, 1);
console.log('typeof someDate is ' + typeof someDate); // object
console.log('someDate instanceof Date is ' + (someDate instanceof Date)); // true
// in prueft ob der Key eines Objekts vorhanden ist
console.log('is getFullYear in someDate ' + ('getFullYear' in someDate)); // true, someDate hat die Methode getFullYear')); // true

interface IDate {
    year: number;
    month: number;
    day: number;
}

const date: IDate = {
    year: 1990,
    month: 1,
    day: 1,
};
console.log('typeof date is ' + typeof date); // object
console.log('date instanceof Date is ' + (date instanceof Date)); // false
console.log('is year in date ' + ('year' in date)); // true
console.log('is getFullYear in date ' + ('getFullYear' in date)); // false
console.log();

// Ueberladungen definieren
function someAmbiguousFunction(stringValue: string): void;
function someAmbiguousFunction(numberValue: number): void;
// Die eigentliche Implementierung der Funktion
function someAmbiguousFunction(stringOrNumber: string | number): void {
    if (typeof stringOrNumber === 'number') {
        const valueAsString = stringOrNumber.toFixed(2);
        console.log('valueAsString: ' + valueAsString);
    } else if (stringOrNumber.match('Hallo')) {
        console.log('tsc weiß, dass value ein string ist');
    }
}

// IntelliSense zeigt mir die 2 Moeglichkeiten an
someAmbiguousFunction('Hello');

console.log(); // Leerzeile

// Type Casting vs. Type Assertion
let someNumberString = '0';
// let someNumber = <number>someNumberString; // Geht nicht weil Type Assertion und keine Umwandlung
let num1 = parseInt(someNumberString); // Umwandlung zu number
let num2 = Number(someNumberString); // Umwandlung zu number
let numShort = +someNumberString; // Umwandlung zu number (JS-Feature)
console.log('num1: ' + num1, typeof num1);

let bool = Boolean(num2);
let boolShort = !!num2; // Kurzform: doppelte Negation
console.log('bool: ' + bool, typeof bool);

let boolAsString = bool.toString();
let boolAsStringShort = String(bool);
console.log('boolAsString: ' + boolAsString, typeof boolAsString);

let undefinedBool: boolean;
let undefinedBoolAsString = `${undefinedBool!}`; // mit ! koennen wir erzwingen, dass die Variable definiert sei
console.log('undefinedBoolAsString: ' + undefinedBoolAsString, typeof undefinedBoolAsString); // undefined
console.log();

function repeatString(text: string, times?: number): string | undefined {
    if (times !== undefined && times | 0) {
        return text.repeat(times || 1);
    }
    return undefined;
}

function repeatStringDefault(text: string, times = 5): string {
    return text.repeat(times);
}

console.log('1 star', repeatString('🌟', 1));
console.log('5 star', repeatStringDefault('🌟'));

let add = (a: number, b: number): number => a + b;
console.log('add 10 + 20 = ' + add(10, 20));

// String templates sind eine Kombination aus Verbatim und Interpolation aus C#
console.log(`
String templates with variables
 ${add(10, 20)}
 and very long string
 ${repeatStringDefault('🌟', 10)}
`);

function myGreeting(strings: TemplateStringsArray, personExp: string, ageExp: number): string {
    const ageStr = ageExp < 100 ? 'youngster' : 'centenearian';
    return strings[0] + personExp + strings[1] + ageStr + strings[2];
}

const alex = 'Alex';
const age = 42;
const output = myGreeting`Hello ${alex}, you are ${age} years old.`;
console.log(output);

function print(strings: string | string[] | null) {
    // Pruefung auf obeject unsicher, weil kann array oder null
    // if (typeof strings === 'object') {
    if (Array.isArray(strings)) {
        for (const s of strings) {
            console.log(s);
        }
    } else if (typeof strings === 'string') {
        console.log(strings);
    } else {
        console.log('strings ist null');
    }
}

print('Hello');
print(['Hello', 'World']);
print(null);

function printParams(...strings: string[]) {
    for (const s of strings) {
        console.log(s);
    }
}
