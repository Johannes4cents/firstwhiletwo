import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import useWindowSize from "../../hooks/useWindowSize";
import LoadingSpinner from "../../misc/elements/LoadingSpinner";
import { queryCollection, setDocInFirestore } from "../../misc/handleFirestore";
import { checkMsTimeDiff } from "../../misc/helperFuncs";
import userStore from "../../stores/userStore";

const AfterSignUpPage = () => {
  const windowSize = useWindowSize();
  const { info, setInfo } = userStore();
  const [switching, setSwitching] = useState(false);
  const btnRef = useRef();

  const [information, setInformation] = useState({
    uniqueName: "",
    password: "",
  });
  const [infosChecked, setInfosChecked] = useState({
    all: false,
    uniqueName: { ok: false, name: "", found: null },
    password: { ok: false, toShort: true },
  });

  const [checkingData, setCheckingData] = useState(false);
  const uniqueRef = useRef();
  const pwRef = useRef();

  useEffect(() => {
    if (uniqueRef.current) uniqueRef.current.focus();
  }, [uniqueRef]);

  function onUniqueChange(e) {
    setInfosChecked({ ...infosChecked, all: false });
    setInformation({ ...information, uniqueName: e.target.value });
    if (e.target.value.length > 2) {
      checkUsername(e.target.value.toLowerCase());
    }
  }

  function checkUsername(username) {
    setCheckingData(true);
    queryCollection("users", "uniqueName", "==", username, (result) => {
      setCheckingData(false);
      console.log("username - ", username);
      if (result.length > 0) {
        setInfosChecked({
          ...infosChecked,
          all: false,
          uniqueName: { ok: false, name: username, found: true },
        });
      } else {
        setInfosChecked({
          ...infosChecked,
          all: infosChecked.password.ok,
          uniqueName: { ok: true, name: username, found: false },
        });
        btnRef.current.focus();
      }
    });
  }

  function onPwChange(e) {
    setInformation({ ...information, password: e.target.value });
    setInfosChecked({
      ...infosChecked,
      all: infosChecked.uniqueName.ok && e.target.value.length > 5,
      password: {
        ok: e.target.value.length > 5,
        toShort: !(e.target.value.length > 5),
      },
    });
  }

  function onPwKey(e) {
    if (e.key == "Enter") {
      if (infosChecked.all) {
        saveInfos();
      } else if (infosChecked.password.ok) {
        toast("Enter a valid Username");
        uniqueRef.current.focus();
      } else {
        toast("Enter a valid password");
      }
    }
  }

  function onUniqueKey(e) {
    if (
      e.key == "Enter" &&
      infosChecked.uniqueName.name.length > 2 &&
      !infosChecked.uniqueName.found
    ) {
      console.log("focusing btn");
      pwRef.current.focus();
    }
  }

  function saveInfos() {
    if (infosChecked.all) {
      setSwitching(true);
      let newInfo = {
        ...info,
        uniqueName: information.uniqueName.toLowerCase(),
        nickname: information.uniqueName,
        password: information.password,
      };
      setDocInFirestore("users", info.uid, newInfo, () => {
        setInfo(newInfo);
      });
    } else {
      toast("Not everything is filled out");
    }
  }

  function clickFirstwhile() {
    console.log(
      "information - ",
      information,
      " | infosChecked - ",
      infosChecked,
      " | typeStop - ",
      checkingData
    );
  }

  return (
    <div
      className="divColumnColored"
      style={{
        height: `100vh`,
        width: `${windowSize.width}px`,
        position: "relative",
      }}
    >
      {switching && (
        <div style={{ position: "absolute" }}>
          <LoadingSpinner size={50} />
        </div>
      )}
      <div
        className="divColumn"
        onClick={clickFirstwhile}
        style={{ height: "100px", justifyContent: "center" }}
      >
        <div
          className="textBoldWhite"
          style={{ color: "lightgray", fontSize: "30px" }}
        >
          Firstwhile
        </div>
      </div>

      <div
        className="divColumn"
        style={{
          zIndex: 1,
          width: "55%",
          backgroundColor: "#5f5f5f",
          height: "75%",
          border: "4px solid white",
          borderRadius: "5rem/5rem",
        }}
      >
        {!switching && (
          <div>
            <InputHolder
              inputType={"text"}
              description={"Pick a unique @ name"}
              information={information}
              value={"uniqueName"}
              onChange={onUniqueChange}
              onKey={onUniqueKey}
              inputRef={uniqueRef}
            />
            {information.uniqueName.length > 2 && (
              <div className="divRow" style={{ justifyContent: "center" }}>
                {checkingData && (
                  <div
                    className="divRow"
                    style={{ width: "55px", justifyContent: "center" }}
                  >
                    <LoadingSpinner size={5} />
                  </div>
                )}
                {!checkingData && (
                  <div
                    className="textWhiteSmall"
                    style={{
                      color: infosChecked.uniqueName.found
                        ? "red"
                        : "lightblue",
                      alignItems: "center",
                      display: "flex",
                      height: "30px",
                    }}
                  >
                    {infosChecked.uniqueName.name}
                    {infosChecked.uniqueName.found ? " taken" : " available"}
                  </div>
                )}
              </div>
            )}

            <InputHolder
              inputType={"password"}
              description={"Pick a password"}
              information={information}
              value={"password"}
              onChange={onPwChange}
              onKey={onPwKey}
              inputRef={pwRef}
            />
            <div className="divColumn">
              {information.password && (
                <div
                  className="textWhiteSmall"
                  style={{
                    color: infosChecked.password.toShort ? "red" : "lightblue",
                  }}
                >
                  {infosChecked.password.toShort
                    ? "password to short"
                    : "password length OK"}
                </div>
              )}
            </div>
          </div>
        )}
        <div
          className="divColumn"
          style={{
            alignItems: "end",
            height: "100%",
            justifyContent: "end",
            width: "100%",
          }}
        >
          <img
            ref={btnRef}
            onClick={saveInfos}
            src="/images/drawable/btn_save.png"
            style={{
              objectFit: "contain",
              maxHeight: "40px",
              marginRight: "80px",
              marginBottom: "5px",
              filter: infosChecked.all ? null : "grayscale(100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const InputHolder = ({
  inputType,
  information,
  value,
  onChange,
  onKey,
  inputRef,
  description,
}) => {
  return (
    <div className="divColumn" style={{ marginTop: "20px" }}>
      <div className="textBoldWhite">{description}</div>
      <input
        autoComplete="new-password"
        type={inputType}
        onKeyDown={onKey}
        ref={inputRef}
        value={information[value]}
        style={{
          textAlign: "center",
          backgroundColor: "#4f4f4f",
          color: "white",
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default AfterSignUpPage;
