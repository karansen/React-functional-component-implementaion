import React, { useState, useEffect } from "react";
import axios from "axios";

const Detail = (props) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const {
      match: { params },
    } = props;
    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        const response_data = await axios.get(
          `https://api.github.com/users/${params.id}`
        );
        const { data } = response_data;
        console.log(data);
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchUserDetail();
  }, []);
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={user.avatar_url} alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="/" className="btn btn-primary">
            Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Detail;
