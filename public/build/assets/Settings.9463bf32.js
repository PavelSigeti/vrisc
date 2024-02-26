import{_ as S,u as F,r as h,i as C,h as f,a as i,o as d,c as g,d as o,w as y,b as e,e as E,f as b,g as r,Q as u,U as M,F as B,m as V}from"./app.08e4a853.js";import{A as N,F as H,E as L,c as w,b as R,u as U}from"./logo.170de005.js";import{C as q}from"./vue-select.f1a525a5.js";import{A as D}from"./AppHeader.38a9a9cf.js";const P={name:"Settings",components:{AppHeader:D,AppLoader:N,vSelect:q,Field:H,ErrorMessage:L},setup(){const m=F(),n=m.getters["auth/user"],_=n,s=h(!1),k=h(n.nickname),p=h(),v=w({nickname:R().required("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0438\u043A\u043D\u0435\u0439\u043C").min(2,"\u041E\u0442 2-\u0445 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432").max(32,"\u0414\u043E 32-\u0445 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"),university_id:w().nullable()}),{values:x,handleSubmit:l}=U({validationSchema:v});C(async()=>{s.value=!0;try{const t=await f.get("/api/user-settings");n.email=t.data.email,n.university=t.data.university;const a=await f.get("/api/universities");p.value=a.data}catch(t){console.log(t.message)}s.value=!1});const c=l(async t=>{s.value=!0,t.university_id=t.university_id?t.university_id.code:null;try{await f.patch("/api/user/update",t),_.nickname=t.nickname,m.commit("auth/setUser",_)}catch(a){console.log(a.message)}s.value=!1});return{loading:s,user:n,nickname:k,universities:p,submit:c}}},Q={class:"container-fluid g-0"},T={class:"row"},j={class:"col-lg-6 col-xl-5 col-xxl-4"},z={class:"dashboard-item"},G=e("h3",null,"\u0414\u0430\u043D\u043D\u044B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",-1),I={class:"user-account__data"},J={class:"b500"},K={class:"b500"},O={class:"b500"},W={key:0},X={class:"b500"},Y={class:"form-control"},Z=e("label",{for:"nickname"},"\u041D\u0438\u043A\u043D\u0435\u0439\u043C \u0432 Virtual Regatta",-1),$={key:0,class:"form-control"},ee=e("label",{for:"university_id"},"\u0412\u0430\u0448 \u0443\u043D\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442",-1),se=e("button",{class:"btn btn-default btn-full-width"},"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",-1);function te(m,n,_,s,k,p){const v=i("AppHeader"),x=i("AppLoader"),l=i("Field"),c=i("ErrorMessage"),t=i("v-select");return d(),g(B,null,[o(v,null,{default:y(()=>[r("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430")]),_:1}),e("main",null,[e("div",Q,[e("div",T,[e("div",j,[e("div",z,[s.loading?(d(),E(x,{key:0})):b("",!0),G,e("div",I,[e("p",null,[r("\u0418\u043C\u044F: "),e("span",J,u(s.user.name),1)]),e("p",null,[r("\u0424\u0430\u043C\u0438\u043B\u0438\u044F: "),e("span",K,u(s.user.surname),1)]),e("p",null,[r("E-mail: "),e("span",O,u(s.user.email),1)]),s.user.university?(d(),g("p",W,[r("\u0423\u043D\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442: "),e("span",X,u(s.user.university),1)])):b("",!0)]),e("form",{onSubmit:n[1]||(n[1]=M((...a)=>s.submit&&s.submit(...a),["prevent"]))},[e("div",Y,[Z,o(l,{modelValue:s.nickname,"onUpdate:modelValue":n[0]||(n[0]=a=>s.nickname=a),name:"nickname"},{default:y(({field:a,errors:A})=>[e("input",V(a,{type:"text",class:["form-input",{invalid:!!A.length}],placeholder:"\u041D\u0438\u043A\u043D\u0435\u0439\u043C \u0432 Virtual Regatta"}),null,16)]),_:1},8,["modelValue"]),o(c,{class:"alert",name:"nickname"})]),s.user.university?b("",!0):(d(),g("div",$,[ee,o(l,{name:"university_id"},{default:y(({field:a})=>[o(t,V({options:s.universities,placeholder:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u043D\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442"},a),null,16,["options"]),o(c,{class:"alert",name:"university_id"})]),_:1})])),se],32)])])])])])],64)}const re=S(P,[["render",te]]);export{re as default};
