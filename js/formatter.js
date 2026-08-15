/**
 * formatter.js — 纯函数：解析文本并生成公众号可用的内联样式 HTML
 * 不依赖 DOM，可在 Node 中直接测试。
 */

// 转义 style 值中的双引号，防止破坏 HTML 属性解析
function safeStyle(styleStr) {
    return styleStr ? styleStr.replace(/"/g, '&quot;') : '';
}

// HTML 转义
function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// 选区格式标记渲染：⟦s=18;c=#DC2626;f=kai;b=1⟧文字⟦/⟧ → <span style="...">文字</span>
// 支持属性：s=字号(px) / c=颜色 / f=字体(键) / b=加粗
const INLINE_FONT_MAP = {
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
function renderInline(escaped) {
    return String(escaped).replace(/⟦([^⟧]*)⟧([^<>]*?)⟦\/⟧/g, function (m, props, inner) {
        const p = {};
        String(props).split(';').forEach(function (kv) {
            const idx = kv.indexOf('=');
            if (idx > 0) p[kv.slice(0, idx).trim()] = kv.slice(idx + 1).trim();
        });
        let css = '';
        if (p.s) css += 'font-size:' + p.s + 'px;';
        if (p.c) css += 'color:' + p.c + ';';
        if (p.fc) css += 'font-family:"' + String(p.fc).replace(/"/g, '') + '", -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;';
        else if (p.f && INLINE_FONT_MAP[p.f]) css += 'font-family:' + INLINE_FONT_MAP[p.f] + ';';
        if (p.b) css += 'font-weight:700;';
        if (p.i) css += 'font-style:italic;';
        if (p.u) css += 'text-decoration:underline;';
        return '<span style="' + safeStyle(css) + '">' + inner + '</span>';
    });
}

// 默认后备样式
function getDefaultStyle() {
    return {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.75; color: #333333; font-size: 16px; padding: 20px; background: #ffffff;',
        h1: 'font-size: 20px; font-weight: bold; color: #2c3e50; margin: 20px 0 12px 0; padding-left: 12px; border-left: 4px solid #3498db; line-height: 1.6;',
        title: 'font-size: 24px; font-weight: 800; color: #2c3e50; margin: 4px 0 18px 0; line-height: 1.45; letter-spacing: 0.5px;',
        h2: 'font-size: 18px; font-weight: bold; color: #34495e; margin: 16px 0 10px 0; padding-left: 10px; border-left: 3px solid #1abc9c; line-height: 1.6;',
        h3: 'font-size: 16px; font-weight: bold; color: #555555; margin: 14px 0 8px 0; padding-left: 8px; border-left: 2px solid #95a5a6; line-height: 1.6;',
        paragraph: 'font-size: 15px; color: #333333; line-height: 1.8; margin: 10px 0; text-align: justify;',
        listContainer: 'margin: 10px 0; padding: 12px; background: #f8f9fa; border-radius: 6px;',
        listItem: 'font-size: 15px; color: #333333; line-height: 1.8; margin: 6px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #3498db; margin-right: 8px; font-size: 14px; flex-shrink: 0;',
        spacing: 'height: 10px;',
        quote: 'margin: 16px 0; padding: 12px 16px; border-left: 4px solid #9ca3af; background: #f3f4f6; color: #374151; line-height: 1.9; font-size: 14.5px;',
        divider: 'margin: 20px 0; border-top: 1px solid #d1d5db;',
        dividerDashed: 'margin: 20px 0; border-top: 2px dashed #cbd5e1;',
        dividerDotted: 'margin: 20px 0; border-top: 2px dotted #cbd5e1;'
    };
}

/**
 * 解析并格式化文本
 * 规则：
 *   首行短句(非编号/无句末标点/后面有正文) → 文章主标题 (h1)
 *   # / ## / ###      → 主标题 / 一级 / 二级标题
 *   **加粗** 独立行    → 一级标题
 *   第X章 / Part N    → 一级标题
 *   一、二、三…        → 一级标题 (h2)
 *   （一）（二）       → 二级标题 (h3)，可带序号水印
 *   1、2、3…          → 三级标题 (h4)
 *   - 开头            → 列表项 (ul/li)
 *   > 开头            → 引用块 (blockquote)
 *   --- / *** 单独行   → 分隔线
 *   独立短句(前后有空行等) → 自动识别为小标题 (h2)
 *   空行              → 间距分隔
 *   其余              → 普通段落 (p)
 */

const RE_TITLE_NUM = /^[一二三四五六七八九十百千]+[、.．]/;
const RE_SUB_NUM = /^[（(][一二三四五六七八九十百千]+[）)]/;
const RE_ORDER_NUM = /^\d+[、.．]/;
const RE_LIST = /^[-*+\u2022\u2013\u2014]/;
const RE_CHAPTER = /^第[一二三四五六七八九十百千0-9]+[章节部分篇]/;
const RE_PART = /^(Part|Chapter|Section)\s*\d+/i;
const RE_MD_HEADING = /^(#{1,6})\s*(.+)$/;
const RE_BOLD_LINE = /^\*\*(.+)\*\*$/;
const RE_END_PUNCT = /[。！？!?…；;，,：:]$/;
const RE_META = /^(作者|编辑|文|图|来源|转载|日期|时间|公众号|微信|ID|原创)[：:]/;
const RE_LIST_ITEM = /^[-*+\u2022\u2013\u2014]\s*/;
const RE_QUOTE = /^>\s*/;
const RE_DIVIDER = /^[-=_*]{3,}$/;
const RE_DIVIDER_ALT = /^[─—~.·┄┅┈╌〰━]{2,}$/;

// 文章主标题候选：首行短句（非编号、非列表、无句末标点、后面还有正文）
function isLikelyTitle(line, lines, i) {
    const t = line.trim();
    if (t.length < 2 || t.length > 40) return false;
    if (RE_TITLE_NUM.test(t) || RE_SUB_NUM.test(t) || RE_ORDER_NUM.test(t) || RE_LIST.test(t)) return false;
    if (RE_CHAPTER.test(t) || RE_PART.test(t) || RE_MD_HEADING.test(t) || RE_BOLD_LINE.test(t)) return false;
    if (RE_META.test(t) || RE_END_PUNCT.test(t)) return false;
    for (let k = i + 1; k < lines.length; k++) {
        if (lines[k].trim()) return true;
    }
    return false;
}

// 独立短句 → 小标题：4~30字、非编号/列表、无句末标点，且前面有空行/紧接标题，或短行后紧跟长正文
function isSubHeadingLine(line, lines, i, prevBlank, prevWasHeading) {
    const t = line.trim();
    if (t.length < 4 || t.length > 30) return false;
    if (RE_TITLE_NUM.test(t) || RE_SUB_NUM.test(t) || RE_ORDER_NUM.test(t) || RE_LIST.test(t)) return false;
    if (RE_CHAPTER.test(t) || RE_PART.test(t) || RE_MD_HEADING.test(t) || RE_BOLD_LINE.test(t)) return false;
    if (RE_META.test(t) || RE_END_PUNCT.test(t)) return false;
    let standalone = prevBlank || prevWasHeading;
    if (!standalone) {
        for (let k = i + 1; k < lines.length; k++) {
            const n = lines[k].trim();
            if (n) {
                if (t.length <= 20 && n.length > 34) standalone = true;
                break;
            }
        }
    }
    if (!standalone) return false;
    for (let k = i + 1; k < lines.length; k++) {
        if (lines[k].trim()) return true;
    }
    return false;
}

function parseAndFormat(text, style) {
    const lines = String(text || '').split('\n');
    let html = '<div style="' + safeStyle(style.container) + '">';
    let inList = false;
    let h2Counter = 0;
    let h1Counter = 0;
    let firstContentDone = false;
    let prevBlank = true;
    let prevWasHeading = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // 空行处理
        if (!trimmedLine) {
            if (inList) { html += '</ul>'; inList = false; }
            const spacingContent = style.spacingContent || '';
            html += '<div style="' + safeStyle(style.spacing) + '">' + spacingContent + '</div>';
            prevBlank = true;
            prevWasHeading = false;
            continue;
        }

        let wasHeading = false;
        let rendered = false;

        // 分隔线：单独一行 --- / *** / ___ / ─── / ~~~~ / ┄┄┄ …
        if (!rendered && (RE_DIVIDER.test(trimmedLine) || RE_DIVIDER_ALT.test(trimmedLine))) {
            if (inList) { html += '</ul>'; inList = false; }
            let dkey = 'divider';
            if (/[~〰·.]/.test(trimmedLine)) dkey = 'dividerDotted';
            else if (/[┄┅┈╌━]/.test(trimmedLine)) dkey = 'dividerDashed';
            const ds = style[dkey] || getDefaultStyle()[dkey] || style.divider || '';
            html += '<div style="' + safeStyle(ds) + '"></div>';
            rendered = true;
            wasHeading = false;
        }

        // 引用：> 开头
        if (!rendered && RE_QUOTE.test(trimmedLine)) {
            if (inList) { html += '</ul>'; inList = false; }
            html += '<blockquote style="' + safeStyle(style.quote) + '">' + escapeHtml(trimmedLine.replace(RE_QUOTE, '')) + '</blockquote>';
            rendered = true;
            wasHeading = false;
        }

        // Markdown 标题：# / ## / ### → 主标题 / 一级 / 二级
        let m = trimmedLine.match(RE_MD_HEADING);
        if (!rendered && m && m[2]) {
            if (inList) { html += '</ul>'; inList = false; }
            const lv = m[1].length;
            const tag = lv <= 1 ? 'h1' : (lv === 2 ? 'h2' : 'h3');
            const skey = lv <= 1 ? (style.title || style.h1) : (lv === 2 ? style.h1 : style.h2);
            html += '<' + tag + ' style="' + safeStyle(skey) + '">' + escapeHtml(m[2].trim()) + '</' + tag + '>';
            rendered = true;
            wasHeading = true;
        }

        // **加粗** 独立行 → 一级标题
        if (!rendered) {
            m = trimmedLine.match(RE_BOLD_LINE);
            if (m) {
                if (inList) { html += '</ul>'; inList = false; }
                html += '<h2 style="' + safeStyle(style.h1) + '">' + escapeHtml(m[1].trim()) + '</h2>';
                rendered = true;
                wasHeading = true;
            }
        }

        // 第X章 / Part N → 一级标题
        if (!rendered && (RE_CHAPTER.test(trimmedLine) || RE_PART.test(trimmedLine))) {
            if (inList) { html += '</ul>'; inList = false; }
            const h1Content = (style.h1Prefix || '') + escapeHtml(trimmedLine) + (style.h1Suffix || '');
            html += '<h2 style="' + safeStyle(style.h1) + '">' + h1Content + '</h2>';
            rendered = true;
            wasHeading = true;
        }

        // 文章主标题：首行短句
        if (!rendered && !firstContentDone && isLikelyTitle(trimmedLine, lines, i)) {
            firstContentDone = true;
            if (inList) { html += '</ul>'; inList = false; }
            const titleStyle = style.title || style.h1 || '';
            html += '<h1 style="' + safeStyle(titleStyle) + '">' + escapeHtml(trimmedLine) + '</h1>';
            rendered = true;
            wasHeading = true;
        }
        firstContentDone = true;

        // 一级标题：一、二、三…
        if (!rendered && RE_TITLE_NUM.test(trimmedLine)) {
            if (inList) { html += '</ul>'; inList = false; }
            h1Counter++;
            const h1Content = (style.h1Prefix || '') + escapeHtml(trimmedLine) + (style.h1Suffix || '');
            if (style.h1NumberWatermark && style.h1NumberStyle) {
                const paddedNumber = String(h1Counter).padStart(2, '0');
                html += '<h2 style="' + safeStyle(style.h1) + '">' +
                    '<span style="' + safeStyle(style.h1NumberStyle) + '">' + paddedNumber + '</span>' +
                    '<span style="position: relative; z-index: 1;">' + h1Content + '</span>' +
                    '</h2>';
            } else {
                html += '<h2 style="' + safeStyle(style.h1) + '">' + h1Content + '</h2>';
            }
            rendered = true;
            wasHeading = true;
        }

        // 二级标题：（一）（二）…
        if (!rendered && RE_SUB_NUM.test(trimmedLine)) {
            if (inList) { html += '</ul>'; inList = false; }
            h2Counter++;
            const h2Content = (style.h2Prefix || '') + escapeHtml(trimmedLine) + (style.h2Suffix || '');

            if (style.h2NumberWatermark && style.h2NumberStyle) {
                const paddedNumber = String(h2Counter).padStart(2, '0');
                html += '<h3 style="' + safeStyle(style.h2) + '">' +
                    '<span style="' + safeStyle(style.h2NumberStyle) + '">' + paddedNumber + '</span>' +
                    '<span style="position: relative; z-index: 1;">' + h2Content + '</span>' +
                    '</h3>';
            } else {
                html += '<h3 style="' + safeStyle(style.h2) + '">' + h2Content + '</h3>';
            }
            rendered = true;
            wasHeading = true;
        }

        // 三级标题：1、2、3…
        if (!rendered && RE_ORDER_NUM.test(trimmedLine)) {
            if (inList) { html += '</ul>'; inList = false; }
            const h3Content = (style.h3Prefix || '') + escapeHtml(trimmedLine) + (style.h3Suffix || '');
            html += '<h4 style="' + safeStyle(style.h3) + '">' + h3Content + '</h4>';
            rendered = true;
            wasHeading = true;
        }

        // 列表项：- 开头
        if (!rendered && RE_LIST.test(trimmedLine)) {
            if (!inList) {
                html += '<ul style="' + safeStyle(style.listContainer) + '">';
                inList = true;
            }
            const listContent = trimmedLine.replace(RE_LIST_ITEM, '');
            const markerContent = style.listMarkerContent || '\u2022';
            html += '<li style="' + safeStyle(style.listItem) + '">' +
                '<span style="' + safeStyle(style.listMarker) + '">' + markerContent + '</span>' +
                '<span>' + escapeHtml(listContent) + '</span>' +
                '</li>';
            rendered = true;
        }

        // 独立短句 → 自动识别为小标题
        if (!rendered && isSubHeadingLine(trimmedLine, lines, i, prevBlank, prevWasHeading)) {
            if (inList) { html += '</ul>'; inList = false; }
            const h1Content = (style.h1Prefix || '') + escapeHtml(trimmedLine) + (style.h1Suffix || '');
            html += '<h2 style="' + safeStyle(style.h1) + '">' + h1Content + '</h2>';
            rendered = true;
            wasHeading = true;
        }

        // 普通段落
        if (!rendered) {
            if (inList) { html += '</ul>'; inList = false; }
            html += '<p style="' + safeStyle(style.paragraph) + '">' + escapeHtml(trimmedLine) + '</p>';
        }

        prevBlank = false;
        prevWasHeading = wasHeading;
    }

    if (inList) { html += '</ul>'; }
    html += '</div>';
    return renderInline(html);
}

// 导出到全局（浏览器）
if (typeof window !== 'undefined') {
    window.parseAndFormat = parseAndFormat;
    window.getDefaultStyle = getDefaultStyle;
}
