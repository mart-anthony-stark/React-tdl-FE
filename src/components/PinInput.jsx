import React, { useState, useRef } from "react";
import useResetPass from "../hooks/useResetPass";
import FetchLoading from "./FetchLoading/FetchLoading";

const PinInput = ({ email }) => {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const { isLoading, sendVerifyCode } = useResetPass();

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.match(/\D/)) {
      return;
    }
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value !== "") {
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      } else {
        // All input boxes are filled, you can trigger an action here
        const code = pin.join("") + value;

        //   Handle Form Submission
        sendVerifyCode({ email, code });
      }
    } else {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && pin[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text/plain").trim();
    const newPin = [...pin];
    const digits = pasteData
      .split("")
      .filter((char) => !isNaN(parseInt(char, 10)));

    if (digits.length === 6) {
      digits.forEach((digit, index) => {
        newPin[index] = digit;
        if (index < 5) {
          inputRefs.current[index + 1].focus();
        }
      });
      setPin(newPin);

      //   Handle Form Submission
      const code = newPin.join("");
      sendVerifyCode({ email, code });
    }
  };

  const handleFocus = (index) => {
    inputRefs.current[index].select();
  };

  return (
    <div style={{ margin: "auto" }}>
      {isLoading ? <FetchLoading /> : null}

      {pin.map((digit, index) => (
        <input
          key={index}
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          maxLength="1"
          value={digit}
          ref={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          style={{
            width: "50px",
            height: "50px",
            marginRight: "10px",
            fontSize: "18px",
            textAlign: "center",
          }}
        />
      ))}
    </div>
  );
};

export default PinInput;
