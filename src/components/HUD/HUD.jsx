import "./HUD.css"

export function HUD(props){
    return <div className="hud">
        <div className="hud-score">Enemy HP {props.score}</div>
        <button className="hud-attack-button" onClick={props.attackCallback}>Attack</button>
    </div>
}