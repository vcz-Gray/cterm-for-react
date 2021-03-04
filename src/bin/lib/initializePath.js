import { createFolder } from './folder';

const isUserPath = (githubUserName, path) => {
	if (Array.isArray(path) && path.length > 1) {
		return '/' + path[0] + '/' + path[1] === `/home/${githubUserName}`;
	}
	return false;
};

const initializePath = (user) => {
	const userFolder = createFolder(user, user.githubUserName);
	if (user.path === undefined) {
		const home = createFolder(user, 'home');
		user.path = [home, userFolder];
	}
	if (user.dirPath.length === 0) {
		user.dirPath = ['home', user.githubUserName];
	}
	if (user.nowDir === undefined) {
		user.nowDir = user.path[1];
	}
	return user;
};

const getRoot = (user) => createFolder(user, '/');

export { initializePath, isUserPath, getRoot };
