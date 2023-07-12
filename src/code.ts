import { getSelectedText, initialStore } from "./lib/utils"
import { sendMessageToChatGPT } from "./sendToChatGPT"
import { sendToImageAI } from "./sendToStDiffusion"

initialStore();

if (figma.editorType === 'figma') {
  
  figma.showUI(__html__, 
    {width: 430, height: 600, title: 'Figma DesignGPT'}
  );
  getSelectedText();

  figma.ui.onmessage = msg => {
    if(msg.promptMessage){
      let message = msg.promptMessage;
      sendMessageToChatGPT(message);
    } else if (msg.type === 'updateSelection') {
      getSelectedText();
    } else if (msg.imagePromptValue){
      sendToImageAI(msg.imagePromptValue);
    }
  };
}