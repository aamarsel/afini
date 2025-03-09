import defaultCategories from './categories.json'

const DB_NAME = "FinanceDB";
const DB_VERSION = 1;
export const STORE_TRANSACTIONS = "transactions";
export const STORE_CATEGORIES = "categories";

let db: IDBDatabase | null = null;

export const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const database = request.result;
            if (!database.objectStoreNames.contains(STORE_TRANSACTIONS)) {
                database.createObjectStore(STORE_TRANSACTIONS, { keyPath: "id" });
            }
            if (!database.objectStoreNames.contains(STORE_CATEGORIES)) {
                const categoryStore = database.createObjectStore(STORE_CATEGORIES, { keyPath: "id" });

                defaultCategories.forEach(category => categoryStore.add(category));
            }
        };

        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
};
