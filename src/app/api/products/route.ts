import { NextResponse } from "next/server";

type Product = {
    id:number; 
    name: string;
    price: number;
};


let products: Product [] = [
    {id:1, name:"BCV Original Banner", price: 25},
    {id:2, name:"BCV Grafitti Banner", price: 25},

]

export async function GET() {
  return NextResponse.json(products);
}

  export async function POST(req: Request) {
    const newProduct: Omit<Product, "id"> = await req.json();
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    products.push({ id: newId, ...newProduct });
    return NextResponse.json({ message: "Product added successfully!" });
  }
  
  export async function DELETE(req: Request) {
    const { id } = await req.json(); // Get ID from request body
    if (!id || typeof id !== "number") {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }
  
    products = products.filter((product) => product.id !== id);
  
    return NextResponse.json({ message: "Product deleted successfully!" });
  }


  
   export async function PUT(req: Request) {
    const {id,name,price} = await req.json();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    products[productIndex] = { id, name, price }; // Update the product
  return NextResponse.json({ message: "Product updated successfully!", product: products[productIndex] });

   }