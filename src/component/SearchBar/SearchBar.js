import styles from "./SearchBar.module.css";
import { IconContext } from "react-icons/lib";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IoMdArrowDropdownCircle,
  AiOutlineDelete,
  ImSearch,
} from "../../Icons/Icons";
import { inputNewTag } from "../../features/notes/noteSlice";
import { Modal } from "../index";

const SearchBar = ({ searchQuery, handleSearchQuery, handleSelectTag }) => {
  const [showTagEdit, setShowTagEdit] = useState(false);
  const { tags } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [newTag, setNewTag] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteTag, setDeleteTag] = useState("");
  let newTags = [];

  useEffect(() => {
    const tag = localStorage.setItem("allTags", JSON.stringify(tags));
  }, [tags]);

  const handleNewTag = (e) => {
    if (e.key === "Enter") {
      dispatch(inputNewTag(newTag));
      setNewTag("");
    }
  };

  const handleDeleteTag = (tag) => {
    setShowModal((showModal) => !showModal);

    setDeleteTag(tag);
  };

  if (!tags.includes("All Notes")) {
    newTags = ["All Notes", ...tags];
  }

  return (
    <>
      <div className={styles.searchAndTagWrapper}>
        <div className={styles.searchBarWrapper}>
          <IconContext.Provider value={{ color: "rgb(124, 124, 124)" }}>
            <ImSearch className={styles.searchBarIcon} />
          </IconContext.Provider>
          <input
            className={styles.searchBar}
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e.target.value)}
          />
        </div>
        <div className={styles.tagBtnWrapper}>
          <button onClick={() => setShowTagEdit(!showTagEdit)}>
            All Notes
            <IconContext.Provider value={{ color: "#333", size: "1.5em" }}>
              <IoMdArrowDropdownCircle className={styles.tagBtnIcon} />
            </IconContext.Provider>
          </button>
        </div>
        {showTagEdit && (
          <div className={styles.tagEditWrapper}>
            {newTags.map((tag) => {
              return (
                <div
                  className={styles.tag}
                  onClick={() => handleSelectTag(tag)}
                >
                  <p className={styles.tagName}>{tag}</p>
                  <IconContext.Provider
                    value={{ color: "#EF4444", size: "1.2em" }}
                  >
                    <AiOutlineDelete
                      className={styles.tagDeleteBtn}
                      onClick={() => handleDeleteTag(tag)}
                    />
                  </IconContext.Provider>
                </div>
              );
            })}
            <input
              className={styles.addTag}
              type="text"
              value={newTag}
              placeholder="Add New Tag"
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleNewTag}
            />
          </div>
        )}
      </div>
      {showModal && (
        <Modal itemToBeDeleted={deleteTag} setShowModal={setShowModal} />
      )}
    </>
  );
};

export { SearchBar };

// <div className={styles.searchBarTagWrapper}>
//   <div className={styles.searchBarWrapper}>
//     <IconContext.Provider value={{ color: "rgb(124, 124, 124)" }}>
//       <ImSearch className={styles.searchBarIcon} />
//     </IconContext.Provider>
//     <input
//       className={styles.searchBar}
//       type="text"
//       placeholder="Search"
//       value={searchQuery}
//       onChange={(e) => handleSearchQuery(e.target.value)}
//     />
//   </div>
//   <div className={styles.tagBtn}>
//     <div className={styles.btnWrapper}>
//       <button onClick={() => setShowTagEdit(!showTagEdit)}>
//         All Notes
//         <IconContext.Provider value={{ color: "#333" }}>
//           <IoMdArrowDropdownCircle className={styles.tagBtnIcon}/>
//         </IconContext.Provider>
//       </button>
//     </div>

// </div>
// </div>
