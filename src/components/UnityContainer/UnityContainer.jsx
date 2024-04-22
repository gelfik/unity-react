import React, {useCallback, useEffect, useState} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import {HUD} from "../HUD/HUD";
import {Onboarding} from "../Onboarding/Onboarding";
import {FloatingText} from "../FloatingText/FloatingText";


let floatingTextTimer = 500;
let timeoutID = undefined;
export function UnityContainer() {
  const [isPause, setPause] = useState(true);
  const [score, setScore] = useState(0);
  const [isShowOnboarding, setOnboarding] = useState(true);
  const [floatingTexts, updateFloatingTexts] = useState([]);
  const {unityProvider, sendMessage, addEventListener, removeEventListener, isLoaded} =
  useUnityContext({
    loaderUrl: "./build/ArCraftForReact.loader.js",
    dataUrl: "./build/ArCraftForReact.data",
    frameworkUrl: "./build/ArCraftForReact.framework.js",
    codeUrl: "./build/ArCraftForReact.wasm",
  });

  function handleAttackButton(){
    ReactUnity
    sendMessage("ReactEventsHandler", "Attack", 10);
    //setPause(true);
}

function handleResumeButton(){
  sendMessage("ReactEventsHandler", "Resume");
  setPause(false);
}

function handleStartButton(){
  handleResumeButton();
  setOnboarding(false);
}
const handleScoreUpdate = useCallback((score)=>{
  setScore(score);
});

const handleFloatingText = useCallback((x, y, text)=>{
  clearTimeout(timeoutID);
  timeoutID = setTimeout(()=> updateFloatingTexts([]), floatingTextTimer);
  if(floatingTexts.length > 10){
      updateFloatingTexts([]);
  }
  updateFloatingTexts(arr=>[...arr,<FloatingText x={x} y={y} text={text}/>]);
});

useEffect(() => {
  addEventListener("OnScoreUpdate", handleScoreUpdate);
  return () => {
      removeEventListener("OnScoreUpdate", handleScoreUpdate);
  };
}, [addEventListener, removeEventListener, handleScoreUpdate]);

useEffect(() => {
  addEventListener("OnFloatingText", handleFloatingText);
  return () => {
      removeEventListener("OnFloatingText", handleFloatingText);
  };
}, [addEventListener, removeEventListener, handleFloatingText]);

return (<div>
  <Unity unityProvider={unityProvider} style={{width: "100vw", height: "100vh", overflow: "hidden", zIndex: 0}} />
  <HUD score={score} attackCallback={handleAttackButton}/>
  {isShowOnboarding? <Onboarding isActive={!isLoaded} startCallback={handleStartButton}/> : ""}
  {floatingTexts}
</div>);
}