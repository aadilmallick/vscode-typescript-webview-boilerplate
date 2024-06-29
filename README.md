# Boilerplate

- `Webview.ts` : reusable webview class
- **scripts folder**: You can create custom typescript scripts that will then be injected into the webview. If you want to use a script called `myscript.ts`, you instantiate the webview with `myscript.js`. The script will be automatically compiled and injected into the webview.
- `ReactiveState.ts` : uses a proxy for reactive state in the DOM, only supporting single keys in objects. For multiple keys, it's better to use normal proxies.
- `base.ts` : base class for interacting with DOM easier, like JQuery
- `messaging.ts` : class for sending messages between the webview and the extension
- **templates folder**: You can create custom html templates that the script will then inject into the webview, much like React.
- `DisposableManager.ts` : class for managing registering VSCode commands
