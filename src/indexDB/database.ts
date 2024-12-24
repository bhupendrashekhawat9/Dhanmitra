import { AddIncomePayloadType, IncomeType } from "../types/Income";

// Open or create a database
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('MyDatabase', 1); // Database name and version

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('Incomes')) {
                db.createObjectStore('Incomes', { keyPath: 'id',autoIncrement:true }); // Create store with keyPath
            }
            if (!db.objectStoreNames.contains('Expenditures')) {
                db.createObjectStore('Expenditures', { keyPath: 'id',autoIncrement:true }); // Create store with keyPath
            }
            if (!db.objectStoreNames.contains('Savings')) {
                db.createObjectStore('Savings', { keyPath: 'id',autoIncrement:true }); // Create store with keyPath
            }
            if (!db.objectStoreNames.contains('EMIs')) {
                db.createObjectStore('EMIs', { keyPath: 'id',autoIncrement:true }); // Create store with keyPath
            }
            if (!db.objectStoreNames.contains('Goals')) {
                db.createObjectStore('Goals', { keyPath: 'id',autoIncrement:true }); // Create store with keyPath
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(`IndexedDB error: ${event.target.errorCode}`);
        };
    });
};

type objectNameType = "Incomes"|"Expenditures"|"Savings"|"Goals"|"EMIs"

// Add data to the store
export const addData = async (data:unknown,objectName:objectNameType) => {
    const db = await openDB();
    const transaction = db.transaction(objectName, 'readwrite');
    const store = transaction.objectStore(objectName);
        
    store.add(data);
    return transaction.complete;
};
// Get data by ID
export const getData = async (id,objectName:objectNameType) => {
    const db = await openDB();
    const transaction = db.transaction(objectName, 'readonly');
    const store = transaction.objectStore(objectName);
    if(!id){
        let request =  store.getAll()
        return new Promise((resolve,reject)=>{
            request.onsuccess = ()=>{
                resolve(request.result);
            }
        })
    }
    return store;
};
export const getAllData = async (objectName:objectNameType) => {
    const db = await openDB();
    const transaction = db.transaction(objectName, "readonly");
    const store = transaction.objectStore(objectName);
  
    return new Promise((resolve, reject) => {
      const request = store.getAll();
  
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        console.error("Error retrieving data:", request.error);
        reject(request.error);
      };
    });
  };
  export const getAllIncomeTransactions = async (objectName) => {
        let data : AddIncomePayloadType[] = await getAllData(objectName) as AddIncomePayloadType[];
        return data
  };
// Delete data by ID
export const deleteData = async (id,objectName:objectNameType) => {
    const db = await openDB();
    const transaction = db.transaction(objectName, 'readwrite');
    const store = transaction.objectStore(objectName);
    store.delete(id);
    return transaction.complete;
};

// Example Usage
