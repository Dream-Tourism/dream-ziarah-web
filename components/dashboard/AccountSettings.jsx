"use client";

import { useState } from "react";

export default function AccountSettings({ user }) {
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profileData);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password changed");
  };

  return (
    <div style={{ marginTop: "120px" }}>
      <div className="d-flex align-items-center mb-4">
        <i className="fas fa-user-cog fa-2x text-primary me-3"></i>
        <div>
          <h2 className="mb-0 text-primary">Account Settings</h2>
          <p className="text-muted mb-0">
            Manage your profile and security settings
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card border-0 shadow-lg">
            <div className="card-header text-white position-relative overflow-hidden bg-blue-1">
              <div className="position-absolute top-0 end-0 opacity-25">
                <i className="fas fa-user-edit fa-4x"></i>
              </div>
              <h5 className="mb-0 position-relative">
                <i className="fas fa-id-card me-2"></i>
                Profile Information
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleProfileSubmit}>
                <div className="mb-3">
                  <label className="form-label text-primary fw-semibold">
                    <i className="fas fa-user me-2"></i>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control border-2 border-blue-1"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-primary fw-semibold">
                    <i className="fas fa-envelope me-2"></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control border-2 border-blue-1"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-primary fw-semibold">
                    <i className="fas fa-phone me-2"></i>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control border-2 border-blue-1"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="btn text-white w-100 bg-blue-1"
                >
                  <i className="fas fa-save me-2"></i>
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-lg">
            <div className="card-header text-white position-relative overflow-hidden bg-blue-1">
              <div className="position-absolute top-0 end-0 opacity-25">
                <i className="fas fa-shield-alt fa-4x"></i>
              </div>
              <h5 className="mb-0 position-relative">
                <i className="fas fa-lock me-2"></i>
                Security Settings
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-3">
                  <label className="form-label text-primary fw-semibold">
                    <i className="fas fa-key me-2"></i>
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="form-control border-2 border-blue-1"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-primary fw-semibold">
                    <i className="fas fa-lock me-2"></i>
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control border-2 border-blue-1"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-primary fw-semibold">
                    <i className="fas fa-lock me-2"></i>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control border-2 border-blue-1"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="btn text-white w-100 bg-blue-1"
                >
                  <i className="fas fa-save me-2"></i>
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
