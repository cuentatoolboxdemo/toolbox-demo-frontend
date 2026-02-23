import { AdminPage } from "@/components/admin/AdminPage";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export default async function AdminRoute() {
  const session = cookies().get("admin_session")?.value;
  let initialAuthed = false;
  if (session) {
    const parsed = await decrypt(session);
    initialAuthed = parsed?.role === "admin";
  }

  return <AdminPage initialAuthed={initialAuthed} />;
}
