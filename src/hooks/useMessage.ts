import { MessageReactive, MessageType, useMessage } from "naive-ui";
import { onBeforeUnmount } from "vue";
export function customMessage() {
  const message = useMessage();
  let messageReactive: MessageReactive | null = null;
  onBeforeUnmount(() => {
    message.destroyAll();
  });
  function loadingMessage(text: string, type: MessageType, duration: number) {
    if (!messageReactive) {
      messageReactive = message.create(text, {
        duration: duration,
        type: type,
      });
    } else {
      messageReactive.content = text;
      messageReactive.type = type;
      setTimeout(() => {
        messageReactive = null;
        message.destroyAll();
      }, duration);
    }
  }

  return {
    loadingMessage,
  };
}
