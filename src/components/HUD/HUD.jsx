import "./HUD.css"

export function HUD(props){
    return <div className="hud">
        <button className="hud-attack-button" onClick={props.attackCallback}>Attack</button>
    </div>
}