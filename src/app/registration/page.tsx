"use client";
import React, { useState } from "react";
import LogInComp from "../_components/LoginComponent/LogInComp";

function Page() {
  const [isLangSelected, setIsLangSelected] = useState(false);
  const [isRegFilled, setIsRegFilled] = useState(false);
  return (
    <div>
      {isLangSelected && !isRegFilled ? (
        <LogInComp
          formToRender="registration"
          setIsRegFilled={setIsRegFilled}
        />
      ) : isLangSelected && isRegFilled ? (
        <LogInComp formToRender="verification" />
      ) : (
        <LogInComp formToRender="lang" setIsLangSelected={setIsLangSelected} />
      )}
    </div>
  );
}

export default Page;
