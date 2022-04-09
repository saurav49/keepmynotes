import axios from "axios";
import { toast } from "react-toastify";
import { NOTES_API, EDIT_NOTES_API } from "../../urls";

const fetchNotesData = async ({ id }) => {
  try {
    const response = await axios.get(`${NOTES_API}/${id}`);

    return response;
  } catch (error) {
    console.log({ error });
    toast.error(error.response.data.message);
  }
};

const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${NOTES_API}/deleteNote/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

const editNote = async (itemToBeEdited) => {
  const { id, ...items } = itemToBeEdited;

  try {
    const response = await axios.post(`${EDIT_NOTES_API}/${id}`, items);
    return response;
  } catch (error) {
    console.log("editNote", error);
    toast.error(error.response.data.message);
  }
};

const addNote = async ({ userId, title, body, color, isPin, tag }) => {
  try {
    const response = await axios.post(`${NOTES_API}/${userId}`, {
      userId,
      title,
      body,
      color,
      isPin,
      tag,
    });

    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export { fetchNotesData, deleteNote, editNote, addNote };
