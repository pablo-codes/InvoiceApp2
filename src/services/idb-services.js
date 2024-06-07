import dbPromise from "../idb";
import newdbPromise from "../idb2";
import dbPromise3 from "../idb3";

const checkBarcode = async (data) => {
  try {
    if (data.description) {
      const db = await dbPromise3;
      const tx = db.transaction("products", "readwrite");
      const store = tx.objectStore("products");
      const existingRecord = await store.index("name").get(data.description);

      if (existingRecord) {
        // Update the existing record
        await store.put({
          ...existingRecord,
          qty: existingRecord.qty - data.qty,
          udate: Date.now()
        });
        console.log(existingRecord);
      }

      await tx.oncomplete;
      return {
        success: true,
        message: "Product created or updated successfully",
      };
    }
  } catch (error) {
    console.error("Error creating/updating Product:", error);
    return { success: false, message: "Error creating/updating Product" };
  }
};

const createInvoice = async (Invoice) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("invoice", "readwrite");
    const store = tx.objectStore("invoice");
    await store.add(Invoice);
    for (const el of Invoice.arr) {
      checkBarcode(el)
        .then((el) => {
          console.log(el.success);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    await tx.oncomplete;
    return { success: true, message: "Invoice created successfully" };
  } catch (error) {
    console.error("Error creating invoice:", error);
    return { success: false, message: "Error creating invoice" };
  }
};

const createSettings = async (Settings) => {
  try {
    const db = await newdbPromise;
    const tx = db.transaction("settings", "readwrite");
    const store = tx.objectStore("settings");
    const existingRecord = await store.get(1);

    if (existingRecord) {
      const updatedRecord = { ...existingRecord, ...Settings };
      await store.add(updatedRecord);
    } else {
      await store.add(Settings);
    }
    await tx.oncomplete;
    return { success: true, message: "Settings created successfully" };
  } catch (error) {
    console.error("Error creating invoice:", error);
    return { success: false, message: "Error creating setting" };
  }
};

const createProducts = async (Products) => {
  try {
    if (Products.barcode) {
      const db = await dbPromise3;
      const tx = db.transaction("products", "readwrite");
      const store = tx.objectStore("products");
      const existingRecord = await store.index("barcode").get(Products.barcode);
      const date = Date.now()
      if (existingRecord) {
        // Update the existing record
        Products.udate = date
        await store.put({ ...existingRecord, ...Products });
        console.log(existingRecord);
      } else {
        // Add a new record
        Products.cdate = date
        console.log(existingRecord);
        await store.add(Products);
      }

      await tx.oncomplete;
      return {
        success: true,
        message: "Product created or updated successfully",
      };
    }
  } catch (error) {
    console.error("Error creating/updating Product:", error);
    return { success: false, message: "Error creating/updating Product" };
  }
};

const readProducts = async () => {
  try {
    const db = await dbPromise3;
    const tx = db.transaction("products", "readonly");
    const store = tx.objectStore("products");
    const products = await store.getAll();
    return { success: true, data: products };
  } catch (error) {
    console.error("Error reading products:", error);
    return { success: false, message: "Error reading products" };
  }
};

const readInvoices = async () => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("invoice", "readonly");
    const store = tx.objectStore("invoice");
    const invoices = await store.getAll();
    return { success: true, data: invoices };
  } catch (error) {
    console.error("Error reading invoices:", error);
    return { success: false, message: "Error reading invoices" };
  }
};

const readSettings = async () => {
  try {
    const db = await newdbPromise;
    const tx = db.transaction("settings", "readonly");
    const store = tx.objectStore("settings");
    const profile = await store.get(1);
    if (profile === undefined) {
      console.error("Error reading Profile:", 'Create a Profile');
      return { success: false, message: "please create a profile" };
    } else {
      return { success: true, data: profile };
    }

  } catch (error) {
    console.error("Error reading Profile:", error);
    return { success: false, message: "Error reading invoices" };
  }
};

const getInvoice = async (id) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("invoice", "readonly");
    const store = tx.objectStore("invoice");
    const invoice = await store.get(id);

    return { success: true, data: invoice };
  } catch (error) {
    console.error("Error reading invoices:", error);
    return { success: false, message: "Error reading invoices" };
  }
};

const updateInvoice = async (id, data) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("invoice", "readwrite");
    const store = tx.objectStore("invoice");
    const existingData = await store.get(id);

    if (existingData) {
      const updatedObject = { ...existingData, ...data };
      await store.put(updatedObject, id);
      await tx.oncomplete;
      return { success: true, message: "Data updated successfully" };
    } else {
      return { success: false, message: "Data not found" };
    }
  } catch (error) {
    console.error("Error updating invoice:", error);
    return { success: false, message: "Error updating invoice" };
  }
};

const deleteInvoice = async (id) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("invoice", "readwrite");
    const store = tx.objectStore("invoice");
    await store.delete(id);
    await tx.oncomplete;
    return { success: true, message: "invoice deleted successfully" };
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return { success: false, message: "Error deleting invoice" };
  }
};

const deleteALL = async () => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("invoice", "readwrite");
    const store = tx.objectStore("invoice");
    await store.clear();
    await tx.oncomplete;
    return { success: true, message: "db deleted successfully" };
  } catch (error) {
    console.error("Error deleting db :", error);
    return { success: false, message: "Error deleting db" };
  }
};

const lastId = async () => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("invoice", "readonly");
    const store = tx.objectStore("invoice");
    const query = await store.openCursor(null, "prev");

    if (query) {
      // The last ID is the ID of the current cursor.
      const lastId = query.value.id;
      // Close the transaction.
      await tx.oncomplete;

      return { success: true, data: lastId };
    } else {
      // There is no data in the object store.
      return { success: true, data: 1 };
    }
  } catch (error) {
    console.error("Error getting last id :", error);
    return { success: false, message: "Error getting last id" };
  }
};

const Search = async (regexPattern) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("invoice", "readonly");
    const store = tx.objectStore("invoice");

    const matches = [];

    let cursor = await store.openCursor();

    while (cursor) {
      const details = cursor.value.obj;
      if (details && details.name) {
        const regex = new RegExp(regexPattern, "i");
        if (regex.test(details.name)) {
          matches.push(cursor.value);
        }
      }
      cursor = await cursor.continue();
    }
    return { success: true, data: matches };
  } catch (error) {
    return { success: false, message: "No customer name matching the query" };
  }
};

const barcodeSearch = async (regexPattern) => {
  try {
    const db = await dbPromise3;
    const tx = db.transaction("products", "readonly");
    const store = tx.objectStore("products");

    const matches = [];

    let cursor = await store.openCursor();

    while (cursor) {
      const details = cursor.value;
      if (details && details.barcode) {
        const regex = new RegExp(regexPattern, "i");
        if (regex.test(details.barcode)) {
          matches.push(cursor.value);
        }
      }
      cursor = await cursor.continue();
    }
    return { success: true, data: matches };
  } catch (error) {
    return { success: false, message: "No customer name matching the query" };
  }
};
const barcodeandNameSearch = async (regexPattern) => {
  try {
    const db = await dbPromise3;
    const tx = db.transaction("products", "readonly");
    const store = tx.objectStore("products");

    const matches = [];

    let cursor = await store.openCursor();

    while (cursor) {
      const details = cursor.value;
      if (details && details.barcode && details.qty > 0) {
        const regex = new RegExp(regexPattern, "i");
        if (regex.test(details.barcode) || regex.test(details.name)) {
          matches.push(cursor.value);
        }
      }
      cursor = await cursor.continue();
    }
    return { success: true, data: matches };
  } catch (error) {
    return { success: false, message: "No customer name matching the query" };
  }
};

const IdbService = {
  createInvoice,
  readInvoices,
  updateInvoice,
  deleteInvoice,
  getInvoice,
  deleteALL,
  lastId,
  createSettings,
  readSettings,
  Search,
  createProducts,
  readProducts,
  barcodeSearch,
  barcodeandNameSearch,
};

export default IdbService;
