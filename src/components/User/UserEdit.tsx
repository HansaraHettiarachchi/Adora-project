import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import u_image from "../../assets/images/User-Images/user-avatar.png";

export default function UserEdit() {
  const [discardHover, setDiscardHover] = useState(false);

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

      <div className="d-flex flex-wrap align-items-start justify-content-between">
        <div style={{ flex: "1 1 55%" }}>
          <div className="mb-3">
            <h5 style={{ color: "#39A108", fontWeight: "800" }}>
              MOHAMED <span style={{ color: "#000" }}>MUKARRAM</span>
            </h5>
          </div>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#39A108", fontWeight: "800" }}>
                USER <span style={{ color: "#000" }}>ID</span>
              </Form.Label>
              <Form.Control
                type="text"
                value="mohamed123"
                style={{
                  background: "#F2F2F2",
                  border: "none",
                  borderRadius: "15px",
                  width: "140px",
                }}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#39A108", fontWeight: "800" }}>
                EMAIL <span style={{ color: "#000" }}>ID</span>
              </Form.Label>
              <Form.Control
                type="email"
                value="mohamed123@gmail.com"
                style={{ background: "none" }}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#39A108", fontWeight: "800" }}>
                BIO
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value="Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus..."
                style={{
                  background: "#F2F2F2",
                  border: "none",
                  borderRadius: "15px",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#39A108", fontWeight: "800" }}>
                SHIPPING ADDRESS
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value="48, SRI WAIJIRAGANA MAWATHA, DEMATAGOA ROAD..."
                style={{
                  background: "#F2F2F2",
                  border: "none",
                  borderRadius: "15px",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#39A108", fontWeight: "800" }}>
                PHONE
              </Form.Label>
              <Form.Control
                type="text"
                value="+94 76 123 4567"
                style={{
                  background: "#F2F2F2",
                  border: "none",
                  borderRadius: "15px",
                  width: "150px",
                }}
              />
            </Form.Group>
          </Form>
        </div>

        <div
          className="text-center"
          style={{
            flex: "1 1 35%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={u_image}
            alt="Profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              padding: "3px",
            }}
          />
          <Button
            variant="success"
            style={{
              fontWeight: "600",
              borderRadius: "8px",
              padding: "6px 16px",
            }}
          >
            CHANGE PROFILE +
          </Button>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4" style={{ gap: "10px" }}>
        <Button
          variant="outline-success"
          style={{
            fontWeight: "700",
            borderRadius: "8px",
            padding: "6px 20px",
            width: "250px",
            color: discardHover ? "white" : undefined,
            borderColor: discardHover ? "#39A108" : undefined,
            backgroundColor: discardHover ? "#39A108" : "transparent",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={() => setDiscardHover(true)}
          onMouseLeave={() => setDiscardHover(false)}
        >
          DISCARD
        </Button>
        <Button
          variant="success"
          style={{
            fontWeight: "700",
            borderRadius: "8px",
            padding: "6px 20px",
            width: "250px",
          }}
        >
          KEEP CHANGES
        </Button>
      </div>
    </Container>
  );
}
