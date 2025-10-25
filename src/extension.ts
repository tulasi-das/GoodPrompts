import * as vscode from 'vscode';

let promptPanel: vscode.WebviewPanel | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
	console.log('Prompt Refiner extension is now active!');

	const disposable = vscode.commands.registerCommand('promptrefiner.refinePrompt', async () => {
		const prompt = await vscode.window.showInputBox({
			placeHolder: 'Enter your GitHub chat prompt',
			prompt: 'Enter the prompt you want to refine',
			ignoreFocusOut: true
		});

		if (!prompt) {
			return;
		}

		if (promptPanel) {
			promptPanel.reveal();
		} else {
			promptPanel = vscode.window.createWebviewPanel(
				'promptRefiner',
				'GitHub Chat Prompt Refiner',
				vscode.ViewColumn.One,
				{
					enableScripts: true,
					retainContextWhenHidden: true
				}
			);

			promptPanel.onDidDispose(() => {
				promptPanel = undefined;
			});
		}

		const refinedPrompt = refinePrompt(prompt);
		updateWebview(promptPanel, prompt, refinedPrompt);
	});

	context.subscriptions.push(disposable);
}

function refinePrompt(prompt: string): string {
	// Add your prompt refinement logic here
	const refinements = [
		{ check: (p: string) => !p.includes('specific requirements'), fix: 'Add specific requirements and expectations' },
		{ check: (p: string) => !p.includes('context'), fix: 'Provide more context about the task or problem' },
		{ check: (p: string) => p.length < 50, fix: 'Expand the prompt with more details' },
		{ check: (p: string) => !p.includes('example'), fix: 'Include examples if applicable' }
	];

	const suggestions = refinements
		.filter(r => r.check(prompt))
		.map(r => r.fix);

	return suggestions.length > 0 ? 
		`Original Prompt:\n${prompt}\n\nSuggested Improvements:\n${suggestions.map(s => '- ' + s).join('\n')}` :
		`Your prompt is well-structured!\n\nOriginal Prompt:\n${prompt}`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
