import { useState } from "react"
import Message from "../components/Message"
import Sender, { sendMessage } from "../classes/Sender";

export default function Chat(props) {

    const [messageInput, setMessageInput] = useState("");

    if (props.chatId === "0") return <></>
    let chat
    try {
        //get the main chat by the chat ID you clicked
        for (let i = 0; i < props.allChats.length; i++) {
            if (props.allChats[i]._id === props.chatId) {
                chat = props.allChats[i]
                break
            }
        }


    } catch (error) {
        return <></>
    }


    const send = async () => {
        setMessageInput("")
        if (messageInput === '') { return }
        const json = await sendMessage(props.username, chat._id, messageInput)
        const chatsArray = [...props.allChats]
        chatsArray.forEach(x => {
            if (x._id === props.chatId) { x.messages && x.messages.push(json) }
        })
        props.setAllChats(chatsArray)
        props.jumpDown()
    }

    let lastMessageID = ""

    if (chat.messages !== undefined && chat.messages[0] !== undefined) {
        lastMessageID = chat.messages[0]._id
    }


    const loadOlderMessages = async () => {
        const loadbtn = document.getElementById('loadbtn')

        loadbtn.innerHTML = "Loading..."
        loadbtn.disabled = true

        const data = await Sender.loadOlderMessages(chat._id, lastMessageID)
        console.log(JSON.stringify(data))
        if (data.error) { alert(data) }
        else {
            chat.messages = [...data, ...chat.messages]
            loadbtn.innerHTML = "Load Older Messages"
            loadbtn.disabled = false
        }
        if (chat.messages !== undefined && chat.messages[0] !== undefined) {
            lastMessageID = chat.messages[0]._id
        }
        //update chats
        props.setAllChats(props.allChats.map(c => {
            if (c._id === chat._id) {
                c = chat
            }
            return c
        }))

    }

    const inputOnChange = (e) => {
        setMessageInput(e.target.value)
    }



    let input = ''
    if (props.username !== '') {
        input = <div id="chatMessageInput" className="chatMessageInput">
            <input required placeholder="Type your message here..." id="chatMessageInputField" onChange={(e => { inputOnChange(e) })} onKeyDown={e => { if (e.key == 'Enter') { send() } }} value={messageInput} type="text" />
            <button onClick={async () => { send() }}>SEND</button>
        </div>
    } else {
        input = <div id="chatMessageInput" className="chatMessageInput">
            <input disabled={true} onClick={()=>{props.setShowPopup(true)}} value={'Please enter a name first'} type="text" />
            <button onClick={async () => { props.setShowPopup(true) }}>Insert Name</button>

        </div>
    }



    return (
        <>
            <div className="chat">

                <br></br>

                <div className="scrollable"></div>
                <button id="loadbtn" className="loadbutton" onClick={(e) => { loadOlderMessages(e) }}>Load Older Messages</button>
                <button id="loadbtn" className="loadbutton" onClick={(e) => { props.jumpDown() }}>Jump Down</button>

                <div id="chatMessages">
                    {

                        chat.messages && chat.messages.map(m => {
                            return (
                                <Message key={m._id} id={m._id} message={m} username={props.username} />
                            )
                        })
                    }

                <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                </div>

                {input}
                
            </div>

        </>
    )
} 