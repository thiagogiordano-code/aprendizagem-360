import { useState } from "react";

const U = {
  verde: "#006341", verdeE: "#004D31", verdeA: "#00A859", verdeC: "#E6F2EC",
  cinza: "#4A4A4A", cinzaC: "#F5F5F5", cinzaB: "#D9D9D9",
  amarelo: "#F5A623", branco: "#FFFFFF",
};

const VARK_ITEMS = [
  { id: "v1", dim: "V", text: "Quando preciso aprender um conteúdo novo, prefiro ver esquemas, mapas ou diagramas que organizam as ideias visualmente." },
  { id: "v2", dim: "V", text: "Em aulas sobre organização de acervos, aprendo melhor quando o professor usa imagens, fotos ou representações visuais dos documentos." },
  { id: "v3", dim: "V", text: "Para estudar, costumo criar tabelas comparativas ou esquemas coloridos no papel ou em aplicativos." },
  { id: "v4", dim: "V", text: "Quando leio um texto acadêmico, prefiro que ele tenha infográficos, figuras ou quadros resumo." },
  { id: "a1", dim: "A", text: "Aprendo melhor quando ouço explicações em voz alta, como em aulas expositivas ou podcasts sobre o tema." },
  { id: "a2", dim: "A", text: "Para memorizar conceitos de classificação ou catalogação, prefiro repetir em voz alta ou explicar para outra pessoa." },
  { id: "a3", dim: "A", text: "Em seminários, aprendo mais participando da discussão oral do que lendo os slides depois." },
  { id: "a4", dim: "A", text: "Quando tenho dúvidas, prefiro perguntar diretamente ao professor ou discutir com colegas do que pesquisar sozinho(a)." },
  { id: "r1", dim: "R", text: "Prefiro estudar por textos, artigos e apostilas bem escritas, com definições claras e exemplos detalhados." },
  { id: "r2", dim: "R", text: "Em atividades de pesquisa bibliográfica, sinto que aprendo mais quando leio as fontes com atenção e faço anotações." },
  { id: "r3", dim: "R", text: "Para revisar conteúdos, prefiro reescrever resumos com minhas próprias palavras." },
  { id: "r4", dim: "R", text: "Quando estudo gestão documental ou políticas de informação, prefiro ler normas e documentos técnicos na íntegra." },
  { id: "k1", dim: "K", text: "Aprendo melhor fazendo atividades práticas, como organizar fisicamente um acervo, realizar um inventário ou aplicar uma técnica." },
  { id: "k2", dim: "K", text: "Prefiro aprender a partir de exemplos concretos e situações reais, como visitas técnicas ou estudos de caso." },
  { id: "k3", dim: "K", text: "Em projetos de extensão ou pesquisa aplicada, sinto que aprendo mais do que nas aulas teóricas." },
  { id: "k4", dim: "K", text: "Para entender um processo de mediação da informação, preciso vivenciá-lo ou simular a situação na prática." },
];

const KOLB_ITEMS = [
  { id: "ec1", dim: "EC", text: "Quando começo a estudar um tema novo, prefiro ter experiências concretas antes de ler teorias sobre ele." },
  { id: "ec2", dim: "EC", text: "Em trabalhos em grupo, prefiro que o aprendizado venha da troca direta com colegas, sem muita estrutura formal." },
  { id: "ec3", dim: "EC", text: "Aprendo melhor quando me envolvo pessoalmente na atividade, mesmo que cometa erros no processo." },
  { id: "ec4", dim: "EC", text: "Para aprender sobre curadoria de acervos, prefiro realizar a prática imediatamente, ajustando conforme vou avançando." },
  { id: "ro1", dim: "RO", text: "Antes de agir, prefiro observar como outros fazem e refletir sobre o que observei." },
  { id: "ro2", dim: "RO", text: "Em seminários, prefiro assistir às apresentações e pensar nas conexões antes de intervir." },
  { id: "ro3", dim: "RO", text: "Aprendo melhor quando tenho tempo para analisar com calma o que foi apresentado, sem pressa para responder." },
  { id: "ro4", dim: "RO", text: "Para elaborar um fichamento ou resenha, costumo refletir bastante sobre o texto antes de escrever." },
  { id: "ca1", dim: "CA", text: "Gosto de entender os princípios e as teorias que explicam um fenômeno antes de aplicá-los." },
  { id: "ca2", dim: "CA", text: "Em pesquisa, prefiro trabalhar com modelos conceituais, frameworks teóricos e revisões sistemáticas." },
  { id: "ca3", dim: "CA", text: "Para estudar representação da informação, prefiro partir dos fundamentos lógicos e só depois ver exemplos." },
  { id: "ca4", dim: "CA", text: "Sinto mais segurança quando consigo encaixar o conteúdo em uma estrutura teórica coerente." },
  { id: "ea1", dim: "EA", text: "Prefiro aprender testando hipóteses, experimentando soluções e verificando se funcionam na prática." },
  { id: "ea2", dim: "EA", text: "Em projetos, gosto de tomar iniciativa, propor soluções e adaptar o plano conforme os resultados aparecem." },
  { id: "ea3", dim: "EA", text: "Aprendo melhor quando posso aplicar imediatamente o que aprendi em um problema real ou desafio concreto." },
  { id: "ea4", dim: "EA", text: "Para entender gestão de unidades de informação, prefiro simular decisões reais e ver as consequências." },
];

const ALL_ITEMS = [
  ...VARK_ITEMS.map(i => ({ ...i, section: "VARK" })),
  ...KOLB_ITEMS.map(i => ({ ...i, section: "Kolb" })),
];

const CURSOS = ["Biblioteconomia", "Arquivologia", "Museologia", "PPGB — Mestrado", "PPGB — Doutorado"];
const SEMESTRES = ["2025.2", "2026.1", "2026.2"];
const GENEROS = ["Prefiro não informar", "Mulher cisgênero", "Homem cisgênero", "Mulher transgênero", "Homem transgênero", "Não binário", "Outro"];
const FAIXAS_IDADE = ["Prefiro não informar", "17 anos ou menos", "18 a 22 anos", "23 a 27 anos", "28 a 32 anos", "33 a 37 anos", "38 a 42 anos", "43 a 47 anos", "48 anos ou mais"];

const VARK_DESC = {
  V: { label: "Visual", color: U.verde, bg: U.verdeC, emoji: "🎨", desc: "Você aprende bem com representações visuais: mapas, diagramas, esquemas, cores e organização espacial da informação.", forcas: ["Facilidade com mapas conceituais e infográficos", "Boa organização espacial de informações", "Preferência por materiais visualmente organizados"], dicas: ["Use mapas mentais para resumir leituras", "Crie tabelas comparativas ao estudar normas", "Organize seus fichamentos com cores e hierarquia visual"] },
  A: { label: "Auditivo", color: U.verdeA, bg: "#E6F7EF", emoji: "🎧", desc: "Você aprende bem ouvindo: explicações orais, debates, discussões em grupo e conversas sobre o conteúdo.", forcas: ["Facilidade em aulas expositivas e seminários", "Boa retenção por meio de discussões", "Tendência a explicar bem oralmente"], dicas: ["Grave resumos em áudio para reouvir", "Discuta os textos com colegas antes da prova", "Participe ativamente dos seminários"] },
  R: { label: "Leitura/Escrita", color: U.verdeE, bg: "#E0EDE8", emoji: "📖", desc: "Você aprende bem lendo e escrevendo: textos acadêmicos, resumos, fichamentos e anotações detalhadas.", forcas: ["Facilidade com textos densos e normas técnicas", "Boa produção de fichamentos e resenhas", "Preferência por informação estruturada em texto"], dicas: ["Reescreva os conceitos com suas palavras", "Faça anotações marginais nos textos", "Produza listas e glossários dos termos-chave"] },
  K: { label: "Cinestésico", color: U.amarelo, bg: "#FEF6E6", emoji: "🤝", desc: "Você aprende bem fazendo: atividades práticas, estudos de caso, visitas técnicas e projetos aplicados.", forcas: ["Facilidade em laboratórios e oficinas", "Boa performance em projetos de extensão", "Aprendizado eficaz por tentativa e erro"], dicas: ["Busque estágios e atividades práticas", "Use estudos de caso reais para fixar teoria", "Simule situações profissionais ao estudar"] },
};

const KOLB_DESC = {
  EC: { label: "Experiência Concreta", color: U.verde, bg: U.verdeC, emoji: "🌱", desc: "Aprende a partir de experiências diretas e envolvimento pessoal." },
  RO: { label: "Observação Reflexiva", color: U.verdeA, bg: "#E6F7EF", emoji: "🔭", desc: "Aprende observando, refletindo e analisando antes de agir." },
  CA: { label: "Conceituação Abstrata", color: U.verdeE, bg: "#E0EDE8", emoji: "🧠", desc: "Aprende construindo modelos teóricos e integrando conceitos em estruturas lógicas." },
  EA: { label: "Experimentação Ativa", color: U.amarelo, bg: "#FEF6E6", emoji: "⚡", desc: "Aprende testando, experimentando e aplicando soluções em situações reais." },
};

const KOLB_TIPOS = {
  "RO-CA": { label: "Assimilador", desc: "Pensa de forma abstrata e reflete antes de agir. Forte em teoria e modelos conceituais." },
  "CA-EA": { label: "Convergente", desc: "Aplica teoria em situações práticas. Bom na resolução de problemas e tomada de decisão." },
  "EA-EC": { label: "Acomodador", desc: "Aprende fazendo e se adaptando. Forte em projetos, iniciativa e execução." },
  "EC-RO": { label: "Divergente", desc: "Observa situações concretas por múltiplas perspectivas. Criativo e empático." },
};

function calcVARK(r) {
  const s = { V: 0, A: 0, R: 0, K: 0 };
  VARK_ITEMS.forEach(({ id, dim }) => { if (r[id]) s[dim] += r[id]; });
  const mx = Math.max(...Object.values(s));
  return { scores: s, dominant: Object.entries(s).filter(([, v]) => v === mx).map(([k]) => k) };
}

function calcKolb(r) {
  const s = { EC: 0, RO: 0, CA: 0, EA: 0 };
  KOLB_ITEMS.forEach(({ id, dim }) => { if (r[id]) s[dim] += r[id]; });
  const sorted = Object.entries(s).sort((a, b) => b[1] - a[1]);
  const pair = [sorted[0][0], sorted[1][0]].sort().join("-");
  return { scores: s, pair, tipo: KOLB_TIPOS[pair] || { label: "Misto", desc: "Perfil equilibrado entre as quatro dimensões." } };
}

function makeId() { return Math.random().toString(36).slice(2, 8).toUpperCase(); }

function exportCSV(rows) {
  if (!rows.length) return;
  const h = ["ID", "Nome", "Curso", "Turma", "Disciplina", "Semestre", "Nível", "Gênero", "Faixa Etária", "VARK", "Kolb Dimensão", "Kolb Tipo", "Data"];
  const lines = [h.join(";"), ...rows.map(r => [
    r.id, r.nome || "Anônimo", r.curso, r.turma || "", r.disciplina || "", r.semestre, r.nivel,
    r.genero, r.faixaIdade, r.vark, r.kolbDim, r.kolbTipo, r.data
  ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(";"))];
  const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `aprendizagem360_${Date.now()}.csv`;
  a.click();
}

const inputStyle = { width: "100%", border: `1.5px solid ${U.cinzaB}`, borderRadius: 8, padding: "10px 12px", fontSize: 15, boxSizing: "border-box", background: "white", color: U.cinza, outline: "none" };
const cardStyle = { background: "white", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", overflow: "hidden" };

function Btn({ onClick, disabled, children, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, transition: "opacity 0.15s", padding: "13px 0", ...style }}>
      {children}
    </button>
  );
}

function Header({ sub }) {
  return (
    <div style={{ background: U.verdeE }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{ width: 36, height: 36, background: U.branco, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 17 }}>🎓</div>
          <div style={{ color: U.branco, fontWeight: 900, fontSize: 18, letterSpacing: 0.2 }}>Aprendizagem 360°</div>
        </div>
        <div style={{ paddingLeft: 48 }}>
          {["Universidade Federal do Cariri — UFCA", "Centro de Ciências Sociais Aplicadas — CCSA", "Tecnologia da Informação Aplicada à Ciência da Informação"].map((txt, i) => (
            <span key={i} style={{ color: "rgba(255,255,255,0.72)", fontSize: 10, display: "block", letterSpacing: 0.2 }}>
              {i > 0 && <span style={{ marginRight: 6, opacity: 0.45 }}>|</span>}{txt}
            </span>
          ))}
        </div>
      </div>
      <div style={{ padding: "6px 16px 7px", background: "rgba(0,0,0,0.18)" }}>
        <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 11 }}>{sub}</span>
      </div>
    </div>
  );
}

function Prog({ cur, tot }) {
  const p = Math.round((cur / tot) * 100);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: U.cinza, marginBottom: 4 }}>
        <span>Questão {cur} de {tot}</span>
        <span style={{ fontWeight: 700, color: U.verde }}>{p}%</span>
      </div>
      <div style={{ background: U.cinzaB, borderRadius: 9999, height: 7 }}>
        <div style={{ width: `${p}%`, background: U.verde, borderRadius: 9999, height: 7, transition: "width 0.35s" }} />
      </div>
    </div>
  );
}

function Scale({ value, onChange }) {
  return (
    <div style={{ marginTop: 22 }}>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => onChange(n)} style={{ width: 50, height: 50, borderRadius: "50%", border: "2.5px solid", borderColor: value === n ? U.verde : U.cinzaB, background: value === n ? U.verde : "white", color: value === n ? "white" : U.cinza, fontWeight: 700, fontSize: 18, cursor: "pointer", transition: "all 0.15s", flexShrink: 0 }}>
            {n}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9CA3AF", marginTop: 8, padding: "0 6px" }}>
        <span>Discordo totalmente</span><span>Concordo totalmente</span>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: U.cinza, display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.4 }}>{label}</label>
      {children}
    </div>
  );
}

function AIFeedback({ vark, kolb, nome, curso, nivel }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function gerar() {
    setLoading(true); setText(""); setDone(false);
    const prompt = `Você é um especialista em Design Instrucional e Andragogia aplicados ao ensino superior em Ciência da Informação.\n\nGere uma devolutiva pedagógica individual para o(a) estudante abaixo. A devolutiva deve ser clara, empática, prática e não determinista — trate o resultado como tendência, não como rótulo fixo.\n\nDADOS DO ESTUDANTE:\n- Nome: ${nome || "Estudante"}\n- Curso: ${curso}\n- Nível: ${nivel}\n- Perfil VARK dominante: ${vark.dominant.join(", ")} (${vark.dominant.map(d => VARK_DESC[d].label).join(", ")})\n- Pontuações VARK: V=${vark.scores.V} A=${vark.scores.A} R=${vark.scores.R} K=${vark.scores.K}\n- Perfil Kolb: ${kolb.tipo.label} (dimensões dominantes: ${kolb.pair})\n- Pontuações Kolb: EC=${kolb.scores.EC} RO=${kolb.scores.RO} CA=${kolb.scores.CA} EA=${kolb.scores.EA}\n\nESTRUTURA OBRIGATÓRIA DA DEVOLUTIVA:\n1. Saudação personalizada (1 frase)\n2. O que seu perfil indica (2-3 frases, linguagem acessível)\n3. Como isso aparece no seu curso de ${curso} (2-3 frases com exemplos concretos do campo)\n4. Três sugestões práticas de estudo (lista)\n5. Como trabalhar em grupo e seminários (2 frases)\n6. Uma orientação para ampliar seu repertório além do perfil dominante (2 frases)\n7. Encerramento motivador e não determinista (1 frase)\n\nEscreva em português do Brasil. Linguagem direta, sem clichês, sem dramatização.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json", "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-calls": "true" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, stream: true, messages: [{ role: "user", content: prompt }] }) });
      const reader = res.body.getReader(); const dec = new TextDecoder(); let buf = "";
      while (true) {
        const { done: d, value } = await reader.read(); if (d) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n"); buf = lines.pop();
        for (const line of lines) {
          if (line.startsWith("data: ")) { const data = line.slice(6); if (data === "[DONE]") continue; try { const j = JSON.parse(data); if (j.type === "content_block_delta" && j.delta?.text) setText(t => t + j.delta.text); } catch { } }
        }
      }
      setDone(true);
    } catch { setText("Não foi possível gerar o feedback via IA. Tente novamente."); setDone(true); }
    setLoading(false);
  }

  return (
    <div style={{ marginTop: 16, background: "#F0FDF4", borderRadius: 12, padding: 16, border: `1.5px solid ${U.verde}` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: text ? 12 : 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: U.verdeE }}>🤖 Devolutiva personalizada com IA</div>
        {!done && <button onClick={gerar} disabled={loading} style={{ padding: "8px 18px", background: loading ? "#ccc" : U.verde, color: "white", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: loading ? "not-allowed" : "pointer" }}>{loading ? "Gerando..." : "Gerar devolutiva"}</button>}
      </div>
      {loading && !text && <div style={{ color: U.cinza, fontSize: 13, fontStyle: "italic", marginTop: 8 }}>Analisando seu perfil...</div>}
      {text && <div style={{ fontSize: 14, color: U.cinza, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{text}</div>}
      {done && <button onClick={() => { setText(""); setDone(false); }} style={{ marginTop: 10, padding: "6px 14px", background: "white", color: U.verde, border: `2px solid ${U.verde}`, borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Regenerar</button>}
    </div>
  );
}

function ResultCard({ vark, kolb, nome, curso, nivel }) {
  const mV = vark.dominant[0]; const vd = VARK_DESC[mV];
  return (
    <div style={{ padding: "20px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 44 }}>🎯</div>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: U.verdeE, margin: "8px 0 4px" }}>{nome ? `Olá, ${nome}!` : "Seu perfil está pronto!"}</h2>
        <p style={{ color: U.cinza, fontSize: 12, margin: 0 }}>{ALL_ITEMS.length} questões respondidas · VARK + Kolb</p>
      </div>
      <div style={{ background: vd.bg, borderRadius: 12, padding: 16, marginBottom: 12, borderLeft: `4px solid ${vd.color}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 24 }}>{vd.emoji}</span>
          <div>
            <div style={{ fontSize: 10, color: vd.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Perfil VARK dominante</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#111" }}>{vd.label}</div>
          </div>
        </div>
        <p style={{ color: U.cinza, fontSize: 13, lineHeight: 1.65, margin: "0 0 12px" }}>{vd.desc}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: vd.color, marginBottom: 5 }}>PONTOS FORTES</div>
            {vd.forcas.map((f, i) => <div key={i} style={{ fontSize: 12, color: U.cinza, marginBottom: 3 }}>✓ {f}</div>)}
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: vd.color, marginBottom: 5 }}>DICAS DE ESTUDO</div>
            {vd.dicas.map((d, i) => <div key={i} style={{ fontSize: 12, color: U.cinza, marginBottom: 3 }}>→ {d}</div>)}
          </div>
        </div>
        {Object.entries(vark.scores).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <div style={{ width: 20, fontSize: 11, fontWeight: 700, color: VARK_DESC[k].color }}>{k}</div>
            <div style={{ flex: 1, background: "#E5E7EB", borderRadius: 9999, height: 8 }}>
              <div style={{ width: `${(v / 20) * 100}%`, background: VARK_DESC[k].color, borderRadius: 9999, height: 8 }} />
            </div>
            <div style={{ width: 22, fontSize: 11, color: "#9CA3AF", textAlign: "right" }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ background: U.cinzaC, borderRadius: 12, padding: 16, marginBottom: 12, borderLeft: `4px solid ${U.verdeA}` }}>
        <div style={{ fontSize: 10, color: U.verdeA, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Perfil Kolb</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#111", marginBottom: 5 }}>{kolb.tipo.label}</div>
        <p style={{ color: U.cinza, fontSize: 13, lineHeight: 1.65, margin: "0 0 12px" }}>{kolb.tipo.desc}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 8 }}>
          {Object.entries(kolb.scores).map(([k, v]) => { const kd = KOLB_DESC[k]; return (<div key={k} style={{ background: kd.bg, borderRadius: 8, padding: 10 }}><div style={{ fontSize: 11, fontWeight: 700, color: kd.color }}>{kd.emoji} {kd.label}</div><div style={{ marginTop: 5, background: "#E5E7EB", borderRadius: 9999, height: 6 }}><div style={{ width: `${(v / 20) * 100}%`, background: kd.color, borderRadius: 9999, height: 6 }} /></div><div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3 }}>{v} pts</div></div>); })}
        </div>
      </div>
      <AIFeedback vark={vark} kolb={kolb} nome={nome} curso={curso} nivel={nivel} />
      <div style={{ marginTop: 12, background: U.verdeC, borderRadius: 10, padding: 12, borderLeft: `4px solid ${U.verde}` }}>
        <p style={{ fontSize: 12, color: U.cinza, lineHeight: 1.7, margin: 0 }}><strong>Importante:</strong> Este resultado indica <em>tendências</em>, não rótulos fixos. Use-o para ampliar seu repertório de aprendizagem.</p>
      </div>
    </div>
  );
}

function Dashboard({ responses }) {
  const [fC, setFC] = useState("Todos");
  const [fT, setFT] = useState("Todas");
  const [fS, setFS] = useState("Todos");
  const [aiText, setAiText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const cursos = ["Todos", ...new Set(responses.map(r => r.curso))];
  const turmas = ["Todas", ...new Set(responses.filter(r => fC === "Todos" || r.curso === fC).map(r => r.turma).filter(Boolean))];
  const sems = ["Todos", ...new Set(responses.map(r => r.semestre).filter(Boolean))];
  const fil = responses.filter(r => (fC === "Todos" || r.curso === fC) && (fT === "Todas" || r.turma === fT) && (fS === "Todos" || r.semestre === fS));
  const tot = fil.length;
  const vC = { V: 0, A: 0, R: 0, K: 0 }; const kC = { EC: 0, RO: 0, CA: 0, EA: 0 };
  fil.forEach(r => { vC[r.vark] = (vC[r.vark] || 0) + 1; kC[r.kolbDim] = (kC[r.kolbDim] || 0) + 1; });

  async function analisar() {
    setAiLoading(true); setAiText("");
    const prompt = `Você é especialista em Design Instrucional para o ensino superior em Ciência da Informação.\n\nAnalise os dados de perfis de aprendizagem de uma turma da UFCA e produza um parecer pedagógico para o docente.\n\nDADOS DA TURMA:\nFiltro: ${fC} | ${fT} | ${fS}\nTotal de respondentes: ${tot}\nDistribuição VARK: V=${vC.V} A=${vC.A} R=${vC.R} K=${vC.K}\nDistribuição Kolb: EC=${kC.EC} RO=${kC.RO} CA=${kC.CA} EA=${kC.EA}\nCursos presentes: ${[...new Set(fil.map(r => r.curso))].join(", ")}\n\nESTRUTURA DO PARECER:\n1. Leitura geral do perfil da turma (3-4 frases)\n2. Principais tendências identificadas em VARK e Kolb (tópicos objetivos)\n3. Três recomendações pedagógicas concretas e aplicáveis (com justificativa breve)\n4. Um alerta sobre possíveis dificuldades a considerar no planejamento (2 frases)\n5. Sugestão de metodologia ou estratégia didática prioritária para essa turma (2-3 frases)\n\nEscreva em português do Brasil. Tom técnico e direto. Máximo 400 palavras.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json", "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-calls": "true" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, stream: true, messages: [{ role: "user", content: prompt }] }) });
      const reader = res.body.getReader(); const dec = new TextDecoder(); let buf = "";
      while (true) {
        const { done: d, value } = await reader.read(); if (d) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n"); buf = lines.pop();
        for (const line of lines) { if (line.startsWith("data: ")) { const data = line.slice(6); if (data === "[DONE]") continue; try { const j = JSON.parse(data); if (j.type === "content_block_delta" && j.delta?.text) setAiText(t => t + j.delta.text); } catch { } } }
      }
    } catch { setAiText("Não foi possível conectar à IA. Tente novamente."); }
    setAiLoading(false);
  }

  const Chip = ({ opts, val, onChange }) => (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {opts.map(o => (<button key={o} onClick={() => onChange(o)} style={{ padding: "5px 12px", borderRadius: 9999, border: "2px solid", fontSize: 12, borderColor: val === o ? U.verde : U.cinzaB, background: val === o ? U.verde : "white", color: val === o ? "white" : U.cinza, fontWeight: 600, cursor: "pointer" }}>{o}</button>))}
    </div>
  );
  const Bar = ({ label, count, color }) => (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, color: U.cinza, marginBottom: 3 }}><span>{label}</span><span>{count} ({tot ? Math.round((count / tot) * 100) : 0}%)</span></div>
      <div style={{ background: U.cinzaB, borderRadius: 9999, height: 9 }}><div style={{ width: `${tot ? (count / tot) * 100 : 0}%`, background: color, borderRadius: 9999, height: 9, transition: "width 0.4s" }} /></div>
    </div>
  );

  return (
    <div style={{ padding: "16px" }}>
      <h2 style={{ fontSize: 17, fontWeight: 900, color: U.verdeE, margin: "0 0 3px" }}>Dashboard Docente</h2>
      <p style={{ color: U.cinza, fontSize: 12, margin: "0 0 16px" }}>Visão analítica por curso, turma e semestre</p>
      <div style={{ background: U.cinzaC, borderRadius: 12, padding: 14, marginBottom: 14, border: `1px solid ${U.cinzaB}` }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: U.verde, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Filtros</div>
        {[{ l: "Curso", opts: cursos, val: fC, fn: v => { setFC(v); setFT("Todas"); } }, { l: "Turma", opts: turmas, val: fT, fn: setFT }, { l: "Semestre", opts: sems, val: fS, fn: setFS }].map(({ l, opts, val, fn }) => (
          <div key={l} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: U.cinza, marginBottom: 5 }}>{l}</div>
            <Chip opts={opts} val={val} onChange={fn} />
          </div>
        ))}
      </div>
      {tot === 0 ? (
        <div style={{ background: U.cinzaC, borderRadius: 12, padding: 36, textAlign: "center" }}>
          <div style={{ fontSize: 34, marginBottom: 8 }}>📭</div>
          <p style={{ color: U.cinza, fontSize: 13 }}>Nenhuma resposta encontrada com esses filtros.</p>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 12 }}>
            {[{ l: "Respondentes", v: tot, c: U.verde }, { l: "Turmas", v: new Set(fil.map(r => r.turma).filter(Boolean)).size || "—", c: U.verdeA }, { l: "Perfis VARK", v: Object.values(vC).filter(v => v > 0).length, c: U.amarelo }].map(({ l, v, c }) => (
              <div key={l} style={{ background: "white", border: `1px solid ${U.cinzaB}`, borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: c }}>{v}</div>
                <div style={{ fontSize: 11, color: U.cinza, lineHeight: 1.3 }}>{l}</div>
              </div>
            ))}
          </div>
          {[{ title: "Distribuição VARK", items: Object.entries(vC), desc: VARK_DESC }, { title: "Distribuição Kolb", items: Object.entries(kC), desc: KOLB_DESC }].map(({ title, items, desc }) => (
            <div key={title} style={{ background: "white", border: `1px solid ${U.cinzaB}`, borderRadius: 12, padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: U.cinza, marginBottom: 12 }}>{title}</div>
              {items.map(([k, v]) => <Bar key={k} label={`${desc[k].emoji} ${desc[k].label}`} count={v} color={desc[k].color} />)}
            </div>
          ))}
          <div style={{ background: "#F0FDF4", border: `1.5px solid ${U.verde}`, borderRadius: 12, padding: 14, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: aiText ? 12 : 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: U.verdeE }}>🤖 Análise pedagógica com IA</div>
              <button onClick={analisar} disabled={aiLoading} style={{ padding: "8px 16px", background: aiLoading ? "#ccc" : U.verde, color: "white", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: aiLoading ? "not-allowed" : "pointer" }}>{aiLoading ? "Analisando..." : "Analisar turma"}</button>
            </div>
            {aiLoading && !aiText && <div style={{ fontSize: 13, color: U.cinza, fontStyle: "italic", marginTop: 8 }}>Gerando parecer pedagógico...</div>}
            {aiText && <div style={{ fontSize: 13, color: U.cinza, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{aiText}</div>}
          </div>
          <button onClick={() => exportCSV(fil)} style={{ width: "100%", padding: "13px 0", background: U.verdeE, color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: 14 }}>
            ⬇ Exportar CSV ({fil.length} registro{fil.length > 1 ? "s" : ""})
          </button>
          <div style={{ background: "white", border: `1px solid ${U.cinzaB}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "11px 14px", borderBottom: `1px solid ${U.cinzaB}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: U.cinza }}>Respostas individuais</div>
            </div>
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 520 }}>
                <thead>
                  <tr style={{ background: U.cinzaC }}>
                    {["#", "Nome", "Curso", "Turma", "Semestre", "VARK", "Kolb"].map(h => (
                      <th key={h} style={{ padding: "7px 10px", textAlign: "left", fontWeight: 700, color: U.cinza, borderBottom: `1px solid ${U.cinzaB}`, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fil.map((r, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${U.cinzaC}` }}>
                      <td style={{ padding: "6px 10px", color: "#9CA3AF" }}>{i + 1}</td>
                      <td style={{ padding: "6px 10px", fontWeight: 500, whiteSpace: "nowrap" }}>{r.nome || "Anônimo"}</td>
                      <td style={{ padding: "6px 10px", color: U.cinza, whiteSpace: "nowrap" }}>{r.curso}</td>
                      <td style={{ padding: "6px 10px", color: U.cinza }}>{r.turma || "—"}</td>
                      <td style={{ padding: "6px 10px", color: U.cinza }}>{r.semestre || "—"}</td>
                      <td style={{ padding: "6px 10px" }}><span style={{ background: VARK_DESC[r.vark]?.bg, color: VARK_DESC[r.vark]?.color, padding: "2px 7px", borderRadius: 9999, fontWeight: 700, fontSize: 11, whiteSpace: "nowrap" }}>{r.vark} — {VARK_DESC[r.vark]?.label}</span></td>
                      <td style={{ padding: "6px 10px" }}><span style={{ background: KOLB_DESC[r.kolbDim]?.bg, color: KOLB_DESC[r.kolbDim]?.color, padding: "2px 7px", borderRadius: 9999, fontWeight: 700, fontSize: 11, whiteSpace: "nowrap" }}>{KOLB_DESC[r.kolbDim]?.label}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [step, setStep] = useState(0);
  const [resps, setResps] = useState({});
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("Biblioteconomia");
  const [turma, setTurma] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [semestre, setSemestre] = useState("2026.1");
  const [nivel, setNivel] = useState("Graduação");
  const [genero, setGenero] = useState("Prefiro não informar");
  const [faixaIdade, setFaixaIdade] = useState("Prefiro não informar");
  const [result, setResult] = useState(null);
  const [allResps, setAllResps] = useState([]);

  const cur = ALL_ITEMS[step];
  const answered = resps[cur?.id];

  function handleNext() {
    if (step < ALL_ITEMS.length - 1) { setStep(s => s + 1); }
    else {
      const v = calcVARK(resps); const k = calcKolb(resps);
      const kolbDim = Object.entries(k.scores).sort((a, b) => b[1] - a[1])[0][0];
      setResult({ vark: v, kolb: k });
      setAllResps(prev => [...prev, { id: makeId(), nome, curso, turma, disciplina, semestre, nivel, genero, faixaIdade, vark: v.dominant[0], kolbDim, kolbTipo: k.tipo.label, data: new Date().toLocaleDateString("pt-BR") }]);
      setView("result");
    }
  }

  function restart() { setView("home"); setStep(0); setResps({}); setResult(null); setNome(""); setTurma(""); setDisciplina(""); }

  const wrap = { fontFamily: "system-ui,sans-serif", minHeight: "100vh", background: U.cinzaC };
  const inner = { maxWidth: 540, margin: "0 auto", padding: "16px 12px" };

  if (view === "home") return (
    <div style={wrap}>
      <Header sub="Instrumento Pedagógico de Perfis de Aprendizagem" />
      <div style={inner}>
        <div style={cardStyle}>
          <div style={{ background: U.verdeC, padding: "18px 16px", borderBottom: `1px solid ${U.cinzaB}` }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: U.verde, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>👨‍🏫</div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: U.verde, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Uma mensagem do professor</div>
                <p style={{ fontSize: 13, color: U.cinza, lineHeight: 1.75, margin: 0 }}><strong>Olá!</strong> Eu sou o Prof. Thiago Giordano Siqueira e estarei com você nesta jornada para descobrir como você aprende melhor.</p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: U.cinza, lineHeight: 1.75, margin: "0 0 12px" }}>Todos nós temos um jeito único de aprender. Com poucos minutos, você vai identificar seu perfil de aprendizagem e receber recomendações personalizadas para estudar com mais prazer, foco e resultado.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {[["🎯", "VARK + Kolb"], ["⚡", "Resultado imediato"], ["🤖", "Devolutiva com IA"]].map(([e, l]) => (
                <div key={l} style={{ fontSize: 12, color: U.verdeE, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><span>{e}</span><span>{l}</span></div>
              ))}
            </div>
          </div>
          <div style={{ padding: "18px 16px" }}>
            <Field label="Nome (opcional)"><input value={nome} onChange={e => setNome(e.target.value)} placeholder="Como prefere ser chamado(a)?" style={inputStyle} /></Field>
            <Field label="Turma"><input value={turma} onChange={e => setTurma(e.target.value)} placeholder="Ex: BIB-2024-1, ARQ-2023-2" style={inputStyle} /></Field>
            <Field label="Disciplina (opcional)"><input value={disciplina} onChange={e => setDisciplina(e.target.value)} placeholder="Ex: Recuperação da Informação" style={inputStyle} /></Field>
            {[{ l: "Curso", v: curso, fn: setCurso, opts: CURSOS }, { l: "Semestre letivo", v: semestre, fn: setSemestre, opts: SEMESTRES }, { l: "Gênero", v: genero, fn: setGenero, opts: GENEROS }, { l: "Faixa etária", v: faixaIdade, fn: setFaixaIdade, opts: FAIXAS_IDADE }].map(({ l, v, fn, opts }) => (
              <Field key={l} label={l}><select value={v} onChange={e => fn(e.target.value)} style={inputStyle}>{opts.map(o => <option key={o}>{o}</option>)}</select></Field>
            ))}
            <Field label="Nível">
              <div style={{ display: "flex", gap: 8 }}>
                {["Graduação", "Pós-graduação"].map(n => (
                  <button key={n} onClick={() => setNivel(n)} style={{ flex: 1, padding: "11px 0", border: "2px solid", borderColor: nivel === n ? U.verde : U.cinzaB, borderRadius: 8, background: nivel === n ? U.verde : "white", color: nivel === n ? "white" : U.cinza, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>{n}</button>
                ))}
              </div>
            </Field>
            <Btn onClick={() => setView("quiz")} style={{ width: "100%", background: U.verde, color: "white", marginTop: 4 }}>Iniciar questionário →</Btn>
            {allResps.length > 0 && <Btn onClick={() => setView("dashboard")} style={{ width: "100%", marginTop: 10, background: "transparent", color: U.verde, border: `2px solid ${U.verde}`, fontSize: 14 }}>Dashboard docente ({allResps.length} resposta{allResps.length > 1 ? "s" : ""}) 📊</Btn>}
            <p style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", marginTop: 12, marginBottom: 0 }}>{ALL_ITEMS.length} questões · ~10 min</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (view === "quiz") {
    const sec = cur.section;
    const secLabel = sec === "VARK" ? `VARK — ${VARK_DESC[cur.dim].label}` : `Kolb — ${KOLB_DESC[cur.dim].label}`;
    return (
      <div style={wrap}>
        <Header sub={turma ? `${curso} · ${turma}` : curso} />
        <div style={{ ...inner, maxWidth: 560 }}>
          <div style={cardStyle}>
            <div style={{ padding: "18px 16px" }}>
              <Prog cur={step + 1} tot={ALL_ITEMS.length} />
              <div style={{ marginTop: 18, marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: U.verde, textTransform: "uppercase", letterSpacing: 1 }}>{secLabel}</span>
              </div>
              <p style={{ fontSize: 16, fontWeight: 600, color: "#111", lineHeight: 1.7, margin: "0 0 4px" }}>{cur.text}</p>
              <Scale value={resps[cur.id]} onChange={v => setResps(r => ({ ...r, [cur.id]: v }))} />
              <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
                <Btn onClick={() => setStep(s => s - 1)} disabled={step === 0} style={{ flex: 1, background: "white", color: U.cinza, border: `2px solid ${U.cinzaB}`, fontSize: 14 }}>← Anterior</Btn>
                <Btn onClick={handleNext} disabled={!answered} style={{ flex: 2, background: answered ? U.verde : U.cinzaB, color: "white", fontSize: 15 }}>{step < ALL_ITEMS.length - 1 ? "Próxima →" : "Ver resultado ✓"}</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "result" && result) return (
    <div style={wrap}>
      <Header sub="Resultado Individual" />
      <div style={{ ...inner, maxWidth: 620 }}>
        <div style={cardStyle}><ResultCard vark={result.vark} kolb={result.kolb} nome={nome} curso={curso} nivel={nivel} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
          <Btn onClick={() => setView("dashboard")} style={{ background: U.verdeE, color: "white", fontSize: 14 }}>Dashboard 📊</Btn>
          <Btn onClick={restart} style={{ background: "white", color: U.cinza, border: `2px solid ${U.cinzaB}`, fontSize: 14 }}>Nova resposta</Btn>
        </div>
      </div>
    </div>
  );

  if (view === "dashboard") return (
    <div style={wrap}>
      <Header sub="Dashboard Docente" />
      <div style={{ ...inner, maxWidth: 680 }}>
        <button onClick={() => setView(result ? "result" : "home")} style={{ marginBottom: 12, padding: "8px 16px", background: "white", color: U.cinza, border: `2px solid ${U.cinzaB}`, borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>← Voltar</button>
        <div style={cardStyle}><Dashboard responses={allResps} /></div>
      </div>
    </div>
  );

  return null;
}