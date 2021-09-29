import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  fetchNotesData,
  deleteNote,
  editNote,
  addNote,
} from "../services/notes";

const initalTags = ["Work", "Study", "No Tag"];

const initialState = {
  status: "idle",
  notes: [],
  tags: JSON.parse(localStorage.getItem("allTags")) || initalTags,
};

export const loadNotes = createAsyncThunk("notes/loadNotes", async () => {
  const response = await fetchNotesData();
  return response.data;
});

export const addNewNote = createAsyncThunk(
  "notes/addNewNote",
  async ({ title, body, color, isPin, tag }) => {
    const response = await addNote({ title, body, color, isPin, tag });
    return response.data.addedNewNote;
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
      return { ...state, tags: [...state.tags, action.payload] };
    },
    deleteBtnPressed: (state, action) => {
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
      state.notes = action.payload.notes;
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

      state.notes = [...state.notes, action.payload];
    },
    [addNewNote.rejected]: (state, action) => {
      state.status = action.error.message;
    },

    [deleteNoteById.pending]: (state) => {
      state.status = "loading";
    },
    [deleteNoteById.fulfilled]: (state, action) => {
      state.status = "fulfilled";

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
