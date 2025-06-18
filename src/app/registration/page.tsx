"use client";
import React, { useState } from "react";
import LogInComp from "../_components/LoginComponent/LogInComp";

function Page() {
  const [selectedLang, setSelectedLang] = useState(0);
  const [regAllowed, setRegAllowed] = useState(false);
  const [isRegFilled, setIsRegFilled] = useState(false);
  return (
    <div>
      {regAllowed && !isRegFilled ? (
        <LogInComp
          formToRender="registration"
          setIsRegFilled={setIsRegFilled}
        />
      ) : regAllowed && isRegFilled ? (
        <LogInComp formToRender="verification" />
      ) : (
        <LogInComp
          formToRender="lang"
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
          setRegAllowed={setRegAllowed}
        />
      )}
    </div>
  );
}

export default Page;
