import React from "react";
import { FiArrowRight, FiUser } from "react-icons/fi";

import styles from "./styles.module.css";

export const Preview = ({ shades }) => {
  return (
    <div className={styles.practicalExamples}>
      <h3 className={`text-18 weight-400 ${styles.paletteTitle}`}>
        Theme Preview
      </h3>

      {/* UI Components Showcase */}
      <div className={styles.componentsGrid}>
        {/* Buttons */}
        <div className={styles.componentGroup}>
          <div className={styles.buttonRow}>
            <button
              className={`text-14 weight-300 ${styles.primaryHoverButton}`}
              style={{
                backgroundColor: shades["base"],
                color: "white",
                "--hover-bg-color": shades["primary-600"],
              }}
            >
              Primary
            </button>
            <button
              className={`text-14 weight-300`}
              style={{
                backgroundColor: shades["primary-600"],
                color: "white",
              }}
            >
              Primary 600
            </button>
          </div>

          <div className={styles.buttonRow}>
            <button
              className={`text-14 weight-300`}
              style={{
                backgroundColor: shades["primary-25"],
                color: shades["primary-600"],
                border: `1px solid ${shades["primary-500"]}`,
              }}
            >
              Primary 25
            </button>
            <button
              className={`text-14 weight-300`}
              style={{
                backgroundColor: shades["primary-50"],
                color: shades["primary-600"],
                border: `1px solid ${shades["primary-500"]}`,
              }}
            >
              Primary 50
            </button>
            <button
              className={`text-14 weight-300`}
              style={{
                backgroundColor: shades["primary-100"],
                color: shades["primary-600"],
                border: `1px solid ${shades["primary-500"]}`,
              }}
            >
              Primary 100
            </button>
            <button
              className={`text-14 weight-300`}
              style={{
                backgroundColor: shades["primary-200"],
                color: shades["primary-600"],
                border: `1px solid ${shades["primary-500"]}`,
              }}
            >
              Primary 200
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className={styles.componentGroup}>
          <div className={styles.cardGrid}>
            <div
              className={styles.card}
              style={{
                backgroundColor: shades["primary-25"],
                // border: `1px solid ${shades["primary-400"]}`,
              }}
            >
              <div
                className={styles.cardHeader}
                style={{ color: shades["primary-500"] }}
              >
                <h4
                  className="text-18 weight-500"
                  style={{ color: shades["primary-800"] }}
                >
                  Team Member
                </h4>
              </div>
              <p
                className="text-13 weight-300"
                style={{ color: shades["primary-500"] }}
              >
                Another card variation with different styling.
              </p>
              <button
                className={styles.cardButton}
                style={{
                  backgroundColor: shades["primary-100"],
                  color: shades["primary-700"],
                }}
              >
                View Profile <FiArrowRight />
              </button>
            </div>

            <div
              className={styles.card}
              style={{ backgroundColor: shades["primary-50"] }}
            >
              <div
                className={`${styles.cardHeader}`}
                style={{ color: shades["primary-500"] }}
              >
                <FiUser className={styles.cardIcon} />
                <h4
                  className={`text-16 weight-300`}
                  style={{ color: shades["primary-700"] }}
                >
                  User Profile
                </h4>
              </div>
              <p
                className={`text-13 weight-300`}
                style={{ color: shades["primary-500"] }}
              >
                This is an example card showing how your colors work in
                components.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
