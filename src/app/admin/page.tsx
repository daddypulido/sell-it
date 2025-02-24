"use client";

import { useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newProduct, setNewProduct] = useState<{ name: string; price: string }>({
    name: "",
    price: ""
  });
  const [editedProduct, setEditedProduct] = useState<{name:string; price:number}>({
    name:"",
    price:0
  })

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

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditedProduct({ name: product.name, price: product.price });
  };

  // Function to save edited product
  const handleSaveEdit = async () => {
    if (!editedProduct.name || !editedProduct.price) {
      alert("Please fill out all fields!");
      return;
    }

    await fetch(`/api/products?id=${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedProduct),
    });

    const updatedProducts = await fetch("/api/products").then((res) => res.json());
    setProducts(updatedProducts);
    setEditingId(null);
  };
  const handleDelete = async (id: number) => {
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });

    // Refresh product list
    const updatedProducts = await fetch("/api/products").then((res) => res.json());
    setProducts(updatedProducts);
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
        className="border p-2 text-black focus:outline-none focus:border-blue-500"
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
        <li key={product.id} className="border p-2 flex justify-between items-center">
          {editingId === product.id ? (
            // Show input fields when editing
            <div className="flex gap-2">
              <input
                className="border p-1 text-black focus:outline-none focus:border-blue-500"
                type="text"
                value={editedProduct.name}
                onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
              />
              <input
                className="border p-1 text-black focus:outline-none focus:border-blue-500"
                type="number"
                value={editedProduct.price}
                onChange={(e) => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })}
              />
            </div>
          ) : (
            // Show product details when NOT editing
            <span>
              {product.name} - ${product.price}
            </span>
          )}

          <div className="flex gap-2">
            {editingId === product.id ? (
              <>
                <button className="bg-green-600 text-white p-1 rounded" onClick={handleSaveEdit}>
                  Save
                </button>
                <button className="bg-gray-500 text-white p-1 rounded" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
                <button className="bg-red-600 text-white p-1 rounded" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </>
            ) : (
              <button className="bg-yellow-500 text-black p-1 rounded" onClick={() => handleEdit(product)}>
                Edit
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
}
