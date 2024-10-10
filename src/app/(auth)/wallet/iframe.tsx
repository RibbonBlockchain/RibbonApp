import React from "react";

interface IframeComponentProps {
  src: string;
}

const IframeComponent: React.FC<IframeComponentProps> = ({ src }) => {
  return (
    <div className="h-screen w-full [&_iframe]:h-screen [&_iframe]:w-full">
      <iframe
        src={src}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Embedded Content"
      >
        Your browser does not support iframes.
      </iframe>
    </div>
  );
};

export default IframeComponent;
