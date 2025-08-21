
import React, { useState, useEffect, type FormEvent } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import u_image from "../../assets/images/User-Images/user-avatar.png";
import axiosInstance, { baseURL } from "../../util/axiosUtil";
import AwtUtil from "../../util/JwtUtil";
import type { User } from "../../types/EntitiesTypes";
import Swal from "sweetalert2";
import type { UserErr } from "../../types/ErrorTypes";

type CommonIdName = { id: number; name: string };


export default function UserEdit() {
  const [discardHover, setDiscardHover] = useState(false);
  const [genderList, setGenderList] = useState<CommonIdName[]>([]);
  const [cityList, setCityList] = useState<CommonIdName[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusName, setStatusName] = useState<string>("");
  const [statusId, setStatusId] = useState<number | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    axiosInstance
      .get<CommonIdName[]>("users/get-all-genders")
      .then((res) => setGenderList(res.data))
      .catch((err) => console.error("Error fetching genders:", err));
    axiosInstance
      .get<CommonIdName[]>("users/get-all-cities")
      .then((res) => setCityList(res.data))
      .catch((err) => console.error("Error fetching cities:", err));

    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = AwtUtil.decodeToken(token);
      if (decoded && typeof decoded.id === 'number') {
        axiosInstance
          .get(`users/get-user-by-id/${decoded.id}`)
          .then(res => {
            // console.log('GET /users/get-user-by-id response:', res);
            if (res.data && (res.data.data || res.data.id)) {
              // Accept either res.data.data or direct res.data for user object
              const user = res.data.data || res.data;
              setUserData(user);
              setStatusId(user.status_id);
            } else {
              setUserData(null);
            }
          })
          .catch((err) => {
            setUserData(null);
            console.error('Error fetching user by id:', err);
          });
      } else {
        setUserData(null);
        console.error('Decoded token missing id:', decoded);
      }
    } else {
      setUserData(null);
    }
  }, []);

  useEffect(() => {
    if (statusId != null) {
      axiosInstance
        .get(`users/get-status-by-id/${statusId}`)
        .then(res => {
          if (res.data && res.data.data) {
            setStatusName(res.data.data.name);
          } else {
            setStatusName("");
          }
        })
        .catch(() => setStatusName(""));
    }
  }, [statusId]);

  // Helper for profile image
  const profileImg = profileFile
    ? URL.createObjectURL(profileFile)
    : userData?.p_img
      ? baseURL + "uploads/" + userData.p_img
      : u_image;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData) return;

    // Basic validation
    const errors: string[] = [];
    if (!userData.fname?.trim()) errors.push("First Name is required.");
    if (!userData.lname?.trim()) errors.push("Last Name is required.");
    if (!userData.email?.trim()) errors.push("Email is required.");
    if (!userData.mobile?.trim()) errors.push("Phone is required.");
    if (!userData.gender_id) errors.push("Gender is required.");
    if (!userData.city_id) errors.push("City is required.");
    if (!userData.address?.trim()) errors.push("Shipping Address is required.");
    if (!userData.nic?.trim()) errors.push("NIC is required.");

    // Email format check
    if (userData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.push("Email format is invalid.");
    }
    // Phone format check (simple, adjust as needed)
    if (userData.mobile && !/^\d{10,}$/.test(userData.mobile)) {
      errors.push("Phone number is invalid.");
    }

    if (errors.length > 0) {
      Swal.fire({
        title: "Validation Error",
        html: errors.map(e => `<span style="color: #e74c3c; font-weight: 500;">${e}</span>`).join("<br>"),
        icon: "error",
        confirmButtonColor: "#23B540",
        customClass: { popup: "swal2-custom-popup" }
      });
      return;
    }

    setLoading(true);
    const detailsToSend = { ...userData, id: userData.id };
    const formData = new FormData();
    if (profileFile) {
      formData.append("image", profileFile);
    }
    formData.append("data", JSON.stringify(detailsToSend));
    for (let pair of formData.entries()) {
      if (pair[0] === 'image' && pair[1] instanceof File) {
        console.log('FormData image:', {
          name: pair[1].name,
          type: pair[1].type,
          size: pair[1].size
        });
      } else {
        console.log(`FormData ${pair[0]}:`, pair[1]);
      }
    }

    try {
      const res = await axiosInstance.post("users/update-user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.message === "success") {
        Swal.fire({
          title: "Success",
          text: "User Updated Successfully",
          icon: "success",
          confirmButtonColor: "#23B540",
          customClass: {
            popup: "swal2-custom-popup"
          }
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
      }
    } catch (err) {
      console.log(err);

    } finally {
      setLoading(false);
    }
  }

  return (
    <Container
      fluid
      className="p-4"
      style={{
        backgroundColor: "#eaeaeaff",
        maxWidth: "900px",
        marginTop: "30px",
        borderRadius: "12px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h4 className="fw-bold" style={{ color: "#39A108", fontWeight: "800" }}>
          EDIT <span style={{ color: "#000" }}>PROFILE</span>
        </h4>
      </div>

      <Form onSubmit={handleSubmit}>
        <div className="row" style={{ marginBottom: "24px" }}>
          {/* Profile Image at top right */}
          <div className="col-md-4 d-flex flex-column align-items-center justify-content-start order-md-2 mb-3">
            <Image
              src={profileImg}
              alt="Profile"
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                padding: "3px",
                objectFit: "cover",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                border: statusId === 2 ? '3px solid #d32f2f' : statusId === 1 ? '3px solid #39A108' : '3px solid #ccc'
              }}
            />
            {/* Status under profile image */}
            {statusName && (
              <div className="mt-3" style={{ fontWeight: "700", fontSize: "1.1rem", color: statusId === 1 || statusId === 2 ? '#39A108' : '#333' }}>
                {statusName}
              </div>
            )}
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={e => setProfileFile(e.target.files?.[0] || null)}
            />
            <Button
              variant="outline-success"
              className="mt-3"
              style={{ fontWeight: "700", borderRadius: "8px", padding: "6px 20px" }}
              onClick={() => fileInputRef.current?.click()}
            >
              Change Profile Image
            </Button>
          </div>
          {/* User Info (First/Last Name at top) */}
          <div className="col-md-8 order-md-1">
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label style={{ color: "#39A108", fontWeight: "800" }}>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData?.fname ?? ""}
                    onChange={e => setUserData(userData ? { ...userData, fname: e.target.value } : userData)}
                    style={{ background: "#F2F2F2", border: "none", borderRadius: "15px" }}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label style={{ color: "#39A108", fontWeight: "800" }}>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData?.lname ?? ""}
                    onChange={e => setUserData(userData ? { ...userData, lname: e.target.value } : userData)}
                    style={{ background: "#F2F2F2", border: "none", borderRadius: "15px" }}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label style={{ color: "#39A108", fontWeight: "800" }}>Gender</Form.Label>
                  <Form.Select
                    value={userData?.gender_id ?? ""}
                    onChange={e => setUserData(userData ? { ...userData, gender_id: Number(e.target.value) } : userData)}
                    style={{ background: "#F2F2F2", border: "none", borderRadius: "15px" }}
                  >
                    <option value="">Select Gender</option>
                    {genderList.map((g) => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label style={{ color: "#39A108", fontWeight: "800" }}>City</Form.Label>
                  <Form.Select
                    value={userData?.city_id ?? ""}
                    onChange={e => setUserData(userData ? { ...userData, city_id: Number(e.target.value) } : userData)}
                    style={{ background: "#F2F2F2", border: "none", borderRadius: "15px" }}
                  >
                    <option value="">Select City</option>
                    {cityList.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#39A108", fontWeight: "800" }}>Email</Form.Label>
              <Form.Control
                type="email"
                value={userData?.email ?? ""}
                onChange={e => setUserData(userData ? { ...userData, email: e.target.value } : userData)}
                style={{ background: "#F2F2F2", border: "none", borderRadius: "15px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#39A108", fontWeight: "800" }}>NIC</Form.Label>
              <Form.Control
                type="text"
                value={userData?.nic ?? ""}
                onChange={e => setUserData(userData ? { ...userData, nic: e.target.value } : userData)}
                style={{ background: "#F2F2F2", border: "none", borderRadius: "15px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#39A108", fontWeight: "800" }}>Shipping Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={userData?.address ?? ""}
                onChange={e => setUserData(userData ? { ...userData, address: e.target.value } : userData)}
                style={{ background: "#F2F2F2", border: "none", borderRadius: "15px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#39A108", fontWeight: "800" }}>Phone</Form.Label>
              <Form.Control
                type="text"
                value={userData?.mobile ?? ""}
                onChange={e => setUserData(userData ? { ...userData, mobile: e.target.value } : userData)}
                style={{ background: "#F2F2F2", border: "none", borderRadius: "15px" }}
              />
            </Form.Group>
            {/* Hide user id field */}
            <div className="d-flex justify-content-end mt-4" style={{ gap: "10px" }}>
              <Button
                variant="outline-success"
                style={{ fontWeight: "700", borderRadius: "8px", padding: "6px 20px", width: "250px", color: discardHover ? "white" : undefined, borderColor: discardHover ? "#39A108" : undefined, backgroundColor: discardHover ? "#39A108" : "transparent", transition: "all 0.3s ease" }}
                onMouseEnter={() => setDiscardHover(true)}
                onMouseLeave={() => setDiscardHover(false)}
                type="button"
              >
                DISCARD
              </Button>
              <Button
                variant="success"
                style={{ fontWeight: "700", borderRadius: "8px", padding: "6px 20px", width: "250px" }}
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "KEEP CHANGES"}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}
