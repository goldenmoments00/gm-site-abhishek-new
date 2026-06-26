const fs = require('fs');

let html = fs.readFileSync('d:\\TEZXT\\newww abhi\\gm-site-abhishek-main\\public\\pictlens.html', 'utf8');

// The items we want
const items = [
  { name: 'Wedding', category: 'Wedding', image: '/webflow/pictlens/images/Wedding.jpg', classNum: '_01' },
  { name: 'Portfolio', category: 'Portfolio', image: '/webflow/pictlens/images/Portfolio.jpg', classNum: '_02' },
  { name: 'Pre Wedding', category: 'Pre Wedding', image: '/webflow/pictlens/images/Pre Wedding.jpg', classNum: '_03' },
  { name: 'Rice Ceremony', category: 'Rice Ceremony', image: '/webflow/pictlens/images/Rice Ceremony.jpg', classNum: '_04' }
];

function generateLeftBlock(item) {
  return `
            <div class="left-portfolio-wrapper">
              <div class="card-corner-wrapper">
                <div class="card-corner-container"></div>
              </div>
              <div class="left-portfolio-block">
                <div class="w-dyn-list">
                  <div role="list" class="w-dyn-items">
                    <div role="listitem" class="w-dyn-item">
                      <a href="#" class="portfolio-content-link w-inline-block">
                        <div class="corner-component">
                          <div class="corner-01"></div>
                          <div class="corner-02"></div>
                          <div class="corner-03"></div>
                          <div class="corner-04"></div>
                          <div class="corner-05"></div>
                          <div class="corner-06"></div>
                          <div class="corner-07"></div>
                          <div class="corner-08"></div>
                        </div>
                        <div class="portfolio-content-block">
                          <div class="porfolio-description-wrap">
                            <div class="portfolio-text">2024</div>
                          </div>
                          <h2 class="client-name">${item.name}</h2>
                          <div class="porfolio-description-wrap">
                            <div class="portfolio-text">${item.category}</div>
                            <div class="portfolio-text text-color-secondary">
                              Photography
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
}

function generateRightBlock(item) {
  return `
              <div class="portfolio-component ${item.classNum}">
                <div class="collection-wrapper w-dyn-list">
                  <div role="list" class="collection-list w-dyn-items">
                    <div role="listitem" class="collection-item w-dyn-item">
                      <a href="#" class="portfolio-link w-inline-block">
                        <div class="corner-wrap">
                          <div class="corner-01"></div>
                          <div class="corner-02"></div>
                          <div class="corner-03"></div>
                          <div class="corner-04"></div>
                          <div class="corner-05"></div>
                          <div class="corner-06"></div>
                          <div class="corner-07"></div>
                          <div class="corner-08"></div>
                        </div>
                        <div class="portfolio-content">
                          <img src="${item.image}" loading="lazy" alt="${item.name}" sizes="(max-width: 991px) 100vw, 920px" class="portfolio-image" style="object-fit: cover; width: 100%; height: 100%;" />
                          <div class="portfolio-content-wrap">
                            <div class="portfolio-content-item">
                              <div class="portfolio-content-block">
                                <div class="porfolio-description-wrap">
                                  <div class="portfolio-text">2024</div>
                                </div>
                                <h2 class="client-name">${item.name}</h2>
                                <div class="porfolio-description-wrap">
                                  <div class="portfolio-text">${item.category}</div>
                                  <div class="portfolio-text">
                                    Photography
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>`;
}

const leftContent = `
          <div class="left-portfolio-content">
${items.map(generateLeftBlock).join('')}
          </div>
`;

const rightContent = `
          <div class="right-portfolio-content">
            <div class="portfolio-wrapper">
${items.map(generateRightBlock).join('')}
            </div>
          </div>
`;

// we need to replace between <div class="left-portfolio-content"> and </div></div></div> <!-- end of portfolio-wrapper -->
// Let's use regex to find the exact blocks

const leftRegex = /<div class="left-portfolio-content">[\s\S]*?(?=<div class="right-portfolio-content">)/;
html = html.replace(leftRegex, leftContent);

const rightRegex = /<div class="right-portfolio-content">[\s\S]*?(?=\s*<\/div>\s*<!-- Services Header Animation Script -->)/;
// Wait, the script tag is right after the right-portfolio-content section. 
const rightRegexAlternative = /<div class="right-portfolio-content">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*(?=<script>|\s*<!-- Services Header Animation Script -->)/;
html = html.replace(rightRegexAlternative, rightContent + '        </div>\n');

fs.writeFileSync('d:\\TEZXT\\newww abhi\\gm-site-abhishek-main\\public\\pictlens.html', html);
console.log("Replaced successfully");
