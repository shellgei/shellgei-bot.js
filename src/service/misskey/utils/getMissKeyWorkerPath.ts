import * as path from 'path'

const getMissKeyWorkerPath = (fileName: string) => path.join(__dirname, '../worker', `${fileName}.js`);

export {getMissKeyWorkerPath}