export default function MessageChannel(props){
    const messageClass = (props.username === props.message.user) ? "message myMessage" : "message";
    return(
        <div className={messageClass}>
            ~<b>{props.message.user}</b><br></br>
            {props.message.message}<br></br>
            {props.message.time}<br></br>
        </div>
    )
}