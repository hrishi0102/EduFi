import React from "react";

const JsonDisplay = ({ data }) => (
  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
    <pre className="text-sm font-mono text-emerald-400 whitespace-pre-wrap break-words overflow-x-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
);

export default JsonDisplay;
