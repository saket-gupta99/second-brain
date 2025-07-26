import { useState } from "react";
import Design from "../components/Design";
import Button from "../components/Button";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, isPending } = useLogin();
  const { signup, isPending: isPending2 } = useSignup();

  const [formData, setFormData] = useState<Login>({
    username: "",
    password: "",
  });

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    login(formData);

    setFormData({
      username: "",
      password: "",
    });
  }

  function handleSignupSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    signup(formData);

    setFormData({
      username: "",
      password: "",
    });
  }

  function changeLogin() {
    setIsLogin((s) => !s);
    setFormData({
      username: "",
      password: "",
    });
  }

  if (isPending || isPending2) return <div>Loading...</div>;

  return (
    <div className="lg:grid grid-cols-2 min-h-screen">
      <Design />
      <div className="flex flex-col px-12 py-20 lg:p-24 items-center justify-center">
        <span className="text-3xl mb-10 lg:mb-16 font-semibold">
          Access Your Second Brain
        </span>

        {isLogin ? (
          <>
            <form
              onSubmit={handleLoginSubmit}
              className="flex flex-col w-full space-y-5"
            >
              <input
                type="text"
                name="username"
                placeholder="User Name"
                value={formData.username ?? ""}
                onChange={handleFormChange}
                className="border rounded-lg p-3 border-gray-400 w-full"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password ?? ""}
                onChange={handleFormChange}
                className="border rounded-lg p-3 border-gray-400 w-full"
              />

              <Button
                type="submit"
                variant="primary"
                className="p-3 text-lg font-semibold"
              >
                Login
              </Button>
            </form>
            <button
              className="self-end text-blue underline cursor-pointer"
              onClick={changeLogin}
            >
              New User?
            </button>{" "}
          </>
        ) : (
          <>
            <form
              onSubmit={handleSignupSubmit}
              className="flex flex-col w-full space-y-5"
            >
              <input
                type="text"
                name="username"
                placeholder="User Name"
                value={formData.username ?? ""}
                onChange={handleFormChange}
                className="border rounded-lg p-3 border-gray-400 w-full"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password ?? ""}
                onChange={handleFormChange}
                className="border rounded-lg p-3 border-gray-400 w-full"
              />

              <Button
                type="submit"
                variant="primary"
                className="p-3 text-lg font-semibold"
              >
                Sign up
              </Button>
            </form>
            <button
              className="self-end text-blue underline cursor-pointer"
              onClick={changeLogin}
            >
              Login?
            </button>{" "}
          </>
        )}
      </div>
    </div>
  );
}
