import React, { useState } from "react";
import * as UserAPI from "../../UserAPI";
import Headers from "../../Helpers/Headers";

const AddChannel = (props) => {
  const { userId, setUserChannels } = props;
  const [channels, setChannels] = useState([]);
  const [channelName, setChannelName] = useState("");
  const { userName, setUserName } = props;
  const [userArray, setUserArray] = useState([]);
  const [header, setHeader] = useState(Headers);
  const [tempUsers, setTempUser] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [channelId, setChannelId] = useState("1224");

  const onSubmit = (e) => {
    e.preventDefault();

    UserAPI.createChannel(header, {
      name: channelName,
      user_ids: userArray,
    })

      .then((res) => {
        console.log(res.data.data);
        console.log("Channel Created");
      })
      .catch((e) => {
        console.log("Create Channel Error " + e);
      });
  };

  const getAllUsers = () => {
    UserAPI.listOfUsers(header)
      .then((res) => {
        console.log("success");
        setTempUser(res.data.data);
      })
      .catch((e) => {
        console.log("failed to get users");
      });
  };

  const onAddMember = (e) => {
    e.preventDefault();

    let found = tempUsers.find((user) => user.uid === newMember);
    if (!channelId) {
      if (!found) {
        alert("user not found");
      } else {
        setUserArray(userArray.concat(found.id));
        console.log(found.id);
        console.log(userArray);
      }
    } else {
      if (found) {
        UserAPI.addChannelMember(header, channelId, found.id);
      } else {
        alert("not found");
      }
    }
  };

  const getChannelDetails = () => {
    UserAPI.getChannelDetails(header, 1224)
      .then((res) => {
        console.log(res);
        console.log(res.data.data.channel_members);
      })
      .catch((e) => {
        console.log("no channel details");
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setChannelName(e.target.value);
          }}
          value={channelName}
        />
        <input type="submit" value="Add New Channel" />
      </form>
      <form onSubmit={onAddMember}>
        <input
          type="text"
          onChange={(e) => {
            setNewMember(e.target.value);
          }}
          value={newMember}
        />
        <input type="submit" value="Add Members" />
      </form>
      {/* <button onClick={mockLogin}>MockLogin TESTHELLO</button> */}
      {/* <button onClick={getAllChannels}>Get All Users Channel</button> */}
      {/* <button onClick={getAllUsers}>Get All Users</button> */}
      <button onClick={getChannelDetails}>Channel Details</button>
    </div>
  );
};

export default AddChannel;
