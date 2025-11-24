import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer md:footer-horizontal bg-blue-500 text-white gap-2 items-center justify-center md:justify-between mt-4 py-8 md:px-4">
      <Link href={"/"} className="flex">
        <div>
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="md:animate-bounce"
            unoptimized
          />
        </div>
        <div>
          <p>
            <span className="text-2xl font-semibold">Toy Haven</span>
            <br />A Online Toy Store Platform
          </p>
        </div>
      </Link>
      <div>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </div>
      <nav className="grid grid-flow-col auto-cols-max gap-4 place-self-center ">
        <a
          href="https://x.com/HasanAy67180300"
          target="_blank"
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
    </footer>
  );
}
