import React, { useRef, useState, useEffect } from 'react';
import { XTerm } from 'xterm-for-react';
import { initializeUser } from './lib/initializeUser';
import { initializePath, isUserPath, getRoot } from './lib/initializePath';
import { objCmd, splitSemi } from './lib/handleCommand';
import { getParamValue } from 'get-params-for-iframe';

// test code to get user information from urclass in temporary
const welcome = (username = 'codestates') =>
	[
		`${username}님 반갑습니다.`,
		'Linux & CLI 실습을 위한 Interactive web tutorial에 오신 것을 환영합니다.',
		'이 튜토리얼은 오로지 코드스테이츠 수강생을 위해 만들어졌습니다.',
		'지금부터 Linux & CLI 실습을 시작합니다.',
	].join('\r\n');

function Terminal({ setCommandLine, setUserInfo, userInfo }) {
	// set parent's states
	if (!setCommandLine) {
		setCommandLine = () => {};
	}
	if (!setUserInfo) {
		setUserInfo = () => {};
	}
	const initialUser = initializePath(initializeUser(userInfo));
	setUserInfo({ ...initialUser });
	const [user, setUser] = useState(initialUser);
	const ROOT = getRoot('mkdir root');
	const xtermRef = useRef(null);
	const writeTerminal = (tmp) => {
		xtermRef.current.terminal.writeln(tmp);
	};
	const newWrite = (tmp) => {
		xtermRef.current.terminal.write(tmp);
	};

	const nonObjCmd = {
		PWD: () => ROOT.name + user.dirPath.join('/'),
		pwd: (cb) => {
			cb('\r\n');
			cb(ROOT.name + user.dirPath.join('/'));
		},
		userPath: () => {
			if (isUserPath(user.githubUserName, user.dirPath)) {
				const copyPath = [...user.dirPath];
				copyPath.shift();
				copyPath.shift();
				return '~' + copyPath.join('/');
			}
			return nonObjCmd.PWD();
		},
		console: () => {
			console.log(user);
		},
		ls: (cb, optionCmd = '') => {
			if (optionCmd && typeof optionCmd === 'string') {
				const options = optionCmd.split('');
				const [a, l] = [options.includes('a'), options.includes('l')];
				if (a && l) {
					cb('\r\n');
					cb('Total ' + user.nowDir.childLength + '\r\n');
					for (let fileOrFolder of user.nowDir.child) {
						const {
							permission,
							link,
							owner,
							ownerGroup,
							updatedDate,
							name,
						} = fileOrFolder;
						cb('\r\n');
						cb(
							`${permission} ${link} ${owner} ${ownerGroup} ${updatedDate} ${name}`,
						);
					}
				} else if (a) {
					for (let fileOrFolder of user.nowDir.child) {
						cb('\r\n');
						cb(fileOrFolder.name + '    ');
					}
				} else if (l) {
					cb('\r\n');
					cb('Total ' + user.nowDir.childLength);
					for (let fileOrFolder of user.nowDir.child) {
						if (fileOrFolder.name[0] !== '.') {
							const {
								permission,
								link,
								owner,
								ownerGroup,
								updatedDate,
								name,
							} = fileOrFolder;
							cb('\r\n');
							cb(
								`${permission} ${link} ${owner} ${ownerGroup} ${updatedDate} ${name}`,
							);
						}
					}
				}
			} else {
				if (user.nowDir.childLength > 0) cb('\r\n');
				for (let fileOrFolder of user.nowDir.child) {
					if (fileOrFolder.name[0] !== '.') {
						cb(fileOrFolder.name + '    ');
					}
				}
			}
		},
	};

	const [commandLine, setCmdLine] = useState('');
	const clearPrompt = () => {
		const $ = '$ ';
		newWrite('\r\n' + nonObjCmd.userPath() + $);
	};

	const setTwoCmdLine = (str) => {
		setCmdLine(str);
		setCommandLine(str);
	};

	// run command
	const doCommand = (line, printCB) => {
		let inputs = splitSemi(line);
		for (let input of inputs) {
			const [command, ...args] = input.split(' ');
			if (nonObjCmd[command]) {
				nonObjCmd[command](printCB, ...args);
			} else {
				objCmd(input, user, setUser, printCB);
			}
		}
	};

	const keyboardEventHandler = ({ domEvent }) => {
		const { key } = domEvent;
		if (key === 'Enter') {
			doCommand(commandLine, writeTerminal);
			setTwoCmdLine('');
			clearPrompt();
		} else if (key === 'Backspace') {
			if (commandLine.length > 0) {
				let cmdLine = commandLine.split('');
				cmdLine.pop();
				cmdLine = cmdLine.join('');
				setTwoCmdLine(cmdLine);
				newWrite('\b \b');
			}
		} else {
			setCmdLine(commandLine + key);
			setCommandLine(commandLine + key);
			newWrite(key);
		}
	};
	const welcomeText = welcome();
	useEffect(() => {
		writeTerminal(welcomeText);
		clearPrompt();
	}, []);

	return <XTerm ref={xtermRef} onKey={keyboardEventHandler} />;
}

export default Terminal;
