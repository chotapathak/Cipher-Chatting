import React, { useState, useEffect, useRef} from "react";
import { useDispatch } from "react-redux";
import { DoEncrypt, DoDecrypt } from "../aes";
import { process } from '../Redstore/action/index';
import './chat.css';

function Chat({ username, roomname, socket}) {
    const [text, setText] = useState("");
    const [messages, setMessage] = useState([]);

    const dispatch = useDispatch();

    const dispatchProcess = (encrypt, msg, cipher) => {
        dispatch(process(encrypt, msg, cipher));
    };

    useEffect(() => {
        socket.on('message', (data) => {
            // decrypt
            const ans = DoDecrypt(data.text, data.username);
            dispatchProcess(false ,ans, data.text);
            console.log(ans);
            let temp = messages;
            temp.push({
                userId: data.userId,
                username: data.username,
                text: ans,
            });
            setMessage([...temp]);
        });
    }, [socket]);

    const sendData = () => {
        if (text !== '') {
            // encrypting
            const ans = DoEncrypt(text);
            socket.emit('chat', ans);
            setText('');
        }
    };
    const messageEndRef = useRef(null);

    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth'});
    };

    useEffect(scrollToBottom, [messages]);
    
    console.log(messages, 'meSSage');

    return (
        <div className="chat">
            <div className="user-name">
                <h2>
                    {username} <span style={{ fontSize: '0.7rem ' }}> in {roomname} </span>
                </h2>
            </div>
            <div className="chat-message">
                {messages.map((i) => {
                    if (i.username == username ) {
                        return (
                            <div className="message">
                                <p>{i.text}</p>
                                <span>{i.username}</span>
                            </div>
                        );
                    } else {
                        return (
                            <div className='message mess-right'>
                                <p>{i.text}</p>
                                <span>{i.username}</span>
                            </div>
                        );
                    } 
                })}
                <div ref={messageEndRef} />
            </div>
            <div className="send">
                <input 
                    placeholder="enter your message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            sendData();
                        }
                    }}
                    ></input>
                    <button onClick={sendData}>Send</button>
            </div>
        </div>
    )

}

export default Chat;