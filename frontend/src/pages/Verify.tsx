import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axios/instance";
import { useDispatch } from "react-redux";
import { login } from "../redux-store/auth";

import Toast from "../components/Toast";

const VerifyAccount = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const { email } = useParams();
  const [toastInfo, setToastInfo] = useState({
    message: "",
    type: "",
  });

  const handleVerify = () => {
    if (code.length >= 6) {
      axiosInstance
        .post("/mail/verify/" + email, {
          code: code,
        })
        .then(({ data }) => {
          if (data.error) {
            if (data.error === "bad code") {
              setToastInfo({ message: "špatný kód", type: "error" });
            }
          } else {
            setToastInfo({ message: "Kód úspěšně ověřen.", type: "success" });
            setTimeout(() => {
              setIsVerified(true);
              dispatch(login(data));
              location.href = "/";
            }, 2000);
          }
        });
    } else {
      setToastInfo({ message: "Kód musí být 6-ti místný.", type: "warning" });
    }
  };

  const handleResend = () => {
    axiosInstance
        .get("/mail/verify/" + email)
        .then(response => {
          if(response.data.error === "sended"){
            setToastInfo({
              message: "Platný kód již byl odeslán na váš e-mail.",
              type: "warning",
            });
          }
        })
    setToastInfo({
      message: "Nový kód byl odeslán na váš e-mail.",
      type: "success",
    });
  };

  useLayoutEffect(() => {
    axiosInstance.get("/mail/verify/" + email).then(({ data }) => {
      if (data.error && data.error === "no exists") {
        navigate("/");
      }
    });
  }, [email, navigate]);

  const closeToast = () => {
    setToastInfo({ message: "", type: "" });
  };

  return (
    !isVerified && (
      <>
        {toastInfo.message && toastInfo.type && (
          <Toast
            message={toastInfo.message}
            type={toastInfo.type}
            onClose={closeToast}
          />
        )}
        <div className="flex flex-col items-center justify-center w-screen min-h-screen px-4 bg-gray-600">
          <div className="w-full max-w-md p-6 text-center bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold text-purple-500">Ověření účtu</h2>
            <p className="mt-2 text-gray-600">
              Odeslali jsme ověřovací kód na váš e-mail:{" "}
              <span className="text-purple-500">{email}</span>. Zadejte jej
              níže.
            </p>

            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Zadejte kód"
              className="w-full px-4 py-2 mt-4 text-lg tracking-widest text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              onClick={handleVerify}
              className="w-full py-2 mt-4 font-semibold text-white transition bg-purple-500 rounded-lg hover:bg-purple-600"
            >
              Ověřit účet
            </button>

            <p className="mt-4 text-sm text-gray-500">
              Nepřišel vám kód?{" "}
              <button
                onClick={handleResend}
                className="font-semibold text-purple-500 hover:underline"
              >
                Odeslat znovu
              </button>
            </p>
          </div>
        </div>
      </>
    )
  );
};

export default VerifyAccount;
