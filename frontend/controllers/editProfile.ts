export interface ErrorProps  { 
    name : "name" | "username" | "website" | "bio";
    data : string[]
}

export const initialValidData : ErrorProps[] = [
  {
    name : "name",
    data : []
  } , 
  { 
    name : "username",
    data : []
  } , 
  {
    name : "bio",
    data : []
  } , { 
    name : "website" , 
    data : []
  }
]

const EditProfileController = (name : string, value : string) : ErrorProps[] => { 

  const errors : ErrorProps[] = initialValidData;
  
  switch (name) {
    case "name":
      if (!(value.trim().length > 5)) {
        errors.map(error => error.name === "name" && error.data.push("Musí mít alespoň 5 znaků."))
      }
      else if (!/^[a-zA-Zá-žÁ-Ž\s]+$/.test(value)) {
        errors.map(error => error.name === "name" && error.data.push("Pouze písmena a mezery."))
      }
      else if (value.length > 50) {
        errors.map(error => error.name === "name" && error.data.push("Nesmí být delší než 50 znaků."))
      }
      else {
        errors.map(error => {
          if(error.name === "name") error.data = []
        })
      }
      break;

      case "username":
        if (!(value.trim())) {
          errors.map(error => error.name === "username" && error.data.push("Uživatelské Jméno nesmí být prázdné."))
        }
        else if (!/^[a-z0-9_.]+$/.test(value)) {
          errors.map(error => error.name === "username" && error.data.push("Uživatelské Jméno musí obsahovat pouze písmena, čísla, _ a ."))
        }
        else if (value.length < 3 || value.length > 30) {
          errors.map(error => error.name === "username" && error.data.push("Uživatelské jméno musí být delší než 3 a kratší než 30 znaků."))
        }
        else if (/^\./.test(value) || /\.$/.test(value)) {
          errors.map(error => error.name === "username" && error.data.push("Uživatelské jméno nesmí začínat nebo končit tečkou."))
        }
        else if (/_{2,}|\.\./.test(value)) {
          errors.map(error => error.name === "username" && error.data.push("V uživatelském jméně se nesmí objevit více teček za sebou."))
        }
        else {
          errors.map(error => {
            if(error.name === "username") error.data = []
          })
        }
        break;

    case "web":
      if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value)) {
        errors.map(error => error.name === "website" && error.data.push("Osobní stránka musí být platnou URL adresou začínající http:// nebo https://"))
      }
      else if (value.length > 100) {
        errors.map(error => error.name === "website" && error.data.push("Osobní stránka nesmí být delší než 100 znaků."))
      }
      else {
        errors.map(error => {
          if(error.name === "website") error.data = []
        })
      }
      break;

    case "bio":
      if (value.length > 250) {
        errors.map(error => error.name === "bio" && error.data.push("BIO musí být kratší než 250 znaků."))
      }
      else {
        errors.map(error => {
          if(error.name === "bio") error.data = []
        })
      }
      break;
    }

    return errors;
}

export default EditProfileController;