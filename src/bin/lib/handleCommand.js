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

const objCmd = (line, user, setUser, cb) => {
	const lineArr = line.split(' ');
	let isSudo = false,
		isFile = false;
	if (lineArr[0] === 'sudo') {
		isSudo = true;
		lineArr.shift();
	}
	const [command, ...args] = line.split(' ');
	switch (command) {
		case 'mkdir':
			if (args.length === 0) {
				cb('\r\n');
				cb('Enter the folder name you want to create');
				return;
			}
			let errorFlag = false;
			for (let name of args) {
				if (user.path[user.path.length - 1].childLength < 6) {
					user.path[user.path.length - 1].appendChild(
						user,
						name,
						isSudo,
						isFile,
						setUser,
						cb,
					);
				} else {
					errorFlag = true;
					break;
				}
			}
			if (errorFlag) {
				cb('\r\n');
				cb(
					'cannot create new file or folder. this directory limited 5 child which is sum of all files and folders',
				);
			}
			return;
		default:
			cb('\r\n');
			cb('command not found: ' + command);
			return;
	}
};

export { objCmd, splitSemi };
