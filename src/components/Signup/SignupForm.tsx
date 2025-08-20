import React, { useState, useEffect } from "react";
import InputField from "../Login/InputField";
import AuthFooter from "../Signup/AuthFooter";
import AuthTitle from "../Signup/AuthTitle";
import axiosInstance from "../../util/axiosUtil";
import Swal from "sweetalert2";

type Gender = {
  id: number;
  name: string;
};

type SignupFormData = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender_id: number;
};

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender_id: 0,
  });

  const [loading, setLoading] = useState(false);
  const [genderList, setGenderList] = useState<Gender[]>([]);

  useEffect(() => {
    axiosInstance
      .get<Gender[]>("/get-gender-list")
      .then((res) => setGenderList(res.data))
      .catch((err) => console.error("Error fetching genders:", err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gender_id" ? Number(value) : value,
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const trimmedData = {
      ...formData,
      fname: formData.fname.trim(),
      lname: formData.lname.trim(),
      email: formData.email.trim(),
    };

    if (
      !trimmedData.fname ||
      !trimmedData.lname ||
      !trimmedData.email ||
      !trimmedData.password ||
      !trimmedData.gender_id
    ) {
      Swal.fire({
        title: "Error",
        text: "All fields are required",
        icon: "error",
        confirmButtonColor: "#23B540",
      });
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedData.email)) {
      Swal.fire({
        title: "Error",
        text: "Invalid email address",
        icon: "error",
        confirmButtonColor: "#23B540",
      });
      setLoading(false);
      return;
    }

    if (trimmedData.password !== trimmedData.confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
        confirmButtonColor: "#23B540",
      });
      setLoading(false);
      return;
    }

    if (trimmedData.password.length < 6) {
      Swal.fire({
        title: "Error",
        text: "Password must be at least 6 characters",
        icon: "error",
        confirmButtonColor: "#23B540",
      });
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.post("/user/set-user", trimmedData);

      Swal.fire({
        title: "Signup Successful",
        text: "Your account has been created!",
        icon: "success",
        confirmButtonColor: "#23B540",
      });

      setFormData({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender_id: 0,
      });
    } catch (error: any) {
      Swal.fire({
        title: "Signup Failed",
        text: error.response?.data?.error || "Please try again.",
        icon: "error",
        confirmButtonColor: "#23B540",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-light p-4 rounded-4 shadow w-100"
      style={{ maxWidth: "600px" }}
    >
      <AuthTitle />
      <form onSubmit={handleSignup}>
        <div className="row">
          <div className="col">
            <InputField
              type="text"
              name="fname"
              placeholder="First Name"
              value={formData.fname}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <InputField
              type="text"
              name="lname"
              placeholder="Last Name"
              value={formData.lname}
              onChange={handleChange}
            />
          </div>
        </div>

        <InputField
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="mt-3 mb-3">
          <label className="d-block mb-2 fw-semibold">Gender</label>
          <select
            name="gender_id"
            value={formData.gender_id}
            onChange={handleChange}
            className="form-select"
            aria-label="Select gender"
          >
            <option value={0}>Select Gender</option>
            {genderList.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <div className="d-grid mt-3">
          <button
            type="submit"
            className="btn btn-success btn-lg rounded-pill"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </form>
      <AuthFooter />
    </div>
  );
};

export default SignupForm;
