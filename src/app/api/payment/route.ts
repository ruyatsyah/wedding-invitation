import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import midtransClient from 'midtrans-client';

// Helper: parse string to int (e.g. "Rp 49.000" -> 49000)
function parseNumericPrice(price: string): number {
  if (!price) return 0;
  const cleaned = price.replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
}

export async function POST(req: Request) {
  try {
    const { plan, planId, price, coupleName, customUrl, customerDetails } = await req.json();

    if (!plan || !price) {
      return NextResponse.json(
        { success: false, error: 'Missing plan or price' },
        { status: 400 }
      );
    }

    const numericPrice = parseNumericPrice(price);

    if (numericPrice <= 0) {
      return NextResponse.json(
        { success: false, error: 'Price must be greater than 0' },
        { status: 400 }
      );
    }

    // Initialize Midtrans Snap client
    const snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
      serverKey: process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-DUMMY',
      clientKey: process.env.MIDTRANS_CLIENT_KEY || 'SB-Mid-client-DUMMY',
    });

    const orderId = `ORDER-${uuidv4()}`;

    const parameters = {
      transaction_details: {
        order_id: orderId,
        gross_amount: numericPrice,
      },
      item_details: [
        {
          id: planId || plan,
          price: numericPrice,
          quantity: 1,
          name: `Paket ${plan} - ${coupleName}`,
        },
      ],
      customer_details: {
        first_name: customerDetails?.first_name || coupleName || 'User',
        email: customerDetails?.email || 'user@example.com',
        phone: customerDetails?.phone || '',
      },
    };

    const transaction = await snap.createTransaction(parameters);

    return NextResponse.json({
      success: true,
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      orderId: orderId,
    });
  } catch (error: any) {
    console.error('Midtrans Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Payment gateway error' },
      { status: 500 }
    );
  }
}
