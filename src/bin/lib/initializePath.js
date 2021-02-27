import { createFolder } from './folder';

const isUserPath = (githubUserName, path) => {
	if (Array.isArray(path) && path.length > 1) {
		return '/' + path[0] + '/' + path[1] === `/home/${githubUserName}`;
	}
	return false;
};

const initializePath = (user) => {
	if (user.path === undefined) {
		user.path = [createFolder('home'), createFolder(user.githubUserName)];
	}
	if (user.dirPath.length === 0) {
		user.dirPath = ['home', user.githubUserName];
	}
	return user;
};

const getRoot = () => createFolder('/');

export { initializePath, isUserPath, getRoot };
