import { NextRequest, NextResponse } from "next/server";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  try {
    const response = await fetch(
      `https://image.baidu.com/search/index?tn=baiduimage&word=${query}`
    );
    const text = await response.text();
    const imageList = text.match(
      /https:\/\/img\d.baidu.com\/it\/u=\d+,\d+&fm=\d*/g
    );
    return new NextResponse(JSON.stringify(imageList), {
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
