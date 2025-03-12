export function dbRequest<T>(request: IDBRequest<T>): Promise<T> {
	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export function addToStore<T>(db: IDBDatabase, storeName: string, data: T): Promise<IDBValidKey> {
	const tx = db.transaction(storeName, "readwrite");
	const store = tx.objectStore(storeName);
	return dbRequest(store.add(data));
}

export function updateStore<T>(db: IDBDatabase, storeName: string, data: T, key?: IDBValidKey): Promise<IDBValidKey> {
	const tx = db.transaction(storeName, "readwrite");
	const store = tx.objectStore(storeName);
	return dbRequest(key ? store.put(data, key) : store.put(data));
}

export function deleteFromStore(db: IDBDatabase, storeName: string, key: IDBValidKey): Promise<void> {
	const tx = db.transaction(storeName, "readwrite");
	const store = tx.objectStore(storeName);
	return dbRequest(store.delete(key));
}

export function getAllFromStore<T>(db: IDBDatabase, storeName: string): Promise<T[]> {
	const tx = db.transaction(storeName, "readonly");
	const store = tx.objectStore(storeName);
	return dbRequest(store.getAll());
}