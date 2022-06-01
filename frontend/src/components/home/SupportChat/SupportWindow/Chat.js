import React, { useEffect, useState } from 'react'
import socketIo from "socket.io-client";     // client k liye socketIO
import "./Chat.css";
import sendLogo from "./images/send.png";
import Message from "./Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
// ye isliye use kr rhe jab chat ko scroll krege to saari chat aaye


let socket;
 
// const ENDPOINT = "https://rahul612-realtime-chatapp.herokuapp.com/";    //ENDPOINT mtlb ye socket kaha se receive hona chaiye ie, server

const ENDPOINT="http://localhost:4000/"
// const ENDPOINT="https://easybazaar.herokuapp.com/"


const Chat = ({user}) => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }
    
    console.log(messages);
    useEffect(() => {

        socket = socketIo(ENDPOINT, { transports: ['websocket'] });
        

// yani jab bhi socket connect ho server se to ky ho
        socket.on('connect', () => {
            // alert('Connected');
            setid(socket.id);

        })
        console.log(socket);
        // emit ka mtlb data bhejna server ko aur 'joined' ek user defined event h yeha {user} ek object bheja h and server me bhi name same hona chaiye tbhi data access kr payega
        socket.emit('joined', { user })

        if(user!=="Admin"){
        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })
    }
        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message)
        })

        return () => {
            // yani jab disconnect ho to
            socket.emit('disconnect');
            //socket ko bnd kr de rhe
            socket.off();
        }
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        })
        return () => {
            // yani message send hote hi bar bar array ni bna rhe message ka ek hi array ko append kr rhe h
            socket.off();
        }
    }, [messages])

    return (
        <div className="chatPage" style={user==="Admin"?{height:"80vh"}:{height:"68vh"}}>
            <div className="chatContainer">
                <div className="header">
                    <h2>SUPPORT CHAT</h2>
                    {/* yani jab bhi closeIcon p click krege to home p aa jayege */}
                    {/* <a href="/"> <img src={closeIcon} alt="Close" /></a> */}
                </div>
                {/* ReactScrollBottom se apne aap niche jayega */}
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                    {/* item.id===id means agr wo user jisne login kia ha */}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                </div>
            </div>

        </div>
    )
}

export default Chat
