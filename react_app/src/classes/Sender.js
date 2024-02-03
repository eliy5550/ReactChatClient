
const Sender = {
    
    SERVER_ADRESS: '164.92.127.201',
    SERVER_PORT: '5000',
    sendMessage: async (username, chat, message) => {
        const data = await fetch("http://" + Sender.SERVER_ADRESS + ":" + Sender.SERVER_PORT + "/chat/" + chat + "/sendmessage",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: username,
                    message: message
                })
            })
        if (!data.ok) return { error: data.status }
        const json = await data.json()
        return json
    },

    getChat: async (chat) => {
        const data = await fetch("http://" + Sender.SERVER_ADRESS + ":" + Sender.SERVER_PORT + "/${chat}")
        const json = await data.json()
        if (!json.error) {
            return true
        } else {
            return json.error
        }
    },

    getAllChats: async () => {
        const data = await fetch(`http://${Sender.SERVER_ADRESS}:${Sender.SERVER_PORT}/chats`)
        const json = await data.json()
        for (let x in json) {
            if (json[x].messages !== undefined) {
                const messages = json[x].messages.filter(message => {
                    if (message !== null) {
                        return message
                    }
                })
                json[x].messages = messages
            }
        }
        return json
    },

    loadOlderMessages: async (chat, lastmessage) => {
        try {
            const data = await fetch(`http://${Sender.SERVER_ADRESS}:${Sender.SERVER_PORT}/chat/${chat}/getOlderMessages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'lastmessage': lastmessage
                })
            })
            const json = await data.json()
            return json
        } catch (error) {
            return { error: error }
        }

    },

    loadNewMessages: async (chats) => {
        const dataToSend = []
        for (let c in chats) {
            if (chats[c].messages !== undefined) {
                if (chats[c].messages.length > 0) {
                    dataToSend.push({ newest: chats[c].messages[chats[c].messages.length - 1]._id, _id: chats[c]._id })
                } else {
                    dataToSend.push({ newest: "", _id: chats[c]._id })
                }
            }
        }

        console.log("out" + JSON.stringify(dataToSend))

        try {

            const data = await fetch(`http://${Sender.SERVER_ADRESS}:${Sender.SERVER_PORT}/chat/loadNewMessages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chats: dataToSend
                })
            })

            const json = await data.json()
            console.log( "in" + JSON.stringify(json))

            for (let x in json) {
                if (json[x].messages !== undefined) {
                    const messages = json[x].messages.filter(message => {
                        if (message !== null) {
                            return message
                        }
                    })
                    json[x].messages = messages
                }
            }

            return json
        } catch (error) {
            return { error: error }
        }

    }
}


module.exports = Sender