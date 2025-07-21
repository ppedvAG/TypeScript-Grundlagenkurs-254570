// Wenn wir ein pure JS package installieren wie z. B. luxon haben wir keine Typinformationen zur Verfuegung.
// `npm install luxon`
import { DateTime } from 'luxon';
// Fehler: Could not find a declaration file for module 'luxon'.

// https://definitelytyped.org bietet declaration file fuer luxon an
// Solution: `npm install --save-dev @types/luxon`

const days = DateTime.fromJSDate(new Date()).daysInMonth;
console.log(`There are ${days} days in this month`);

// in node_modules nach luxon suchen
// dort gibt es eine index.d.ts mit den Typinformationen

// `npm install --save-dev @types/node`
import fs from 'fs';
// https://nodejs.org/api/fs.html

fs.readFile('demo/src/M004-Modules/index.ts', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});

console.log(`PID: ${process.pid}`);
