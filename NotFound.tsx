import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">Page not found</p>
      <Link to="/" className="btn btn-primary">
        Go back home
      </Link>
    </div>
  );
} 