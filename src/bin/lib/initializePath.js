import { createFolder } from './folder';

const isUserPath = (githubUserName, path) => {
	if (Array.isArray(path) && path.length > 1) {
		return '/' + path[0] + '/' + path[1] === `/home/${githubUserName}`;
	}
	return false;
};

const initializePath = (user, cb) => {
	const home = createFolder(user, 'home');
	const userDir = createFolder(user, user.githubUserName);
	home.addChild(userDir);
	if (user.path === undefined) {
		user.path = [home, userDir];
	}
	if (user.dirPath.length === 0) {
		user.dirPath = ['home', user.githubUserName];
	}
	if (user.nowDir === undefined) {
		user.nowDir = user.path[1];
	}
	return user;
};

const getRoot = (user) => {
	const rootFolder = createFolder(user, '/');
	user.path.forEach((x) => rootFolder.addChild(x));
	return rootFolder;
};

export { initializePath, isUserPath, getRoot };
