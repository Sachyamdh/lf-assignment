export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return false;

    const res = await fetch("/api/userStatus", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data.status === true;
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
};
