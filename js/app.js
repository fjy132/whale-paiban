/**
 * app.js — 鲸鱼排版小工具 交互层（Canva 式三栏编辑器）
 * 左:模板库(搜索/分类/缩略图) · 中:画布(缩放) · 右:编辑(文本/复制)
 */

let currentPlatform = 'wechat';
let currentCategory = null;
let currentTemplate = null;
let zoom = 1;

/* ---------- 分类解析器 ---------- */
function makeCategoryResolver(mapping, displayOrder) {
  return {
    mapping, displayOrder,
    getCategoryId(name) {
      if (this.mapping[name]) return this.mapping[name];
      return name.replace('类', '').toLowerCase().replace(/\s+/g, '-');
    },
    getSortedCategoryIds(available) {
      const ids = Object.keys(available);
      const configured = this.displayOrder.filter(id => ids.includes(id));
      const unconfigured = ids.filter(id => !this.displayOrder.includes(id));
      return [...configured, ...unconfigured.sort()];
    }
  };
}

const PLATFORM_CONFIG = {
  wechat: makeCategoryResolver({
    '简约专业': 'simple-professional',
    '视觉平衡': 'visual-balance',
    '丰富装饰': 'rich-decoration',
    '创意大胆': 'creative-bold',
    '节日氛围': 'festival-atmosphere',
    '可爱生活': 'cute-lifestyle',
    '商务科技': 'business-tech',
    '文艺复古': 'literary-retro',
    '自然清新': 'nature-fresh'
  }, ['simple-professional', 'visual-balance', 'rich-decoration', 'creative-bold',
      'festival-atmosphere', 'cute-lifestyle', 'business-tech', 'literary-retro', 'nature-fresh']),
};
PLATFORM_CONFIG.wechat.label = '公众号';

const MINI_SAMPLE = '鲸鱼排版小工具\n一、标题样式示例\n（一）小标题样式\n这是用于模板预览的正文文字，用来展示段落与层级效果。\n- 列表项目示例\n> 引用样式示例';

const RISK_WORDS = ['最', '第一', '顶级', '国家级', '绝对', '唯一', '百分之百', '百分百', '全网最低', '史上最', '世界领先', '全球第一', '最好', '最佳', '极致', '无敌', '疗效', '根治', '治愈', '减肥', '美白', '祛痘', '丰胸', '壮阳', '抗癌', '防癌', '降血糖', '降血压', '治疗', '包治', '药到病除', '无效退款', '免费领取', '点击领取', '加微信', '微信号', '二维码', '转账', '收款', '返现', '刷单', '代购', '正品保证', '官方认证', '央视', '人民日报', '国家免检', '纯天然', '无副作用', '快速见效', '立竿见影', '秒杀', '特价'];


/* ---------- 文字样式（字体 / 字号 / 间距） ---------- */
const TYPE_DEFAULTS = { font: 'default', fontCustom: '', baseSize: 15, lineHeight: 1.8, h1LineHeight: 1.5, letterSpacing: 0.3, h1Size: 21, paraMargin: 12, textIndent: 0, align: 'justify', textColor: '', h1Color: '' };
let TYPE = Object.assign({}, TYPE_DEFAULTS);

const FONT_MAP = {
  default: '',
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
  yahei: '"Microsoft YaHei", "PingFang SC", sans-serif',
  hei: '"SimHei", "Microsoft YaHei", sans-serif',
  song: '"SimSun", "Songti SC", serif',
  serif: 'Georgia, "Times New Roman", "Songti SC", "SimSun", serif',
  kai: '"KaiTi", "STKaiti", "Kaiti SC", serif',
  fangsong: '"FangSong", "STFangsong", serif',
  pingfang: '"PingFang SC", "Microsoft YaHei", sans-serif',
  sourcehan: '"Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", sans-serif',
  sourcehanserif: '"Source Han Serif SC", "Source Han Serif CN", "SimSun", serif',
  mono: '"SF Mono", Consolas, "Courier New", monospace'
};

// 在模板样式末尾追加覆盖声明（后声明者生效），实现实时排版微调
function applyTypeOverrides(style) {
  const s = Object.assign({}, style);
  let font = FONT_MAP[TYPE.font] || '';
  if (TYPE.font === 'custom' && TYPE.fontCustom && TYPE.fontCustom.trim()) {
    font = '"' + TYPE.fontCustom.trim() + '", ' + (FONT_MAP.sans || 'sans-serif');
  }
  const o = {};
  o.container = (font ? 'font-family:' + font + ';' : '') + 'font-size:' + TYPE.baseSize + 'px;line-height:' + TYPE.lineHeight + ';letter-spacing:' + TYPE.letterSpacing + 'px;';
  o.paragraph = 'font-size:' + TYPE.baseSize + 'px;line-height:' + TYPE.lineHeight + ';letter-spacing:' + TYPE.letterSpacing + 'px;margin:' + TYPE.paraMargin + 'px 0;text-align:' + TYPE.align + ';' + (TYPE.textColor ? 'color:' + TYPE.textColor + ';' : '') + (TYPE.textIndent ? 'text-indent:' + TYPE.textIndent + 'em;' : '');
  o.h1 = 'font-size:' + TYPE.h1Size + 'px;line-height:' + TYPE.h1LineHeight + ';letter-spacing:' + (Math.round((TYPE.letterSpacing + 0.2) * 10) / 10) + 'px;' + (TYPE.h1Color ? 'color:' + TYPE.h1Color + ';' : '');
  o.h2 = 'font-size:' + Math.max(14, Math.round(TYPE.h1Size * 0.86)) + 'px;line-height:' + TYPE.h1LineHeight + ';letter-spacing:' + TYPE.letterSpacing + 'px;';
  o.h3 = 'font-size:' + Math.max(13, Math.round(TYPE.h1Size * 0.76)) + 'px;line-height:' + TYPE.h1LineHeight + ';letter-spacing:' + TYPE.letterSpacing + 'px;';
  o.listItem = 'font-size:' + TYPE.baseSize + 'px;line-height:' + TYPE.lineHeight + ';letter-spacing:' + TYPE.letterSpacing + 'px;';
  o.listMarker = 'font-size:' + Math.max(10, Math.round(TYPE.baseSize * 0.9)) + 'px;';
  o.spacing = 'height:' + Math.max(6, Math.round(TYPE.baseSize * 0.75)) + 'px;'
  if (!s.title && s.h1) s.title = s.h1;
  o.title = 'font-size:' + Math.min(34, Math.round(TYPE.h1Size * 1.25)) + 'px;line-height:' + TYPE.h1LineHeight + ';letter-spacing:' + (Math.round((TYPE.letterSpacing + 0.25) * 10) / 10) + 'px;' + (TYPE.h1Color ? 'color:' + TYPE.h1Color + ';' : '');
  Object.keys(o).forEach(k => { s[k] = (s[k] || '') + o[k]; });
  return s;
}

function getCurrentStyle() {
  return applyTypeOverrides(getTemplateStyle(currentTemplate));
}

/* ---------- 选区文字格式 ---------- */
const SEL_DEFAULTS = { s: 0, c: '', f: 'default', b: false, i: false, u: false, fc: '' };
let SEL = Object.assign({}, SEL_DEFAULTS);

function selMarker() {
  const parts = [];
  if (SEL.s) parts.push('s=' + SEL.s);
  if (SEL.c) parts.push('c=' + SEL.c);
  if (SEL.f === 'custom' && SEL.fc && SEL.fc.trim()) parts.push('fc=' + SEL.fc.trim());
  else if (SEL.f && SEL.f !== 'default') parts.push('f=' + SEL.f);
  if (SEL.b) parts.push('b=1');
  if (SEL.i) parts.push('i=1');
  if (SEL.u) parts.push('u=1');
  return parts.length ? '\u27E6' + parts.join(';') + '\u27E7' : '';
}

function stripSelMarkers(str) {
  return String(str).replace(/\u27E6[^\u27E7]*\u27E7/g, '').replace(/\u27E6\/\u27E7/g, '');
}

function applySelectionFormat() {
  const ta = document.getElementById('inputText');
  let s = ta.selectionStart, e = ta.selectionEnd;
  if (s === e) { showToast('请先在左侧文章里选中要调整的文字', '未选中文字'); return; }
  const full = ta.value;
  // 如果选区整体在某个旧格式标记内部，先扩大到整个标记再重写，避免产生嵌套标记
  const before = full.slice(0, s);
  const lastOpen = before.lastIndexOf('\u27E6');
  const lastCloseOpen = before.lastIndexOf('\u27E6/\u27E7');
  if (lastOpen > lastCloseOpen) {
    const nextClose = full.indexOf('\u27E6/\u27E7', e);
    if (nextClose >= 0) { s = lastOpen; e = nextClose + 3; }
  }
  recordHistory();
  const pre = full.slice(0, s);
  const post = full.slice(e);
  const marker = selMarker();
  const selLines = full.slice(s, e).split('\n').map(ln => {
    const clean = stripSelMarkers(ln);
    if (!clean.trim()) return clean;
    return marker + clean + (marker ? '\u27E6/\u27E7' : '');
  });
  const wrapped = selLines.join('\n');
  ta.value = pre + wrapped + post;
  ta.focus();
  ta.setSelectionRange(s, s + wrapped.length);
  refreshFromTextarea();
}

function clearSelectionFormat() {
  const ta = document.getElementById('inputText');
  const s = ta.selectionStart, e = ta.selectionEnd;
  if (s === e) { showToast('请先选中要清除格式的文字', '未选中文字'); return; }
  recordHistory();
  const before = ta.value.slice(0, s);
  const after = ta.value.slice(e);
  const cleared = stripSelMarkers(ta.value.slice(s, e));
  ta.value = before + cleared + after;
  ta.focus();
  ta.setSelectionRange(s, s + cleared.length);
  refreshFromTextarea();
}

function parseSelProps(inner) {
  const p = {};
  String(inner).split(';').forEach(kv => { const i = kv.indexOf('='); if (i > 0) p[kv.slice(0, i).trim()] = kv.slice(i + 1).trim(); });
  return { s: parseInt(p.s, 10) || 0, c: p.c || '', f: p.f || 'default', b: !!p.b, i: !!p.i, u: !!p.u, fc: p.fc || '' };
}

function readSelectionFormat() {
  const ta = document.getElementById('inputText');
  const s = ta.selectionStart;
  const rest = ta.value.slice(s);
  // 情况1：选区起点正好在标记开头（应用格式后重新选中的范围包含标记）
  if (rest.indexOf('\u27E6') === 0) {
    const inner = rest.slice(1).split('\u27E7')[0] || '';
    SEL = Object.assign({}, SEL_DEFAULTS, parseSelProps(inner));
    syncSelUI();
    return;
  }
  // 情况2：选区起点在某个标记内部
  const before = ta.value.slice(0, s);
  const lastOpen = before.lastIndexOf('\u27E6');
  const lastClose = before.lastIndexOf('\u27E6/\u27E7');
  const nextClose = ta.value.indexOf('\u27E6/\u27E7', s);
  if (lastOpen > lastClose && nextClose > s) {
    const inner = before.slice(lastOpen + 1).split('\u27E7')[0] || '';
    SEL = Object.assign({}, SEL_DEFAULTS, parseSelProps(inner));
  } else {
    SEL = Object.assign({}, SEL_DEFAULTS);
  }
  syncSelUI();
}

function syncSelUI() {
  document.getElementById('v-selSize').textContent = SEL.s ? SEL.s + 'px' : '跟随';
  document.getElementById('selFont').value = SEL.f === 'custom' ? 'custom' : (SEL.f || 'default');
  const sfc = document.getElementById('selFontCustom');
  if (sfc) sfc.value = SEL.fc || '';
  const scc = document.getElementById('selColorCustom');
  if (scc) scc.value = SEL.c || '#7C3AED';
  document.querySelectorAll('.chip[data-sel="color"]').forEach(c => c.classList.toggle('on', (c.dataset.color || '') === SEL.c));
  const sb = document.getElementById('selBold');
  if (sb) sb.classList.toggle('on', SEL.b);
  const ti = document.getElementById('tbItalic');
  if (ti) ti.classList.toggle('on', SEL.i);
  const tu = document.getElementById('tbUnderline');
  if (tu) tu.classList.toggle('on', SEL.u);
}

/* ---------- 文字样式面板 ---------- */
function initTypePanel() {
  document.getElementById('typeAccHead').addEventListener('click', () => {
    const acc = document.getElementById('typeAcc');
    const open = acc.classList.toggle('open');
    document.getElementById('typeAccHead').setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.getElementById('typeFont').addEventListener('change', e => {
    TYPE.font = e.target.value;
    if (TYPE.font === 'custom') {
      const inp = document.getElementById('fontCustomInput');
      if (inp) { inp.focus(); inp.select(); }
    }
    onTypeChange();
  });
  const fontCustomInput = document.getElementById('fontCustomInput');
  if (fontCustomInput) {
    fontCustomInput.addEventListener('input', () => {
      TYPE.fontCustom = fontCustomInput.value;
      if (TYPE.font === 'custom') onTypeChange();
    });
  }

  document.querySelectorAll('.stepper button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.sel) return;
      const key = btn.dataset.key;
      const d = parseFloat(btn.dataset.d);
      const step = (key === 'lineHeight' || key === 'letterSpacing' || key === 'h1LineHeight') ? 0.1 : (key === 'textIndent' ? 0.5 : 1);
      let v = Math.round((TYPE[key] + d * step) * 10) / 10;
      if (key === 'lineHeight') v = Math.min(2.6, Math.max(1.3, v));
      if (key === 'h1LineHeight') v = Math.min(2.6, Math.max(1.2, v));
      if (key === 'letterSpacing') v = Math.min(2, Math.max(0, v));
      if (key === 'baseSize') v = Math.min(20, Math.max(12, Math.round(v)));
      if (key === 'h1Size') v = Math.min(30, Math.max(16, Math.round(v)));
      if (key === 'paraMargin') v = Math.min(30, Math.max(4, Math.round(v)));
      if (key === 'textIndent') v = Math.min(4, Math.max(0, v));
      TYPE[key] = v;
      onTypeChange();
    });
  });

  document.querySelectorAll('.seg2 button').forEach(btn => {
    btn.addEventListener('click', () => {
      TYPE.align = btn.dataset.align;
      onTypeChange();
    });
  });

  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (chip.dataset.sel) return;
      if (chip.dataset.target === 'title') TYPE.h1Color = chip.dataset.color || '';
      else TYPE.textColor = chip.dataset.color || '';
      onTypeChange();
    });
  });

  document.getElementById('typeReset').addEventListener('click', () => {
    TYPE = Object.assign({}, TYPE_DEFAULTS);
    onTypeChange();
  });

  // 选区文字控件
  document.querySelectorAll('.stepper button[data-sel="size"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const d = parseFloat(btn.dataset.d);
      SEL.s = Math.min(30, Math.max(12, (SEL.s || 15) + d * 1));
      syncSelUI();
      applySelectionFormat();
    });
  });
  document.getElementById('selFont').addEventListener('change', e => {
    SEL.f = e.target.value;
    if (SEL.f === 'custom') {
      const inp = document.getElementById('selFontCustom');
      if (inp) inp.focus();
    }
    syncSelUI();
    applySelectionFormat();
  });
  const selFontCustom = document.getElementById('selFontCustom');
  if (selFontCustom) {
    selFontCustom.addEventListener('input', () => {
      SEL.fc = selFontCustom.value;
      if (SEL.f === 'custom' && document.getElementById('inputText').selectionStart !== document.getElementById('inputText').selectionEnd) applySelectionFormat();
    });
  }
  const selColorCustom = document.getElementById('selColorCustom');
  if (selColorCustom) {
    selColorCustom.addEventListener('input', () => {
      SEL.c = selColorCustom.value;
      syncSelUI();
      if (document.getElementById('inputText').selectionStart !== document.getElementById('inputText').selectionEnd) applySelectionFormat();
    });
  }
  document.querySelectorAll('.chip[data-sel="color"]').forEach(c => {
    c.addEventListener('click', () => {
      SEL.c = c.dataset.color || '';
      syncSelUI();
      applySelectionFormat();
    });
  });
  document.getElementById('selBold').addEventListener('click', () => {
    SEL.b = !SEL.b;
    syncSelUI();
    applySelectionFormat();
  });
  const tbItalic = document.getElementById('tbItalic');
  if (tbItalic) tbItalic.addEventListener('click', () => {
    SEL.i = !SEL.i;
    syncSelUI();
    applySelectionFormat();
  });
  const tbUnderline = document.getElementById('tbUnderline');
  if (tbUnderline) tbUnderline.addEventListener('click', () => {
    SEL.u = !SEL.u;
    syncSelUI();
    applySelectionFormat();
  });
  document.getElementById('selClear').addEventListener('click', clearSelectionFormat);

  syncTypeUI();
}

function onTypeChange() {
  syncTypeUI();
  formatText();
}

function syncTypeUI() {
  document.getElementById('v-baseSize').textContent = TYPE.baseSize + 'px';
  document.getElementById('v-h1Size').textContent = TYPE.h1Size + 'px';
  document.getElementById('v-h1LineHeight').textContent = TYPE.h1LineHeight.toFixed(1);
  document.getElementById('v-lineHeight').textContent = TYPE.lineHeight.toFixed(1);
  document.getElementById('v-letterSpacing').textContent = TYPE.letterSpacing.toFixed(1) + 'px';
  document.getElementById('v-paraMargin').textContent = TYPE.paraMargin + 'px';
  document.getElementById('v-textIndent').textContent = TYPE.textIndent ? TYPE.textIndent + 'em' : '0';
  document.getElementById('typeFont').value = TYPE.font;
  const fci = document.getElementById('fontCustomInput');
  if (fci) fci.value = TYPE.fontCustom || '';
  document.querySelectorAll('.seg2 button').forEach(b => b.classList.toggle('on', b.dataset.align === TYPE.align));
  document.querySelectorAll('.chip').forEach(c => {
    if (c.dataset.sel) return;
    const cur = c.dataset.target === 'title' ? TYPE.h1Color : TYPE.textColor;
    c.classList.toggle('on', (c.dataset.color || '') === cur);
  });
}


/* ---------- 图标库 ---------- */
const ICON_LIB = [
  '✨','⭐','🌟','💡','📌','🔥','💖','🌸','🍀','🎯','✅','❤️','👍','🚀','🎉',
  '🌈','☁️','🌙','☀️','✈️','📚','🧠','💪','🙏','🎁','🎀','🏆','🪄','🧸',
  '☕','🍵','🕊️','🌊','🍃','🦋','🐳','🐟','📱','💻','🎧','🎬','🎵','🍰','🍹',
  '🌹','🌷','💐','🌻','🌿','🍂','❄️','⚡','💧','📝','✏️','📎','🔖','🗂️','📊',
  '💰','🧾','🛒','⚙️','🔧','🖥️','📈','🛡️','🧭','🔍','📣','🔔','⏰','🗓️','📅'
];

const ICON_LINES = ['───','────','──────','━━━','━━━━','┄┄┄','┅┅┅','┈┈┈','╌╌╌','····','·····','〰〰','~~~~'];

const ICON_TAGS = {
  '✦':'星 装饰', '✧':'星 装饰', '★':'星', '☆':'星', '✩':'星', '✪':'星',
  '⭐':'星 星星', '🌟':'星 闪', '✨':'星 闪闪', '💫':'星 晕',
  '🌙':'月 月亮', '☀️':'太阳 阳光', '🌈':'彩虹', '☁️':'云', '❄️':'雪 雪花', '⚡':'闪电', '🔥':'火 热', '💧':'水 水滴',
  '🌸':'花 樱花', '🌺':'花', '🌷':'花 郁金香', '🌹':'花 玫瑰', '💐':'花 花束', '🌻':'花 向日葵', '🪷':'花 莲花',
  '❤':'心 爱心 红心', '♡':'心 爱心', '♥':'心 爱心', '💖':'心 爱心 粉', '💗':'心 爱心', '💛':'心 黄心', '💚':'心 绿心', '💙':'心 蓝心', '💜':'心 紫心', '💝':'心 礼物',
  '➤':'箭头 向右', '➜':'箭头 向右', '→':'箭头', '←':'箭头 向左', '↑':'箭头 向上', '↓':'箭头 向下', '➡':'箭头 向右', '⬅':'箭头 向左', '⬆':'箭头 向上', '⬇':'箭头 向下', '⇢':'箭头', '✈️':'飞机 飞行', '🚀':'火箭 飞船', '⚓':'锚', '🛸':'飞碟',
  '🎀':'蝴蝶结 礼物', '🎁':'礼物', '🎈':'气球', '🎉':'庆祝 彩带', '🎊':'庆祝', '🎏':'鲤鱼旗',
  '🧸':'熊 玩具', '🪄':'魔法 魔杖', '💡':'灯泡 想法', '📌':'图钉 定位', '🔖':'书签', '📚':'书 书籍', '✏️':'铅笔 笔', '🖊':'钢笔 笔', '📎':'回形针',
  '✔':'对勾 对', '✓':'对勾 对', '✘':'叉 错', '☑':'勾选框 对', '☒':'方框叉',
  '◆':'菱形 装饰', '◇':'菱形', '●':'圆点', '○':'圆圈', '■':'方块', '□':'方块', '▲':'三角', '△':'三角', '▼':'三角', '▽':'三角',
  '😀':'笑脸 表情', '😊':'笑脸 微笑', '😍':'笑脸 爱', '🥰':'笑脸 爱', '👍':'赞 大拇指', '👏':'鼓掌', '🙏':'祈祷 谢谢', '💪':'力量 加油', '🎯':'目标 靶心', '🏆':'奖杯', '🥇':'金牌', '🧠':'思考 脑子', '📱':'手机', '💻':'电脑',
  '①②③④⑤⑥⑦⑧⑨⑩':'数字 序号', '㊀㊁㊂㊃㊄':'数字 序号', '❶❷❸❹❺':'数字 序号', '➊➋➌➍➎':'数字 序号',
  '•':'圆点 项目符号', '·':'点', '➖':'减号', '➕':'加号', '✚':'加号', '＊':'星号', '※':'重点 强调', '〰':'波浪线', '∞':'无穷'
};

const ICON_STORAGE_KEY = 'whale-paiban-custom-icons';

function getCustomIcons() {
  try { return JSON.parse(localStorage.getItem(ICON_STORAGE_KEY) || '[]'); } catch (e) { return []; }
}

function renderIconGrid() {
  const q = (document.getElementById('iconSearch').value || '').trim();
  const grid = document.getElementById('iconGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const custom = getCustomIcons();

  if (q) {
    const all = ICON_LIB.concat(ICON_LINES, custom);
    const list = all.filter(ch => ch.includes(q) || (ICON_TAGS[ch] || '').includes(q));
    if (!list.length) { grid.innerHTML = '<div class="icon-empty">没有匹配的图标</div>'; return; }
    list.forEach(ch => grid.appendChild(buildIconBtn(ch)));
    return;
  }

  const lineH = document.createElement('div');
  lineH.className = 'icon-group-title';
  lineH.textContent = '线条 / 分割线（点击插入整行）';
  grid.appendChild(lineH);
  ICON_LINES.forEach(tok => grid.appendChild(buildLineBtn(tok)));

  const libH = document.createElement('div');
  libH.className = 'icon-group-title';
  libH.textContent = '常用公众号图标';
  grid.appendChild(libH);
  ICON_LIB.concat(custom).forEach(ch => grid.appendChild(buildIconBtn(ch)));
}

function buildIconBtn(ch) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'icon-item';
  b.textContent = ch;
  b.title = ch;
  b.addEventListener('click', () => insertIcon(ch));
  return b;
}

function buildLineBtn(tok) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'icon-item icon-line';
  let kind = 'solid';
  if (/[~〰·.]/.test(tok)) kind = 'dotted';
  else if (/[┄┅┈╌]/.test(tok)) kind = 'dashed';
  b.classList.add('icon-line-' + kind);
  const bar = document.createElement('span');
  bar.className = 'icon-line-bar';
  b.appendChild(bar);
  b.title = '插入分割线：' + tok;
  b.addEventListener('click', () => insertLine(tok));
  return b;
}

function insertLine(tok) {
  const ta = document.getElementById('inputText');
  recordHistory();
  const s = ta.selectionStart, e = ta.selectionEnd;
  const before = ta.value.slice(0, s), after = ta.value.slice(e);
  const NL = String.fromCharCode(10);
  const needBeforeNl = before && !before.endsWith(NL);
  const needAfterNl = after && !after.startsWith(NL);
  const ins = (needBeforeNl ? NL : '') + tok + (needAfterNl ? NL : '');
  ta.value = before + ins + after;
  ta.focus();
  ta.setSelectionRange(s + ins.length, s + ins.length);
  refreshFromTextarea();
  showToast('已插入分割线，会按模板样式自动排版', '插入线条');
}

function insertIcon(ch) {
  const ta = document.getElementById('inputText');
  recordHistory();
  const s = ta.selectionStart, e = ta.selectionEnd;
  const before = ta.value.slice(0, s), after = ta.value.slice(e);
  ta.value = before + ch + after;
  ta.focus();
  ta.setSelectionRange(s + ch.length, s + ch.length);
  refreshFromTextarea();
  showToast('已插入 ' + ch + '，可继续选择其他图标', '插入图标');
}

function initIconPanel() {
  document.getElementById('iconAccHead').addEventListener('click', () => {
    const acc = document.getElementById('iconAcc');
    const open = acc.classList.toggle('open');
    document.getElementById('iconAccHead').setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) renderIconGrid();
  });
  document.getElementById('iconSearch').addEventListener('input', renderIconGrid);
  document.getElementById('iconAddBtn').addEventListener('click', () => {
    const inp = document.getElementById('iconCustomInput');
    const val = (inp.value || '').trim();
    if (!val) { showToast('请先粘贴一个表情或符号', '未输入图标'); return; }
    const chars = Array.from(val);
    const custom = getCustomIcons();
    chars.forEach(ch => { if (ch && custom.indexOf(ch) < 0) custom.push(ch); });
    try { localStorage.setItem(ICON_STORAGE_KEY, JSON.stringify(custom)); } catch (e) { /* ignore */ }
    inp.value = '';
    renderIconGrid();
    showToast('已加入图标库（保存在本机）', '添加成功');
  });
  renderIconGrid();
}

/* ---------- 数据 ---------- */
function getStyleCategories(platform) {
  platform = platform || currentPlatform;
  if (typeof TEMPLATE_LOADER === 'undefined') return {};
  const cfg = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.wechat;
  const templates = Object.values(TEMPLATE_LOADER.getAll()).filter(t => (t.platform || 'wechat') === platform);
  const categories = {};
  templates.forEach(t => {
    const cid = cfg.getCategoryId(t.category);
    if (!categories[cid]) categories[cid] = { name: t.category, templates: [] };
    categories[cid].templates.push({ id: t.id, name: t.name, description: t.description, style: t.style, category: t.category });
  });
  return categories;
}

function getTemplateStyle(templateId) {
  if (typeof TEMPLATE_LOADER !== 'undefined') {
    const s = TEMPLATE_LOADER.getStyle(templateId);
    if (s) return s;
  }
  return getDefaultStyle();
}

/* ---------- 启动 ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initAccordion();
  initTypePanel();
  initZoom();
  buildTemplateGallery();
  initEvents();
  initQr();
  initIconPanel();
  setTimeout(formatText, 60);
});

/* ---------- 主题 ---------- */
function initTheme() {
  const saved = localStorage.getItem('formatlab-theme');
  if (saved === 'dark' || saved === 'light') document.documentElement.dataset.theme = saved;
  document.getElementById('themeToggle').addEventListener('click', () => {
    const cur = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = cur;
    localStorage.setItem('formatlab-theme', cur);
  });
}

/* ---------- 折叠面板 ---------- */
function initAccordion() {
  document.getElementById('aiAccHead').addEventListener('click', () => {
    const acc = document.getElementById('aiAcc');
    const open = acc.classList.toggle('open');
    document.getElementById('aiAccHead').setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

/* ---------- 画布缩放 ---------- */
function initZoom() {
  document.getElementById('zoomIn').addEventListener('click', () => setZoom(zoom * 1.25));
  document.getElementById('zoomOut').addEventListener('click', () => setZoom(zoom / 1.25));
  document.getElementById('zoomFit').addEventListener('click', fitZoom);
  window.addEventListener('resize', fitZoom);
}
function setZoom(z) {
  zoom = Math.min(2.5, Math.max(0.35, z));
  document.getElementById('canvasStage').style.transform = 'scale(' + zoom + ')';
  document.getElementById('zoomLabel').textContent = Math.round(zoom * 100) + '%';
}
function fitZoom() {
  const canvas = document.getElementById('canvas');
  const page = document.getElementById('page');
  const z = Math.min(1.5, Math.max(0.35, (canvas.clientWidth - 130) / page.offsetWidth));
  setZoom(z);
}

/* ---------- 模板库 ---------- */
function buildTemplateGallery() {
  const styleCategories = getStyleCategories(currentPlatform);
  const categoryIds = PLATFORM_CONFIG[currentPlatform].getSortedCategoryIds(styleCategories);

  const pills = document.getElementById('categoryPills');
  pills.innerHTML = '';
  categoryIds.forEach((cid, i) => {
    const cat = styleCategories[cid];
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'pill' + (i === 0 ? ' active' : '');
    pill.textContent = cat.name;
    pill.dataset.cid = cid;
    pill.onclick = () => selectCategory(cid);
    pills.appendChild(pill);
  });

  if (!currentCategory && categoryIds.length > 0) {
    currentCategory = categoryIds[0];
    const first = styleCategories[currentCategory];
    if (first && first.templates.length > 0) currentTemplate = first.templates[0].id;
  }
  const total = Object.keys(styleCategories).reduce((n, k) => n + styleCategories[k].templates.length, 0);
  document.getElementById('templateCount').textContent = total + ' 款';
  renderTemplateGrid(currentCategory);
}

function selectCategory(cid) {
  currentCategory = cid;
  document.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p.dataset.cid === cid));
  renderTemplateGrid(cid);
}

function currentTemplateList() {
  const q = document.getElementById('tplSearch').value.trim().toLowerCase();
  if (q) {
    return Object.values(TEMPLATE_LOADER.getAll()).filter(t =>
      (t.platform || 'wechat') === currentPlatform &&
      ((t.name || '').toLowerCase().includes(q) || (t.category || '').includes(q))
    );
  }
  const cat = getStyleCategories(currentPlatform)[currentCategory];
  return cat ? cat.templates : [];
}

function renderTemplateGrid(cid) {
  const grid = document.getElementById('templateGrid');
  grid.innerHTML = '';
  const list = currentTemplateList();
  if (!list.length) {
    grid.innerHTML = '<div class="tpl-empty">没有匹配的模板</div>';
    return;
  }
  list.forEach((t, i) => grid.appendChild(buildTemplateCard(t, i)));
}

function buildTemplateCard(t, index) {
  const card = document.createElement('div');
  card.className = 'tpl-card' + (t.id === currentTemplate ? ' selected' : '');
  card.style.animationDelay = Math.min(index * 0.02, 0.3) + 's';
  card.onclick = () => switchTemplate(t.id, t.category);
  card.draggable = true;
  card.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', t.id);
    e.dataTransfer.effectAllowed = 'copy';
    card.classList.add('dragging');
  });
  card.addEventListener('dragend', () => card.classList.remove('dragging'));

  const mini = document.createElement('div');
  mini.className = 'tpl-mini';
  const inner = document.createElement('div');
  inner.className = 'tpl-mini-inner';
  inner.innerHTML = parseAndFormat(MINI_SAMPLE, t.style);
  mini.appendChild(inner);

  const previewBtn = document.createElement('button');
  previewBtn.type = 'button';
  previewBtn.className = 'tpl-eye';
  previewBtn.title = '预览模板';
  previewBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>';
  previewBtn.addEventListener('click', e => {
    e.stopPropagation();
    openTemplateModal(t, currentTemplateList());
  });
  mini.appendChild(previewBtn);

  const meta = document.createElement('div');
  meta.className = 'tpl-meta';
  const name = document.createElement('span');
  name.className = 'tpl-name';
  name.textContent = t.name;
  const check = document.createElement('span');
  check.className = 'tpl-check';
  check.textContent = '\u2713';
  meta.appendChild(name);
  meta.appendChild(check);
  if (t.description) {
    const desc = document.createElement('div');
    desc.className = 'tpl-desc';
    desc.textContent = t.description;
    meta.appendChild(desc);
  }

  card.appendChild(mini);
  card.appendChild(meta);

  // 整份预览自动缩放到缩略图内，完整展示模板效果
  requestAnimationFrame(() => {
    const target = 150;
    const h = inner.scrollHeight || 240;
    const sc = Math.min(1, target / h);
    inner.style.transition = 'none';
    inner.style.transform = 'scale(' + sc + ')';
    inner.style.width = (100 / sc) + '%';
    inner.style.transformOrigin = 'top left';
    mini.style.height = target + 'px';
    requestAnimationFrame(() => { inner.style.transition = ''; });
  });

  // 悬浮大图预览
  card.addEventListener('mouseenter', () => showHoverPreview(card, t));
  card.addEventListener('mousemove', () => positionHoverPreview(card));
  card.addEventListener('mouseleave', hideHoverPreview);
  return card;
}


/* ---------- 悬浮大图预览 ---------- */
function showHoverPreview(card, t) {
  const panel = document.getElementById('hoverPreview');
  document.getElementById('hpName').textContent = t.name;
  document.getElementById('hpCategory').textContent = t.category;
  const input = document.getElementById('inputText').value.trim();
  document.getElementById('hpBody').innerHTML = parseAndFormat(input || MINI_SAMPLE, applyTypeOverrides(t.style));
  panel.hidden = false;
  requestAnimationFrame(() => positionHoverPreview(card));
}

function positionHoverPreview(card) {
  const panel = document.getElementById('hoverPreview');
  if (panel.hidden) return;
  const r = card.getBoundingClientRect();
  const pw = panel.offsetWidth || 420;
  const ph = panel.offsetHeight || 420;
  const gap = 12;
  const left = (r.right + gap + pw <= window.innerWidth - 12) ? r.right + gap : Math.max(12, r.left - gap - pw);
  const top = Math.min(Math.max(12, r.top), window.innerHeight - ph - 12);
  panel.style.left = left + 'px';
  panel.style.top = top + 'px';
}

function hideHoverPreview() {
  document.getElementById('hoverPreview').hidden = true;
}

function switchTemplate(templateId, categoryName) {
  closeTemplateModal();
  currentTemplate = templateId;
  if (categoryName) {
    const cid = PLATFORM_CONFIG[currentPlatform].getCategoryId(categoryName);
    if (currentCategory !== cid) {
      currentCategory = cid;
      document.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p.dataset.cid === cid));
    }
  }
  renderTemplateGrid(currentCategory);
  formatText();
}


/* ---------- 手机扫码访问 ---------- */
function initQr() {
  const btn = document.getElementById('qrBtn');
  const pop = document.getElementById('qrPop');
  btn.addEventListener('click', e => { e.stopPropagation(); pop.hidden = !pop.hidden; });
  document.addEventListener('click', e => { if (!pop.hidden && !pop.contains(e.target) && e.target !== btn) pop.hidden = true; });
  document.getElementById('qrCopyBtn').addEventListener('click', () => {
    const url = 'https://fjy132.github.io/whale-paiban/';
    navigator.clipboard.writeText(url).then(() => showToast('公网地址已复制，可在任意设备打开', '复制成功'))
      .catch(() => { fallbackCopy(url); showToast('公网地址已复制，可在任意设备打开', '复制成功'); });
  });
}


/* ---------- 预览 ---------- */
function formatText() {
  const input = document.getElementById('inputText');
  const preview = document.getElementById('previewArea');
  if (!input.value.trim()) {
    preview.innerHTML = '<p class="placeholder">在左侧输入内容，<b>这里实时预览排版效果</b></p>';
    return;
  }
  preview.innerHTML = parseAndFormat(input.value, getCurrentStyle());
  preview.classList.remove('flash');
  void preview.offsetWidth;
  preview.classList.add('flash');
}

/* ---------- 历史记录（撤销 / 重做） ---------- */
let undoStack = [];
let redoStack = [];
let histLock = false;

function recordHistory() {
  if (histLock) return;
  const ta = document.getElementById('inputText');
  const v = ta.value;
  if (undoStack[undoStack.length - 1] !== v) undoStack.push(v);
  if (undoStack.length > 200) undoStack.shift();
  redoStack = [];
  updateHistoryButtons();
}

function refreshFromTextarea() {
  formatText();
  updateWordCount();
  checkRiskWords();
  updateHistoryButtons();
}

function undo() {
  const ta = document.getElementById('inputText');
  if (!undoStack.length) return;
  redoStack.push(ta.value);
  ta.value = undoStack.pop();
  histLock = true;
  refreshFromTextarea();
  histLock = false;
}

function redo() {
  const ta = document.getElementById('inputText');
  if (!redoStack.length) return;
  undoStack.push(ta.value);
  ta.value = redoStack.pop();
  histLock = true;
  refreshFromTextarea();
  histLock = false;
}

function updateHistoryButtons() {
  const u = document.getElementById('undoBtn');
  const r = document.getElementById('redoBtn');
  if (u) u.disabled = undoStack.length === 0;
  if (r) r.disabled = redoStack.length === 0;
}

/* ---------- 插入元素 ---------- */
const INSERTS = {
  insTitle: { text: '', top: true, label: '新的主标题' },
  insSub: { text: '小标题', label: '小标题' },
  insQuote: { text: '> 引用内容', label: '引用内容' },
  insList: { text: '- 列表项', label: '列表项' },
  insDivider: { text: '---', label: '分隔线' }
};

function insertElement(key) {
  const cfg = INSERTS[key];
  if (!cfg) return;
  const ta = document.getElementById('inputText');
  recordHistory();
  if (cfg.top) {
    const base = ta.value.replace(/^\n+/, '');
    ta.value = cfg.label + '\n\n' + base;
    const pos = cfg.label.length;
    ta.focus();
    ta.setSelectionRange(pos, pos);
  } else {
    const s = ta.selectionStart, e = ta.selectionEnd;
    const before = ta.value.slice(0, s), after = ta.value.slice(e);
    const prefix = (before && !before.endsWith('\n')) ? '\n' : '';
    const suffix = (after && !after.startsWith('\n')) ? '\n' : '';
    const insert = cfg.text + (suffix ? '' : '');
    ta.value = before + prefix + insert + (suffix || (after ? '\n' : '')) + after;
    const pos = s + prefix.length + insert.length;
    ta.focus();
    ta.setSelectionRange(pos, pos);
  }
  refreshFromTextarea();
}

/* ---------- 模板详情弹窗 ---------- */
let modalList = [];
let modalIdx = 0;

function openTemplateModal(t, list) {
  modalList = (list && list.length ? list : currentTemplateList());
  modalIdx = modalList.findIndex(x => x.id === t.id);
  if (modalIdx < 0) modalIdx = 0;
  renderTemplateModal();
  document.getElementById('tdOverlay').hidden = false;
  document.body.classList.add('modal-open');
}

function renderTemplateModal() {
  const t = modalList[modalIdx];
  if (!t) return;
  document.getElementById('tdName').textContent = t.name;
  document.getElementById('tdCat').textContent = t.category;
  document.getElementById('tdDesc').textContent = t.description || '';
  document.getElementById('tdPreview').innerHTML = parseAndFormat(document.getElementById('inputText').value.trim() || MINI_SAMPLE, applyTypeOverrides(t.style));
}

function closeTemplateModal() {
  const ov = document.getElementById('tdOverlay');
  if (ov) ov.hidden = true;
  document.body.classList.remove('modal-open');
}

function initTemplateModal() {
  document.getElementById('tdClose').addEventListener('click', closeTemplateModal);
  document.getElementById('tdOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeTemplateModal(); });
  document.getElementById('tdPrev').addEventListener('click', () => { if (modalList.length) { modalIdx = (modalIdx - 1 + modalList.length) % modalList.length; renderTemplateModal(); } });
  document.getElementById('tdNext').addEventListener('click', () => { if (modalList.length) { modalIdx = (modalIdx + 1) % modalList.length; renderTemplateModal(); } });
  document.getElementById('tdUse').addEventListener('click', () => {
    const t = modalList[modalIdx];
    if (t) switchTemplate(t.id, t.category);
    closeTemplateModal();
  });
  document.addEventListener('keydown', e => {
    if (document.getElementById('tdOverlay').hidden) return;
    if (e.key === 'Escape') closeTemplateModal();
    if (e.key === 'ArrowLeft' && modalList.length) { modalIdx = (modalIdx - 1 + modalList.length) % modalList.length; renderTemplateModal(); }
    if (e.key === 'ArrowRight' && modalList.length) { modalIdx = (modalIdx + 1) % modalList.length; renderTemplateModal(); }
  });
}

/* ---------- 拖拽模板到画布 ---------- */
function initDragDrop() {
  const zone = document.getElementById('canvasDrop');
  if (!zone) return;
  const hint = document.getElementById('dropHint');
  zone.addEventListener('dragenter', e => { e.preventDefault(); document.getElementById('canvas').classList.add('drop-target'); if (hint) hint.hidden = false; });
  zone.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; });
  zone.addEventListener('dragleave', e => {
    if (!zone.contains(e.relatedTarget)) { document.getElementById('canvas').classList.remove('drop-target'); if (hint) hint.hidden = true; }
  });
  zone.addEventListener('drop', e => {
    e.preventDefault();
    document.getElementById('canvas').classList.remove('drop-target');
    if (hint) hint.hidden = true;
    const id = e.dataTransfer.getData('text/plain');
    if (id && TEMPLATE_LOADER.get(id)) switchTemplate(id);
  });
}

/* ---------- 事件 ---------- */
function initEvents() {
  const input = document.getElementById('inputText');
  input.addEventListener('beforeinput', recordHistory);
  input.addEventListener('input', () => { formatText(); updateWordCount(); checkRiskWords(); });
  input.addEventListener('select', readSelectionFormat);

  document.getElementById('clearBtn').addEventListener('click', clearInput);
  document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
  const copyFootBtn = document.getElementById('copyFootBtn');
  if (copyFootBtn) copyFootBtn.addEventListener('click', copyToClipboard);
  const copyCenterBtn = document.getElementById('copyCenterBtn');
  if (copyCenterBtn) copyCenterBtn.addEventListener('click', copyToClipboard);
  document.getElementById('copyPromptBtn').addEventListener('click', copyPrompt);

  document.getElementById('undoBtn').addEventListener('click', undo);
  document.getElementById('redoBtn').addEventListener('click', redo);

  ['insTitle', 'insSub', 'insQuote', 'insList', 'insDivider'].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.addEventListener('click', () => insertElement(id));
  });

  document.getElementById('sourceToggle').addEventListener('click', () => {
    const src = document.getElementById('sourceArea');
    const prev = document.getElementById('previewArea');
    const visible = !src.hidden;
    src.hidden = visible;
    prev.style.display = visible ? '' : 'none';
    if (!visible) document.getElementById('sourceText').value = wechatCompatHtml(prev.innerHTML).html;
  });

  document.getElementById('tplSearch').addEventListener('input', () => renderTemplateGrid(currentCategory));

  // 快捷键：Ctrl / Cmd + Enter 一键复制；Ctrl+Z 撤销；Ctrl+Shift+Z / Ctrl+Y 重做
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      copyToClipboard();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
      e.preventDefault();
      undo();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && (e.shiftKey && (e.key === 'z' || e.key === 'Z') || e.key === 'y' || e.key === 'Y')) {
      e.preventDefault();
      redo();
      return;
    }
  });

  // 点击预览区 → 聚焦输入框
  document.getElementById('previewArea').addEventListener('click', () => input.focus());

  initTemplateModal();
  initDragDrop();
  updateHistoryButtons();
  updateWordCount();
}

function updateWordCount() {
  const count = document.getElementById('inputText').value.replace(/\s/g, '').length;
  document.getElementById('wordCount').textContent = count + ' 字';
}

function clearInput() {
  document.getElementById('inputText').value = '';
  document.getElementById('previewArea').innerHTML = '<p class="placeholder">在右侧输入内容，<b>这里实时预览排版效果</b></p>';
  updateWordCount();
  checkRiskWords();
}

/* ---------- 违禁词提示 ---------- */
function checkRiskWords() {
  const banner = document.getElementById('riskBanner');
  const text = document.getElementById('inputText').value;
  const found = RISK_WORDS.filter(w => text.includes(w));
  if (!found.length) { banner.hidden = true; return; }
  banner.hidden = false;
  banner.innerHTML = '<b>⚠ 违禁词提示</b><span>检测到 <b>' + found.length + '</b> 个可能违规词：<span class="risk-words">' + found.join('、') + '</span></span>';
}

/* ---------- Toast ---------- */
function showToast(message, title) {
  title = title || '复制成功';
  const overlay = document.getElementById('toastOverlay');
  const toast = document.getElementById('toast');
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastMsg').textContent = message;
  overlay.hidden = false;
  requestAnimationFrame(() => {
    overlay.classList.add('show');
    toast.classList.add('show');
  });
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    overlay.classList.remove('show');
    toast.classList.remove('show');
    setTimeout(() => { overlay.hidden = true; }, 300);
  }, 2400);
}

/* ---------- 复制提示词 ---------- */
async function copyPrompt() {
  const text = document.getElementById('aiPromptText').textContent;
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    fallbackCopy(text);
  }
  showToast('请打开豆包 / DeepSeek，把这段文字发给 AI', '已复制提示词');
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;left:-9999px;top:0;';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) { /* ignore */ }
  document.body.removeChild(ta);
}

/* ---------- 公众号兼容转换 ----------
 * 微信编辑器不支持：CSS 渐变背景 / box-shadow / text-shadow /
 * transform / backdrop-filter / position:absolute / z-index。
 * 复制前自动：渐变转纯色、去掉不支持属性、绝对定位水印数字转行内小标签、
 * 最外层 div 换成 section（公众号对 section 的背景保留最稳）。
 */
function wechatCompatHtml(html) {
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  let converted = false;

  wrap.querySelectorAll('*').forEach(el => {
    const orig = el.getAttribute('style');
    if (!orig) return;
    let st = orig;
    let changed = false;

    // 渐变背景 → 纯色（只从渐变声明内部取第一个 hex 作为主色）
    if (/(linear-gradient|radial-gradient|conic-gradient)/.test(st)) {
      const grad = st.match(/(?:linear-gradient|radial-gradient|conic-gradient)\([^)]*\)/);
      const hex = grad ? grad[0].match(/#[0-9a-fA-F]{6}/) : null;
      st = st.replace(/(?:background(?:-image)?\s*:\s*)[^;]+;?/gi, '');
      st = 'background-color:' + (hex ? hex[0] : '#FFFFFF') + ';' + st;
      changed = true;
      converted = true;
    }

    // 绝对定位的水印数字 → 行内小标签（避免粘贴后错位/丢失）
    if (/\bposition\s*:\s*absolute/.test(st)) {
      st = 'display:inline-block;font-size:13px;font-weight:700;opacity:.55;margin-right:8px;vertical-align:middle;';
      changed = true;
    } else {
      const cleaned = st
        .replace(/box-shadow:[^;]+;?/g, '')
        .replace(/text-shadow:[^;]+;?/g, '')
        .replace(/backdrop-filter:[^;]+;?/g, '')
        .replace(/-webkit-backdrop-filter:[^;]+;?/g, '')
        .replace(/transform:[^;]+;?/g, '')
        .replace(/\bposition\s*:\s*(?:relative|static)\s*;?/g, '')
        .replace(/z-index:[^;]+;?/g, '')
        .replace(/\s*;\s*;/g, ';')
        .replace(/;\s*$/, '')
        .trim();
      if (cleaned !== orig) { st = cleaned; changed = true; }
    }
    if (changed) el.setAttribute('style', st);
  });

  // 最外层 div → section
  const first = wrap.firstElementChild;
  if (first && first.tagName === 'DIV') {
    const sec = document.createElement('section');
    const st = first.getAttribute('style');
    if (st) sec.setAttribute('style', st);
    while (first.firstChild) sec.appendChild(first.firstChild);
    first.replaceWith(sec);
  }
  return { html: wrap.innerHTML, converted };
}

/* ---------- 复制到平台 ---------- */
async function copyToClipboard() {
  const preview = document.getElementById('previewArea');
  if (preview.innerHTML.includes('placeholder')) { showToast('请先在右侧输入内容', '还没有内容'); return; }
  const compat = wechatCompatHtml(preview.innerHTML);
  const html = compat.html;
  const plain = preview.innerText;
  const label = PLATFORM_CONFIG[currentPlatform].label;
  const done = () => showToast(
    '已复制排版内容，直接粘贴到' + label + '后台即可' + (compat.converted ? '（渐变背景已自动转为纯色）' : ''),
    '复制成功');

  if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([plain], { type: 'text/plain' })
        })
      ]);
      done();
      return;
    } catch (e) { /* fallback */ }
  }
  try {
    const div = document.createElement('div');
    div.innerHTML = html;
    div.style.cssText = 'position:fixed;left:-9999px;top:0;user-select:text;';
    document.body.appendChild(div);
    const range = document.createRange();
    range.selectNodeContents(div);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    const ok = document.execCommand('copy');
    sel.removeAllRanges();
    document.body.removeChild(div);
    if (ok) { done(); return; }
  } catch (e) { /* fallback */ }
  fallbackCopy(plain);
  done();
}
