class File {
	constructor(filename) {
		this.name = '';
		if (filename.length > 0) {
			this.name = filename;
		}
		this.contents = '';
	}

	addContents(str) {
		this.contents = str;
	}
}

class Folder {
	constructor(key = '') {
		this.name = '';
		this.childFiles = [];
		this.childFolders = [];
		this.childLength = 0;
		if (key) {
			this.name = key;
		}
	}

	appendChildFile(filename) {
		if (this.childLength < 6) {
			if (
				this.childFiles.includes(filename) ||
				this.childFolders.includes(filename)
			) {
				return new Error('filename is already exist. try another filename.');
			} else {
				const file = new File(filename);
				this.childFiles.push(file);
				this.childLength++;
			}
		} else {
			return new Error(
				'cannot create new file or folder. this directory limited 5 child which is sum of all files and folders',
			);
		}
	}

	appendChildFolder(folderName) {
		if (this.childLength < 6) {
			if (
				this.childFiles.includes(folderName) ||
				this.childFolders.includes(folderName)
			) {
				return new Error(
					'folder name is already exist. try another folder name.',
				);
			} else {
				const folder = new Folder(folderName);
				this.childFolders.push(folder);
				this.childLength++;
			}
		} else {
			return new Error(
				'cannot create new file or folder. this directory limited 5 child which is sum of all files and folders',
			);
		}
	}

	deleteChildFile(key) {
		const tmpArr = [];
		let theFile,
			fileFlag = false;
		for (let file of this.childFiles) {
			if (file.name !== key) {
				tmpArr.push(file);
			} else {
				fileFlag = true;
				theFile = file;
			}
		}
		if (fileFlag) {
			this.childFiles = tmpArr;
			return theFile;
		} else {
			return new Error(`cannot find the file named "${key}"`);
		}
	}

	deleteChildFolder(key) {
		const tmpArr = [];
		let theFolder,
			folderFlag = false;
		for (let folder of this.childFolders) {
			if (folder.name !== key) {
				tmpArr.push(folder);
			} else {
				folderFlag = true;
				theFolder = folder;
			}
		}
		if (folderFlag) {
			if (theFolder.childLength === 0) {
				this.childFiles = tmpArr;
				return theFolder;
			} else {
				new Error(`cannot delete this folder. it's not empty.`);
			}
		} else {
			return new Error(`cannot find the file named "${key}"`);
		}
	}
}

const createFolder = (key = 'codestates') => new Folder(key);

export { createFolder, Folder, File };
