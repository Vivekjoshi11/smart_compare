// Mock data simulating database entities for UI development

export const brands = [
  { id: 1, name: 'Havells', quality_tier: 'Premium' },
  { id: 2, name: 'Anchor', quality_tier: 'Economy' },
  { id: 3, name: 'Legrand', quality_tier: 'Luxury' },
  { id: 4, name: 'Simon', quality_tier: 'Premium' },
];

export const categories = [
  { id: 1, name: '6A Switch', module_size: 1 },
  { id: 2, name: '10A Switch', module_size: 1 },
  { id: 3, name: '6A 3-Pin Socket', module_size: 2 },
  { id: 4, name: '6A 5-Pin Socket', module_size: 2 },
  { id: 5, name: 'Fan Regulator', module_size: 2 },
  { id: 6, name: 'TV Socket', module_size: 1 },
  { id: 7, name: 'Telephone Socket', module_size: 1 },
  { id: 8, name: 'USB Charger', module_size: 1 },
  { id: 9, name: 'Bell Push', module_size: 1 },
  { id: 10, name: 'Dimmer', module_size: 2 },
];

export const productItems = [
  // Havells products
  { id: 1, brand_id: 1, category_id: 1, model_name: 'Havells Luxe 6A Switch', price: 85.00, sku_code: 'HVL-SW6A-001' },
  { id: 2, brand_id: 1, category_id: 2, model_name: 'Havells Luxe 10A Switch', price: 95.00, sku_code: 'HVL-SW10A-001' },
  { id: 3, brand_id: 1, category_id: 3, model_name: 'Havells Luxe 6A 3-Pin Socket', price: 120.00, sku_code: 'HVL-SO6A3-001' },
  { id: 4, brand_id: 1, category_id: 4, model_name: 'Havells Luxe 6A 5-Pin Socket', price: 135.00, sku_code: 'HVL-SO6A5-001' },
  { id: 5, brand_id: 1, category_id: 5, model_name: 'Havells Luxe Fan Regulator', price: 280.00, sku_code: 'HVL-FR-001' },
  
  // Anchor products
  { id: 6, brand_id: 2, category_id: 1, model_name: 'Anchor Roma 6A Switch', price: 45.00, sku_code: 'ANC-SW6A-001' },
  { id: 7, brand_id: 2, category_id: 2, model_name: 'Anchor Roma 10A Switch', price: 55.00, sku_code: 'ANC-SW10A-001' },
  { id: 8, brand_id: 2, category_id: 3, model_name: 'Anchor Roma 6A 3-Pin Socket', price: 75.00, sku_code: 'ANC-SO6A3-001' },
  { id: 9, brand_id: 2, category_id: 4, model_name: 'Anchor Roma 6A 5-Pin Socket', price: 85.00, sku_code: 'ANC-SO6A5-001' },
  { id: 10, brand_id: 2, category_id: 5, model_name: 'Anchor Roma Fan Regulator', price: 180.00, sku_code: 'ANC-FR-001' },
  
  // Legrand products
  { id: 11, brand_id: 3, category_id: 1, model_name: 'Legrand Myrius 6A Switch', price: 110.00, sku_code: 'LG-SW6A-001' },
  { id: 12, brand_id: 3, category_id: 2, model_name: 'Legrand Myrius 10A Switch', price: 125.00, sku_code: 'LG-SW10A-001' },
  { id: 13, brand_id: 3, category_id: 3, model_name: 'Legrand Myrius 6A 3-Pin Socket', price: 160.00, sku_code: 'LG-SO6A3-001' },
  { id: 14, brand_id: 3, category_id: 4, model_name: 'Legrand Myrius 6A 5-Pin Socket', price: 180.00, sku_code: 'LG-SO6A5-001' },
  { id: 15, brand_id: 3, category_id: 5, model_name: 'Legrand Myrius Fan Regulator', price: 350.00, sku_code: 'LG-FR-001' },
  
  // Simon products
  { id: 16, brand_id: 4, category_id: 1, model_name: 'Simon 27 6A Switch', price: 95.00, sku_code: 'SIM-SW6A-001' },
  { id: 17, brand_id: 4, category_id: 2, model_name: 'Simon 27 10A Switch', price: 105.00, sku_code: 'SIM-SW10A-001' },
  { id: 18, brand_id: 4, category_id: 3, model_name: 'Simon 27 6A 3-Pin Socket', price: 130.00, sku_code: 'SIM-SO6A3-001' },
  { id: 19, brand_id: 4, category_id: 4, model_name: 'Simon 27 6A 5-Pin Socket', price: 145.00, sku_code: 'SIM-SO6A5-001' },
  { id: 20, brand_id: 4, category_id: 5, model_name: 'Simon 27 Fan Regulator', price: 290.00, sku_code: 'SIM-FR-001' },
];

// Helper functions to get products by category and brand
export const getProductsByCategory = (categoryId: number) => {
  return productItems.filter(item => item.category_id === categoryId);
};

export const getProductByBrandAndCategory = (brandId: number, categoryId: number) => {
  return productItems.find(item => item.brand_id === brandId && item.category_id === categoryId);
};