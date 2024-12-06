export const ConstantClass = {
  webserviceName: "https://goat.galeriaciudadverde.com" as const,
};

export const Paths = {
  login: "/profiles/api_login",
  register: "/profiles/api_register",
  categories: "/catalogs/api_category",
  featured_store: "/catalogs/api_featured_store",
  subcategories: "/catalogs/api_subcategory/",
  search_by_category: "/catalogs/api_store_category/",
  search_by_subcategory: "/catalogs/api_store_subcategory/",
  search_suggestions: "/catalogs/api_suggestion_search?search=",
  search_by_suggestions: "/catalogs/api_find_product_store?search=",
  store_details: "/catalogs/api_detail_product_store/",
} as const;
