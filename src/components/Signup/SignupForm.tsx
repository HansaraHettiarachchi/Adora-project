import React, { useState, useEffect } from "react";
import AuthFooter from "../Signup/AuthFooter";
import AuthTitle from "../Signup/AuthTitle";
import axiosInstance from "../../util/axiosUtil";
import Swal from "sweetalert2";
import type { CommonIdName } from "../../types/EntitiesTypes";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import type { UserErr } from "../../types/ErrorTypes";
import { useNavigate } from "react-router-dom";

type SignupFormData = {
  fname: string;
  lname: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender_id: number;
  city_id: number;
  nic: string;
  mobile: string;
};

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    fname: "",
    lname: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender_id: 0,
    city_id: 0,
    nic: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);
  const [genderList, setGenderList] = useState<CommonIdName[]>([]);
  const [cityList, setCityList] = useState<CommonIdName[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get<CommonIdName[]>("users/get-all-genders")
      .then((res) => setGenderList(res.data))
      .catch((err) => console.error("Error fetching genders:", err));
    axiosInstance
      .get<CommonIdName[]>("users/get-all-cities")
      .then((res) => setCityList(res.data))
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const validateForm = (data: SignupFormData) => {
    const trimmedData = {
      ...data,
      fname: data.fname.trim(),
      lname: data.lname.trim(),
      address: data.address.trim(),
      email: data.email.trim(),
      nic: data.nic.trim(),
      mobile: data.mobile.trim(),
    };
    if (
      !trimmedData.fname ||
      !trimmedData.lname ||
      !trimmedData.address ||
      !trimmedData.email ||
      !trimmedData.password ||
      !trimmedData.gender_id ||
      !trimmedData.city_id ||
      !trimmedData.nic ||
      !trimmedData.mobile
    ) {
      return "All fields are required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedData.email)) {
      return "Invalid email address";
    }
    // Sri Lankan NIC validation: old (9 digits + V/X), new (12 digits)
    const oldNicRegex = /^\d{9}[vxVX]$/;
    const newNicRegex = /^\d{12}$/;
    if (!oldNicRegex.test(trimmedData.nic) && !newNicRegex.test(trimmedData.nic)) {
      return "Invalid NIC. Enter a valid Sri Lankan NIC (old or new format).";
    }
    // International mobile validation (E.164 format, but allow common formats)
    const mobileRegex = /^\+?\d{7,15}$/;
    if (!mobileRegex.test(trimmedData.mobile)) {
      return "Invalid mobile number. Enter a valid international mobile number.";
    }
    if (trimmedData.password !== trimmedData.confirmPassword) {
      return "Passwords do not match";
    }
    if (trimmedData.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  };

  const showAlert = (title: string, text: string, icon: "error" | "success") => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: "#23B540",
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const errorMsg = validateForm(formData);
    if (errorMsg) {
      showAlert("Error", errorMsg, "error");
      setLoading(false);
      return;
    }
    const trimmedData = {
      ...formData,
      fname: formData.fname.trim(),
      lname: formData.lname.trim(),
      address: formData.address.trim(),
      email: formData.email.trim(),
    };
    try {
      // console.log("Signup data:", trimmedData);
      setLoading(false);

      await axiosInstance.post("/users/set-user", trimmedData).then((res) => {

        if (res.data.message == "success") {
          Swal.fire({
            title: "Signup Successful",
            html: `<div style="font-size: 1.1rem; color: #23B540;">Your account has been created!</div>`,
            icon: "success",
            confirmButtonColor: "#23B540",
            customClass: {
              popup: "swal2-custom-popup"
            }
          }).then(() => {
            navigate("/login");
          });
        } else {
          const resp: UserErr = res.data.data;
          const errorFields = [
            { key: "fname", label: resp.fname },
            { key: "lname", label: resp.lname },
            { key: "email", label: resp.email },
            { key: "mobile", label: resp.mobile },
            { key: "password", label: resp.password },
            { key: "address", label: resp.address },
            { key: "nic", label: resp.nic },
            { key: "gender_id", label: resp.gender_id }
          ];
          const allErrorFields = [
            ...errorFields,
            { key: "user_role_id", label: resp.user_role_id },
            { key: "city_id", label: resp.city_id },
            { key: "status_id", label: resp.status_id },
            { key: "p_img", label: resp.p_img }
          ];

          const errorHtml = allErrorFields
            .filter(field => field.label)
            .map(field => `<span style="color: #e74c3c; font-weight: 500;">${field.label}</span>`)
            .join("<br>");

          if (errorHtml) {
          }

          Swal.fire({
            title: "Signup Failed",
            html: `<div>${errorHtml}</div>`,
            icon: "error",
            confirmButtonColor: "#23B540",
            customClass: {
              popup: "swal2-custom-popup"
            }
          });

        }

      }).catch((e) => console.error(e));
    } catch (error: any) {
      showAlert(
        "Signup Failed",
        (error as any)?.response?.data?.error || "Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="bg-light p-4 rounded-4 shadow w-100" style={{ maxWidth: "600px" }}>
        <Card.Body>
          <AuthTitle />
          <Form onSubmit={handleSignup} autoComplete="off">
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="signupFname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    placeholder="First Name"
                    value={formData.fname}
                    onChange={handleInputChange}
                    className="rounded-4"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="signupLname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    placeholder="Last Name"
                    value={formData.lname}
                    onChange={handleInputChange}
                    className="rounded-4"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="signupEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="rounded-4"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="signupAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="rounded-4"
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="signupMobile">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="rounded-4"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="signupNic">
                  <Form.Label>NIC</Form.Label>
                  <Form.Control
                    type="text"
                    name="nic"
                    placeholder="NIC Number"
                    value={formData.nic}
                    onChange={handleInputChange}
                    className="rounded-4"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="signupGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender_id"
                    value={formData.gender_id}
                    onChange={handleSelectChange}
                    className="rounded-4"
                  >
                    <option value={0}>Select Gender</option>
                    {genderList.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="signupCity">
                  <Form.Label>City</Form.Label>
                  <Form.Select
                    name="city_id"
                    value={formData.city_id}
                    onChange={handleSelectChange}
                    className="rounded-4"
                  >
                    <option value={0}>Select City</option>
                    {cityList.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="signupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="rounded-4"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="signupConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="rounded-4"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid mt-3">
              <Button
                type="submit"
                variant="success"
                size="lg"
                className="rounded-pill"
                disabled={loading}
              >
                {loading ? (
                  <><Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                    Signing up...</>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </Form>
          <AuthFooter />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignupForm;
