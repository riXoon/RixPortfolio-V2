const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'api.gitbook.com',
  path: '/v1/spaces/TIDODEsc8cw3rxVVBpqb/content',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer gb_api_7j6Y57VGPLr9Cf87NSM8sn32aGEUkMfZKXN1692P'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.pages && json.pages.length > 0) {
        const pageId = json.pages[0].id;
        
        const pageOptions = {
          hostname: 'api.gitbook.com',
          path: `/v1/spaces/TIDODEsc8cw3rxVVBpqb/content/page/${pageId}`,
          method: 'GET',
          headers: {
            'Authorization': 'Bearer gb_api_7j6Y57VGPLr9Cf87NSM8sn32aGEUkMfZKXN1692P'
          }
        };
        
        const pageReq = https.request(pageOptions, (pageRes) => {
          let pageData = '';
          pageRes.on('data', (c) => pageData += c);
          pageRes.on('end', () => {
             const pageJson = JSON.parse(pageData);
             fs.writeFileSync('debug_document.json', JSON.stringify(pageJson.document, null, 2));
             console.log("Wrote document to debug_document.json");
          });
        });
        pageReq.end();
      }
    } catch (e) {
      console.log("Error parsing response:", e);
    }
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
