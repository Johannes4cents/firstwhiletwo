import { signInWithGoogle } from "../../firebase/fireAuth";
import {
  createNewUserInFirestore,
  onInfoFound,
} from "../../firebase/handleLogin";

import { getInfoFromRawId } from "../../misc/handleFirestore";
import userStore from "../../stores/userStore";
import UserButton from "./UserButton";
import AdminBar from "../../AdminStuff/AdminBar";

const SignInBar = () => {
  const { loggedIn, setInfo, info } = userStore();

  // after successfully logging into the account

  async function onLogInSuccess(user) {
    // check if localStorage has info stored
    let foundInfo = JSON.parse(localStorage.getItem("info"));
    // if there is no localInfo try to get localInfo from firestore
    if (foundInfo == null) {
      let rawId = user.providerData[0].uid;
      getInfoFromRawId(rawId, (fireInfo) => {
        if (fireInfo == null) createNewUserInFirestore(rawId, setInfo);
        else onInfoFound(fireInfo, setInfo, user.uid);
      });
    } else {
      // localInfo was found
      onInfoFound(foundInfo, setInfo, user.uid);
    }
  }

  return (
    <div className="divRowColored" style={{ marginRight: "10px" }}>
      {info.admin && <AdminBar />}
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
