import { decodeHTMLEntities } from "@/helpers/decodeHTMLEntities";
import { casePackVariation, Product } from "@/types/product.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Variation {
  id?: number;
  sku?: string;
  images?: string[];
  price?: string;
  description?: string;
  name?: string;
  isSelectedVariation: boolean;
  variationStock: string;
  regionVariation: string;
  manualVariation?: string;
  casePackVariation?: casePackVariation;
  newTitle?: string;
}

interface TranslateProduct {
  bullets: string;
  description: string;
  name: string;
}

const initialState: Product = {} as Product;

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      if (state) {
        Object.assign(state, action.payload);
      }
    },
    productVariation: (state, action: PayloadAction<Variation>) => {
      if (state) {
        const { id, sku, images, price, description, newTitle, isSelectedVariation, variationStock, regionVariation, manualVariation, casePackVariation } = action.payload;
        const productState = state as Product;
        if (id !== undefined) productState.id = id;
        if (sku !== undefined) productState.sku = sku;
        if (price !== undefined) productState.price = price;
        if (newTitle !== undefined && newTitle !== null) productState.name = decodeHTMLEntities(newTitle) || '';
        if (description !== undefined && description !== null) productState.description = description === '' ? productState.description : decodeHTMLEntities(description) || '';
        if (isSelectedVariation !== undefined) productState.isSelectedVariation = isSelectedVariation;
        if (variationStock !== undefined) productState.variationStock = variationStock;
        if (regionVariation !== undefined) productState.regionVariation = regionVariation;
        if (manualVariation !== undefined) productState.manualVariation = manualVariation;
        if (casePackVariation !== undefined) productState.casePackVariation = casePackVariation;
        productState.stockStatus = Number(variationStock) > 0 ? 'In Stock' : 'Out of Stock';
        if (images && images.length > 0) {
          productState.images = images.map(image => ({ src: image }));
        }
      }
    },
    translateProduct: (state, action: PayloadAction<TranslateProduct>) => {
      if (state) {
        const productState = state as Product;
        productState.name = action.payload.name;
        productState.description = action.payload.description;
        productState.short_description = action.payload.bullets;
      }
    },
    resetProduct: () => {
      return {} as Product;
    }
  },
});

export const { setProduct, productVariation, translateProduct, resetProduct } = productSlice.actions;

export default productSlice.reducer;