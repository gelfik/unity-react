import React, {useCallback, useEffect, useState} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import {HUD} from "../HUD/HUD";
export function UnityContainer() {
  const {unityProvider, sendMessage, addEventListener, removeEventListener, isLoaded} =
  useUnityContext({
    loaderUrl: "./build/ArCraftForReact.loader.js",
    dataUrl: "./build/ArCraftForReact.data",
    frameworkUrl: "./build/ArCraftForReact.framework.js",
    codeUrl: "./build/ArCraftForReact.wasm",
  });

  function handleAttackButton(){
    sendMessage("ReactEventsHandler", "Attack");
    //setPause(true);
}

return (<div>
  <Unity unityProvider={unityProvider} style={{width: "100vw", height: "100vh", overflow: "hidden", zIndex: 0}} />
  <HUD attackCallback={handleAttackButton}/>
</div>);
}