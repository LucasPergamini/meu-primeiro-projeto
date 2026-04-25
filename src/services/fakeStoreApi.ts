export type FakeStoreRating = {
  rate: number;
  count: number;
};

export type FakeStoreProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: FakeStoreRating;
};

const API_URL = 'https://fakestoreapi.com/products';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Falha ao carregar dados da API: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchFakeStoreProducts(): Promise<FakeStoreProduct[]> {
  const response = await fetch(API_URL);
  return handleResponse<FakeStoreProduct[]>(response);
}

export async function fetchFakeStoreProductById(id: number): Promise<FakeStoreProduct> {
  const response = await fetch(`${API_URL}/${id}`);
  return handleResponse<FakeStoreProduct>(response);
}
