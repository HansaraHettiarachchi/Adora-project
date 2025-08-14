import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPasswords = () => {
  const styles = {
    outerBox: {
      border: "1px solid #28a745",
      borderRadius: "20px",
      width: "1000px",
      height: "200px",
      position: "relative" as const,
      top: "27px",
      left: "10px",
      opacity: 1,
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
      margin: "10px",
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
    },
    cell: {
      flex: 1,
      textAlign: "center" as const,
    },
    input: {
      border: "1px solid #28a745",
      borderRadius: "50px",
      padding: "6px 12px",
      outline: "none",
      width: "200px",
      textAlign: "center" as const, 
    },
    boldText: {
      fontWeight: "bold",
      color: "#000",
    },
  };

  return (
    <div style={styles.outerBox}>
      <div style={styles.titleBar}>Reset Password</div>

      <div style={styles.innerBox}>
        <div style={styles.headerRow}>
          <div style={styles.cell}>Customer ID</div>
          <div style={styles.cell}>Current Password</div>
          <div style={styles.cell}>New Password</div>
          <div style={styles.cell}>Confirm Password</div>
        </div>

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
      </div>
    </div>
  );
};

export default ResetPasswords;
