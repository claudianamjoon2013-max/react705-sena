function Tortuga({ posicion }) {
  return (
    <div
      style={{
        fontSize: "60px", // 👈 Tamaño aumentado
        position: "absolute",
        top: "145px",
        whiteSpace: "nowrap",
        left: `calc(50% - 60px + ${posicion}px)`,
        transition: "left 0.2s ease-out",
        filter: "drop-shadow(0 0 10px #00f0ff)",
        userSelect: "none",
        zIndex: 2
      }}
    >
      👾 👩‍🚀
    </div>
  );
}

export default Tortuga;
