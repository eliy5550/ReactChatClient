const Helper = {
    compareTimes : (a , b)=>{
        if(a.time === undefined || b.time === undefined){
            return 0
        }
        if(a.time > b.time){
            return 1
        }else if(a.time < b.time){
            return -1
        }else{
            return 0
        }
    },
    sortMessagesByTime : (messages)=>{
        return messages.sort(Helper.compareTimes)
    },
    removeDupMessages: (messages) => {
        const messagesMap = {}
        const newArray = []

        for(let i in messages){
            if(messages[i] === null || messages[i]?._id == undefined){continue}
            messagesMap[messages[i]._id] = messages[i]
        }

        for(let j in messagesMap){
            newArray.push(messagesMap[j])
        }

        return newArray
    },
    mergeMessagesWithData: (chatsPointer, data) => {
        const chats = [...chatsPointer]
        for (let x in chats) {
            const chat = chats[x]
            for (let y in data) {
                const chatData = data[y]
                if (chat._id === chatData._id) {
                    //add add messages
                    chat.messages = [...chat.messages, ...chatData.messages]
                    //remove dups
                    const noDups = Helper.removeDupMessages(chat.messages)
                    chat.messages = noDups
                    //sort by time
                    const sorted = Helper.sortMessagesByTime(chat.messages)
                    chat.messages = sorted
                }
            }
        }
        return chats
    }   
}
export default Helper