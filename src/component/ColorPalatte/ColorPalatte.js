import styles from "./ColorPalatte.module.css";

const ColorPalatte = ({ setColor }) => {
  const colors = [
    "#FECACA",
    "#A7F3D0",
    "#BFDBFE",
    "#FDE68A",
    "#FBCFE8",
    "#F9FAFB",
  ];

  return (
    <div className={styles.ColorPalatte}>
      {colors.map((c) => {
        return (
          <button
            key={c}
            className={styles.ColorPalatteBtn}
            style={{ backgroundColor: `${c}` }}
            value={c}
            onClick={(e) => setColor(e.target.value)}
          ></button>
        );
      })}
    </div>
  );
};

export { ColorPalatte };
