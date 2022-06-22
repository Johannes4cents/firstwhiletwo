import { signInWithGoogle } from "../../firebase/fireAuth";

import {
  getCreateUserListener,
  getInfoFromRawId,
  getQueryListener,
} from "../../misc/handleFirestore";
import userStore from "../../stores/userStore";
import UserButton from "./UserButton";
import AdminBar from "../../AdminStuff/AdminBar";

const SignInBar = () => {
  const { loggedIn, setInfo } = userStore();

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
    <div className="divRowColored" style={{ marginRight: "10px" }}>
      <AdminBar />
      {loggedIn && <UserButton />}
      {!loggedIn && (
        <div className="signInButtons">
          <img
            onClick={() => signInWithGoogle(onLogInSuccess)}
            src={"/images/btn_google_sign_in.png"}
          />
        </div>
      )}
    </div>
  );
};

export default SignInBar;
