"use client";

import { useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<{ name: string; price: string }>({
    name: "",
    price: "",
  });
  const [editingProduct, setEditingProduct] = useState<{ id: number; name: string; price: string } | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Please fill out all fields!");
      return;
    }

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newProduct.name,
        price: parseFloat(newProduct.price),
      }),
    });

    const updatedProducts = await fetch("/api/products").then((res) => res.json());
    setProducts(updatedProducts);
    setNewProduct({ name: "", price: "" });
  };

  const handleDeleteProduct = async (id: number) => {
    await fetch(`/api/products`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const updatedProducts = await fetch("/api/products").then((res) => res.json());
    setProducts(updatedProducts);
  };

  const handleEditProduct = async () => {
    if (!editingProduct) return;

    const response = await fetch(`/api/products`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingProduct.id,
        name: editingProduct.name,
        price: parseFloat(editingProduct.price),
      }),
    });

    if (response.ok) {
      const updatedProducts = await fetch("/api/products").then((res) => res.json());
      setProducts(updatedProducts);
      setEditingProduct(null);
    } else {
      alert("Failed to update product");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* New Product Inputs */}
      <div className="mb-4 flex items-center gap-2">
        <input
          className="border p-2 text-black focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          className="border p-2 text-black focus:outline-none focus:border-blue-500"
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button
          className="bg-[#00008B] text-white p-2 rounded"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="border p-2 flex justify-between items-center">
            {editingProduct?.id === product.id ? (
              <>
                <input
                  className="border p-1 text-black focus:outline-none focus:border-blue-500"
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
                <input
                  className="border p-1 text-black focus:outline-none focus:border-blue-500"
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                />
                <button
                  className="bg-green-500 text-white p-1 rounded"
                  onClick={handleEditProduct}
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray-500 text-white p-1 rounded"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{product.name}</span>
                <span>${product.price}</span>
                <button
                  className="bg-red-500 text-white p-1 rounded"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white p-1 rounded"
                  onClick={() =>
                    setEditingProduct({
                      id: product.id,
                      name: product.name,
                      price: product.price.toString(),
                    })
                  }
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
