import React, { ChangeEvent, useState, useRef, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { userProps } from "../pages/Profile";
import InputCheck from "../pages/InputCheck";
import { HobbiesProps } from "./signup-steps/AddUserInfo";
import AddHobbies from "./AddHobbies";
import axiosInstance from "../axios/instance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeEmail, updateHobbies } from "../redux-store/auth";
interface AccountSettings {
  onClose: () => void;
  initialData: userProps;
}

const AccountSettings: React.FC<AccountSettings> = ({
  onClose,
  initialData,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setToastInfo } = useContext(AppContext);
  const imageInput = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<userProps>(initialData);
  const [hobbies, setHobbies] = useState<HobbiesProps>({
    current_hobby: "",
    all_hobbies: [...initialData.hobbies!.split(",")],
  });
  const [valid, setValid] = useState({
    name: true,
    username: true,
    web: true,
    email: true,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const resetData = () => {
    setUserData(initialData);
    setHobbies({
      current_hobby: "",
      all_hobbies: [...initialData.hobbies!.split(",")],
    });
  };

  const didUserChangeInfo = () => {
    let status = false;
    const currentData = { ...userData, hobbies: hobbies.all_hobbies.join(",") };

    Object.keys(initialData).forEach((key) => {
      if (initialData[key] !== currentData[key]) {
        status = true;
      }
    });

    return status;
  };

  interface props {
    toAdd: string[];
    toDelete: string[];
  }

  function findDifferenceBetweenArrays(a: string[], b: string[]): props {
    const bigger = a;
    const smaller = b;

    const toAdd = smaller.filter((item) => !bigger.includes(item));
    const toDelete = bigger.filter((item) => !smaller.includes(item));

    return {
      toAdd,
      toDelete,
    };
  }

  const send = async () => {
    const isChanges = didUserChangeInfo();
    if (!isChanges) {
      setToastInfo("Nic jste nezměnili.", "warning");
      return;
    }
    const { name, username, web, email } = valid;
    if (name && username && web && email) {
      let ok = true;

      if (initialData.username !== userData.username) {
        await axiosInstance
          .get("/username/exists?username=" + userData.username)
          .then(({ data }) => {
            if (data.error) {
              if (data.error === "username_exists") {
                setToastInfo(
                  `Uživatelské jméno ${userData.username} už existuje.`,
                  "error"
                );
                ok = false;
              }
            }
          });
      }

      if (initialData.email !== userData.email) {
        await axiosInstance
          .get("/email/exists?email=" + userData.email)
          .then(({ data }) => {
            if (data.error) {
              if (data.error === "email_exists") {
                setToastInfo(`Email ${userData.email} už existuje.`, "error");
                ok = false;
              }
            }
          });
      }

      if (!ok) return;

      if (hobbies.all_hobbies.length >= 3) {
        const sameEmail = initialData.email === userData.email;

        const prevHobbies = initialData.hobbies.split(",");
        const currentHobbies = hobbies.all_hobbies;

        const hobbiesDifference = findDifferenceBetweenArrays(
          prevHobbies,
          currentHobbies
        );

        axiosInstance
          .post("/users/update-info", {
            user_id: userData.id,
            username: userData.username,
            name: userData.name,
            web: userData.website,
            email: !sameEmail ? userData.email : null,
            bio: userData.bio,
          })
          .then(async () => {
            try {
              if (hobbiesDifference.toDelete.length) {
                for (const deleteHobby of hobbiesDifference.toDelete) {
                  await axiosInstance.post("/hobbies/delete", {
                    user_id: userData.id,
                    hobby: deleteHobby,
                  });
                }
              }
              if (hobbiesDifference.toAdd.length) {
                for (const addHobby of hobbiesDifference.toAdd) {
                  const hobby_response = await axiosInstance.post(
                    "/hobbies/add",
                    { hobby: addHobby }
                  );
                  const hobby_id = hobby_response.data[1][0].id;

                  await axiosInstance.post("/hobbies/connect", {
                    user_id: initialData.id,
                    hobby_id,
                  });
                }
              }

              if (!sameEmail) {
                dispatch(changeEmail(userData.email));
                window.location.href = "/login/verify/" + userData.email;
              }
              dispatch(updateHobbies(currentHobbies));

              setToastInfo(
                "Úspěšně jste aktualizovali svoje informace.",
                "success"
              );
              if (initialData.username !== userData.username) {
                navigate("/profile/" + userData.username);
              }
              onClose();
            } catch (err) {
              console.log(err);
            }
          })
          .catch((err) => {
            console.log(err);
            setToastInfo(
              "Nepodařilo se aktualizovat vaše informace. Zkuste to později.",
              "success"
            );
          });
      } else {
        setToastInfo("Musíte mít alespoň 3 zájmy", "warning");
      }
    } else {
      if (!name) setToastInfo("Upravte vaše jméno.", "warning");
      else if (!username)
        setToastInfo("Upravte vaše uživatelské jméno.", "warning");
      else if (!web) setToastInfo("Upravte váš web.", "warning");
      else if (!email) setToastInfo("Upravte váš email.", "warning");
    }
  };

  return (
    <>
      <input hidden type="file" accept="image/*" ref={imageInput} />

      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg max-h-[95%] w-11/12 max-w-2xl p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Upravit Profil</h2>
            <button
              onClick={onClose}
              className="text-xl font-bold text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {/* Obrazky, jdou opravit na profilove strance, mozna i tady budou */}
            {/* <div className="flex justify-between items-center">
              <label className="font-medium">Profilový Obrázek</label>
            </div>
            
            <ImageComponent src={profilePicture} For="profile-picture" user_id={userData.id} />

            <div className="flex justify-between items-center mt-4">
              <label className="font-medium">Úvodní Fotka</label>
            </div>

            <ImageComponent src={themePicture} For="theme-picture" user_id={userData.id} /> */}

            <section className="flex gap-4 w-full">
              <div className="mt-4 w-full">
                <InputCheck
                  type="text"
                  id="username"
                  label="Uživatelské jméno"
                  maxLength={45}
                  name="username"
                  placeholder="Uživatelské jméno"
                  setValue={(value) =>
                    setUserData((prev) => {
                      return { ...prev, username: value };
                    })
                  }
                  value={userData.username}
                  version={"light"}
                  setValid={(name, state) =>
                    setValid((prev) => {
                      return {
                        ...prev,
                        [name]: state,
                      };
                    })
                  }
                />
              </div>
              <div className="mt-4 w-full">
                <InputCheck
                  type="text"
                  id="name"
                  label="Jméno"
                  maxLength={45}
                  name="name"
                  placeholder="Jméno"
                  setValue={(value) =>
                    setUserData((prev) => {
                      return { ...prev, name: value };
                    })
                  }
                  value={userData.name}
                  version={"light"}
                  setValid={(name, state) =>
                    setValid((prev) => {
                      return {
                        ...prev,
                        [name]: state,
                      };
                    })
                  }
                />
              </div>
            </section>
            <div className="mt-4">
              <InputCheck
                type="url"
                id="web"
                label="Web"
                maxLength={100}
                name="web"
                placeholder="Web ..."
                setValue={(value) =>
                  setUserData((prev) => {
                    return { ...prev, website: value };
                  })
                }
                value={userData.website}
                version={"light"}
                setValid={(name, state) =>
                  setValid((prev) => {
                    return {
                      ...prev,
                      [name]: state,
                    };
                  })
                }
              />
            </div>

            <div className="mt-4">
              <InputCheck
                type="url"
                id="email"
                label="Email"
                maxLength={100}
                name="email"
                placeholder="Email ..."
                setValue={(value) =>
                  setUserData((prev) => {
                    return { ...prev, email: value };
                  })
                }
                value={userData.email}
                version={"light"}
                setValid={(name, state) =>
                  setValid((prev) => {
                    return {
                      ...prev,
                      [name]: state,
                    };
                  })
                }
              />
            </div>

            <div className="mt-4">
              <label className="font-medium">BIO</label>
              <textarea
                rows={3}
                className="mt-1 w-full border rounded-lg px-4 py-2 border-purple-500"
                placeholder="Popiš se..."
                value={userData.bio}
                name="bio"
                onChange={handleChange}
                maxLength={250}
              ></textarea>
            </div>
            <AddHobbies hobbies={hobbies} setHobbies={setHobbies} />
            <div className="flex gap-8">
              <button
                type="button"
                onClick={resetData}
                className="mt-6 w-full text-lg font-black text-purple-500 border border-purple-500 rounded-lg py-2"
              >
                Resetovat
              </button>
              <button
                className="mt-6 w-full bg-purple-500 text-white rounded-lg py-2 hover:bg-purple-600"
                onClick={send}
              >
                Odeslat
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
