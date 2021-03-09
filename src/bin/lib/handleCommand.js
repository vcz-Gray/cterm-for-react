import { createFolder } from './folder';

const splitSemi = (str) => {
	str = str.trim();
	const idxSemi = str.indexOf(';');
	let result = [];
	if (idxSemi === -1) {
		result.push(str);
	} else {
		result = str
			.split(';')
			.map((x) => x.trim())
			.filter((x) => x);
	}
	return result;
};

const doCmd = (isSudo, isFile, user, setUser, cb, command, ...args) => {
	if (args.length === 0) {
		args.forEach((x) => cb(`${command}: no such file or directory: ${x}`));
		return;
	}

	let errorFlag = false;
	switch (command) {
		case 'mkdir':
			if (args.length === 0) {
				cb('\r\n');
				cb('Enter the folder name you want to create');
				return;
			}
			if (user.path[user.path.length - 1].childLength < 6) {
				for (let str of args) {
					user.nowDir.appendChild(user, str, isSudo, isFile, setUser, cb);
				}
				user.path.pop();
				user.path.push(user.nowDir);
				setUser(user);
			} else {
				errorFlag = true;
				break;
			}
			if (errorFlag) {
				cb('\r\n');
				cb(
					'cannot create new file or folder. this directory limited 5 child which is sum of all files and folders',
				);
			}
			return;
		case 'touch':
			if (args.length === 0) {
				cb('\r\n');
				cb('Enter the file name you want to create');
				return;
			}
			isFile = true;
			if (user.path[user.path.length - 1].childLength < 6) {
				for (let str of args) {
					user.nowDir.appendChild(user, str, isSudo, isFile, setUser, cb);
				}
				user.path.pop();
				user.path.push(user.nowDir);
				setUser(user);
			} else {
				errorFlag = true;
				break;
			}
			if (errorFlag) {
				cb('\r\n');
				cb(
					'cannot create new file or folder. this directory limited 5 child which is sum of all files and folders',
				);
			}
			return;
		case 'cd':
			if (args[0] === '../') {
				const now = user.path.pop();
				if (user.path.length > 0) {
					user.nowDir = user.path[user.path.length - 1];
				} else {
					user.nowDir = now;
					user.path.push(now);
				}
				setUser(user);
			} else if (user.nowDir.hasChild(str)) {
				const [theFolder] = user.nowDir.child.filter(
					(x) => !x.isFile && x.name === str,
				);
				user.nowDir = theFolder;
				user.path.push(user.nowDir);
				user.dirPath.push(user.nowDir.name);
				setUser(user);
			} else {
				cb('\r\n');
				cb(
					'cannot create new file or folder. this directory limited 5 child which is sum of all files and folders',
				);
			}
			return;
		case 'whoami':
			cb(user.githubUserName);
			return;
		case 'echo':
			const inputFile = args.lastIndexOf('>>');

			if (inputFile !== -1) {
				let filename = '';
				if (args.length > 0) {
					filename = args[args.length - 1];
				}
				if (!this.child.hasChild(filename)) {
					cb(
						`${
							args[args.length - 1]
						}: cannot find the file. please check the filename.`,
					);
				}
				let theFile;
				const tmpChildren = [];
				for (let child of user.nowDir.child) {
					if (child.isFile && child.name === filename) {
						theFile = child;
					} else {
						tmpChildren.push(child);
					}
				}
				if (theFile !== undefined) {
					theFile.contents = args.filter((x, i) => i < inputFile);
					theFile.fileSize = theFile.contents.length * 4;
					tmpChildren.push(theFile);
					user.nowDir.child = tmpChildren;
					user.path[user.path.length - 1] = user.nowDir;
					setUser(user);
				} else {
					cb('please check the command.');
				}
			}
			cb(`${args.join(' ')}`);
			return;
		case 'cat':
			if (args.length > 0 && user.nowDir.hasChild(args[0])) {
				const filename = args[0];
				if (filename.isFile) {
					cb(filename.contents);
				}
			} else {
				cb('cannot find the file. please check the filename.');
			}
			return;
		case 'rm':
			cb('This command will be supported');
			return;
		default:
			cb('\r\n');
			cb('command not found: ' + command);
			return;
	}
};

const objCmd = (line, user, setUser, cb) => {
	const lineArr = line.split(' ');
	let isSudo = false,
		isFile = false;
	if (lineArr[0] === 'sudo') {
		isSudo = true;
		lineArr.shift();
	}
	const [command, ...args] = lineArr;
	if (args.length > 0 && args[0] !== 'rm' && args[0] !== 'echo') {
		args.forEach((x) => doCmd(isSudo, isFile, user, setUser, cb, command, x));
	} else {
		doCmd(command, ...args);
	}
};

export { objCmd, splitSemi };
