import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    // send them to login, and tell NextAuth where to return after login
    redirect(`/login?callbackUrl=/dashboard`);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Welcome, {session.user?.name}</h1>
      <p className="text-gray-600">You are logged in via {session.provider ?? "unknown"}.</p>
    </div>
  );
}
