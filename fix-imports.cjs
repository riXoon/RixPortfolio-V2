const fs = require('fs');
const constantsFile = 'd:/rixdev/src/constants/index.js';
let content = fs.readFileSync(constantsFile, 'utf8');

// The problematic import looks like this in constants/index.js (from line 2):
// import {
//   LMSThumbnail, PARMSThumbnail, entriqThumbnail, furniroThumbnail, gothamgainsThumbnail, monitoThumbnail, pijinThumbnail, zaprollThumbnail, zentryThumbnail, github, instagram, linkedin, facebook, mail, phone, location, compiledProjects } from '../assets';

content = content.replace(
  /import \{\r?\n  LMSThumbnail, PARMSThumbnail, entriqThumbnail, furniroThumbnail, gothamgainsThumbnail, monitoThumbnail, pijinThumbnail, zaprollThumbnail, zentryThumbnail, github, instagram, linkedin, facebook, mail, phone, location, compiledProjects \} from '\.\.\/assets';/,
  "import { github, instagram, linkedin, facebook, mail, phone, location, compiledProjects } from '../assets';"
);

// The banners import looks like this:
// import {
//   TechCommrBanner, iConvBanner, fmUIBanner, RebyuwerBanner, FMPortfolioBanner, FMDailyUIBanner, FMGalleryUIBanner, quackOverflowBanner, FUNKOshopBanner,
// } from '../assets/banners';

content = content.replace(
  /import \{\r?\n  TechCommrBanner, iConvBanner, fmUIBanner, RebyuwerBanner, FMPortfolioBanner, FMDailyUIBanner, FMGalleryUIBanner, quackOverflowBanner, FUNKOshopBanner,\r?\n\} from '\.\.\/assets\/banners';/,
  `import {
  LMSThumbnail, PARMSThumbnail, entriqThumbnail, furniroThumbnail, gothamgainsThumbnail, monitoThumbnail, pijinThumbnail, zaprollThumbnail, zentryThumbnail,
  TechCommrBanner, iConvBanner, fmUIBanner, RebyuwerBanner, FMPortfolioBanner, FMDailyUIBanner, FMGalleryUIBanner, quackOverflowBanner, FUNKOshopBanner,
} from '../assets/banners';`
);

fs.writeFileSync(constantsFile, content);
console.log('Fixed imports');
