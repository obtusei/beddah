import LoadingPet from "@/components/Loading";
import Image from "next/image";
import Link from "next/link";
const ArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
    </svg>
  );
};
const ArrowRightUpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
    >
      <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
    </svg>
  );
};
export default function Home() {
  return (
    <main className="bg-accent gap-10 h-screen p-10 justify-between items-center flex flex-col">
      <div></div>
      <div className="items-center flex flex-col gap-4">
        <LoadingPet size={120} color="black" />

        <div className="text-center">
          <h1 className="text-4xl">eddah</h1>
          <h1 className="text-xl opacity-50">backend</h1>
        </div>
        <br />
        <br />
        <Link href={"/admin"} className="p-4 bg-black fill-white rounded-full">
          <ArrowIcon />
        </Link>
      </div>

      <Link
        href={
          "https://sakshipoudyl.notion.site/eddah-api-dcb90738a119484daf642c99279ab723"
        }
        className="flex gap-1 items-center px-6 p-4 text-sm bg-black bg-opacity-20 fill-black rounded-full"
      >
        check the api
        <ArrowRightUpIcon />
      </Link>
    </main>
  );
}
