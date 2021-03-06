/**
 * @author: ty
 * @description: 开启编辑器
 * 修改与 open-editor 库
 * https://github.com/sindresorhus/open-editor
 * 
 * 修改内容:
 * 1.使用绝对路径code 打开程序。
 */
import process from 'node:process';
import execa from 'execa';
import {getEditor, defaultEditor} from 'env-editor';
import {parseLineColumnPath, stringifyLineColumnPath} from 'line-column-path';
import open from 'open';

function getEditorInfo(files, options = {}) {
	if (!Array.isArray(files)) {
		throw new TypeError(`Expected an \`Array\`, got ${typeof files}`);
	}

	const editor = options.editor ? getEditor(options.editor) : defaultEditor();
	const editorArguments = [];

	if (editor.id === 'vscode') {
		editorArguments.push('--goto');
	}

	for (const file of files) {
		const parsed = parseLineColumnPath(file);

		if (['sublime', 'atom', 'vscode'].includes(editor.id)) {
			editorArguments.push(stringifyLineColumnPath(parsed));
			continue;
		}

		if (['webstorm', 'intellij'].includes(editor.id)) {
			editorArguments.push(stringifyLineColumnPath(parsed, {column: false}));
			continue;
		}

		if (editor.id === 'textmate') {
			editorArguments.push('--line', stringifyLineColumnPath(parsed, {
				file: false,
			}), parsed.file);
			continue;
		}

		if (['vim', 'neovim'].includes(editor.id)) {
			editorArguments.push(`+call cursor(${parsed.line}, ${parsed.column})`, parsed.file);
			continue;
		}

		editorArguments.push(parsed.file);
	}

	return {
		binary: editor.paths.length > 0 ? editor.paths[0] : editor.binary,
		arguments: editorArguments,
		isTerminalEditor: editor.isTerminalEditor,
	};
}

function openEditor(files, options) {
	const result = getEditorInfo(files, options);
	const stdio = result.isTerminalEditor ? 'inherit' : 'ignore';

	const subprocess = execa(result.binary, result.arguments, {
		detached: true,
		stdio,
	});

	// Fallback
	subprocess.on('error', () => {
		const result = getEditorInfo(files, {
			...options,
			editor: '',
		});

		for (const file of result.arguments) {
			open(file);
		}
	});

	if (result.isTerminalEditor) {
		subprocess.on('exit', process.exit);
	} else {
		subprocess.unref();
	}
}

export {
	openEditor,
	getEditorInfo
}