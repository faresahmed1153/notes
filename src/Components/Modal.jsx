import React from "react";
import { useState, useEffect } from "react";
import Joi from "joi";
export default function Modal(props) {
  const [errorList, setErrorList] = useState([]);
  function validateNote(note) {
    const schema = Joi.object({
      title: Joi.string().max(20).required(),
      desc: Joi.string().max(300).required(),
    });
    return schema.validate(note, { abortEarly: false });
  }
  const title = props.note.title;
  const desc = props.note.desc;
  const notewithoutid = { title, desc };
  useEffect(() => {
    const result = validateNote(notewithoutid);
    if (result.error) {
      setErrorList(result.error.details);
    } else {
      setErrorList([]);
    }
    console.log(props.note);
  }, [props.note]);
  return (
    <>
      <div className="modal fade" id={props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <form onSubmit={props.type}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {props.id == "second" ? (
                  <>
                    <input onChange={props.getNote} value={props.note.title} placeholder="Type Title" name="title" className="form-control" type="text" />
                    <textarea onChange={props.getNote} value={props.note.desc} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                  </>
                ) : (
                  <>
                    <input onChange={props.getNote} value={props.note.title} placeholder="Type Title" name="title" className="form-control" type="text" />
                    <textarea onChange={props.getNote} value={props.note.desc} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                  </>
                )}
              </div>

              <div className="modal-footer">
                {errorList.map((item, index) => {
                  return (
                    <div key={index} className="mt-3 alert alert-danger w-100">
                      {item.message}
                    </div>
                  );
                })}

                {errorList.length > 0 ? (
                  <>
                    <button data-bs-dismiss="modal" type="submit" className="btn btn-secondary" disabled>
                      <i className="fas fa-plus-circle"></i> Add Note
                    </button>
                  </>
                ) : (
                  <>
                    <button data-bs-dismiss="modal" type="submit" className="btn btn-info">
                      {props.id == "second" ? (
                        <>
                          {" "}
                          <i className="fas fa-plus-circle"></i> Update Note
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus-circle"></i> Add Note
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
