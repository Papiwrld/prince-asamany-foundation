import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload.' }, { status: 400 });
  }

  const reference =
    body && typeof body === 'object' && 'reference' in body
      ? (body as { reference: unknown }).reference
      : undefined;

  if (typeof reference !== 'string' || reference.trim() === '') {
    return NextResponse.json({ ok: false, error: 'Invalid payload.' }, { status: 400 });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { ok: false, error: 'Donation verification is not configured yet.' },
      { status: 503 }
    );
  }

  let paystackRes: Response;
  try {
    paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
        signal: AbortSignal.timeout(10000),
        cache: 'no-store',
      }
    );
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error.' }, { status: 502 });
  }

  if (!paystackRes.ok) {
    return NextResponse.json({ ok: false, error: 'Server error.' }, { status: 502 });
  }

  const data = await paystackRes.json().catch(() => null);

  if (data?.status === 'success') {
    return NextResponse.json({
      ok: true,
      verified: true,
      amount: typeof data?.data?.amount === 'number' ? data.data.amount : null,
      currency: typeof data?.data?.currency === 'string' ? data.data.currency : 'GHS',
    });
  }

  return NextResponse.json({ ok: true, verified: false });
}