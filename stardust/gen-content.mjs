import fs from 'fs';
const DIR = '/Users/paolo/stardust/rollout/multitest-280626/sony/content/sony';
const MB = 'https://content.da.live/paolomoz/stardust-multitest-280626/sony/media';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const page = (inner) => `<body>\n  <header></header>\n  <main>\n${inner}\n  </main>\n  <footer></footer>\n</body>\n`;
const meta = (t, d) => `    <div>\n      <div class="metadata">\n        <div><div>Title</div><div>${esc(t)}</div></div>\n        <div><div>Description</div><div>${esc(d)}</div></div>\n      </div>\n    </div>`;
const banner = (img, h1, lede) => `    <div>\n      <div class="banner">\n        <div>\n          <div>\n${img ? `            <img src="${MB}/${img}" alt="${esc(h1)}">\n` : ''}            <h1>${esc(h1)}</h1>\n${lede ? `            <p>${esc(lede)}</p>\n` : ''}          </div>\n        </div>\n      </div>\n    </div>`;
const bannerNoImg = (h1, lede) => `    <div>\n      <div class="banner">\n        <div>\n          <div>\n            <h1>${esc(h1)}</h1>\n${lede ? `            <p>${esc(lede)}</p>\n` : ''}          </div>\n        </div>\n      </div>\n    </div>`;
const card = (img, badge, title, desc, href) => `        <div>\n${img ? `          <div><img src="${MB}/${img}" alt="${esc(title)}"></div>\n` : ''}${badge ? `          <div>${esc(badge)}</div>\n` : ''}          <div><h3>${esc(title)}</h3></div>\n${desc ? `          <div>${esc(desc)}</div>\n` : ''}${href ? `          <div><a href="${href}">Read more</a></div>\n` : ''}        </div>`;
const cards = (variant, items) => `    <div>\n      <div class="default-content"><h2>${esc(variant.head)}</h2>${variant.all ? `<p><a href="${variant.all}">View all</a></p>` : ''}</div>\n      <div class="cards ${variant.cls}">\n${items.map((c) => card(c.img, c.badge, c.title, c.desc, c.href)).join('\n')}\n      </div>\n    </div>`;
const dc = (html) => `    <div>\n      <div class="default-content">\n${html}\n      </div>\n    </div>`;
const w = (slug, content) => { fs.writeFileSync(`${DIR}/${slug}.html`, content); console.log('wrote', slug); };

// ---------- products (section-landing) ----------
w('products', page([
  meta('Businesses & Products - Sony Group', 'Sony Group businesses and products across entertainment, electronics, imaging, semiconductors, and financial services, plus new initiatives.'),
  banner('products-mv.png', 'Businesses & Products', 'From entertainment and electronics to imaging, semiconductors, and financial services — explore the breadth of the Sony Group.'),
  cards({ head: 'New Initiatives', cls: 'initiatives' }, [
    { img: 'product-mobility.png', title: 'Mobility Initiatives', desc: "Sony's vision for the future of mobility and in-vehicle entertainment." },
    { img: 'product-img01.png', title: 'Sony AI Inc.', desc: 'Advancing fundamental research and development in artificial intelligence.' },
    { img: 'product-img02.png', title: 'aibo', desc: 'The autonomous entertainment robot that grows alongside its owner.' },
    { img: 'product-img03.png', title: 'Small Optical Link for ISS (SOLISS)', desc: 'Optical communications technology demonstrated from the International Space Station.' },
    { img: 'product-img04.png', title: 'Sony Global Education', desc: 'Creating new educational experiences through technology.' },
    { img: 'product-img05.png', title: 'Toio', desc: 'A robot toy platform that makes learning through play tangible.' },
    { img: 'product-img06.png', title: 'Triporous', desc: 'A porous carbon material derived from rice husks for water and air purification.' },
  ]),
  dc('        <h2>Explore the Sony Group</h2>\n        <ul>\n          <li><a href="/sony/about">About Sony Group</a></li>\n          <li><a href="/sony/technology">Technology</a></li>\n          <li><a href="/sony/design">Design</a></li>\n          <li><a href="/sony/sustainability">Sustainability</a></li>\n          <li><a href="/sony/investor-relations">Investor Relations</a></li>\n          <li><a href="/sony/careers">Careers</a></li>\n        </ul>'),
].join('\n')));

// ---------- about (section-landing) ----------
w('about', page([
  meta('About Sony Group', "About Sony Group Corporation — our Purpose to fill the world with emotion through the power of creativity and technology, corporate information, history, and more."),
  banner('about-KV.jpg', 'About Sony Group', "Sony's Purpose: Fill the world with emotion, through the power of creativity and technology."),
  dc("        <h2>Sony's Purpose</h2>\n        <p>Fill the world with emotion, through the power of creativity and technology.</p>"),
  dc('        <h2>Related Links</h2>\n        <ul>\n          <li><a href="/sony/message">Message from the CEO</a></li>\n          <li><a href="/sony/news-press">News Releases</a></li>\n          <li><a href="/sony/products">Businesses &amp; Products</a></li>\n          <li><a href="/sony/technology">Technology</a></li>\n          <li><a href="/sony/design">Design</a></li>\n          <li><a href="/sony/sustainability">Sustainability</a></li>\n          <li><a href="/sony/investor-relations">Investor Relations</a></li>\n          <li><a href="/sony/careers">Careers</a></li>\n        </ul>'),
].join('\n')));

// ---------- design (section-landing) ----------
w('design', page([
  meta('Sony Design', "Sony Design — creating new values through the power of design since 1961. Award-winning global design across products, experiences, and research."),
  banner('design-mv.png', 'Design', 'Create new values through the power of design. Since 1961, Sony Design has envisioned new paradigms and given meaning to ideas.'),
  cards({ head: "What's New", cls: 'news' }, [
    { title: 'Sakurai Kokeshi x Sony Design', desc: 'Extending the wonders of kokeshi dolls through collaborative design.' },
    { title: 'Demonstration Test for Live Viewing Calming Booth Held at K-Arena', desc: 'Exploring calmer ways to experience live entertainment.' },
    { title: 'Red Dot Award: Product Design 2026', desc: 'Sony Design received 2 awards in the Red Dot Award: Product Design 2026.' },
    { title: 'Politecnico di Milano Design Workshop Week 2026', desc: 'Collaborating with the next generation of designers.' },
    { title: 'ESQUISSE - A dialogue with materials for the future', desc: 'Presented at Milan Design Week.' },
    { title: 'Sony ExploraDream', desc: 'A Creative Entertainment Science Museum that ignites young dreams with inspiration.' },
  ]),
].join('\n')));

// ---------- technology (section-landing) ----------
w('technology', page([
  meta('Technology - Sony Group', "Sony technology — realizing Sony's Creative Entertainment Vision by connecting creators and fans, and filling the world with new Kando."),
  banner('technology-mv.jpg', 'Technology', 'Technology that fills the world with new Kando — realizing Sony’s Creative Entertainment Vision by connecting creators and fans.'),
  cards({ head: 'Featured', cls: 'news' }, [
    { title: 'Sony Women in Technology Award with Nature', desc: 'Recognizing and supporting women advancing science and technology.' },
    { title: 'New Paradigms for Creators and Fans', desc: 'Magdalena Wasowska on the promise of blockchain.' },
    { title: 'Sony Music is Helping Artists Grow Through Gaming', desc: 'Sony IMS GM Brad Spahr on new artist growth opportunities.' },
    { title: 'Delivering New Emotional Experiences', desc: 'How the "groovots" entertainment swarm robot system works.' },
  ]),
].join('\n')));

// ---------- message (article) ----------
w('message', page([
  meta('Message from the CEO - Sony Group', 'A message from Sony Group Corporation Representative Corporate Executive Officer, President and CEO Hiroki Totoki.'),
  banner('message-KV.png', 'Message from the CEO', ''),
  dc(`        <h2>Beyond the Boundaries, Towards Further Growth</h2>
        <p>At the Sony Group, we are committed to our Purpose centered on Kando and our corporate direction of getting closer to people, as we take on the challenge of achieving further growth across the entire Group. In our fifth Mid-Range Plan, which began in FY2024, based on the theme "Beyond the boundaries: Maximize Synergies across the Group," we are strengthening efforts to realize synergies within the Group and further enhance our resilience to changes in the business environment, as we continue to strive to increase our corporate value through sustainable growth.</p>
        <p>In terms of our focus measures for each business, in the Game &amp; Network Services segment, we are working to steadily maintain and increase the number of active users and user engagement, while enhancing our in-house titles and expanding them to PCs. In the Music segment, we are strengthening initiatives in emerging markets and increasing revenue opportunities for our music catalog, while accelerating the global expansion of Japanese animation and artists. In the Pictures segment, which serves as the axis for collaboration between our three entertainment businesses, we are maximizing the value of our intellectual property.</p>
        <p>Our newly defined "Creative Entertainment Vision," a long-term vision that outlines where we want to be in 10 years' time, envisions a future where, in a multi-layered world where the physical and the virtual overlap, we will work with creators to create and deliver endless Kando, through the power of creativity and technology. Towards this future, we plan to work together with creators, fans, and our partners to steadily maximize the value of our IP beyond existing boundaries, while continually evolving the diversity of our businesses and people to achieve further growth.</p>
        <p><strong>Representative Corporate Executive Officer, President and CEO</strong><br>Hiroki Totoki</p>`),
].join('\n')));

// ---------- news-press (listing) ----------
const news = [
  ['June 24, 2026', "Advanced 1/2-type CMOS Sensor for Mobile Applications Featuring Industry's First RB2×2 OCL Pixel Structure"],
  ['June 23, 2026', 'Sony Group Corporation Director Appointments'],
  ['June 19, 2026', 'Sony Partners with UNHCR to Support Emergency Humanitarian Assistance and Higher Education for Refugees'],
  ['June 12, 2026', 'Sony Semiconductor Solutions Corporation Executive Change'],
  ['June 9, 2026', "X-ray CMOS Sensor with Industry's Fastest Imaging and Low-Noise Performance"],
  ['May 28, 2026', "Sony Once Again Recognized as a Leader in Supplier Engagement, Achieving an A Rating on CDP's Supplier Engagement Assessment"],
  ['May 8, 2026', 'Sony Group Corporate Strategy 2026'],
  ['May 8, 2026', 'Sony Semiconductor Solutions and TSMC Enter Preliminary Agreement for Next-Generation Image Sensor Manufacturing'],
  ['May 8, 2026', 'Consolidated Financial Results for the Fiscal Year Ended March 31, 2026'],
  ['April 23, 2026', 'Sony AI Announces Breakthrough Research in Real-World Artificial Intelligence and Robotics'],
  ['April 21, 2026', 'Announcement Regarding the Future Business Direction of Sony Honda Mobility'],
  ['April 14, 2026', 'Sony Ventures Corporation Establishes New Investment Fund "Sony Innovation Fund 4 L.P."'],
  ['March 31, 2026', 'Sony and TCL Sign Definitive Agreements for Strategic Partnership in the Home Entertainment Field'],
  ['March 26, 2026', 'Selection of Board Member Candidates'],
  ['March 25, 2026', 'Introducing the "My aibo" App, a New Way to Capture Life with aibo'],
];
const newsList = news.map(([d, t]) => `          <li><strong>${esc(d)}</strong> &mdash; ${esc(t)}</li>`).join('\n');
w('news-press', page([
  meta('News Releases - Sony Group', 'Recent press releases and news from Sony Group Corporation, covering products, technology, corporate strategy, and financial results.'),
  bannerNoImg('News Releases', 'The latest press releases from Sony Group Corporation.'),
  dc(`        <h2>Recent Releases</h2>\n        <ul>\n${newsList}\n        </ul>\n        <p>Press releases are provided for historical reference. For the complete archive, visit the <a href="https://www.sony.com/en/SonyInfo/News/Press/">Sony Group news room</a>.</p>`),
].join('\n')));

// ---------- privacy (static) ----------
w('privacy', page([
  meta('Privacy Policy - Sony Group', 'The privacy policy of Sony Group Corporation, explaining the information Sony collects and how it is used.'),
  bannerNoImg('Privacy Policy', 'Last Updated and Effective: 01 April 2022'),
  dc(`        <p>This privacy policy ("Privacy Policy") applies only to the information collected by Sony Group Corporation ("Sony" or "We") through this website (the "Website"). This Privacy Policy explains the information that Sony may collect when you interact with us through the Website and our related online services, how that information may be used, and the choices you have.</p>
        <h2>Collection of Information</h2>
        <p>We do not require you to register or otherwise actively provide personal information in order to use the Website. However, certain information may be collected automatically when you visit, and you may choose to provide information when you contact us or use specific features.</p>
        <h2>Information Sony Collects Automatically</h2>
        <p>When you interact with the Website, certain information may be collected automatically, such as your device and browser type, IP address, and how you navigate and use the Website, through cookies and similar technologies.</p>
        <h2>How Sony Uses the Information It Collects</h2>
        <p>Sony uses the information it collects to operate, maintain, and improve the Website and our services, to respond to your inquiries, and to comply with legal obligations.</p>
        <p>For the full, current Privacy Policy, including details on cookies, third-party services, data sharing, security, retention, and your rights, please refer to the <a href="https://www.sony.com/en/privacy/">official Sony Group Privacy Policy</a>.</p>`),
].join('\n')));

console.log('done rich pages');
