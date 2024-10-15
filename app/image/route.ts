import { readFileSync } from "fs";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch(
    "https://www.google.com.hk/search?q=%E5%90%8E%E5%AE%A4+level+50&udm=2"
  );
  const text = await response.text();
  return new Response(text);
}
