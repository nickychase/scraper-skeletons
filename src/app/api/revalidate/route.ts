import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided = request.headers.get("x-revalidate-secret");
  if (!secret || provided !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const slug =
    body && typeof body === "object" && typeof body.slug === "string"
      ? body.slug
      : null;
  if (!slug) {
    return NextResponse.json(
      { ok: false, error: "slug required" },
      { status: 400 },
    );
  }

  revalidatePath(`/${slug}`);
  return NextResponse.json({ ok: true, revalidated: slug });
}
