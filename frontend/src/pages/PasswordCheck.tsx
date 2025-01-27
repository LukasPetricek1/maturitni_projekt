
import React , { ChangeEvent, useEffect, useState, useRef } from "react"
import UserInput from "../components/UserInput";

interface Props { 
  setValid : (value : boolean) => void;
  value : string;
  setValue: (e : ChangeEvent<HTMLInputElement>) => void;
}

const PasswordCheck : React.FC<Props> = ({ setValid , value, setValue }) => { 
  const password = useRef<HTMLInputElement>(null)!
  

  const [rules, setRules] = useState({
    noSpace : true,
    length: 0,
    letters: 0,
    digits: 0,
    specialSymbols : 0
  })

  useEffect(() => { 
    const { noSpace, length , letters, digits, specialSymbols} = rules;
    if(noSpace && length <= 30 && letters >= 6 && digits >= 2 && specialSymbols >= 1){
      setValid(true)
    }else{ 
      setValid(false)
    }
  }, [rules, setValid])

  function handleChange(e : ChangeEvent<HTMLInputElement>){ 
    if(e.target.value !== " "){ 
      setValue(e)

      setRules(prev => { 
        return {
          ...prev,
          noSpace : !e.target.value.includes(" "),
          letters : (e.target.value.match(/[a-zA-Z]/g) || []).length,
          digits : (e.target.value.match(/\d/g) || []).length,
          specialSymbols : (e.target.value.match(/[!@#$%&]/g) || []).length
        }
      })
    }
  }

  return (
    <UserInput
      id="password"
      label="Heslo"
      maxLength={30}
      name="password"
      onChange={handleChange}
      placeholder="Vaše heslo"
      value={value}
      type="password"
      ref={password}
    > 
    <div className="mt-4 mb-4">
        <h1 className="text-white">Heslo musí: </h1>  
        <ul className="list-inside text-red-700">
          <li className={rules.noSpace ? "text-green-500" : "text-red-700"}>Nesmí obsahovat mezezery</li>
          <li className={rules.length <= 30 ? "text-green-500" : "text-red-700"}>Kratší než 30 znaků</li>
          <li className={rules.letters >= 6 ? "text-green-500" : "text-red-700"}>Mít alespoň 6 písmen</li>
          <li className={rules.digits >= 2 ? "text-green-500" : "text-red-700"}>Obsahovat alespoň 2 číslice</li>
          <li className={rules.specialSymbols >= 1 ? "text-green-500" : "text-red-700"}>Obsahovat alespoň 1 následující znak (@,#,$,%,&,)</li>
        </ul>
    </div>
    </UserInput>
  )
}

export default PasswordCheck;