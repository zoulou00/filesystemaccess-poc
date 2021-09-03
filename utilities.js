const getPersistedHandle = () => {
    return idbKeyval.get('directory');
};

const clearHandle = () => {
    idbKeyval.clear();
};

const saveDirectoryAsRecent = (dirHandle) => {
    idbKeyval.set('directory', dirHandle);
};

const listFiles = async (dirHandle) => {
    const files = [];
    for await (let [_, handle] of dirHandle) {
        if (handle.kind === 'directory') {
            files.push(...(await listFiles(handle)));
        } else {
            files.push({ handle, dirHandle });
        }
    }

    return files;
};

const verifyPermission = async (handle) => {
    const opts = { mode: 'readwrite', writeable: true };
    console.log('queryPermission');
    console.log(await handle.queryPermission(opts));
    console.log('requestPermission');
    console.log(await handle.requestPermission(opts));
    if ((await handle.queryPermission(opts)) === 'granted') {
        return true;
    }

    if ((await handle.requestPermission(opts)) === 'granted') {
        return true;
    }
    return false;
};
