import { openDB } from "idb";

// Define the schema
function createDatabase(db) {
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
}

// Open the database
const newdbPromise = openDB("User", 1, {
  upgrade(db, oldVersion, newVersion, transaction) {
    createDatabase(db);
    
  },
});

export default newdbPromise;
