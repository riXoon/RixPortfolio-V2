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
  cert01, cert02, cert03, cert04, cert05, cert06, cert07, cert08, cert09, cert10, cert11, cert12, cert13, cert15, cert16, cert17, cert18, cert19, cert20, cert21
} from '../assets/certifications';

// Profile Imports
//import { FrederickMoreno, LianTorres, KielMariceSerrano } from '../assets/profiles';

// Graphics Imports
import {
  LMSGraphics, PARMSGraphics, entriqGraphics, furniroGraphics, gothamgainsGraphics, monitoGraphics, pijinGraphics, zaprollGraphics, zentryGraphics
} from '../assets/graphics';

// Banner and Thumbnail Imports
import {
  LMSThumbnail, PARMSThumbnail, entriqThumbnail, furniroThumbnail, gothamgainsThumbnail, monitoThumbnail, pijinThumbnail, zaprollThumbnail, zentryThumbnail,
  LMSBanner, entriqBanner, furniroBanner, gothamgainsBanner, monitoBanner, pijinBanner, zaprollBanner, zentryBanner
} from '../assets/banners';

// Navigation Links Data
export const navLinks = [
  { id: 'home', title: 'HOME', },
  { id: 'about', title: 'ABOUT', },
  { id: 'education', title: 'EDUCATION', },
  { id: 'expertise', title: 'EXPERTISE', },
  { id: 'projects', title: 'PROJECTS', },
  { id: 'contact', title: 'CONTACT', },
]

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
      { icon: phone, alt: "phone", name: "+63 9943440309" },
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
        images01: [{ src: cert01 }, { src: cert02 }, { src: cert03 }, { src: cert04 }, { src: cert05 }, { src: cert06 }, { src: cert07 }, { src: cert08 }, { src: cert09 }, { src: cert10 }, { src: cert11 }
        ],
        images02: [{ src: cert12 }, { src: cert13 }, { src: cert15 }, { src: cert16 }, { src: cert17 }, { src: cert18 }, { src: cert19 }, { src: cert20 }, { src: cert21 }
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
    id: 'monito',
    type: '',
    pageStatus: 'Done',
    img: monitoThumbnail,
    title: 'Monito',
    desc: '',
    roles: [],
    poster: monitoBanner,
    content: "",
    siteLink: "https://moonito.netlify.app/",
    githubLink: "https://github.com/riXoon/monito",
    category: [],
    tools: [
      { icon: htmllogo, tooltip: "HyperText Markup Language" },
      { icon: csslogo, tooltip: "Cascading Style Sheet" },
      { icon: githublogo, tooltip: "GitHub" },
      { icon: gitlogo, tooltip: "Git" },
    ],
    graphics: monitoGraphics,
    date: '',
    status: '',
    contributor: [],
    summary: ""
  },
  {
    id: 'PARMS',
    type: '',
    pageStatus: '',
    img: PARMSThumbnail,
    title: 'PARMS',
    desc: '',
    roles: [],
    poster: '',
    content: "",
    siteLink: "",
    githubLink: "",
    category: [],
    tools: [],
    graphics: PARMSGraphics,
    date: '',
    status: '',
    contributor: [],
    summary: ""
  },
  {
    id: 'LMS',
    type: '',
    pageStatus: '',
    img: LMSThumbnail,
    title: 'LMS',
    desc: '',
    roles: [],
    poster: LMSBanner,
    content: "",
    siteLink: "",
    githubLink: "",
    category: [],
    tools: [],
    graphics: LMSGraphics,
    date: '',
    status: '',
    contributor: [],
    summary: ""
  },
  {
    id: 'gothamgains',
    type: '',
    pageStatus: '',
    img: gothamgainsThumbnail,
    title: 'GothamGains',
    desc: '',
    roles: [],
    poster: gothamgainsBanner,
    content: "",
    siteLink: "",
    githubLink: "",
    category: [],
    tools: [],
    graphics: gothamgainsGraphics,
    date: '',
    status: '',
    contributor: [],
    summary: ""
  },
  {
    id: 'furniro',
    type: '',
    pageStatus: '',
    img: furniroThumbnail,
    title: 'Furniro',
    desc: '',
    roles: [],
    poster: furniroBanner,
    content: "",
    siteLink: "",
    githubLink: "",
    category: [],
    tools: [],
    graphics: furniroGraphics,
    date: '',
    status: '',
    contributor: [],
    summary: ""
  },
  {
    id: 'entriq',
    type: '',
    pageStatus: '',
    img: entriqThumbnail,
    title: 'Entriq',
    desc: '',
    roles: [],
    poster: entriqBanner,
    content: "",
    siteLink: "",
    githubLink: "",
    category: [],
    tools: [],
    graphics: entriqGraphics,
    date: '',
    status: '',
    contributor: [],
    summary: ""
  },
];
