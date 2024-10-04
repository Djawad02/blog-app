"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      setShowModal(true);
    }
  }, [session, status]);

  const handleSignIn = () => {
    router.push("/api/auth/signin");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Sign In Required</h2>
            <p>Please sign in to access this page.</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSignIn}
                className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Sign In
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render children only if authenticated */}
      {session ? <div>{children}</div> : null}
    </div>
  );
};

export default ProtectedRoute;
