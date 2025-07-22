import { Course } from './student.class';
import { FuncCourse } from './student.func';
import VirtualStudent from './virtualstudent.class';

const hugo: Course.Student = new Course.StudentShort('Hugo', 'Boss', 42, 'male');
hugo.greet();

const peter: Course.Student = new VirtualStudent('Petra', 42, 'female');
peter.greet();

// student.class.js mit es5 ansehen: kein class keyword
console.log();

const julia: Course.Student = FuncCourse.createStudent('Julia', 'Boss', 42, 'female');
julia.greet();

const sam = FuncCourse.createVirtualStudent('Sam', 42, 'other');
sam.greet();
console.log();

console.log('Typ von hugo: ', typeof hugo); // object
console.log('Typ von peter: ', typeof peter); // object
console.log('Typ von julia: ', typeof julia); // object
console.log('Ist hugo ein StudentShort?', hugo instanceof Course.StudentShort); // true
console.log('Ist julia ein StudentShort?', julia instanceof Course.StudentShort); // false
console.log('Ist julia eine createStudent-Function?', julia instanceof FuncCourse.createStudent); // false
console.log('\n');

// Strukturierte Typisierung (Duck Typing)
interface IAnimal {
    name: string;
    makeSound(): void;
}

class Dog implements IAnimal {
    constructor(public name: string) {}
    makeSound(): void {
        console.log('Woof!');
    }
}

const snoopy = new Dog('Snoopy');
snoopy.makeSound();
console.log({
    instanceof: snoopy instanceof Dog, // true
    typeof: typeof snoopy, // object
});

const duffy: IAnimal = {
    name: 'Duffy',
    makeSound(): void {
        console.log('Quack!');
    },
};
duffy.makeSound();

const bunny = {
    name: 'Bugs',
    makeSound(): void {
        console.log('Whats up doc!');
    },
} as IAnimal;
bunny.makeSound();
