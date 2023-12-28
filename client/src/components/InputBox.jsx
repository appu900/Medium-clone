import React, { useState } from "react";

export default function InputBox({ icon, name, type, id, value, placeholder }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className=" relative w-[100%] mb-4">
      <input
        name={name}
        type={
          type == "password" ? (passwordVisible ? "text" : "password") : type
        }
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"
      />
      <i class={"fi " + icon + " input-icon"}></i>
      {type == "password" ? (
        <i
          onClick={() => setPasswordVisible(!passwordVisible)}
          className={
            passwordVisible
              ? "fi fi-rr-eye input-icon left-auto cursor-pointer right-4"
              : "fi fi-rr-eye" +
                "-crossed" +
                " input-icon left-auto cursor-pointer right-4"
          }
        ></i>
      ) : (
        ""
      )}
    </div>
  );
}
