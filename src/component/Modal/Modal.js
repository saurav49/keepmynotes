import styles from "./Modal.module.css";
import { ImCancelCircle } from "../../Icons/Icons";
import { IconContext } from "react-icons/lib";
import { useDispatch } from "react-redux";
import {
  deleteNoteById,
  deleteBtnPressed,
} from "../../features/notes/noteSlice";

const Modal = ({ itemToBeDeleted, setShowModal, deleteType }) => {
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    if (deleteType === "NOTES") {
      dispatch(deleteNoteById(itemToBeDeleted));
      setShowModal(false);
    } else {
      dispatch(deleteBtnPressed(itemToBeDeleted));
      setShowModal(false);
    }
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        <IconContext.Provider value={{ color: "#F87171" }}>
          <ImCancelCircle className={styles.modalIcon} />
        </IconContext.Provider>
        <h3>Are you sure?</h3>
        <p>
          Do you really want to delete this record? This process cannot be
          undone
        </p>
        <div className={styles.btns}>
          <button
            className={styles.cancelBtn}
            onClick={() => setShowModal(false)}
          >
            close
          </button>
          <button className={styles.deleteBtn} onClick={handleDeleteItem}>
            Delete
          </button>
        </div>
      </div>
      ;
    </div>
  );
};

export { Modal };

// 614c7d8055ace74768e8a0dc - second
// 614c7da455ace74768e8a0df - third
//
