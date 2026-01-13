import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function requireUser() {
  const headerList = await headers();
  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) {
    const url = headerList.get("x-url") || headerList.get("referer") || "/";
    return redirect(`/login?redirectTo=${encodeURIComponent(url)}`);
  }

  return session.user;
}
