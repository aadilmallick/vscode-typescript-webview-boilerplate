import * as vscode from "vscode";
import { getNonce } from "./Webview";
import VSCodeUtils from "../utils/VSCodeUtils";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  static createSidebar(context: vscode.ExtensionContext, sidebarId: string) {
    const sidebarProvider = new SidebarProvider(context.extensionUri);
    const sidebar = vscode.window.registerWebviewViewProvider(
      sidebarId,
      sidebarProvider
    );
    context.subscriptions.push(sidebar);
    return sidebarProvider;
  }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [
        VSCodeUtils.getAssetUri(this._extensionUri),
        VSCodeUtils.getScriptUri(this._extensionUri),
      ],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleResetUri = webview.asWebviewUri(
      VSCodeUtils.getAssetUri(this._extensionUri, "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      VSCodeUtils.getAssetUri(this._extensionUri, "vscode.css")
    );

    const scriptUri = webview.asWebviewUri(
      VSCodeUtils.getScriptUri(this._extensionUri, "sidebar.js")
    );
    const styleMainUri = webview.asWebviewUri(
      VSCodeUtils.getAssetUri(this._extensionUri, "sidebar.css")
    );
    console.log(scriptUri.path);
    console.log(styleMainUri.path);

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${styleMainUri}" rel="stylesheet">
        <script nonce="${nonce}">
          const tsvscode = acquireVsCodeApi();
        </script>
			</head>
      <body>
				<script nonce="${nonce}" src="${scriptUri}" type="module"></script>
			</body>
			</html>`;
  }
}
