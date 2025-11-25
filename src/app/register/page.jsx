"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Image from "next/image";
import Swal from "sweetalert2";

export default function Register() {
  const { status } = useSession();
  const router = useRouter();

  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      Swal.fire({
        position: "top-end",
        background: "#3b82f6",
        color: "white",
        icon: "success",
        title: "Signed in with Google!",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/");
    }
  }, [status, router]);

  const passwordValidation = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleGoogleLogin = async () => {
    await signIn("google", {});

    if (login?.ok) {
      router.push("/");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordError("");

    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const photoURL = form.photoURL.value.trim();
    const password = form.password.value;

    if (!passwordValidation(password)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, image: photoURL }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Registration failed");
      }

      Swal.fire({
        position: "top-end",
        background: "#3b82f6",
        color: "white",
        icon: "success",
        title: "Account created successfully! Please sign in...",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
      Swal.fire({
        position: "top-end",
        background: "red",
        color: "white",
        icon: "error",
        title: "Registration failed. Please try again.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Toy Haven - Register</title>
      </Head>

      <div className="hero bg-base-200">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="card bg-blue-50 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <p className="text-center text-blue-500 font-semibold text-lg mb-4">
                  Register Your Account
                </p>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  name="photoURL"
                  placeholder="Photo URL (optional)"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="input input-bordered pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-50"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <MdVisibility size={20} />
                    ) : (
                      <MdVisibilityOff size={20} />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm max-w-[280px]">
                    {passwordError}
                  </p>
                )}
                {error && (
                  <p className="text-red-500 text-sm max-w-[280px]">{error}</p>
                )}
              </div>

              <div className="form-control">
                <button
                  type="submit"
                  className="btn w-full bg-blue-500 text-white hover:bg-blue-700"
                >
                  Register
                </button>
              </div>

              <div>
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="btn mt-5 text-blue-500 flex items-center justify-center w-full"
                >
                  <Image
                    width={100}
                    height={100}
                    className="w-5 mr-2"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
                    alt="Google Logo"
                    unoptimized
                  />
                  Continue with Google
                </button>
              </div>
            </form>

            <p className="text-blue-500 text-center p-4">
              Already have an account?{" "}
              <Link className="text-red-500 font-semibold" href="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}