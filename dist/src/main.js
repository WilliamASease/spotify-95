(()=>{var e={939:(e,t,n)=>{e=n.nmd(e),n(416)(e),e.exports=n(36)},416:(e,t,n)=>{e=n.nmd(e);const r=function(){return this||Function("return this")()}(),{apply:o,defineProperty:l}=Reflect,{freeze:i}=Object,{hasOwnProperty:a}=Object.prototype,s=Symbol.for,{type:u,versions:c}=process,{filename:p,id:d,parent:_}=e,f=D(c,"electron")&&"renderer"===u;let m="";"string"==typeof d&&d.startsWith("internal/")&&(m=function(e){let t;try{const{internalBinding:r}=n(Object(function(){var e=new Error("Cannot find module 'internal/bootstrap/loaders'");throw e.code="MODULE_NOT_FOUND",e}())),o=r("natives");D(o,e)&&(t=o[e])}catch(e){}return"string"==typeof t?t:""}("internal/esm/loader"));const h=n(188),{Script:y}=n(144),{createCachedData:w,runInNewContext:v,runInThisContext:b}=y.prototype,{sep:g}=n(17),{readFileSync:O}=n(147),x=new h(d);function D(e,t){return null!=e&&o(a,e,[t])}function S(){return I(n(845),x,N),x.exports}function j(e,t){return S()(e,t)}function T(e,t){try{return O(e,t)}catch(e){}return null}let q,C;x.filename=p,x.parent=_;let F="",M="";""!==m?(M=m,C={__proto__:null,filename:"esm.js"}):(F=__dirname+g+"node_modules"+g+".cache"+g+"esm",q=T(F+g+".data.blob"),M=T(__dirname+g+"esm"+g+"loader.js","utf8"),null===q&&(q=void 0),null===M&&(M=""),C={__proto__:null,cachedData:q,filename:p,produceCachedData:"function"!=typeof w});const P=new y("const __global__ = this;(function (require, module, __shared__) { "+M+"\n});",C);let I,N;if(I=f?o(b,P,[{__proto__:null,filename:p}]):o(v,P,[{__proto__:null,global:r},{__proto__:null,filename:p}]),N=S(),""!==F){const{dir:e}=N.package;let t=e.get(F);if(void 0===t){let n=q;void 0===n&&(n=null),t={buffer:q,compile:new Map([["esm",{circular:0,code:null,codeWithTDZ:null,filename:null,firstAwaitOutsideFunction:null,firstReturnOutsideFunction:null,mtime:-1,scriptData:n,sourceType:1,transforms:0,yieldIndex:-1}]]),meta:new Map},e.set(F,t)}const{pendingScripts:n}=N;let r=n.get(F);void 0===r&&(r=new Map,n.set(F,r)),r.set("esm",P)}l(j,N.symbol.package,{__proto__:null,value:!0}),l(j,N.customInspectKey,{__proto__:null,value:()=>"esm enabled"}),l(j,s("esm:package"),{__proto__:null,value:!0}),i(j),e.exports=j},845:e=>{function t(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=845,e.exports=t},36:(e,t,n)=>{"use strict";n.r(t);const r=require("electron");function o(){const e=new r.BrowserWindow({width:1280,height:720,frame:!1,transparent:!1,webPreferences:{nodeIntegration:!0,zoomFactor:.6}});e.loadURL("http://localhost:3000"),e.webContents.openDevTools()}r.app.whenReady().then((()=>{o(),r.app.on("activate",(function(){0===r.BrowserWindow.getAllWindows().length&&o()}))})),r.app.on("window-all-closed",(function(){"darwin"!==process.platform&&r.app.quit()}))},147:e=>{"use strict";e.exports=require("fs")},188:e=>{"use strict";e.exports=require("module")},17:e=>{"use strict";e.exports=require("path")},144:e=>{"use strict";e.exports=require("vm")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var l=t[r]={id:r,loaded:!1,exports:{}};return e[r](l,l.exports,n),l.loaded=!0,l.exports}n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),n(939)})();