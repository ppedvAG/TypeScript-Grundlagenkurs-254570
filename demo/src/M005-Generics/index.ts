// function mit generischem Typargument
function identity<T>(arg: T): T {
    return arg;
}

console.log(identity<string>('Hello World'));
console.log(identity<number>(42));

interface IPerson {
    firstName: string;
    lastName: string;
}

// Wir schraenken den Generic auf IPerson ein
// d. h. wir muessen ein Objekt des Types IPerson uebergeben
// zu lesen: Der Typ T muss das Interface IPerson erweitern (bzw. implementieren)
function addFullNameToPerson<T extends IPerson>(person: T) {
    const obj = Object.assign(person, {
        fullName: `${person.firstName} ${person.lastName}`,
    });
    return obj;
}

// Neuere Kurzform um Objekte zu erweitern
function addFullNameToPersonAlt<T extends IPerson>(person: T): T {
    // Wir geben ein neues Objekt zurueck
    const obj = {
        ...person, // destrukturierung eines Objektes
        fullName: `${person.firstName} ${person.lastName}`,
    };
    return obj;
}

const person: IPerson = {
    firstName: 'Bugs',
    lastName: '🐰',
};

// Wir erweitern das Interface IPerson
interface IPersonWithFullName extends IPerson {
    fullName: string;
}

// Alternative Schreibweise als Type-Alias
type PersonWithFullName = IPerson & {
    fullName: string;
};

console.log('\nBeispiel generics mit constraints');
let personWithFullName: IPersonWithFullName = addFullNameToPerson(person);
console.log(personWithFullName);
console.log(addFullNameToPersonAlt(person));

interface IStudent {
    // Vereinfachte Schreibweise
    greet?(name: string): void;

    // Alternative Schreibweise: Eigenschaft soll vom Typ Function sein
    // Mit dieser Schreibweise koennen wir die Eigenschaft mit '?' optional machen
    greetAlt?: (name: string) => void;
}

// JSON: pure object Definition
const student: IPerson & IStudent = {
    firstName: 'Duffy',
    lastName: '🦆',
    greet: (name: string) => {
        console.log(`hello ${name}`);
    },
};
console.log(student);
if (student.greet) {
    student.greet('Bugs');
}

// Loesung, wenn man auf members des Objekts zugreifen will
// weil wir eine function mit local scope haben
const createStudent = (firstName: string, lastName: string): IPerson & IStudent => {
    return {
        firstName,
        lastName,
        greet: (name: string) => {
            console.log(`${firstName} hello ${name}`);
        },
    };
};

type PersonKeys = keyof IPerson; // 'firstName' | 'lastName'
console.log('Keys von IPerson: ' + Object.keys(person));
console.log('Values von IPerson: ' + Object.values(person));
Object.entries(person).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// Als 2. Typargument wollen wir den Key des uebergebenen Objects verwenden
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
console.log('First Name: ' + getProperty(person, 'firstName'));
console.log('Last Name: ' + getProperty(person, 'lastName'));

// Utility Types
// siehe auch https://www.typescriptlang.org/docs/handbook/utility-types.html

// Partial: Alle Eigenschaften optional machen
type PartialPerson = Partial<IPersonWithFullName>;

const nobody: PartialPerson = {};
console.log('This is nobody: ' + nobody.fullName);

// Pick: Bestimmte Eigenschaften aus Definition nehmen
type LimitedPerson = Pick<IPersonWithFullName, 'firstName' | 'lastName'>;

// Omit: Bestimmte Eigenschaften aus Definition entfernen
type LimitedPersonAlt = Omit<IPersonWithFullName, 'fullName'>;
const simplePerson: LimitedPersonAlt = {
    firstName: 'Taz',
    lastName: '🐶',
    // fullName: 'Taz 🐶', // geht nicht mehr
};

// Return Type einer function verwenden
type PersonFromFunc = ReturnType<typeof addFullNameToPerson>;
console.log('Return Type von addFullNameToPerson: ' + typeof addFullNameToPerson);

// Record beschreibt eine Objekt Definition bzw. in C# eine Dictionary
// (Record<K extends string | number | symbol, T>)
type CatName = 'miffy' | 'boris' | 'garfield';
type CatInfo = {
    age: number;
    color: string;
};
const cats: Record<CatName, CatInfo> = {
    miffy: { age: 10, color: 'gray' },
    boris: { age: 5, color: 'black' },
    garfield: { age: 18, color: 'orange' },
};
console.log(cats);

const telephoneBook: Record<string, number> = {
    'John Doe': 1234567890,
    'Jane Doe': 1234567891,
};
