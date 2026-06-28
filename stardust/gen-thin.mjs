import fs from 'fs';
const DIR = '/Users/paolo/stardust/rollout/multitest-280626/sony/content/sony';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pg = (slug, title, desc, h1, lede, bodyHtml) => {
  const c = `<body>\n  <header></header>\n  <main>\n    <div>\n      <div class="metadata">\n        <div><div>Title</div><div>${esc(title)}</div></div>\n        <div><div>Description</div><div>${esc(desc)}</div></div>\n      </div>\n    </div>\n    <div>\n      <div class="banner">\n        <div>\n          <div>\n            <h1>${esc(h1)}</h1>\n            <p>${esc(lede)}</p>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div>\n      <div class="default-content">\n${bodyHtml}\n      </div>\n    </div>\n  </main>\n  <footer></footer>\n</body>\n`;
  fs.writeFileSync(`${DIR}/${slug}.html`, c);
  console.log('wrote', slug);
};

pg('sustainability', 'Sustainability - Sony Group', "Sony Group's sustainability initiatives, vision, social contribution, diversity, and accessibility commitments.",
  'Sustainability', "Sony's commitment to building a sustainable society through our business and contributing to the resolution of social issues.",
  `        <h2>Our Initiatives</h2>\n        <ul>\n          <li><a href="https://www.sony.com/en/SonyInfo/csr/vision/">Vision &amp; Basic Policy for Sustainability</a></li>\n          <li><a href="https://www.sony.com/en/SonyInfo/csr_report/">Sustainability Report</a></li>\n          <li><a href="https://www.sony.com/en/SonyInfo/csr/community/">Social Contribution</a></li>\n          <li><a href="https://www.sony.com/en/SonyInfo/diversity/">Diversity</a></li>\n          <li><a href="/sony/web-accessibility-statement">Accessibility</a></li>\n        </ul>\n        <p>Learn more at the <a href="https://www.sony.com/en/SonyInfo/csr/">Sony Group sustainability site</a>.</p>`);

pg('careers', 'Careers - Sony Group', 'Explore career opportunities across the Sony Group and learn about working at Sony.',
  'Careers', 'Join the Sony Group and help fill the world with emotion through the power of creativity and technology.',
  `        <h2>Working at Sony</h2>\n        <p>Sony Group companies offer a wide range of career opportunities across entertainment, electronics, imaging, semiconductors, financial services, and corporate functions worldwide.</p>\n        <ul>\n          <li><a href="https://www.sony.com/en/SonyInfo/Careers/">Careers Top</a></li>\n          <li><a href="/sony/about">About Sony Group</a></li>\n          <li><a href="/sony/message">Message from the CEO</a></li>\n        </ul>`);

pg('investor-relations', 'Investor Relations - Sony Group', "Sony Group Corporation investor relations: financial results, IR news, library, and corporate reports.",
  'Investor Relations', "Financial information, news, and resources for Sony Group Corporation investors and analysts.",
  `        <h2>IR Resources</h2>\n        <ul>\n          <li><a href="https://www.sony.com/en/SonyInfo/IR/news/2026.html">IR News</a></li>\n          <li><a href="https://www.sony.com/en/SonyInfo/IR/library/">IR Library</a></li>\n          <li><a href="https://www.sony.com/en/SonyInfo/IR/library/corporatereport/">Corporate Report</a></li>\n          <li><a href="https://www.sony.com/en/SonyInfo/IR/library/presen/er/archive.html">Earnings Announcements</a></li>\n          <li><a href="https://www.sony.com/en/SonyInfo/IR/stock/convert.html">Corporate Bonds &amp; Ratings</a></li>\n        </ul>\n        <p>See the latest <a href="/sony/news-press">corporate news releases</a>.</p>`);

pg('contact', 'Contact Us - Sony Group', 'How to contact Sony Group Corporation and find support across Sony products and services.',
  'Contact Us', 'Find the right way to reach Sony for support, inquiries, and more.',
  `        <h2>Get in Touch</h2>\n        <p>For product support and general inquiries, please visit the Sony Group support directory.</p>\n        <ul>\n          <li><a href="https://www.sony.com/en/SonyInfo/SupportAll/">Support &amp; Contact Directory</a></li>\n          <li><a href="/sony/investor-relations">Investor Relations</a></li>\n          <li><a href="/sony/careers">Careers</a></li>\n        </ul>`);

pg('copyright', 'Terms and Conditions - Sony Group', 'Terms and conditions for use of the Sony Group Portal website.',
  'Terms and Conditions', 'Terms governing the use of this website.',
  `        <p>This website is operated by Sony Group Corporation. By accessing and using this website, you agree to the applicable terms and conditions. The content of this website, including text, images, and trademarks, is protected by copyright and other intellectual property rights owned by Sony Group Corporation or its licensors.</p>\n        <p>For the complete, current terms, please refer to the <a href="https://www.sony.com/en/copyright/">official Sony Group Terms and Conditions</a>.</p>`);

pg('web-accessibility-statement', 'Web Accessibility Statement - Sony Group', "Sony Group's commitment to web accessibility and inclusive design.",
  'Web Accessibility Statement', "Sony is committed to making this website accessible to the widest possible audience.",
  `        <p>Sony Group Corporation strives to ensure that this website is accessible to people with disabilities, in line with recognized accessibility guidelines. We continue to improve the accessibility and usability of our website.</p>\n        <p>For the full statement, see the <a href="https://www.sony.com/en/web-accessibility-statement/">official Web Accessibility Statement</a>.</p>`);

pg('about-this-site', 'About this Site - Sony Group', 'Information about the Sony Group Portal website.',
  'About this Site', 'The Sony Group Portal is the corporate hub for Sony Group Corporation.',
  `        <p>This site provides information about Sony Group Corporation, including our businesses and products, corporate information, technology, sustainability initiatives, design, careers, and investor relations.</p>\n        <ul>\n          <li><a href="/sony/privacy">Privacy Policy</a></li>\n          <li><a href="/sony/copyright">Terms and Conditions</a></li>\n          <li><a href="/sony/web-accessibility-statement">Web Accessibility Statement</a></li>\n          <li><a href="/sony/sitemap">Site Map</a></li>\n        </ul>`);

pg('sitemap', 'Site Map - Sony Group', 'A map of the Sony Group Portal website sections and pages.',
  'Site Map', 'Navigate the Sony Group Portal.',
  `        <h2>Sections</h2>\n        <ul>\n          <li><a href="/sony">Home</a></li>\n          <li><a href="/sony/products">Businesses &amp; Products</a></li>\n          <li><a href="/sony/about">About Sony Group</a></li>\n          <li><a href="/sony/message">Message from the CEO</a></li>\n          <li><a href="/sony/news-press">News Releases</a></li>\n          <li><a href="/sony/technology">Technology</a></li>\n          <li><a href="/sony/design">Design</a></li>\n          <li><a href="/sony/sustainability">Sustainability</a></li>\n          <li><a href="/sony/careers">Careers</a></li>\n          <li><a href="/sony/investor-relations">Investor Relations</a></li>\n          <li><a href="/sony/contact">Contact Us</a></li>\n        </ul>\n        <h2>Legal</h2>\n        <ul>\n          <li><a href="/sony/privacy">Privacy Policy</a></li>\n          <li><a href="/sony/copyright">Terms and Conditions</a></li>\n          <li><a href="/sony/web-accessibility-statement">Web Accessibility Statement</a></li>\n          <li><a href="/sony/about-this-site">About this Site</a></li>\n        </ul>`);

console.log('done thin pages');
