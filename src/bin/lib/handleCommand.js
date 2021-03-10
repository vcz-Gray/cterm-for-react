import { createFolder } from './folder';

const cmdObj = {
	mkdir: (isSudo, isFile, user, setUser, cb, command, ...args) => {
		let messages = [];
		if (args.length === 0) {
			cb('usage: \r\n');
			messages.push('mkdir directory ...');
			return messages;
		}
		for (let str of args) {
			user.nowDir.appendChild(user, str, isSudo, isFile, setUser, cb);
		}
		user.path.pop();
		user.path.push(user.nowDir);
		setUser(user);

		return messages;
	},
	touch: (isSudo, isFile, user, setUser, cb, command, ...args) => {
		let messages = [];
		if (args.length === 0) {
			cb('usage: \r\n');
			messages.push('touch file ...');
			return messages;
		}
		isFile = true;
		for (let str of args) {
			user.nowDir.appendChild(user, str, isSudo, isFile, setUser, cb);
		}
		user.path.pop();
		user.path.push(user.nowDir);
		setUser(user);

		return messages;
	},
	cd: (isSudo, isFile, user, setUser, cb, command, ...args) => {
		let messages = [];
		if (args[0] === '..' || args[0] === '../') {
			const now = user.path.pop();
			if (user.path.length > 0) {
				user.nowDir = user.path[user.path.length - 1];
				user.dirPath.pop();
			} else {
				user.nowDir = now;
				user.path.push(now);
			}
		} else if (user.nowDir.hasChild(args[0])) {
			const [theFolder] = user.nowDir.child.filter(
				(x) => !x.isFile && x.name === args[0],
			);
			user.nowDir = theFolder;
			user.path.push(user.nowDir);
			user.dirPath.push(user.nowDir.name);
		} else {
			messages.push(`no such file or directory: ${args[0]}`);
		}
		setUser(user);
		return messages;
	},
	rm: (isSudo, isFile, user, setUser, cb, command, ...args) => {
		let messages = [];
		if (args.length === 0) {
			cb('usage: ');
			messages.push('rm file ...');
		} else {
			const newChildren = [];
			for (let child of user.nowDir) {
				if (!args.includes(child.name)) {
					newChildren.push(child);
				}
			}
			user.nowDir.child = newChildren;
			user.path[user.path.length - 1] = user.nowDir;
			setUser(user);
		}
		return messages;
	},
	echo: (isSudo, isFile, user, setUser, cb, command, ...args) => {
		let messages = [];
		const inputFile = args.lastIndexOf('>>');
		let filename = '',
			targetFile;
		if (inputFile !== -1) {
			filename = args[args.length - 1];
			targetFile = user.nowDir.getChild(filename);
		}
		if (filename && targetFile) {
			args = args.slice(0, inputFile);
			targetFile.contents = args.join(' ');
		}
		messages.push(args.join(' '));
		return messages;
	},
	cat: (isSudo, isFile, user, setUser, cb, command, ...args) => {
		let messages = [];
		const { contents } = user.nowDir.getChild(args[0]);
		if (contents) {
			messages.push(contents);
		} else {
			messages.push('No such file or directory');
		}
		return messages;
	},
	touch: (isSudo, isFile, user, setUser, cb, command, ...args) => {
		let messages = [];
		return messages;
	},
	touch: (isSudo, isFile, user, setUser, cb, command, ...args) => {
		let messages = [];
		return messages;
	},
};

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
	const [command, ...args] = lineArr;
	let messages = [];
	if (cmdObj[command] === undefined) {
		cb('command not found: ', command);
		return;
	} else {
		messages = cmdObj[command](
			isSudo,
			isFile,
			user,
			setUser,
			cb,
			command,
			...args,
		);
	}
	while (messages.length > 0) {
		const message = messages.shift();
		cb(messages + '\r\n');
	}

	return;
};

export { objCmd, splitSemi };
