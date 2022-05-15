const PREFIX = '@';
const TEMPLATE = `${PREFIX}[TYPE]:GROUP/KEY`;

/**
 * @param {String} type - action type
 * @param {String} group - action group | block | section
 * @param {String} key - action name
 * @returns {String} - string ${PREFIX}[TYPE]:GROUP/KEY
 */
const build = (type = '', group = 'GLOBAL', key = 'NO_NAME') => `${PREFIX}[${type}]:${group}/${key}`;

const ACTION = {
  REQ_CHECK_AUTH: build('REQ', 'AUTH', 'CHECK'),
};


export default ACTION;