const fs = require('fs');

const thumbnails = [
  { name: 'LMS', file: 'LMS-thumbnail.jpg' },
  { name: 'PARMS', file: 'PARMS-thumbnail.jpg' },
  { name: 'entriq', file: 'entriq-thumbnail.jpg' },
  { name: 'furniro', file: 'furniro-thumbnail.jpg' },
  { name: 'gothamgains', file: 'gothamgains-thumbnail.jpg' },
  { name: 'monito', file: 'monito-thumbnail.jpg' },
  { name: 'pijin', file: 'pijin-thumbnail.jpg' },
  { name: 'zaproll', file: 'zaproll-thumbnail.jpg' },
  { name: 'zentry', file: 'zentry-thumbnail.jpg' }
];

// Update banners index
const bannersIndexFile = 'd:/rixdev/src/assets/banners/index.js';
let bannersContent = fs.readFileSync(bannersIndexFile, 'utf8');

let imports = '';
let exportsList = [];
thumbnails.forEach(t => {
  const varName = t.name + 'Thumbnail';
  imports += `import ${varName} from './${t.file}'\n`;
  exportsList.push(varName);
});

bannersContent = imports + bannersContent;
bannersContent = bannersContent.replace(/export \{/, `export {\n  ${exportsList.join(',\n  ')},`);
fs.writeFileSync(bannersIndexFile, bannersContent);

// Update constants/index.js
const constantsFile = 'd:/rixdev/src/constants/index.js';
let constantsContent = fs.readFileSync(constantsFile, 'utf8');

const newImports = exportsList.join(', ');
constantsContent = constantsContent.replace(
  /import \{([\s\S]*?)\} from '\.\.\/assets\/banners';/,
  (match, group1) => {
    return `import {\n  ${newImports},${group1}} from '../assets/banners';`;
  }
);

let projectDataStr = 'export const ProjectOverviewData = [\n';
thumbnails.forEach(t => {
  projectDataStr += `  {
    id: '${t.name}',
    type: '',
    pageStatus: '',
    img: ${t.name}Thumbnail,
    title: '${t.name}',
    desc: '',
    roles: [],
    poster: '',
    content: "",
    siteLink: "",
    githubLink: "",
    category: [],
    tools: [],
    graphics: '',
    date: '',
    status: '',
    contributor: [],
    summary: ""
  },\n`;
});
projectDataStr += '];';

const startIdx = constantsContent.indexOf('export const ProjectOverviewData = [');
if (startIdx !== -1) {
  const before = constantsContent.slice(0, startIdx);
  constantsContent = before + projectDataStr + '\n';
}

fs.writeFileSync(constantsFile, constantsContent);
console.log('Script completed.');
