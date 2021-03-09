const addStrZero = (num) => (num < 10 ? '0' + String(num) : String(num));

const modifyDate = (date) => {
	const mo = date.getMonth() + 1;
	const dd = date.getDate();
	const hh = date.getHours();
	const mm = date.getMinutes();
	return ` ${mo} ${dd} ${addStrZero(hh)}:${addStrZero(mm)}`;
};

class File {
	constructor({
		permission,
		owner,
		ownerGroup,
		fileSize,
		updatedDate,
		key,
		path,
	}) {
		this.name = '';
		this.contents = '';
		this.permission = permission || '-rwxrwxrwx';
		if (key.length > 0) {
			this.name = key;
		}
		this.path = path || [];
		this.link = [];
		this.owner = owner || '';
		this.ownerGroup = ownerGroup || 'staff';
		this.fileSize = fileSize || this.contents.length;
		this.updatedDate = updatedDate || modifyDate(new Date());
		this.isFile = true;
		this.addContents = this.addContents.bind(this);
	}

	addContents(str) {
		this.contents = str;
	}
}

class Folder {
	constructor({
		permission,
		owner,
		ownerGroup,
		fileSize,
		updatedDate,
		key,
		path,
	}) {
		this.name = '';
		this.child = [];
		this.childLength = 0;
		this.link = [];
		this.permission = permission || 'drwxrwxrwx';
		if (key) {
			this.name = key;
		}
		this.path = path || [];
		this.link = [];
		this.owner = owner || '';
		this.ownerGroup = ownerGroup || 'staff';
		this.fileSize = fileSize || 2048;
		this.updatedDate = updatedDate || modifyDate(new Date());
		this.isFile = false;
		this.appendChild = this.appendChild.bind(this);
		this.deleteChild = this.deleteChild.bind(this);
		this.hasChild = this.hasChild.bind(this);
		this.addChild = this.addChild.bind(this);
	}

	addChild(child) {
		this.child.push(child);
	}

	hasChild(name) {
		for (let child of this.child) {
			if (child.name === name) {
				return true;
			}
		}
		return false;
	}

	appendChild(user, name, isSudo, isFile, setUser, cb) {
		if (this.childLength < 6) {
			if (this.hasChild(name)) {
				cb('\r\n');
				cb('The name is already exist. try another name.');
				return;
			} else {
				let newFileOrFolder;
				let info = {};

				if (isSudo) {
					info = {
						permission: 'rwxrwxrwx',
						owner: 'root',
						ownerGroup: 'admin',
					};
				} else {
					info = {
						permission: 'rwxr-xr-x',
						owner: this.owner,
						ownerGroup: 'staff',
					};
				}
				if (info.key === undefined) info.key = name;
				if (info.updatedDate === undefined)
					info.updatedDate = modifyDate(new Date());
				if (isFile) {
					if (info.fileSize === undefined) info.fileSize = 0;
					newFileOrFolder = new File(info);
				} else {
					if (info.fileSize === undefined) info.fileSize = 64;
					newFileOrFolder = new Folder(info);
				}
				this.child.push(newFileOrFolder);
				this.childLength++;
				this.fileSize += info.fileSize;
				user.path[user.path.length - 1] = this;
				user.nowDir = this;
				if (setUser) {
					setUser(user);
				}
			}
		} else {
			cb('\r\n');
			cb(
				'cannot create new file or folder. this directory limited 5 child which is sum of all files and folders',
			);
			return;
		}
	}

	deleteChild(key, r, f, cb) {
		const tmpArr = [];
		let tmp;
		for (let newFileOrFolder of this.child) {
			if (newFileOrFolder.name !== key) {
				tmpArr.push(newFileOrFolder);
			} else {
				tmp = newFileOrFolder;
			}
		}
		if (!!tmp) {
			if (tmp.isFile) {
				this.child = tmpArr;
				this.childLength--;
				return tmp;
			} else {
				if (r && f) {
					this.child = tmpArr;
					this.childLength--;
					return tmp;
				} else {
					if (r && !f) {
						const tempArr = [];
						for (let temp of tmp.child) {
							if (temp.isFile) {
								tempArr.push(temp);
							} else {
								cb('\r\n');
								cb(
									`cannot delete this folder. it's not empty. please try -rf option.`,
								);
								return;
							}
						}
						this.child = tmpArr;
						this.childLength--;
						return tmp;
					}
					if (f && !r) {
						for (let file of tmp.child) {
							if (file.permission.slice(0, 4) !== '-rwx') {
								cb('\r\n');
								cb(
									`cannot delete this folder. found folder. check permission or please try -rf option.`,
								);
								return;
							}
						}
						this.child = tmpArr;
						this.childLength--;
						return tmp;
					}
				}
			}
		} else {
			cb('\r\n');
			cb(`cannot find the file named "${key}"`);
			return;
		}
	}
}

const createFile = (user, key = 'codestates') => {
	const data = {};
	if (user.isSudo) {
		if (data.owner === undefined) {
			data.owner = 'root';
		}
		if (data.permission === undefined) {
			data.permission = 'drwxrwxrwx';
		}
		if (data.ownerGroup === undefined) {
			data.ownerGroup = 'admin';
		}
	} else {
		if (data.owner === undefined) {
			data.owner = user.githubUserName;
		}
		if (data.permission === undefined) {
			data.permission = 'drwxr-xr-x';
		}
		if (data.ownerGroup === undefined) {
			data.ownerGroup = 'staff';
		}
	}
	if (data.fileSize === undefined) {
		data.fileSize = 0;
	}
	if (data.updatedDate === undefined) {
		data.updatedDate = modifyDate(new Date());
	}
	if (data.key === undefined) {
		data.key = key;
	}
	return new File(data);
};

const createFolder = (user, key = 'codestates') => {
	const data = {};
	if (user.isSudo) {
		if (data.owner === undefined) {
			data.owner = 'root';
		}
		if (data.permission === undefined) {
			data.permission = 'drwxrwxrwx';
		}
		if (data.ownerGroup === undefined) {
			data.ownerGroup = 'admin';
		}
	} else {
		if (data.owner === undefined) {
			data.owner = user.githubUserName;
		}
		if (data.permission === undefined) {
			data.permission = 'drwxr-xr-x';
		}
		if (data.ownerGroup === undefined) {
			data.ownerGroup = 'staff';
		}
	}
	if (data.fileSize === undefined) {
		data.fileSize = 64;
	}
	if (data.updatedDate === undefined) {
		data.updatedDate = modifyDate(new Date());
	}
	if (data.key === undefined) {
		data.key = key;
	}
	return new Folder(data);
};

const findParent = (user, nowDir) =>
	user.path.length > 2 ? user.path[user.path - 2] : user.path[0];

export { createFile, createFolder, Folder, File };
