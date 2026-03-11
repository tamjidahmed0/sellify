import getCookie from "@/lib/getCookie";

export async function deleteReview(id: string) {
  const token = getCookie("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/review/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    const errorMessage = data?.message || "Failed to delete review";
    throw new Error(errorMessage);
  }

  return data;
}