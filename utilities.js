 const listFiles = async (dirHandle) => {
    const files = [];
    for await (let [_, handle] of dirHandle) {
        if (handle.kind === 'directory') {
            files.push(...(await listFiles(handle)));
        } else {
            files.push({handle, dirHandle});
        }
    }

    return files;
}

