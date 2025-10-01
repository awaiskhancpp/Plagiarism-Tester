export default function Grid({ height }) {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ height: `${height}vh` }}
      >
        {/* Dense grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Medium grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        ></div>

        {/* Large grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "160px 160px",
          }}
        ></div>

        {/* Purple accent grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168,85,247,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168,85,247,0.6) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
          }}
        ></div>
      </div>
    </>
  );
}
