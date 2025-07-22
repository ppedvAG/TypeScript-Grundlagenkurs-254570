const storageKey = 'TS-Lab_TodoApp';

export default class StorageService<T extends { id: string }> {
    private entries: Record<string, T> = {};

    loadItems(): T[] {
        const json = localStorage.getItem(storageKey);
        if (json) {
            this.entries = JSON.parse(json);
        }
        return Object.values(this.entries);
    }

    setItem(item: T): void {
        this.entries[item.id] = item;
        localStorage.setItem(storageKey, JSON.stringify(this.entries));
    }

    deleteItem(id: string): void {
        delete this.entries[id];
        localStorage.setItem(storageKey, JSON.stringify(this.entries));
    }
}
