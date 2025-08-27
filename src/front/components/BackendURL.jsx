
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:3001";


import React from "react";
import envFile from "../../../docs/assets/env-file.png";

export const BackendURLHelp = () => {
  if (import.meta.env.VITE_BACKEND_URL) return null;

  const Dark = ({ children }) => (
    <span className="bg-dark text-white px-1 rounded">{children}</span>
  );

  return (
    <div className="mt-5 pt-5 w-50 mx-auto">
      <h2>Missing BACKEND_URL env variable</h2>
      <p>
        Here's a video tutorial on{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.awesomescreenshot.com/video/16498567?key=72dbf905fe4fa6d3224783d02a8b1b9c"
        >
          how to update your backend URL environment variable.
        </a>
      </p>
      <p>
        There's a file called <Dark>.env</Dark> that contains the environmental
        variables for your project.
      </p>
      <p>There's one variable called <Dark>VITE_BACKEND_URL</Dark> that needs to be set manually.</p>
      <ol>
        <li>Make sure your backend is running on port 3001.</li>
        <li>Open your API and copy the API host.</li>
        <li>Open the .env file (do not open .env.example)</li>
        <li>Add a new variable: <Dark>VITE_BACKEND_URL=&lt;your api host&gt;</Dark></li>
        <li>Replace <Dark>&lt;your api host&gt;</Dark> with the public API URL of your Flask backend.</li>
      </ol>
      <div className="w-100">
        <img src={envFile} className="w-100" alt="Env file example"/>
      </div>
      <p>
        Note: If you are publishing your website to Heroku, Render.com, or other hosting, you may need other steps.
      </p>
    </div>
  );
};
