(this.webpackJsonpcsepregisfrontend=this.webpackJsonpcsepregisfrontend||[]).push([[0],{23:function(e,t,n){e.exports=n(48)},28:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(20),c=n.n(l),u=(n(28),n(2)),o=n.n(u),i=n(7),s=n(4),m=n(50),p=function(e){var t=e.place,n=e.deletePlace;return r.a.createElement(m.a,{style:{width:"30px"}},r.a.createElement(m.a.Body,null,r.a.createElement(m.a.Title,null,t.name),r.a.createElement(m.a.Text,null,t.description),r.a.createElement(m.a.Text,null,t.location),r.a.createElement("button",{onClick:n(t.id,t.name)},"delete")))},d=function(e){var t=e.message;return null==t?null:r.a.createElement("div",{className:"error"},t)},f=function(){return r.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},r.a.createElement("br",null),r.a.createElement("em",null,"Csepregis Social app, be together no matter where we are"))},v=n(8),b=n.n(v),h="/api/places",g=null,E={getAll:function(){return b.a.get(h).then((function(e){return e.data}))},create:function(){var e=Object(i.a)(o.a.mark((function e(t){var n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:g}},e.next=3,b.a.post(h,t,n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(e,t){return b.a.put("".concat(h,"/").concat(e),t).then((function(e){return e.data}))},remove:function(){var e=Object(i.a)(o.a.mark((function e(t,n){var a,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),a={headers:{Authorization:g}},r=b.a.delete("".concat(h,"/").concat(t),a),e.abrupt("return",r.then((function(e){return e.data})));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),setToken:function(e){g="bearer ".concat(e)}},w={login:function(){var e=Object(i.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},O=function(e){var t=e.handleSubmit,n=e.handleUsernameChange,a=e.handlePasswordChange,l=e.username,c=e.password;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"username",r.a.createElement("input",{type:"text",value:l,name:"Username",onChange:n})),r.a.createElement("div",null,"password",r.a.createElement("input",{type:"password",value:c,name:"password",onChange:a})),r.a.createElement("button",{type:"submit"},"login")))},j=function(e){var t=e.onSubmit,n=e.logOut,a=e.handleNameChange,l=e.handleDescriptionChange,c=e.handleLocationChange,u=e.name,o=e.description,i=e.location;return r.a.createElement("div",null,r.a.createElement("button",{onClick:n},"Logout"),r.a.createElement("h2",null,"post a new Place"),r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,r.a.createElement("label",null,"Name",r.a.createElement("input",{value:u,onChange:a}))),r.a.createElement("div",null,r.a.createElement("label",null,"Description",r.a.createElement("input",{value:o,onChange:l}))),r.a.createElement("div",null,r.a.createElement("label",null,"Location",r.a.createElement("input",{value:i,onChange:c}))),r.a.createElement("button",{type:"submit"},"save")))},S=n(49),y=function(e){var t=Object(a.useState)(!1),n=Object(s.a)(t,2),l=n[0],c=n[1],u={display:l?"none":""},o={display:l?"":"none"},i=function(){c(!l)};return r.a.createElement("div",null,r.a.createElement("div",{style:u},r.a.createElement("button",{onClick:i},e.buttonLabel),r.a.createElement("button",{onClick:e.logOut},"Logout")),r.a.createElement("div",{style:o},e.children,r.a.createElement("button",{onClick:i},"cancel")))},C=function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],l=t[1],c=Object(a.useState)(""),u=Object(s.a)(c,2),m=u[0],v=u[1],b=Object(a.useState)(""),h=Object(s.a)(b,2),g=h[0],C=h[1],k=Object(a.useState)(""),x=Object(s.a)(k,2),L=x[0],P=x[1],D=Object(a.useState)(null),T=Object(s.a)(D,2),N=T[0],U=T[1],I=Object(a.useState)(""),A=Object(s.a)(I,2),J=A[0],z=A[1],B=Object(a.useState)(""),W=Object(s.a)(B,2),q=W[0],F=W[1],G=Object(a.useState)(null),H=Object(s.a)(G,2),K=H[0],M=H[1],Q=Object(a.useState)(!1),R=Object(s.a)(Q,2),V=R[0],X=R[1];Object(a.useEffect)((function(){E.getAll().then((function(e){return l(e)}))}),[]),Object(a.useEffect)((function(){var e=window.localStorage.getItem("loggedPlaceappUser");if(e){var t=JSON.parse(e);M(t),E.setToken(t.token)}}),[]);var Y=function(){var e=Object(i.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,w.login({username:J,password:q});case 4:n=e.sent,window.localStorage.setItem("loggedPlaceappUser",JSON.stringify(n)),E.setToken(n.token),M(n),z(""),F(""),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(1),U("Wrong Credentials"),setTimeout((function(){U(null)}),5e3);case 16:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}(),Z=function(e,t){return function(){window.confirm("Delete ".concat(t))&&E.remove(e,t).then((function(){l(n.filter((function(t){return t.id!==e})))}))}},$=function(){var e=Object(i.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.localStorage.removeItem("loggedPlaceappUser");case 2:M(null);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(e){v(e.target.value)},ee=function(e){C(e.target.value)},te=function(e){P(e.target.value)},ne=function(e){e.preventDefault();var t={name:m,description:g,location:L,date:(new Date).toISOString(),id:n.length+1};E.create(t).then((function(e){l(n.concat(e)),v(""),C(""),P("")}))};return r.a.createElement("div",null,r.a.createElement("h1",null,"Shared places"),r.a.createElement(d,{message:N}),null===K?function(){var e={display:V?"none":""},t={display:V?"":"none"};return r.a.createElement("div",null,r.a.createElement("div",{style:e},r.a.createElement("button",{onClick:function(){return X(!0)}},"log in")),r.a.createElement("div",{style:t},r.a.createElement(O,{handleSubmit:Y,handleUsernameChange:function(e){var t=e.target;return z(t.value)},handlePasswordChange:function(e){var t=e.target;return F(t.value)},username:J,password:q}),r.a.createElement("button",{onClick:function(){return X(!1)}},"cancel")))}():r.a.createElement("div",null,r.a.createElement("p",null,K.name," logged in"),r.a.createElement(y,{buttonLabel:"new place",logOut:$},r.a.createElement(j,{onSubmit:ne,handleNameChange:_,handleDescriptionChange:ee,handleLocationChange:te,name:m,description:g,location:L,logOut:$}))),r.a.createElement("div",null),r.a.createElement("h2",null,"Locations"),r.a.createElement(S.a,null,n.map((function(e){return r.a.createElement(p,{key:e.id,place:e,deletePlace:Z})}))),r.a.createElement(f,null))};n(47);c.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.f6e53505.chunk.js.map