import { Course } from './student.class';

// export default darf nur einmal pro Datei vorkommen
export default class VirtualStudent extends Course.StudentShort {
    foo: string;
    constructor(nickName: string, age: number, gender: Course.Gender) {
        // this.foo = 'bar'; // Fehler: 'super' must be called before accessing 'this' in the constructor of a derived class.

        // Super muss immer in der ersten Zeile stehen
        super(nickName, '', age, gender);

        this.foo = 'bar';
    }

    override greet(): void {
        // Methode der Baseklasse aufrufen
        super.greet();

        console.log(`Virtual ${this.firstName} says "hello"!`);
    }
}
