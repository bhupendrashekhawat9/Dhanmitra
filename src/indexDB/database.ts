import { AddIncomePayloadType } from "../types/Income";

// Type for object store names
type ObjectNameType = "Incomes" | "Expenditures" | "Savings" | "Goals" | "EMIs"|"Incomes.Segregation";

// Open or create a database
const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("Dhanmitra", 1); // Database name and version

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;
          
            
            if (!db.objectStoreNames.contains("Incomes.Segregation")) {
                db.createObjectStore("Incomes.Segregation", { keyPath: "id", autoIncrement: false });
            }
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
export const updateData = async (objectName: ObjectNameType, updatedData: any)=> {
  
    const db: IDBDatabase = await openDB() ;
    const transaction:IDBTransaction = db.transaction(objectName, "readwrite");
    const store:IDBObjectStore = transaction.objectStore(objectName);

    const getAllRequest: IDBRequest = store.getAll()
    getAllRequest.onsuccess = (event: Event) => {
  
        const records = getAllRequest.result;
  
        // Find and update the specific record (assuming unique keyPath 'id')
        const index = records.findIndex((record: any) => record.id === updatedData.id);
  
        if (index !== -1) {
          records[index] = updatedData; // Update the record locally
  
          // Save the updated record back to the store
          const putRequest = store.put(records[index]);
  
          putRequest.onsuccess = () => {
            console.log("Data updated successfully:", updatedData);
          };
  
          putRequest.onerror = (event) => {
            console.error("Error updating data:", (event.target as IDBRequest).error);
          };
        } else {
            store.add(updatedData);
        }
      
      };
  
    getAllRequest.onerror = (event) => {
        console.error("Error fetching data:", (event.target as IDBRequest).error);
      };
  }
  
  
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
    
    const db: IDBDatabase = await openDB();
    const transaction:IDBTransaction = db.transaction(objectName, "readonly");
    const store:IDBObjectStore = transaction.objectStore(objectName);

    return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};
export function  getAllKeyValuePairs (storeName: string): Promise<unknown[]> {
    const dbName = "MyDatabase";
    const request = indexedDB.open(dbName);
    return new Promise((resolve,reject)=>{
    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
  
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
  
      const cursorRequest = store.openCursor();
      const keyValuePairs: { key: any; value: any }[] = [];
       

      cursorRequest.onsuccess = (event: Event) => {
        const cursor = (event.target as IDBRequest).result;
  
        if (cursor) {
          keyValuePairs.push({ key: cursor.key, value: cursor.value });
          cursor.continue();
        } else {
          resolve(keyValuePairs)
        }
      };
  
      cursorRequest.onerror = (event) => {
        reject()
        console.error("Error retrieving data with keys:", (event.target as IDBRequest).error);
      };
      
    };
    
    request.onerror = (event: Event) => {
        reject()

        console.error("Error opening database:", (event.target as IDBOpenDBRequest).error);
    };
})
  }
  
  // Example usage
  getAllKeyValuePairs("Incomes.Segregation");
  
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