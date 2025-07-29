import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { clientId, invoiceId, status, paidDate } = await request.json();

    // Validate required fields
    if (!clientId || !invoiceId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: clientId, invoiceId, status' },
        { status: 400 }
      );
    }

    // Read current clients data
    const clientsPath = path.join(process.cwd(), 'src', 'data', 'clients.json');
    const clientsData = JSON.parse(fs.readFileSync(clientsPath, 'utf8'));

    // Find and update the client's invoice
    const clientIndex = clientsData.findIndex(client => client.id === clientId);
    if (clientIndex === -1) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    const client = clientsData[clientIndex];
    const invoiceIndex = client.payments.findIndex(payment => payment.id === invoiceId);
    if (invoiceIndex === -1) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Update invoice status
    client.payments[invoiceIndex].status = status;
    if (paidDate) {
      client.payments[invoiceIndex].paidDate = paidDate;
    }

    // Write updated data back to file
    fs.writeFileSync(clientsPath, JSON.stringify(clientsData, null, 2));

    return NextResponse.json({ 
      success: true, 
      updatedInvoice: client.payments[invoiceIndex] 
    });

  } catch (error) {
    console.error('Invoice status update error:', error);
    return NextResponse.json(
      { error: 'Failed to update invoice status' },
      { status: 500 }
    );
  }
}