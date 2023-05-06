import { createContext } from 'react';

const ShopContext = createContext(null);

export const ShopInstanceProvider = ShopContext.Provider;

export default ShopContext;
