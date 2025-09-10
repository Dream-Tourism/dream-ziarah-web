"use client";

import { BASE_URL } from "@/constant/constants";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function AccountSettings() {
  const {
    user,
    isAuthenticated,
    loading: authLoading,
  } = useSelector((state) => state.auth);

  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.profile_image || "");
  const [uploading, setUploading] = useState(false);
  const [passwordChanging, setPasswordChanging] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Clear message after 5 seconds
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        showMessage("error", "Please select a valid image file");
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showMessage("error", "Image size should be less than 5MB");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      showMessage("error", "Please select an image first");
      return;
    }

    if (!user?.user_id) {
      showMessage("error", "User not authenticated");
      return;
    }

    console.log("Starting image upload...", {
      userId: user?.user_id,
      fileName: imageFile.name,
    });
    setUploading(true);

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const uploadUrl = `${BASE_URL}/user/api/v1/user/uploadimage/${user?.user_id}/`;
      console.log("Upload URL:", uploadUrl);

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
        // Add authentication if needed
        // headers: {
        //   'Authorization': `Bearer ${token}`, // Add if you have auth tokens
        // },
      });

      console.log("Upload response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Image uploaded successfully:", result);
        showMessage("success", "Profile image updated successfully!");
        // Reset the file input
        setImageFile(null);
        // You might want to dispatch an action to update user data in Redux store
      } else {
        const errorData = await response.text();
        console.error("Image upload failed:", errorData);
        showMessage("error", "Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      showMessage("error", "Network error. Please check your connection.");
    } finally {
      setUploading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    console.log("Password form submitted");

    if (!user?.user_id) {
      console.error("User ID not found");
      showMessage("error", "User not authenticated");
      return;
    }

    // Client-side validation
    if (
      !passwordData.old_password ||
      !passwordData.new_password ||
      !passwordData.confirm_password
    ) {
      showMessage("error", "All password fields are required");
      return;
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      console.error("Passwords don't match");
      showMessage("error", "New passwords don't match");
      return;
    }

    if (passwordData.new_password.length < 6) {
      showMessage("error", "New password must be at least 6 characters long");
      return;
    }

    console.log("Starting password change...", { userId: user.id });
    setPasswordChanging(true);

    try {
      const passwordUrl = `${BASE_URL}/user/api/v1/user/passwordchange/${user?.user_id}/`;
      console.log("Password change URL:", passwordUrl);

      const response = await fetch(passwordUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authentication if needed
          // 'Authorization': `Bearer ${token}`, // Add if you have auth tokens
        },
        body: JSON.stringify({
          old_password: passwordData.old_password,
          new_password: passwordData.new_password,
          confirm_password: passwordData.confirm_password,
        }),
      });

      console.log("Password change response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Password changed successfully:", result);
        showMessage("success", "Password changed successfully!");
        // Reset form
        setPasswordData({
          old_password: "",
          new_password: "",
          confirm_password: "",
        });
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        console.error("Password change failed:", errorData);
        showMessage("error", errorData.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      showMessage("error", "Network error. Please check your connection.");
    } finally {
      setPasswordChanging(false);
    }
  };

  // Debug info
  console.log("Component render:", {
    userId: user?.user_id,
    isAuthenticated,
    baseUrl: BASE_URL,
    hasImageFile: !!imageFile,
  });

  return (
    <div>
      {/* Message Display */}
      {message.text && (
        <div
          className={`alert alert-${
            message.type === "error" ? "danger" : "success"
          } alert-dismissible fade show`}
        >
          {message.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage({ type: "", text: "" })}
          ></button>
        </div>
      )}

      <div className="d-flex align-items-center mb-4">
        <i className="fas fa-user-cog fa-2x text-primary me-3"></i>
        <div>
          <h2 className="mb-0 text-primary">Account Settings</h2>
          <p className="text-muted mb-0">
            Manage your profile picture and security settings
          </p>
        </div>
      </div>

      <div className="row">
        {/* Profile Image Upload */}
        <div className="col-md-6">
          <div className="card border-0 shadow-lg">
            <div className="card-header text-white position-relative overflow-hidden bg-blue-1">
              <div className="position-absolute top-0 end-0 opacity-25">
                <i className="fas fa-camera fa-4x"></i>
              </div>
              <h5 className="mb-0 position-relative">
                <i className="fas fa-image me-2"></i>
                Profile Picture
              </h5>
            </div>
            <div className="card-body text-center">
              <div className="mb-3">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="rounded-circle"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style={{
                      width: "120px",
                      height: "120px",
                      margin: "0 auto",
                    }}
                  >
                    <i className="fas fa-user fa-3x text-muted"></i>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control mb-3"
                id="imageInput"
              />
              <button
                type="button"
                className="btn text-white w-100 bg-blue-1"
                onClick={handleImageUpload}
                disabled={!imageFile || uploading}
              >
                <i
                  className={`fas ${
                    uploading ? "fa-spinner fa-spin" : "fa-upload"
                  } me-2`}
                ></i>
                {uploading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
          </div>
        </div>

        {/* Password Change */}
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
                    <i className="icon-clock me-1"></i>
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="form-control border border-primary"
                    value={passwordData.old_password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        old_password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-primary fw-semibold">
                    <i className="icon-clock me-1"></i>
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control border border-primary"
                    value={passwordData.new_password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        new_password: e.target.value,
                      })
                    }
                    required
                    minLength="6"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-primary fw-semibold">
                    <i className="icon-clock me-1"></i>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control border border-denger"
                    value={passwordData.confirm_password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirm_password: e.target.value,
                      })
                    }
                    required
                    minLength="6"
                  />
                </div>
                <button
                  type="submit"
                  className="btn text-white w-100 bg-blue-1"
                  disabled={passwordChanging}
                >
                  <i
                    className={`fas ${
                      passwordChanging ? "fa-spinner fa-spin" : "fa-save"
                    } me-2`}
                  ></i>
                  {passwordChanging ? "Changing..." : "Change Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
