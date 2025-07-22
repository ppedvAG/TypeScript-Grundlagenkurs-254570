// Wenn wir ein pure JS package installieren wie z.B. luxon haben wir keine Typinformationen zur Verfügung und damit kein Intellisense usw.
// Dieses Problem lässt sich losen mit Hilfe von definitelytyped (https://definitelytyped.org/) welches declartion files fuer viele gängige packages bietet.
// `npm install -D @types/luxon`
import { DateTime } from 'luxon';
import type { Priority, Task } from '../types/task.types';
import { nanoid } from 'nanoid';

const prioMapper: Record<number, Priority> = ['low', 'default', 'important'];

export default class TaskItem implements Task {
    // Properties aus Task
    id: string;
    title: string;
    completed = false;
    priority: Priority = 'default';
    userId = 0;
    dueDate?: Date;
    labels: string[];

    get fullTitle(): string {
        if (this.dueDate) {
            return `${this.title} (${this.relativeDueDate})`;
        }
        return this.title;
    }

    get isDued(): boolean {
        return this.dueDateTime ? this.dueDateTime < DateTime.now() : false;
    }

    get relativeDueDate(): string {
        return this.dueDateTime?.toRelative() ?? '';
    }

    get dueDateTime() {
        if (typeof this.dueDate === 'string') {
            return DateTime.fromISO(this.dueDate);
        }
        return this.dueDate ? DateTime.fromJSDate(this.dueDate) : undefined;
    }

    constructor(title: string, dueDate?: Date, priority?: number, labels: string[] = []) {
        this.id = nanoid();
        this.title = title;
        this.dueDate = dueDate;
        this.labels = labels;
        this.userId = 0;
        this.priority = priority !== undefined ? prioMapper[priority] : 'default';
    }

    static fromTask(task: Task): TaskItem {
        return Object.assign(new TaskItem(task.title), task);
    }
}
