import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchNotesData,
  deleteNote,
  editNote,
  addNote,
} from "../services/notes";
import { toast } from "react-toastify";
const initalTags = ["Work", "Study", "No Tag"];

const initialState = {
  status: "idle",
  notes: [],
  tags: JSON.parse(localStorage.getItem("keepmynote__allTags")) || initalTags,
};

export const loadNotes = createAsyncThunk("notes/loadNotes", async (userId) => {
  const id = userId || JSON.parse(localStorage.getItem("keepmynote__userId"));
  let response;
  if (id) {
    response = await fetchNotesData({ id });
  }
  return response.data;
});

export const addNewNote = createAsyncThunk(
  "notes/addNewNote",
  async ({ userId, title, body, color, isPin, tag }) => {
    const id = userId || JSON.parse(localStorage.getItem("keepmynote__userId"));
    let response;
    if (id) {
      response = await addNote({
        userId: id,
        title,
        body,
        color,
        isPin,
        tag,
      });
    } else {
      toast.error(`Log in to start adding note`);
    }
    return response.data.savedNewNote;
  }
);

export const deleteNoteById = createAsyncThunk(
  "notes/deleteNoteById",
  async (id) => {
    const response = await deleteNote(id);
    return response.data.deletedNote._id;
  }
);

export const editNoteById = createAsyncThunk(
  "notes/editNoteById",
  async (itemsToBeEdited) => {
    const response = await editNote(itemsToBeEdited);
    return response.data;
  }
);

export const noteSlice = createSlice({
  name: "notes",
  error: "null",
  initialState,
  reducers: {
    inputNewTag: (state, action) => {
      localStorage.setItem(
        "keepmynote__allTags",
        JSON.stringify([...state.tags, action.payload])
      );
      return { ...state, tags: [...state.tags, action.payload] };
    },
    deleteBtnPressed: (state, action) => {
      localStorage.setItem(
        "keepmynote__allTags",
        JSON.stringify(state.tags.filter((tag) => tag !== action.payload))
      );
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload),
      };
    },
  },

  extraReducers: {
    [loadNotes.pending]: (state) => {
      state.status = "loading";
    },
    [loadNotes.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload) {
        state.notes = action.payload.notes;
      }
    },
    [loadNotes.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [addNewNote.pending]: (state) => {
      state.status = "loading";
    },
    [addNewNote.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload) {
        state.notes = [...state.notes, action.payload];
      }
    },
    [addNewNote.rejected]: (state, action) => {
      state.status = action.error.message;
    },

    [deleteNoteById.pending]: (state) => {
      state.status = "loading";
    },
    [deleteNoteById.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (!action.payload) {
        return;
      }
      const requiredIndex = state.notes.findIndex(
        (note) => note._id === action.payload
      );

      if (requiredIndex === -1) {
        state.notes = [...state.notes.slice(0, state.notes.length - 1)];
      } else {
        state.notes = [
          ...state.notes.slice(0, requiredIndex),
          ...state.notes.slice(requiredIndex + 1),
        ];
      }
    },
    [deleteNoteById.rejected]: (state, action) => {
      state.status = action.error.message;
    },

    [editNoteById.pending]: (state) => {
      state.status = "loading";
    },

    [editNoteById.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (!action.payload) {
        return;
      }
      const idToBeUpdated = action.payload.id;
      const itemsToBeUpdated = action.payload.itemsToBeUpdated;

      state.notes = state.notes.map((note) =>
        note._id === idToBeUpdated ? { ...note, ...itemsToBeUpdated } : note
      );
    },

    [editNoteById.rejected]: (state, action) => {
      state.status = action.error.message;
    },
  },
});

export const { inputNewTag, deleteBtnPressed } = noteSlice.actions;

export default noteSlice.reducer;
