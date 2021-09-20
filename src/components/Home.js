import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Table from "./common/Table";
import Loader from "./common/Loader";
import Modal from "./common/Modal";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userDetails, setuserDetails] = useState(null)

  useEffect(() => {
    const fetchUsers=async () => {
      try {
        setLoading(true);
        const response_data = await axios.get("https://api.github.com/users");
        setPosts(response_data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const selectUser = (data) => {
    setuserDetails(data)
  };

  const onChangeUserDetails = (e, id) => {
    setuserDetails({
        ...userDetails, id: id, login: e.target.value
    })
  };

  const onSave = () => {
    const updatedData = posts.map((singleUser) => {
      if (singleUser.id === userDetails.id) {
        return { ...singleUser, login: userDetails.login };
      }
      return singleUser;
    });
    setPosts(updatedData)
  };

  const onDeleteUser = (id) => {
    const updatedData = posts.filter((post) => {
      return post.id !== id;
    });
    setPosts(updatedData)
  };

  let columns = ["Image", "UserName", "Edit", "Delete", "View"];
  let home_content;
  if (posts.length) {
    home_content = <Table data={posts} columns={columns} selectUser={selectUser} onDeleteUser={onDeleteUser} />;
  } else {
    home_content = <div>No data found.</div>;
  }

  return (
    <div>
      {loading ? <Loader /> : home_content}
      {userDetails && <Modal userDetails = {userDetails} onChangeUserDetails = {onChangeUserDetails} onSave = {onSave} />}
    </div>
  );
}

export default Home;
