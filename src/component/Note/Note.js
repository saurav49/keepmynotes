import styles from "./Note.module.css";
import { ColorPalatte, Modal } from "../index";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaBookmark, FaRegBookmark, AiOutlineDelete } from "../../Icons/Icons";
import { IconContext } from "react-icons/lib";
import { editNoteById } from "../../features/notes/noteSlice";
import { useDispatch } from "react-redux";

const Note = ({ id, title, body, color, tag, isPin }) => {
  const { tags } = useSelector((state) => state.notes);

  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);
  const [isEdit, setIsEdit] = useState(false);
  const [editColor, setEditColor] = useState(color);
  const [editTag, setEditTag] = useState(tag);
  const [editIsPin, setEditIsPin] = useState(isPin);
  const [showModal, setShowModal] = useState(false);
  const [idToBeDeleted, setIdToBeDeleted] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const editCondition =
      editTitle !== title ||
      editBody !== body ||
      editColor !== color ||
      editTag !== tag ||
      editIsPin !== isPin;
    if (editCondition) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [
    editTitle,
    editBody,
    editColor,
    editTag,
    editIsPin,
    title,
    body,
    color,
    tag,
    isPin,
  ]);

  const handleDeleteNote = (id) => {
    setShowModal((showModal) => !showModal);

    setIdToBeDeleted(id);
  };

  const handleEditNote = (id) => {
    let editNoteObj = {};
    editTitle !== title
      ? (editNoteObj = { ...editNoteObj, title: editTitle })
      : (editNoteObj = { ...editNoteObj });
    editBody !== body
      ? (editNoteObj = { ...editNoteObj, body: editBody })
      : (editNoteObj = { ...editNoteObj });
    editColor !== color
      ? (editNoteObj = { ...editNoteObj, color: editColor })
      : (editNoteObj = { ...editNoteObj });
    editTag !== tag
      ? (editNoteObj = { ...editNoteObj, tag: editTag })
      : (editNoteObj = { ...editNoteObj });
    editIsPin !== isPin
      ? (editNoteObj = { ...editNoteObj, isPin: editIsPin })
      : (editNoteObj = { ...editNoteObj });

    editNoteObj = { ...editNoteObj, id };

    dispatch(editNoteById(editNoteObj));
  };

  return (
    <div
      key={id}
      className={styles.note}
      style={{ backgroundColor: `${editColor}` }}
    >
      <div className={styles.titleAndPin}>
        <NoteTitle title={editTitle} setEditTitle={setEditTitle} />
        <NotePin editIsPin={editIsPin} setEditIsPin={setEditIsPin} />
      </div>

      <NoteBody body={editBody} setEditBody={setEditBody} />

      <div className={styles.noteTools}>
        <div>
          <ColorPalatte setColor={setEditColor} />
        </div>

        <div className={styles.colorPalatteAndTools}>
          <NoteDelete id={id} handleDeleteNote={handleDeleteNote} />

          <div className={styles.tagAndSave}>
            <NoteSelect tags={tags} editTag={editTag} setEditTag={setEditTag} />

            <NoteSave id={id} isEdit={isEdit} handleEditNote={handleEditNote} />
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          itemToBeDeleted={idToBeDeleted}
          deleteType="NOTES"
        />
      )}
    </div>
  );
};

const NoteTitle = ({ title, setEditTitle }) => {
  return (
    <div
      contentEditable="true"
      suppressContentEditableWarning={true}
      role="textbox"
      className={styles.noteTitle}
      onInput={(e) => setEditTitle(e.target.innerText.replace(/\n/g, ""))}
    >
      <p>{title}</p>
    </div>
  );
};

const NotePin = ({ editIsPin, setEditIsPin }) => {
  return (
    <button
      className={styles.pinBtn}
      value={editIsPin}
      onClick={() => setEditIsPin((editIsPin) => !editIsPin)}
    >
      {editIsPin ? (
        <IconContext.Provider value={{ color: "#34D399" }}>
          <FaBookmark className={styles.pinIcon} />
        </IconContext.Provider>
      ) : (
        <IconContext.Provider value={{ color: "#34D399" }}>
          <FaRegBookmark className={styles.pinIcon} />
        </IconContext.Provider>
      )}
    </button>
  );
};

const NoteBody = ({ body, setEditBody }) => {
  return (
    <div
      contentEditable="true"
      suppressContentEditableWarning={true}
      role="textbox"
      className={styles.noteBody}
      onInput={(e) => setEditBody(e.target.innerText.replace(/\n/g, ""))}
    >
      <p>{body}</p>
    </div>
  );
};

const NoteDelete = ({ id, handleDeleteNote }) => {
  return (
    <button className={styles.deleteBtn} onClick={() => handleDeleteNote(id)}>
      <IconContext.Provider value={{ color: "#EF4444" }}>
        <AiOutlineDelete />
      </IconContext.Provider>
    </button>
  );
};

const NoteSave = ({ id, isEdit, handleEditNote }) => {
  return (
    <button
      disabled={!isEdit}
      className={styles.saveBtn}
      onClick={() => handleEditNote(id)}
    >
      SAVE
    </button>
  );
};

const NoteSelect = ({ editTag, setEditTag, tags }) => {
  return (
    <select value={editTag} onChange={(e) => setEditTag(e.target.value)}>
      {tags.map((tag) => {
        return (
          <option key={tag} value={`${tag}`}>
            {tag}
          </option>
        );
      })}
    </select>
  );
};

export { Note };
