export default function ImgCard(props){
    return(
        <div className="imgCard">
            <div  >
                <div className="songImage"><img src={props.img}/></div>
                <div className="songName">{props.name}</div>
            </div>
        </div>
    )
}