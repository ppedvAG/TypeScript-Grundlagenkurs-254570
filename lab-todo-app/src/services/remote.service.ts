const url = 'http://localhost:3000/';

export default class RemoteService<T extends { id: string }> {
    private entries: Record<string, T> = {};

    constructor(private showError: <U>(message: U) => void) {}

    async loadItems(): Promise<T[]> {
        try {
            const response = await fetch(url + 'items');
            if (response.ok) {
                this.entries = await response.json();
            } else {
                this.showError(response.statusText);
            }
        } catch (error) {
            this.showError(error);
        }
        return Object.values(this.entries);
    }

    async setItem(item: T): Promise<void> {
        this.entries[item.id] = item;

        try {
            const response = await fetch(url + 'items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                this.showError(response.statusText);
            }
        } catch (error) {
            this.showError(error);
        }
    }

    async deleteItem(id: string): Promise<void> {
        try {
            const response = await fetch('http://localhost:3000/items/' + id, {
                method: 'DELETE',
            });

            if (!response.ok) {
                this.showError(response.statusText);
            } else {
                delete this.entries[id];
            }
        } catch (error) {
            this.showError(error);
        }
    }
}
