import { AddIncomePayloadType } from "../types/Income";

// Type for object store names
type ObjectNameType = "Incomes" | "Expenditures" | "Savings" | "Goals" | "EMIs";

// Open or create a database
const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("MyDatabase", 1); // Database name and version

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains("Incomes")) {
                db.createObjectStore("Incomes", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("Expenditures")) {
                db.createObjectStore("Expenditures", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("Savings")) {
                db.createObjectStore("Savings", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("EMIs")) {
                db.createObjectStore("EMIs", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("Goals")) {
                db.createObjectStore("Goals", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = (event: Event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event: Event) => {
            reject(`IndexedDB error: ${(event.target as IDBOpenDBRequest).error?.message}`);
        };
    });
};

// Add data to the store
export const addData = async (data: unknown, objectName: ObjectNameType): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction(objectName, "readwrite");
    const store = transaction.objectStore(objectName);

    store.add(data);
    transaction.oncomplete;
};

// Get data by ID
export const getData = async (id: number | undefined, objectName: ObjectNameType): Promise<unknown> => {
    const db = await openDB();
    const transaction = db.transaction(objectName, "readonly");
    const store = transaction.objectStore(objectName);

    if (!id) {
        const request = store.getAll();
        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    const request = store.get(id);
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

// Get all data
export const getAllData = async (objectName: ObjectNameType): Promise<unknown[]> => {
    const db = await openDB();
    const transaction = db.transaction(objectName, "readonly");
    const store = transaction.objectStore(objectName);

    return new Promise((resolve, reject) => {
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

// Get all income transactions
export const getAllIncomeTransactions = async (): Promise<AddIncomePayloadType[]> => {
    const data = (await getAllData("Incomes")) as AddIncomePayloadType[];
    return data;
};

// Delete data by ID
export const deleteData = async (id: number, objectName: ObjectNameType): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction(objectName, "readwrite");
    const store = transaction.objectStore(objectName);

    store.delete(id);
     transaction.oncomplete;
};
