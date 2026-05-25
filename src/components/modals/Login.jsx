import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import LoadingSpinner from "../common/LoadingSpinner";

export default function Login() {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { success, error: showError } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = "Email or phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const result = await login(formData);

    setLoading(false);

    if (result.success) {
      success(`Welcome back, ${result.user.name}!`);
      setFormData({ emailOrPhone: "", password: "" });

      // Close modal
      const modalElement = document.getElementById("log");
      const modal = window.bootstrap?.Modal?.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    } else {
      showError(result.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="modal modalCentered fade modal-log" id="log">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span
            className="icon icon-close btn-hide-popup"
            data-bs-dismiss="modal"
          />
          <div className="modal-log-wrap list-file-delete">
            <h5 className="title fw-semibold">Log In</h5>
            <form onSubmit={handleSubmit} className="form-log">
              <div className="form-content">
                <fieldset>
                  <label className="fw-semibold body-md-2">
                    Email or Phone Number *
                  </label>
                  <input
                    type="text"
                    name="emailOrPhone"
                    placeholder="Enter your email or phone"
                    value={formData.emailOrPhone}
                    onChange={handleChange}
                    disabled={loading}
                    className={errors.emailOrPhone ? "error" : ""}
                  />
                  {errors.emailOrPhone && (
                    <span className="error-message">{errors.emailOrPhone}</span>
                  )}
                </fieldset>
                <fieldset>
                  <label className="fw-semibold body-md-2">Password *</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    className={errors.password ? "error" : ""}
                  />
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </fieldset>
                <a href="#" className="link text-end body-text-3">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="tf-btn w-100 text-white"
                disabled={loading}
              >
                {loading ? <LoadingSpinner size="small" /> : "Login"}
              </button>
              <p className="body-text-3 text-center">
                Don't you have an account?
                <a
                  href="#register"
                  data-bs-toggle="modal"
                  className="text-primary"
                >
                  {" "}
                  Register
                </a>
              </p>
            </form>
            <div className="orther-log text-center">
              <span className="br-line bg-gray-5" />
              <p className="caption text-main-2">Or login with</p>
            </div>
            <ul className="list-log">
              <li>
                <a href="#" className="tf-btn btn-line w-100">
                  <i className="icon icon-facebook-2" />
                  <span className="body-md-2 fw-semibold">Facebook</span>
                </a>
              </li>
              <li>
                <a href="#" className="tf-btn btn-line w-100">
                  <i className="icon icon-google" />
                  <span className="body-md-2 fw-semibold">Google</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
