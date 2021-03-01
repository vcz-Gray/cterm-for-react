import React, { useRef, useState, useEffect } from 'react';
import { XTerm } from 'xterm-for-react';
import { initializeUser } from './lib/initializeUser';
import { initializePath, isUserPath, getRoot } from './lib/initializePath';
import { cmd, splitSemi } from './lib/handleCommand';

const ROOT = getRoot('mkdir root');

// test code to get user information from urclass in temporary
const welcome = (username = 'codestates') =>
	[
		`${username}님 반갑습니다.`,
		'Linux & CLI 실습을 위한 Interactive web tutorial에 오신 것을 환영합니다.',
		'이 튜토리얼은 오로지 코드스테이츠 수강생을 위해 만들어졌습니다.',
		'지금부터 Linux & CLI 실습을 시작합니다.',
	].join('\r\n');

function Terminal(props) {
	const user = initializePath(initializeUser(props));
	const PWD = () => ROOT.name + user.dirPath.join('/');
	const PATH = (cmd) => {
		if (isUserPath(user.githubUserName, user.dirPath)) {
			const copyPath = [...user.dirPath];
			copyPath.shift();
			copyPath.shift();
			return '~' + copyPath.join('/');
		}
		return PWD();
	};
	const xtermRef = useRef(null);
	const [commandLine, setCommandLine] = useState('');
	const inputPrompt = () => {
		const $ = '$ ';
		xtermRef.current.terminal.write('\r\n' + PATH() + $);
	};

	const keyboardEventHandler = ({ domEvent }) => {
		const { key } = domEvent;
		if (key === 'Enter') {
			setCommandLine('');
			inputPrompt();
		} else if (key === 'Backspace') {
			if (commandLine.length > 0) {
				let cmdLine = commandLine.split('');
				cmdLine.pop();
				cmdLine = cmdLine.join('');
				setCommandLine(cmdLine);
				xtermRef.current.terminal.write('\b \b');
			}
		} else {
			setCommandLine(commandLine + key);
			xtermRef.current.terminal.write(key);
		}
	};
	const welcomeText = welcome();
	useEffect(() => {
		xtermRef.current.terminal.writeln(welcomeText);
		inputPrompt();
	}, []);

	return <XTerm ref={xtermRef} onKey={keyboardEventHandler} />;
}

export default Terminal;
