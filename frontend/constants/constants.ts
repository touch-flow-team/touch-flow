export const PB_COLLECTIONS = {
  USERS: 'users',
  COMPANIES: 'companies',
  CATEGORIES: 'categories',
  MANAGEMENT_WAITS: 'management_waits',
  PRODUCTS: 'products',
  USER_WAITS: 'user_waits',
  ORDERS: 'orders',
  MANAGEMENT_ORDERS: 'management_orders',
  STOCKS: 'stocks',
  STOCKS_HISTORY: 'stock_historys',
};

export const REVALIDATE_TAG = {
  PRODUCT: 'PRODUCT',
  CATEGORY: 'CATEGORY',
  DISPLAY: 'DISPLAY',
  STOCK: 'STOCK',
};

export const PRODUCT_PAGINATION_SIZE = 4;
export const SIGNIN_URL = '/auth/signin';
export const COOKIE_MESSAGE_ID = 'message';
export const COLLECTION_IDS = {
  PRODUCTS: 'products',
};
export const ORDER_DISPLAY_PAGINATION_SIZE = 4;

export const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const ORDER_STATUS = {
  RECEIVE: 'receive',
  COMPLETE: 'complete',
  CANCEL: 'cancel',
};
// Excel export (stocks)
export const keysToExtract = [
  'brandName',
  'productName',
  'safeCount',
  'currentCount',
  'purchaseAmount',
  'saleAmount',
];

// Translation mapping
export const keyTranslations: { [key: string]: string } = {
  brandName: '브랜드명',
  productName: '제품명',
  safeCount: '안전 재고 수',
  currentCount: '현 재고 수',
  purchaseAmount: '구매가',
  saleAmount: '판매가',
};

export const STOCK_MODE = {
  IN: '입고',
  OUT: '출고',
};
