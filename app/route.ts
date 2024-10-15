import { NextRequest, NextResponse } from "next/server";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  try {
    const response = await fetch(
      `https://www.google.com.hk/search?q=${query}&udm=2`
    );
    const text = await response.text();
    const imageList = text.match(/<img[^>]*>/g);
    const srcList = imageList?.map((img) => img.match(/src="([^"]+)"/)?.[1]);
    return new NextResponse(JSON.stringify(srcList.slice(1)), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
  }
}
