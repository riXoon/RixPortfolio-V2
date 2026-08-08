// Svg Icon Imports
import { github, instagram, linkedin, facebook, mail, phone, location, compiledProjects } from '../assets';

// Icon Imports
import {
  html, css, javascript, react, nodejs, expressjs, mongodb, nextjs, vue, tailwind, bootstrap, gsap, php, figma, git, npm,
} from '../assets/icons';

// Logo Imports
import {
  qcu, sfhs, htmllogo, csslogo, jslogo, figmalogo, reactlogo, vuelogo, nextlogo, phplogo, netlogo, gsaplogo, framerlogo, nodelogo, expresslogo, mongodblogo, postmanlogo, vitelogo, vercellogo, gitlogo, githublogo, npmlogo, vscodelogo, vslogo, tailwindlogo, bootstraplogo, FMLogo, fmUILogo, typescriptlogo, rustlogo
} from '../assets/logos';

// Certification Imports
import {
  cert01, cert02, cert03, cert04, cert05, cert06, cert07, cert08, cert09, cert10, cert11, cert12, cert13, cert15, cert16, cert17, cert18, cert19, cert20, cert21, cert22, cert23, cert24, cert25
} from '../assets/certifications';

// Profile Imports
import { lianProfile, merylProfile, carlProfile, vienProfile, frivsProfile, cedricProfile, yensydProfile  } from '../assets/profiles';

// Graphics Imports
import {
  LMSGraphics, PARMSGraphics, entriqGraphics, furniroGraphics, gothamgainsGraphics, monitoGraphics, pijinGraphics, zaprollGraphics, zentryGraphics, picpacGraphics, defaultGraphics, erixonGraphics
} from '../assets/graphics';

// Banner and Thumbnail Imports
import {
  LMSThumbnail, PARMSThumbnail, entriqThumbnail, furniroThumbnail, gothamgainsThumbnail, monitoThumbnail, picpacThumbnail, pijinThumbnail, zaprollThumbnail, zentryThumbnail, erixonThumbnail,
  LMSBanner, entriqBanner, furniroBanner, gothamgainsBanner, monitoBanner, picpacBanner, pijinBanner, zaprollBanner, zentryBanner, PARMSBanner, erixonBanner, ctfBanner
} from '../assets/banners';

// Achievements
import {
  ach01, ach02, ach03,
} from '../assets/achievements';

// Navigation Links Data
export const navLinks = [
  { id: 'home', title: 'HOME', },
  { id: 'about', title: 'ABOUT', },
  { id: 'education', title: 'EDUCATION', },
  { id: 'expertise', title: 'EXPERTISE', },
  { id: 'achievements', title: 'ACHIEVEMENTS', },
  { id: 'projects', title: 'PROJECTS', },
  { id: 'ctf-writeups', title: 'CTF WRITEUPS', },
  { id: 'testimonials', title: 'TESTIMONIALS', },
  { id: 'contact', title: 'CONTACT', },
]

// Achievement Data
export const AchievementData = [
  {
    id: 1,
    image: ach01,
    title: 'Stellar Philippines Hackathon 2026 Champion',
    description: 'Placed first at Stellar Philippines Hackathon 2026 by developing an innovative financial technology solution that enables digital transactions in areas with limited to no internet connectivity. This initiative bridges the accessibility gap by bringing reliable digital payment capabilities to rural barangays and remote communities.', 
    date: '2026',
  },
  {
    id: 2,
    image: ach02,
    title: 'APAC Stellar Hackathon Philippines Demo Day Top 10 Finalists',
    description: 'Recognized for advancing to the APAC Stellar Hackathon Grand Finale, advancing to compete for a share of the $60,000 APAC Prize Pool',
    date: '2026',
  },
  {
    id: 3,
    image: ach03,
    title: 'APAC Stellar Hackathon Local & Finance Track 3rd Placer',
    description: 'Awarded 3rd Place in the Local & Finance Track at the APAC Stellar Hackathon. This recognition highlights the innovative potential of the developed solution within the competitive fintech landscape.',
    date: '2026',
  },
];

// Socials Data
export const Socials = [
  {
    svg: 'M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z',
    name: "GITHUB",
    link: "https://www.github.com/riXoon",
  },
  {
    svg: ['M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z', 'M7.2 8.809H4V19.5h3.2V8.809Z'],
    name: "LINKEDIN",
    link: "https://www.linkedin.com/in/erickson-guhilde/",
  },
  {
    svg: ['M16.8218 5.1344C16.0887 4.29394 15.648 3.19805 15.648 2H14.7293C14.9659 3.3095 15.7454 4.43326 16.8218 5.1344Z', 'M8.3218 11.9048C6.73038 11.9048 5.43591 13.2004 5.43591 14.7931C5.43591 15.903 6.06691 16.8688 6.98556 17.3517C6.64223 16.8781 6.43808 16.2977 6.43808 15.6661C6.43808 14.0734 7.73255 12.7778 9.324 12.7778C9.62093 12.7778 9.90856 12.8288 10.1777 12.9124V9.40192C9.89927 9.36473 9.61628 9.34149 9.324 9.34149C9.27294 9.34149 9.22654 9.34614 9.1755 9.34614V12.0394C8.90176 11.9558 8.61873 11.9048 8.3218 11.9048Z', 'M19.4245 6.67608V9.34614C17.6429 9.34614 15.9912 8.77501 14.6456 7.80911V14.7977C14.6456 18.2851 11.8108 21.127 8.32172 21.127C6.97621 21.127 5.7235 20.6998 4.69812 19.98C5.8534 21.2198 7.50049 22 9.32392 22C12.8083 22 15.6478 19.1627 15.6478 15.6707V8.68211C16.9933 9.64801 18.645 10.2191 20.4267 10.2191V6.78293C20.0787 6.78293 19.7446 6.74574 19.4245 6.67608Z', 'M14.6456 14.7977V7.80911C15.9912 8.77501 17.6429 9.34614 19.4245 9.34614V6.67608C18.3945 6.45788 17.4899 5.90063 16.8218 5.1344C15.7454 4.43326 14.9704 3.3095 14.7245 2H12.2098L12.2051 15.7775C12.1495 17.3192 10.8782 18.5591 9.32393 18.5591C8.35884 18.5591 7.50977 18.0808 6.98085 17.3564C6.06219 16.8688 5.4312 15.9076 5.4312 14.7977C5.4312 13.205 6.72567 11.9094 8.31708 11.9094C8.61402 11.9094 8.90168 11.9605 9.17079 12.0441V9.35079C5.75598 9.42509 3 12.2298 3 15.6707C3 17.3331 3.64492 18.847 4.69812 19.98C5.7235 20.6998 6.97621 21.127 8.32172 21.127C11.8061 21.127 14.6456 18.2851 14.6456 14.7977Z'],
    name: "TIKTOK",
    link: "https://www.tiktok.com/@rixdev",
  },
];

// Hero Data
export const HeroData = [
  {
    role: ["Frontend", "CTF"],
    name: "ERICKSON GUHILDE",
    content: " a frontend web developer and cybersecurity enthusiast currently studying at Quezon City University. I specialize in building robust, scalable applications using the MERN stack, with a strong preference for structured, minimalist design. Beyond software development, I am deeply involved in the cybersecurity community under the handle Senec4 and actively competing in Capture The Flag events as a member of the Lil:Pwny team, where I focus on Web Exploitation, Cryptography, and Open-Source Intelligence (OSINT). My technical journey is driven by a commitment to merging efficient software engineering with rigorous security practices."
  }
]

// About Data
export const AboutData = [
  {
    whoAmI: [
      {
        name: "Erickson Guhilde",
        content: "A dedicated student from the Philippines, blending a passion for software engineering with a deep interest in cybersecurity. I specialize in both frontend development using the MERN stack, aiming to architect robust, scalable systems that embrace structured and minimalist design principles. I am continually expanding my expertise in offensive security, merging reliable code with rigorous security practices to build highly resilient applications. Outside of traditional development, I am an active Capture The Flag competitor under the handle Senec4, bringing a unique mix of vulnerability research and technical architecture to everything I build.",
        badge: [
          { title: "Front-end Developer", svgPath: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" },
          { title: "CTF Player", svgPath: "m4.988 19.012 5.41-5.41m2.366-6.424 4.058 4.058-2.03 5.41L5.3 20 4 18.701l3.355-9.494 5.41-2.029Zm4.626 4.625L12.197 6.61 14.807 4 20 9.194l-2.61 2.61Z" },
          { title: "Aspiring Penetration Tester", svgPath: "m8 9 3 3-3 3m5 0h3M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" },
        ]
      }
    ],
    howItStarted: [
      {
        icons: [
          { icon: html, tooltip: "HyperText Markup Language" },
          { icon: css, tooltip: "Cascading Style Sheet" },
          { icon: javascript, tooltip: "JavaScript" },
          { icon: figma, tooltip: "Figma" },
        ],
        content: "Back in 2018, I met an online mentor who went by the handle Lux Valdez. He introduced me to the world of cybersecurity, sharing the foundational concepts of hacking and exploitation. While the technical complexities were difficult for me to fully comprehend at that time, the fundamental idea of vulnerability research deeply fascinated me. My resources were highly limited, as I only had access to a basic smartphone. I realized that to truly grasp how systems are compromised, I first needed to learn how they are built. This realization led me to study web development. As I explored the fundamentals, I became entirely captivated by creating the frontend architecture of websites, an experience that sparked my passion for technology and laid the groundwork for my current path in web development and security research. The rest is history."
      }
    ],
    howsItGoing: [
      {
        icons: [
          { icon: html, tooltip: "HyperText Markup Language" },
          { icon: css, tooltip: "Cascading Style Sheet" },
          { icon: javascript, tooltip: "JavaScript" },
          { icon: figma, tooltip: "Figma" },
          { icon: react, tooltip: "React JS" },
          { icon: nodejs, tooltip: "Node JS" },
          { icon: expressjs, tooltip: "Express JS" },
          { icon: mongodb, tooltip: "MongoDB" },
          // { icon: nextjs, tooltip: "Next JS" },
          // { icon: vue, tooltip: "Vue JS" },
          // { icon: php, tooltip: "Hypertext Preprocessor" },
          { icon: tailwind, tooltip: "Tailwind CSS" },
          // { icon: bootstrap, tooltip: "Bootstrap" },
        ],
        content: `After mastering web fundamentals like HTML, CSS, and JavaScript, I advanced to modern frameworks such as Tailwind CSS, React, and React Native, streamlining my development with agentic AI. In 2025, I expanded into cybersecurity by pursuing certifications and competing in local and international Capture The Flag events. Recently, my team won a national hackathon and went on to represent the Philippines at the APAC Stellar Hackathon, securing third place in the Local Finance and Real World Access track. People might say I am currently in my prime, but I do not believe in a peak. I am always evolving.`
      }
    ],
    education: [
      {
        logo: sfhs,
        title: 'SFHS',
        name: 'San Francisco High School',
        level: 'Senior High School (2021 - 2023)',
        course: 'Information and Communication Technology'
      },
      {
        logo: qcu,
        title: 'QCU',
        name: 'Quezon City University',
        level: 'Tertiary (2023 - Present)',
        course: 'Bachelor of Science in Information Technology'
      }
    ]
  }
];

export const ProjectData = [
  {
    title: "Projects",
    content: "This section showcases my work and collaboration projects in fullstack web development and UI/UX design, highlighting my hands-on role in creating high-quality, responsive web applications.",
    badge: [
      { title: "Front-end Development", svgPath: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" },
      { title: "UI/UX Design", svgPath: "m4.988 19.012 5.41-5.41m2.366-6.424 4.058 4.058-2.03 5.41L5.3 20 4 18.701l3.355-9.494 5.41-2.029Zm4.626 4.625L12.197 6.61 14.807 4 20 9.194l-2.61 2.61Z" },
      { title: "Full-stack Development", svgPath: "m8 9 3 3-3 3m5 0h3M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" },
    ]
  }
];

export const ContactData = [
  {
    name: "Erickson Guhilde",
    contacts: [
      { icon: mail, alt: "mail", name: "rixon.code@gmail.com" },
      { icon: location, alt: "location", name: "Quezon City, Philippines" }
    ]
  }
];

export const ExpertiseData = [
  {
    techStacks: [
      { icon: htmllogo, tooltip: "HyperText Markup Language" },
      { icon: csslogo, tooltip: "Cascading Style Sheet" },
      { icon: jslogo, tooltip: "JavaScript" },
      { icon: typescriptlogo, tooltip: "TypeScript" },
      { icon: rustlogo, tooltip: "Rust" },
      { icon: reactlogo, tooltip: "ReactJS" },
      { icon: nodelogo, tooltip: "NodeJS" },
      { icon: expresslogo, tooltip: "ExpressJS" },
      { icon: mongodblogo, tooltip: "MongoDB" },
      // { icon: nextlogo, tooltip: "NextJS" },
      // { icon: vuelogo, tooltip: "VueJS" },
      { icon: tailwindlogo, tooltip: "Tailwind CSS" },
      { icon: bootstraplogo, tooltip: "Bootstrap" },
      // { icon: phplogo, tooltip: "Hypertext Preprocessor" },
      // { icon: netlogo, tooltip: ".NET" },
      // { icon: gsaplogo, tooltip: "GSAP" },
      // { icon: framerlogo, tooltip: "Framer Motion" },
      // { icon: vitelogo, tooltip: "Vite" },
      // { icon: vercellogo, tooltip: "Vercel" },
      { icon: gitlogo, tooltip: "Git" },
      // { icon: npmlogo, tooltip: "NPM" },
      { icon: figmalogo, tooltip: "Figma" },
      { icon: githublogo, tooltip: "GitHub" },
      { icon: vscodelogo, tooltip: "VS Code" },
      { icon: vslogo, tooltip: "Visual Studio" },
    ],
    githubStats: [],
    certifications: [
      {
        // TODO: Certification Link
        title: "Certifications",
        content: "My extensive collection of certificates includes completed courses, active participation <br class='md:block hidden' /> in workshops and from tech industry-relevant webinars.",
        btnText: "View Certificates",
        link: "https://drive.google.com/drive/folders/1zmwS59a85LqUvTd-WQXUFQ-SKbuyvmCv?usp=sharing",
        images01: [
          { src: cert09, title: 'Certified Cybersecurity Analyst (C3SA)', issuer: 'CyberWarefare Labs', date: 'December 2025', category: 'Cybersecurity', description: 'Certified Cyber Security awareness or similar certification.' },
          { src: cert15, title: 'Multi-Cloud Red Teaming Analyst (MCRTA)', issuer: 'CyberWarfare Labs', date: 'October 2025', category: 'Cybersecurity', description: 'Relevant technical training or certification.' },
          { src: cert10, title: 'Certified Junior Web Penetration Tester (CJWPT)', issuer: 'Hack & Fix', date: 'February 2026', category: 'Cybersecurity', description: 'Web Penetration Testing certification.' },
          { src: cert11, title: 'Certified Cybersecurity Foundations (CORE)', issuer: 'Hackviser', date: 'July 2026', category: 'Cybersecurity', description: 'Core cybersecurity concepts and practices from Hackviser.' },
          { src: cert01, title: '0xFunCTF 2026', issuer: '0xFun', date: 'February 2026', category: 'Capture the Flag', description: 'Certificate of Participation for placing 237 out of 1359 teams in0xFunCTF 2026' },
          { src: cert02, title: 'Advent of Cyber 2025', issuer: 'TryHackMe', date: 'December 2025', category: 'Capture the Flag', description: 'Completed the TryHackMe\'s Advent of Cyber 2025 challenges.' },
          { src: cert03, title: 'API Authentication', issuer: 'APIsec University', date: 'June 2025', category: 'Cybersecurity', description: 'Understanding API Authentication mechanisms and vulnerabilities.' },
          { src: cert04, title: 'API Documentation', issuer: 'APIsec University', date: 'September 2025', category: 'Cybersecurity', description: 'Best practices for writing and understanding API Documentation.' },
          { src: cert05, title: 'API Gateway', issuer: 'APIsec University', date: 'September 2025', category: 'Cybersecurity', description: 'Knowledge on securing and managing API Gateways.' },
          { src: cert06, title: 'API Penetration Testing', issuer: 'APIsec University', date: 'June 2025', category: 'Cybersecurity', description: 'Practical API penetration testing methodologies.' },
          { src: cert07, title: 'API Security Fundamentals', issuer: 'APIsec University', date: 'June 2025', category: 'Cybersecurity', description: 'Core concepts of securing modern APIs.' },
          { src: cert08, title: 'Datacamp Top #5 Scholar', issuer: 'AWSCC - QCU', date: 'June 2026', category: 'Student Builder', description: 'Placing 5th in datacamp leaderboard of AWSCC - QCU.' },
          { src: cert25, title: 'APAC Stellar Hackathon Demo Day Top 10 Finalists', issuer: 'Stellar Philippines', date: 'July 2026', category: 'Student Builder', description: 'Winnig as Top 10 Finalists to compete internationally for APAC Stellar Hackathon 2026' },
        ],
        images02: [
          { src: cert12, title: 'Cybersecure U', issuer: 'AWSCC - QCU', date: 'October 2025', category: 'Seminars/Webinars', description: 'Foundations of digital hygiene and cybersecurity.' },
          { src: cert13, title: 'Love At First Bug (LAFB) 2026', issuer: 'TryHackMe', date: 'February 2026', category: 'Capture the Flag', description: 'Certificate of completion for solving all of the rooms on TryHackMe\'s Love At First Bug 2026' },
          { src: cert16, title: 'NYX Design IT Champion', issuer: 'LESIT', date: 'November 2025', category: 'Student Builder', description: 'Winning the NYX Design IT Group Web Designing competition' },
          { src: cert17, title: 'NYX ALT+LEAD', issuer: 'LESIT', date: 'November 2025', category: 'Seminars/Webinars', description: 'Certificate of Participation for attending NYX\'s ALT+LEAD: Shifting Perspective Toward Ethical Leadership in a Technology-Driven World ' },
          { src: cert18, title: 'OWASP API Security Top 10', issuer: 'APIsec University', date: 'June 2025', category: 'Cybersecurity', description: 'Understanding the top 10 vulnerabilities in APIs.' },
          { src: cert19, title: 'CSS Fundamentals', issuer: 'SoloLearn', date: 'February 2022', category: 'Student Builder', description: 'Completed the CSS course on SoloLearn.' },
          { src: cert20, title: 'HTML Fundamentals', issuer: 'SoloLearn', date: 'September 2021', category: 'Student Builder', description: 'Completed the HTML course on SoloLearn.' },
          { src: cert21, title: 'Responsive Web Design', issuer: 'SoloLearn', date: 'August 2022', category: 'Student Builder', description: 'Learned principles of responsive web design on SoloLearn.' },
          { src: cert22, title: 'SEEN 2025', issuer: 'Google Developers on Campus PUP', date: 'August 2025', category: 'Capture the Flag', description: 'Certificate of Participation for SEEN2025 CTF Competition' },
          { src: cert23, title: 'HTB Meetup 2', issuer: 'CyberWirez', date: 'August 2025', category: 'Seminars/Webinars', description: 'Certificate of Attendance for HTB Meetup 2' },
          { src: cert24, title: 'Free Coding Bootcamp: Data Visualization', issuer: 'Zuitt', date: 'November 2025', category: 'Seminars/Webinars', description: 'Certificate of Attendance Data Visualization seminar' }
        ]
      }
    ]
  }
];

export const ProjectOverviewData = [

  {
    id: 'pijin',
    type: 'special',
    pageStatus: 'Done',
    img: pijinThumbnail,
    title: 'Pijin',
    desc: 'Pijin is a Web2.5 data-free unified payment system designed to deliver secure, real-time peer-to-peer (P2P) transactions in zero-data and remote environments. By bridging Stellar blockchain cryptography with ubiquitous GSM/SMS cellular infrastructure, the platform decouples digital finance from broadband internet dependency. Users can fund on-chain escrow vaults online via regulated Stellar Anchors and manage local balances instantly through an offline-first mobile architecture, ensuring full financial accessibility without requiring specialized hardware or continuous data access.',
    roles: ['Frontend Developer', 'UI/UX Designer'],
    poster: pijinBanner,
    content: "The system relies on an offline-first mobile design powered by a high-performance local database for immediate user updates, while handling transaction delivery through dynamic cellular transport routing. To initiate an offline transfer, the sender inputs the recipient's details, and the mobile app securely signs the transaction offline. If cellular load is available, the compressed payload is transmitted via direct SMS to a Zero-API Gateway and cloud relayer. In absolute zero-load scenarios, the app generates a dynamic Payload QR code that an authorized bystander can scan to relay the encrypted SMS on the sender's behalf. Upon receipt, a Soroban smart contract mathematically verifies the offline signature, enforces anti-double-spending controls, and settles the funds instantly on-chain.",
    siteLink: "https://www.pijin.live/",
    githubLink: "https://github.com/0xreru/Pijin",
    category: ['Hackathon Project','Fullstack Project', 'Web3 Project','Team Project',],
    tools:  [
      { icon: csslogo, tooltip: "Cascading Style Sheet" },
      { icon: typescriptlogo, tooltip: "Typescript" },
      { icon: rustlogo, tooltip: "Rust" },
      { icon: reactlogo, tooltip: "ReactJS" },
      { icon: nodelogo, tooltip: "NodeJS" },
      { icon: mongodblogo, tooltip: "MongoDB" },
      { icon: postmanlogo, tooltip: "Postman" },
      { icon: tailwindlogo, tooltip: "Tailwind CSS" },
      { icon: githublogo, tooltip: "GitHub" },
      { icon: gitlogo, tooltip: "Git" },
      { icon: vitelogo, tooltip: "Vite" },
      { icon: vercellogo, tooltip: "Vercel" },
      { icon: npmlogo, tooltip: "NPM" },
    ],
    graphics: pijinGraphics,
    date: 'June 2026 - July 2026',
    status: 'Finished',
    contributor: [
       { 
        name: '0xreru',
        role: ['Backend Developer', 'Smart Contract Developer']
      },
      { 
        name: 'riXoon',
        role: ['Frontend Developer', 'UI/UX Designer']
      },
      { 
        name: 'tambayNgOrtigasAvenue',
        role: ['DevOps', 'Backend Developer']
      },
      { 
        name: 'Kaido147',
        role: ['Team Leader', 'UI/UX Designer','Frontend Developer']
      },
      { 
        name: 'daeroSys',
        role: ['System Analyst', 'Pitcher']
      }
    ],
    summary: ""
  },
  {
    id: 'zentry',
    type: 'special',
    pageStatus: 'Done',
    img: zentryThumbnail,
    title: 'Zentry',
    desc: 'This project is an interactive, motion-heavy landing page crafted to clone and showcase the modern visual identity of Zentry. Developed specifically as a hands-on exercise in advanced web animation, the application leverages React, Framer Motion, and Tailwind CSS to translate complex design concepts into fluid browser interactions. By focusing on high-performance layout transitions, dynamic scroll triggers, and sleek UI choreography, the project demonstrates how modern frontend tools can transform static web interfaces into immersive digital experiences.',
    roles: ['Frontend Developer'],
    poster: zentryBanner,
    content: "The codebase implements a suite of custom animation patterns inspired by Zentry's signature aesthetics, including smooth page reveals, scroll-linked element transformations, interactive hover states, and staggered micro-interactions. Utilizing Framer Motion's gesture and layout animation engines alongside Tailwind's utility-first styling, the site delivers complex visual sequences—such as floating card layouts, dynamic clip-path reveals, and responsive menu transitions—without sacrificing rendering performance or responsiveness across device viewport sizes.",
    siteLink: "https://zentry-clone-web.netlify.app/",
    githubLink: "https://github.com/riXoon/zetry-clone",
    category: ['Inspired Project', 'Solo Project', 'Animation'],
    tools: [
      { icon: csslogo, tooltip: "Cascading Style Sheet" },
      { icon: reactlogo, tooltip: "ReactJS" },
      { icon: figmalogo, tooltip: "Figma" },
      { icon: framerlogo, tooltip: "Framer Motion" },
      { icon: nodelogo, tooltip: "NodeJS" },
      { icon: tailwindlogo, tooltip: "Tailwind CSS" },
      { icon: githublogo, tooltip: "GitHub" },
      { icon: gitlogo, tooltip: "Git" },
      { icon: vitelogo, tooltip: "Vite" },
      { icon: npmlogo, tooltip: "NPM" },
    ],
    graphics: zentryGraphics,
    date: 'January 2025',
    status: 'Finished',
    contributor: [
      { 
        name: 'riXoon',
        role: ['Frontend Developer']
      }
    ],
    summary: "By reproducing the polished visual mechanics of Zentry, this project serves as a practical showcase of mastery over Framer Motion, state-driven animations, and high-fidelity frontend engineering."
  },
  {
    id: 'zaproll',
    type: 'special',
    pageStatus: 'Done',
    img: zaprollThumbnail,
    title: 'Zaproll',
    desc: 'ZapRoll is an end-to-end QR-based event attendance and management system custom-built for Quezon City University’s annual research colloquium, Synergy. The application streamlinies the entire event lifecycle by generating and validating unique QR codes for pre-registration, real-time check-ins across morning and afternoon sessions, and post-event evaluations. Featuring a built-in custom form builder that eliminates reliance on third-party platforms like Google Forms, ZapRoll provides organizers with a centralized ecosystem to manage attendees, track real-time venue capacity, and automatically verify student eligibility for digital certificate issuance.',
    roles: ['Fulstack Developer', 'UI/UX Designer'],
    poster: zaprollBanner,
    content: "The system architecture combines a dynamic form creation module with real-time analytics to monitor student attendance trends and pre-registration rates live during the event. To handle multi-session tracking, ZapRoll uses automated validation logic that correlates morning and afternoon QR scans against submitted evaluation forms to conditionally unlock certificate access for qualifying participants. Built and deployed as a mission-critical application handling real user data in a live production environment, the platform was engineered with strict zero-margin-of-error reliability to maintain seamless data integrity and continuous uptime throughout ongoing, high-volume event sessions.",
    siteLink: "",
    githubLink: "https://github.com/riXoon/ZapRoll-V2",
    category: ['School Project', 'Duo Project', 'Rushed Project'],
    tools: [
      { icon: csslogo, tooltip: "Cascading Style Sheet" },
      { icon: reactlogo, tooltip: "ReactJS" },
      { icon: figmalogo, tooltip: "Figma" },
      { icon: nodelogo, tooltip: "NodeJS" },
      { icon: tailwindlogo, tooltip: "Tailwind CSS" },
      { icon: githublogo, tooltip: "GitHub" },
      { icon: gitlogo, tooltip: "Git" },
      { icon: vitelogo, tooltip: "Vite" },
      { icon: npmlogo, tooltip: "NPM" },
    ],
    graphics: zaprollGraphics,
    date: '',
    status: '',
    contributor: [
      { 
        name: 'riXoon',
        role: ['Fullstack Developer']
      }
    ],
    summary: "ZapRoll modernizes institutional event logistics by replacing disconnected third-party tools with an integrated, highly reliable QR attendance and analytics platform that successfully handled live production data at QCU's Synergy colloquium."
  },
  
   {
    id: 'PARMS',
    type: 'school',
    pageStatus: 'Done',
    img: PARMSThumbnail,
    title: 'PARMS',
    desc: 'The Patient Appointment & Record Management System (PARMS) is a secure, web-based healthcare platform engineered to streamline clinical scheduling and centralize patient record management. Designed to eliminate manual filing errors and overlapping bookings, the system unifies patient profiles, medical histories, and provider availability into a single digital ecosystem. By integrating appointment scheduling directly with electronic health records, PARMS provides healthcare clinics with an organized framework that enhances data accessibility, optimizes operational workflows, and maintains rigorous data integrity.',
    roles: ['Project Manager', 'Fullstack Developer', 'System Analyst'],
    poster: PARMSBanner,
    content: "The application features an intelligent appointment management module with conflict-detection logic to block double-bookings on a first-come, first-served basis, paired with a search-indexed database that links personal details, medications, and clinical histories to a unique Patient ID. To ensure high security and reliability, PARMS incorporates Role-Based Access Control (RBAC), password encryption, email-based Two-Factor Authentication (2FA), and a specialized data archival module capable of restoring deleted records. Evaluated against the ISO 25010 standard across functional suitability, security, reliability, usability, and performance efficiency, the standalone system operates securely without requiring third-party payment, pharmacy, or external lab integrations.",
    siteLink: "https://parms.vercel.app",
    githubLink: "https://github.com/riXoon/PARMS",
    category: ['SIA 102','Team Project'],
    tools: [
      { icon: csslogo, tooltip: "Cascading Style Sheet" },
      { icon: typescriptlogo, tooltip: "Typescript" },
      { icon: jslogo, tooltip: "Javascript" },
      { icon: figmalogo, tooltip: "Figma" },
      { icon: reactlogo, tooltip: "ReactJS" },
      { icon: nodelogo, tooltip: "NodeJS" },
      { icon: mongodblogo, tooltip: "MongoDB" },
      { icon: postmanlogo, tooltip: "Postman" },
      { icon: tailwindlogo, tooltip: "Tailwind CSS" },
      { icon: githublogo, tooltip: "GitHub" },
      { icon: gitlogo, tooltip: "Git" },
      { icon: vitelogo, tooltip: "Vite" },
      { icon: vercellogo, tooltip: "Vercel" },
      { icon: npmlogo, tooltip: "NPM" },
    ],
    graphics: PARMSGraphics,
    date: 'February 2026 - May 2026',
    status: 'Done',
    contributor: [
      {
        name: 'riXoon',
        role: ['Project Manager', 'Fullstack Developer', 'System Analyst']
      },
      {
        name: 'shodetoku',
        role: ['UI/UX Designer', 'Frontend Developer', 'Documentation']
      },
      {
        name: 'Piotr-0-Sys',
        role: ['Frontend Developer', 'Documentation']
      },
      {
        name: 'Jhonas2005',
        role: ['Frontend Developer', 'Documentation']
      }
    ],
    summary: "PARMS modernizes clinical workflows by replacing manual record-keeping with an ISO 25010-evaluated, RBAC-secured web platform that unifies patient scheduling and digital medical histories."
  },
  {
    id: 'LMS',
    type: 'school',
    pageStatus: 'Done',
    img: LMSThumbnail,
    title: 'LMS',
    desc: 'The Library Management System (LMS) is an enterprise-grade backend and system integration project developed as part of a enterprise portal architecture (QCU Portal). Built to unify disparate library operations into a single scalable platform, the system replaces traditional, siloed library setups with an automated digital ecosystem. As Lead and Backend Developer, I architected the platform to streamline physical resource tracking, digital book access, room bookings, and fee enforcement while adhering to a strict security-first framework.',
    roles: ['Lead Developer', 'Backend Developer'],
    poster: LMSBanner,
    content: "The core platform integrates physical catalog management, journal tracking, and external e-book access via the Open Library API alongside a real-time room reservation engine and an automated fines calculator. Serving a multi-role hierarchy (Students, Faculty, Librarians, and Head Librarians), the backend features JWT authentication, bcrypt password hashing, Arcjet rate limiting, strict CORS policies, and server-side input validation. The system also delivers live analytics dashboards, automated email/real-time notifications, a user feedback module, and comprehensive, immutable audit logging for full operational accountability within the larger QCU Portal network.",
    siteLink: "",
    githubLink: "https://github.com/riXoon/QCU-Library-Management-System-Public",
    category: ['SIA 101', 'Team Project'],
    tools: [
      { icon: htmllogo, tooltip: "HyperText Markup Language" },
      { icon: csslogo, tooltip: "Cascading Style Sheet" },
      { icon: typescriptlogo, tooltip: "Typescript" },
      { icon: jslogo, tooltip: "Javascript" },
      { icon: reactlogo, tooltip: "ReactJS" },
      { icon: figmalogo, tooltip: "Figma" },
      { icon: nodelogo, tooltip: "NodeJS" },
      { icon: mongodblogo, tooltip: "MongoDB" },
      { icon: postmanlogo, tooltip: "Postman" },
      { icon: tailwindlogo, tooltip: "Tailwind CSS" },
      { icon: githublogo, tooltip: "GitHub" },
      { icon: gitlogo, tooltip: "Git" },
      { icon: vitelogo, tooltip: "Vite" },
      { icon: vercellogo, tooltip: "Vercel" },
      { icon: npmlogo, tooltip: "NPM" },
    ],
    graphics: LMSGraphics,
    date: '',
    status: '',
    contributor: [],
    summary: "LMS modernizes campus library operations by uniting physical/digital cataloging, room reservations, and automated fines into a secure, RBAC-protected backend integrated with the QCU Portal."
  },
  {
    id: 'erixon',
    type: 'personal',
    pageStatus: 'Done',
    img: erixonThumbnail,
    title: 'Erickson Portfolio',
    desc: 'A modern, interactive developer portfolio built to showcase my projects, skills, and professional journey. The application features a custom UI design with dynamic animations and responsive layouts, demonstrating my expertise in frontend development and UI/UX design.',
    roles: ['Frontend Developer', 'UI/UX Designer'],
    poster: erixonBanner,
    content: "The portfolio is engineered with a strong emphasis on performance and visual storytelling. Built using React and Tailwind CSS, the platform incorporates advanced scrolling effects, staggered layout animations, and optimized asset delivery to provide a premium user experience. It serves as both a resume and a technical sandbox where I implement the latest modern web design practices, from glassmorphism components to complex state-driven interactions, without compromising on accessibility or cross-device compatibility.",
    siteLink: "https://erixon.dev",
    githubLink: "https://github.com/riXoon/RixPortfolio",
    category: ['Personal Project', 'Portfolio', 'UI/UX'],
    tools:  [
      { icon: htmllogo, tooltip: "HyperText Markup Language" },
      { icon: csslogo, tooltip: "Cascading Style Sheet" },
      { icon: jslogo, tooltip: "Javascript" },
      { icon: reactlogo, tooltip: "ReactJS" },
      { icon: tailwindlogo, tooltip: "Tailwind CSS" },
      { icon: figmalogo, tooltip: "Figma" },
      { icon: githublogo, tooltip: "GitHub" },
      { icon: gitlogo, tooltip: "Git" },
      { icon: vitelogo, tooltip: "Vite" },
      { icon: vercellogo, tooltip: "Vercel" },
    ],
    graphics: erixonGraphics,
    date: 'August 2026',
    status: 'Finished',
    contributor: [
       { 
        name: 'riXoon',
        role: ['Frontend Developer', 'UI/UX Designer']
      }
    ],
    summary: "My personal developer portfolio, crafted to seamlessly merge technical proficiency with modern, interactive web design to highlight my work in the tech industry."
  },
  {
    id: 'picpac',
    type: 'personal',
    pageStatus: 'Done',
    img: picpacThumbnail,
    title: 'PicPac',
    desc: 'P!CPAC is a web-based, personalized digital photobooth application designed to bring the traditional photobooth experience directly to modern web browsers. Accessible across mobile, tablet, and desktop viewports without requiring any app downloads or installations, the platform enables users to capture and customize personal memories in real-time. By providing interactive photo customization tools directly within a responsive web interface, P!CPAC delivers a fun, low-friction digital media experience for casual users.',
    roles: ['Frontend Developer'],
    poster: picpacBanner,
    content: "The application features a browser-based camera capture interface integrated with a creative customization canvas. Users can capture live photos and instantly personalize their image strips using a custom selection of visual filters, dynamic background templates, and original, in-house designed stickers. Engineered for cross-device compatibility, the responsive frontend layout adapts seamlessly across different screen sizes, ensuring fluid touch interactions on mobile devices as well as precise cursor manipulation on desktop displays.",
    siteLink: "https://picpac.netlify.app/",
    githubLink: "https://github.com/riXoon/PICPAC",
    category: ['Personal Project', 'Team Project', 'Summer Project'],
    tools: [
      { icon: htmllogo, tooltip: "HyperText Markup Language" },
      { icon: csslogo, tooltip: "Cascading Style Sheet" },
      { icon: jslogo, tooltip: "Javascript" },
      { icon: figmalogo, tooltip: "Figma" },
      { icon: reactlogo, tooltip: "ReactJS" },
      { icon: tailwindlogo, tooltip: "Tailwind CSS" },
      { icon: githublogo, tooltip: "GitHub" },
      { icon: gitlogo, tooltip: "Git" },
      { icon: vercellogo, tooltip: "Vercel" },
      { icon: npmlogo, tooltip: "NPM" },
    ],
    graphics: picpacGraphics,
    date: 'May 2026 - June 2026',
    status: 'In Progress',
    contributor: [
      {
        name: 'riXoon',
        role: ['Frontend Developer']
      }
    ],
    summary: "P!CPAC modernizes the digital photobooth experience by delivering a responsive, app-free web platform featuring live photo capture and customizable overlays, stickers, and backgrounds."
  },
  {
    id: 'monito',
    type: 'personal',
    pageStatus: 'Done',
    img: monitoThumbnail,
    title: 'Monito',
    desc: 'Monito is a responsive pet adoption showcase website built from scratch using semantic HTML5 and custom CSS3. Designed during the early stages of frontend development, the project served as a foundational playground for mastering responsive web design (RWD) principles without relying on external UI frameworks. The platform replicates a modern pet marketplace interface, organizing adoption listings, pet details, and promotional content into a clean, accessible web experience.',
    roles: ['Frontend Developer'],
    poster: monitoBanner,
    content: "The site features a mobile-first, multi-device layout implemented using pure CSS layout techniques, including Flexbox, CSS Grid, and fluid media queries. The codebase focuses on building structured HTML document trees alongside responsive UI components—such as dynamic navigation bars, adaptive image grids, and flexible card components—ensuring the design seamlessly scales from mobile viewports to desktop screens while maintaining consistent typography and spatial alignment.",
    siteLink: "https://moonito.netlify.app/",
    githubLink: "https://github.com/riXoon/monito",
    category: ['Solo Project', 'Side Project'],
    tools: [
      { icon: htmllogo, tooltip: "HyperText Markup Language" },
      { icon: csslogo, tooltip: "Cascading Style Sheet" },
      { icon: figmalogo, tooltip: "Figma" },
      { icon: githublogo, tooltip: "GitHub" },
      { icon: gitlogo, tooltip: "Git" },
    ],
    graphics: monitoGraphics,
    date: 'June 2024',
    status: 'Finished',
    contributor: [
      {
        name: 'riXoon',
        role: ['Frontend Developer']
      }
    ],
    summary: "Monito marks as my foundational milestone in mobile-first frontend engineering, demonstrating practical application of core web standards, raw CSS layout engines, and cross-device responsiveness."
  },

  {
    id: 'gothamgains',
    type: 'personal',
    pageStatus: 'Done',
    img: gothamgainsThumbnail,
    title: 'GothamGains',
    desc: 'GothamGains is a Batman-themed fitness web application engineered to deliver custom workout routines tailored to individual training preferences. Combining a dark, immersive visual identity with interactive fitness logic, the platform provides gym enthusiasts with a uniquely styled interface to plan and optimize their strength training regimens. By allowing users to select specific workout splits and targeted muscle groups, GothamGains transforms routine fitness planning into an engaging, theme-driven digital experience.',
    roles: ['Frontend Developer'],
    poster: gothamgainsBanner,
    content: "The core functionality centers on an automated plan generation engine that processes user inputs—such as workout splits (e.g., Push/Pull/Legs, Upper/Lower) and specific muscle focus areas—to construct tailored exercise routines. Designed around the iconic Gotham aesthetic, the frontend features dark-mode UI components, thematic typography, and dynamic workout cards that organize target sets, reps, and exercise variations. The application focuses on intuitive user navigation and responsive layout design to ensure seamless access to customized training programs on both mobile and desktop devices.",
    siteLink: "https://gothamgains.netlify.app/",
    githubLink: "https://github.com/riXoon/GothamGains",
    category: ['Solo Project', 'Side Project'],
    tools: [
      { icon: htmllogo, tooltip: "HyperText Markup Language" },
      { icon: csslogo, tooltip: "Cascading Style Sheet" },
      { icon: jslogo, tooltip: "Javascript" },
      { icon: reactlogo, tooltip: "ReactJS" },
      { icon: tailwindlogo, tooltip: "Tailwind CSS" },
      { icon: figmalogo, tooltip: "Figma" },
      { icon: githublogo, tooltip: "GitHub" },
      { icon: gitlogo, tooltip: "Git" },
      { icon: vitelogo, tooltip: "Vite" },
    ],
    graphics: gothamgainsGraphics,
    date: 'August 2024',
    status: 'Finished',
    contributor: [
      {
        name: 'riXoon',
        role: ['Frontend Developer']
      }
    ],
    summary: "GothamGains merges a distinct Batman-inspired visual theme with dynamic workout generation logic, offering fitness enthusiasts a personalized and visually captivating approach to routine planning."
  },
  {
    id: 'furniro',
    type: 'personal',
    pageStatus: 'Done',
    img: furniroThumbnail,
    title: 'Furniro',
    desc: 'Furniro is a modern furniture e-commerce showcase website built from the ground up to refine core web development skills. Designed as a hands-on frontend practice project using standard HTML5 and CSS3, the application replicates the look and feel of a sleek digital storefront. The platform organizes home decor, furniture collections, and promotional layouts into an intuitive visual shopping experience.',
    roles: ['Frontend Developer'],
    poster: furniroBanner,
    content: "The project focuses on structuring clean, semantic markup alongside custom CSS styling to construct essential e-commerce UI components. Key interface elements include product display grids, hero promotional banners, category navigation cards, and product details previews. By building the layout without external UI libraries, the project emphasizes mastery over fundamental styling concepts—such as Flexbox, CSS Grid, spatial alignment, custom typography, and responsive media queries across various screen sizes.",
    siteLink: "https://furnir0.netlify.app/#",
    githubLink: "https://github.com/riXoon/furniro",
    category: ['Solo Project', 'Side Project'],
    tools: [
      { icon: htmllogo, tooltip: "HyperText Markup Language" },
      { icon: csslogo, tooltip: "Cascading Style Sheet" },
      { icon: figmalogo, tooltip: "Figma" },
      { icon: githublogo, tooltip: "GitHub" },
      { icon: gitlogo, tooltip: "Git" },
    ],
    graphics: furniroGraphics,
    date: 'September 2024',
    status: 'Finished',
    contributor: [
      {
        name: 'riXoon',
        role: ['Frontend Developer']
      }
    ],
    summary: "Furniro demonstrates my practical application of core HTML and CSS by translating modern e-commerce visual design patterns into a responsive, framework-free frontend interface."
  },
  {
    id: 'entriq',
    type: 'school',
    pageStatus: 'Done',
    img: entriqThumbnail,
    title: 'Entriq',
    desc: 'Entriq is a centralized web platform designed specifically for student entrepreneurs at Quezon City University (QCU). Developed as a core Human-Computer Interaction (HCI) project, the platform serves as an accessible digital hub for showcasing student-led businesses, products, and campus ventures. By prioritizing user-centered design principles, Entriq provides local student founders with a unified showcase interface while giving the QCU community a seamless way to discover and support campus-born initiatives.',
    roles: ['Project Manager', 'Frontend Developer', 'UI/UX Design'],
    poster: entriqBanner,
    content: "As a static web application built with a strong focus on UI/UX research and execution, Entriq emphasizes visual hierarchy, intuitive navigation, and low-friction user journeys. The interface includes custom-designed storefront grids, entrepreneur directory cards, search and filter layouts, and dedicated vendor profile pages. The project lifecycle involved translating user workflows into wireframes, high-fidelity prototypes, and clean frontend components—ensuring accessibility, consistent visual branding, and optimal responsive layouts across both mobile and desktop screens.",
    siteLink: "https://entriq.netlify.app",
    githubLink: "https://github.com/riXoon/EntriqV4",
    category: ['HCI 101', 'Team Project', 'UI/UX'],
    tools: [
      { icon: htmllogo, tooltip: "HyperText Markup Language" },
      { icon: csslogo, tooltip: "Cascading Style Sheet" },
      { icon: jslogo, tooltip: "Javascript" },
      { icon: figmalogo, tooltip: "Figma" },
      { icon: githublogo, tooltip: "GitHub" },
      { icon: gitlogo, tooltip: "Git" },
    ],
    graphics: entriqGraphics,
    date: 'February 2025 - March 2026',
    status: 'Finished',
    contributor: [
      {
        name: 'riXoon',
        role: ['Project Manager', 'Frontend Developer', 'UI/U Designer']
      },
      {
        name: 'derkunn',
        role: ['Frontend Developer', 'UI/U Designer']
      }
    ],
    summary: "Entriq addresses campus entrepreneurship by combining Human-Computer Interaction principles with tailored UI/UX design to deliver a clean, user-focused showcase platform for QCU student businesses."
  },
  
];

export const CTFWriteupData = [
  {
    title: "Web Exploitation: Bypassing Advanced WAFs",
    category: "Web Exploitation",
    desc: "A detailed walkthrough on how to identify and exploit misconfigured Web Application Firewalls in modern web architectures.",
    date: "July 2026",
    link: "https://senec4.gitbook.io/ctf-archive"
  },
  {
    title: "Cryptography: Cracking Custom RSA Implementation",
    category: "Cryptography",
    desc: "Analyzing and breaking a custom RSA implementation with weak prime generation during the latest international CTF.",
    date: "June 2026",
    link: "https://senec4.gitbook.io/ctf-archive"
  },
  {
    title: "OSINT: Tracking Digital Footprints",
    category: "OSINT",
    desc: "A comprehensive guide on utilizing open-source intelligence tools to trace digital footprints across multiple social platforms.",
    date: "May 2026",
    link: "https://senec4.gitbook.io/ctf-archive"
  }
];

export const TestimonialData = [
   {
    profile: cedricProfile,
    name: "Cedric Paul Mendoza",
    role: "Pijin, System Architect",
    testimonial: "Erickson is someone I can always rely on in every project we work on together. His discipline, self-awareness, and commitment to giving his best allow me to focus on my own role with confidence, knowing he’ll do his part well."
  },
  {
    profile: lianProfile,
    name: "Lian Torres",
    role: "Technical Implementation Specialist",
    testimonial: "Erick is a progressive programmer and a potential leader. I have witnessed his growth through various events that will make him successful one day."
  },
  {
    profile: yensydProfile,
    name: "Yensyd Francisco",
    role: "Offensive Security Engineer",
    testimonial: "Erickson is an awesome guy to have in your corner during a CTF. He took complete ownership of the challenges he chose, kept communication effortless, and wasn't shy about throwing out ideas. Super dependable, easygoing, and a genuine team player. "
  },
  {
    profile: frivsProfile,
    name: "Adrian Frivaldo",
    role: "Frontend Developer",
    testimonial: "It's been a while since we've known each other and worked together on many projects. Throughout that time, he has consistently proven himself to be trustworthy, hardworking, and responsible in every task he takes on. His dedication, professionalism, and willingness to support others make him an outstanding teammate, and there's no doubt that he'll be a valuable asset to any organization."
  },
  {
    profile: vienProfile,
    name: "Steffani Vienne Carcer",
    role: "UI/UX Designer",
    testimonial: "I worked with Erickson on a summer project as the UI designer. His dedication and superb programming skills really brought the designs to life. He is constantly learning and developing, and I can proudly say that Erickson is a reliable and talented collaborator. Working with him throughout the project was both fun and rewarding."
  },
  {
    profile: carlProfile,
    name: "Carl Arbolado",
    role: "Stellar Ambassador",
    testimonial: "Working with him was seamless. His communication throughout development was outstanding, and I definitely look forward to our next collaboration!"
  },
  {
    profile: merylProfile,
    name: "Meryl Alcantara",
    role: "IT Student",
    testimonial: "I had the opportunity to collaborate with Erickson on a recent project, and I can confidently say that his skills in front-end development are exceptional. Even within a short period, we managed to complete our project successfully, largely due to his expertise and dedication. Erickson was one of the key programmers, and his attention to detail, problem-solving ability, and proficiency in using modern technologies really stood out."
  }
];
