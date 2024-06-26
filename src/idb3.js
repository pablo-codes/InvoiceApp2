import { openDB } from "idb";

// Define the schema
function createDatabase(db) {
  if (!db.objectStoreNames.contains("products")) {
    const productStore = db.createObjectStore("products", {
      keyPath: "id",
      autoIncrement: true,
    });

    productStore.createIndex("name", "name", {
      unique: false,
    });
    productStore.createIndex("barcode", "barcode", {
      unique: true,
    });
    productStore.createIndex("qty", "qty", {
      unique: false,
    });
    productStore.createIndex("cprice", "cprice", {
      unique: false,
    });
    productStore.createIndex("sprice", "sprice", {
      unique: false,
    });
    productStore.createIndex("cdate", "cdate", {
      unique: false,
    });
    productStore.createIndex("udate", "udate", {
      unique: false,
    });
  }
}

// Open the database
const dbPromise3 = openDB("Product", 1, {
  upgrade(db, oldVersion, newVersion, transaction) {
    createDatabase(db);
  },
});

export default dbPromise3;
