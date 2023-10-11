import { openDB } from "idb";

// Define the schema
function createDatabase(db) {
  if (!db.objectStoreNames.contains("invoice")) {
    const store = db.createObjectStore("invoice", {
      keyPath: "id",
      autoIncrement: true,
    });
    store.createIndex("arr", "arr", { unique: false });
    store.createIndex("obj", "obj", { unique: false });
    store.createIndex("note", "note", { unique: false });
    store.createIndex("date", "date", { unique: false });
    store.createIndex("total", "total", { unique: false });
    store.createIndex("update", "update", { unique: false });
  }
}

// Open the database
const dbPromise = openDB("InvoiceDB", 2, {
  upgrade(db, oldVersion, newVersion, transaction) {
    createDatabase(db);
    if (!db.objectStoreNames.contains("settings")) {
      const customerStore = db.createObjectStore("settings", {
        keyPath: "id",
        autoIncrement: true,
      });

      customerStore.createIndex("companyName", "companyName", {
        unique: false,
      });
      customerStore.createIndex("companyEmail", "companyEmail", {
        unique: false,
      });
      customerStore.createIndex("companyAddress", "companyAddress", {
        unique: false,
      });
      customerStore.createIndex("companyPhoneNumber", "companyPhoneNumber", {
        unique: false,
      });
      customerStore.createIndex("companyWhatsapp", "companyWhatsapp", {
        unique: false,
      });
    }
  },
});

export default dbPromise;
