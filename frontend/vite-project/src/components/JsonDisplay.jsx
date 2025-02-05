import React from "react";

const JsonDisplay = ({ data }) => (
  <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
    <pre className="text-sm text-gray-700 whitespace-pre-wrap break-words">
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
);

export default JsonDisplay;
