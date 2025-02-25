import React from "react";

const TypingIndicator : React.FC<{who : string}> = ({ who }) => {
  return (
    <div className="flex items-center gap-1 p-2 bg-gray-300 rounded-lg w-fit">
      <span className="text-gray-600">{who} Píše</span>
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:0s]"></span>
        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </div>
    </div>
  );
}

export default TypingIndicator;