import fsExtra from 'fs-extra';
import fs from 'fs';
import path from 'path';

const capitalise = word =>
    word
        .slice(0, 1)
        .toUpperCase()
        .concat(word.slice(1));

const createNameVersions = name => {
    const splitName = name.split(' ');
    const kebabName = splitName.join('-');
    const capitalsName = splitName.map(word => capitalise(word)).join('');
    const camelCaseName = splitName
        .map((word, index) => (index !== 0 ? capitalise(word) : word))
        .join('');
    return {
        capitalsName,
        camelCaseName,
        kebabName,
    };
};

const getUpdatedName = (name, context) => {
    const regex = new RegExp(context.templateName, 'g');
    const regexCaps = new RegExp(context.templateNameCaps, 'g');
    const regexKebab = new RegExp(context.templateNameKebab, 'g');
    return name
        .replace(regex, context.camelCaseName)
        .replace(regexCaps, context.capitalsName)
        .replace(regexKebab, context.kebabName);
};

const renameFileOrDirectory = (pathToFile, updatedFileName) => {
    // Rename file if it includes the template name
    fs.rename(pathToFile, updatedFileName, e => e !== null && console.log(e));
};

const renameFileContents = (file, context) => {
    if (!fs.lstatSync(file).isDirectory()) {
        fs.readFile(file, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            var result = getUpdatedName(data, context);

            fs.writeFile(file, result, 'utf8', function(err) {
                if (err) {
                    return console.log(err);
                }
            });
        });
    }
};

const updateFileNames = context => {
    //Loop through and change all file names
    fs.readdirSync(context.newDirectory).forEach(item => {
        const pathToFile = path.join(context.newDirectory, item);
        const updatedPathToFile = getUpdatedName(pathToFile, context);
        renameFileOrDirectory(pathToFile, updatedPathToFile);

        if (fs.lstatSync(pathToFile).isDirectory()) {
            const newContext = {
                ...context,
                newDirectory: updatedPathToFile,
            };
            updateFileNames(newContext);
        }
        return;
    });
};

const updateFileContents = context => {
    // Look for instances of name in the file contents and replace them
    fs.readdirSync(context.newDirectory).forEach(item => {
        const pathToFile = path.join(context.newDirectory, item);
        const updatedPathToFile = getUpdatedName(pathToFile, context);

        renameFileContents(updatedPathToFile, context);

        if (fs.lstatSync(updatedPathToFile).isDirectory()) {
            const newContext = {
                ...context,
                newDirectory: updatedPathToFile,
            };
            updateFileContents(newContext);
        }
    });
};

const addToBannerTypes = (data, banner) => {
    // Regex looks for first pipe
    const regex = /(\|)/;
    const addBanner = '| ' + "'" + banner + '-banner' + "'\n    |";
    // This replaces the first pipe with a new one, plus the new banner
    return data.replace(regex, addBanner);
};

const updateTypes = context => {
    fs.readFile(context.typesFilePath, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        const result = addToBannerTypes(data, context.kebabName);

        fs.writeFile(context.typesFilePath, result, 'utf8', function(err) {
            if (err) {
                return console.log(err);
            }
        });
    });
};

(function generateNewBannerCode() {
    var name = process.argv.slice(2).toString();
    if (!name.includes(' ')) {
        console.log(
            'Oops! The name',
            name,
            'should be the words you want in the name separated by spaces. Please try again.',
        );
        console.log('Something like "global new year" works just fine');
        return;
    } else {
        const newNameVersions = createNameVersions(name);
        const oldNameVersions = createNameVersions('moment template');

        const copyFromDirectory = './packages/modules/src/modules/banners/momentTemplate';
        const newDirectory = path.join(
            './packages/modules/src/modules/banners/',
            newNameVersions.camelCaseName,
        );
        const typesFilePath = './packages/modules/src/modules/banners/common/types.tsx';
        const context = {
            templateName: oldNameVersions.camelCaseName,
            templateNameCaps: oldNameVersions.capitalsName,
            templateNameKebab: oldNameVersions.kebabName,
            newDirectory,
            typesFilePath,
            ...newNameVersions,
        };

        fsExtra
            .copy(copyFromDirectory, newDirectory)
            .then(() => updateFileNames(context))
            .then(() => updateFileContents(context))
            .then(() => updateTypes(context))
            .then(() => console.log('Your new banner code has been generated.'))
            .catch(err => console.error(err));
    }
    return;
})();

// How to use? It's a bit hacky!
// Run: node ./createNewBannerFolder "new folder name"
// and the script will generate your new folder and files based on the moment template
// You will still need to make a bunch of additions to files outside this folder
// Like things in shared (article count opt out),
// packages/modules/src/modules/banners/common/types.tsx
// packages/server/src/tests/banners/channelBannerTests.ts
// packages/shared/src/config/modules.ts
// packages/shared/src/types/abTests/banner.ts
