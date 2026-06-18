export function useAuth() {
  const user = localStorage.getItem("user");

  return {
    isAuth: !!user,
    user: user ? JSON.parse(user) : null,
  };
}