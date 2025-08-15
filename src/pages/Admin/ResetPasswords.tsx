import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPasswords = () => {
  const styles = {
    outerBox: {
      border: "1px solid #28a745",
      borderRadius: "20px",
      position: "relative" as const,
      top: "27px",
      left: "10px",
      padding: "10px",
      background: "#fff",
      maxWidth: "100%",
    },
    titleBar: {
      color: "#28a745",
      fontWeight: "bold",
      fontSize: "25px",
      borderBottom: "1px solid #28a745",
      padding: "6px 10px",
    },
    innerBox: {
      border: "1px solid #28a745",
      borderRadius: "20px",
      margin: "10px 0",
      padding: "20px 15px",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: "bold",
      color: "#28a745",
      fontSize: "13px",
      marginBottom: "12px",
    },
    dataRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap" as const,
      gap: "10px",
    },
    cell: {
      flex: 1,
      textAlign: "center" as const,
      minWidth: "150px",
    },
    input: {
      border: "1px solid #28a745",
      borderRadius: "50px",
      padding: "6px 12px",
      outline: "none",
      width: "100%",
      maxWidth: "200px",
      textAlign: "center" as const,
    },
    boldText: {
      fontWeight: "bold",
      color: "#000",
    },
    buttonBox: {
      display: "flex",
      justifyContent: "flex-end",
      margin: "15px  12px",
    },
    button: {
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      padding: "6px 20px",
      fontWeight: "bold",
      cursor: "pointer",
      width: "100%",
      maxWidth: "200px",
      textAlign: "center" as const,
    },
  };

  return (
    <div style={styles.outerBox} className="container">
      <div style={styles.titleBar}>Reset Password</div>

      <div style={styles.innerBox}>
        {/* Header */}
        <div style={styles.headerRow} className="d-none d-md-flex">
          <div style={styles.cell}>Customer ID</div>
          <div style={styles.cell}>Current Password</div>
          <div style={styles.cell}>New Password</div>
          <div style={styles.cell}>Confirm Password</div>
        </div>

        {/* Data Row */}
        <div style={styles.dataRow}>
          <div style={{ ...styles.cell, ...styles.boldText }}>CI003</div>
          <div style={styles.cell}>
            <input
              type="password"
              style={styles.input}
              aria-label="Current Password"
              placeholder="Current Password"
              title="Current Password"
            />
          </div>
          <div style={styles.cell}>
            <input
              type="password"
              style={styles.input}
              aria-label="New Password"
              placeholder="New Password"
              title="New Password"
            />
          </div>
          <div style={styles.cell}>
            <input
              type="password"
              style={styles.input}
              aria-label="Confirm Password"
              placeholder="Confirm Password"
              title="Confirm Password"
            />
          </div>
        </div>

        <div style={styles.buttonBox}>
          <button style={styles.button}>Reset Password</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswords;
