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

const doCmd = (isSudo, isFile, user, setUser, cb, command, str) => {
	if (str.length === 0) {
		cb(`${command}: no such file or directory: ${str}`);
		return;
	}

	let errorFlag = false;
	switch (command) {
		case 'mkdir':
			if (str.length === 0) {
				cb('\r\n');
				cb('Enter the folder name you want to create');
				return;
			}
			if (user.path[user.path.length - 1].childLength < 6) {
				user.path[user.path.length - 1].appendChild(
					user,
					str,
					isSudo,
					isFile,
					setUser,
					cb,
				);
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
			if (str.length === 0) {
				cb('\r\n');
				cb('Enter the file name you want to create');
				return;
			}
			isFile = true;
			if (user.path[user.path.length - 1].childLength < 6) {
				user.path[user.path.length - 1].appendChild(
					user,
					str,
					isSudo,
					isFile,
					setUser,
					cb,
				);
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
			if (user.nowDir.hasChild(str)) {
				const theFolder = user.nowDir.child.filter(
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
	if (args.length > 0) {
		args.forEach((x) => doCmd(isSudo, isFile, user, setUser, cb, command, x));
	} else {
		doCmd(command, ...args);
	}
};

export { objCmd, splitSemi };
