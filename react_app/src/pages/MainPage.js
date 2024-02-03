import Helper from "../classes/Helper";
import Sender, { getAllChats } from "../classes/Sender";
import Chat from "../components/Chat";
import ChatsList from "../components/ChatsList";
import Top from "../components/Top";
import UserArea from "../components/UserArea";
import { useEffect, useState } from 'react'

export default function MainPage() {

    const [allChats, setAllChats] = useState([])
    const [counter, setCounter] = useState(0)
    const [mainChatId, setMainChatId] = useState("0")

    const [name, setName] = useState('')
    const [showPopup, setShowPopup] = useState(true)

    // const jumpUp = () => {
    //     const messageElements = document.getElementsByClassName('message')
    //     if (messageElements !== undefined && messageElements.length > 0) {
    //         messageElements[0].scrollIntoView()

    //     }
    // }

    const jumpDown = () => {
        const messageElements = document.getElementsByClassName('message')
        if (messageElements !== undefined && messageElements.length > 0) {
            messageElements[messageElements.length - 1].scrollIntoView()

        }
    }

    useEffect(() => {
        const fetchingMethod = getAllChats //cause it has to be declared in the use effect

        fetchingMethod().then(json => {
            if (!json.error) setAllChats(json)
        }).catch(e => console.log(e))

    }, [])


    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prev) => { return prev + 1 })
        }, 2000)

        return () => { clearInterval(interval) }
    }, [])



    //every counter change check new messages from the server
    useEffect(() => {
        const getNewMessages = Sender.loadNewMessages
        getNewMessages(allChats)
            .then(data => {
                setAllChats(prev => {
                    Helper.mergeMessagesWithData(prev, data)
                    return prev
                })

                //if new messages in current chat jump down
                for (let x in data) {
                    const chatData = data[x]
                    if (chatData._id == mainChatId) {
                        if (chatData.messages.length > 0) {
                            jumpDown()
                        }
                    }
                }

            })
            .catch()

    }, [counter])


    useEffect(() => {
        if (showPopup === true) {
            const nameInput = document.getElementById('nameInput')
            nameInput?.focus()
        }
    }, [showPopup])

    useEffect(() => {
        const chatMessageInput = document.getElementById('chatMessageInputField')
        chatMessageInput?.focus()
    }, [mainChatId])

    return (
        <div className="mainChat">
            <Top username={name}></Top>
            <UserArea showPopup={showPopup} setShowPopup={setShowPopup} name={name} setName={setName} />
            <br></br>
            <ChatsList list={allChats} setMainChatId={setMainChatId} />
            <Chat jumpDown={jumpDown} username={name} chatId={mainChatId} setMainChatId={setMainChatId} allChats={allChats} setShowPopup={setShowPopup} setAllChats={setAllChats} />
        </div>
    )
}