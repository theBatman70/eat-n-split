import { useState } from "react";
import Button from "./utils/Button";

export default function SplitForm({ friend, onSplit }) {
  const [bill, setBill] = useState("");
  const [yourExp, setYourExp] = useState("");
  const friendExp = bill ? bill - yourExp : "";
  const [payee, setPayee] = useState("user");

  return (
    <form className="form-split-bill" onSubmit={handleSplit}>
      <h2>Split a Bill with {friend.name}</h2>
      <label>💵 Bill Amount</label>
      <input value={bill} onChange={(e) => setBill(Number(e.target.value))} />
      <label>🤵 Your expense</label>
      <input
        value={yourExp}
        max={bill}
        onChange={(e) =>
          setYourExp(
            Number(e.target.value) <= bill ? Number(e.target.value) : yourExp
          )
        }
      />
      <label>🧑‍🤝‍🧑 {friend.name}'s expense</label>
      <input value={friendExp} disabled />
      <label>💳 Who is paying the bill?</label>
      <select value={payee} onChange={(e) => setPayee(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );

  function handleSplit(event) {
    event.preventDefault();
    if (!bill && !yourExp) return;
    let amountOwnedByYou;
    if (payee === "friend") {
      amountOwnedByYou = -yourExp;
    }
    if (payee === "user") {
      amountOwnedByYou = friendExp;
    }
    onSplit(friend, amountOwnedByYou);
    reset();
  }

  function reset() {
    setBill("");
    setYourExp("");
    setPayee("user");
  }
}
