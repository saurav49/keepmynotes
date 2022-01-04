import { useState } from "react";
import styles from "./NewNote.module.css";
import { useTheme, useAuth } from "../../hooks";
import { ColorPalatte, AutoTextArea } from "../index";
import { FaRegBookmark, FaBookmark } from "../../Icons/Icons";
import { IconContext } from "react-icons/lib";
import { useSelector, useDispatch } from "react-redux";
import { addNewNote } from "../../features/notes/noteSlice";

const NewNote = () => {
  const [editNote, setEditNote] = useState(false);
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [noteColor, setNoteColor] = useState("#fff");
  const [isPinned, setIsPinned] = useState(false);
  const [tag, setTag] = useState("No Tag");

  const dispatch = useDispatch();

  const { tags } = useSelector((state) => state.notes);
  const { userId } = useAuth();

  const clearEditNote = () => {
    setEditNote((editNote) => !editNote);
    setTitle("");
    setBody("");
    setNoteColor("#fff");
    setIsPinned(false);
    setTag("");
  };

  const addNote = () => {
    dispatch(
      addNewNote({
        userId,
        title,
        body,
        color: noteColor,
        isPin: isPinned,
        tag,
      })
    );
    setTitle("");
    setBody("");
    setNoteColor("#fff");
    setIsPinned(false);
    setTag("");
  };

  return (
    <>
      {editNote ? (
        <div
          className={
            theme === "DARK"
              ? `${styles.editNote} ${styles.editNotePlaceholderDark}`
              : `${styles.editNote} ${styles.editNotePlaceholderLight}`
          }
          style={{ backgroundColor: `${noteColor}` }}
        >
          <div className={styles.titlePinComponent}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className={styles.title}
              style={{ backgroundColor: `${noteColor}` }}
            />
            <button
              className={styles.pinBtn}
              value={isPinned}
              onClick={() => setIsPinned(!isPinned)}
            >
              {isPinned ? (
                <IconContext.Provider value={{ color: "#34D399" }}>
                  <FaBookmark className={styles.pinIcon} />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ color: "#34D399" }}>
                  <FaRegBookmark className={styles.pinIcon} />
                </IconContext.Provider>
              )}
            </button>
          </div>
          <div>
            <AutoTextArea body={body} setBody={setBody} color={noteColor} />
          </div>
          <div className={styles.editNoteTools}>
            <ColorPalatte color={noteColor} setColor={setNoteColor} />
            <div>
              <select value={tag} onChange={(e) => setTag(e.target.value)}>
                {tags.map((tag) => {
                  return (
                    <option key={tag} value={`${tag}`}>
                      {tag}
                    </option>
                  );
                })}
              </select>
              <button
                className={styles.closeBtn}
                onClick={() => clearEditNote()}
              >
                clear
              </button>
              <button className={styles.addBtn} onClick={addNote}>
                Add
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            theme === "DARK"
              ? `${styles.editNotePlaceholder} ${styles.editNotePlaceholderDark}`
              : `${styles.editNotePlaceholder} ${styles.editNotePlaceholderLight}`
          }
          onClick={() => setEditNote((editNote) => !editNote)}
        >
          <p>Take a note...</p>
        </div>
      )}
    </>
  );
};

export { NewNote };
