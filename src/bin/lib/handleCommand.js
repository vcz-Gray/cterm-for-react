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

const cmd = (user, line) => {
	const [command, ...args] = line;
	const presentFolder = user.path[user.path.length - 1].folder;
	switch (command) {
		case 'mkdir':
			if (args.length === 0)
				return new Error('Enter the folder name you want to create');
			let flag = false;
			for (let name of args) {
				if (presentFolder.childLength < 6) {
					presentFolder.appendChildFolder(name);
				} else {
					flag = true;
					break;
				}
			}
			if (flag) {
				return new Error(
					'cannot create new file or folder. this directory limited 5 child which is sum of all files and folders',
				);
			}
			return;
		default:
			return 'command not found: ' + command;
	}
};

export { cmd, splitSemi };
