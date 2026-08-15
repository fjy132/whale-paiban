/**
 * templates.js — 模板注册器 + 原创模板库（公众号专用）
 * 每个模板是一组内联样式，直接输出公众号编辑器兼容的 HTML。
 */

const TEMPLATE_LOADER = {
    templates: {},
    register(template) {
        if (template && template.id) this.templates[template.id] = template;
    },
    registerBatch(list) {
        list.forEach(t => this.register(t));
    },
    get(id) {
        return this.templates[id] || null;
    },
    getStyle(id) {
        const t = this.get(id);
        return t ? t.style : null;
    },
    getAll() {
        return this.templates;
    },
    getByCategory(category) {
        return Object.values(this.templates).filter(t => t.category === category);
    }
};

const ALL_TEMPLATES = [];


// =========================================================
// 模板生成引擎：10 种版式 × 调色板 → 批量产出模板
// =========================================================

function hexToRgba(hex, a) {
    const h = String(hex).replace('#', '');
    const n = parseInt(h, 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

const F_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const F_SERIF = 'Georgia, "Times New Roman", "Songti SC", "SimSun", serif';

const GEN_ARCHETYPES = {

    // 1. 渐变主标题
    gradientHero(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 1.85; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 24px 20px;`,
            h1Prefix: p.emoji ? p.emoji + ' ' : '',
            h1: `font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, ${p.c1} 0%, ${p.c2} 100%); border-radius: ${p.radius || 12}px; text-align: center; letter-spacing: 1px; box-shadow: 0 8px 20px ${hexToRgba(p.c1, 0.28)};`,
            h2: `font-size: 18px; font-weight: 800; color: ${a}; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: ${hexToRgba(a, 0.08)}; border-left: 5px solid ${a}; border-radius: 8px; letter-spacing: 0.4px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${a}; margin: 16px 0 10px 0; line-height: 1.5; padding-left: 10px; border-left: 3px solid ${hexToRgba(a, 0.35)}; letter-spacing: 0.3px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 1.95; margin: 12px 0; text-align: justify;`,
            listContainer: `margin: 16px 0; padding: 16px 18px; background: ${hexToRgba(a, 0.06)}; border-radius: 10px; border: 1px solid ${hexToRgba(a, 0.22)};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarker: `color: ${a}; margin-right: 10px; font-weight: 800; flex-shrink: 0;`,
            spacing: 'height: 12px;'
        };
    },

    // 2. 纯色块标题
    solidBlock(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 1.85; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 24px 20px;`,
            h1: `font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 15px 20px; background: ${p.c1}; border-radius: 8px; text-align: center; letter-spacing: 1px; box-shadow: 0 6px 16px ${hexToRgba(p.c1, 0.25)};`,
            h2: `font-size: 18px; font-weight: 800; color: ${a}; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: ${hexToRgba(a, 0.1)}; border-radius: 8px; letter-spacing: 0.4px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${a}; margin: 16px 0 10px 0; line-height: 1.5; padding-bottom: 6px; border-bottom: 2px solid ${hexToRgba(a, 0.4)}; display: inline-block; letter-spacing: 0.3px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 1.95; margin: 12px 0; text-align: justify;`,
            listContainer: `margin: 16px 0; padding: 16px 18px; background: ${hexToRgba(a, 0.05)}; border-radius: 10px; border: 1px solid ${hexToRgba(a, 0.2)};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarker: `color: ${a}; margin-right: 10px; font-weight: 800; flex-shrink: 0;`,
            spacing: 'height: 12px;'
        };
    },

    // 3. 下划线极简
    underlineMin(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 1.9; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 26px 22px;`,
            h1: `font-size: 24px; font-weight: 800; color: #18181b; margin: 28px 0 16px 0; line-height: 1.5; padding-bottom: 12px; border-bottom: 2px solid ${a}; letter-spacing: 1px;`,
            h2: `font-size: 18px; font-weight: 700; color: #27272a; margin: 20px 0 12px 0; line-height: 1.5; padding-bottom: 8px; border-bottom: 1px solid #e5e5e5; letter-spacing: 0.5px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${a}; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.4px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 14px 0; text-align: justify;`,
            listContainer: `margin: 18px 0; padding: 16px 18px; background: ${p.cardBg || '#fafafa'}; border-radius: 8px; border: 1px solid #eee;`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarker: `color: ${a}; margin-right: 10px; font-weight: 800; flex-shrink: 0;`,
            spacing: 'height: 14px;'
        };
    },

    // 4. 左侧竖条
    leftStripe(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 1.85; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 24px 20px;`,
            h1: `font-size: 22px; font-weight: 800; color: #18181b; margin: 26px 0 16px 0; line-height: 1.5; padding: 6px 0 6px 16px; border-left: 7px solid ${a}; letter-spacing: 0.8px;`,
            h2: `font-size: 18px; font-weight: 700; color: ${a}; margin: 20px 0 12px 0; line-height: 1.5; padding: 4px 0 4px 12px; border-left: 4px solid ${hexToRgba(a, 0.5)}; letter-spacing: 0.4px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${a}; margin: 16px 0 10px 0; line-height: 1.5; padding-left: 8px; border-left: 2px solid ${hexToRgba(a, 0.3)}; letter-spacing: 0.3px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 1.95; margin: 12px 0; text-align: justify;`,
            listContainer: `margin: 16px 0; padding: 16px 18px; background: ${hexToRgba(a, 0.05)}; border-radius: 8px; border-left: 4px solid ${a};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarker: `color: ${a}; margin-right: 10px; font-weight: 800; flex-shrink: 0;`,
            spacing: 'height: 12px;'
        };
    },

    // 5. 柔和胶囊
    softChip(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 1.85; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 24px 20px;`,
            h1Prefix: p.emoji ? p.emoji + ' ' : '',
            h1: `font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 15px 26px; background: linear-gradient(135deg, ${p.c1} 0%, ${p.c2 || p.c1} 100%); border-radius: 999px; text-align: center; letter-spacing: 1px; box-shadow: 0 8px 20px ${hexToRgba(p.c1, 0.28)};`,
            h2: `font-size: 18px; font-weight: 800; color: ${a}; margin: 20px 0 12px 0; line-height: 1.5; padding: 7px 18px; background: ${hexToRgba(a, 0.09)}; border-radius: 999px; display: inline-block; letter-spacing: 0.4px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${a}; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 1.95; margin: 12px 0; text-align: justify;`,
            listContainer: `margin: 16px 0; padding: 16px 18px; background: ${hexToRgba(a, 0.06)}; border-radius: 14px; border: 1px dashed ${hexToRgba(a, 0.3)};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarker: `display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; background: linear-gradient(135deg, ${p.c1}, ${p.c2 || p.c1}); color: #fff; border-radius: 50%; font-size: 11px; font-weight: 700; margin-right: 10px; flex-shrink: 0;`,
            spacing: 'height: 12px;'
        };
    },

    // 6. 深色霓虹
    darkNeon(p) {
        return {
            container: `font-family: ${F_SANS}; line-height: 1.9; color: ${p.text || '#cbd5e1'}; font-size: 15px; background: linear-gradient(160deg, ${p.c1} 0%, ${p.c2} 100%); padding: 28px 22px; border-radius: 12px;`,
            h1Prefix: p.emoji ? p.emoji + ' ' : '',
            h1: `font-size: 23px; font-weight: 800; color: #ffffff; margin: 28px 0 18px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, ${p.g1} 0%, ${p.g2} 100%); border-radius: 10px; text-align: center; letter-spacing: 1px; box-shadow: 0 0 24px ${hexToRgba(p.g1, 0.45)};`,
            h2: `font-size: 18px; font-weight: 700; color: ${p.g1}; margin: 22px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: rgba(255,255,255,0.06); border-left: 4px solid ${p.g1}; border-radius: 0 8px 8px 0; letter-spacing: 0.5px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${p.g2}; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.4px;`,
            paragraph: `font-size: 15px; color: ${p.text || '#cbd5e1'}; line-height: 2; margin: 14px 0; text-align: justify;`,
            listContainer: `margin: 18px 0; padding: 18px 20px; background: rgba(255,255,255,0.05); border-radius: 10px; border: 1px solid ${hexToRgba(p.g1, 0.35)};`,
            listItem: `font-size: 15px; color: ${p.text || '#cbd5e1'}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarker: `color: ${p.g1}; margin-right: 10px; font-weight: 800; flex-shrink: 0;`,
            spacing: 'height: 14px;'
        };
    },

    // 7. 复古纸张
    paperSerif(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SERIF}; line-height: 2; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 28px 24px;`,
            h1: `font-size: 24px; font-weight: 800; color: ${p.c1}; margin: 28px 0 18px 0; line-height: 1.6; padding: 14px 0; border-top: 2px solid ${a}; border-bottom: 2px solid ${a}; text-align: center; letter-spacing: 3px;`,
            h2: `font-size: 19px; font-weight: 700; color: ${p.c1}; margin: 22px 0 12px 0; line-height: 1.6; padding-left: 14px; border-left: 4px solid ${a}; letter-spacing: 1px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${p.c1}; margin: 16px 0 10px 0; line-height: 1.6; letter-spacing: 0.8px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2.1; margin: 14px 0; text-align: justify; letter-spacing: 0.4px;`,
            listContainer: `margin: 18px 0; padding: 18px 20px; background: ${hexToRgba(a, 0.06)}; border-radius: 6px; border: 1px dashed ${hexToRgba(a, 0.3)};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarker: `color: ${a}; margin-right: 10px; font-weight: 800; flex-shrink: 0;`,
            spacing: 'height: 14px;'
        };
    },

    // 8. Emoji 列表
    emojiList(p) {
        return {
            container: `font-family: ${F_SANS}; line-height: 1.85; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 24px 20px;`,
            h1Prefix: (p.h1e || '🎉') + ' ',
            h1: `font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, ${p.c1} 0%, ${p.c2} 100%); border-radius: 14px; text-align: center; letter-spacing: 1px; box-shadow: 0 8px 20px ${hexToRgba(p.c1, 0.25)};`,
            h2Prefix: (p.h2e || '✨') + ' ',
            h2: `font-size: 18px; font-weight: 800; color: ${p.c1}; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: ${hexToRgba(p.c1, 0.07)}; border-radius: 10px; border: 1px dashed ${hexToRgba(p.c1, 0.3)}; letter-spacing: 0.4px;`,
            h3Prefix: (p.h3e || '🔸') + ' ',
            h3: `font-size: 16px; font-weight: 700; color: ${p.c1}; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 1.95; margin: 12px 0; text-align: justify;`,
            listContainer: `margin: 16px 0; padding: 16px 18px; background: ${p.bg}; border-radius: 12px; border: 1px solid ${hexToRgba(p.c1, 0.2)};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: p.marker || '🎈',
            listMarker: `margin-right: 10px; font-size: 15px; flex-shrink: 0;`,
            spacing: 'height: 12px;'
        };
    },

    // 9. 边框画框
    frameBorder(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 1.9; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 26px 22px;`,
            h1: `font-size: 22px; font-weight: 800; color: ${p.c1}; margin: 26px 0 16px 0; line-height: 1.5; padding: 14px 16px; border: 1px solid ${p.c1}; outline: 1px solid ${p.c1}; outline-offset: 3px; text-align: center; letter-spacing: 1px;`,
            h2: `font-size: 18px; font-weight: 700; color: ${p.c1}; margin: 20px 0 12px 0; line-height: 1.5; padding: 8px 14px; border-left: 4px solid ${p.c1}; letter-spacing: 0.5px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${p.c1}; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.4px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 14px 0; text-align: justify;`,
            listContainer: `margin: 18px 0; padding: 18px 20px; background: ${p.cardBg || '#ffffff'}; border: 1px solid ${hexToRgba(a, 0.3)};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarker: `color: ${a}; margin-right: 10px; font-weight: 800; flex-shrink: 0;`,
            spacing: 'height: 14px;'
        };
    },

    // 10. 编号水印
    numbered(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 1.85; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 24px 20px;`,
            h1: `font-size: 22px; font-weight: 800; color: ${p.c1}; margin: 26px 0 16px 0; line-height: 1.5; padding-bottom: 10px; border-bottom: 3px solid ${a}; letter-spacing: 0.5px;`,
            h2NumberWatermark: true,
            h2NumberStyle: `font-size: 36px; font-weight: 800; color: ${hexToRgba(a, 0.14)}; position: absolute; right: 12px; top: 50%; transform: translateY(-50%);`,
            h2: `font-size: 18px; font-weight: 700; color: ${p.c1}; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 56px 10px 16px; background: ${hexToRgba(a, 0.07)}; border-radius: 8px; position: relative; overflow: hidden; letter-spacing: 0.4px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${a}; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 1.95; margin: 12px 0; text-align: justify;`,
            listContainer: `margin: 16px 0; padding: 16px 18px; background: ${hexToRgba(a, 0.05)}; border-radius: 8px; border: 1px solid ${hexToRgba(a, 0.2)};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarker: `color: ${a}; margin-right: 10px; font-weight: 800; flex-shrink: 0;`,
            spacing: 'height: 12px;'
        };
    }
,
// 11. 杂志编辑风（衬线 + 大数字水印 + 双线）
    editorialMag(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SERIF}; line-height: 2; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 30px 26px;`,
            title: `font-size: 26px; font-weight: 800; color: #1f1a17; margin: 4px 0 22px 0; line-height: 1.5; padding-bottom: 14px; border-bottom: 3px double ${a}; letter-spacing: 2px;`,
            h1NumberWatermark: true,
            h1NumberStyle: `position: absolute; left: -8px; top: -16px; font-size: 54px; font-weight: 900; color: ${hexToRgba(a, 0.14)}; z-index: 0; line-height: 1; font-family: Georgia, serif;`,
            h1: `font-size: 21px; font-weight: 800; color: #1f1a17; margin: 30px 0 14px 0; line-height: 1.5; padding-left: 2px; position: relative; letter-spacing: 1.5px;`,
            h2: `font-size: 17px; font-weight: 700; color: ${a}; margin: 22px 0 10px 0; line-height: 1.5; letter-spacing: 2px;`,
            h3: `font-size: 15px; font-weight: 700; color: ${p.text}; margin: 16px 0 8px 0; line-height: 1.6; letter-spacing: 1px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 12px 0; text-align: justify; text-indent: 2em; letter-spacing: 0.3px;`,
            quote: `margin: 16px 0; padding: 12px 18px; border-left: 3px solid ${a}; background: ${hexToRgba(a, 0.06)}; color: ${p.text}; font-style: italic; line-height: 1.9; font-size: 14.5px;`,
            listContainer: `margin: 16px 0; padding: 4px 0 4px 6px;`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 6px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: '◆',
            listMarker: `color: ${a}; margin-right: 12px; font-size: 12px; flex-shrink: 0; margin-top: 8px;`,
            spacing: 'height: 10px;',
            divider: `margin: 20px 0; border-top: 1px solid ${hexToRgba(a, 0.35)};`
        };
    },

    // 12. 瑞士网格（外框 + 细线 + 大数字编号）
    swissGrid(p) {
        const a = p.accent || '#E4002B';
        return {
            container: `font-family: ${F_SANS}; line-height: 1.9; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 28px 24px; border: 1px solid ${a}; box-shadow: 6px 6px 0 ${p.shadow || '#f0f0f0'};`,
            title: `font-size: 25px; font-weight: 800; color: #111; margin: 2px 0 20px 0; line-height: 1.4; letter-spacing: 0px; padding-bottom: 10px; border-bottom: 3px solid #111;`,
            h1NumberWatermark: true,
            h1NumberStyle: `position: absolute; right: 0; top: -8px; font-size: 34px; font-weight: 800; color: ${hexToRgba(a, 0.85)}; z-index: 0; line-height: 1; font-variant-numeric: tabular-nums;`,
            h1: `font-size: 20px; font-weight: 800; color: #111; margin: 26px 0 12px 0; line-height: 1.5; position: relative; padding-right: 44px;`,
            h2: `font-size: 14px; font-weight: 700; color: ${a}; margin: 20px 0 10px 0; line-height: 1.5; letter-spacing: 3px;`,
            h3: `font-size: 15px; font-weight: 700; color: #333; margin: 14px 0 8px 0; line-height: 1.6;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 1.95; margin: 12px 0; text-align: left;`,
            quote: `margin: 16px 0; padding: 12px 16px; border-left: 4px solid ${a}; background: #fafafa; color: #333; line-height: 1.9; font-size: 14.5px;`,
            listContainer: `margin: 16px 0; padding: 14px 16px; border: 1px solid #e5e5e5; background: #fff;`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: '■',
            listMarker: `color: ${a}; margin-right: 12px; font-size: 13px; flex-shrink: 0; margin-top: 5px;`,
            spacing: 'height: 10px;',
            divider: `margin: 20px 0; border-top: 2px solid #111;`
        };
    },
    // 13. 复古报纸（双线框 + 首行缩进）
    newspaper(p) {
        const a = p.accent || '#8a6532';
        return {
            container: `font-family: ${F_SERIF}; line-height: 2; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 28px 24px; border-top: 4px double #3b2f1c; border-bottom: 4px double #3b2f1c;`,
            title: `font-size: 27px; font-weight: 800; color: #2b2418; margin: 2px 0 22px 0; line-height: 1.5; text-align: center; letter-spacing: 3px; padding: 12px 0; border-top: 2px solid #3b2f1c; border-bottom: 2px solid #3b2f1c;`,
            h1NumberWatermark: true,
            h1NumberStyle: `position: absolute; left: -6px; top: -10px; font-size: 46px; font-weight: 900; color: ${hexToRgba(a, 0.16)}; z-index: 0; line-height: 1; font-family: Georgia, serif;`,
            h1: `font-size: 21px; font-weight: 800; color: #2b2418; margin: 28px 0 12px 0; line-height: 1.5; position: relative; letter-spacing: 1px;`,
            h2: `font-size: 16px; font-weight: 700; color: ${a}; margin: 20px 0 10px 0; line-height: 1.5; letter-spacing: 2px;`,
            h3: `font-size: 15px; font-weight: 700; color: #4a3b25; margin: 14px 0 8px 0; line-height: 1.6;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2.05; margin: 12px 0; text-align: justify; text-indent: 2em;`,
            quote: `margin: 16px 0; padding: 12px 18px; border-left: 3px double ${a}; color: ${p.text}; line-height: 1.95; font-size: 14.5px;`,
            listContainer: `margin: 16px 0; padding: 4px 0;`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 6px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: '◆',
            listMarker: `color: ${a}; margin-right: 12px; font-size: 12px; flex-shrink: 0; margin-top: 8px;`,
            spacing: 'height: 10px;',
            divider: `margin: 20px 0; border-top: 2px solid ${hexToRgba(a, 0.4)};`
        };
    },

    // 14. 手帐便签（楷体 + 便签卡片 + 微旋转）
    stickyNote(p) {
        const a = p.accent || '#c08e3a';
        return {
            container: `font-family: "KaiTi", "STKaiti", "Kaiti SC", serif; line-height: 2; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 26px 22px;`,
            title: `font-size: 25px; font-weight: 700; color: #4a3520; margin: 4px 0 20px 0; line-height: 1.6; letter-spacing: 2px; text-align: center; padding: 14px 10px; background: ${p.noteBg || '#fff7d6'}; border: 1px solid ${hexToRgba(a, 0.35)}; box-shadow: 3px 3px 0 rgba(0,0,0,0.06); transform: rotate(-1deg);`,
            h1: `font-size: 21px; font-weight: 700; color: #4a3520; margin: 26px 0 14px 0; line-height: 1.6; padding: 10px 16px; background: ${hexToRgba(a, 0.12)}; border-radius: 6px; letter-spacing: 1px;`,
            h2: `font-size: 18px; font-weight: 700; color: ${a}; margin: 20px 0 10px 0; line-height: 1.6; letter-spacing: 1px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${p.text}; margin: 14px 0 8px 0; line-height: 1.6;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2.05; margin: 12px 0; text-align: justify; text-indent: 2em;`,
            quote: `margin: 16px 0; padding: 12px 16px; background: ${p.noteBg || '#fff7d6'}; border-left: 4px solid ${a}; border-radius: 6px; color: ${p.text}; line-height: 2; font-size: 14.5px;`,
            listContainer: `margin: 16px 0; padding: 12px 14px; background: ${p.cardBg || '#fffdf6'}; border-radius: 10px; border: 1px dashed ${hexToRgba(a, 0.4)};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 6px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: '☑',
            listMarker: `color: ${a}; margin-right: 10px; flex-shrink: 0;`,
            spacing: 'height: 12px;',
            divider: `margin: 18px 0; border-top: 1px dashed ${hexToRgba(a, 0.4)};`
        };
    },

    // 15. 弥散霓虹（深色弥散光 + 玻璃卡片）
    auroraGlow(p) {
        const g1 = p.g1 || '#a78bfa', g2 = p.g2 || '#22d3ee';
        return {
            container: `font-family: ${F_SANS}; line-height: 1.9; color: ${p.text}; font-size: 15px; background: radial-gradient(circle at 12% 8%, ${hexToRgba(g1, 0.35)} 0, transparent 46%), radial-gradient(circle at 88% 12%, ${hexToRgba(g2, 0.3)} 0, transparent 44%), linear-gradient(160deg, ${p.bg} 0%, ${p.bg2 || p.bg} 100%); padding: 28px 22px;`,
            title: `font-size: 25px; font-weight: 800; color: #ffffff; margin: 2px 0 20px 0; line-height: 1.5; letter-spacing: 2px; text-shadow: 0 0 18px ${hexToRgba(g1, 0.65)};`,
            h1: `font-size: 21px; font-weight: 800; color: #ffffff; margin: 26px 0 14px 0; line-height: 1.5; padding: 14px 18px; background: rgba(255,255,255,0.09); border: 1px solid rgba(255,255,255,0.22); border-radius: 14px; box-shadow: 0 8px 24px rgba(0,0,0,0.25); letter-spacing: 1px;`,
            h2: `font-size: 18px; font-weight: 800; color: ${g2}; margin: 20px 0 12px 0; line-height: 1.6; letter-spacing: 1px; text-shadow: 0 0 12px ${hexToRgba(g2, 0.6)};`,
            h3: `font-size: 16px; font-weight: 700; color: ${g1}; margin: 14px 0 8px 0; line-height: 1.6; letter-spacing: 0.5px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 12px 0; text-align: justify;`,
            quote: `margin: 16px 0; padding: 12px 18px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); border-left: 4px solid ${g2}; border-radius: 10px; color: ${p.text}; line-height: 1.9; font-size: 14.5px;`,
            listContainer: `margin: 16px 0; padding: 14px 18px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.18); border-radius: 14px;`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: '✦',
            listMarker: `color: ${g2}; margin-right: 12px; flex-shrink: 0;`,
            spacing: 'height: 12px;',
            divider: `margin: 20px 0; border-top: 1px solid rgba(255,255,255,0.25);`
        };
    },
    // 16. 撞色几何（硬阴影色块 + 大数字）
    duotoneBlock(p) {
        const a = p.accent || p.c1, b2 = p.c2 || '#002fa7';
        return {
            container: `font-family: ${F_SANS}; line-height: 1.9; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 26px 22px;`,
            title: `font-size: 26px; font-weight: 900; color: #ffffff; margin: 2px 0 20px 0; line-height: 1.4; padding: 16px 18px; background: ${a}; box-shadow: 8px 8px 0 ${b2}; letter-spacing: 1px;`,
            h1NumberWatermark: true,
            h1NumberStyle: `position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 40px; font-weight: 900; color: rgba(255,255,255,0.28); z-index: 0; line-height: 1;`,
            h1: `font-size: 21px; font-weight: 900; color: #ffffff; margin: 26px 0 14px 0; line-height: 1.5; padding: 12px 18px; background: ${b2}; border-radius: 2px; position: relative; letter-spacing: 1px; box-shadow: 6px 6px 0 ${hexToRgba(a, 0.35)};`,
            h2: `font-size: 18px; font-weight: 800; color: ${b2}; margin: 20px 0 12px 0; line-height: 1.5; padding-left: 14px; border-left: 8px solid ${a}; letter-spacing: 0.5px;`,
            h3: `font-size: 16px; font-weight: 800; color: ${p.text}; margin: 14px 0 8px 0; line-height: 1.6;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 12px 0; text-align: justify;`,
            quote: `margin: 16px 0; padding: 14px 18px; background: ${p.bg2 || '#fff5ef'}; border: 2px solid ${a}; box-shadow: 4px 4px 0 ${hexToRgba(b2, 0.2)}; color: ${p.text}; line-height: 1.9; font-size: 14.5px;`,
            listContainer: `margin: 16px 0; padding: 14px 18px; border: 2px solid ${b2}; box-shadow: 4px 4px 0 ${hexToRgba(a, 0.25)};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: '▮',
            listMarker: `color: ${a}; margin-right: 12px; flex-shrink: 0;`,
            spacing: 'height: 12px;',
            divider: `margin: 20px 0; border-top: 4px solid ${b2};`
        };
    },

    // 17. 奶油马卡龙（马卡龙色 + 胶囊标题）
    macaron(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 2; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 28px 22px;`,
            title: `font-size: 25px; font-weight: 800; color: ${p.text}; margin: 2px 0 20px 0; line-height: 1.5; text-align: center; letter-spacing: 2px; padding: 14px 18px; background: linear-gradient(135deg, ${hexToRgba(p.c1, 0.16)} 0%, ${hexToRgba(p.c2 || p.c1, 0.16)} 100%); border-radius: 20px;`,
            h1: `font-size: 21px; font-weight: 800; color: #ffffff; margin: 24px 0 14px 0; line-height: 1.5; padding: 12px 20px; background: linear-gradient(135deg, ${p.c1} 0%, ${p.c2 || p.c1} 100%); border-radius: 999px; text-align: center; letter-spacing: 1px; box-shadow: 0 6px 16px ${hexToRgba(p.c1, 0.28)};`,
            h2: `font-size: 17px; font-weight: 800; color: ${p.c1}; margin: 18px 0 10px 0; line-height: 1.6; text-align: center; letter-spacing: 1px;`,
            h3: `font-size: 15px; font-weight: 700; color: ${p.text}; margin: 14px 0 8px 0; line-height: 1.6;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2.05; margin: 12px 0; text-align: justify;`,
            quote: `margin: 16px 0; padding: 12px 18px; background: ${hexToRgba(p.c1, 0.08)}; border-radius: 14px; border-left: 4px solid ${p.c1}; color: ${p.text}; line-height: 1.95; font-size: 14.5px;`,
            listContainer: `margin: 16px 0; padding: 14px 18px; background: ${hexToRgba(p.c1, 0.06)}; border-radius: 16px; border: 1px solid ${hexToRgba(p.c1, 0.2)};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.95; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: '·',
            listMarker: `color: ${p.c1}; margin-right: 12px; font-weight: 900; font-size: 18px; line-height: 1; flex-shrink: 0;`,
            spacing: 'height: 12px;',
            divider: `margin: 18px 0; border-top: 2px dotted ${hexToRgba(p.c1, 0.4)};`
        };
    },

    // 18. 水墨国风（楷体 + 水墨细线）
    inkWash(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: "KaiTi", "STKaiti", "Kaiti SC", "Songti SC", serif; line-height: 2.05; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 30px 24px; border: 1px solid rgba(30,30,30,0.12);`,
            title: `font-size: 26px; font-weight: 700; color: ${p.text}; margin: 2px 0 20px 0; line-height: 1.6; text-align: center; letter-spacing: 4px; padding-bottom: 14px; border-bottom: 2px solid ${a};`,
            h1: `font-size: 21px; font-weight: 700; color: ${p.text}; margin: 26px 0 14px 0; line-height: 1.6; padding-left: 16px; border-left: 4px solid ${a}; letter-spacing: 2px;`,
            h2: `font-size: 17px; font-weight: 700; color: ${a}; margin: 20px 0 10px 0; line-height: 1.6; letter-spacing: 2px;`,
            h3: `font-size: 15px; font-weight: 700; color: ${p.text}; margin: 14px 0 8px 0; line-height: 1.6;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2.1; margin: 12px 0; text-align: justify; text-indent: 2em;`,
            quote: `margin: 16px 0; padding: 12px 18px; background: rgba(30,30,30,0.04); border-left: 3px solid ${a}; color: ${p.text}; line-height: 2; font-size: 14.5px;`,
            listContainer: `margin: 16px 0; padding: 4px 0;`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 6px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: '·',
            listMarker: `color: ${a}; margin-right: 12px; font-weight: 700; flex-shrink: 0;`,
            spacing: 'height: 10px;',
            divider: `margin: 20px 0; border-top: 1px solid rgba(30,30,30,0.25);`
        };
    },
    // 19. 科技仪表（深色 + 数据条 + 信号色）
    techHud(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; line-height: 1.9; color: ${p.text}; font-size: 14.5px; background: ${p.bg}; padding: 28px 22px;`,
            title: `font-size: 24px; font-weight: 800; color: #f8fafc; margin: 2px 0 18px 0; line-height: 1.5; letter-spacing: 1px; padding: 12px 16px; background: linear-gradient(90deg, ${hexToRgba(a, 0.2)} 0%, rgba(0,0,0,0) 100%); border-left: 4px solid ${a};`,
            h1: `font-size: 20px; font-weight: 800; color: ${a}; margin: 24px 0 12px 0; line-height: 1.5; padding: 10px 14px; background: ${hexToRgba(a, 0.1)}; border-radius: 8px; letter-spacing: 0.5px;`,
            h2: `font-size: 15px; font-weight: 700; color: #e2e8f0; margin: 18px 0 10px 0; line-height: 1.5; letter-spacing: 1px; padding-left: 10px; border-left: 3px solid ${hexToRgba(a, 0.7)};`,
            h3: `font-size: 14px; font-weight: 700; color: ${a}; margin: 14px 0 8px 0; line-height: 1.6;`,
            paragraph: `font-size: 14.5px; color: ${p.text}; line-height: 2; margin: 12px 0; text-align: justify;`,
            quote: `margin: 16px 0; padding: 12px 16px; border: 1px solid ${p.border || '#1c2e44'}; border-left: 4px solid ${a}; background: ${hexToRgba(a, 0.06)}; color: ${p.text}; line-height: 1.9; font-size: 14px;`,
            listContainer: `margin: 16px 0; padding: 14px 16px; border: 1px solid ${p.border || '#1c2e44'}; border-radius: 10px; background: rgba(255,255,255,0.02);`,
            listItem: `font-size: 14.5px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: '▸',
            listMarker: `color: ${a}; margin-right: 12px; flex-shrink: 0;`,
            spacing: 'height: 10px;',
            divider: `margin: 18px 0; border-top: 1px solid ${p.border || '#1c2e44'};`
        };
    },

    // 20. 线条框架（细线框 + 圆角标签）
    lineFrame(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 1.95; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 28px 22px;`,
            title: `font-size: 24px; font-weight: 800; color: #1f2937; margin: 2px 0 20px 0; line-height: 1.5; letter-spacing: 0.5px; padding: 14px 16px; border: 2px solid ${a}; border-radius: 12px; text-align: center;`,
            h1: `font-size: 20px; font-weight: 800; color: #1f2937; margin: 24px 0 12px 0; line-height: 1.5; padding: 8px 14px; border: 1px solid ${hexToRgba(a, 0.55)}; border-radius: 8px; display: inline-block; letter-spacing: 0.5px;`,
            h2: `font-size: 17px; font-weight: 700; color: ${a}; margin: 18px 0 10px 0; line-height: 1.5; letter-spacing: 0.5px;`,
            h3: `font-size: 15px; font-weight: 700; color: ${p.text}; margin: 14px 0 8px 0; line-height: 1.6;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 12px 0; text-align: justify;`,
            quote: `margin: 16px 0; padding: 12px 16px; border: 1px dashed ${hexToRgba(a, 0.5)}; border-radius: 8px; color: ${p.text}; line-height: 1.9; font-size: 14.5px;`,
            listContainer: `margin: 16px 0; padding: 12px 16px; border: 1px solid ${hexToRgba(a, 0.3)}; border-radius: 8px;`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: '·',
            listMarker: `color: ${a}; margin-right: 12px; font-weight: 800; flex-shrink: 0;`,
            spacing: 'height: 12px;',
            divider: `margin: 18px 0; border-top: 1px solid ${hexToRgba(a, 0.4)};`
        };
    },

    // 21. 落日暖阳（顶部弥散暖光）
    sunset(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 1.95; color: ${p.text}; font-size: 15px; background: linear-gradient(180deg, ${hexToRgba(p.c1, 0.12)} 0%, rgba(0,0,0,0) 40%), ${p.bg}; padding: 28px 22px;`,
            title: `font-size: 25px; font-weight: 800; color: ${p.text}; margin: 2px 0 20px 0; line-height: 1.5; text-align: center; letter-spacing: 2px; text-shadow: 0 2px 10px ${hexToRgba(p.c1, 0.35)};`,
            h1: `font-size: 21px; font-weight: 800; color: #ffffff; margin: 24px 0 14px 0; line-height: 1.5; padding: 13px 18px; background: linear-gradient(135deg, ${p.c1} 0%, ${p.c2 || p.c1} 100%); border-radius: 12px; text-align: center; letter-spacing: 1px; box-shadow: 0 8px 20px ${hexToRgba(p.c1, 0.3)};`,
            h2: `font-size: 18px; font-weight: 800; color: ${p.c1}; margin: 20px 0 12px 0; line-height: 1.6; letter-spacing: 1px;`,
            h3: `font-size: 15px; font-weight: 700; color: ${p.text}; margin: 14px 0 8px 0; line-height: 1.6;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 12px 0; text-align: justify;`,
            quote: `margin: 16px 0; padding: 12px 18px; background: ${hexToRgba(p.c1, 0.08)}; border-left: 4px solid ${p.c1}; border-radius: 0 10px 10px 0; color: ${p.text}; line-height: 1.9; font-size: 14.5px;`,
            listContainer: `margin: 16px 0; padding: 14px 18px; background: ${hexToRgba(p.c1, 0.06)}; border-radius: 12px; border: 1px solid ${hexToRgba(p.c1, 0.2)};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: '✦',
            listMarker: `color: ${p.c1}; margin-right: 12px; flex-shrink: 0;`,
            spacing: 'height: 12px;',
            divider: `margin: 18px 0; border-top: 1px solid ${hexToRgba(p.c1, 0.35)};`
        };
    },

    // 22. 星空（深蓝星点 + 发光）
    starry(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 1.95; color: ${p.text}; font-size: 15px; background: radial-gradient(circle at 15% 12%, rgba(255,255,255,0.1) 1px, transparent 2px), radial-gradient(circle at 70% 8%, rgba(255,255,255,0.08) 1px, transparent 2px), radial-gradient(circle at 85% 30%, rgba(255,255,255,0.07) 1px, transparent 2px), linear-gradient(165deg, ${p.bg} 0%, #0a1024 100%); padding: 28px 22px;`,
            title: `font-size: 25px; font-weight: 800; color: #f8fafc; margin: 2px 0 20px 0; line-height: 1.5; text-align: center; letter-spacing: 3px; text-shadow: 0 0 18px ${hexToRgba(a, 0.55)};`,
            h1: `font-size: 21px; font-weight: 800; color: #f8fafc; margin: 24px 0 14px 0; line-height: 1.5; text-align: center; letter-spacing: 2px; padding: 12px 16px; background: rgba(255,255,255,0.06); border: 1px solid ${hexToRgba(a, 0.4)}; border-radius: 14px; box-shadow: 0 0 22px ${hexToRgba(a, 0.25)};`,
            h2: `font-size: 18px; font-weight: 800; color: ${a}; margin: 20px 0 12px 0; line-height: 1.6; letter-spacing: 1px;`,
            h3: `font-size: 15px; font-weight: 700; color: #c7d2fe; margin: 14px 0 8px 0; line-height: 1.6;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 12px 0; text-align: justify;`,
            quote: `margin: 16px 0; padding: 12px 18px; background: rgba(255,255,255,0.05); border: 1px solid ${hexToRgba(a, 0.3)}; border-left: 4px solid ${a}; border-radius: 10px; color: ${p.text}; line-height: 1.9; font-size: 14.5px;`,
            listContainer: `margin: 16px 0; padding: 14px 18px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px;`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: '✦',
            listMarker: `color: ${a}; margin-right: 12px; flex-shrink: 0;`,
            spacing: 'height: 12px;',
            divider: `margin: 18px 0; border-top: 1px solid rgba(255,255,255,0.18);`
        };
    },
};


// ---------- 调色板库（按分类） ----------
const PALETTES = [
// ===== 简约专业 =====
    { arch: 'swissGrid', id: 'swiss-red', name: '瑞士红', category: '简约专业', description: '瑞士国际主义红，极简理性，外框+编号。', c1: '#e4002b', bg: '#ffffff', text: '#111111', shadow: '#f1f1f1' },
    { arch: 'swissGrid', id: 'swiss-navy', name: '瑞士海军蓝', category: '简约专业', description: '克莱因蓝细框，克制冷静。', c1: '#002fa7', bg: '#ffffff', text: '#111111', shadow: '#eef2ff' },
    { arch: 'lineFrame', id: 'line-slate', name: '线条灰', category: '简约专业', description: '细线框 + 圆角标签，干净利落。', c1: '#52525b', bg: '#fafafa', text: '#3f3f46' },
    { arch: 'numbered', id: 'num-black', name: '黑金编号', category: '简约专业', description: '大数字编号，黑白分明。', c1: '#18181b', bg: '#ffffff', text: '#27272a' },
    { arch: 'editorialMag', id: 'editorial-bw', name: '杂志黑白', category: '简约专业', description: '杂志编辑风，衬线大字，黑白层次。', c1: '#1f2937', bg: '#fafafa', text: '#374151' },
    { arch: 'underlineMin', id: 'underline-slate', name: '下划线灰', category: '简约专业', description: '单线极简，克制冷静。', c1: '#475569', bg: '#ffffff', text: '#334155' },
    { arch: 'lineFrame', id: 'line-sky', name: '线条天蓝', category: '简约专业', description: '天蓝细框标签，轻盈透气。', c1: '#0ea5e9', bg: '#ffffff', text: '#334155' },
    { arch: 'solidBlock', id: 'solid-ink', name: '墨块', category: '简约专业', description: '纯墨色块标题，硬朗直接。', c1: '#111827', bg: '#ffffff', text: '#27272a' },
    { arch: 'leftStripe', id: 'stripe-slate', name: '灰蓝竖条', category: '简约专业', description: '粗竖条标题，理性秩序。', c1: '#334155', bg: '#f8fafc', text: '#475569' },

    // ===== 视觉平衡 =====
    { arch: 'auroraGlow', id: 'aurora-dusk', name: '暮色极光', category: '视觉平衡', description: '紫粉弥散光，梦幻渐变。', bg: '#151327', bg2: '#1e1b3a', g1: '#a78bfa', g2: '#f472b6', text: '#e9e4f5' },
    { arch: 'auroraGlow', id: 'aurora-teal', name: '青碧极光', category: '视觉平衡', description: '青绿弥散光，清凉通透。', bg: '#0c1f2a', bg2: '#123a45', g1: '#2dd4bf', g2: '#38bdf8', text: '#d9f3ee' },
    { arch: 'sunset', id: 'sunset-gold', name: '落日金', category: '视觉平衡', description: '暖橙落日渐变，温柔有光。', c1: '#f59e0b', c2: '#ef4444', bg: '#fff7ed', text: '#7c4a1f' },
    { arch: 'gradientHero', id: 'hero-violet', name: '紫罗兰', category: '视觉平衡', description: '紫罗兰渐变横幅，高级典雅。', c1: '#8b5cf6', c2: '#6366f1', bg: '#f6f5ff', text: '#43386b' },
    { arch: 'leftStripe', id: 'stripe-cyan', name: '青蓝竖条', category: '视觉平衡', description: '青蓝竖条，清爽平衡。', c1: '#06b6d4', bg: '#f0fbfd', text: '#155e75' },
    { arch: 'softChip', id: 'chip-sky', name: '天空胶囊', category: '视觉平衡', description: '天蓝胶囊标签，轻盈治愈。', c1: '#38bdf8', c2: '#0ea5e9', bg: '#f4faff', text: '#365b75', emoji: '☁️' },
    { arch: 'numbered', id: 'num-orange', name: '橙子编号', category: '视觉平衡', description: '橙色大数字编号，明快有活力。', c1: '#ea580c', bg: '#ffffff', text: '#3f3f46' },
    { arch: 'paperSerif', id: 'paper-mist', name: '雾灰衬线', category: '视觉平衡', description: '灰蓝衬线，朦胧诗意。', c1: '#94a3b8', bg: '#f6f8fa', text: '#475569' },
    { arch: 'gradientHero', id: 'hero-rose', name: '玫瑰渐变', category: '视觉平衡', description: '玫瑰粉渐变，温柔平衡。', c1: '#fb7185', c2: '#f43f5e', bg: '#fff5f6', text: '#7c3a4a' },

    // ===== 丰富装饰 =====
    { arch: 'gradientHero', id: 'hero-aurora', name: '梦幻紫粉', category: '丰富装饰', description: '紫粉渐变横幅，浪漫丰富。', c1: '#8b5cf6', c2: '#ec4899', bg: '#fbf5ff', text: '#5b3a6e' },
    { arch: 'gradientHero', id: 'hero-spring', name: '春水青绿', category: '丰富装饰', description: '青绿渐变横幅，生机盎然。', c1: '#34d399', c2: '#22d3ee', bg: '#f0fdf9', text: '#1e5c4f' },
    { arch: 'frameBorder', id: 'frame-gold', name: '金框典雅', category: '丰富装饰', description: '描金画框，华丽复古。', c1: '#b45309', bg: '#fffbf2', text: '#5b4a2e', cardBg: '#fffdf7' },
    { arch: 'emojiList', id: 'emoji-party', name: '派对气球', category: '丰富装饰', description: '彩色 Emoji 装饰，热闹欢快。', c1: '#f43f5e', c2: '#f59e0b', bg: '#fff7f7', text: '#6b3a3a', h1e: '🎉', h2e: '🎈', h3e: '🍬', marker: '✨' },
    { arch: 'auroraGlow', id: 'aurora-neon', name: '霓虹极光', category: '丰富装饰', description: '粉青霓虹弥散光，潮流先锋。', bg: '#0d0a1f', bg2: '#1a0f33', g1: '#f0abfc', g2: '#22d3ee', text: '#ead9ff' },
    { arch: 'duotoneBlock', id: 'duotone-coral', name: '珊瑚撞色', category: '丰富装饰', description: '珊瑚橙×天蓝硬阴影，大胆活泼。', c1: '#f97316', c2: '#0ea5e9', bg: '#fffaf5', text: '#5b4a3a' },
    { arch: 'macaron', id: 'macaron-pink', name: '粉漾马卡龙', category: '丰富装饰', description: '马卡龙粉，甜而不腻。', c1: '#f9a8d4', c2: '#f472b6', bg: '#fff7fa', text: '#7c4560' },
    { arch: 'softChip', id: 'chip-lilac', name: '香芋胶囊', category: '丰富装饰', description: '香芋紫胶囊，可爱俏皮。', c1: '#a78bfa', c2: '#8b5cf6', bg: '#f8f6ff', text: '#4c3a6e', emoji: '🪄' },
    { arch: 'frameBorder', id: 'frame-burgundy', name: '酒红描边', category: '丰富装饰', description: '酒红厚描边，浓郁复古。', c1: '#9f1239', bg: '#fff7f8', text: '#6b3a3a', cardBg: '#fffafb' },
    // ===== 创意大胆 =====
    { arch: 'duotoneBlock', id: 'duotone-orange', name: '国际橙蓝', category: '创意大胆', description: '国际橙×克莱因蓝硬阴影，先锋撞色。', c1: '#ff4f00', c2: '#002fa7', bg: '#ffffff', text: '#1f1f1f' },
    { arch: 'duotoneBlock', id: 'duotone-red', name: '红黑几何', category: '创意大胆', description: '红黑硬阴影色块，强烈视觉冲击。', c1: '#e11d48', c2: '#111827', bg: '#ffffff', text: '#27272a' },
    { arch: 'darkTerminal', id: 'terminal-green', name: '绿色终端', category: '创意大胆', description: '深色终端风，荧光绿，极客感。', bg: '#0a0f0d', text: '#c9e6d5', accent: '#00e676', border: '#1f3a2e' },
    { arch: 'darkTerminal', id: 'terminal-amber', name: '琥珀终端', category: '创意大胆', description: '深色终端风，琥珀光，硬核冷峻。', bg: '#0f0d08', text: '#e8dcc8', accent: '#ffb800', border: '#3a301f' },
    { arch: 'swissGrid', id: 'swiss-international', name: '国际主义', category: '创意大胆', description: '瑞士国际主义，红黑极简，理性先锋。', c1: '#e4002b', bg: '#ffffff', text: '#111111' },
    { arch: 'darkNeon', id: 'vaporwave', name: '蒸汽波', category: '创意大胆', description: '粉青对撞霓虹，复古未来。', c1: '#2a0a3a', c2: '#170a2e', g1: '#f0abfc', g2: '#22d3ee', text: '#e9d5ff' },
    { arch: 'darkNeon', id: 'tron', name: '创战纪', category: '创意大胆', description: '霓虹蓝紫，未来竞速。', c1: '#050a1f', c2: '#111c3d', g1: '#22d3ee', g2: '#818cf8', text: '#c7d2fe' },
    { arch: 'gradientHero', id: 'acid-pop', name: '酸性撞色', category: '创意大胆', description: '酸性黄绿渐变，街头锐利。', c1: '#a3e635', c2: '#22d3ee', bg: '#f7fcf3', text: '#3f4a3c' },
    { arch: 'frameBorder', id: 'zebra-frame', name: '斑马黑白', category: '创意大胆', description: '黑白斑马描边，摩登复古。', c1: '#18181b', bg: '#ffffff', text: '#27272a', cardBg: '#fafafa' },

    // ===== 节日氛围 =====
    { arch: 'gradientHero', id: 'newyear-red', name: '新年红', category: '节日氛围', description: '中国红渐变，喜庆热烈。', c1: '#dc2626', c2: '#b91c1c', bg: '#fff7f7', text: '#7c2d2d' },
    { arch: 'macaron', id: 'gold-red', name: '金红贺岁', category: '节日氛围', description: '金红马卡龙，年味十足。', c1: '#eab308', c2: '#dc2626', bg: '#fffaf0', text: '#7c4a1f' },
    { arch: 'starry', id: 'christmas', name: '圣诞星夜', category: '节日氛围', description: '深绿星夜，圣诞温馨。', c1: '#34d399', bg: '#071a12', text: '#d6f5e7' },
    { arch: 'gradientHero', id: 'lantern', name: '灯笼橙红', category: '节日氛围', description: '橙红渐变，灯笼暖光。', c1: '#f97316', c2: '#ef4444', bg: '#fff8f2', text: '#7c3a1f' },
    { arch: 'macaron', id: 'candy', name: '糖果派对', category: '节日氛围', description: '粉紫糖果色，节日甜蜜。', c1: '#f472b6', c2: '#a78bfa', bg: '#fff7fc', text: '#7c4560' },
    { arch: 'softChip', id: 'sakura-fest', name: '樱花祭', category: '节日氛围', description: '樱花粉胶囊，春日浪漫。', c1: '#fda4af', c2: '#fb7185', bg: '#fff7f8', text: '#7c4560', emoji: '🌸' },
    { arch: 'emojiList', id: 'party-confetti', name: '彩带庆典', category: '节日氛围', description: '彩带 Emoji 装饰，热闹庆典。', c1: '#8b5cf6', c2: '#ec4899', bg: '#faf7ff', text: '#5b3a6e', h1e: '🎊', h2e: '🎉', h3e: '🎁', marker: '🎀' },
    { arch: 'paperSerif', id: 'moon-fest', name: '中秋月韵', category: '节日氛围', description: '月桂衬线，团圆雅致。', c1: '#b45309', bg: '#fff9ef', text: '#5b4a2e' },

    // ===== 可爱生活 =====
    { arch: 'stickyNote', id: 'sticky-butter', name: '黄油便签', category: '可爱生活', description: '奶油便签手帐，温暖治愈。', c1: '#d97706', bg: '#fdf6ec', text: '#5b4a3a', noteBg: '#fff7d6', cardBg: '#fffdf6' },
    { arch: 'stickyNote', id: 'sticky-pink', name: '粉色便签', category: '可爱生活', description: '粉嫩便签手帐，少女心。', c1: '#ec4899', bg: '#fff5f9', text: '#7c4560', noteBg: '#ffe4f0', cardBg: '#fff8fb' },
    { arch: 'softChip', id: 'chip-peach', name: '蜜桃胶囊', category: '可爱生活', description: '蜜桃橙胶囊，软萌可爱。', c1: '#fb923c', c2: '#f97316', bg: '#fff8f2', text: '#7c4a2e', emoji: '🍑' },
    { arch: 'macaron', id: 'macaron-mint', name: '薄荷马卡龙', category: '可爱生活', description: '薄荷绿马卡龙，清爽可爱。', c1: '#6ee7b7', c2: '#34d399', bg: '#f2fdf8', text: '#1e5c4f' },
    { arch: 'emojiList', id: 'emoji-cute', name: '软萌贴纸', category: '可爱生活', description: '软萌 Emoji 贴纸，俏皮可爱。', c1: '#f472b6', c2: '#a78bfa', bg: '#fff7fb', text: '#7c4560', h1e: '🧸', h2e: '🎀', h3e: '🍭', marker: '💗' },
    { arch: 'stickyNote', id: 'sticky-linen', name: '亚麻便签', category: '可爱生活', description: '亚麻手帐便签，素净温柔。', c1: '#94a3b8', bg: '#f7f6f3', text: '#4b5563', noteBg: '#fef9ef', cardBg: '#fbfaf7' },
    { arch: 'softChip', id: 'chip-lemon', name: '柠檬胶囊', category: '可爱生活', description: '柠檬黄胶囊，元气满满。', c1: '#facc15', c2: '#f59e0b', bg: '#fffdf4', text: '#5b5a2e', emoji: '🍋' },
    { arch: 'solidBlock', id: 'solid-coral', name: '珊瑚软块', category: '可爱生活', description: '珊瑚粉软色块，柔和不腻。', c1: '#fb7185', bg: '#fff5f7', text: '#7c3a4a' },
    // ===== 商务科技 =====
    { arch: 'techHud', id: 'tech-blue', name: '科技蓝', category: '商务科技', description: '深色科技仪表，蓝色数据感。', c1: '#38bdf8', c2: '#6366f1', bg: '#081018', text: '#d5e5f5', border: '#1c2e44' },
    { arch: 'techHud', id: 'tech-cyan', name: '科技青', category: '商务科技', description: '青色数据条，冷静专业。', c1: '#22d3ee', c2: '#0ea5e9', bg: '#06131a', text: '#d2f4f8', border: '#16303a' },
    { arch: 'darkTerminal', id: 'mono-slate', name: '石墨终端', category: '商务科技', description: '石墨深色终端，稳重克制。', bg: '#0f1115', text: '#d4d4d8', accent: '#38bdf8', border: '#1f2933' },
    { arch: 'numbered', id: 'num-navy', name: '海军编号', category: '商务科技', description: '深蓝大数字编号，商务理性。', c1: '#1e3a8a', bg: '#f8fafc', text: '#1e293b' },
    { arch: 'swissGrid', id: 'swiss-deep', name: '深墨网格', category: '商务科技', description: '深墨细框网格，严谨清晰。', c1: '#0f172a', bg: '#ffffff', text: '#111111' },
    { arch: 'lineFrame', id: 'line-ink', name: '墨线框', category: '商务科技', description: '墨色细线框，正式专业。', c1: '#0f172a', bg: '#f8fafc', text: '#334155' },
    { arch: 'solidBlock', id: 'solid-indigo', name: '靛蓝色块', category: '商务科技', description: '靛蓝纯色块，沉稳有力。', c1: '#4f46e5', bg: '#f6f6ff', text: '#3b3570' },
    { arch: 'gradientHero', id: 'hero-corporate', name: '商务蓝', category: '商务科技', description: '商务蓝渐变横幅，大气专业。', c1: '#2563eb', c2: '#1d4ed8', bg: '#f4f7ff', text: '#1e3a5f' },
    { arch: 'techHud', id: 'tech-indigo', name: '靛青仪表', category: '商务科技', description: '靛青数据面板，前沿科技。', c1: '#818cf8', c2: '#6366f1', bg: '#0b0d1a', text: '#d6dcff', border: '#232b4d' },

    // ===== 文艺复古 =====
    { arch: 'editorialMag', id: 'editorial-ochre', name: '赭石杂志', category: '文艺复古', description: '赭石色杂志编辑风，文艺高级。', c1: '#b45309', bg: '#faf6ef', text: '#5b4a3a' },
    { arch: 'newspaper', id: 'newspaper-ink', name: '墨色报纸', category: '文艺复古', description: '复古报纸双线框，旧时光。', c1: '#7c2d12', bg: '#f6f1e7', text: '#4a3b25' },
    { arch: 'newspaper', id: 'newspaper-tea', name: '茶色报纸', category: '文艺复古', description: '茶色报纸风，温润怀旧。', c1: '#92400e', bg: '#f3eee2', text: '#51412c' },
    { arch: 'paperSerif', id: 'paper-cream', name: '奶油衬线', category: '文艺复古', description: '奶油纸衬线，书卷气。', c1: '#8a6532', bg: '#faf6ec', text: '#5b4a3a' },
    { arch: 'inkWash', id: 'ink-wash', name: '水墨黛', category: '文艺复古', description: '水墨国风，浓淡相宜。', c1: '#1f2937', bg: '#f4f2ec', text: '#4a4a44' },
    { arch: 'inkWash', id: 'ink-green', name: '水墨青绿', category: '文艺复古', description: '青绿水墨，清雅古韵。', c1: '#365e4d', bg: '#f2f4ee', text: '#46554c' },
    { arch: 'frameBorder', id: 'frame-brown', name: '棕木画框', category: '文艺复古', description: '棕木厚描边，复古质感。', c1: '#78350f', bg: '#fbf7ef', text: '#5b4a3a', cardBg: '#fdfaf3' },
    { arch: 'editorialMag', id: 'editorial-burgundy', name: '酒红杂志', category: '文艺复古', description: '酒红杂志编辑风，浓郁雅致。', c1: '#9f1239', bg: '#faf4f4', text: '#6b3a3a' },
    { arch: 'paperSerif', id: 'serif-olive', name: '橄榄衬线', category: '文艺复古', description: '橄榄绿衬线，自然书卷。', c1: '#4d7c0f', bg: '#f6f8f0', text: '#4a5d33' },

    // ===== 自然清新 =====
    { arch: 'sunset', id: 'sunset-dawn', name: '晨曦', category: '自然清新', description: '晨光黄绿渐变，朝气蓬勃。', c1: '#fbbf24', c2: '#84cc16', bg: '#fffdf4', text: '#5b5a2e' },
    { arch: 'softChip', id: 'chip-mint', name: '薄荷胶囊', category: '自然清新', description: '薄荷绿胶囊，清新自然。', c1: '#6ee7b7', c2: '#34d399', bg: '#f2fdf8', text: '#1e5c4f', emoji: '🌿' },
    { arch: 'leftStripe', id: 'stripe-grass', name: '草绿竖条', category: '自然清新', description: '草绿竖条，清新开阔。', c1: '#65a30d', bg: '#f7fbf0', text: '#4a5d33' },
    { arch: 'gradientHero', id: 'hero-forest', name: '森林绿', category: '自然清新', description: '森林绿渐变，葱郁宁静。', c1: '#16a34a', c2: '#0d9488', bg: '#f3faf5', text: '#36543a' },
    { arch: 'darkNeon', id: 'ocean-dark', name: '深海', category: '自然清新', description: '深海蓝与荧光青，神秘深邃。', c1: '#082f49', c2: '#0c4a6e', g1: '#38bdf8', g2: '#22d3ee', text: '#e0f2fe' },
    { arch: 'paperSerif', id: 'lake-paper', name: '雾湖衬线', category: '自然清新', description: '雾湖灰蓝衬线，朦胧诗意。', c1: '#64748b', bg: '#f4f7fa', text: '#475569' },
    { arch: 'leftStripe', id: 'stripe-mist', name: '雾蓝竖条', category: '自然清新', description: '雾蓝竖条，清冽纯净。', c1: '#94a3b8', bg: '#f8fafc', text: '#475569' },
    { arch: 'inkWash', id: 'bamboo', name: '青竹', category: '自然清新', description: '青竹水墨，清幽雅致。', c1: '#4d7c0f', bg: '#f5f8ee', text: '#46553b' },
    { arch: 'softChip', id: 'chip-dew', name: '露珠胶囊', category: '自然清新', description: '露珠蓝胶囊，清透水润。', c1: '#a5f3fc', c2: '#22d3ee', bg: '#f2fcfe', text: '#155e75', emoji: '💧' }
];

const GENERATED_TEMPLATES = PALETTES.map(p => {
    const fn = GEN_ARCHETYPES[p.arch] || GEN_ARCHETYPES.gradientHero;
    return {
        id: p.id,
        name: p.name,
        category: p.category,
        description: p.description || '',
        style: fn(p)
    };
});

ALL_TEMPLATES.push(...GENERATED_TEMPLATES);


// 兼容旧模板：默认平台为公众号
ALL_TEMPLATES.forEach(t => { if (!t.platform) t.platform = 'wechat'; });


TEMPLATE_LOADER.registerBatch(ALL_TEMPLATES);

if (typeof window !== 'undefined') {
    window.TEMPLATE_LOADER = TEMPLATE_LOADER;
}



