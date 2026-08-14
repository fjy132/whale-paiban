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

// 默认后备样式
function getDefaultStyle() {
    return {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.75; color: #333333; font-size: 16px; padding: 20px; background: #ffffff;',
        h1: 'font-size: 20px; font-weight: bold; color: #2c3e50; margin: 20px 0 12px 0; padding-left: 12px; border-left: 4px solid #3498db; line-height: 1.6;',
        h2: 'font-size: 18px; font-weight: bold; color: #34495e; margin: 16px 0 10px 0; padding-left: 10px; border-left: 3px solid #1abc9c; line-height: 1.6;',
        h3: 'font-size: 16px; font-weight: bold; color: #555555; margin: 14px 0 8px 0; padding-left: 8px; border-left: 2px solid #95a5a6; line-height: 1.6;',
        paragraph: 'font-size: 15px; color: #333333; line-height: 1.8; margin: 10px 0; text-align: justify;',
        listContainer: 'margin: 10px 0; padding: 12px; background: #f8f9fa; border-radius: 6px;',
        listItem: 'font-size: 15px; color: #333333; line-height: 1.8; margin: 6px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #3498db; margin-right: 8px; font-size: 14px; flex-shrink: 0;',
        spacing: 'height: 10px;'
    };
}

/**
 * 解析并格式化文本
 * 规则：
 *   一、二、三…  → 一级标题 (h2)
 *   （一）（二） → 二级标题 (h3)，可带序号水印
 *   1、2、3…    → 三级标题 (h4)
 *   - 开头       → 列表项 (ul/li)
 *   空行         → 间距分隔
 *   其余         → 普通段落 (p)
 */
function parseAndFormat(text, style) {
    const lines = String(text || '').split('\n');
    let html = '<div style="' + safeStyle(style.container) + '">';
    let inList = false;
    let h2Counter = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // 空行处理
        if (!trimmedLine) {
            if (inList) { html += '</ul>'; inList = false; }
            const spacingContent = style.spacingContent || '';
            html += '<div style="' + safeStyle(style.spacing) + '">' + spacingContent + '</div>';
            continue;
        }

        // 一级标题：一、二、三…
        if (/^[一二三四五六七八九十百千]+[、.．]/.test(trimmedLine)) {
            if (inList) { html += '</ul>'; inList = false; }
            const h1Content = (style.h1Prefix || '') + escapeHtml(trimmedLine) + (style.h1Suffix || '');
            html += '<h2 style="' + safeStyle(style.h1) + '">' + h1Content + '</h2>';
            continue;
        }

        // 二级标题：（一）（二）…
        if (/^[（(][一二三四五六七八九十百千]+[）)]/.test(trimmedLine)) {
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
            continue;
        }

        // 三级标题：1、2、3…
        if (/^\d+[、.．]/.test(trimmedLine)) {
            if (inList) { html += '</ul>'; inList = false; }
            const h3Content = (style.h3Prefix || '') + escapeHtml(trimmedLine) + (style.h3Suffix || '');
            html += '<h4 style="' + safeStyle(style.h3) + '">' + h3Content + '</h4>';
            continue;
        }

        // 列表项：- 开头
        if (/^[-–—]/.test(trimmedLine)) {
            if (!inList) {
                html += '<ul style="' + safeStyle(style.listContainer) + '">';
                inList = true;
            }
            const listContent = trimmedLine.replace(/^[-–—]\s*/, '');
            const markerContent = style.listMarkerContent || '\u2022';
            html += '<li style="' + safeStyle(style.listItem) + '">' +
                '<span style="' + safeStyle(style.listMarker) + '">' + markerContent + '</span>' +
                '<span>' + escapeHtml(listContent) + '</span>' +
                '</li>';
            continue;
        }

        // 普通段落
        if (inList) { html += '</ul>'; inList = false; }
        html += '<p style="' + safeStyle(style.paragraph) + '">' + escapeHtml(trimmedLine) + '</p>';
    }

    if (inList) { html += '</ul>'; }
    html += '</div>';
    return html;
}

// 导出到全局（浏览器）
if (typeof window !== 'undefined') {
    window.parseAndFormat = parseAndFormat;
    window.getDefaultStyle = getDefaultStyle;
}
