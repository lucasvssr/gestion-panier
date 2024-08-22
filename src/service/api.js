const API_URL = "http://localhost:7000";

export async function fetchInitialData() {
  const resArticles = await fetch(`${API_URL}/articles`);
  const resCart = await fetch(`${API_URL}/cart`);

  const dataArticles = await resArticles.json();
  const dataCart = await resCart.json();

  return { dataArticles, dataCart };
}

export async function postToCart(payload) {
  const response = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

export async function removeFromCart(id) {
  const response = await fetch(`${API_URL}/cart/${id}`, {
    method: "DELETE",
  });

  return response.json();
}

export async function updateCart(id, payload) {
  const response = await fetch(`${API_URL}/cart/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

export async function emptyCart(ids) {
  for (const id of ids) {
    const response = await fetch(`${API_URL}/cart/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete item with id ${id}`);
    }
  }
}