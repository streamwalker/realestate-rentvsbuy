'use strict';
// Only publish the document height to the same-origin page that embeds this tool.
let previousHeight=0;
const reportHeight=()=>{const height=Math.ceil(document.body.getBoundingClientRect().height);if(height===previousHeight)return;previousHeight=height;if(parent!==window)parent.postMessage({type:'homecompare:height',height},location.origin);};
window.addEventListener('load',()=>{new ResizeObserver(reportHeight).observe(document.body);reportHeight();});
