import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { UserContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Home() {
  const [msg, setMsg] = useState("");
  const messageRef = collection(db, "messages");
  const userRef = collection(db, "users");
  const { currentUser } = useContext(UserContext);
  const { dispatch } = useContext(ChatContext);
  const { data } = useContext(ChatContext);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const { logout } = UserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    const queryMsgs = query(messageRef, orderBy("createdAt"));
    const unSubs = onSnapshot(queryMsgs, (snapshot) => {
      let msgs = [];
      snapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      setMsgs(msgs);
    });
    return () => unSubs();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logout();
      navigate("/");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const handleMsg = async (e) => {
    e.preventDefault();
    if (msg === "") return;

    await addDoc(messageRef, {
      text: msg,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
    });

    setMsg("");
  };

  const handleSearch = async () => {
    const q = query(userRef, where("displayName", "==", username));

    try {
      const querySelector = await getDocs(q);
      querySelector.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const msgKeyDown = (e) => {
    e.code === "Enter" && handleMsg(e);
  };

  const handleSelect = async () => {
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedID));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedID), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedID + ".userinfo"]: {
            uid: user.uid,
            displayName: user.displayName,
          },
          [combinedID + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedID + ".userinfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
          },
          [combinedID + ".date"]: serverTimestamp()
        });
      }
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }

    setUser(null);
    setUsername("");
  };

  const [chats, setChats] = useState([]);
  
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());

        
      });
  
      return () => {
        unsub();
      }; 
    }
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect1 = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u});
  }

  return (
    <>
      <div className="home">
        <div className="sideNav">
          <img className="avatar" src={"avatar.png"} />
          <a onClick={handleLogout} className="setting">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </a>
        </div>
        <div className="chatList">
          <div className="headingWrap">
            <h1 className="heading">Messages</h1>
            <a href="#" className="newChat">
              +
            </a>
          </div>
          <div className="searchWrap">
            <input
              className="searchbox"
              onKeyDown={handleKey}
              type="text"
              placeholder="Search"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {currentUser.uid && Object.entries(chats)?.map((chat) => (
            <div className="userChats" key={chat[0]} onClick={()=> handleSelect1(chat[1].userinfo)}>
              <span className="uname">{chat[1].userinfo.displayName}</span>
              {/* /* <p>{chat[1].userInfo.lastMessage?.text}</p> */}
            </div>
          ))}
          {user && (
            <div className="searchUserWrap" onClick={handleSelect}>
              <span>{user.displayName}</span>
            </div>
          )}
        </div>
        <div className="chat">
          <div className="chatHeader">
            <span className="uuname">{data.user?.displayName}</span>
          </div>
          <div className="msgs">
            {msgs.map((message) => (
              <h1 key={message.id} className="msges">
                {message.text}
              </h1>
            ))}
          </div>
          <div className="chatFooter">
            <input
              className="messagebox"
              onKeyDown={msgKeyDown}
              type="text"
              value={msg}
              placeholder="Enter Message"
              onChange={(e) => setMsg(e.target.value)}
            />
            <a className="sendbtn" onClick={handleMsg}>
              Send
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
