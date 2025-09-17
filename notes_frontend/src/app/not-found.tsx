export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="card p-8 text-center">
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
          <span className="text-blue-600 text-xl font-bold">404</span>
        </div>
        <h1 className="text-xl font-semibold text-slate-800">Page Not Found</h1>
        <p className="mt-1 text-slate-500">The page you’re looking for doesn’t exist.</p>
      </div>
    </div>
  );
}
