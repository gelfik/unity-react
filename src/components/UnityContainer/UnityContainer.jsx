import React, {useCallback, useEffect, useState} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
export function UnityContainer() {
  const {unityProvider, sendMessage, addEventListener, removeEventListener, isLoaded} =
  useUnityContext({
    loaderUrl: "./build/ArCraftForReact.loader.js",
    dataUrl: "./build/ArCraftForReact.data.unityweb",
    frameworkUrl: "./build/ArCraftForReact.framework.js.unityweb",
    codeUrl: "./build/ArCraftForReact.wasm.unityweb",
  });

  function handleAttackButton(){
    sendMessage("ReactEventsHandler", "Attack");
    //setPause(true);
}

return (<div>
  <Unity unityProvider={unityProvider} style={{width: "200vw", height: "200vh", overflow: "hidden", zIndex: 0}} />
  <button onClick={handleAttackButton}>Attack</button>
</div>);
}