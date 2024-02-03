export default function Top(props){
    return (
        <div className="top">
            <img src="usericon.png" />
            <b className="topUsername">{props.username}</b> 
        </div>
    )
}