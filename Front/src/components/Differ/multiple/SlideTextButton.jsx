import React from "react";

const SlideTextButton = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="btn-slide-vertical px-5 py-2 rounded-3xl text-sm font-semibold focus:outline-none"
    tabIndex={0}
  >
    <span className="btn-text top">{children}</span>
    <span className="btn-text bottom">{children}</span>
  </button>
);

export default SlideTextButton;