const fs = require('fs');

async function checkMath() {
  const res = await fetch('http://localhost:3000/api/gitbook');
  const data = await res.json();
  const pages = data.pages || [];
  
  // Flatten pages
  const allPages = [];
  function traverse(pageList) {
    for (const p of pageList) {
      allPages.push(p);
      if (p.pages) traverse(p.pages);
    }
  }
  traverse(pages);
  
  const cryptoPages = allPages.filter(p => p.title.toLowerCase().includes('crypto'));
  console.log('Crypto pages:', cryptoPages.map(p => p.title));
  
  for (const page of cryptoPages) {
    const pageRes = await fetch(`http://localhost:3000/api/gitbook?pageId=${page.id}`);
    const pageData = await pageRes.json();
    const strData = JSON.stringify(pageData, null, 2);
    
    // Find math nodes
    if (strData.includes('math')) {
      console.log(`Found 'math' in ${page.title}`);
      fs.writeFileSync(`math_in_${page.id}.json`, strData);
    }
  }
}

checkMath();
