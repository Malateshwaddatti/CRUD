import { useEffect, useState } from "react";
import "./styles.css";

/* {
      name: "Yashu",
      pic:
        "https://bestprofilepix.com/wp-content/uploads/2014/03/sad-and-alone-boys-facebook-profile-pictures.jpg"
    },

    {
      name: "Jeevitha",
      pic:
        "https://st.depositphotos.com/2101611/4338/v/600/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg"
    },

    {
      name: "Swathika",
      pic:
        "https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"
    },

    {
      name: "Virat",
      pic:
        "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
    }*/

export default function App() {
  const [name, setName] = useState("");
  const [pic, setpic] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch("https://6154014b2473940017efab25.mockapi.io/users", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((people) => setUser(people));
  };

  const addUsers = () => {
    fetch("https://6154014b2473940017efab25.mockapi.io/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        pic: pic
      })
    }).then(() => getUsers());
  };

  return (
    <div className="App">
      <div className="user-form">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />
        <input
          value={pic}
          onChange={(event) => setpic(event.target.value)}
          placeholder="Enter your url"
        />

        {/*<button
          className="button"
        onClick={() => setNames([...names, { name: name, pic: pic }])}</button>*/}
        <button onClick={addUsers}>Add User</button>
      </div>
      {/* <Users usersname={name} />*/}
      {user.map((ur) => (
        <Users
          key={ur.id}
          usersname={ur.name}
          userspic={ur.pic}
          userid={ur.id}
          getUsers={getUsers}
        />
      ))}
      ;
    </div>
  );
}

function Users({ usersname, userspic, userid, getUsers }) {
  const deletUsers = () => {
    fetch("https://6154014b2473940017efab25.mockapi.io/users/" + userid, {
      method: "DELETE"
    }).then(() => getUsers());
  };
  const [edit, setEdit] = useState(false);
  return (
    <>
      <div className="user-container">
        <img className="user-image" height="150px" src={userspic} />
        <div>
          <p className="user-name"> {usersname}</p>
          <button className="delete" onClick={deletUsers}>
            {" "}
            Delete
          </button>
          <button className="edit" onClick={() => setEdit(!edit)}>
            Edit
          </button>
        </div>
      </div>
      {edit ? (
        <EditUser
          usersname={usersname}
          userspic={userspic}
          getUsers={getUsers}
          userid={userid}
        />
      ) : (
        ""
      )}
    </>
  );
}

function EditUser({ usersname, userspic, userid, getUsers }) {
  const [name, setName] = useState(usersname);
  const [pic, setPic] = useState(userspic);

  const editUsers = () => {
    fetch("https://6154014b2473940017efab25.mockapi.io/users/" + userid, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        pic: pic
      })
    }).then(() => getUsers());
  };

  return (
    <>
      <div className="user-form">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />
        <input
          value={pic}
          onChange={(event) => setPic(event.target.value)}
          placeholder="Enter your url"
        />

        {/*<button
          className="button"
        onClick={() => setNames([...names, { name: name, pic: pic }])}</button>*/}
        <button className="add" onClick={editUsers}>
          Add User
        </button>
      </div>
    </>
  );
}

/*fetch("https://6154014b2473940017efab25.mockapi.io/users",{method:"GET"})
.then((data)=>data.json())
.then((people)=>console.log(people));*/
