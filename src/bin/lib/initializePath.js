import { createFolder } from './folder';

const isUserPath = (githubUserName, path) => {
	if (Array.isArray(path) && path.length > 1) {
		return '/' + path[0] + '/' + path[1] === `/home/${githubUserName}`;
	}
	return false;
};

const initializePath = (user, cb) => {
	const home = createFolder(user, 'home');
	home.appendChild(user, user.githubUserName, true, false, null, cb);
	if (user.path === undefined) {
		user.path = [home, home.child[0]];
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
	rootFolder.child = user.path;
};

export { initializePath, isUserPath, getRoot };
