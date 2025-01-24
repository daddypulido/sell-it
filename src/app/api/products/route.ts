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