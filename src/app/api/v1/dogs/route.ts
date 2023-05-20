import { NextResponse } from 'next/server';
 import dogs from '../../../../../lib/dogs.json';

export async function GET(request: Request) {
  return NextResponse.json(dogs,
  {
  status: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },  
  });
}

