/**
 * app.js — 鲸鱼排版小工具 交互层（Canva 式三栏编辑器）
 * 左:模板库(搜索/分类/缩略图) · 中:画布(缩放/平台画框) · 右:编辑(文本/导出/复制)
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
  xhs: makeCategoryResolver({
    '温柔治愈': 'gentle-healing',
    '清爽简约': 'clean-minimal',
    '可爱少女': 'cute-girl',
    '复古胶片': 'retro-film',
    '个性潮流': 'trendy',
    '知识干货': 'knowledge'
  }, ['gentle-healing', 'clean-minimal', 'cute-girl', 'retro-film', 'trendy', 'knowledge'])
};
PLATFORM_CONFIG.wechat.label = '公众号';
PLATFORM_CONFIG.xhs.label = '小红书';

const MINI_SAMPLE = '一、标题样式示例\n（一）小标题样式\n这是用于模板预览的正文文字，用来展示段落与层级效果。\n- 列表项目示例';

const RISK_WORDS = ['最', '第一', '顶级', '国家级', '绝对', '唯一', '百分之百', '百分百', '全网最低', '史上最', '世界领先', '全球第一', '最好', '最佳', '极致', '无敌', '疗效', '根治', '治愈', '减肥', '美白', '祛痘', '丰胸', '壮阳', '抗癌', '防癌', '降血糖', '降血压', '治疗', '包治', '药到病除', '无效退款', '免费领取', '点击领取', '加微信', '微信号', '二维码', '转账', '收款', '返现', '刷单', '代购', '正品保证', '官方认证', '央视', '人民日报', '国家免检', '纯天然', '无副作用', '快速见效', '立竿见影', '秒杀', '特价'];


/* ---------- 文字样式（字体 / 字号 / 间距） ---------- */
const TYPE_DEFAULTS = { font: 'default', baseSize: 15, lineHeight: 1.8, letterSpacing: 0.3, h1Size: 21, paraMargin: 12, align: 'justify', textColor: '' };
let TYPE = Object.assign({}, TYPE_DEFAULTS);

const FONT_MAP = {
  default: '',
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
  yahei: '"Microsoft YaHei", "PingFang SC", sans-serif',
  serif: 'Georgia, "Times New Roman", "Songti SC", "SimSun", serif',
  kai: '"KaiTi", "STKaiti", "Kaiti SC", serif',
  fangsong: '"FangSong", "STFangsong", serif',
  mono: '"SF Mono", Consolas, "Courier New", monospace'
};

// 在模板样式末尾追加覆盖声明（后声明者生效），实现实时排版微调
function applyTypeOverrides(style) {
  const s = Object.assign({}, style);
  const font = FONT_MAP[TYPE.font] || '';
  const o = {};
  o.container = (font ? 'font-family:' + font + ';' : '') + 'font-size:' + TYPE.baseSize + 'px;line-height:' + TYPE.lineHeight + ';letter-spacing:' + TYPE.letterSpacing + 'px;';
  o.paragraph = 'font-size:' + TYPE.baseSize + 'px;line-height:' + TYPE.lineHeight + ';letter-spacing:' + TYPE.letterSpacing + 'px;margin:' + TYPE.paraMargin + 'px 0;text-align:' + TYPE.align + ';' + (TYPE.textColor ? 'color:' + TYPE.textColor + ';' : '');
  o.h1 = 'font-size:' + TYPE.h1Size + 'px;line-height:' + TYPE.lineHeight + ';letter-spacing:' + (Math.round((TYPE.letterSpacing + 0.2) * 10) / 10) + 'px;';
  o.h2 = 'font-size:' + Math.max(14, Math.round(TYPE.h1Size * 0.86)) + 'px;line-height:' + TYPE.lineHeight + ';letter-spacing:' + TYPE.letterSpacing + 'px;';
  o.h3 = 'font-size:' + Math.max(13, Math.round(TYPE.h1Size * 0.76)) + 'px;line-height:' + TYPE.lineHeight + ';letter-spacing:' + TYPE.letterSpacing + 'px;';
  o.listItem = 'font-size:' + TYPE.baseSize + 'px;line-height:' + TYPE.lineHeight + ';letter-spacing:' + TYPE.letterSpacing + 'px;';
  o.listMarker = 'font-size:' + Math.max(10, Math.round(TYPE.baseSize * 0.9)) + 'px;';
  o.spacing = 'height:' + Math.max(6, Math.round(TYPE.baseSize * 0.75)) + 'px;';
  Object.keys(o).forEach(k => { s[k] = (s[k] || '') + o[k]; });
  return s;
}

function getCurrentStyle() {
  return applyTypeOverrides(getTemplateStyle(currentTemplate));
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
    onTypeChange();
  });

  document.querySelectorAll('.stepper button').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const d = parseFloat(btn.dataset.d);
      const step = (key === 'lineHeight' || key === 'letterSpacing') ? 0.1 : 1;
      let v = Math.round((TYPE[key] + d * step) * 10) / 10;
      if (key === 'lineHeight') v = Math.min(2.6, Math.max(1.3, v));
      if (key === 'letterSpacing') v = Math.min(2, Math.max(0, v));
      if (key === 'baseSize') v = Math.min(20, Math.max(12, Math.round(v)));
      if (key === 'h1Size') v = Math.min(30, Math.max(16, Math.round(v)));
      if (key === 'paraMargin') v = Math.min(30, Math.max(4, Math.round(v)));
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
      TYPE.textColor = chip.dataset.color || '';
      onTypeChange();
    });
  });

  document.getElementById('typeReset').addEventListener('click', () => {
    TYPE = Object.assign({}, TYPE_DEFAULTS);
    onTypeChange();
  });

  syncTypeUI();
}

function onTypeChange() {
  syncTypeUI();
  formatText();
}

function syncTypeUI() {
  document.getElementById('v-baseSize').textContent = TYPE.baseSize + 'px';
  document.getElementById('v-h1Size').textContent = TYPE.h1Size + 'px';
  document.getElementById('v-lineHeight').textContent = TYPE.lineHeight.toFixed(1);
  document.getElementById('v-letterSpacing').textContent = TYPE.letterSpacing.toFixed(1) + 'px';
  document.getElementById('v-paraMargin').textContent = TYPE.paraMargin + 'px';
  document.getElementById('typeFont').value = TYPE.font;
  document.querySelectorAll('.seg2 button').forEach(b => b.classList.toggle('on', b.dataset.align === TYPE.align));
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', (c.dataset.color || '') === TYPE.textColor));
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
  initPlatformSwitch();
  initAccordion();
  initTypePanel();
  initZoom();
  buildTemplateGallery();
  initEvents();
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

/* ---------- 平台切换 ---------- */
function initPlatformSwitch() {
  document.querySelectorAll('.seg-btn').forEach(btn => {
    btn.addEventListener('click', () => switchPlatform(btn.dataset.platform));
  });
}

function switchPlatform(platform) {
  if (currentPlatform === platform) return;
  currentPlatform = platform;
  const idx = Array.from(document.querySelectorAll('.seg-btn')).findIndex(b => b.dataset.platform === platform);
  document.querySelector('.seg-bg').style.transform = 'translateX(' + (idx * 100) + '%)';
  document.querySelectorAll('.seg-btn').forEach((b, i) => b.classList.toggle('active', i === idx));

  document.getElementById('platformTag').textContent = PLATFORM_CONFIG[platform].label;
  document.getElementById('copyBtnText').textContent = '复制到' + PLATFORM_CONFIG[platform].label;
  document.getElementById('copyFootText').textContent = '复制到' + PLATFORM_CONFIG[platform].label;
  document.getElementById('exportBtn').hidden = platform !== 'xhs';
  document.getElementById('page').classList.toggle('xhs', platform === 'xhs');

  currentCategory = null;
  currentTemplate = null;
  buildTemplateGallery();
  formatText();
  checkRiskWords();
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

  const mini = document.createElement('div');
  mini.className = 'tpl-mini';
  const inner = document.createElement('div');
  inner.className = 'tpl-mini-inner';
  inner.innerHTML = parseAndFormat(MINI_SAMPLE, t.style);
  mini.appendChild(inner);

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

/* ---------- 预览 ---------- */
function formatText() {
  const input = document.getElementById('inputText');
  const preview = document.getElementById('previewArea');
  if (!input.value.trim()) {
    preview.innerHTML = '<p class="placeholder">在右侧输入内容，<b>这里实时预览排版效果</b></p>';
    return;
  }
  preview.innerHTML = parseAndFormat(input.value, getCurrentStyle());
  preview.classList.remove('flash');
  void preview.offsetWidth;
  preview.classList.add('flash');
}

/* ---------- 事件 ---------- */
function initEvents() {
  const input = document.getElementById('inputText');
  input.addEventListener('input', () => { formatText(); updateWordCount(); checkRiskWords(); });

  document.getElementById('clearBtn').addEventListener('click', clearInput);
  document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
  document.getElementById('copyFootBtn').addEventListener('click', copyToClipboard);
  document.getElementById('copyPromptBtn').addEventListener('click', copyPrompt);
  document.getElementById('exportBtn').addEventListener('click', exportXhsImages);

  document.getElementById('sourceToggle').addEventListener('click', () => {
    const src = document.getElementById('sourceArea');
    const prev = document.getElementById('previewArea');
    const visible = !src.hidden;
    src.hidden = visible;
    prev.style.display = visible ? '' : 'none';
    if (!visible) document.getElementById('sourceText').value = prev.innerHTML;
  });

  document.getElementById('tplSearch').addEventListener('input', () => renderTemplateGrid(currentCategory));

  // 快捷键：Ctrl / Cmd + Enter 一键复制
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      copyToClipboard();
    }
  });

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
  if (currentPlatform !== 'xhs') { banner.hidden = true; return; }
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

/* ---------- 复制到平台 ---------- */
async function copyToClipboard() {
  const preview = document.getElementById('previewArea');
  const html = preview.innerHTML;
  if (html.includes('placeholder')) { showToast('请先在右侧输入内容', '还没有内容'); return; }
  const plain = preview.innerText;
  const label = PLATFORM_CONFIG[currentPlatform].label;
  const done = () => showToast('已复制排版内容，直接粘贴到' + label + '后台即可', '复制成功');

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

/* =========================================================
   小红书多图导出（长文分页 → 3:4 PNG）
   ========================================================= */
const XHS_EXPORT = {
  W: 750, H: 1000, M: 56,
  BLOCK_STYLE: {
    h1: { font: '800 32px "PingFang SC","Microsoft YaHei","Segoe UI Emoji",sans-serif', lh: 50, padB: 20, padT: 14 },
    h2: { font: '700 28px "PingFang SC","Microsoft YaHei","Segoe UI Emoji",sans-serif', lh: 44, padB: 14, padT: 0 },
    h3: { font: '700 25px "PingFang SC","Microsoft YaHei","Segoe UI Emoji",sans-serif', lh: 40, padB: 10, padT: 0 },
    p:  { font: '400 22px "PingFang SC","Microsoft YaHei","Segoe UI Emoji",sans-serif', lh: 40, padB: 12, padT: 0 },
    li: { font: '400 22px "PingFang SC","Microsoft YaHei","Segoe UI Emoji",sans-serif', lh: 40, padB: 10, padT: 0 },
    sp: { font: '400 16px sans-serif', lh: 20, padB: 0, padT: 0 }
  },
  toBlocks(text) {
    const blocks = [];
    text.split('\n').forEach(raw => {
      const line = raw.trim();
      if (!line) { blocks.push({ type: 'sp' }); return; }
      if (/^[一二三四五六七八九十百千]+[、.．]/.test(line)) blocks.push({ type: 'h1', text: line });
      else if (/^[（(][一二三四五六七八九十百千]+[）)]/.test(line)) blocks.push({ type: 'h2', text: line });
      else if (/^\d+[、.．]/.test(line)) blocks.push({ type: 'h3', text: line });
      else if (/^[-–—]/.test(line)) blocks.push({ type: 'li', text: line.replace(/^[-–—]\s*/, '') });
      else blocks.push({ type: 'p', text: line });
    });
    return blocks;
  },
  wrap(ctx, text, maxW) {
    const lines = [];
    let line = '';
    for (const ch of text) {
      if (ctx.measureText(line + ch).width > maxW && line) { lines.push(line); line = ch; }
      else line += ch;
    }
    if (line) lines.push(line);
    return lines;
  },
  measure(ctx, b, maxW) {
    if (b.type === 'sp') return [];
    ctx.font = XHS_EXPORT.BLOCK_STYLE[b.type].font;
    return XHS_EXPORT.wrap(ctx, b.text, maxW);
  },
  blockHeight(b, lines) {
    const s = XHS_EXPORT.BLOCK_STYLE[b.type] || XHS_EXPORT.BLOCK_STYLE.p;
    return s.padT + Math.max(lines.length, 1) * s.lh + s.padB;
  },
  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  },
  draw(ctx, b, lines, o) {
    const s = XHS_EXPORT.BLOCK_STYLE[b.type] || XHS_EXPORT.BLOCK_STYLE.p;
    ctx.font = s.font;
    const n = Math.max(lines.length, 1);
    if (b.type === 'h1') {
      const h = s.padT + n * s.lh + s.padB;
      ctx.fillStyle = o.accent;
      XHS_EXPORT.roundRect(ctx, o.M - 12, o.y, o.W - 2 * (o.M - 12), h, 22);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      let ty = o.y + s.padT + s.lh * 0.72;
      lines.forEach(ln => { ctx.fillText(ln, o.W / 2, ty); ty += s.lh; });
      ctx.textAlign = 'left';
    } else if (b.type === 'h2') {
      ctx.fillStyle = o.accent;
      XHS_EXPORT.roundRect(ctx, o.M, o.y + 5, 8, n * s.lh - 12, 4);
      ctx.fill();
      ctx.fillStyle = o.accent;
      let ty = o.y + s.lh * 0.72;
      lines.forEach(ln => { ctx.fillText(ln, o.M + 24, ty); ty += s.lh; });
    } else if (b.type === 'h3') {
      ctx.fillStyle = o.accent;
      XHS_EXPORT.roundRect(ctx, o.M, o.y + 7, 14, 5, 2);
      ctx.fill();
      ctx.fillStyle = o.accent;
      let ty = o.y + s.lh * 0.72;
      lines.forEach(ln => { ctx.fillText(ln, o.M + 28, ty); ty += s.lh; });
    } else if (b.type === 'li') {
      let ty = o.y + s.lh * 0.72;
      lines.forEach(ln => {
        ctx.fillStyle = o.accent;
        ctx.fillText('\u25CF', o.M, ty);
        ctx.fillStyle = o.tcol;
        ctx.fillText(ln, o.M + 36, ty);
        ty += s.lh;
      });
    } else {
      ctx.fillStyle = o.tcol;
      let ty = o.y + s.lh * 0.72;
      lines.forEach(ln => { ctx.fillText(ln, o.M, ty); ty += s.lh; });
    }
  }
};

function extractAccent(style) {
  const m = String(style.h1 || '').match(/#[0-9a-fA-F]{6}/g);
  return m && m.length ? '#' + m[0].replace('#', '').toUpperCase() : '#7C3AED';
}

function exportXhsImages() {
  const text = document.getElementById('inputText').value;
  if (!text.trim()) { showToast('请先在右侧输入内容', '还没有内容'); return; }

  const style = getTemplateStyle(currentTemplate);
  const accent = extractAccent(style);
  const E = XHS_EXPORT;
  const maxW = E.W - 2 * E.M;
  const blocks = E.toBlocks(text);
  const isDark = /linear-gradient|#(0|1|2)[0-9a-fA-F]{5}/.test(style.container);
  const tcol = isDark ? '#E2E8F0' : '#3F4550';
  const bg = isDark ? '#0F1115' : '#FFFFFF';

  const scratch = document.createElement('canvas');
  const sctx = scratch.getContext('2d');
  const pages = [];
  let canvas, ctx, y;

  const newPage = () => {
    canvas = document.createElement('canvas');
    canvas.width = E.W; canvas.height = E.H;
    ctx = canvas.getContext('2d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, E.W, E.H);
    ctx.font = '600 19px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillStyle = typeof hexToRgba === 'function' ? hexToRgba(accent, 0.4) : 'rgba(124,58,237,0.4)';
    ctx.textAlign = 'center';
    ctx.fillText('鲸鱼排版 · 小红书排版', E.W / 2, 42);
    ctx.textAlign = 'left';
    y = E.M + 16;
    pages.push(canvas);
  };

  newPage();
  for (const b of blocks) {
    const lines = E.measure(sctx, b, maxW);
    const h = E.blockHeight(b, lines);
    if (b.type !== 'sp' && y + h > E.H - E.M && pages.length < 30) newPage();
    E.draw(ctx, b, lines, { M: E.M, W: E.W, accent, tcol });
    y += h;
  }

  pages.forEach((c, i) => {
    c.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '\u5C0F\u7EA2\u4E66\u7B14\u8BB0-' + (i + 1) + '.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    }, 'image/png');
  });
  showToast('已导出 ' + pages.length + ' 张图片，请在下载列表查收', '导出完成');
}

