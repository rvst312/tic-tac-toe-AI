import { connectToDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const collection = db.collection('testCollection');
    const insertResult = await collection.insertOne({ name: 'Test', date: new Date() });
    const documentos = await collection.find({}).toArray();

    return NextResponse.json({
      message: 'Conexión a MongoDB exitosa!',
      insertResult,
      documentos,
    });
  } catch (error) {
    console.error('Error en conexión a MongoDB:', error);
    return NextResponse.json({ error: 'Error conectando a MongoDB' }, { status: 500 });
  }
}