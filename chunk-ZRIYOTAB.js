import{a as fe,b as We,c as Ze,d as T,j as q,m as Ye,o as Q,q as H}from"./chunk-4QV3TJEO.js";import{$ as d,A as Ne,Aa as I,Ba as de,D as Pe,Ga as je,Ha as ue,Ia as Fe,J as Ie,Ja as S,La as he,Ma as C,Na as x,Oa as Ue,Pa as _e,Qa as Be,R as Se,Ra as ze,Sa as Ve,Ta as $e,U as A,Ua as Ge,Va as L,W as g,Ya as V,Z as w,a as _,aa as E,b as De,cb as Xe,d as ie,ea as z,g as ae,ja as le,la as Le,m as Oe,ma as ke,n as ce,na as Ce,oc as Je,pc as Ke,r as B,ya as xe}from"./chunk-75JNA2NC.js";var G=class{},te=class{},b=class r{constructor(e){this.normalizedNames=new Map,this.lazyUpdate=null,e?typeof e=="string"?this.lazyInit=()=>{this.headers=new Map,e.split(`
`).forEach(s=>{let t=s.indexOf(":");if(t>0){let n=s.slice(0,t),o=n.toLowerCase(),a=s.slice(t+1).trim();this.maybeSetNormalizedName(n,o),this.headers.has(o)?this.headers.get(o).push(a):this.headers.set(o,[a])}})}:typeof Headers<"u"&&e instanceof Headers?(this.headers=new Map,e.forEach((s,t)=>{this.setHeaderEntries(t,s)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(e).forEach(([s,t])=>{this.setHeaderEntries(s,t)})}:this.headers=new Map}has(e){return this.init(),this.headers.has(e.toLowerCase())}get(e){this.init();let s=this.headers.get(e.toLowerCase());return s&&s.length>0?s[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(e){return this.init(),this.headers.get(e.toLowerCase())||null}append(e,s){return this.clone({name:e,value:s,op:"a"})}set(e,s){return this.clone({name:e,value:s,op:"s"})}delete(e,s){return this.clone({name:e,value:s,op:"d"})}maybeSetNormalizedName(e,s){this.normalizedNames.has(s)||this.normalizedNames.set(s,e)}init(){this.lazyInit&&(this.lazyInit instanceof r?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(e=>this.applyUpdate(e)),this.lazyUpdate=null))}copyFrom(e){e.init(),Array.from(e.headers.keys()).forEach(s=>{this.headers.set(s,e.headers.get(s)),this.normalizedNames.set(s,e.normalizedNames.get(s))})}clone(e){let s=new r;return s.lazyInit=this.lazyInit&&this.lazyInit instanceof r?this.lazyInit:this,s.lazyUpdate=(this.lazyUpdate||[]).concat([e]),s}applyUpdate(e){let s=e.name.toLowerCase();switch(e.op){case"a":case"s":let t=e.value;if(typeof t=="string"&&(t=[t]),t.length===0)return;this.maybeSetNormalizedName(e.name,s);let n=(e.op==="a"?this.headers.get(s):void 0)||[];n.push(...t),this.headers.set(s,n);break;case"d":let o=e.value;if(!o)this.headers.delete(s),this.normalizedNames.delete(s);else{let a=this.headers.get(s);if(!a)return;a=a.filter(i=>o.indexOf(i)===-1),a.length===0?(this.headers.delete(s),this.normalizedNames.delete(s)):this.headers.set(s,a)}break}}setHeaderEntries(e,s){let t=(Array.isArray(s)?s:[s]).map(o=>o.toString()),n=e.toLowerCase();this.headers.set(n,t),this.maybeSetNormalizedName(e,n)}forEach(e){this.init(),Array.from(this.normalizedNames.keys()).forEach(s=>e(this.normalizedNames.get(s),this.headers.get(s)))}};var ye=class{encodeKey(e){return qe(e)}encodeValue(e){return qe(e)}decodeKey(e){return decodeURIComponent(e)}decodeValue(e){return decodeURIComponent(e)}};function Tt(r,e){let s=new Map;return r.length>0&&r.replace(/^\?/,"").split("&").forEach(n=>{let o=n.indexOf("="),[a,i]=o==-1?[e.decodeKey(n),""]:[e.decodeKey(n.slice(0,o)),e.decodeValue(n.slice(o+1))],l=s.get(a)||[];l.push(i),s.set(a,l)}),s}var Et=/%(\d[a-f0-9])/gi,wt={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function qe(r){return encodeURIComponent(r).replace(Et,(e,s)=>wt[s]??e)}function ee(r){return`${r}`}var O=class r{constructor(e={}){if(this.updates=null,this.cloneFrom=null,this.encoder=e.encoder||new ye,e.fromString){if(e.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=Tt(e.fromString,this.encoder)}else e.fromObject?(this.map=new Map,Object.keys(e.fromObject).forEach(s=>{let t=e.fromObject[s],n=Array.isArray(t)?t.map(ee):[ee(t)];this.map.set(s,n)})):this.map=null}has(e){return this.init(),this.map.has(e)}get(e){this.init();let s=this.map.get(e);return s?s[0]:null}getAll(e){return this.init(),this.map.get(e)||null}keys(){return this.init(),Array.from(this.map.keys())}append(e,s){return this.clone({param:e,value:s,op:"a"})}appendAll(e){let s=[];return Object.keys(e).forEach(t=>{let n=e[t];Array.isArray(n)?n.forEach(o=>{s.push({param:t,value:o,op:"a"})}):s.push({param:t,value:n,op:"a"})}),this.clone(s)}set(e,s){return this.clone({param:e,value:s,op:"s"})}delete(e,s){return this.clone({param:e,value:s,op:"d"})}toString(){return this.init(),this.keys().map(e=>{let s=this.encoder.encodeKey(e);return this.map.get(e).map(t=>s+"="+this.encoder.encodeValue(t)).join("&")}).filter(e=>e!=="").join("&")}clone(e){let s=new r({encoder:this.encoder});return s.cloneFrom=this.cloneFrom||this,s.updates=(this.updates||[]).concat(e),s}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(e=>this.map.set(e,this.cloneFrom.map.get(e))),this.updates.forEach(e=>{switch(e.op){case"a":case"s":let s=(e.op==="a"?this.map.get(e.param):void 0)||[];s.push(ee(e.value)),this.map.set(e.param,s);break;case"d":if(e.value!==void 0){let t=this.map.get(e.param)||[],n=t.indexOf(ee(e.value));n!==-1&&t.splice(n,1),t.length>0?this.map.set(e.param,t):this.map.delete(e.param)}else{this.map.delete(e.param);break}}}),this.cloneFrom=this.updates=null)}};var me=class{constructor(){this.map=new Map}set(e,s){return this.map.set(e,s),this}get(e){return this.map.has(e)||this.map.set(e,e.defaultValue()),this.map.get(e)}delete(e){return this.map.delete(e),this}has(e){return this.map.has(e)}keys(){return this.map.keys()}};function Rt(r){switch(r){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function Qe(r){return typeof ArrayBuffer<"u"&&r instanceof ArrayBuffer}function He(r){return typeof Blob<"u"&&r instanceof Blob}function et(r){return typeof FormData<"u"&&r instanceof FormData}function bt(r){return typeof URLSearchParams<"u"&&r instanceof URLSearchParams}var $=class r{constructor(e,s,t,n){this.url=s,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=e.toUpperCase();let o;if(Rt(this.method)||n?(this.body=t!==void 0?t:null,o=n):o=t,o&&(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),this.transferCache=o.transferCache),this.headers??=new b,this.context??=new me,!this.params)this.params=new O,this.urlWithParams=s;else{let a=this.params.toString();if(a.length===0)this.urlWithParams=s;else{let i=s.indexOf("?"),l=i===-1?"?":i<s.length-1?"&":"";this.urlWithParams=s+l+a}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||Qe(this.body)||He(this.body)||et(this.body)||bt(this.body)?this.body:this.body instanceof O?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||et(this.body)?null:He(this.body)?this.body.type||null:Qe(this.body)?null:typeof this.body=="string"?"text/plain":this.body instanceof O?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?"application/json":null}clone(e={}){let s=e.method||this.method,t=e.url||this.url,n=e.responseType||this.responseType,o=e.transferCache??this.transferCache,a=e.body!==void 0?e.body:this.body,i=e.withCredentials??this.withCredentials,l=e.reportProgress??this.reportProgress,c=e.headers||this.headers,u=e.params||this.params,p=e.context??this.context;return e.setHeaders!==void 0&&(c=Object.keys(e.setHeaders).reduce((y,R)=>y.set(R,e.setHeaders[R]),c)),e.setParams&&(u=Object.keys(e.setParams).reduce((y,R)=>y.set(R,e.setParams[R]),u)),new r(s,t,a,{params:u,headers:c,context:p,reportProgress:l,responseType:n,withCredentials:i,transferCache:o})}},N=function(r){return r[r.Sent=0]="Sent",r[r.UploadProgress=1]="UploadProgress",r[r.ResponseHeader=2]="ResponseHeader",r[r.DownloadProgress=3]="DownloadProgress",r[r.Response=4]="Response",r[r.User=5]="User",r}(N||{}),X=class{constructor(e,s=200,t="OK"){this.headers=e.headers||new b,this.status=e.status!==void 0?e.status:s,this.statusText=e.statusText||t,this.url=e.url||null,this.ok=this.status>=200&&this.status<300}},ne=class r extends X{constructor(e={}){super(e),this.type=N.ResponseHeader}clone(e={}){return new r({headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},J=class r extends X{constructor(e={}){super(e),this.type=N.Response,this.body=e.body!==void 0?e.body:null}clone(e={}){return new r({body:e.body!==void 0?e.body:this.body,headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},D=class extends X{constructor(e){super(e,0,"Unknown Error"),this.name="HttpErrorResponse",this.ok=!1,this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${e.url||"(unknown url)"}`:this.message=`Http failure response for ${e.url||"(unknown url)"}: ${e.status} ${e.statusText}`,this.error=e.error||null}},st=200,Mt=204;function pe(r,e){return{body:e,headers:r.headers,context:r.context,observe:r.observe,params:r.params,reportProgress:r.reportProgress,responseType:r.responseType,withCredentials:r.withCredentials,transferCache:r.transferCache}}var At=(()=>{let e=class e{constructor(t){this.handler=t}request(t,n,o={}){let a;if(t instanceof $)a=t;else{let c;o.headers instanceof b?c=o.headers:c=new b(o.headers);let u;o.params&&(o.params instanceof O?u=o.params:u=new O({fromObject:o.params})),a=new $(t,n,o.body!==void 0?o.body:null,{headers:c,context:o.context,params:u,reportProgress:o.reportProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache})}let i=ce(a).pipe(Pe(c=>this.handler.handle(c)));if(t instanceof $||o.observe==="events")return i;let l=i.pipe(Ne(c=>c instanceof J));switch(o.observe||"body"){case"body":switch(a.responseType){case"arraybuffer":return l.pipe(B(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return c.body}));case"blob":return l.pipe(B(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new Error("Response is not a Blob.");return c.body}));case"text":return l.pipe(B(c=>{if(c.body!==null&&typeof c.body!="string")throw new Error("Response is not a string.");return c.body}));case"json":default:return l.pipe(B(c=>c.body))}case"response":return l;default:throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)}}delete(t,n={}){return this.request("DELETE",t,n)}get(t,n={}){return this.request("GET",t,n)}head(t,n={}){return this.request("HEAD",t,n)}jsonp(t,n){return this.request("JSONP",t,{params:new O().append(n,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,n={}){return this.request("OPTIONS",t,n)}patch(t,n,o={}){return this.request("PATCH",t,pe(o,n))}post(t,n,o={}){return this.request("POST",t,pe(o,n))}put(t,n,o={}){return this.request("PUT",t,pe(o,n))}};e.\u0275fac=function(n){return new(n||e)(d(G))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let r=e;return r})(),Dt=/^\)\]\}',?\n/,Ot="X-Request-URL";function tt(r){if(r.url)return r.url;let e=Ot.toLocaleLowerCase();return r.headers.get(e)}var Nt=(()=>{let e=class e{constructor(){this.fetchImpl=E(ge,{optional:!0})?.fetch??((...t)=>globalThis.fetch(...t)),this.ngZone=E(I)}handle(t){return new ae(n=>{let o=new AbortController;return this.doRequest(t,o.signal,n).then(ve,a=>n.error(new D({error:a}))),()=>o.abort()})}doRequest(t,n,o){return ie(this,null,function*(){let a=this.createRequestInit(t),i;try{let v=this.ngZone.runOutsideAngular(()=>this.fetchImpl(t.urlWithParams,_({signal:n},a)));Pt(v),o.next({type:N.Sent}),i=yield v}catch(v){o.error(new D({error:v,status:v.status??0,statusText:v.statusText,url:t.urlWithParams,headers:v.headers}));return}let l=new b(i.headers),c=i.statusText,u=tt(i)??t.urlWithParams,p=i.status,y=null;if(t.reportProgress&&o.next(new ne({headers:l,status:p,statusText:c,url:u})),i.body){let v=i.headers.get("content-length"),j=[],h=i.body.getReader(),f=0,M,k,m=typeof Zone<"u"&&Zone.current;yield this.ngZone.runOutsideAngular(()=>ie(this,null,function*(){for(;;){let{done:P,value:U}=yield h.read();if(P)break;if(j.push(U),f+=U.length,t.reportProgress){k=t.responseType==="text"?(k??"")+(M??=new TextDecoder).decode(U,{stream:!0}):void 0;let Ae=()=>o.next({type:N.DownloadProgress,total:v?+v:void 0,loaded:f,partialText:k});m?m.run(Ae):Ae()}}}));let F=this.concatChunks(j,f);try{let P=i.headers.get("Content-Type")??"";y=this.parseBody(t,F,P)}catch(P){o.error(new D({error:P,headers:new b(i.headers),status:i.status,statusText:i.statusText,url:tt(i)??t.urlWithParams}));return}}p===0&&(p=y?st:0),p>=200&&p<300?(o.next(new J({body:y,headers:l,status:p,statusText:c,url:u})),o.complete()):o.error(new D({error:y,headers:l,status:p,statusText:c,url:u}))})}parseBody(t,n,o){switch(t.responseType){case"json":let a=new TextDecoder().decode(n).replace(Dt,"");return a===""?null:JSON.parse(a);case"text":return new TextDecoder().decode(n);case"blob":return new Blob([n],{type:o});case"arraybuffer":return n.buffer}}createRequestInit(t){let n={},o=t.withCredentials?"include":void 0;if(t.headers.forEach((a,i)=>n[a]=i.join(",")),t.headers.has("Accept")||(n.Accept="application/json, text/plain, */*"),!t.headers.has("Content-Type")){let a=t.detectContentTypeHeader();a!==null&&(n["Content-Type"]=a)}return{body:t.serializeBody(),method:t.method,headers:n,credentials:o}}concatChunks(t,n){let o=new Uint8Array(n),a=0;for(let i of t)o.set(i,a),a+=i.length;return o}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=g({token:e,factory:e.\u0275fac});let r=e;return r})(),ge=class{};function ve(){}function Pt(r){r.then(ve,ve)}function It(r,e){return e(r)}function St(r,e,s){return(t,n)=>Ce(s,()=>e(t,o=>r(o,n)))}var ot=new w(""),Lt=new w(""),kt=new w("",{providedIn:"root",factory:()=>!0});var nt=(()=>{let e=class e extends G{constructor(t,n){super(),this.backend=t,this.injector=n,this.chain=null,this.pendingTasks=E(xe),this.contributeToStability=E(kt)}handle(t){if(this.chain===null){let n=Array.from(new Set([...this.injector.get(ot),...this.injector.get(Lt,[])]));this.chain=n.reduceRight((o,a)=>St(o,a,this.injector),It)}if(this.contributeToStability){let n=this.pendingTasks.add();return this.chain(t,o=>this.backend.handle(o)).pipe(Ie(()=>this.pendingTasks.remove(n)))}else return this.chain(t,n=>this.backend.handle(n))}};e.\u0275fac=function(n){return new(n||e)(d(te),d(ke))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let r=e;return r})();var Ct=/^\)\]\}',?\n/;function xt(r){return"responseURL"in r&&r.responseURL?r.responseURL:/^X-Request-URL:/m.test(r.getAllResponseHeaders())?r.getResponseHeader("X-Request-URL"):null}var rt=(()=>{let e=class e{constructor(t){this.xhrFactory=t}handle(t){if(t.method==="JSONP")throw new A(-2800,!1);let n=this.xhrFactory;return(n.\u0275loadImpl?Oe(n.\u0275loadImpl()):ce(null)).pipe(Se(()=>new ae(a=>{let i=n.build();if(i.open(t.method,t.urlWithParams),t.withCredentials&&(i.withCredentials=!0),t.headers.forEach((h,f)=>i.setRequestHeader(h,f.join(","))),t.headers.has("Accept")||i.setRequestHeader("Accept","application/json, text/plain, */*"),!t.headers.has("Content-Type")){let h=t.detectContentTypeHeader();h!==null&&i.setRequestHeader("Content-Type",h)}if(t.responseType){let h=t.responseType.toLowerCase();i.responseType=h!=="json"?h:"text"}let l=t.serializeBody(),c=null,u=()=>{if(c!==null)return c;let h=i.statusText||"OK",f=new b(i.getAllResponseHeaders()),M=xt(i)||t.url;return c=new ne({headers:f,status:i.status,statusText:h,url:M}),c},p=()=>{let{headers:h,status:f,statusText:M,url:k}=u(),m=null;f!==Mt&&(m=typeof i.response>"u"?i.responseText:i.response),f===0&&(f=m?st:0);let F=f>=200&&f<300;if(t.responseType==="json"&&typeof m=="string"){let P=m;m=m.replace(Ct,"");try{m=m!==""?JSON.parse(m):null}catch(U){m=P,F&&(F=!1,m={error:U,text:m})}}F?(a.next(new J({body:m,headers:h,status:f,statusText:M,url:k||void 0})),a.complete()):a.error(new D({error:m,headers:h,status:f,statusText:M,url:k||void 0}))},y=h=>{let{url:f}=u(),M=new D({error:h,status:i.status||0,statusText:i.statusText||"Unknown Error",url:f||void 0});a.error(M)},R=!1,v=h=>{R||(a.next(u()),R=!0);let f={type:N.DownloadProgress,loaded:h.loaded};h.lengthComputable&&(f.total=h.total),t.responseType==="text"&&i.responseText&&(f.partialText=i.responseText),a.next(f)},j=h=>{let f={type:N.UploadProgress,loaded:h.loaded};h.lengthComputable&&(f.total=h.total),a.next(f)};return i.addEventListener("load",p),i.addEventListener("error",y),i.addEventListener("timeout",y),i.addEventListener("abort",y),t.reportProgress&&(i.addEventListener("progress",v),l!==null&&i.upload&&i.upload.addEventListener("progress",j)),i.send(l),a.next({type:N.Sent}),()=>{i.removeEventListener("error",y),i.removeEventListener("abort",y),i.removeEventListener("load",p),i.removeEventListener("timeout",y),t.reportProgress&&(i.removeEventListener("progress",v),l!==null&&i.upload&&i.upload.removeEventListener("progress",j)),i.readyState!==i.DONE&&i.abort()}})))}};e.\u0275fac=function(n){return new(n||e)(d(H))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let r=e;return r})(),it=new w(""),jt="XSRF-TOKEN",Ft=new w("",{providedIn:"root",factory:()=>jt}),Ut="X-XSRF-TOKEN",_t=new w("",{providedIn:"root",factory:()=>Ut}),re=class{},Bt=(()=>{let e=class e{constructor(t,n,o){this.doc=t,this.platform=n,this.cookieName=o,this.lastCookieString="",this.lastToken=null,this.parseCount=0}getToken(){if(this.platform==="server")return null;let t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=q(t,this.cookieName),this.lastCookieString=t),this.lastToken}};e.\u0275fac=function(n){return new(n||e)(d(T),d(S),d(Ft))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let r=e;return r})();function zt(r,e){let s=r.url.toLowerCase();if(!E(it)||r.method==="GET"||r.method==="HEAD"||s.startsWith("http://")||s.startsWith("https://"))return e(r);let t=E(re).getToken(),n=E(_t);return t!=null&&!r.headers.has(n)&&(r=r.clone({headers:r.headers.set(n,t)})),e(r)}function Pn(...r){let e=[At,rt,nt,{provide:G,useExisting:nt},{provide:te,useFactory:()=>E(Nt,{optional:!0})??E(rt)},{provide:ot,useValue:zt,multi:!0},{provide:it,useValue:!0},{provide:re,useClass:Bt}];for(let s of r)e.push(...s.\u0275providers);return le(e)}var we=class extends Ze{constructor(){super(...arguments),this.supportsDOMEvents=!0}},Re=class r extends we{static makeCurrent(){We(new r)}onAndCancel(e,s,t){return e.addEventListener(s,t),()=>{e.removeEventListener(s,t)}}dispatchEvent(e,s){e.dispatchEvent(s)}remove(e){e.remove()}createElement(e,s){return s=s||this.getDefaultDocument(),s.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,s){return s==="window"?window:s==="document"?e:s==="body"?e.body:null}getBaseHref(e){let s=$t();return s==null?null:Gt(s)}resetBaseElement(){K=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return q(document.cookie,e)}},K=null;function $t(){return K=K||document.querySelector("base"),K?K.getAttribute("href"):null}function Gt(r){return new URL(r,document.baseURI).pathname}var Xt=(()=>{let e=class e{build(){return new XMLHttpRequest}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=g({token:e,factory:e.\u0275fac});let r=e;return r})(),se=new w(""),dt=(()=>{let e=class e{constructor(t,n){this._zone=n,this._eventNameToPlugin=new Map,t.forEach(o=>{o.manager=this}),this._plugins=t.slice().reverse()}addEventListener(t,n,o){return this._findPluginFor(n).addEventListener(t,n,o)}getZone(){return this._zone}_findPluginFor(t){let n=this._eventNameToPlugin.get(t);if(n)return n;if(n=this._plugins.find(a=>a.supports(t)),!n)throw new A(5101,!1);return this._eventNameToPlugin.set(t,n),n}};e.\u0275fac=function(n){return new(n||e)(d(se),d(I))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let r=e;return r})(),W=class{constructor(e){this._doc=e}},Te="ng-app-id",ut=(()=>{let e=class e{constructor(t,n,o,a={}){this.doc=t,this.appId=n,this.nonce=o,this.platformId=a,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=Q(a),this.resetHostNodes()}addStyles(t){for(let n of t)this.changeUsageCount(n,1)===1&&this.onStyleAdded(n)}removeStyles(t){for(let n of t)this.changeUsageCount(n,-1)<=0&&this.onStyleRemoved(n)}ngOnDestroy(){let t=this.styleNodesInDOM;t&&(t.forEach(n=>n.remove()),t.clear());for(let n of this.getAllStyles())this.onStyleRemoved(n);this.resetHostNodes()}addHost(t){this.hostNodes.add(t);for(let n of this.getAllStyles())this.addStyleToHost(t,n)}removeHost(t){this.hostNodes.delete(t)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(t){for(let n of this.hostNodes)this.addStyleToHost(n,t)}onStyleRemoved(t){let n=this.styleRef;n.get(t)?.elements?.forEach(o=>o.remove()),n.delete(t)}collectServerRenderedStyles(){let t=this.doc.head?.querySelectorAll(`style[${Te}="${this.appId}"]`);if(t?.length){let n=new Map;return t.forEach(o=>{o.textContent!=null&&n.set(o.textContent,o)}),n}return null}changeUsageCount(t,n){let o=this.styleRef;if(o.has(t)){let a=o.get(t);return a.usage+=n,a.usage}return o.set(t,{usage:n,elements:[]}),n}getStyleElement(t,n){let o=this.styleNodesInDOM,a=o?.get(n);if(a?.parentNode===t)return o.delete(n),a.removeAttribute(Te),a;{let i=this.doc.createElement("style");return this.nonce&&i.setAttribute("nonce",this.nonce),i.textContent=n,this.platformIsServer&&i.setAttribute(Te,this.appId),t.appendChild(i),i}}addStyleToHost(t,n){let o=this.getStyleElement(t,n),a=this.styleRef,i=a.get(n)?.elements;i?i.push(o):a.set(n,{elements:[o],usage:1})}resetHostNodes(){let t=this.hostNodes;t.clear(),t.add(this.doc.head)}};e.\u0275fac=function(n){return new(n||e)(d(T),d(ue),d(he,8),d(S))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let r=e;return r})(),Ee={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Me=/%COMP%/g,ht="%COMP%",Jt=`_nghost-${ht}`,Kt=`_ngcontent-${ht}`,Wt=!0,Zt=new w("",{providedIn:"root",factory:()=>Wt});function Yt(r){return Kt.replace(Me,r)}function qt(r){return Jt.replace(Me,r)}function ft(r,e){return e.map(s=>s.replace(Me,r))}var at=(()=>{let e=class e{constructor(t,n,o,a,i,l,c,u=null){this.eventManager=t,this.sharedStylesHost=n,this.appId=o,this.removeStylesOnCompDestroy=a,this.doc=i,this.platformId=l,this.ngZone=c,this.nonce=u,this.rendererByCompId=new Map,this.platformIsServer=Q(l),this.defaultRenderer=new Z(t,i,c,this.platformIsServer)}createRenderer(t,n){if(!t||!n)return this.defaultRenderer;this.platformIsServer&&n.encapsulation===z.ShadowDom&&(n=De(_({},n),{encapsulation:z.Emulated}));let o=this.getOrCreateRenderer(t,n);return o instanceof oe?o.applyToHost(t):o instanceof Y&&o.applyStyles(),o}getOrCreateRenderer(t,n){let o=this.rendererByCompId,a=o.get(n.id);if(!a){let i=this.doc,l=this.ngZone,c=this.eventManager,u=this.sharedStylesHost,p=this.removeStylesOnCompDestroy,y=this.platformIsServer;switch(n.encapsulation){case z.Emulated:a=new oe(c,u,n,this.appId,p,i,l,y);break;case z.ShadowDom:return new be(c,u,t,n,i,l,this.nonce,y);default:a=new Y(c,u,n,p,i,l,y);break}o.set(n.id,a)}return a}ngOnDestroy(){this.rendererByCompId.clear()}};e.\u0275fac=function(n){return new(n||e)(d(dt),d(ut),d(ue),d(Zt),d(T),d(S),d(I),d(he))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let r=e;return r})(),Z=class{constructor(e,s,t,n){this.eventManager=e,this.doc=s,this.ngZone=t,this.platformIsServer=n,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(e,s){return s?this.doc.createElementNS(Ee[s]||s,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,s){(ct(e)?e.content:e).appendChild(s)}insertBefore(e,s,t){e&&(ct(e)?e.content:e).insertBefore(s,t)}removeChild(e,s){s.remove()}selectRootElement(e,s){let t=typeof e=="string"?this.doc.querySelector(e):e;if(!t)throw new A(-5104,!1);return s||(t.textContent=""),t}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,s,t,n){if(n){s=n+":"+s;let o=Ee[n];o?e.setAttributeNS(o,s,t):e.setAttribute(s,t)}else e.setAttribute(s,t)}removeAttribute(e,s,t){if(t){let n=Ee[t];n?e.removeAttributeNS(n,s):e.removeAttribute(`${t}:${s}`)}else e.removeAttribute(s)}addClass(e,s){e.classList.add(s)}removeClass(e,s){e.classList.remove(s)}setStyle(e,s,t,n){n&(V.DashCase|V.Important)?e.style.setProperty(s,t,n&V.Important?"important":""):e.style[s]=t}removeStyle(e,s,t){t&V.DashCase?e.style.removeProperty(s):e.style[s]=""}setProperty(e,s,t){e!=null&&(e[s]=t)}setValue(e,s){e.nodeValue=s}listen(e,s,t){if(typeof e=="string"&&(e=fe().getGlobalEventTarget(this.doc,e),!e))throw new Error(`Unsupported event target ${e} for event ${s}`);return this.eventManager.addEventListener(e,s,this.decoratePreventDefault(t))}decoratePreventDefault(e){return s=>{if(s==="__ngUnwrap__")return e;(this.platformIsServer?this.ngZone.runGuarded(()=>e(s)):e(s))===!1&&s.preventDefault()}}};function ct(r){return r.tagName==="TEMPLATE"&&r.content!==void 0}var be=class extends Z{constructor(e,s,t,n,o,a,i,l){super(e,o,a,l),this.sharedStylesHost=s,this.hostEl=t,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let c=ft(n.id,n.styles);for(let u of c){let p=document.createElement("style");i&&p.setAttribute("nonce",i),p.textContent=u,this.shadowRoot.appendChild(p)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,s){return super.appendChild(this.nodeOrShadowRoot(e),s)}insertBefore(e,s,t){return super.insertBefore(this.nodeOrShadowRoot(e),s,t)}removeChild(e,s){return super.removeChild(null,s)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},Y=class extends Z{constructor(e,s,t,n,o,a,i,l){super(e,o,a,i),this.sharedStylesHost=s,this.removeStylesOnCompDestroy=n,this.styles=l?ft(l,t.styles):t.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},oe=class extends Y{constructor(e,s,t,n,o,a,i,l){let c=n+"-"+t.id;super(e,s,t,o,a,i,l,c),this.contentAttr=Yt(c),this.hostAttr=qt(c)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,s){let t=super.createElement(e,s);return super.setAttribute(t,this.contentAttr,""),t}},Qt=(()=>{let e=class e extends W{constructor(t){super(t)}supports(t){return!0}addEventListener(t,n,o){return t.addEventListener(n,o,!1),()=>this.removeEventListener(t,n,o)}removeEventListener(t,n,o){return t.removeEventListener(n,o)}};e.\u0275fac=function(n){return new(n||e)(d(T))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let r=e;return r})(),Ht=(()=>{let e=class e extends W{constructor(t){super(t),this.delegate=E(Ke,{optional:!0})}supports(t){return this.delegate?this.delegate.supports(t):!1}addEventListener(t,n,o){return this.delegate.addEventListener(t,n,o)}removeEventListener(t,n,o){return this.delegate.removeEventListener(t,n,o)}};e.\u0275fac=function(n){return new(n||e)(d(T))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let r=e;return r})(),lt=["alt","control","meta","shift"],en={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},tn={alt:r=>r.altKey,control:r=>r.ctrlKey,meta:r=>r.metaKey,shift:r=>r.shiftKey},nn=(()=>{let e=class e extends W{constructor(t){super(t)}supports(t){return e.parseEventName(t)!=null}addEventListener(t,n,o){let a=e.parseEventName(n),i=e.eventCallback(a.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>fe().onAndCancel(t,a.domEventName,i))}static parseEventName(t){let n=t.toLowerCase().split("."),o=n.shift();if(n.length===0||!(o==="keydown"||o==="keyup"))return null;let a=e._normalizeKey(n.pop()),i="",l=n.indexOf("code");if(l>-1&&(n.splice(l,1),i="code."),lt.forEach(u=>{let p=n.indexOf(u);p>-1&&(n.splice(p,1),i+=u+".")}),i+=a,n.length!=0||a.length===0)return null;let c={};return c.domEventName=o,c.fullKey=i,c}static matchEventFullKeyCode(t,n){let o=en[t.key]||t.key,a="";return n.indexOf("code.")>-1&&(o=t.code,a="code."),o==null||!o?!1:(o=o.toLowerCase(),o===" "?o="space":o==="."&&(o="dot"),lt.forEach(i=>{if(i!==o){let l=tn[i];l(t)&&(a+=i+".")}}),a+=o,a===n)}static eventCallback(t,n,o){return a=>{e.matchEventFullKeyCode(a,t)&&o.runGuarded(()=>n(a))}}static _normalizeKey(t){return t==="esc"?"escape":t}};e.\u0275fac=function(n){return new(n||e)(d(T))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let r=e;return r})();function tr(r,e){return Je(_({rootComponent:r},rn(e)))}function rn(r){return{appProviders:[...ln,...r?.providers??[]],platformProviders:cn}}function sn(){Re.makeCurrent()}function on(){return new de}function an(){return je(document),document}var cn=[{provide:S,useValue:Ye},{provide:Fe,useValue:sn,multi:!0},{provide:T,useFactory:an,deps:[]}];var ln=[{provide:Le,useValue:"root"},{provide:de,useFactory:on,deps:[]},{provide:se,useClass:Qt,multi:!0,deps:[T,I,S]},{provide:se,useClass:nn,multi:!0,deps:[T]},{provide:se,useClass:Ht,multi:!0},at,ut,dt,{provide:Xe,useExisting:at},{provide:H,useClass:Xt,deps:[]},[]];var nr=(()=>{let e=class e{constructor(t){this._doc=t}getTitle(){return this._doc.title}setTitle(t){this._doc.title=t||""}};e.\u0275fac=function(n){return new(n||e)(d(T))},e.\u0275prov=g({token:e,factory:e.\u0275fac,providedIn:"root"});let r=e;return r})();var dn=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=g({token:e,factory:function(n){let o=null;return n?o=new(n||e):o=d(un),o},providedIn:"root"});let r=e;return r})(),un=(()=>{let e=class e extends dn{constructor(t){super(),this._doc=t}sanitize(t,n){if(n==null)return null;switch(t){case L.NONE:return n;case L.HTML:return x(n,"HTML")?C(n):Ge(this._doc,String(n)).toString();case L.STYLE:return x(n,"Style")?C(n):n;case L.SCRIPT:if(x(n,"Script"))return C(n);throw new A(5200,!1);case L.URL:return x(n,"URL")?C(n):$e(String(n));case L.RESOURCE_URL:if(x(n,"ResourceURL"))return C(n);throw new A(5201,!1);default:throw new A(5202,!1)}}bypassSecurityTrustHtml(t){return Ue(t)}bypassSecurityTrustStyle(t){return _e(t)}bypassSecurityTrustScript(t){return Be(t)}bypassSecurityTrustUrl(t){return ze(t)}bypassSecurityTrustResourceUrl(t){return Ve(t)}};e.\u0275fac=function(n){return new(n||e)(d(T))},e.\u0275prov=g({token:e,factory:e.\u0275fac,providedIn:"root"});let r=e;return r})();export{At as a,Pn as b,at as c,tr as d,nr as e,dn as f};
