import Navbar from "../components/Navbar";

function UserPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">User Page</h1>
        </div>
      </div>
    </>
  );
}

export default UserPage;
