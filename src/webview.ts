import * as vscode from 'vscode';

export function updateWebview(panel: vscode.WebviewPanel, originalPrompt: string, refinedPrompt: string) {
    panel.webview.html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GitHub Chat Prompt Refiner</title>
        <style>
            body { padding: 20px; }
            .container { max-width: 800px; margin: 0 auto; }
            pre { background-color: var(--vscode-editor-background); padding: 15px; border-radius: 5px; }
            h2 { color: var(--vscode-editor-foreground); }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Prompt Analysis</h2>
            <pre>${refinedPrompt}</pre>
        </div>
    </body>
    </html>`;
}