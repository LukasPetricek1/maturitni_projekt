import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axios/instance";
import { useDispatch } from "react-redux";
import { login } from "../redux-store/auth";

const VerifyAccount = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isVerified, setIsVerified] = useState(false)
  const { email } = useParams()

  const handleVerify = () => {
    if(code.length >= 6){
      axiosInstance.post("/mail/verify/" + email , {
          code : code
      }).then(({ data }) => {
        if(data.error){
          if(data.error === "bad code"){
            console.log("bad code")
          }
        }else{ 
          setIsVerified(true)
          dispatch(login(data))
          location.href = "/"
        }
      })
    }
  };

  const handleResend = () => {
    alert("Nový kód byl odeslán na váš e-mail.");
  };

  useLayoutEffect(() => { 
    axiosInstance.get("/mail/verify/" + email)
      .then(({ data }) => { 
        if(data.error && data.error === "no exists"){ 
          navigate("/")
        }
      })
  } , [email, navigate])

  return (
    !isVerified && <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-600 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-purple-500">Ověření účtu</h2>
        <p className="text-gray-600 mt-2">
          Odeslali jsme ověřovací kód na váš e-mail: <span className="text-purple-500">{email}</span>. Zadejte jej níže.
        </p>
        
        {/* Input pro zadání kódu */}
        <input 
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Zadejte kód"
          className="mt-4 w-full border border-gray-300 rounded-lg px-4 py-2 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        
        {/* Tlačítko pro ověření účtu */}
        <button 
          onClick={handleVerify} 
          className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Ověřit účet
        </button>

        {/* Možnost odeslání kódu znovu */}
        <p className="text-gray-500 text-sm mt-4">
          Nepřišel vám kód?{" "}
          <button 
            onClick={handleResend} 
            className="text-purple-500 font-semibold hover:underline"
          >
            Odeslat znovu
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyAccount;
