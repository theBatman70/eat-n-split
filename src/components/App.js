import AddFriendForm from "./AddFriendForm";
import "./../index.css";
import FriendsList from "./FriendsList";
import SplitForm from "./SplitForm";
import { useState } from "react";
import Button from "./utils/Button";
import { useLocalStorageState } from "./utils/useLocalStorageState";

const initialData = [
  {
    id: 447477,
    name: "Riley",
    avatarUrl: "https://i.pravatar.cc/48?u=44747721",
    amountOwnedByYou: 0,
  },
  {
    id: 312254,
    name: "Nahush",
    avatarUrl: "https://i.pravatar.cc/48?u=31225423",
    amountOwnedByYou: 25,
  },
];

export default function App() {
  const [friends, setFriends] = useLocalStorageState(initialData, "splitData");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const selectedFriend = friends.find((friend) => friend.id === selectedId);
  const addFriendButton = isAddOpen ? "Close" : "Add Friend";
  console.log(selectedFriend);

  return (
    <div className="app">
      <SideBar>
        <FriendsList
          friends={friends}
          onSelect={handleSelect}
          selectedId={selectedId}
        />
        {isAddOpen && (
          <AddFriendForm onToggle={handleToggleAdd} onAdd={handleAdd} />
        )}
        <Button onClick={handleToggleAdd}>{addFriendButton}</Button>
      </SideBar>
      {selectedId && (
        <SplitForm
          key={selectedFriend.id}
          friend={selectedFriend}
          onSplit={handleSplit}
        />
      )}
    </div>
  );

  function SideBar({ children }) {
    return <div className="sidebar">{children}</div>;
  }

  /* EVENT HANDLERS */

  function handleSelect(id) {
    setSelectedId(id);
  }

  function handleToggleAdd() {
    setIsAddOpen((t) => !t);
  }

  function handleAdd(name, imgUrl) {
    const id = crypto.randomUUID();
    setFriends((f) => [
      ...f,
      {
        id,
        name,
        avatarUrl: imgUrl + `?u=${id}`,
        amountOwnedByYou: 0,
      },
    ]);
  }

  function handleSplit(friend, amountOwnedByYou) {
    setFriends(
      friends.map((ele) =>
        friend === ele
          ? {
              ...friend,
              amountOwnedByYou: ele.amountOwnedByYou + amountOwnedByYou,
            }
          : ele
      )
    );
    setSelectedId(null);
  }
}
