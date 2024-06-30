import * as vscode from "vscode";

export default class VSCodeUtils {
  static openUrl(url: string) {
    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(url));
  }

  static showMessageBox(message: string) {
    vscode.window.showInformationMessage(message);
  }

  static getAssetUri(extensionUri: vscode.Uri, ...path: string[]) {
    return vscode.Uri.joinPath(
      extensionUri,
      "src",
      "webviews",
      "assets",
      ...path
    );
  }

  static getScriptUri(extensionUri: vscode.Uri, ...path: string[]) {
    return vscode.Uri.joinPath(extensionUri, "dist", "scripts", ...path);
  }
}

// persists global state for user
export class GlobalStateManager {
  constructor(private context: vscode.ExtensionContext) {}

  setValue(key: string, value: string) {
    this.context.globalState.update(key, value);
  }

  getValue(key: string): string | null {
    return this.context.globalState.get(key) || null;
  }
}
