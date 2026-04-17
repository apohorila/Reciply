import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsSubmitting(true);
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError("Couldn't login with Google");
    } finally {
      setIsSubmitting(false);
    }
  };
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isValidPassword = (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      value,
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Incorrect email format");
      return;
    }

    if (!isValidPassword(password)) {
      setError(
        "Password should contain at leat 8 symbols, uppercase letter and special symbol",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await register(email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Account with this email already exists");
      } else {
        setError("Registration error. Try again later");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="flex h-screen items-center bg-[#FFD29D] p-20">
      <div className="mx-auto flex w-fit flex-col items-center space-y-5 rounded-4xl border bg-[#F85E00] px-10 py-15 font-[Stolzl] text-white">
        <img src="logo.png" className="h-17.5 w-28.5" />
        <div className="text-center">
          <h1 className="text-4xl">Create account</h1>
          <p className="text-2xl">
            Join Reciply to save recipes and plan your meals
          </p>
        </div>
        <form className="flex flex-col py-4" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-2xl">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            className="mt-3 rounded-4xl border px-3 py-1 text-xl"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
              setError("");
            }}
          />
          <label htmlFor="password" className="mt-5 text-2xl">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            className="mt-3 rounded-4xl border px-3 py-1 text-xl"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
          <p className="mx-auto mt-4 text-red-600">{error ? error : ""}</p>
          <input
            type="submit"
            value="Create account"
            className="mt-10 cursor-pointer rounded-4xl border py-1 text-2xl hover:bg-white hover:text-[#F85E00]"
            disabled={isSubmitting}
          />
        </form>

        <p className="text-xl">or continue with</p>
        <button
          className="cursor-pointer rounded-full border-0 bg-white p-2"
          onClick={handleGoogleLogin}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24"
            height="24"
            style={{ opacity: 1 }}
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
            />
            <path
              fill="#FF3D00"
              d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
            />
          </svg>
        </button>
        <div className="mt-5 flex space-x-2">
          <p className="text-xl">Already have an account?</p>
          <Link to="/login" className="text-xl underline">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
