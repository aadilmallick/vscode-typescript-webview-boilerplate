type Message = {
  command: string;
  payload: any;
};

export default class Messaging {
  postMessageWithPayload(message: Message) {
    tsvscode.postMessage(message);
  }

  postMessage(command: string) {
    tsvscode.postMessage({ command, payload: null });
  }
}
