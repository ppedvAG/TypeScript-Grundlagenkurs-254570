import { promisify } from 'util';

console.log('Start Module 007-Promises');

setTimeout(() => console.log('hello'), 2000);

// Evolutionsschritt 1: Callback functions
// ---------------------------------------

let opIndex = 0;
type FooResult = { bar: number };
let result: FooResult | null = null;

function longRunningOperation<T>(): T {
    console.log('longRunningOperation...' + ++opIndex);
    return {
        bar: 42,
    } as T;
}

const callback = () => (result = longRunningOperation<FooResult>());

// Damit die Operation den "Main-Thread" nicht blockiert, fuehren wir sie asynchron aus
setTimeout(callback, 0);

console.log('Ergebnis der langlaufenden Operation: ' + JSON.stringify(result));
console.log();

// Evolutionsschritt 2: Callback functions in Promises kapseln
// ----------------------------------------------------------
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

function createPromise(delay: number, throwError?: boolean): Promise<FooResult> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const result = longRunningOperation<FooResult>();

                if (throwError === undefined) {
                    throwError = Math.random() > 0.5;
                }

                if (throwError) {
                    throw new Error('Something went wrong by chance!');
                }

                resolve(result);
            } catch (error) {
                reject(error);
            }
        }, delay);
    });
}

function callPromsie(throwError = false) {
    const promise = createPromise(Math.random() * 100, throwError);
    promise
        .then((result) => {
            console.log('Evo2: Promise wurde erledigt: ' + JSON.stringify(result));
        })
        .catch((error: Error) => {
            console.log('Evo2: Promise wurde abgelehnt: ' + error.message);
        })
        .finally(() => {
            console.log('Evo2: Zeug aufraumen!'); // wird immer ausgefuehrt
        });
}

callPromsie(false);
callPromsie(true);

// Problem mit Promises: Callback Hell!!!
// Deshalb fuer bessere Lesbarkeit wurde das async/await-Pattern eingefuehrt

// Evolutionsschritt 3: async/await
// --------------------------------
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

async function fetchDataFromLongRunningOperation(): Promise<FooResult | null> {
    try {
        const result = await createPromise(1000, false);
        await createPromise(1000, true);

        console.log('Evo3 wurde asynchron ausgefuehrt: ' + JSON.stringify(result));
        return result;
    } catch (error) {
        console.log('Evo3 wurde abgelehnt: ' + (error as Error).message);
    }
    return null;
}

fetchDataFromLongRunningOperation();

// Beispiel: API abfragen mit der nodejs fetch API mit Promises
// (modernerer Ersatz fuer den XMLHttpRequest, welcher callbacks benutzt)
// Zwischen XMLHttpRequest (ajax) und fetch gab es noch axios (https://www.npmjs.com/package/axios)
// ----------------------------------------------------------------------
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

const url = 'https://catfact.ninja/fact';

type CatFact = {
    fact: string;
    length: number;
};

async function fetchCatFact() {
    try {
        const response: Response = await fetch(url);
        const result = await response.json();
        console.log('Cat fact: ' + result.fact);
    } catch (error) {
        console.error('Da ist was schief gelaufen', error);
    }
}

// Trick die function synchron ausfuehren zu lassen mit einer selfinvoking function
(async () => {
    await fetchCatFact();
})();

// Beispiel Callback zu einem Promise machen, um es awaiten zu koennen

// npm install -D @types/node um Typinformationen von dem node environment zu bekommen
const debounce1sec = promisify((reject) => setTimeout(() => console.log('Entprellung'), 1000));
(async () => {
    await debounce1sec();
})();

// Ergaenzungen: Generator Functions
// --------------------------------
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

async function* generatePromise(): AsyncGenerator<FooResult, { value: unknown; done: boolean }, unknown> {
    while (true) {
        try {
            const result = await createPromise(1000);
            yield result;
        } catch (error) {
            return {
                value: undefined,
                done: true,
            };
        }
    }
}

console.log('\n\nGenerator Samples');
const generatorResult = generatePromise();
generatorResult.next();
generatePromise().next();
