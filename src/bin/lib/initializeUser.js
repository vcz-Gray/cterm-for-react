const setKeyValue = (copy = {}, origin = {}, key = '') => {
	if (key && origin[key]) {
		copy[key] = origin[key];
	}
	return copy[key];
};

const initializeUser = (props) => {
	const result = {
		name: '',
		userId: '',
		email: '',
		githubId: '',
		githubUserName: '',
	};

	for (let key in result) {
		result[key] = setKeyValue(result, props, key);
	}

	if (result.name === '') {
		result.name = 'codestates';
	}
	if (result.githubUserName === '') {
		result.githubUserName = 'codestates';
	}
	if (result.dirPath === undefined) {
		result.dirPath = [];
	}
	return result;
};

export { initializeUser };
