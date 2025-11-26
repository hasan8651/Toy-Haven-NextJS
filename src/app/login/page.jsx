"use client";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Swal from "sweetalert2";

export default function Login() {
  const { status } = useSession();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      Swal.fire({
        position: "top-end",
        background: "#3b82f6",
        color: "white",
        icon: "success",
        title: "Signed in Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/");
    }
  }, [status, router]);

  const handleGoogleLogin = async () => {
    const login = await signIn("google", {});
    if (login?.ok) {
      router.push("/");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      Swal.fire({
        position: "top-end",
        background: "red",
        color: "white",
        icon: "success",
        title: `Login Error: ${res?.error || "Invalid Credentials"}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Toy Haven - Login</title>
      </Head>

      <div className="hero">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="card bg-blue-50 w-full shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <p className="text-center bg-blue-500 text-white px-12 py-2 rounded-md font-semibold text-lg mb-4">
                  Login to Your Account
                </p>
                <label className="label font-semibold text-blue-600">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="input input-bordered border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-blue-600">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="input input-bordered pr-10 border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-50 text-blue-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <MdVisibility size={20} />
                    ) : (
                      <MdVisibilityOff size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="form-control">
                <button
                  type="submit"
                  className="btn w-full bg-blue-500 text-white hover:bg-blue-700"
                >
                  Login
                </button>
              </div>

              <div>
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="btn mt-5 text-blue-600 bg-white border border-blue-500 hover:bg-blue-200 flex items-center justify-center w-full"
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
              Don't have an account?{" "}
              <Link className="text-red-500 font-semibold" href="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
