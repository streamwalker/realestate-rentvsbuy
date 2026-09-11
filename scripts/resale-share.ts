import type { Plugin } from 'vite';
import share from '../src/config/resale-share.json';

// A real HTML entry for crawlers that do not execute React or JavaScript.
export function resaleShare(): Plugin {
  return {
    name: 'resale-share-html', enforce: 'post',
    generateBundle(_options, bundle) {
      const entry = bundle['index.html'];
      if (!entry || entry.type !== 'asset') throw new Error('Missing HTML entry for resale share metadata');
      const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
      const meta = (key: string, value: string) => `<meta data-rh="true" ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escape(value)}">`;
      const tags = [
        `<title>${escape(share.title)}</title>`,
        ...Object.entries({description:share.description,'og:type':'website','og:title':share.title,'og:description':share.description,'og:url':share.url,'og:site_name':'rentvsbuyhouse.com','og:locale':'en_US','og:image':share.image,'og:image:secure_url':share.image,'og:image:type':'image/png','og:image:width':'1200','og:image:height':'630','og:image:alt':share.imageAlt,'twitter:card':'summary_large_image','twitter:title':share.title,'twitter:description':share.description,'twitter:image':share.image,'twitter:image:alt':share.imageAlt,'theme-color':'#0b1d32','apple-mobile-web-app-title':'Resale vs New'}).map(([k,v])=>meta(k,v)),
        `<link data-rh="true" rel="canonical" href="${share.url}">`,
        '<link data-rh="true" rel="icon" type="image/png" sizes="32x32" href="/share/resale-vs-new/favicon-32.png">',
        '<link data-rh="true" rel="apple-touch-icon" sizes="180x180" href="/share/resale-vs-new/apple-touch-icon.png">',
        '<link data-rh="true" rel="manifest" href="/share/resale-vs-new/site.webmanifest">',
      ].join('\n');
      const html = String(entry.source).replace(/<head>[\s\S]*?<\/head>/i, head => head
        .replace(/<title>[\s\S]*?<\/title>/gi,'')
        .replace(/<meta\b[^>]*(?:name|property)=["'](?:description|og:[^"']+|twitter:[^"']+|theme-color|apple-mobile-web-app-title)["'][^>]*>/gi,'')
        .replace(/<link\b[^>]*rel=["'](?:canonical|icon|apple-touch-icon|apple-touch-startup-image|manifest)["'][^>]*>/gi,'')
        .replace('</head>',tags+'\n</head>'));
      this.emitFile({type:'asset',fileName:'resale-vs-new/index.html',source:html});
    },
  };
}
