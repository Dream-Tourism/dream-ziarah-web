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
    // Implement profile update logic
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password changed");
    // Implement password change logic
  };

  return (
    <div>
      <h2 className="mb-4 text-primary">Account Settings</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card border-0 shadow">
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#3554d1" }}
            >
              <h5 className="mb-0">
                <i className="fas fa-user-edit me-2"></i>
                Edit Profile
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleProfileSubmit}>
                <div className="mb-3">
                  <label className="form-label text-primary">
                    <i className="fas fa-user me-2"></i>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control border-2"
                    style={{ borderColor: "#3554d1" }}
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    onFocus={(e) =>
                      (e.target.style.boxShadow =
                        "0 0 0 0.2rem rgba(53, 84, 209, 0.25)")
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-primary">
                    <i className="fas fa-envelope me-2"></i>
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control border-2"
                    style={{ borderColor: "#3554d1" }}
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    onFocus={(e) =>
                      (e.target.style.boxShadow =
                        "0 0 0 0.2rem rgba(53, 84, 209, 0.25)")
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-primary">
                    <i className="fas fa-phone me-2"></i>
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control border-2"
                    style={{ borderColor: "#3554d1" }}
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    onFocus={(e) =>
                      (e.target.style.boxShadow =
                        "0 0 0 0.2rem rgba(53, 84, 209, 0.25)")
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="btn text-white"
                  style={{ backgroundColor: "#3554d1" }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#2a4bc7")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#3554d1")
                  }
                >
                  <i className="fas fa-save me-2"></i>
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow">
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#3554d1" }}
            >
              <h5 className="mb-0">
                <i className="fas fa-lock me-2"></i>
                Change Password
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-3">
                  <label className="form-label text-primary">
                    <i className="fas fa-key me-2"></i>
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="form-control border-2"
                    style={{ borderColor: "#3554d1" }}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    onFocus={(e) =>
                      (e.target.style.boxShadow =
                        "0 0 0 0.2rem rgba(53, 84, 209, 0.25)")
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-primary">
                    <i className="fas fa-lock me-2"></i>
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control border-2"
                    style={{ borderColor: "#3554d1" }}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    onFocus={(e) =>
                      (e.target.style.boxShadow =
                        "0 0 0 0.2rem rgba(53, 84, 209, 0.25)")
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-primary">
                    <i className="fas fa-lock me-2"></i>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control border-2"
                    style={{ borderColor: "#3554d1" }}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    onFocus={(e) =>
                      (e.target.style.boxShadow =
                        "0 0 0 0.2rem rgba(53, 84, 209, 0.25)")
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="btn text-white"
                  style={{ backgroundColor: "#3554d1" }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#2a4bc7")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#3554d1")
                  }
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
