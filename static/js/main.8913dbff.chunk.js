(this.webpackJsonprik=this.webpackJsonprik||[]).push([[0],{33:function(e,a){},40:function(e,a,t){e.exports=t(78)},45:function(e,a,t){},53:function(e,a){},59:function(e,a){},64:function(e,a,t){},78:function(e,a,t){"use strict";t.r(a);var l=t(38),n=(t(41),t(42),t(43),t(44),t(45),t(32));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=t(13),r=t(8),o=(t(64),t(0)),s=t.n(o),i=t(34),m=function(){return s.a.createElement(i.Panel,{header:"RIK - Robs Immo Kalkulation",style:{backgroundColor:"#007bff"}})},d=t(35),p=t(22),f=t(4),u=t(36),h=t.n(u),b=t(37),g=function(e){var a=e.name,t=void 0===a?"":a,l=e.id,n=void 0===l?"":l,c=e.value,r=void 0===c?0:c,o=e.changed,i=void 0===o?null:o,m=e.suffix,d=void 0===m?"\u20ac":m;e.disabled;return s.a.createElement(b.a,{className:"p-inputtext p-component p-inputnumber-input p-filled",name:t,id:n,value:r,thousandSeparator:!0,suffix:d,disabled:null==i,onValueChange:function(e){var a=e.floatValue;i&&i(a)}})},v=function(e){return e.toFixed(Math.max(0,2))},E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return v(e/a)},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,l=parseFloat(e);return a>0&&(l+=l*(a/100)),t>0&&(l+=l*(t/100)),v(l)},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return parseFloat(e*a/100/12)},F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return parseFloat(e*a/100/12)},k=Object(c.c)((function(e){var a=e.intl,t=Object(f.d)(),l=Object(o.useState)(0),n=Object(r.a)(l,2),c=n[0],i=n[1],u=Object(o.useState)(0),b=Object(r.a)(u,2),k=b[0],O=b[1],j=Object(o.useState)(6.5),x=Object(r.a)(j,2),M=x[0],w=x[1],S=Object(o.useState)(1.2),K=Object(r.a)(S,2),C=K[0],I=K[1],P=Object(o.useState)(2),B=Object(r.a)(P,2),R=B[0],V=B[1],W=Object(o.useState)(0),G=Object(r.a)(W,2),H=G[0],J=G[1],T=Object(o.useState)(0),Z=Object(r.a)(T,2),z=Z[0],A=Z[1],D=Object(o.useState)(0),L=Object(r.a)(D,2),Q=L[0],U=L[1],$=Object(o.useState)(0),_=Object(r.a)($,2),q=_[0],X=_[1];Object(o.useEffect)((function(){if(t){var e=h.a.parse(t.search,{ignoreQueryPrefix:!0});e&&e.hasOwnProperty("is")&&console.log((a=e.is,"parsed ".concat(a,"!")))}var a}),[t]);var Y=function(e){return a.formatNumber(e,{style:"currency",currency:"EUR"})};return s.a.createElement(s.a.Fragment,null,s.a.createElement(m,null),s.a.createElement("form",{noValidate:!0,autoComplete:"off",className:"p-m-4",onSubmit:function(e){return e.preventDefault()}},s.a.createElement("div",{className:"p-fluid p-formgrid p-grid"},s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"fprice"},"Kaufpreis"),s.a.createElement(g,{id:"fprice",value:c,changed:i,name:"fprice"}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"fprovision"},"Maklerprovision"),s.a.createElement(g,{id:"fprovision",name:"fprovision",value:k,changed:O,suffix:"%"}),s.a.createElement("small",{id:"fprovision-help",className:"p-d-block"},function(){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=parseFloat(0);return a>0&&(t=e*(a/100)),v(t)}(c,k);return Y(e)}())),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"fbuyingcosts"},"Kaufnebenkosten"),s.a.createElement(g,{id:"fbuyingcosts",name:"fbuyingcosts",value:M,changed:w,suffix:"%"}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},function(){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=parseFloat(0);return a>0&&(t=e*(a/100)),v(t)}(c,M);return Y(e)}())),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"finterest"},"Zins p.a."),s.a.createElement(g,{id:"finterest",name:"finterest",value:C,changed:I,suffix:"%"}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"frepayment"},"Tilgung p.a."),s.a.createElement(g,{id:"frepayment",name:"frepayment",value:R,changed:V,suffix:"%"}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"fcondoFee"},"Hausgeld"),s.a.createElement(g,{id:"fcondoFee",name:"fcondoFee",value:H,changed:J}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"frentIndex"},"Mietspiegel \u20ac/m\xb2"),s.a.createElement(g,{id:"frentIndex",name:"frentIndex",value:z,changed:function(e){A(e),q>0&&U(q*e)}}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"frent"},"Mieteinnahmen / Monat"),s.a.createElement(g,{id:"frent",name:"frent",value:Q,changed:function(e){U(e),q>0&&A(e/q)}}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"flivingSpace"},"Wohnfl\xe4che"),s.a.createElement(g,{id:"flivingSpace",name:"flivingSpace",value:q,changed:function(e){X(e),Q>0?A(Q/e):z>0&&U(e*z)},suffix:"m\xb2"}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"ftotalamount"},"Gesamtsumme"),s.a.createElement(g,{id:"ftotalamount",name:"ftotalamount",value:N(c,k,M),changed:null}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0"))),s.a.createElement(d.Fieldset,{legend:"Ergebnis"},s.a.createElement("div",{className:"p-fluid p-formgrid p-grid"},s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"fpriceperspace"},"\u20ac / m\xb2"),s.a.createElement(g,{id:"fpriceperspace",name:"fpriceperspace",value:E(c,q),changed:null}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"finterestPerMonth"},"Zinsen / Monat"),s.a.createElement(g,{id:"finterestPerMonth",name:"finterestPerMonth",value:y(N(c,k,M),C),changed:null}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"frepaymentPerMonth"},"Tilgung / Monat"),s.a.createElement(g,{id:"frepaymentPerMonth",name:"frepaymentPerMonth",value:F(N(c,k,M),R),changed:null}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"fmonthlyCosts"},"Kosten / Monat"),s.a.createElement(g,{id:"fmonthlyCosts",name:"fmonthlyCosts",value:F(N(c,k,M),R)+y(N(c,k,M),C)+H,changed:null}),s.a.createElement("small",{id:"fmonthlyCosts-help",className:"p-d-block"},"Ohne NK: ".concat(Y(y(N(c,k,0),C)+F(N(c,k,0),R)+H)),s.a.createElement("br",null),"Ohne Hausgeld: ".concat(Y(y(N(c,k,0),C)+F(N(c,k,0),R))))),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"fmonthlyCostsInvest"},"Kosten / Monat (Anlage)"),s.a.createElement(g,{id:"fmonthlyCostsInvest",name:"fmonthlyCostsInvest",value:z&&z>0?F(N(c,k,M),R)+y(N(c,k,M),C)+H-z*q:F(N(c,k,M),R)+y(N(c,k,M),C)+H-Q,changed:null}),s.a.createElement("small",{id:"fmonthlyCostsInvest-help",className:"p-d-block"},"".concat((12*Q*100/parseFloat(c)).toFixed(2)," % - "),parseFloat(z&&z>0?F(N(c,k,M),R)+y(N(c,k,M),C)+H-z*q:F(N(c,k,M),R)+y(N(c,k,M),C)+H-Q)>0?s.a.createElement("span",{className:"text-red"},"Verlust"):parseFloat(z&&z>0?F(N(c,k,M),R)+y(N(c,k,M),C)+H-z*q:F(N(c,k,M),R)+y(N(c,k,M),C)+H-Q)<0?s.a.createElement("span",{className:"text-green"},"Gewinn"):s.a.createElement("span",null)))),s.a.createElement("span",{className:"p-buttonset"},s.a.createElement(p.Button,{label:"Miete vorschlagen",icon:"pi pi-dollar",onClick:function(){var e=6*parseFloat(c)/100/12;H>0&&(e+=H),U(Math.round(e)),A(q?Math.round(e/q):0)}}),s.a.createElement("a",{href:"https://www.sparkasse.de/service/rechner/nebenkostenrechner.html"},s.a.createElement(p.Button,{label:"SPK NK Rechner"}))),s.a.createElement("a",{className:"bmcButton",target:"_blank",href:"https://www.buymeacoffee.com/Robs"},s.a.createElement("img",{className:"bmcButtonImg",src:"https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg",alt:"Kauf mir einen Kaffee"}),s.a.createElement("span",{style:{marginLeft:15,fontSize:19}},"Kauf mir einen Kaffee")))))})),O=t(9),j=t.n(O),x=t(21);Object(c.b)(Object(l.a)(n)),j.a.render(s.a.createElement(x.a,null,s.a.createElement(c.a,{locale:"de"},s.a.createElement(k,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[40,1,2]]]);
//# sourceMappingURL=main.8913dbff.chunk.js.map