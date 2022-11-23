import { useState } from "react";
import { ColoredMessage } from "./components/ColoredMessage";
import Axios from 'axios';

export const App = () => {
  // Stateの定義
  const [num, setNum] = useState(0);
  const [componentsMessage, setComponentsMessage] = useState("aiueo");
  const [str, setStr] = useState(0);
  const [list, setList] = useState([]);
  const [idx, setIdx] = useState(0);
  const [message, setMessage] = useState("");

  //
  const restapiGet = () => {
    console.log("App.js_restapiGet");
    Axios.get('http://127.0.0.1:5000/', {}).then(function(res) {
      console.log(res.data);
      setMessage((prev) => res.data)
    })
  };
  //

  //const products = ['list 1', 'list 2', 'list 3'];
  // const list = []

  // ボタンを押した時にStateをカウントアップ
  const onClickButton = () => {
    setNum(num + 1);
    setComponentsMessage((prev) => prev + "_")
    restapiGet()
    console.log("aaaaaaaaaaaa");
  };

  // 
  const onClickButton_2 = () => {
    //console.log(_test)
    let _i = num + str
    setStr((prev) => _i);

    setIdx((prev) => 0)
    setList((prev) => [])
    //setStr((prev) => prev + "a");
  };

  const onClickButton_3 = () => {
    //list.push(<li>aiueo</li>)
    setIdx(idx + 1)
    list.push(<li key={idx}>{num} + {message}</li>)
    setList((prev) => list)
    setStr((prev) => 0);
  };

  //for (const [i, product] of products.entries()) {
  //  list.push(<li>{i}{product}</li>)
  //}
  
  return (
    <>
      <h1 style={{ color: "red" }}>こんにちは!</h1>
      <ColoredMessage color="blue" color2="red">お元気ですか?</ColoredMessage>
      <ColoredMessage color="pink">{componentsMessage}</ColoredMessage>
      <button onClick={onClickButton}>ボタン</button>
      <p>{num}</p>
      <button onClick={onClickButton_2}>ボタン2</button>
      <button onClick={onClickButton_3}>リセット</button>
      <p>{str}</p>
      <div>{list}</div>
    </>
  );
  
};
