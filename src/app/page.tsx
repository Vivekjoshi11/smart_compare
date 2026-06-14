import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-lg text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Smart Compare
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Compare electrical component prices across brands and validate compatibility for your projects.
        </p>
        <Link
          href="/compare"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Compare in Detail
        </Link>
      </div>
    </div>
  );
}
