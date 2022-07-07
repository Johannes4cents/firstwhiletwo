import { signInWithGoogle } from "../../firebase/fireAuth";
import SignUpWithEMailModal from "../../firebase/signUpOptions/SignUpWithEMailModal";
import useModal from "../../hooks/useModal";
import AdminBar from "../../misc/elements/AdminBar";

import { getCreateUserListener } from "../../misc/handleFirestore";
import userStore from "../../stores/userStore";
import UserButton from "./UserButton";

const SignInBar = () => {
  const { loggedIn, setInfo } = userStore();
  const modal = useModal({
    modalContent: <SignUpWithEMailModal />,
    offsetY: 10,
    position: "bottomLeft",
  });

  // after successfully logging into the account

  async function onLogInSuccess(user) {
    // check if localStorage has info stored
    let foundInfo = JSON.parse(localStorage.getItem("info"));
    // if there is no localInfo try to get localInfo from firestore
    if (foundInfo == null) {
      getCreateUserListener(
        "users",
        "uid",
        "==",
        user.uid,
        (unsubscribe, result) => {
          if (result != null) {
            setInfo(result);
            unsubscribe();
          }
        }
      );
    } else {
      // localInfo was found
      setInfo(foundInfo);
    }
  }

  return (
    <div
      className="divRowColored"
      style={{ marginRight: "10px", justifyContent: "center" }}
    >
      <AdminBar />
      {loggedIn && <UserButton />}
      {!loggedIn && (
        <div
          className="divRow"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <img
            onClick={() => signInWithGoogle(onLogInSuccess)}
            src={"/images/btn_google_sign_in.png"}
          />

          <img
            src="/images/icons/btn_password_sign_in.png"
            onClick={() => modal.open()}
          />
        </div>
      )}
      {modal.element}
    </div>
  );
};

export default SignInBar;
