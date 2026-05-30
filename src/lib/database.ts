export interface Product {
  id: string;
  name: string;
  code: string;
  regularPrice: number;
  minSellingPrice: number;
  stock: number;
  photo?: string; // base64 encoded
  createdAt: number;
  updatedAt: number;
}

export interface ShopExpense {
  id: string;
  amount: number;
  date: number;
  description: string;
  createdAt: number;
  updatedAt: number;
}

export interface Sale {
  id: string;
  customerName: string;
  phoneNumber: string;
  productId: string;
  productName: string;
  quantity: number;
  totalBill: number;
  paymentStatus: 'cash' | 'due';
  date: number;
  createdAt: number;
  updatedAt: number;
}

export interface PersonalExpense {
  id: string;
  initialBalance: number;
  expenses: {
    id: string;
    amount: number;
    purpose: string;
    date: number;
    createdAt: number;
  }[];
  createdAt: number;
  updatedAt: number;
}

class Database {
  private dbName = 'BusinessExpenseManager';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Products store
        if (!db.objectStoreNames.contains('products')) {
          const productStore = db.createObjectStore('products', { keyPath: 'id' });
          productStore.createIndex('code', 'code', { unique: true });
          productStore.createIndex('createdAt', 'createdAt');
        }

        // Shop Expenses store
        if (!db.objectStoreNames.contains('shopExpenses')) {
          const expenseStore = db.createObjectStore('shopExpenses', { keyPath: 'id' });
          expenseStore.createIndex('date', 'date');
          expenseStore.createIndex('createdAt', 'createdAt');
        }

        // Sales store
        if (!db.objectStoreNames.contains('sales')) {
          const salesStore = db.createObjectStore('sales', { keyPath: 'id' });
          salesStore.createIndex('date', 'date');
          salesStore.createIndex('productId', 'productId');
          salesStore.createIndex('paymentStatus', 'paymentStatus');
          salesStore.createIndex('createdAt', 'createdAt');
        }

        // Personal Expenses store
        if (!db.objectStoreNames.contains('personalExpenses')) {
          db.createObjectStore('personalExpenses', { keyPath: 'id' });
        }
      };
    });
  }

  private getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    if (!this.db) throw new Error('Database not initialized');
    return this.db.transaction(storeName, mode).objectStore(storeName);
  }

  // Products
  async addProduct(product: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.getStore('products', 'readwrite').add(product);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async updateProduct(product: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.getStore('products', 'readwrite').put(product);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async deleteProduct(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.getStore('products', 'readwrite').delete(id);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getProduct(id: string): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      const request = this.getStore('products').get(id);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      const request = this.getStore('products').getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  // Shop Expenses
  async addShopExpense(expense: ShopExpense): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.getStore('shopExpenses', 'readwrite').add(expense);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async updateShopExpense(expense: ShopExpense): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.getStore('shopExpenses', 'readwrite').put(expense);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async deleteShopExpense(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.getStore('shopExpenses', 'readwrite').delete(id);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAllShopExpenses(): Promise<ShopExpense[]> {
    return new Promise((resolve, reject) => {
      const request = this.getStore('shopExpenses').getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  // Sales
  async addSale(sale: Sale): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.getStore('sales', 'readwrite').add(sale);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async updateSale(sale: Sale): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.getStore('sales', 'readwrite').put(sale);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async deleteSale(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.getStore('sales', 'readwrite').delete(id);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAllSales(): Promise<Sale[]> {
    return new Promise((resolve, reject) => {
      const request = this.getStore('sales').getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  // Personal Expenses
  async setPersonalExpenses(expenses: PersonalExpense): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = this.getStore('personalExpenses', 'readwrite');
      const request = store.put(expenses);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getPersonalExpenses(): Promise<PersonalExpense | null> {
    return new Promise((resolve, reject) => {
      const request = this.getStore('personalExpenses').getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const results = request.result;
        resolve(results.length > 0 ? results[0] : null);
      };
    });
  }

  // Data Export/Import
  async exportAllData(): Promise<string> {
    const products = await this.getAllProducts();
    const shopExpenses = await this.getAllShopExpenses();
    const sales = await this.getAllSales();
    const personalExpenses = await this.getPersonalExpenses();

    const data = {
      version: this.version,
      exportedAt: new Date().toISOString(),
      products,
      shopExpenses,
      sales,
      personalExpenses,
    };

    return JSON.stringify(data, null, 2);
  }

  async importAllData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);

      // Clear existing data
      await this.clearAllData();

      // Import products
      if (data.products && Array.isArray(data.products)) {
        for (const product of data.products) {
          await this.addProduct(product);
        }
      }

      // Import shop expenses
      if (data.shopExpenses && Array.isArray(data.shopExpenses)) {
        for (const expense of data.shopExpenses) {
          await this.addShopExpense(expense);
        }
      }

      // Import sales
      if (data.sales && Array.isArray(data.sales)) {
        for (const sale of data.sales) {
          await this.addSale(sale);
        }
      }

      // Import personal expenses
      if (data.personalExpenses) {
        await this.setPersonalExpenses(data.personalExpenses);
      }
    } catch (error) {
      throw new Error('Failed to import data: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  async clearAllData(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        ['products', 'shopExpenses', 'sales', 'personalExpenses'],
        'readwrite'
      );

      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();

      this.getStore('products', 'readwrite').clear();
      this.getStore('shopExpenses', 'readwrite').clear();
      this.getStore('sales', 'readwrite').clear();
      this.getStore('personalExpenses', 'readwrite').clear();
    });
  }
}

export const db = new Database();
