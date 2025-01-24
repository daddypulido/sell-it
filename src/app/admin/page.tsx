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

  // Fetch products from the API when the page loads
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Function to add a new product
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

    // Refresh the product list
    const updatedProducts = await fetch("/api/products").then((res) => res.json());
    setProducts(updatedProducts);

    // Clear input fields
    setNewProduct({ name: "", price: "" });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <div className="mb-4 flex items-center gap-2">
        <input
          className="border p-2 text-black focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          className="border p-2 text-black  focus:outline-none focus:border-blue-500"
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button className="bg-[#00008B] text-white p-2 rounded" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="border p-2 flex justify-between">
            <span>{product.name}</span>
            <span>${product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
