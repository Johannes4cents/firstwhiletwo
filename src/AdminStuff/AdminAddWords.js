import React, { useState, useEffect } from "react";
import db from "../firebase/fireInit";
import { doc, onSnapshot } from "firebase/firestore";
import Word from "../fire_classes/Word";
import { objectsToWords } from "../misc/handleWords";
import Fam, { objectsToFams } from "../fire_classes/Fam";
import Stem, { objectsToStems } from "../fire_classes/Stem";
import { objectsListToIdList } from "../misc/helperFuncs";
import { updateListFireDocument } from "../misc/getFireStoreDataOneTime";
import { toast } from "react-toastify";

const AdminAddWords = ({
  globalWords,
  setGlobalWords,
  selectedWord,
  setSelectedWord,
  globalFams,
  setGlobalFams,
  globalStems,
  setGlobalStems,
}) => {
  const [language, setLanguage] = useState("german");
  const [cat, setCat] = useState("any");
  const [name, setName] = useState("");
  const [wordFams, setWordFams] = useState([]);
  const [wordStems, setWordStems] = useState([]);

  const [newFam, setNewFam] = useState("");
  const [newStem, setNewStem] = useState("");
  const [isNewWord, setIsNewWord] = useState(true);
  const [removedStems, setRemovedStems] = useState([]);
  const [removedFams, setRemovedFams] = useState([]);

  useEffect(() => {
    const wordsRef = doc(db, "globalWords/", language);
    let listener = onSnapshot(wordsRef, (snapshot) => {
      setGlobalWords(
        objectsToWords(snapshot.data()[cat]).sort((a, b) =>
          a.text > b.text ? 1 : -1
        )
      );
    });
    return listener.unsubscribe;
  }, [language, cat]);

  useEffect(() => {
    const famsRef = doc(db, "globalWords/", language);
    let listener = onSnapshot(famsRef, (snapshot) => {
      setGlobalFams(objectsToFams(snapshot.data()["fams"]));
    });
    return listener.unsubscribe;
  }, [language]);

  useEffect(() => {
    const stemsRef = doc(db, "globalWords/", language);
    let listener = onSnapshot(stemsRef, (snapshot) => {
      setGlobalStems(objectsToStems(snapshot.data()["stems"]));
    });
    return listener.unsubscribe;
  }, [language]);

  useEffect(() => {
    if (selectedWord != null) {
      let foundFams = selectedWord.getFams(globalFams);
      let foundStems = selectedWord.getStems(globalStems);
      setName(selectedWord.text);
      setWordFams(foundFams);
      setWordStems(foundStems);
      if (selectedWord.text != "") setIsNewWord(false);
      else setIsNewWord(true);
    }
  }, [selectedWord]);

  const deleteWord = () => {
    let newWordList = globalWords.filter((w) => w.id != selectedWord.id);
    updateListFireDocument(
      "globalWords",
      language,
      cat,
      newWordList.map((w) => w.toObj())
    );

    let newStemList = globalStems.filter((s) => !wordStems.includes(s));
    updateListFireDocument(
      "globalWords",
      language,
      "stems",
      newStemList.map((s) => s.toObj())
    );

    let newFamList = globalFams.filter((f) => !wordFams.includes(f));
    updateListFireDocument(
      "globalWords",
      language,
      "fams",
      newFamList.map((f) => f.toObj())
    );
    clearWord();
  };

  const saveWord = () => {
    selectedWord.stems = objectsListToIdList(wordStems);
    selectedWord.fams = objectsListToIdList(wordFams);
    selectedWord.text = name;
    selectedWord.language = language;
    selectedWord.scope = "global";

    let wordNames = globalWords.map((w) => w.text.toLowerCase());

    if (!isNewWord || !wordNames.includes(name.toLocaleLowerCase())) {
      //update globalWordsList in List
      let newList = globalWords.filter((w) => w.id != selectedWord.id);
      newList.push(selectedWord);
      updateListFireDocument(
        "globalWords",
        language,
        cat,
        newList.map((wo) => wo.toObj())
      );

      // update new Fams
      let newFamList = [...globalFams].concat(wordFams.filter((s) => s.isNew));
      updateListFireDocument(
        "globalWords",
        language,
        "fams",
        newFamList.map((fm) => fm.toObj())
      );

      let newStemList = [...globalStems].concat(
        wordStems.filter((s) => s.isNew)
      );
      // update new stems
      updateListFireDocument(
        "globalWords",
        language,
        "stems",
        newStemList.map((st) => st.toObj())
      );

      // handle removed Stems
      if (removedStems.length > 0) {
        let newRemovedStemsList = newStemList.filter(
          (s) => !removedStems.includes(s)
        );
        updateListFireDocument(
          "globalWords",
          language,
          "stems",
          newRemovedStemsList.map((st) => st.toObj())
        );
      }

      // handle removed Fams
      if (removedFams.length > 0) {
        let newRemovedFamsList = newFamList.filter(
          (f) => !removedFams.includes(f)
        );
        updateListFireDocument(
          "globalWords",
          language,
          "fams",
          newRemovedFamsList.map((fm) => fm.toObj())
        );
      }

      clearWord();
    } else toast("Word already exists");
  };

  const clearWord = () => {
    setSelectedWord(new Word());
    setName("");
    setWordStems([]);
    setWordFams([]);
    setRemovedFams([]);
    setRemovedStems([]);
  };

  const onFamEnterPressed = (e) => {
    if (e.key == "Enter") {
      if (
        !wordFams
          .map((f) => f.text.toLowerCase())
          .includes(newFam.toLowerCase()) &&
        !globalFams
          .map((f) => f.text.toLowerCase())
          .includes(newFam.toLowerCase())
      ) {
        const fam = new Fam(newFam, selectedWord.id);
        fam.isNew = true;
        let newList = [...wordFams, fam];
        setWordFams(newList);
      } else toast("already a fam of another word");
      setNewFam("");
    }
    if (e.ctrlKey) {
      saveWord();
    }
  };

  const onStemEnterPressed = (e) => {
    if (e.key == "Enter") {
      if (
        !wordStems
          .map((s) => s.name.toLowerCase())
          .includes(newStem.toLowerCase()) &&
        !globalStems
          .map((s) => s.name.toLowerCase())
          .includes(newStem.toLowerCase())
      ) {
        const stem = new Stem(newStem.toLowerCase(), selectedWord.id);
        stem.isNew = true;
        let newList = [...wordStems, stem];
        setWordStems(newList);
      } else toast("already a stem of another word");
      setNewStem("");
    }
    if (e.ctrlKey) {
      saveWord();
    }
  };

  const onFamClicked = (fam) => {
    setRemovedFams([...removedFams, fam]);
    let newList = wordFams.filter((f) => f.id != fam.id);
    setWordFams(newList);
  };

  const onStemClicked = (stem) => {
    setRemovedStems([...removedStems, stem]);
    let newList = wordStems.filter((s) => s.id != stem.id);
    setWordStems(newList);
  };

  // submit Button
  // check if Word already exists
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="textBlackBold" style={{ marginBottom: "5px" }}>
        {selectedWord.text}
      </div>
      <div
        className="divRow"
        style={{
          width: "100px",
          justifyContent: "space-between",
          marginBottom: "2px",
        }}
      >
        <img
          className="icon20"
          src="/images/flags/flag_us.png"
          onClick={() => setLanguage("english")}
        />
        <img
          className="icon20"
          src="/images/flags/flag_german.png"
          onClick={() => setLanguage("german")}
        />
      </div>
      <div
        className="divRow"
        style={{ width: "100px", justifyContent: "space-between" }}
      >
        <img
          className="icon20"
          onClick={() => setLanguage("english")}
          src={
            language == "english"
              ? "/images/drawable/storyline_selected.png"
              : "/images/drawable/storyline_unselected.png"
          }
        />
        <img
          className="icon20"
          onClick={() => setLanguage("german")}
          src={
            language == "german"
              ? "/images/drawable/storyline_selected.png"
              : "/images/drawable/storyline_unselected.png"
          }
        />
      </div>
      <div className="divRow" style={{ marginTop: "5px" }}>
        <div
          className="scopeButton"
          style={{
            textAlign: "center",
            color: cat == "any" ? "orange" : "white",
          }}
          onClick={() => setCat("any")}
        >
          Any
        </div>
        <div
          className="scopeButton"
          style={{
            textAlign: "center",
            color: cat == "hot" ? "orange" : "white",
          }}
          onClick={() => setCat("hot")}
        >
          Hot
        </div>
        <div
          className="scopeButton"
          style={{
            textAlign: "center",
            color: cat == "news" ? "orange" : "white",
          }}
          onClick={() => setCat("news")}
        >
          News
        </div>
      </div>
      <div className="divColumn" style={{ marginTop: "5px" }}>
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ textAlign: "center" }}
        />
      </div>
      <div className="divColumn" style={{ marginTop: "5px" }}>
        Fams
        <input
          value={newFam}
          onChange={(e) => setNewFam(e.target.value)}
          onKeyDown={onFamEnterPressed}
          style={{ textAlign: "center", marginBottom: "2px" }}
        />
        <div
          style={{
            width: "200px",
            maxHeight: "100px",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {wordFams.map((f) => (
            <div
              key={f.id}
              className="divRowColored"
              style={{
                width: "100%",
                color: "white",
                display: "flex",
                justifyContent: "center",
                borderBottom: "2px solid white",
              }}
            >
              <div
                className="textWhiteBold"
                style={{ textAlign: "center" }}
                onClick={() => onFamClicked(f)}
              >
                {f.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="divColumn" style={{ marginTop: "5px" }}>
        Stems
        <input
          value={newStem}
          onChange={(e) => setNewStem(e.target.value)}
          onKeyDown={onStemEnterPressed}
          style={{ textAlign: "center", marginBottom: "2px" }}
        />
        <div
          style={{
            width: "200px",
            maxHeight: "100px",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {wordStems.map((s) => (
            <div
              key={s.id}
              className="divRowColored"
              style={{
                width: "100%",
                color: "white",
                display: "flex",
                justifyContent: "center",
                borderBottom: "2px solid white",
              }}
            >
              <div
                className="textWhiteBold"
                style={{ textAlign: "center" }}
                onClick={() => onStemClicked(s)}
              >
                {s.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="divRow"
        style={{ width: "100%", justifyContent: "space-around" }}
      >
        <img
          className="icon40"
          src="/images/drawable/icon_sponge.png"
          onClick={() => clearWord()}
        />
        <img
          className="icon25"
          src="/images/drawable/icon_trashcan.png"
          onClick={() => deleteWord()}
        />
        <img
          className="icon40"
          src="/images/drawable/btn_save.png"
          onClick={() => saveWord()}
        />
      </div>
      <div>{selectedWord.id}</div>
    </div>
  );
};

export default AdminAddWords;
