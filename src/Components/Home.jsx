import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

function Home({ status, setSatus }) {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: "", desc: "" });
  const [note2, setNote2] = useState({ title: "", desc: "", noteId: "" });
  const [note2Id, setNote2ID] = useState({ noteId: "" });
  const [error, setError] = useState("");

  async function getAllNotes() {
    const { data } = await axios.get("https://salty-caverns-11746.herokuapp.com/note", {
      headers: { authorization: `Bearer ${token}` },
    });

    if (data.message === "Done") {
      setNotes(data.note);
    } else if (data.message === "catch error") {
      localStorage.removeItem("token");
      setSatus(false);
      navigate("/login");
    } else {
      setNotes([]);
    }
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  function getNote({ target }) {
    setNote({ ...note, [target.name]: target.value });
  }

  function getNote2({ target }) {
    setNote2({ ...note2, [target.name]: target.value, noteId: note2Id });
  }

  async function addNote(e) {
    e.preventDefault();

    const { data } = await axios.post("https://salty-caverns-11746.herokuapp.com/note", note, {
      headers: { authorization: `Bearer ${token}` },
    });

    if (data.message == "Done") {
      getAllNotes();
    } else if (data.message === "catch error") {
      navigate("/login");
    } else {
      console.log(data.message);
      setError(data.error);
    }
  }

  async function deleteNote(noteId) {
    const { data } = await axios.delete("https://salty-caverns-11746.herokuapp.com/note", {
      headers: { authorization: `Bearer ${token}` },
      data: { noteId },
    });

    if (data.message == "Done") {
      getAllNotes();
    } else if (data.message === "catch error") {
      navigate("/login");
    } else {
      console.log(data.message);
      setError(data.error);
    }
  }

  function getNoteId(noteId2) {
    setNote2ID(noteId2);
  }
  async function editNote(e) {
    e.preventDefault();

    const { data } = await axios.put(
      "https://salty-caverns-11746.herokuapp.com/note",

      note2,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    if (data.message == "Done") {
      getAllNotes();
    } else if (data.message === "catch error") {
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
          <a className="add p-2 btn" data-bs-toggle="modal" data-bs-target="#first">
            <i className="fas fa-plus-circle"></i> Add New
          </a>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <Modal id={"first"} type={addNote} getNote={getNote} note={note} />
      <Modal id={"second"} type={editNote} getNote={getNote2} note={note2} />

      {/* <!-- ==========================Notes=============================== --> */}

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
                      getNoteId(note._id);
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
