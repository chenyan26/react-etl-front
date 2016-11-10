import Reflux from 'reflux';

const ValidateActions = Reflux.createActions(
	[
	 'validateName',
   'validateScript',
   'validateExeInterval',
   'validateUrl',
	]
);

export default ValidateActions;
