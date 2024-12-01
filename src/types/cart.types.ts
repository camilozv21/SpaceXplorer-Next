export interface CartProduct {
  id: string;
  quantity: number;
  image: string;
  price: string;
  sku: string;
  slug: string;
  name: string;
  alt: string;
}

export interface Checkout {
  session_key:  string;
  session_data: null;
  checkoutUrl:  string;
  message:      string;
}

export interface Coupon {
  id:                          number;
  code:                        string;
  amount:                      string;
  status:                      string;
  date_created:                Date;
  date_created_gmt:            Date;
  date_modified:               Date;
  date_modified_gmt:           Date;
  discount_type:               string;
  description:                 string;
  date_expires:                Date;
  date_expires_gmt:            Date;
  usage_count:                 number;
  individual_use:              boolean;
  product_ids:                 number[];
  excluded_product_ids:        string[];
  usage_limit:                 number;
  usage_limit_per_user:        number;
  limit_usage_to_x_items:      null;
  free_shipping:               boolean;
  product_categories:          string[];
  excluded_product_categories: string[];
  exclude_sale_items:          boolean;
  minimum_amount:              string;
  maximum_amount:              string;
  email_restrictions:          string[];
  used_by:                     string[];
  meta_data:                   string[];
  _links:                      Links;
}

export interface Links {
  self:       Collection[];
  collection: Collection[];
}

export interface Collection {
  href: string;
}
