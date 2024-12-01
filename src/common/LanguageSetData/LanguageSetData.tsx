'use client';

import { findMetaData } from '@/helpers/findMetaData';
import { isEmptyObject } from '@/helpers/isEmptyObject';
import { translateProduct } from '@/lib/features/product/product';
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSetData() {
  const dispatch = useAppDispatch();
  const product = useAppSelector(state => state.product);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (isEmptyObject(product)) return;

    if (product.type === 'simple') {
      const description = findMetaData(product, `descriptions_description_${i18n.language}`) !== '' ? findMetaData(product, `descriptions_description_${i18n.language}`) : product.description;
      const bullets = findMetaData(product, `descriptions_bullets_${i18n.language}`) !== '' ? findMetaData(product, `descriptions_bullets_${i18n.language}`) : product.short_description;
      const name = findMetaData(product, `descriptions_title_${i18n.language}`) !== '' ? findMetaData(product, `descriptions_title_${i18n.language}`) : product.name;
  
      dispatch(translateProduct({ description, bullets, name }));
    } else if (product.type === 'variable') {
      const index = product.type === 'variable' ? product?.variations?.indexOf(product.id) : 0;

      let name = index === 0 ? findMetaData(product, i18n.language === 'en' ? 'variations_parent_variation_title' : `variations_parent_variation_title_${i18n.language}`) : findMetaData(product, i18n.language === 'en' ? `variations_variation_${index}_title` : `variations_variation_${index}_${i18n.language}`);
      let description = index === 0 ? findMetaData(product, i18n.language === 'en' ? 'variations_parent_variation_description' : `variations_parent_variation_description_${i18n.language}`) : findMetaData(product, i18n.language === 'en' ? `variations_variation_${index}_description` : `variations_variation_${index}_${i18n.language}`);
      let bullets = index === 0 ? findMetaData(product, i18n.language === 'en' ? 'variations_parent_variation_bullets' : `variations_parent_variation_bullets_${i18n.language}`) : findMetaData(product, i18n.language === 'en' ? `variations_variation_${index}_bullets` : `variations_variation_${index}_${i18n.language}`);
      
      if (!name) name = product.name;
      if (!description) description = product.description;
      if (!bullets) bullets = product.short_description;
      
      dispatch(translateProduct({ description, bullets, name }));
    }
    
  }, [i18n, dispatch, product]);

  return null
}
