import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer md:footer-horizontal bg-blue-600 text-white mt-4 py-8 md:px-4">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-0 flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-center md:justify-between">
        {/* Logo + Title OK */}
        <Link href="/" className="flex items-center gap-3 order-1">
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="md:animate-bounce"
            unoptimized
          />
          <p className="leading-tight">
            <span className="text-3xl font-bold text-white block">
              Toy Haven
            </span>
            <span className="text-sm">A Online Toy Store Platform</span>
          </p>
        </Link>

        {/* [order-3] Copyright goes last line on small devices OK */}
        <p className="order-3 md:order-2 w-full md:w-auto text-center md:text-left">
          Copyright © {new Date().getFullYear()} - All Rights Reserved
        </p>

        {/* Social + Payment OK */}
        <div className="order-2 md:order-3 flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
          <nav className="grid grid-flow-col auto-cols-max ml-16 gap-6 place-self-center">
            <a
              href="https://x.com/HasanAy67180300"
              target="_blank"
              rel="noreferrer noopener"
              className="link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M18.244 2H21L13.5 10.5 22 22h-6.555l-4.3-5.7-4.7 5.7H2l8.744-10.594L2 2h6.6l4.1 5.8L18.244 2z"></path>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/hasan865"
              target="_blank"
              rel="noreferrer noopener"
              className="link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@pixie-67"
              target="_blank"
              rel="noreferrer noopener"
              className="link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wide text-blue-100">
              We accept
            </span>
            <div className="flex items-center gap-2">
              <Image
                src="/Visa.png"
                alt="Visa"
                width={40}
                height={24}
                unoptimized
              />
              <Image
                src="/master.png"
                alt="Mastercard"
                width={50}
                height={24}
                unoptimized
              />
              <Image
                src="/bKash.png"
                alt="bKash"
                width={40}
                height={24}
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
