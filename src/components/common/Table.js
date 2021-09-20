import React from "react";
import { Link } from "react-router-dom";

const Table = ({data, columns, selectUser, onDeleteUser}) => {
  let tableRows;
  let tableColumns;

  tableColumns = columns.map((col, index) => (
    <th key={index} scope="col">
      {col}
    </th>
  ));
  if (data.length > 0) {
    tableRows = data.map(({ id, avatar_url, login, url }) => {
      return (
        <tr key={id}>
          <td>
            <img
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              src={avatar_url}
              alt="avatar"
            />
          </td>
          <td>{login}</td>
          <td>
            <button
              onClick={(e) => {
                e.preventDefault();
                selectUser({ id, login });
              }}
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              onClick={() => onDeleteUser(id)}
              type="button"
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
          <td>
            <Link to={`/details/${login}`}>View</Link>
          </td>
        </tr>
      );
    });
  } else {
    tableRows = (
      <tr>
        <td>No Data Found</td>
      </tr>
    );
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>{tableColumns}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
