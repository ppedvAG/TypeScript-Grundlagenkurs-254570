import type { Priority, Task } from '../types/task.types';

// Wenn wir ein pure JS package installieren wie z.B. luxon haben wir keine Typinformationen zur Verfügung und damit kein Intellisense usw.
// Dieses Problem lässt sich losen mit Hilfe von definitelytyped (https://definitelytyped.org/) welches declartion files fuer viele gängige packages bietet.
// `npm install -D @types/luxon`
import { DateTime } from 'luxon';

const taskList: Task[] = [];
const prioMapper: Record<number, Priority> = ['low', 'default', 'important'];

export function isDued(task: Task): boolean {
    if (!task.dueDate) {
        return false;
    }
    return DateTime.fromJSDate(task.dueDate) < DateTime.now();
}

export function fullTitle(task: Task): string {
    const relativeTime = task.dueDate ? DateTime.fromJSDate(task.dueDate).toRelative() : '';
    return relativeTime ? `${task.title} (${relativeTime})` : task.title;
}

export function priorityFromNumber(number: number): Priority {
    return prioMapper[number];
}

export function addTaskItem(text: string, dueDate: Date | undefined, labels: string, priority: Priority): Task {
    const task: Task = {
        id: `${taskList.length + 1}`,
        userId: 0,
        title: text,
        labels: labels.split(','),
        completed: false,
        priority,
        dueDate,
    };
    taskList.push(task);
    return task;
}
