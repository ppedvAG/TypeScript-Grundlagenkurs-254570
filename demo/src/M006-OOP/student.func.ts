import { Course } from './student.class';

export namespace FuncCourse {
    // Alternative zu Klassen
    export function createStudent(
        firstName: string,
        lastName: string,
        age: number,
        gender: Course.Gender
    ): Course.Student {
        // Lokale Variablen verhalten sich wie Felder in Klassen
        const fullName = `${firstName} ${lastName}`;

        return {
            firstName,
            lastName,
            fullName,
            age,
            gender,
            greet: () => console.log(`${fullName} says "hello"!`),
        };
    }

    // Auch mit "Vererbung"
    export function createVirtualStudent(nickName: string, age: number, gender: Course.Gender): Course.Student {
        // Vererbung mittels Composition geloest
        const student = createStudent(nickName, '', age, gender);

        return {
            ...student,
            greet() {
                // Methode der Baseklasse aufrufen
                student.greet();
                console.log(`Virtual ${nickName} says "hello"!`);
            },
        };
    }
}
