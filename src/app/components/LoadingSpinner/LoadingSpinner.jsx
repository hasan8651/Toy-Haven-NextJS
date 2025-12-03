import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="w-full h-full py-20 flex flex-col items-center">
      <Image
        src="/logo.png"
        alt="logoLoader"
        width={100}
        height={100}
        className="h-20 w-20 animate-spin"
        unoptimized
      />
      <h2 className="text-3xl font-bold animate-pulse text-blue-600 mt-3">
        Loading...
      </h2>
    </div>
  );
}
