import Link from "next/link";

const NotFound = () => {
  return (
    <div className="container mx-auto flex flex-col items-center mt-96">
      <h1 className="text-9xl text-teal-700">404</h1>
      <h3 className="text-5xl">Page Not Found</h3>
      <Link
        href={"/"}
        className="text-xl mt-20 bg-teal-700 px-4 py-2 text-white rounded border hover:bg-teal-600"
      >
        Home
      </Link>
    </div>
  );
};

export default NotFound;
