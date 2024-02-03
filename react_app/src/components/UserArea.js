export default function (props){
    
    const ok= ()=>{
        props.setShowPopup(false)
    }

    if(props.showPopup == true){
        
        return (
            <div className="popup">
                <img src="usericon.png"/>
                <h3>Please Enter Your Name</h3>
                <input id="nameInput" value={props.name} onChange={e=>{props.setName(e.target.value)}} onKeyDown={(e)=>{if(e.key == "Enter"){ok()}}}  type="text"></input>
                <button onClick={()=>{ok()}}>OK</button>
            </div>
        )
    }
}