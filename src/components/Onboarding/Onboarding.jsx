import "./Onboarding.css"
export function Onboarding(props){
    return <div className="onboarding">
        <div className="onboarding-text">{"Press Attack to activate animation." }</div>
        <button disabled={props.isActive} onClick={props.startCallback}>Start</button>
    </div>
}