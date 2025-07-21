enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

enum Direction2 {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right',
}

// Keine Enums verwenden, weil sie komisch sind...
let i = 0;
for (let d in Direction) {
    // es wird 8x ueber das enum Direction iteriert
    console.log(++i + ': ' + d);
}

// Output
// 1: 1
// 2: 2
// 3: 3
// 4: 4
// 5: Up
// 6: Down
// 7: Left
// 8: Right

// Bessere Alternativen zu Enums
type DirectionType = 'Up' | 'Down' | 'Left' | 'Right';

let direction: DirectionType;
direction = 'Up'; // IntelliSense gibt nur die 4 Moeglichkeiten an
console.log(direction);

// Weitere Alternative zu Enums (String und Number)
const directionObj = {
    Up: 1,
    Down: 2,
    Left: 3,
    Right: 4,
} as const; // Alle Properties zu readonly machen

// as const verhindert die Zuweisung
// directionObj.Down = 34;

// Ueber directionObj iterieren
for (let d in directionObj) {
    const i = d as keyof typeof directionObj;
    console.log(d + ': ' + directionObj[i]);
}

// Typ von directionObj ableiten
type ObjectValues<T> = T[keyof T];
type DirectionType2 = ObjectValues<typeof directionObj>;

let down: DirectionType2 = 2;
