import { NextResponse } from "next/server";

type Product = {
    id:number; 
    name: string;
    price: number;
};


const products: Product [] = [
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
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
  
    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }
  
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }
  
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
  
    products.splice(productIndex, 1); // Remove from array
    return NextResponse.json({ message: `Product ${productId} deleted`, products }, { status: 200 });
  }
  

  export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
  
    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }
  
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }
  
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
  
    const body = await req.json();
    if (!body.name || typeof body.price !== "number") {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }
  
    // Update product
    products[productIndex] = { id: productId, ...body };
  
    return NextResponse.json({ message: `Product ${productId} updated`, products }, { status: 200 });
  }