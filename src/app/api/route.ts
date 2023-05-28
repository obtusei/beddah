import { NextResponse } from 'next/server';

export async function GET(request: Request) {

  const res = await fetch('https://jsonplaceholder.typicode.com/todos', {

  });
  const data = await res.json();
  return NextResponse.json(data,
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
}

