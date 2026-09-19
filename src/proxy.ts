import { NextResponse, type NextRequest } from "next/server";
import { GATE_COOKIE, gateToken } from "@/lib/gate";

const GATE_PATH = "/welcome";

/** Send anyone without the guest cookie to the password page. */
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === GATE_PATH) return NextResponse.next();

  const cookie = request.cookies.get(GATE_COOKIE)?.value;
  if (cookie && cookie === (await gateToken())) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = GATE_PATH;
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals and the public assets the welcome page itself draws on.
  matcher: ["/((?!_next/|images/|videos/|icon\\.svg|favicon\\.ico).*)"],
};
