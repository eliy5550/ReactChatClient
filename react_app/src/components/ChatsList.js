


export default function ChatsList(props) {

    return (
        <div className="chatsList">
            {(props.list) && props.list.map(x => (
                <div key={x._id}>
                    <button className="chatButton" onClick={() => { props.setMainChatId(x._id);  }} >{x.name}</button>
                    <br />
                </div>
            ))}

        </div>
    )

}