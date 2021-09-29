import axios from "axios";
import { NOTES_API, ADD_NOTES_API, EDIT_NOTES_API } from "../../urls";

const fetchNotesData = async () => {
  try {
    const response = await axios.get(NOTES_API);
    return response;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${NOTES_API}/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const editNote = async (itemToBeEdited) => {
  try {
    const response = await axios.post(EDIT_NOTES_API, itemToBeEdited);
    return response;
  } catch (error) {
    console.log("editNote", error);
    return error;
  }
};

const addNote = async ({ title, body, color, isPin, tag }) => {
  try {
    const response = await axios.post(ADD_NOTES_API, {
      title,
      body,
      color,
      isPin,
      tag,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { fetchNotesData, deleteNote, editNote, addNote };
