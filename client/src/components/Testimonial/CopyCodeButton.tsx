import { useState } from "react";

const CopyCodeButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset "Copied" status after 2 seconds
    });
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "20px auto",
      }}
    >
      <pre
        style={{
          backgroundColor: "#f4f4f4",
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "4px",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
      >
        {code}
      </pre>
      <button
        className="mt-4 ml-4"
        onClick={handleCopy}
        style={{
          padding: "8px 16px",
          backgroundColor: copied ? "white" : "black",
          color: copied ? "black" : "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {copied ? "Copied!" : "Copy Code"}
      </button>
    </div>
  );
};

export default CopyCodeButton;
