
const API_BASE_URL =
  process.env.BAZARDOR_API_URL ??
  "https://openapi.programming-hero.com/api/bazardor";

async function fetchApi<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`BazarDor API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getProducts() {
  return fetchApi<unknown>("/products");
}

export function getProductsByCategory(category: string) {
  return fetchApi<unknown>(
    `/products?category=${encodeURIComponent(category)}`
  );
}

export function getProduct(id: string | number) {
  return fetchApi<unknown>(`/products/${id}`);
}

export function getCategories() {
  return fetchApi<unknown>("/categories");
}

export function getCategory(category: string) {
  return fetchApi<unknown>(
    `/categories/${encodeURIComponent(category)}`
  );
}
