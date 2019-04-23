/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const fs = require('fs');
// eslint-disable-next-line
const blacklist = require('metro-config/src/defaults/blacklist');

let moduleBlacklist = [];

const baseModulePath = path.resolve(__dirname, 'node_modules');

const getSymLinkedModules = () => {
  const checkModule = (fileName, alternateRoots, modulePath) => {
    try {
      const fullFileName = path.join(modulePath, fileName);
      const stats = fs.lstatSync(fullFileName);

      if(stats.isSymbolicLink()) {
        const realPath = fs.realpathSync(fullFileName);

        if(realPath.substring(0, (__dirname).length) !== __dirname) {
          alternateRoots.push(realPath);
        }
      }
    } catch(error) {
      // void
    }
  };

  const checkAllModules = (modulePath, alternateRoots) => {
    const stats = fs.lstatSync(modulePath);
    if(!stats.isDirectory()) {
      return alternateRoots;
    }

    fs.readdirSync(modulePath).forEach((fileName) => {
      if(fileName.charAt(0) === '.') {
        return;
      }

      if(fileName.charAt(0) !== '@') {
        checkModule(fileName, alternateRoots, modulePath);
      } else {
        checkAllModules(path.join(modulePath, fileName), alternateRoots);
      }
    });

    return alternateRoots;
  };

  return checkAllModules(baseModulePath, []);
};

const getExtraModulesForAlternateRoot = (fullPath) => {
  const packagePath = path.join(fullPath, 'package.json');
  const packageJSON = require(packagePath);
  const alternateModules = [].concat(
    Object.keys(packageJSON.dependencies || {}),
    Object.keys(packageJSON.devDependencies || {}),
    Object.keys(packageJSON.peerDependencies || {})
  );
  const extraModules = {};

  for(let idx = 0, il = alternateModules.length; idx < il; idx++) {
    const moduleName = alternateModules[idx];
    extraModules[moduleName] = path.join(baseModulePath, moduleName);
  }

  return extraModules;
};

const getBlacklistedModulesForAlternateRoot = (fullPath) => {
  const packagePath = path.join(fullPath, 'package.json');
  const packageJSON = require(packagePath);
  const alternateModules = [].concat(
    Object.keys(packageJSON.peerDependencies || {})
  );
  const extraModules = {};

  for(let idx = 0, il = alternateModules.length; idx < il; idx++) {
    const moduleName = alternateModules[idx];
    extraModules[moduleName] = path.join(fullPath, 'node_modules', moduleName);
  }

  return extraModules;
};

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

// alternate roots (outside of project root)
const alternateRoots = getSymLinkedModules();

if(alternateRoots && alternateRoots.length) {
  console.log('Found alternate project roots: ', alternateRoots);
}

// resolve external package dependencies by forcing them to look into path.join(__dirname, "node_modules")
const extraNodeModules = alternateRoots.reduce((obj, item) => {
  Object.assign(obj, getExtraModulesForAlternateRoot(item));

  return obj;
}, {});

const watchFolders = alternateRoots;

alternateRoots.forEach((root) => {
  const modules = getBlacklistedModulesForAlternateRoot(root);

  moduleBlacklist = moduleBlacklist.concat(
    Object.keys(modules).map((key) => RegExp(`${escapeRegExp(`${modules[key]}\\`)}.*`))
  );
});
module.exports = {
  projectRoot: path.resolve(__dirname, '.'),

  resolver: {
    blacklistRE: blacklist(moduleBlacklist),
    extraNodeModules
    // '@nlabs': path.resolve(__dirname, 'node_modules/@nlabs')
    // '@nlabs/react-native-form': path.resolve(__dirname, 'node_modules/@nlabs/react-native-form')
  },

  transformer: {
    babelTransformerPath: require.resolve('react-native-typescript-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  // transformer: {
  //   getTransformOptions: async () => ({
  //     transform: {
  //       experimentalImportSupport: false,
  //       inlineRequires: false
  //     }
  //   }),
  // },

  watchFolders
};
