import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

function Home({ setUserData }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", desc: "" });
  const [currentNote, setCurrentNote] = useState({ title: "", desc: "", noteId: "" });
  const [noteId, setNoteID] = useState({ noteId: "" });

  const [error, setError] = useState("");

  async function getAllNotes() {
    const { data } = await axios.get("https://notes-api.fly.dev/note", {
      headers: { authorization: `Bearer ${token}` },
    });

    if (data.message === "Done") {
      setNotes(data.note);
    } else if (data.message === "catch error") {
      localStorage.removeItem("token");
      setUserData(null);
      navigate("/login");
    } else {
      setNotes([]);
    }
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  function getNote({ target }) {
    setNewNote({ ...newNote, [target.name]: target.value });
  }

  function getNote2({ target }) {
    setCurrentNote({ ...currentNote, [target.name]: target.value, noteId: noteId });
  }

  async function addNote(e) {
    e.preventDefault();

    const { data } = await axios.post("https://notes-api.fly.dev/note", newNote, {
      headers: { authorization: `Bearer ${token}` },
    });

    if (data.message == "Done") {
      getAllNotes();
    } else if (data.message === "catch error") {
      localStorage.removeItem("token");
      setUserData(null);
      navigate("/login");
    } else {
      console.log(data.message);
      setError(data.error);
    }
  }

  async function deleteNote(noteId) {
    const { data } = await axios.delete("https://notes-api.fly.dev/note", {
      headers: { authorization: `Bearer ${token}` },
      data: { noteId },
    });

    if (data.message == "Done") {
      getAllNotes();
    } else if (data.message === "catch error") {
      localStorage.removeItem("token");
      setUserData(null);
      navigate("/login");
    } else {
      console.log(data.message);
      setError(data.error);
    }
  }

  function getNoteId(note) {
    setNoteID(note._id);
    setCurrentNote(note);
  }
  async function editNote(e) {
    e.preventDefault();

    const { data } = await axios.put(
      "https://notes-api.fly.dev/note",

      currentNote,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    if (data.message == "Done") {
      getAllNotes();
    } else if (data.message === "catch error") {
      localStorage.removeItem("token");
      setUserData(null);
      navigate("/login");
    } else {
      console.log(data.message);
      setError(data.error);
    }
  }

  return (
    <>
      <div className="container my-5">
        <div className="col-md-12 text-end">
          <a
            className="add p-2 btn"
            data-bs-toggle="modal"
            data-bs-target="#first"
            onClick={() => {
              setNewNote({ title: "", desc: "" });
            }}
          >
            <i className="fas fa-plus-circle"></i> Add New
          </a>
        </div>
      </div>

      <Modal id={"first"} type={addNote} getNote={getNote} note={newNote} />
      <Modal id={"second"} type={editNote} getNote={getNote2} note={currentNote} />

      <div className="container">
        <div className="row">
          {notes.map((note, index) => {
            return (
              <div key={index} className="col-md-4 my-4">
                <div className="note p-4">
                  <h3 className="float-start">{note.title}</h3>
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#second"
                    onClick={() => {
                      getNoteId(note);
                    }}
                  >
                    <i className="fas fa-edit float-end edit"></i>
                  </a>
                  <a
                    onClick={() => {
                      deleteNote(note._id);
                    }}
                  >
                    {" "}
                    <i className="fas fa-trash-alt float-end px-3 del"></i>
                  </a>
                  <span className="clearfix"></span>
                  <p className="word-wrap">{note.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
