// ---- Site Config (edit this to update profile) ----
const site = {
    name: 'Xiang Deng',
    title: 'Co-Founder & CTO, NeoCognition',
    photo: 'assets/profile.jpg',
    links: [
        { label: 'Scholar', url: 'https://scholar.google.com/citations?user=d-qpndsAAAAJ' },
        { label: 'GitHub', url: 'https://github.com/xiang-deng' },
        { label: 'LinkedIn', url: 'https://linkedin.com/in/xiang-deng-377288119' },
        { label: 'Email', url: 'mailto:dengxiang1029@gmail.com' },
    ],
    copyright: `&copy; ${new Date().getFullYear()} Xiang Deng`,
};

function renderSidebar(selector) {
    const el = document.querySelector(selector);
    if (!el) return;

    const linksHtml = site.links.map(function (link) {
        const isEmail = link.url.startsWith('mailto:');
        const attrs = isEmail ? '' : ' target="_blank" rel="noopener"';
        return '<a href="' + link.url + '"' + attrs + '>' + link.label + '</a>';
    }).join('\n                        ');

    el.innerHTML =
        '<img src="' + site.photo + '" alt="' + site.name + '" class="sidebar-photo">\n' +
        '                    <div class="sidebar-name">' + site.name + '</div>\n' +
        '                    <p class="sidebar-title">' + site.title + '</p>\n' +
        '                    <nav class="sidebar-links">\n' +
        '                        ' + linksHtml + '\n' +
        '                    </nav>';
}

function renderFooter(selector) {
    var el = document.querySelector(selector);
    if (!el) return;

    var linksHtml = site.links.map(function (link) {
        var isEmail = link.url.startsWith('mailto:');
        var attrs = isEmail ? '' : ' target="_blank" rel="noopener"';
        return '<a href="' + link.url + '"' + attrs + '>' + link.label + '</a>';
    }).join('\n                    ');

    el.innerHTML =
        '<div class="container">\n' +
        '            <div class="footer-content">\n' +
        '                <div class="footer-links">\n' +
        '                    ' + linksHtml + '\n' +
        '                </div>\n' +
        '                <p class="footer-copy">' + site.copyright + '</p>\n' +
        '            </div>\n' +
        '        </div>';
}

// Mobile nav toggle
document.querySelector('.nav-toggle')?.addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('open');
});
