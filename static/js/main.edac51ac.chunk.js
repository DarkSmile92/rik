(this.webpackJsonprik=this.webpackJsonprik||[]).push([[0],{22:function(e,a){},28:function(e,a,t){e.exports=t(65)},33:function(e,a,t){},41:function(e,a){},47:function(e,a){},53:function(e,a,t){},65:function(e,a,t){"use strict";t.r(a);var l=t(26),n=(t(29),t(30),t(31),t(32),t(33),t(21));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var r=t(9),c=t(2),o=(t(53),t(0)),s=t.n(o),i=t(24),m=function(){return s.a.createElement(i.Panel,{header:"RIK - Robs Immo Kalkulation",style:{backgroundColor:"#007bff"}})},p=(t(59),t(3)),u=t(25),d=t(15),f=Object(r.c)((function(e){var a=e.intl,t=Object(o.useState)(""),l=Object(c.a)(t,2),n=l[0],r=l[1],i=Object(o.useState)(0),f=Object(c.a)(i,2),b=f[0],E=f[1],F=Object(o.useState)(6.5),g=Object(c.a)(F,2),v=g[0],N=(g[1],Object(o.useState)(1.8)),h=Object(c.a)(N,2),y=h[0],O=h[1],j=Object(o.useState)(2),k=Object(c.a)(j,2),D=k[0],S=k[1],I=Object(o.useState)(0),M=Object(c.a)(I,2),C=M[0],R=M[1],w=Object(o.useState)(0),x=Object(c.a)(w,2),K=x[0],U=x[1],V=Object(o.useState)(0),B=Object(c.a)(V,2),P=B[0],W=B[1],G=Object(o.useState)(0),J=Object(c.a)(G,2),T=J[0],Z=J[1],z=Object(o.useState)(""),A=Object(c.a)(z,2),H=A[0],L=A[1],$=Object(o.useState)(0),_=Object(c.a)($,2),q=_[0],Q=_[1],X=Object(o.useState)(0),Y=Object(c.a)(X,2),ee=Y[0],ae=Y[1],te=Object(o.useState)(0),le=Object(c.a)(te,2),ne=le[0],re=le[1],ce=Object(o.useState)(0),oe=Object(c.a)(ce,2),se=oe[0],ie=oe[1],me=Object(o.useState)(0),pe=Object(c.a)(me,2),ue=pe[0],de=pe[1],fe=Object(o.useState)(0),be=Object(c.a)(fe,2),Ee=be[0],Fe=be[1],ge=function(e,a,t,l,n,r,c,o,s){if(!isNaN(e)&&e&&0!==e){var i=e*((isNaN(a)?0:a)/100),m=e+i+e*((isNaN(t)?0:t)/100),p=m*n/100,u=m*r/100,d=p/12+u/12+(isNaN(c)?0:c),f=0;f=(isNaN(o)||0===o)&&!isNaN(s)&&s>0&&!isNaN(l)&&l>0?d-s*l:d-(isNaN(o)?0:o),L(m.toString()),l&&!isNaN(l)&&Q(((e+i)/l).toFixed(2).toString()),ae((p/12).toFixed(2).toString()),re((u/12).toFixed(2).toString()),ie(d.toFixed(2).toString()),de((e+i)*n/100/12+(e+i)*r/100/12+(isNaN(c)?0:c)),Fe(f.toFixed(2).toString())}},ve=function(e){return a.formatNumber(e,{style:"currency",currency:"EUR"})};return s.a.createElement(s.a.Fragment,null,s.a.createElement(m,null),s.a.createElement("form",{noValidate:!0,autoComplete:"off",className:"p-m-4",onSubmit:function(e){return e.preventDefault()}},s.a.createElement("div",{className:"p-fluid p-formgrid p-grid"},s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"fprice"},"Kaufpreis"),s.a.createElement(p.InputNumber,{id:"fprice",value:n,onValueChange:function(e){var a=parseFloat(e.value)||0;r(a),ge(parseFloat(a),b,v,T,y,D,parseFloat(C),parseFloat(P),parseFloat(K))},mode:"currency",currency:"EUR",locale:"de-DE",minFractionDigits:2}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"fprovision"},"Maklerprovision"),s.a.createElement(p.InputNumber,{id:"fprovision",value:b,onValueChange:function(e){E(e.value),e.value&&parseFloat(e.value)&&ge(parseFloat(n),parseFloat(e.value),v,T,y,D,parseFloat(C),parseFloat(P),parseFloat(K))},mode:"currency",currency:"EUR",locale:"de-DE",minFractionDigits:2}),s.a.createElement("small",{id:"fprovision-help",className:"p-d-block"},function(){if(n&&""!==n&&b){var e=parseFloat(n);return ve(e*(b/100))}return"0,00\u20ac"}())),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"fbuyingcosts"},"Kaufnebenkosten"),s.a.createElement(p.InputNumber,{id:"fbuyingcosts",value:v,onValueChange:function(e){E(e.value),e.value&&parseFloat(e.value)&&ge(parseFloat(n),b,parseFloat(e.value),T,y,D,parseFloat(C),parseFloat(P),parseFloat(K))},mode:"currency",currency:"EUR",locale:"de-DE",minFractionDigits:2}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},function(){if(n&&""!==n&&v){var e=parseFloat(n);return ve(e*(v/100))}return"0,00\u20ac"}())),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"finterest"},"Zins p.a."),s.a.createElement(p.InputNumber,{id:"finterest",value:y,prefix:"%",onValueChange:function(e){if(O(e.value),e.value&&parseFloat(e.value)){var a=parseFloat(e.value);ge(parseFloat(n),b,v,T,a,D,parseFloat(C),parseFloat(P),parseFloat(K))}},locale:"de-DE",minFractionDigits:2}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"frepayment"},"Tilgung p.a."),s.a.createElement(p.InputNumber,{id:"frepayment",value:D,prefix:"%",onValueChange:function(e){S(parseFloat(e.value)),ge(parseFloat(n),b,v,T,y,parseFloat(e.value),parseFloat(C),parseFloat(P),parseFloat(K))},locale:"de-DE",minFractionDigits:2}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"fcondoFee"},"Hausgeld"),s.a.createElement(p.InputNumber,{id:"fcondoFee",value:C,onValueChange:function(e){R(parseFloat(e.value)),ge(parseFloat(n),b,v,T,y,D,parseFloat(e.value),parseFloat(P),parseFloat(K))},mode:"currency",currency:"EUR",locale:"de-DE",minFractionDigits:2}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"frentIndex"},"Mietspiegel \u20ac/m\xb2"),s.a.createElement(p.InputNumber,{id:"frentIndex",value:K,onValueChange:function(e){if(U(parseFloat(e.value)),T){var a=Math.round(parseFloat(e.value)*T);W(a.toString()),ge(parseFloat(n),b,v,T,y,D,parseFloat(C),a,parseFloat(e.value))}else ge(parseFloat(n),b,v,T,y,D,parseFloat(C),parseFloat(P),parseFloat(e.value))},mode:"currency",currency:"EUR",locale:"de-DE",minFractionDigits:2}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"frent"},"Mieteinnahmen / Monat"),s.a.createElement(p.InputNumber,{id:"frent",value:P,onValueChange:function(e){W(e.value),T&&U(Math.round(parseFloat(e.value)/T).toString()),ge(parseFloat(n),b,v,T,y,D,parseFloat(C),parseFloat(e.value),parseFloat(K))},mode:"currency",currency:"EUR",locale:"de-DE",minFractionDigits:2}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"flivingSpace"},"Wohnfl\xe4che"),s.a.createElement(p.InputNumber,{id:"flivingSpace",value:T,onValueChange:function(e){Z(parseFloat(e.value)),ge(parseFloat(n),b,v,parseFloat(e.value),y,D,parseFloat(C),parseFloat(P),parseFloat(K))},suffix:" m\xb2"}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"ftotalamount"},"Gesamtsumme"),s.a.createElement(p.InputNumber,{id:"ftotalamount",value:H,disabled:!0,mode:"currency",currency:"EUR",locale:"de-DE",minFractionDigits:2}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0"))),s.a.createElement(u.Fieldset,{legend:"Ergebnis"},s.a.createElement("div",{className:"p-fluid p-formgrid p-grid"},s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"fpriceperspace"},"\u20ac / m\xb2"),s.a.createElement(p.InputNumber,{id:"fpriceperspace",value:q,disabled:!0,mode:"currency",currency:"EUR",locale:"de-DE",minFractionDigits:2}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"finterestPerMonth"},"Zinsen / Monat"),s.a.createElement(p.InputNumber,{id:"finterestPerMonth",value:ee,disabled:!0,mode:"currency",currency:"EUR",locale:"de-DE",minFractionDigits:2}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"frepaymentPerMonth"},"Tilgung / Monat"),s.a.createElement(p.InputNumber,{id:"frepaymentPerMonth",value:ne,disabled:!0,mode:"currency",currency:"EUR",locale:"de-DE",minFractionDigits:2}),s.a.createElement("small",{id:"fbuyingcosts-help",className:"p-d-block"},"\xa0")),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"fmonthlyCosts"},"Kosten / Monat"),s.a.createElement(p.InputNumber,{id:"fmonthlyCosts",value:se,disabled:!0,mode:"currency",currency:"EUR",locale:"de-DE",minFractionDigits:2}),s.a.createElement("small",{id:"fmonthlyCosts-help",className:"p-d-block"},"Ohne NK: ".concat(ve(ue)))),s.a.createElement("div",{className:"p-field p-col-12 p-md-3 p-grid"},s.a.createElement("label",{htmlFor:"fmonthlyCostsInvest"},"Kosten / Monat (Anlage)"),s.a.createElement(p.InputNumber,{id:"fmonthlyCostsInvest",value:Ee,disabled:!0,mode:"currency",currency:"EUR",locale:"de-DE",minFractionDigits:2}),s.a.createElement("small",{id:"fmonthlyCostsInvest-help",className:"p-d-block"},"".concat(function(){if(se&&!isNaN(se)){var e=parseFloat(se)||0,a=parseFloat(100*P/e);return a>0?Math.round(a-100):0}}()," % - "),parseFloat(Ee)>0?s.a.createElement("span",{className:"text-red"},"Verlust"):parseFloat(Ee)<0?s.a.createElement("span",{className:"text-green"},"Gewinn"):s.a.createElement("span",null)))),s.a.createElement("span",{className:"p-buttonset"},s.a.createElement(d.Button,{label:"Miete vorschlagen",icon:"pi pi-dollar",onClick:function(){return function(){if(se&&!isNaN(se)){var e=parseFloat(se)||0,a=parseFloat(e+.06*e);W(Math.round(a)),U(T?Math.round(Math.round(a)/T):0),ge(parseFloat(n),b,v,T,y,D,parseFloat(C),a,T?a/T:0)}}()}}),s.a.createElement("a",{href:"https://www.sparkasse.de/service/rechner/nebenkostenrechner.html"},s.a.createElement(d.Button,{label:"SPK NK Rechner"}))),s.a.createElement("a",{className:"bmcButton",target:"_blank",href:"https://www.buymeacoffee.com/Robs"},s.a.createElement("img",{className:"bmcButtonImg",src:"https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg",alt:"Kauf mir einen Kaffee"}),s.a.createElement("span",{style:{marginLeft:15,fontSize:19}},"Kauf mir einen Kaffee")))))})),b=t(4),E=t.n(b);Object(r.b)(Object(l.a)(n)),E.a.render(s.a.createElement(r.a,{locale:"de"},s.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[28,1,2]]]);
//# sourceMappingURL=main.edac51ac.chunk.js.map