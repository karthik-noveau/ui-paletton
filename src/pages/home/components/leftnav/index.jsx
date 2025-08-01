import React from "react";

import styles from "./styles.module.css";
import { ColorInput } from "./color_input";

export const LeftNav = () => {
  return (
    <div className={`${styles.container}`}>
      <h1>Tailwind CSS Color Generator</h1>
      <p>
        Instantly create stunning color scales by entering a base color or
        hitting the spacebar.
      </p>

      <ColorInput />
    </div>
  );
};
