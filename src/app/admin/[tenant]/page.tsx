import { AdminPage } from "@/components/admin/AdminPage";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { getTenant } from "@/lib/tenants";
import { notFound } from "next/navigation";

export default async function AdminRoute({ params }: { params: { tenant: string } }) {
  const tenantObj = getTenant(params.tenant);
  if (!tenantObj) {
    notFound();
  }

  const session = cookies().get("admin_session")?.value;
  let initialAuthed = false;
  if (session) {
    const parsed = await decrypt(session);
    initialAuthed = parsed?.role === "admin";
  }

  return <AdminPage initialAuthed={initialAuthed} tenantId={tenantObj.slug} />;
}
