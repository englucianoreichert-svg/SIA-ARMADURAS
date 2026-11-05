const MODULES = [
{id:"splice",n:"01",name:"Emendas por traspasse",desc:"Comprimento calculado automaticamente a partir do fck, bitola e aço. Apresenta boa e má aderência e os cenários normativos de percentual emendado.",fields:[["fck","fck do concreto (MPa)",30,"fck"],["phi","Ø BARRA =",10,"bitola"],["steel","Tipo de aço", "CA-50","steel"]]},
{id:"anchor",n:"02",name:"Ancoragem com gancho",desc:"Seleciona fck, bitola e aço nos mesmos padrões do Módulo 01. Calcula automaticamente os comprimentos de ancoragem de referência para boa e má aderência; os dados do gancho definem sua geometria.",fields:[["fck","fck do concreto (MPa)",30,"fck"],["phi","Ø BARRA =",10,"bitola"],["steel","Tipo de aço","CA-50","steel"],["pin","Diâmetro interno do pino (mm)",40,"number"],["angle","Ângulo do gancho (graus)",180,"select",[90,135,180]],["straight","Prolongamento reto do gancho (número de bitolas)",2,"number"]]},
{id:"bend",n:"03",name:"Dobras de armaduras",desc:"Geometria de dobra pelo eixo da barra, com raio interno e diâmetro de pino informados.",fields:[["phi","Ø BARRA =",8,"bitola"],["pin","Diâmetro interno do pino (mm)",40,"number"],["angle","Ângulo da dobra (graus)",180,"select",[45,90,135,180]],["straight","Trecho reto após a dobra (cm)",1.6,"number"]]},
{id:"straight",n:"04",name:"Distribuição reta",desc:"Calcula número de barras com espaçamento máximo e distribuição uniforme entre as extremidades.",fields:[["length","Comprimento da forma (cm)",1350,"number"],["coverL","Cobrimento/afastamento esquerdo (cm)",0,"number"],["coverR","Cobrimento/afastamento direito (cm)",0,"number"],["spacing","Espaçamento máximo (cm)",50,"number"]]},
{id:"circular",n:"05",name:"Distribuição circular",desc:"Distribui barras igualmente em 360°. O raio deve ser medido na linha dos eixos das barras.",fields:[["radius","Raio da distribuição (cm)",622.75,"number"],["spacing","Espaçamento máximo no arco (cm)",30,"number"],["start","Ângulo inicial (graus)",0,"number"]]},
{id:"helix",n:"06",name:"Espiral de estaca",desc:"Comprimento geométrico da hélice, sem pontas, ganchos, emendas ou perdas de corte.",fields:[["diameter","Diâmetro da linha de centro da espiral (cm)",15,"number"],["height","Altura da espiral (cm)",40,"number"],["pitch","Passo (cm)",5,"number"],["phi","Ø BARRA =",8,"bitola"],["tail","Adicional para pontas/fechamento (cm)",0,"number"]]},
{id:"mesh",n:"07",name:"Telas soldadas",desc:"Quantitativo por área e massa nominal. Cadastre diâmetros e espaçamentos do fabricante para cada tela.",fields:[["designation","Designação da tela","Q-785","text"],["area","Área aplicada (m²)",11.52,"number"],["mass","Massa nominal (kg/m²)",12.46,"number"],["wireL","Fio longitudinal (mm)",10,"number"],["spaceL","Espaçamento longitudinal (cm)",10,"number"],["wireT","Fio transversal (mm)",10,"number"],["spaceT","Espaçamento transversal (cm)",10,"number"],["overlap","Acréscimo de sobreposição/perdas (%)",0,"number"]]},
{id:"beam",n:"08",name:"Distribuição em vigas",desc:"Verificação preliminar de acomodação em camadas. Informe barras, largura interna disponível e espaçamentos mínimos calculados.",fields:[["width","Largura interna disponível (cm)",18,"number"],["aggregate","Dimensão máxima do agregado (mm)",19,"number"],["stirrup","Diâmetro do estribo (mm)",8,"number"],["cover","Cobrimento lateral (cm)",5,"number"],["bars","Quantidade de barras longitudinais",5,"number"],["phi","Ø BARRA =",12.5,"bitola"],["hspace","Espaçamento livre horizontal mínimo (cm)",2.28,"number"],["vspace","Espaçamento livre vertical mínimo (cm)",2,"number"],["layers","Número máximo de camadas",3,"number"]]},
{id:"convert",n:"09",name:"Conversão de bitolas",desc:"Calcula quantidade inteira de barras para manter área geométrica igual ou superior. A equivalência de área não autoriza substituição sem aprovação do projetista.",fields:[["oldPhi","Ø BARRA ORIGINAL =",12.5,"bitola"],["oldQty","Quantidade original",5,"number"],["newPhi","Ø BARRA SUBSTITUTA =",10,"bitola"]]}
];
const $=s=>document.querySelector(s), nav=$("#moduleNav"), cards=$("#moduleCards");
let current=null, lastResult=null;
const fmt=(n,d=2)=>Number(n).toLocaleString("pt-BR",{minimumFractionDigits:d,maximumFractionDigits:d});
const num=(v)=>Number(v);
function fieldHTML(f){
 let [id,label,value,type,opts]=f;
 const isMm=label.includes("(mm)") || type==="bitola";
 const displayLabel=type==="bitola"?label:label.replace(/\\s*\\(mm\\)/i,"");
 let control="";
 if(type==="select") control=`<select id="${id}">${opts.map(x=>`<option value="${x}" ${x===value?"selected":""}>${x}°</option>`).join("")}</select>`;
 else if(type==="bitola") control=`<select id="${id}">${[5,6.3,8,10,12.5,16,20,25,32,40].map(x=>`<option value="${x}" ${Number(x)===Number(value)?"selected":""}>${String(x).replace(".",",")}</option>`).join("")}</select>`;
 else if(type==="fck") control=`<select id="${id}">${[20,25,30,35,40,45,50].map(x=>`<option value="${x}" ${x===value?"selected":""}>${x} MPa</option>`).join("")}</select>`;
 else if(type==="steel") control=`<select id="${id}"><option value="CA-50" ${value==="CA-50"?"selected":""}>CA-50</option><option value="CA-60" ${value==="CA-60"?"selected":""}>CA-60</option></select>`;
 else control=`<input id="${id}" type="${type}" value="${value}" ${type==="number"?'step="any"':''}>`;
 const unit=isMm?'<span>mm</span>':"";
 return `<div class="field ${label.length>35?"full":""}"><label for="${id}">${displayLabel}</label>${isMm?`<div class="input-unit">${control}${unit}</div>`:control}</div>`
}
function values(){let o={};current.fields.forEach(f=>o[f[0]]=$( "#"+f[0]).value);return o}
function showModule(id){current=MODULES.find(m=>m.id===id);$("#welcome").classList.add("hidden");$("#workspace").classList.remove("hidden");$("#moduleNumber").textContent="MÓDULO "+current.n;$("#moduleTitle").textContent=current.name;$("#moduleDescription").textContent=current.desc;$("#calcForm").innerHTML=`<div class="field-grid">${current.fields.map(fieldHTML).join("")}</div>`;$("#results").innerHTML='<div class="empty">Preencha os dados e selecione Calcular.</div>';$("#diagram").innerHTML="";lastResult=null;renderHistory();document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("active",b.dataset.id===id));}
MODULES.forEach(m=>{let b=document.createElement("button");b.dataset.id=m.id;b.innerHTML=`<span class="nav-num">${m.n}</span>${m.name}`;b.onclick=()=>showModule(m.id);nav.append(b);let c=document.createElement("button");c.className="module-card";c.innerHTML=`<span class="num">MÓDULO ${m.n}</span><b>${m.name}</b><small>${m.desc}</small>`;c.onclick=()=>showModule(m.id);cards.append(c)});
function metric(k,v){return `<div class="metric"><span>${k}</span><strong>${v}</strong></div>`}
function calculate(){
 let v=values(), out=[], notes=[], status="ok", diagram="";
 const positive=(...keys)=>keys.every(k=>Number(v[k])>0);
 const phi=()=>num(v.phi);
 switch(current.id){
 case "splice":{
  const fck=num(v.fck), d=num(v.phi), fyk=v.steel==="CA-60"?600:500, gammaS=1.15, gammaC=1.4;
  if(!(fck>=20&&fck<=50)||!d||!["CA-50","CA-60"].includes(v.steel))throw Error("Selecione fck entre 20 e 50 MPa, bitola e tipo de aço.");
  if(d>32){status="bad";out=[["Bitola selecionada",String(d).replace(".",",")+" mm"],["Emenda por traspasse","NÃO PERMITIDA"]];notes.push("A NBR 6118 não permite emenda por traspasse de barras com diâmetro superior a 32 mm. Avaliar luva, solda ou solução específica de projeto.");break}
  const fctkinf=0.21*Math.pow(fck,2/3), fctd=fctkinf/gammaC;
  const eta1=2.25, eta3=d<=32?1:(132-d)/100, fyd=fyk/gammaS;
  const calc=(eta2)=>{
    const fbd=eta1*eta2*eta3*fctd;
    const lb=(d/4)*(fyd/fbd);
    const lbnec=Math.max(lb,0.3*lb,10*d,100);
    return {fbd,lb,lbnec};
  };
  const good=calc(1.0), poor=calc(0.7);
  const pctCases=[["Até 20%",1.2],["25%",1.4],["33%",1.6],["50%",1.8],["> 50%",2.0]];
  const rows=(obj,label)=>pctCases.map(([pct,a])=>({pct,a,l0:Math.max(a*obj.lbnec,0.3*a*obj.lb,15*d,200)}));
  const g=rows(good), p=rows(poor);
  out=[
   ["fck selecionado",fmt(fck,0)+" MPa"],["Aço selecionado",v.steel],["Bitola selecionada",String(d).replace(".",",")+" mm"],
   ["Resistência de aderência fbd — boa",fmt(good.fbd)+" MPa"],["Resistência de aderência fbd — má",fmt(poor.fbd)+" MPa"],
   ["Ancoragem básica lb — boa",fmt(good.lb/10)+" cm"],["Ancoragem básica lb — má",fmt(poor.lb/10)+" cm"],
   ["Ancoragem necessária adotada — boa",fmt(good.lbnec/10)+" cm"],["Ancoragem necessária adotada — má",fmt(poor.lbnec/10)+" cm"]
  ];
  const table=`<div class="norm-table-wrap"><h3>Comprimento de traspasse — barras tracionadas</h3><p>Percentual de barras emendadas na mesma seção e coeficiente α₀t aplicável.</p><table class="norm-table"><thead><tr><th>Barras na mesma seção</th><th>α₀t</th><th>Boa aderência</th><th>Má aderência</th></tr></thead><tbody>${pctCases.map(([pct,a],i)=>`<tr><td>${pct}</td><td>${fmt(a,1)}</td><td>${fmt(g[i].l0/10)} cm</td><td>${fmt(p[i].l0/10)} cm</td></tr>`).join("")}</tbody></table></div>`;
  notes.push("O fator α₀t não é digitado: é selecionado automaticamente pela faixa de barras emendadas na mesma seção. A tabela apresenta todos os cenários para escolha de detalhamento.");
  notes.push("Cálculo-base: CA nervurado (η₁=2,25), η₂=1,0 para boa aderência e 0,7 para má aderência; γc=1,4 e γs=1,15. A razão As,calc/As,ef foi considerada igual a 1,00 por não haver dimensionamento da armadura conectado ao módulo.");
  notes.push("Verificar Tabela 9.3, armadura transversal, afastamento entre barras emendadas, cobrimento, confinamento, posição da emenda e demais condições dos itens 9.4 e 9.5 da ABNT NBR 6118. Para barras comprimidas aplica-se expressão distinta.");
  diagram=table;
  break}
 case "anchor":case "bend":{
  if(!positive("phi","pin")||num(v.straight)<0)throw Error("Diâmetro e pino devem ser positivos; prolongamento não pode ser negativo.");
  const d=num(v.phi);
  const a=num(v.angle)*Math.PI/180, r=(num(v.pin)+d)/2/10, arc=r*a;
  const straight=num(v.straight)*(d/10);
  const total=arc+straight;
  out=[["fck selecionado",fmt(num(v.fck),0)+" MPa"],["Tipo de aço",v.steel],["Bitola selecionada",String(d).replace(".",",")+" mm"],["Raio interno do pino",fmt(num(v.pin)/20)+" cm"],["Raio pelo eixo da barra",fmt(r)+" cm"],["Ângulo do gancho",fmt(num(v.angle),0)+"°"],["Comprimento do arco",fmt(arc)+" cm"],["Prolongamento reto",fmt(straight)+" cm"],["Comprimento geométrico do gancho",fmt(total)+" cm"]];
  if(current.id==="anchor"){
   const fck=num(v.fck), fyk=v.steel==="CA-60"?600:500, fctd=0.21*Math.pow(fck,2/3)/1.4, fyd=fyk/1.15, eta1=2.25, eta3=d<=32?1:(132-d)/100;
   if(!(fck>=20&&fck<=50)||!["CA-50","CA-60"].includes(v.steel))throw Error("Selecione fck entre 20 e 50 MPa e um tipo de aço válido.");
   if(d>32){status="bad";notes.push("Bitola superior a 32 mm: exige solução específica de ancoragem e detalhamento. Não utilizar este resultado automaticamente.");}
   for(const [name,eta2] of [["Boa aderência",1],["Má aderência",0.7]]){
    const fbd=eta1*eta2*eta3*fctd, lb=(d/4)*(fyd/fbd), lbnec=Math.max(lb,0.3*lb,10*d,100);
    out.push([`Resistência de aderência — ${name}`,fmt(fbd)+" MPa"],[`Ancoragem básica — ${name}`,fmt(lb/10)+" cm"],[`Ancoragem necessária de referência — ${name}`,fmt(lbnec/10)+" cm"]);
   }
   notes.push("Os comprimentos de ancoragem são apresentados para boa e má aderência, sem aplicar automaticamente redução por gancho (α=1,0). A geometria do gancho é calculada separadamente.");
   notes.push("O diâmetro interno do pino deve atender ao mínimo normativo aplicável ao tipo de aço, bitola e configuração do gancho. Conferir também cobrimento, confinamento, posição da barra e condições de ancoragem antes de adotar o resultado.");
  }
  notes.push("Geometria calculada pelo eixo da barra. Conferir diâmetro mínimo do pino, tipo de barra, cobrimento, confinamento e requisitos específicos do elemento estrutural.");
  diagram=`<svg viewBox="0 0 360 130" role="img"><path d="M45 20 H150 A45 45 0 0 1 150 110 H300" fill="none" stroke="#078b55" stroke-width="5"/><text x="45" y="14" font-size="11" fill="#536779">Trecho reto + arco pelo eixo + prolongamento</text></svg>`;break}
 case "straight":{
  let L=num(v.length)-num(v.coverL)-num(v.coverR), s=num(v.spacing);if(L<=0||s<=0)throw Error("Comprimento útil e espaçamento devem ser positivos.");
  let intervals=Math.ceil(L/s), bars=intervals+1, actual=L/intervals;out=[["Comprimento útil",fmt(L)+" cm"],["Intervalos",intervals],["Quantidade de barras",bars],["Espaçamento real",fmt(actual)+" cm"]];notes.push("Distribuição uniforme com barras nas duas extremidades do comprimento útil. Confirmar se os afastamentos informados representam eixo de barra ou face da forma.");break}
 case "circular":{
  if(!positive("radius","spacing"))throw Error("Raio e espaçamento devem ser positivos.");let C=2*Math.PI*num(v.radius), n=Math.ceil(C/num(v.spacing)), e=C/n, ang=360/n;out=[["Comprimento da circunferência",fmt(C)+" cm"],["Quantidade de barras",n],["Espaçamento real no arco",fmt(e)+" cm"],["Ângulo entre barras",fmt(ang,4)+"°"]];notes.push("Raio considerado na linha de centro das barras. Verificar diâmetro efetivo da seção, cobrimento, estribos e geometria da peça.");diagram=`<svg viewBox="0 0 240 240"><circle cx="120" cy="120" r="88" fill="none" stroke="#9aaab7" stroke-width="2"/>${Array.from({length:Math.min(n,180)},(_,i)=>{let a=(num(v.start)+i*360/n)*Math.PI/180;return `<circle cx="${120+88*Math.cos(a)}" cy="${120+88*Math.sin(a)}" r="3.4" fill="#078b55"/>`}).join("")}<circle cx="120" cy="120" r="3" fill="#17324d"/></svg>`;break}
 case "helix":{
  if(!positive("diameter","height","pitch","phi")||num(v.tail)<0)throw Error("Diâmetro, altura, passo e bitola devem ser positivos.");let turns=num(v.height)/num(v.pitch), length=turns*Math.sqrt(Math.pow(Math.PI*num(v.diameter),2)+Math.pow(num(v.pitch),2))+num(v.tail);out=[["Número de voltas (altura/passo)",fmt(turns,2)],["Comprimento geométrico da hélice",fmt(length-num(v.tail))+" cm"],["Adicional informado",fmt(v.tail)+" cm"],["Comprimento total estimado",fmt(length)+" cm"],["Peso linear teórico",fmt(Math.pow(num(v.phi),2)/162)+" kg/m"],["Peso estimado",fmt(length/100*Math.pow(num(v.phi),2)/162)+" kg"]];notes.push("O comprimento é calculado na linha de centro da espiral. Conferir passo variável, trechos de ponta, ganchos, emendas, tolerâncias e detalhamento específico da estaca.");break}
 case "mesh":{
  if(!positive("area","mass","wireL","spaceL","wireT","spaceT")||num(v.overlap)<0)throw Error("Área, massa, diâmetros e espaçamentos devem ser positivos.");let kg=num(v.area)*num(v.mass), total=kg*(1+num(v.overlap)/100), asL=Math.PI*Math.pow(num(v.wireL),2)/4*(100/num(v.spaceL))/100, asT=Math.PI*Math.pow(num(v.wireT),2)/4*(100/num(v.spaceT))/100;out=[["Tela",v.designation],["Área aplicada",fmt(v.area)+" m²"],["Massa nominal",fmt(v.mass)+" kg/m²"],["Massa sem acréscimos",fmt(kg)+" kg"],["Massa com acréscimo",fmt(total)+" kg"],["Aço longitudinal teórico",fmt(asL)+" cm²/m"],["Aço transversal teórico",fmt(asT)+" cm²/m"],["Malha",fmt(v.spaceL,1)+" × "+fmt(v.spaceT,1)+" cm"]];notes.push("A massa nominal deve vir da ficha técnica do fabricante. Quantidade de painéis, recortes e sobreposições depende do formato comercial e do plano de montagem.");break}
 case "beam":{
  if(!positive("width","aggregate","bars","phi","hspace","vspace","layers")||num(v.cover)<0)throw Error("Verifique os dados de seção, barras e espaçamentos.");
  let w=num(v.width), p=num(v.phi)/10, hmin=Math.max(2,num(v.hspace)), vmin=Math.max(2,num(v.vspace)), maxLayers=Math.floor(num(v.layers));
  let perLayer=Math.floor((w+hmin)/(p+hmin));let remain=num(v.bars), dist=[];for(let i=0;i<maxLayers&&remain>0;i++){let count=Math.min(perLayer,remain);dist.push(count);remain-=count}
  let pass=remain===0;out=[["Largura interna disponível",fmt(w)+" cm"],["Espaçamento livre horizontal adotado",fmt(hmin)+" cm"],["Capacidade estimada por camada",perLayer+" barras"],["Distribuição por camada",dist.map((x,i)=>`C${i+1}: ${x}`).join(" · ")||"—"],["Barras não acomodadas",remain],["Resultado preliminar",pass?"Barras acomodadas":"Seção insuficiente"]];if(!pass)status="bad";else if(dist.length>1)status="warn";
  notes.push("Modelo simplificado de empacotamento em camadas iguais. Não verifica posição individual, estribos, cobrimentos, interferência com barras transversais, ancoragens, diâmetro do agregado pela fórmula normativa ou condições reais de concretagem. Validar com desenho da seção e NBR 6118 vigente.");diagram=`<svg viewBox="0 0 340 210"><rect x="55" y="12" width="230" height="185" fill="none" stroke="#334b60" stroke-width="5"/>${dist.map((cnt,li)=>Array.from({length:cnt},(_,i)=>{let step=230/(cnt+1);return `<circle cx="${55+step*(i+1)}" cy="${35+li*55}" r="${p*3.2}" fill="#286c9d" stroke="#153d5c"/>`}).join("")).join("")}<text x="170" y="207" text-anchor="middle" font-size="10" fill="#526477">Esquema ilustrativo · não executivo</text></svg>`;break}
 case "convert":{
  if(!positive("oldPhi","oldQty","newPhi"))throw Error("Bitolas e quantidade devem ser positivas.");let aOld=Math.PI*Math.pow(num(v.oldPhi),2)/4/100, aNew=Math.PI*Math.pow(num(v.newPhi),2)/4/100, As=aOld*num(v.oldQty), n=Math.ceil(As/aNew), supplied=n*aNew;out=[["Área original por barra",fmt(aOld,4)+" cm²"],["Área total original",fmt(As,4)+" cm²"],["Área da barra substituta",fmt(aNew,4)+" cm²"],["Quantidade substituta",n+" barras"],["Área substituta fornecida",fmt(supplied,4)+" cm²"],["Diferença de área",fmt(supplied-As,4)+" cm²"]];notes.push("Equivalência geométrica de área. Substituição exige aprovação do projetista e nova verificação de resistência, ductilidade, espaçamentos, ancoragem, emendas, fissuração e detalhamento.");break}
 }
 lastResult={module:current.name,inputs:v,outputs:out,notes,status,date:new Date().toISOString()};renderResult(lastResult,diagram);
}
function renderResult(r,diagram=""){let html=r.outputs.map(x=>metric(x[0],x[1])).join("");let cls=r.status==="bad"?"bad":r.status==="warn"?"warn":"";html+=`<div class="status ${cls}">${r.status==="bad"?"NÃO ATENDE — revisar geometria":r.status==="warn"?"ATENÇÃO — revisar distribuição em camadas":"RESULTADO CALCULADO — conferir critérios de projeto"}</div>`;html+=`<div class="result-note">${r.notes.map(x=>"• "+x).join("<br>")}</div>`;$("#results").innerHTML=html;$("#diagram").innerHTML=diagram;}
function historyKey(){return "sia-history-"+current.id}
function renderHistory(){let h=JSON.parse(localStorage.getItem(historyKey())||"[]");$("#history").innerHTML=h.length?h.slice().reverse().map(x=>`<div class="history-item"><span>${new Date(x.date).toLocaleString("pt-BR")} · ${x.module}</span><b>${x.outputs[0]?.[1]||"Cálculo"}</b></div>`).join(""):'<div class="empty">Nenhum cálculo salvo neste módulo.</div>'}
$("#calculate").onclick=()=>{try{calculate()}catch(e){$("#results").innerHTML=`<div class="status bad">${e.message}</div>`}};
$("#saveResult").onclick=()=>{if(!lastResult){alert("Calcule antes de salvar.");return}let h=JSON.parse(localStorage.getItem(historyKey())||"[]");h.push(lastResult);localStorage.setItem(historyKey(),JSON.stringify(h));renderHistory()};
$("#resetModule").onclick=()=>showModule(current.id);
$("#clearHistory").onclick=()=>{localStorage.removeItem(historyKey());renderHistory()};
$("#exportData").onclick=()=>{let data={app:"SIA",version:"0.3",exportedAt:new Date().toISOString(),storage:Object.fromEntries(Object.keys(localStorage).filter(k=>k.startsWith("sia-history-")).map(k=>[k,localStorage.getItem(k)]))};download("sia-backup.json",JSON.stringify(data,null,2),"application/json")};
$("#importData").onchange=async e=>{let f=e.target.files[0];if(!f)return;try{let d=JSON.parse(await f.text());Object.entries(d.storage||{}).forEach(([k,v])=>{if(k.startsWith("sia-history-"))localStorage.setItem(k,v)});alert("Backup importado.");if(current)renderHistory()}catch{alert("Arquivo JSON inválido.")}};
function download(name,content,type){let a=document.createElement("a"),u=URL.createObjectURL(new Blob([content],{type}));a.href=u;a.download=name;a.click();URL.revokeObjectURL(u)}
