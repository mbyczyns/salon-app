import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[oklch(98.7%_0.022_95.277)] text-slate-900 flex flex-col items-center justify-center p-8">

      <div className="mx-auto flex max-w-xl items-center gap-x-6 rounded-xl bg-white p-6 shadow-xl outline outline-black/5">

        <Image
          src="/favicon.ico"
          alt="Logo Salonu Ewelina Mądra"
          width={120}
          height={120}
          className="rounded-full"
        />

        <h1 className="text-3xl font-bold tracking-wider">
          Ewelina Mądra<br />
          <span className="text-xl font-normal text-slate-500">Salon Fryzjerski</span>
        </h1>

      </div>

    </main>
  );
}