# Fiddler

https://www.telerik.com/fiddler
Tool um systemweit Traffic zu loggen

# F12 Tools von Chrome

https://developer.chrome.com/docs/devtools

# Node in Visual Studio Code debuggen

```json
     // in tsconfig.json
     sourceMaps: true';
```

```json
     // in launch.json folgende Zeile ergaenzen
     "program": "${workspaceFolder}\\demo\\src\\M007-Promises\\index.ts",

     // fuer aeltere node versionen ist ein separater compile-step notwendig
     "preLaunchTask": "tsc: build - tsconfig.json",
```
