(this["webpackJsonpfrequency-counter"]=this["webpackJsonpfrequency-counter"]||[]).push([[0],{29:function(e,t,c){},30:function(e,t,c){},31:function(e,t,c){},33:function(e,t,c){"use strict";c.r(t);var n=c(7),r=c.n(n),o=c(21),u=c.n(o),a=(c(29),c(4)),s=c(22),i=(c(30),c(10)),d=c(23),l=c(24),j=c(8),b=c(9),f=c(35),m=function(){function e(t){Object(j.a)(this,e),this.records=void 0,this.records=t}return Object(b.a)(e,[{key:"get",get:function(){return this.records}},{key:"debounce",value:function(e){return this.records=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6e4;return e.reduce((function(e,c){var n,r=e[e.length-1];return c.timestamp-(null===r||void 0===r?void 0:r.timestamp)<t?(r.subRecords=(null!==(n=r.subRecords)&&void 0!==n?n:[]).concat(c),e):e.concat(Object(i.a)({},c))}),[])}(this.records,e),this}},{key:"groupByDate",value:function(){return this.records.reduce((function(e,t){var c=Object(f.a)(new Date(t.timestamp),"PP");return e[c]?e[c]=e[c].concat([t]):e[c]=[t],e}),{})}},{key:"compress",value:function(){return this.records=this.records.map((function(e,t){return Object(i.a)(Object(i.a)({},e),{},{id:"".concat(t)})})),this}}]),e}(),v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,c=r.a.useState(e),n=Object(a.a)(c,2),o=n[0],u=n[1],s=r.a.useState([]),j=Object(a.a)(s,2),b=j[0],f=j[1],v=function(){u((function(e){var c=e.concat([{id:Object(l.a)(),timestamp:Date.now(),count:1}]);return null===t||void 0===t||t(new m(c).compress().get),c}))},h=function(e,t){f((function(c){return(0===c.length?o:c).map((function(c){if(c.id===e){t.subRecords;var n=Object(d.a)(t,["subRecords"]);return Object(i.a)(Object(i.a)({},c),n)}return c}))}))},O=function(){f(o),f([])},p=function(){u(b),null===t||void 0===t||t(new m(b).compress().get),f([])};return{records:o,addRecord:v,setRecords:u,queue:b,queueUpdate:h,cancelQueue:O,submitQueue:p}},h=function(e){return btoa(JSON.stringify(e))},O=function(e){return JSON.parse(atob(e))},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"foo",t=r.a.useState(e),c=Object(a.a)(t,2),n=c[0],o=c[1],u=function(e){localStorage.setItem("fc-".concat(n,"-64"),h(e))},s=function(e){var t=localStorage.getItem("fc-".concat(n,"-64"));return t?O(t):e},i=function(e,t){return o(e),s(t)},d=localStorage.getItem("fc-lastSave");return d&&o(d),{save:u,load:s,switchNamespace:i}},g=(c(31),c(34)),x=c(2),N=function(e){var t=e.record,c=(e.mode,e.update,new Date(t.timestamp)),n=Object(f.a)(c,"p");return Object(x.jsx)("div",{className:"record-time",children:n})},R=function(e){var t,c=e.record,n=e.mode,r=e.update;return n?Object(x.jsx)("input",{value:null!==(t=c.note)&&void 0!==t?t:"",onChange:function(e){return r(Object(i.a)(Object(i.a)({},c),{},{note:e.target.value}))}}):Object(x.jsx)("div",{className:"record-note",children:c.note})},S=function(e){var t,c=e.record,n=e.mode,r=e.update;return Object(x.jsxs)("div",{className:"record-item-details",children:[Object(x.jsx)(N,{record:c,mode:n,update:r}),Object(x.jsx)("div",{className:"record-count",children:(null!==(t=c.subRecords)&&void 0!==t?t:[]).length+1}),Object(x.jsx)(R,{record:c,mode:n,update:r})]})},y=function(e){var t=e.records,c=e.mode,n=e.updateRecord,o=r.a.useRef(null);return r.a.useEffect((function(){var e;!c&&o.current&&(o.current.scrollTop=null===(e=o.current)||void 0===e?void 0:e.scrollHeight)})),Object(x.jsx)("div",{className:"record-list",ref:o,children:t.map((function(e){return Object(x.jsxs)("div",{className:"record-item",children:[Object(x.jsx)(S,{record:e,mode:c,update:function(t){return n(e.id,t)}}),c&&e.subRecords&&Object(x.jsx)("div",{className:"record-sub-items",children:e.subRecords.map((function(e){return Object(x.jsx)(S,{record:e,mode:c,update:function(t){return n(e.id,t)}},e.id)}))})]},e.id)}))})},w=function(e){var t=e.records,c=e.mode,n=e.updateRecord;return Object(x.jsx)("div",{className:"records",children:Object.keys(t).sort((function(e,t){return Object(g.a)(new Date(e),new Date(t))})).map((function(e){return Object(x.jsxs)("div",{className:"group",children:[Object(x.jsx)("div",{className:"group-title",children:e}),Object(x.jsx)(y,{mode:c,updateRecord:n,records:t[e]})]},e)}))})};var k=function(){var e=r.a.useState(!1),t=Object(a.a)(e,2),c=t[0],n=t[1],o=p(),u=o.save,i=o.load,d=v(i([]),u),l=d.records,j=d.addRecord,b=d.queue,f=d.queueUpdate,h=d.cancelQueue,O=d.submitQueue,g=c&&b.length>0?b:l,N=new m(g).debounce().groupByDate(),R=r.a.useRef(null);return Object(s.useGesture)({onPinch:function(){n(!0)},onWheel:function(e){false}},{target:R}),Object(x.jsxs)("div",{className:"App",onClick:function(){!c&&j()},ref:R,children:[Object(x.jsx)("h1",{children:"Frequency"}),Object(x.jsx)("div",{className:"container",children:Object(x.jsx)(w,{records:N,mode:c,updateRecord:f})}),c&&Object(x.jsxs)("div",{className:"mode-tools",children:[Object(x.jsx)("button",{className:"cancel",onClick:function(){h(),n(!1)},children:"Cancel"}),Object(x.jsx)("button",{className:"done",disabled:0===b.length,onClick:function(){O(),n(!1)},children:"Save"})]})]})},C=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,36)).then((function(t){var c=t.getCLS,n=t.getFID,r=t.getFCP,o=t.getLCP,u=t.getTTFB;c(e),n(e),r(e),o(e),u(e)}))};u.a.render(Object(x.jsx)(r.a.StrictMode,{children:Object(x.jsx)(k,{})}),document.getElementById("root")),C()}},[[33,1,2]]]);
//# sourceMappingURL=main.7283852c.chunk.js.map