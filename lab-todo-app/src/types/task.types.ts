// Wir definieren die Typinformationen in einem Array für die Prüfung
// der Überladung, da diese Informationen zur Laufzeit entfernt werden würden.
// verschwinden und wir somit keine Prüfung in der Überladung vornehmen können.
export const inputTypes = ['checkbox', 'submit', 'color', 'date', 'number', 'search', 'text'] as const;

// Trick um doppelte Typinformationen zu vermeiden
export type InputType = (typeof inputTypes)[number];

export type Priority = 'important' | 'default' | 'low';
export type Task = {
    id: string;
    title: string;
    completed: boolean;
    priority: Priority;
    userId: number;
    dueDate?: Date;
    labels?: string[];
};
