"use client";

import { useSelector, useDispatch } from "react-redux";
import { ProtectedRoute } from "@/components/protected-route";
import { useRouter } from "next/navigation";
import { logoutUserThunk } from "@/features/auth/authSlice";

function DashboardContent() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div
      className="container py-5 bg-light min-vh-100"
      style={{ marginTop: "120px" }}
    >
      <div className="mx-auto" style={{ maxWidth: "960px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 fw-bold text-dark">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="btn btn-outline-secondary btn-sm"
          >
            Logout
          </button>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Welcome, {user.first_name}!</h5>
                <small className="text-muted">
                  Here's your account information
                </small>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <strong>Role:</strong>
                  <span className="badge bg-light text-dark">{user.role}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <strong>Email:</strong>
                  <span>{user.email}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <strong>Username:</strong>
                  <span>{user.username}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <strong>Phone:</strong>
                  <span>{user.phone}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <strong>Status:</strong>
                  <span
                    className={`badge ${
                      user.is_active ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Account Details</h5>
                <small className="text-muted">
                  Additional account information
                </small>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <strong>User ID:</strong>
                  <span>{user.user_id}</span>
                </div>
                {user.traveller_id && (
                  <div className="d-flex justify-content-between mb-2">
                    <strong>Traveller ID:</strong>
                    <span>{user.traveller_id}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-2">
                  <strong>Admin:</strong>
                  <span
                    className={`badge ${
                      user.is_admin ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    {user.is_admin ? "Yes" : "No"}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <strong>Staff:</strong>
                  <span
                    className={`badge ${
                      user.is_staff ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    {user.is_staff ? "Yes" : "No"}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <strong>Created:</strong>
                  <span>{new Date(user.created_at).toLocaleDateString()}</span>
                </div>
                {user.acceptOffers !== undefined && (
                  <div className="d-flex justify-content-between mb-2">
                    <strong>Accept Offers:</strong>
                    <span
                      className={`badge ${
                        user.acceptOffers ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {user.acceptOffers ? "Yes" : "No"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {user.role === "TRAVELLER" && (
          <div className="card shadow-sm mt-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Traveller Information</h5>
              <small className="text-muted">
                Your traveller-specific details
              </small>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <strong>Traveller ID:</strong>
                <span>{user.traveller_id}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <strong>Accept Offers:</strong>
                <span
                  className={`badge ${
                    user.acceptOffers ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {user.acceptOffers ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        )}

        {user.is_admin && (
          <div className="card shadow-sm mt-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Admin Panel</h5>
              <small className="text-muted">
                Access to administrative features.
              </small>
            </div>
            <div className="card-body">
              <p className="mb-3">
                Welcome, Admin! You have elevated privileges.
              </p>
              <button className="btn btn-primary btn-sm">Manage Users</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
