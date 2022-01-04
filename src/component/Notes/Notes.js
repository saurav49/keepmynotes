import styles from "./Notes.module.css";
import { useSelector } from "react-redux";
import { Note } from "../index";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadNotes } from "../../features/notes/noteSlice";
import { useTheme, useAuth } from "../../hooks/index";
import { SearchBar } from "../index";

const Notes = () => {
  const { notes } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { userId } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectTag, setSelectTag] = useState("");
  const [pinnedTagList, setPinnedTagList] = useState([]);
  const [othersTagList, setOthersTagList] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    dispatch(loadNotes(userId));
  }, [dispatch, userId]);

  console.log({ notes });

  const pinnedNote = notes.filter((note) => note.isPin);
  const othersNote = notes.filter((note) => !note.isPin);

  const handleSearchQuery = (searchQueryValue) => {
    setSearchQuery(searchQueryValue);

    const filterNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filterNotes);
  };

  const handleSelectTag = (selectedTag) => {
    if (selectedTag === "All Notes") {
      setSelectTag(selectedTag);
      setPinnedTagList([]);
      setOthersTagList([]);
    } else {
      setSelectTag(selectedTag);

      const tagList = notes.filter((note) => note.tag === selectedTag);

      if (tagList.length > 0) {
        setPinnedTagList(tagList.filter((note) => note.isPin));
        setOthersTagList(tagList.filter((note) => !note.isPin));
      } else {
        setPinnedTagList([]);
        setOthersTagList([]);
      }
    }
  };

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        handleSearchQuery={handleSearchQuery}
        handleSelectTag={handleSelectTag}
      />
      {searchQuery.length <= 0 ? (
        <>
          {selectTag.length > 0 && selectTag !== "All Notes" ? (
            <>
              <PinnedNote pinnedNote={pinnedTagList} theme={theme} />
              <OtherNote othersNote={othersTagList} theme={theme} />
            </>
          ) : (
            <>
              <PinnedNote pinnedNote={pinnedNote} theme={theme} />
              <OtherNote othersNote={othersNote} theme={theme} />
            </>
          )}
        </>
      ) : (
        <FilterNote filteredNotes={filteredNotes} />
      )}
    </div>
  );
};

const PinnedNote = ({ pinnedNote, theme }) => {
  return (
    <div className={styles.notesWrapper}>
      <h2
        className={
          theme === "DARK"
            ? `${styles.darkHeadingTwo}`
            : `${styles.lightHeadingTwo}`
        }
      >
        Pinned
      </h2>

      <div className={styles.notes}>
        {pinnedNote.length > 0 ? (
          pinnedNote.map((note) => {
            return (
              <Note
                key={note._id}
                id={note._id}
                title={note.title}
                body={note.body}
                color={note.color}
                tag={note.tag}
                isPin={note.isPin}
              />
            );
          })
        ) : (
          <p
            className={
              theme === "DARK"
                ? `${styles.noteMsg} ${styles.noteMsgDark}`
                : `${styles.noteMsg} ${styles.noteMsgLight}`
            }
          >
            No Pinned Notes
          </p>
        )}
      </div>
    </div>
  );
};

const OtherNote = ({ othersNote, theme }) => {
  return (
    <div className={styles.notesWrapper}>
      <h2
        className={
          theme === "DARK"
            ? `${styles.darkHeadingTwo}`
            : `${styles.lightHeadingTwo}`
        }
      >
        Other
      </h2>

      <div className={styles.notes}>
        {othersNote.length > 0 ? (
          othersNote.map((note) => {
            return (
              <Note
                key={note._id}
                id={note._id}
                title={note.title}
                body={note.body}
                color={note.color}
                tag={note.tag}
                isPin={note.isPin}
              />
            );
          })
        ) : (
          <p
            className={
              theme === "DARK"
                ? `${styles.noteMsg} ${styles.noteMsgDark}`
                : `${styles.noteMsg} ${styles.noteMsgLight}`
            }
          >
            No Unpinned Notes
          </p>
        )}
      </div>
    </div>
  );
};

const FilterNote = ({ filteredNotes }) => {
  return (
    <div className={styles.notesWrapper}>
      {filteredNotes.map((note) => {
        return (
          <Note
            key={note._id}
            id={note._id}
            title={note.title}
            body={note.body}
            color={note.color}
            tag={note.tag}
            isPin={note.isPin}
          />
        );
      })}
    </div>
  );
};

export { Notes };
