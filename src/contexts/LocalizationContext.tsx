import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.inventory': 'Inventory',
    'nav.shop_expenses': 'Shop Expenses',
    'nav.sales_ledger': 'Sales Ledger',
    'nav.personal_expenses': 'Personal Expenses',
    'nav.settings': 'Settings',

    // Common
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.search': 'Search',
    'common.no_data': 'No data available',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.confirm': 'Confirm',
    'common.delete_confirm': 'Are you sure you want to delete this?',

    // Inventory
    'inventory.title': 'Product Inventory',
    'inventory.product_name': 'Product Name',
    'inventory.product_code': 'Product Code',
    'inventory.regular_price': 'Regular Price',
    'inventory.min_selling_price': 'Minimum Selling Price',
    'inventory.stock': 'Stock (pcs)',
    'inventory.photo': 'Photo',
    'inventory.add_product': 'Add Product',
    'inventory.edit_product': 'Edit Product',
    'inventory.delete_product': 'Delete Product',
    'inventory.total_products': 'Total Products',
    'inventory.total_stock_value': 'Total Stock Value',

    // Shop Expenses
    'shop_expenses.title': 'Daily Shop Expenses',
    'shop_expenses.amount': 'Amount',
    'shop_expenses.date': 'Date',
    'shop_expenses.description': 'Description/Category',
    'shop_expenses.add_expense': 'Add Expense',
    'shop_expenses.edit_expense': 'Edit Expense',
    'shop_expenses.total_expenses': 'Total Expenses',
    'shop_expenses.today_expenses': 'Today\'s Expenses',

    // Sales Ledger
    'sales.title': 'Sales Ledger',
    'sales.customer_name': 'Customer Name',
    'sales.phone_number': 'Phone Number',
    'sales.product': 'Product',
    'sales.total_bill': 'Total Bill Amount',
    'sales.payment_status': 'Payment Status',
    'sales.cash': 'Cash (Nogod)',
    'sales.due': 'Due (Baki)',
    'sales.add_sale': 'Add Sale',
    'sales.edit_sale': 'Edit Sale',
    'sales.total_sales': 'Total Sales',
    'sales.pending_dues': 'Pending Dues',
    'sales.today_sales': 'Today\'s Sales',

    // Personal Expenses
    'personal.title': 'Personal Expenses',
    'personal.initial_balance': 'Initial Balance',
    'personal.current_balance': 'Current Balance',
    'personal.amount': 'Amount',
    'personal.purpose': 'Purpose/Category',
    'personal.date': 'Date',
    'personal.add_expense': 'Add Expense',
    'personal.edit_expense': 'Edit Expense',
    'personal.total_spent': 'Total Spent',
    'personal.available_balance': 'Available Balance',

    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.light_mode': 'Light Mode',
    'settings.dark_mode': 'Dark Mode',
    'settings.data_management': 'Data Management',
    'settings.export_data': 'Export Data',
    'settings.import_data': 'Import Data',
    'settings.clear_all_data': 'Clear All Data',
    'settings.backup': 'Backup',
    'settings.restore': 'Restore',
    'settings.about': 'About',
    'settings.version': 'Version',
    'settings.clear_data_warning': 'This will permanently delete all your data. This action cannot be undone.',
    'settings.export_success': 'Data exported successfully',
    'settings.import_success': 'Data imported successfully',
    'settings.clear_success': 'All data cleared successfully',
  },
  bn: {
    // Navigation
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.inventory': 'পণ্য তালিকা',
    'nav.shop_expenses': 'দোকানের খরচ',
    'nav.sales_ledger': 'বিক্রয় খাতা',
    'nav.personal_expenses': 'ব্যক্তিগত খরচ',
    'nav.settings': 'সেটিংস',

    // Common
    'common.add': 'যোগ করুন',
    'common.edit': 'সম্পাদনা করুন',
    'common.delete': 'মুছুন',
    'common.save': 'সংরক্ষণ করুন',
    'common.cancel': 'বাতিল করুন',
    'common.close': 'বন্ধ করুন',
    'common.back': 'ফিরে যান',
    'common.search': 'অনুসন্ধান করুন',
    'common.no_data': 'কোন ডেটা পাওয়া যায়নি',
    'common.loading': 'লোড হচ্ছে...',
    'common.error': 'ত্রুটি',
    'common.success': 'সফল',
    'common.confirm': 'নিশ্চিত করুন',
    'common.delete_confirm': 'আপনি কি এটি মুছতে চান?',

    // Inventory
    'inventory.title': 'পণ্য তালিকা',
    'inventory.product_name': 'পণ্যের নাম',
    'inventory.product_code': 'পণ্য কোড',
    'inventory.regular_price': 'নিয়মিত মূল্য',
    'inventory.min_selling_price': 'সর্বনিম্ন বিক্রয় মূল্য',
    'inventory.stock': 'স্টক (পিস)',
    'inventory.photo': 'ছবি',
    'inventory.add_product': 'পণ্য যোগ করুন',
    'inventory.edit_product': 'পণ্য সম্পাদনা করুন',
    'inventory.delete_product': 'পণ্য মুছুন',
    'inventory.total_products': 'মোট পণ্য',
    'inventory.total_stock_value': 'মোট স্টক মূল্য',

    // Shop Expenses
    'shop_expenses.title': 'দৈনিক দোকানের খরচ',
    'shop_expenses.amount': 'পরিমাণ',
    'shop_expenses.date': 'তারিখ',
    'shop_expenses.description': 'বর্ণনা/বিভাগ',
    'shop_expenses.add_expense': 'খরচ যোগ করুন',
    'shop_expenses.edit_expense': 'খরচ সম্পাদনা করুন',
    'shop_expenses.total_expenses': 'মোট খরচ',
    'shop_expenses.today_expenses': 'আজকের খরচ',

    // Sales Ledger
    'sales.title': 'বিক্রয় খাতা',
    'sales.customer_name': 'গ্রাহকের নাম',
    'sales.phone_number': 'ফোন নম্বর',
    'sales.product': 'পণ্য',
    'sales.total_bill': 'মোট বিল পরিমাণ',
    'sales.payment_status': 'পেমেন্ট স্ট্যাটাস',
    'sales.cash': 'নগদ (নগদ)',
    'sales.due': 'বাকি (বাকি)',
    'sales.add_sale': 'বিক্রয় যোগ করুন',
    'sales.edit_sale': 'বিক্রয় সম্পাদনা করুন',
    'sales.total_sales': 'মোট বিক্রয়',
    'sales.pending_dues': 'বাকি বিল',
    'sales.today_sales': 'আজকের বিক্রয়',

    // Personal Expenses
    'personal.title': 'ব্যক্তিগত খরচ',
    'personal.initial_balance': 'প্রাথমিক ব্যালেন্স',
    'personal.current_balance': 'বর্তমান ব্যালেন্স',
    'personal.amount': 'পরিমাণ',
    'personal.purpose': 'উদ্দেশ্য/বিভাগ',
    'personal.date': 'তারিখ',
    'personal.add_expense': 'খরচ যোগ করুন',
    'personal.edit_expense': 'খরচ সম্পাদনা করুন',
    'personal.total_spent': 'মোট খরচ',
    'personal.available_balance': 'উপলব্ধ ব্যালেন্স',

    // Settings
    'settings.title': 'সেটিংস',
    'settings.language': 'ভাষা',
    'settings.theme': 'থিম',
    'settings.light_mode': 'হালকা মোড',
    'settings.dark_mode': 'অন্ধকার মোড',
    'settings.data_management': 'ডেটা ব্যবস্থাপনা',
    'settings.export_data': 'ডেটা রপ্তানি করুন',
    'settings.import_data': 'ডেটা আমদানি করুন',
    'settings.clear_all_data': 'সমস্ত ডেটা সাফ করুন',
    'settings.backup': 'ব্যাকআপ',
    'settings.restore': 'পুনরুদ্ধার করুন',
    'settings.about': 'সম্পর্কে',
    'settings.version': 'সংস্করণ',
    'settings.clear_data_warning': 'এটি আপনার সমস্ত ডেটা স্থায়ীভাবে মুছে দেবে। এই পদক্ষেপ পূর্বাবস্থায় নেওয়া যাবে না।',
    'settings.export_success': 'ডেটা সফলভাবে রপ্তানি করা হয়েছে',
    'settings.import_success': 'ডেটা সফলভাবে আমদানি করা হয়েছে',
    'settings.clear_success': 'সমস্ত ডেটা সফলভাবে সাফ করা হয়েছে',
  },
};

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within LocalizationProvider');
  }
  return context;
};
