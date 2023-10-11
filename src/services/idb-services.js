import dbPromise from "../idb";
import newdbPromise from "../idb2";

const createInvoice = async (Invoice) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("invoice", "readwrite");
    const store = tx.objectStore("invoice");
    await store.add(Invoice);
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
    console.log(db.objectStoreNames);
    const tx = db.transaction("settings", "readonly");
    const store = tx.objectStore("settings");
    const invoices = await store.get(1);
    return { success: true, data: invoices };
  } catch (error) {
    console.error("Error reading invoices:", error);
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
};

export default IdbService;
