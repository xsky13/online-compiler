const path = require('path');
const fs = require('fs');

const dirCodes = path.join(__dirname, "codes");

const deleteFile = async file => {
    const filename = `${file}.${format}`;
    const filepath = path.join(dirCodes, file);

    await fs.unlink(filepath);
    return filepath;
};

module.exports = { 
    deleteFile 
};