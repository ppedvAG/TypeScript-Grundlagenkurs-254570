export namespace Course {
    export type Gender = 'male' | 'female' | 'other';

    export interface Student {
        firstName: string;
        lastName: string;
        readonly fullName: string;
        age: number;
        gender: Gender;
        greet(): void;
    }

    export class StudentExplicit implements Student {
        firstName: string;
        lastName: string;
        fullName: string;
        age: number;
        gender: Gender;
        // ganz alter Workaround
        self: StudentExplicit;

        constructor(firstName: string, lastName: string, age: number, gender: Gender) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = `${firstName} ${lastName}`;
            this.age = age;
            this.gender = gender;
            this.self = this;
        }

        greet(): void {
            function greetInternal() {
                // Zugriff auf this nicht moeglich, weil die function ihren eigenen this-Kontext hat
                // console.log(`${this.firstName} says "hello"!`);
            }

            const greetInternalLambda = () => {
                // Zugriff auf this nicht moeglich, weil die function ihren eigenen this-Kontext hat
                console.log(`${this.firstName} says "hello"!`);
            };

            // Hier muessen wir this verwenden
            greetInternalLambda();
        }
    }

    export class StudentShort implements Student {
        constructor(public firstName: string, public lastName: string, public age: number, public gender: Gender) {}

        // Readonly Property
        get fullName(): string {
            return `${this.firstName} ${this.lastName}`;
        }

        greet(): void {
            // Hier muessen wir this verwenden
            console.log(`${this.firstName} says "hello"!`);
        }
    }
}
