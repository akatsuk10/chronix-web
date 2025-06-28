import { PrismaClient } from '../../generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, wallet, telegram } = body;

    if (!name || !wallet || !telegram) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (name.trim().length < 3) {
      return NextResponse.json({ error: 'Name must be at least 3 characters' }, { status: 400 });
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 });
    }
    if (!/^@[\w\d_]{3,}$/.test(telegram)) {
      return NextResponse.json({ error: 'Invalid Telegram handle' }, { status: 400 });
    }

    const existing = await prisma.waitlistEntry.findFirst({
      where: {
        OR: [{ name }, { wallet }, { telegram }],
      },
    });

    if (existing) {
      return NextResponse.json({ error: 'user already in the waiting list' }, { status: 409 });
    }

    const entry = await prisma.waitlistEntry.create({
      data: { name, wallet, telegram },
    });

    return NextResponse.json({ success: true, entry }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

