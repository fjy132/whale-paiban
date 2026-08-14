/**
 * templates.js — 模板注册器 + 原创模板库（51 套 / 9 分类）
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

const ALL_TEMPLATES = [

// ============ 简约专业 ============
{
    id: 'minimal-white',
    name: '极简白',
    category: '简约专业',
    description: '干净留白，蓝色点缀，适合科技、效率类内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.8; color: #333; font-size: 15px; background: #ffffff; padding: 24px 20px;',
        h1: 'font-size: 21px; font-weight: 800; color: #1f2937; margin: 26px 0 14px 0; line-height: 1.5; padding-bottom: 12px; border-bottom: 2px solid #3b82f6; letter-spacing: 0.5px;',
        h2: 'font-size: 18px; font-weight: 700; color: #1f2937; margin: 20px 0 10px 0; line-height: 1.5; padding-left: 12px; border-left: 4px solid #3b82f6; letter-spacing: 0.3px;',
        h3: 'font-size: 16px; font-weight: 700; color: #374151; margin: 16px 0 8px 0; line-height: 1.5; padding-left: 8px; border-left: 2px solid #93c5fd; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #4b5563; line-height: 1.9; margin: 12px 0; text-align: justify; letter-spacing: 0.3px;',
        listContainer: 'margin: 14px 0; padding: 14px 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #eef2f7;',
        listItem: 'font-size: 15px; color: #4b5563; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #3b82f6; margin-right: 8px; font-size: 15px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'morandi-blue',
    name: '莫兰迪灰蓝',
    category: '简约专业',
    description: '低饱和灰蓝渐变，高级质感，适合品牌、杂志、深度内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.8; color: #4a5568; font-size: 15px; background: #f7f8fa; padding: 26px 22px;',
        h1: 'font-size: 21px; font-weight: 800; color: #ffffff; margin: 24px 0 16px 0; line-height: 1.5; padding: 18px 24px; background: linear-gradient(135deg, #7b8fa1 0%, #6b7f95 50%, #8e9eaf 100%); border-radius: 10px; letter-spacing: 0.8px; text-align: center; box-shadow: 0 6px 16px rgba(123,143,161,0.22);',
        h2: 'font-size: 18px; font-weight: 700; color: #5a6d7e; margin: 20px 0 12px 0; line-height: 1.5; padding: 13px 20px; background: linear-gradient(to right, #e8ecf1 0%, #f7f8fa 100%); border-left: 5px solid #8e9eaf; border-radius: 0 8px 8px 0; letter-spacing: 0.4px;',
        h3: 'font-size: 16px; font-weight: 700; color: #6b7f95; margin: 18px 0 10px 0; line-height: 1.5; padding: 8px 14px; border-bottom: 2px solid #c5cdd6; display: inline-block; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #5a6878; line-height: 1.9; margin: 14px 0; text-align: justify; letter-spacing: 0.4px;',
        listContainer: 'margin: 18px 0; padding: 18px 16px; background: #ffffff; border-radius: 10px; border: 1px solid #e2e7ed; box-shadow: 0 2px 8px rgba(0,0,0,0.04);',
        listItem: 'font-size: 15px; color: #5a6878; line-height: 1.85; margin: 10px 0; display: flex; align-items: flex-start; padding: 4px 0;',
        listMarker: 'display: inline-block; width: 22px; height: 22px; line-height: 22px; text-align: center; background: linear-gradient(135deg, #8e9eaf 0%, #7b8fa1 100%); color: #fff; margin-right: 12px; font-size: 12px; font-weight: 700; flex-shrink: 0; border-radius: 50%;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'business-blue',
    name: '商务深蓝',
    category: '简约专业',
    description: '深蓝底色标题，稳重专业，适合企业公告、行业报告。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.8; color: #334155; font-size: 15px; background: #ffffff; padding: 22px 20px;',
        h1: 'font-size: 21px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 16px 22px; background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%); border-radius: 6px; letter-spacing: 1px; box-shadow: 0 6px 16px rgba(29,78,216,0.25);',
        h2: 'font-size: 18px; font-weight: 700; color: #1e3a8a; margin: 20px 0 12px 0; line-height: 1.5; padding: 12px 16px; background: #eff6ff; border-radius: 6px; border-left: 5px solid #1d4ed8; letter-spacing: 0.4px;',
        h3: 'font-size: 16px; font-weight: 700; color: #1e40af; margin: 16px 0 10px 0; line-height: 1.5; padding-left: 10px; border-left: 3px solid #60a5fa; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #475569; line-height: 1.9; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;',
        listItem: 'font-size: 15px; color: #475569; line-height: 1.85; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #1d4ed8; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'gray-minimal',
    name: '高级灰',
    category: '简约专业',
    description: '克制的灰色系与细线条，冷静克制，适合极简品牌与深度阅读。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #52525b; font-size: 15px; background: #fafafa; padding: 26px 22px;',
        h1: 'font-size: 22px; font-weight: 800; color: #18181b; margin: 26px 0 16px 0; line-height: 1.5; padding-bottom: 14px; border-bottom: 1px solid #d4d4d8; letter-spacing: 2px;',
        h2: 'font-size: 18px; font-weight: 700; color: #27272a; margin: 20px 0 12px 0; line-height: 1.5; padding: 6px 12px; border-left: 3px solid #a1a1aa; letter-spacing: 1px;',
        h3: 'font-size: 16px; font-weight: 700; color: #3f3f46; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.6px;',
        paragraph: 'font-size: 15px; color: #52525b; line-height: 2; margin: 12px 0; text-align: justify; letter-spacing: 0.3px;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 8px;',
        listItem: 'font-size: 15px; color: #52525b; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #a1a1aa; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'line-minimal',
    name: '线条极简',
    category: '简约专业',
    description: '只用线条与留白做装饰，极度克制，适合极简主义表达。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #333; font-size: 15px; background: #ffffff; padding: 26px 22px;',
        h1: 'font-size: 23px; font-weight: 800; color: #111; margin: 28px 0 18px 0; line-height: 1.5; padding-bottom: 14px; border-bottom: 2px solid #111; letter-spacing: 1px;',
        h2: 'font-size: 18px; font-weight: 700; color: #222; margin: 22px 0 12px 0; line-height: 1.5; padding-bottom: 8px; border-bottom: 1px solid #e5e5e5; letter-spacing: 0.8px;',
        h3: 'font-size: 16px; font-weight: 700; color: #444; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.5px;',
        paragraph: 'font-size: 15px; color: #333; line-height: 2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 4px 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;',
        listItem: 'font-size: 15px; color: #333; line-height: 1.9; margin: 10px 0; display: flex; align-items: flex-start; padding-bottom: 8px; border-bottom: 1px dashed #f0f0f0;',
        listMarker: 'color: #111; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'editorial',
    name: '杂志编辑',
    category: '简约专业',
    description: '衬线大字与杂志排版语言，版式感强，适合专访、特稿、书评。',
    style: {
        container: 'font-family: Georgia, "Times New Roman", "Songti SC", "SimSun", serif; line-height: 1.95; color: #3f3f46; font-size: 15px; background: #ffffff; padding: 28px 24px;',
        h1: 'font-size: 26px; font-weight: 800; color: #111; margin: 30px 0 18px 0; line-height: 1.45; text-align: center; letter-spacing: 3px;',
        h1Suffix: '',
        h2: 'font-size: 19px; font-weight: 700; color: #18181b; margin: 24px 0 12px 0; line-height: 1.5; padding: 8px 0 8px 14px; border-left: 3px solid #dc2626; letter-spacing: 1.5px;',
        h3: 'font-size: 16px; font-weight: 700; color: #52525b; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 1px;',
        paragraph: 'font-size: 15px; color: #3f3f46; line-height: 2.1; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: #fafafa; border-radius: 4px;',
        listItem: 'font-size: 15px; color: #3f3f46; line-height: 2; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #dc2626; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 16px;'
    }
},
{
    id: 'dark-elegant',
    name: '暗夜优雅',
    category: '简约专业',
    description: '深色背景 + 浅色文字，克制优雅，适合科技夜读、高端品牌。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.9; color: #d4d4d8; font-size: 15px; background: #18181b; padding: 28px 24px; border-radius: 12px;',
        h1: 'font-size: 23px; font-weight: 800; color: #ffffff; margin: 28px 0 18px 0; line-height: 1.5; padding-bottom: 14px; border-bottom: 1px solid #3f3f46; letter-spacing: 2px;',
        h2: 'font-size: 18px; font-weight: 700; color: #e4e4e7; margin: 22px 0 12px 0; line-height: 1.5; padding: 8px 14px; background: rgba(255,255,255,0.05); border-left: 3px solid #71717a; border-radius: 0 6px 6px 0; letter-spacing: 0.8px;',
        h3: 'font-size: 16px; font-weight: 700; color: #a1a1aa; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.5px;',
        paragraph: 'font-size: 15px; color: #d4d4d8; line-height: 2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: rgba(255,255,255,0.04); border: 1px solid #27272a; border-radius: 10px;',
        listItem: 'font-size: 15px; color: #d4d4d8; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #a1a1aa; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},

// ============ 视觉平衡 ============
{
    id: 'fresh-green',
    name: '清新绿',
    category: '视觉平衡',
    description: '自然清新的绿色系，适合生活方式、健康、自然类文章。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.8; color: #3f4a3c; font-size: 15px; background: #fbfdf9; padding: 24px 20px;',
        h1: 'font-size: 21px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 16px 20px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 10px; letter-spacing: 1px; box-shadow: 0 6px 16px rgba(34,197,94,0.25);',
        h2: 'font-size: 18px; font-weight: 700; color: #15803d; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #f0fdf4; border-radius: 8px; border-left: 5px solid #22c55e; letter-spacing: 0.4px;',
        h3: 'font-size: 16px; font-weight: 700; color: #166534; margin: 16px 0 10px 0; line-height: 1.5; padding-left: 10px; border-left: 3px solid #86efac; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #4a5547; line-height: 1.9; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #f0fdf4; border-radius: 10px; border: 1px dashed #bbf7d0;',
        listItem: 'font-size: 15px; color: #4a5547; line-height: 1.85; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #16a34a; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'gradient-purple',
    name: '紫蓝渐变',
    category: '视觉平衡',
    description: '浪漫的紫蓝渐变标题，适合设计、时尚、创意内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.8; color: #4c4a5c; font-size: 15px; background: #faf9ff; padding: 24px 20px;',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 18px 22px; background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); border-radius: 12px; text-align: center; letter-spacing: 1px; box-shadow: 0 8px 20px rgba(124,58,237,0.28);',
        h2: 'font-size: 18px; font-weight: 700; color: #5b21b6; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: linear-gradient(to right, #ede9fe 0%, #eef2ff 100%); border-radius: 8px; border-left: 5px solid #7c3aed; letter-spacing: 0.4px;',
        h3: 'font-size: 16px; font-weight: 700; color: #6d28d9; margin: 16px 0 10px 0; line-height: 1.5; padding-left: 10px; border-left: 3px solid #c4b5fd; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #57536b; line-height: 1.9; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #f5f3ff; border-radius: 10px; border: 1px solid #ddd6fe;',
        listItem: 'font-size: 15px; color: #57536b; line-height: 1.85; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'display: inline-block; width: 20px; height: 20px; line-height: 20px; text-align: center; background: linear-gradient(135deg, #8b5cf6, #6366f1); color: #fff; border-radius: 50%; font-size: 12px; font-weight: 700; margin-right: 10px; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'sidebar-stripe',
    name: '左侧彩条',
    category: '视觉平衡',
    description: '左侧彩色竖条贯穿标题，节奏明快，适合清单、教程类内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.8; color: #3f3f46; font-size: 15px; background: #ffffff; padding: 22px 20px;',
        h1: 'font-size: 21px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 14px 18px; background: linear-gradient(90deg, #f43f5e 0%, #f59e0b 100%); border-radius: 6px; letter-spacing: 0.8px;',
        h2: 'font-size: 18px; font-weight: 700; color: #18181b; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 14px; background: #fafafa; border-left: 6px solid #f43f5e; border-radius: 0 6px 6px 0; letter-spacing: 0.4px;',
        h3: 'font-size: 16px; font-weight: 700; color: #27272a; margin: 16px 0 10px 0; line-height: 1.5; padding: 8px 12px; background: #fafafa; border-left: 4px solid #fbbf24; border-radius: 0 6px 6px 0; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #52525b; line-height: 1.9; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #fafafa; border-radius: 10px; border: 1px solid #f4f4f5;',
        listItem: 'font-size: 15px; color: #52525b; line-height: 1.85; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #f43f5e; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'sunset-orange',
    name: '落日橙',
    category: '视觉平衡',
    description: '温暖落日橙渐变，亲和有活力，适合美食、旅行、生活记录。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #5b4636; font-size: 15px; background: #fffaf5; padding: 24px 20px;',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, #fb923c 0%, #f97316 55%, #ef4444 100%); border-radius: 12px; text-align: center; letter-spacing: 1.5px; box-shadow: 0 8px 20px rgba(249,115,22,0.3);',
        h2: 'font-size: 18px; font-weight: 700; color: #c2410c; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #fff7ed; border-radius: 8px; border-left: 5px solid #fb923c; letter-spacing: 0.4px;',
        h3: 'font-size: 16px; font-weight: 700; color: #ea580c; margin: 16px 0 10px 0; line-height: 1.5; padding-left: 10px; border-left: 3px solid #fdba74; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #5b4636; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #fff7ed; border-radius: 10px; border: 1px dashed #fed7aa;',
        listItem: 'font-size: 15px; color: #5b4636; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #f97316; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'teal-balance',
    name: '青碧均衡',
    category: '视觉平衡',
    description: '青碧色系清爽均衡，适合科普、医疗、亲子类内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #36544f; font-size: 15px; background: #f6fbfa; padding: 24px 20px;',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 16px 22px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); border-radius: 10px; letter-spacing: 1px; box-shadow: 0 6px 18px rgba(20,184,166,0.28);',
        h2: 'font-size: 18px; font-weight: 700; color: #0f766e; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #f0fdfa; border-radius: 8px; border-left: 5px solid #14b8a6; letter-spacing: 0.4px;',
        h3: 'font-size: 16px; font-weight: 700; color: #115e59; margin: 16px 0 10px 0; line-height: 1.5; padding-left: 10px; border-left: 3px solid #5eead4; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #36544f; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #f0fdfa; border-radius: 10px; border: 1px solid #99f6e4;',
        listItem: 'font-size: 15px; color: #36544f; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #0d9488; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'pastel-soft',
    name: '马卡龙柔彩',
    category: '视觉平衡',
    description: '马卡龙色系柔和圆润，温柔治愈，适合美妆、母婴、情感内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #6b5b6e; font-size: 15px; background: #fdf7fb; padding: 24px 20px;',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 100%); border-radius: 16px; text-align: center; letter-spacing: 1px; box-shadow: 0 8px 20px rgba(244,114,182,0.25);',
        h2: 'font-size: 18px; font-weight: 700; color: #be5683; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #fdf2f8; border-radius: 12px; border-left: 5px solid #f9a8d4; letter-spacing: 0.4px;',
        h3: 'font-size: 16px; font-weight: 700; color: #a855b7; margin: 16px 0 10px 0; line-height: 1.5; padding-left: 10px; border-left: 3px solid #e9d5ff; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #6b5b6e; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #fdf2f8; border-radius: 14px; border: 1px solid #fbcfe8;',
        listItem: 'font-size: 15px; color: #6b5b6e; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'display: inline-block; width: 20px; height: 20px; line-height: 20px; text-align: center; background: linear-gradient(135deg, #f9a8d4, #c4b5fd); color: #fff; border-radius: 50%; font-size: 12px; font-weight: 700; margin-right: 10px; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'dual-accent',
    name: '双色强调',
    category: '视觉平衡',
    description: '双色渐变对比强烈，视觉冲击均衡，适合活动海报式图文。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #44403c; font-size: 15px; background: #ffffff; padding: 24px 20px;',
        h1: 'font-size: 23px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 18px 22px; background: linear-gradient(90deg, #6366f1 0%, #ec4899 100%); border-radius: 8px; text-align: center; letter-spacing: 1px; box-shadow: 0 8px 20px rgba(236,72,153,0.28);',
        h2: 'font-size: 18px; font-weight: 800; color: #4338ca; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: linear-gradient(to right, #eef2ff 0%, #fdf2f8 100%); border-radius: 8px; border-left: 6px solid #6366f1; letter-spacing: 0.4px;',
        h3: 'font-size: 16px; font-weight: 700; color: #db2777; margin: 16px 0 10px 0; line-height: 1.5; padding-left: 10px; border-left: 3px solid #f0abfc; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #44403c; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: linear-gradient(135deg, #eef2ff 0%, #fdf2f8 100%); border-radius: 10px; border: 1px solid #e0e7ff;',
        listItem: 'font-size: 15px; color: #44403c; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #ec4899; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},


// ============ 丰富装饰 ============
{
    id: 'festive-emoji',
    name: '节日Emoji',
    category: '丰富装饰',
    description: '彩色圆角块 + Emoji 点缀，活泼有趣，适合活动、社群、节日内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.8; color: #3f3f46; font-size: 15px; background: #fffdf8; padding: 24px 20px;',
        h1Prefix: '🎉 ',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 18px 22px; background: linear-gradient(135deg, #fb923c 0%, #f43f5e 100%); border-radius: 14px; text-align: center; letter-spacing: 1px; box-shadow: 0 8px 20px rgba(244,63,94,0.25);',
        h2Prefix: '✨ ',
        h2: 'font-size: 18px; font-weight: 800; color: #c2410c; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #fff7ed; border-radius: 10px; border: 1px dashed #fdba74; letter-spacing: 0.4px;',
        h3Prefix: '🔸 ',
        h3: 'font-size: 16px; font-weight: 700; color: #ea580c; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #52525b; line-height: 1.9; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #fffdf4; border-radius: 12px; border: 1px solid #fde68a;',
        listItem: 'font-size: 15px; color: #52525b; line-height: 1.85; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '🎈',
        listMarker: 'margin-right: 10px; font-size: 16px; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'tech-gradient',
    name: '科技渐变',
    category: '丰富装饰',
    description: '深色底 + 青紫渐变光效，炫酷科技感，适合数码、AI、前沿内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.8; color: #cbd5e1; font-size: 15px; background: linear-gradient(160deg, #0f172a 0%, #1e1b4b 100%); padding: 28px 22px; border-radius: 12px;',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 16px 22px; background: linear-gradient(135deg, #06b6d4 0%, #6366f1 100%); border-radius: 10px; text-align: center; letter-spacing: 1px; box-shadow: 0 0 24px rgba(99,102,241,0.45);',
        h2: 'font-size: 18px; font-weight: 700; color: #22d3ee; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: rgba(34,211,238,0.08); border-left: 4px solid #22d3ee; border-radius: 0 8px 8px 0; letter-spacing: 0.4px;',
        h3: 'font-size: 16px; font-weight: 700; color: #a5b4fc; margin: 16px 0 10px 0; line-height: 1.5; padding-left: 10px; border-left: 3px solid #6366f1; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #cbd5e1; line-height: 1.9; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: rgba(255,255,255,0.05); border-radius: 10px; border: 1px solid rgba(99,102,241,0.35);',
        listItem: 'font-size: 15px; color: #cbd5e1; line-height: 1.85; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #22d3ee; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'golden-luxury',
    name: '轻奢金',
    category: '丰富装饰',
    description: '深酒红底 + 鎏金描边，轻奢质感，适合品牌故事、高端活动。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", serif; line-height: 1.9; color: #e8dcc0; font-size: 15px; background: #2b1a1a; padding: 28px 22px; border-radius: 12px;',
        h1: 'font-size: 23px; font-weight: 800; color: #f5d77e; margin: 28px 0 18px 0; line-height: 1.5; padding: 18px 20px; background: linear-gradient(135deg, #4a2c2c 0%, #6b3a2f 100%); border: 1px solid #b8860b; border-radius: 10px; text-align: center; letter-spacing: 2px; box-shadow: inset 0 0 18px rgba(245,215,126,0.12);',
        h2: 'font-size: 18px; font-weight: 700; color: #f0d48a; margin: 22px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: rgba(184,134,11,0.12); border-left: 4px solid #d4af37; border-radius: 0 6px 6px 0; letter-spacing: 0.6px;',
        h3: 'font-size: 16px; font-weight: 700; color: #e6c87a; margin: 16px 0 10px 0; line-height: 1.5; padding-bottom: 6px; border-bottom: 1px solid rgba(212,175,55,0.4); display: inline-block; letter-spacing: 0.4px;',
        paragraph: 'font-size: 15px; color: #e0d3b5; line-height: 2; margin: 14px 0; text-align: justify; letter-spacing: 0.4px;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: rgba(255,255,255,0.04); border-radius: 10px; border: 1px solid rgba(212,175,55,0.35);',
        listItem: 'font-size: 15px; color: #e0d3b5; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #d4af37; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'aurora-starlight',
    name: '极光星夜',
    category: '丰富装饰',
    description: '深蓝夜空 + 极光渐变，梦幻深邃，适合星空、科幻、治愈系内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.9; color: #c7d2fe; font-size: 15px; background: linear-gradient(160deg, #0b1020 0%, #111c3d 100%); padding: 28px 22px; border-radius: 12px;',
        h1: 'font-size: 23px; font-weight: 800; color: #ffffff; margin: 28px 0 18px 0; line-height: 1.5; padding: 18px 22px; background: linear-gradient(135deg, #34d399 0%, #22d3ee 50%, #818cf8 100%); border-radius: 14px; text-align: center; letter-spacing: 2px; box-shadow: 0 0 28px rgba(52,211,153,0.4);',
        h2: 'font-size: 18px; font-weight: 700; color: #67e8f9; margin: 22px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: rgba(103,232,249,0.08); border-left: 4px solid #22d3ee; border-radius: 0 8px 8px 0; letter-spacing: 0.6px;',
        h3: 'font-size: 16px; font-weight: 700; color: #a5b4fc; margin: 16px 0 10px 0; line-height: 1.5; padding-left: 10px; border-left: 3px solid #6366f1; letter-spacing: 0.4px;',
        paragraph: 'font-size: 15px; color: #c7d2fe; line-height: 2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(103,232,249,0.25);',
        listItem: 'font-size: 15px; color: #c7d2fe; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '⭐',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'candy-sweet',
    name: '糖果甜心',
    category: '丰富装饰',
    description: '糖果色渐变 + 甜点 Emoji，甜度爆表，适合美食、甜品、下午茶。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #7c4a5a; font-size: 15px; background: #fff5fa; padding: 24px 20px;',
        h1Prefix: '🍬 ',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, #f472b6 0%, #e879f9 100%); border-radius: 16px; text-align: center; letter-spacing: 1px; box-shadow: 0 8px 20px rgba(244,114,182,0.3);',
        h2Prefix: '🧁 ',
        h2: 'font-size: 18px; font-weight: 800; color: #be185d; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #fdf2f8; border-radius: 12px; border: 1px dashed #f9a8d4; letter-spacing: 0.4px;',
        h3Prefix: '🍭 ',
        h3: 'font-size: 16px; font-weight: 700; color: #db2777; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #7c4a5a; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #fdf2f8; border-radius: 14px; border: 1px solid #fbcfe8;',
        listItem: 'font-size: 15px; color: #7c4a5a; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '🍡',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'art-frame',
    name: '艺术画框',
    category: '丰富装饰',
    description: '双线画框与衬线字，展览馆气质，适合艺术、设计、展览内容。',
    style: {
        container: 'font-family: Georgia, "Times New Roman", "Songti SC", "SimSun", serif; line-height: 1.9; color: #57534e; font-size: 15px; background: #fafaf7; padding: 28px 24px;',
        h1: 'font-size: 24px; font-weight: 800; color: #1c1917; margin: 30px 0 18px 0; line-height: 1.5; padding: 18px 12px; border: 1px solid #a8a29e; outline: 1px solid #a8a29e; outline-offset: 4px; text-align: center; letter-spacing: 3px;',
        h2: 'font-size: 18px; font-weight: 700; color: #44403c; margin: 24px 0 12px 0; line-height: 1.5; padding: 8px 14px; border-left: 3px solid #a8a29e; letter-spacing: 1.5px;',
        h3: 'font-size: 16px; font-weight: 700; color: #57534e; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 1px;',
        paragraph: 'font-size: 15px; color: #57534e; line-height: 2.1; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; border: 1px solid #e7e5e4; background: #ffffff;',
        listItem: 'font-size: 15px; color: #57534e; line-height: 2; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #a8a29e; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 16px;'
    }
},
{
    id: 'retro-wave',
    name: '复古浪潮',
    category: '丰富装饰',
    description: '合成器浪潮风格，霓虹粉青对撞，适合复古游戏、音乐、亚文化。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #e9d5ff; font-size: 15px; background: linear-gradient(160deg, #170a2e 0%, #2a0a3a 100%); padding: 28px 22px; border-radius: 12px;',
        h1: 'font-size: 24px; font-weight: 800; color: #ffffff; margin: 28px 0 18px 0; line-height: 1.4; padding: 18px 20px; background: linear-gradient(135deg, #f0abfc 0%, #22d3ee 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; text-align: center; letter-spacing: 2px; text-shadow: 0 0 30px rgba(240,171,252,0.4); border-bottom: 2px solid #f0abfc;',
        h2: 'font-size: 18px; font-weight: 700; color: #f0abfc; margin: 22px 0 12px 0; line-height: 1.5; padding: 8px 14px; border-left: 4px solid #22d3ee; text-shadow: 0 0 12px rgba(240,171,252,0.5); letter-spacing: 1px;',
        h3: 'font-size: 16px; font-weight: 700; color: #67e8f9; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.5px;',
        paragraph: 'font-size: 15px; color: #e9d5ff; line-height: 2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: rgba(240,171,252,0.06); border: 1px solid rgba(240,171,252,0.35); border-radius: 10px;',
        listItem: 'font-size: 15px; color: #e9d5ff; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #22d3ee; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'glass-morphism',
    name: '玻璃拟态',
    category: '丰富装饰',
    description: '通透玻璃质感卡片，现代轻盈，适合新消费、互联网产品内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #312e81; font-size: 15px; background: linear-gradient(135deg, #c7d2fe 0%, #fce7f3 100%); padding: 26px 22px; border-radius: 12px;',
        h1: 'font-size: 22px; font-weight: 800; color: #3730a3; margin: 26px 0 16px 0; line-height: 1.5; padding: 18px 22px; background: rgba(255,255,255,0.65); border: 1px solid rgba(255,255,255,0.8); border-radius: 16px; text-align: center; letter-spacing: 1px; box-shadow: 0 8px 32px rgba(99,102,241,0.18);',
        h2: 'font-size: 18px; font-weight: 700; color: #4338ca; margin: 20px 0 12px 0; line-height: 1.5; padding: 12px 16px; background: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.7); border-radius: 12px; letter-spacing: 0.4px;',
        h3: 'font-size: 16px; font-weight: 700; color: #4f46e5; margin: 16px 0 10px 0; line-height: 1.5; padding-left: 10px; border-left: 3px solid rgba(255,255,255,0.9); letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #3730a3; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: rgba(255,255,255,0.45); border: 1px solid rgba(255,255,255,0.7); border-radius: 14px;',
        listItem: 'font-size: 15px; color: #3730a3; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #6d28d9; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},

// ============ 文艺复古 ============
{
    id: 'vintage-paper',
    name: '复古纸张',
    category: '文艺复古',
    description: '米色纸张 + 衬线字体 + 棕色标题，怀旧书卷气，适合散文、文化类。',
    style: {
        container: 'font-family: Georgia, "Times New Roman", "Songti SC", "SimSun", serif; line-height: 1.9; color: #5c4a32; font-size: 15px; background: #f6f1e5; padding: 28px 24px;',
        h1: 'font-size: 23px; font-weight: 800; color: #7c5a2e; margin: 28px 0 18px 0; line-height: 1.5; padding: 16px 0; border-top: 2px solid #b99a62; border-bottom: 2px solid #b99a62; text-align: center; letter-spacing: 3px;',
        h2: 'font-size: 19px; font-weight: 700; color: #8a6532; margin: 22px 0 12px 0; line-height: 1.5; padding-left: 14px; border-left: 4px solid #b99a62; letter-spacing: 1px;',
        h3: 'font-size: 16px; font-weight: 700; color: #7c5a2e; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.6px;',
        paragraph: 'font-size: 15px; color: #5c4a32; line-height: 2; margin: 14px 0; text-align: justify; letter-spacing: 0.5px;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: #efe7d5; border-radius: 6px; border: 1px dashed #cbb489;',
        listItem: 'font-size: 15px; color: #5c4a32; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #b99a62; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'ink-wash',
    name: '水墨丹青',
    category: '文艺复古',
    description: '宣纸底色 + 墨色渐变，东方水墨意境，适合国学、文旅、传统文化。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Songti SC", serif; line-height: 1.9; color: #3f3a33; font-size: 15px; background: #fbf8f2; padding: 28px 24px;',
        h1: 'font-size: 24px; font-weight: 800; color: #1f1c17; margin: 28px 0 18px 0; line-height: 1.6; padding: 14px 8px; background: linear-gradient(135deg, #e8e2d5 0%, #f6f1e8 100%); border-radius: 8px; text-align: center; letter-spacing: 4px; border: 1px solid #d9d0bc;',
        h2: 'font-size: 19px; font-weight: 700; color: #2c2820; margin: 22px 0 12px 0; line-height: 1.5; padding: 8px 16px; background: #f2ede1; border-left: 4px solid #57503f; border-radius: 0 6px 6px 0; letter-spacing: 1.5px;',
        h3: 'font-size: 16px; font-weight: 700; color: #4a4438; margin: 16px 0 10px 0; line-height: 1.5; padding-bottom: 6px; border-bottom: 1px solid #b5aa92; display: inline-block; letter-spacing: 1px;',
        paragraph: 'font-size: 15px; color: #4a4438; line-height: 2.1; margin: 14px 0; text-align: justify; letter-spacing: 0.5px;',
        listContainer: 'margin: 18px 0; padding: 18px 22px; background: rgba(245,240,229,0.8); border-radius: 8px; border: 1px solid #d8cdb4;',
        listItem: 'font-size: 15px; color: #4a4438; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #57503f; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'film-retro',
    name: '胶片电影',
    category: '文艺复古',
    description: '暗色胶片感 + 琥珀色调，电影分镜质感，适合影评、故事、纪实。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #d8cdb8; font-size: 15px; background: #1c1712; padding: 28px 22px; border-radius: 12px;',
        h1: 'font-size: 23px; font-weight: 800; color: #f2c879; margin: 28px 0 18px 0; line-height: 1.5; padding: 16px 20px; background: linear-gradient(135deg, #3a2b1a 0%, #57401f 100%); border-left: 6px solid #d4a24e; border-radius: 0 10px 10px 0; letter-spacing: 2px;',
        h2: 'font-size: 18px; font-weight: 700; color: #e8bd6f; margin: 22px 0 12px 0; line-height: 1.5; padding: 8px 14px; border-bottom: 2px solid #8a6a35; letter-spacing: 1px;',
        h3: 'font-size: 16px; font-weight: 700; color: #d9b36a; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.5px;',
        paragraph: 'font-size: 15px; color: #d8cdb8; line-height: 2; margin: 14px 0; text-align: justify; letter-spacing: 0.4px;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: rgba(255,255,255,0.04); border-radius: 8px; border: 1px solid #6b5430;',
        listItem: 'font-size: 15px; color: #d8cdb8; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #d4a24e; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'ancient-charm',
    name: '古风国韵',
    category: '文艺复古',
    description: '朱红与墨色交映，古典印章感，适合汉服、国学、古风内容。',
    style: {
        container: 'font-family: "Songti SC", "SimSun", "STKaiti", serif; line-height: 2; color: #4a3b32; font-size: 15px; background: #f8f3ea; padding: 28px 24px;',
        h1: 'font-size: 24px; font-weight: 800; color: #9e1f1f; margin: 30px 0 20px 0; line-height: 1.6; padding: 10px 4px; border: 2px solid #9e1f1f; display: block; text-align: center; letter-spacing: 4px;',
        h2: 'font-size: 19px; font-weight: 700; color: #8b1a1a; margin: 24px 0 12px 0; line-height: 1.6; padding-left: 14px; border-left: 4px solid #c0392b; letter-spacing: 2px;',
        h3: 'font-size: 16px; font-weight: 700; color: #6b4a3a; margin: 16px 0 10px 0; line-height: 1.6; letter-spacing: 1px;',
        paragraph: 'font-size: 15px; color: #4a3b32; line-height: 2.2; margin: 14px 0; text-align: justify; letter-spacing: 0.5px;',
        listContainer: 'margin: 18px 0; padding: 18px 22px; background: #f3ead9; border: 1px solid #d9c7a8;',
        listItem: 'font-size: 15px; color: #4a3b32; line-height: 2; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #9e1f1f; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 16px;'
    }
},
{
    id: 'retro-newspaper',
    name: '旧报纸',
    category: '文艺复古',
    description: '报纸头条式排版，重磅历史感，适合时评、纪实、人物故事。',
    style: {
        container: 'font-family: Georgia, "Times New Roman", "Songti SC", "SimSun", serif; line-height: 1.9; color: #3f3a33; font-size: 15px; background: #f4efe1; padding: 28px 22px;',
        h1: 'font-size: 26px; font-weight: 800; color: #111; margin: 30px 0 16px 0; line-height: 1.4; text-align: center; letter-spacing: 2px; padding: 12px 0; border-top: 3px double #111; border-bottom: 3px double #111;',
        h2: 'font-size: 19px; font-weight: 700; color: #222; margin: 24px 0 12px 0; line-height: 1.5; padding: 6px 0 6px 12px; border-left: 3px solid #7f1d1d; letter-spacing: 1px;',
        h3: 'font-size: 16px; font-weight: 700; color: #444; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.8px;',
        paragraph: 'font-size: 15px; color: #3f3a33; line-height: 2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 16px 18px; border-top: 1px solid #aaa; border-bottom: 1px solid #aaa;',
        listItem: 'font-size: 15px; color: #3f3a33; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #7f1d1d; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'typewriter',
    name: '打字机',
    category: '文艺复古',
    description: '等宽字体 + 纸张质感，复古打字机氛围，适合书信、随笔、独白。',
    style: {
        container: 'font-family: "Courier New", "SimSun", monospace; line-height: 1.9; color: #3d3d3d; font-size: 15px; background: #fbfaf6; padding: 28px 24px;',
        h1: 'font-size: 23px; font-weight: 800; color: #1a1a1a; margin: 28px 0 18px 0; line-height: 1.5; padding-bottom: 12px; border-bottom: 1px solid #9a9a9a; letter-spacing: 1px;',
        h2: 'font-size: 18px; font-weight: 700; color: #2a2a2a; margin: 22px 0 12px 0; line-height: 1.5; padding-left: 12px; border-left: 3px solid #b91c1c; letter-spacing: 0.5px;',
        h3: 'font-size: 16px; font-weight: 700; color: #555; margin: 16px 0 10px 0; line-height: 1.5;',
        paragraph: 'font-size: 15px; color: #3d3d3d; line-height: 2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 16px 18px; background: #f4f1e8; border: 1px solid #d8d2c2;',
        listItem: 'font-size: 15px; color: #3d3d3d; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #b91c1c; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'victorian',
    name: '维多利亚',
    category: '文艺复古',
    description: '墨绿鎏金与繁复饰线，古典欧式优雅，适合文学、英伦、复古风。',
    style: {
        container: 'font-family: Georgia, "Times New Roman", "Songti SC", serif; line-height: 1.95; color: #4a4035; font-size: 15px; background: #f7f3ea; padding: 28px 24px;',
        h1: 'font-size: 24px; font-weight: 800; color: #2d3a2f; margin: 30px 0 18px 0; line-height: 1.5; padding: 16px 8px; border-top: 2px solid #b08d3e; border-bottom: 2px solid #b08d3e; text-align: center; letter-spacing: 2px;',
        h2: 'font-size: 18px; font-weight: 700; color: #2d3a2f; margin: 22px 0 12px 0; line-height: 1.5; padding: 8px 14px; background: linear-gradient(to right, rgba(176,141,62,0.14), transparent); border-left: 3px solid #b08d3e; letter-spacing: 1px;',
        h3: 'font-size: 16px; font-weight: 700; color: #6b5b3a; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.8px;',
        paragraph: 'font-size: 15px; color: #4a4035; line-height: 2.1; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; border: 1px solid #cbb98c; background: #fcfaf3;',
        listItem: 'font-size: 15px; color: #4a4035; line-height: 2; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #b08d3e; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},


// ============ 节日氛围 ============
{
    id: 'new-year-red',
    name: '新春红',
    category: '节日氛围',
    description: '中国红 + 鎏金装饰，喜庆大气，适合春节、周年庆、促销活动。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #7c2d2d; font-size: 15px; background: #fff8f5; padding: 26px 22px;',
        h1Prefix: '🧧 ',
        h1: 'font-size: 23px; font-weight: 800; color: #ffffff; margin: 28px 0 18px 0; line-height: 1.5; padding: 18px 22px; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 12px; text-align: center; letter-spacing: 2px; box-shadow: 0 8px 20px rgba(220,38,38,0.3);',
        h2Prefix: '🏮 ',
        h2: 'font-size: 18px; font-weight: 800; color: #b91c1c; margin: 22px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: linear-gradient(to right, #fee2e2 0%, #fff7ed 100%); border-radius: 8px; border-left: 5px solid #dc2626; letter-spacing: 0.6px;',
        h3Prefix: '🎊 ',
        h3: 'font-size: 16px; font-weight: 700; color: #c2410c; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.4px;',
        paragraph: 'font-size: 15px; color: #7c2d2d; line-height: 2; margin: 14px 0; text-align: justify; letter-spacing: 0.3px;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: #fff1f0; border-radius: 10px; border: 1px solid #fecaca;',
        listItem: 'font-size: 15px; color: #7c2d2d; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '❤️',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'christmas-green',
    name: '圣诞绿',
    category: '节日氛围',
    description: '圣诞松绿 + 节日红点缀，温馨节日感，适合圣诞、新年活动。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #36543a; font-size: 15px; background: #f7fbf7; padding: 26px 22px;',
        h1Prefix: '🎄 ',
        h1: 'font-size: 23px; font-weight: 800; color: #ffffff; margin: 28px 0 18px 0; line-height: 1.5; padding: 18px 22px; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); border-radius: 12px; text-align: center; letter-spacing: 2px; box-shadow: 0 8px 20px rgba(22,163,74,0.3);',
        h2Prefix: '🎁 ',
        h2: 'font-size: 18px; font-weight: 800; color: #166534; margin: 22px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #f0fdf4; border-radius: 8px; border-left: 5px solid #16a34a; letter-spacing: 0.6px;',
        h3Prefix: '⭐ ',
        h3: 'font-size: 16px; font-weight: 700; color: #b91c1c; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.4px;',
        paragraph: 'font-size: 15px; color: #36543a; line-height: 2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: #f0fdf4; border-radius: 10px; border: 1px solid #bbf7d0;',
        listItem: 'font-size: 15px; color: #36543a; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '🔔',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'halloween-purple',
    name: '万圣节紫',
    category: '节日氛围',
    description: '暗紫橙南瓜配色，神秘又搞怪，适合万圣节、惊悚、派对内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #e9d5ff; font-size: 15px; background: linear-gradient(160deg, #1b1035 0%, #2d1b4e 100%); padding: 28px 22px; border-radius: 12px;',
        h1Prefix: '🎃 ',
        h1: 'font-size: 23px; font-weight: 800; color: #ffffff; margin: 28px 0 18px 0; line-height: 1.5; padding: 18px 22px; background: linear-gradient(135deg, #f97316 0%, #7c3aed 100%); border-radius: 12px; text-align: center; letter-spacing: 2px; box-shadow: 0 8px 24px rgba(124,58,237,0.4);',
        h2Prefix: '🕸️ ',
        h2: 'font-size: 18px; font-weight: 800; color: #fbbf24; margin: 22px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: rgba(251,191,36,0.1); border-left: 5px solid #f97316; border-radius: 0 8px 8px 0; letter-spacing: 0.6px;',
        h3Prefix: '🦇 ',
        h3: 'font-size: 16px; font-weight: 700; color: #c4b5fd; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.4px;',
        paragraph: 'font-size: 15px; color: #e9d5ff; line-height: 2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: rgba(255,255,255,0.05); border-radius: 10px; border: 1px solid rgba(249,115,22,0.4);',
        listItem: 'font-size: 15px; color: #e9d5ff; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '👻',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'autumn-gold',
    name: '秋日金',
    category: '节日氛围',
    description: '金秋银杏色调，温暖沉静，适合秋日、丰收、感恩主题。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #6b4a2a; font-size: 15px; background: #fffaf0; padding: 26px 22px;',
        h1Prefix: '🍂 ',
        h1: 'font-size: 23px; font-weight: 800; color: #ffffff; margin: 28px 0 18px 0; line-height: 1.5; padding: 18px 22px; background: linear-gradient(135deg, #d97706 0%, #b45309 100%); border-radius: 12px; text-align: center; letter-spacing: 2px; box-shadow: 0 8px 20px rgba(217,119,6,0.3);',
        h2Prefix: '🍁 ',
        h2: 'font-size: 18px; font-weight: 800; color: #92400e; margin: 22px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #fffbeb; border-radius: 8px; border-left: 5px solid #d97706; letter-spacing: 0.6px;',
        h3Prefix: '🌾 ',
        h3: 'font-size: 16px; font-weight: 700; color: #b45309; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.4px;',
        paragraph: 'font-size: 15px; color: #6b4a2a; line-height: 2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: #fffbeb; border-radius: 10px; border: 1px solid #fde68a;',
        listItem: 'font-size: 15px; color: #6b4a2a; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '🍂',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'valentine-pink',
    name: '情人节粉',
    category: '节日氛围',
    description: '浪漫粉色 + 爱心元素，甜蜜氛围，适合情人节、恋爱、告白内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #7f3b52; font-size: 15px; background: #fff5f8; padding: 26px 22px;',
        h1Prefix: '💘 ',
        h1: 'font-size: 23px; font-weight: 800; color: #ffffff; margin: 28px 0 18px 0; line-height: 1.5; padding: 18px 22px; background: linear-gradient(135deg, #f43f5e 0%, #ec4899 100%); border-radius: 14px; text-align: center; letter-spacing: 2px; box-shadow: 0 8px 20px rgba(236,72,153,0.32);',
        h2Prefix: '💝 ',
        h2: 'font-size: 18px; font-weight: 800; color: #be185d; margin: 22px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #fdf2f8; border-radius: 10px; border-left: 5px solid #ec4899; letter-spacing: 0.6px;',
        h3Prefix: '💗 ',
        h3: 'font-size: 16px; font-weight: 700; color: #db2777; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.4px;',
        paragraph: 'font-size: 15px; color: #7f3b52; line-height: 2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: #fdf2f8; border-radius: 12px; border: 1px solid #fbcfe8;',
        listItem: 'font-size: 15px; color: #7f3b52; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '❤️',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'lantern-festival',
    name: '元宵花灯',
    category: '节日氛围',
    description: '暖红灯笼配色，团圆喜庆，适合元宵、庙会、传统节庆。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #7a3b28; font-size: 15px; background: #fff8f2; padding: 26px 22px;',
        h1Prefix: '🏮 ',
        h1: 'font-size: 23px; font-weight: 800; color: #ffffff; margin: 28px 0 18px 0; line-height: 1.5; padding: 18px 22px; background: linear-gradient(135deg, #ef4444 0%, #ea580c 100%); border-radius: 14px; text-align: center; letter-spacing: 2px; box-shadow: 0 8px 22px rgba(234,88,12,0.32);',
        h2Prefix: '✨ ',
        h2: 'font-size: 18px; font-weight: 800; color: #c2410c; margin: 22px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #fff7ed; border-radius: 10px; border-left: 5px solid #f97316; letter-spacing: 0.6px;',
        h3Prefix: '🎆 ',
        h3: 'font-size: 16px; font-weight: 700; color: #ea580c; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.4px;',
        paragraph: 'font-size: 15px; color: #7a3b28; line-height: 2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: #fff7ed; border-radius: 12px; border: 1px solid #fed7aa;',
        listItem: 'font-size: 15px; color: #7a3b28; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '🏮',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},

// ============ 可爱生活 ============
{
    id: 'kawaii-pink',
    name: '甜酷粉',
    category: '可爱生活',
    description: '甜酷粉紫撞色，元气满满，适合少女感、时尚穿搭、美妆内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #7c4560; font-size: 15px; background: #fff6fa; padding: 24px 20px;',
        h1Prefix: '💗 ',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%); border-radius: 16px; text-align: center; letter-spacing: 1.5px; box-shadow: 0 8px 20px rgba(236,72,153,0.3);',
        h2Prefix: '🌸 ',
        h2: 'font-size: 18px; font-weight: 800; color: #be185d; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #fdf2f8; border-radius: 12px; border-left: 5px solid #ec4899; letter-spacing: 0.4px;',
        h3Prefix: '🎀 ',
        h3: 'font-size: 16px; font-weight: 700; color: #db2777; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #7c4560; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #fdf2f8; border-radius: 14px; border: 1px dashed #f9a8d4;',
        listItem: 'font-size: 15px; color: #7c4560; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '💕',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'bunny-cute',
    name: '兔兔可爱',
    category: '可爱生活',
    description: '奶白浅粉 + 兔兔元素，软萌治愈，适合亲子、萌宠、治愈系内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #6b5b6e; font-size: 15px; background: #fdf9fc; padding: 24px 20px;',
        h1Prefix: '🐰 ',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, #f9a8d4 0%, #e9d5ff 100%); border-radius: 18px; text-align: center; letter-spacing: 1.5px; box-shadow: 0 8px 20px rgba(249,168,212,0.28);',
        h2Prefix: '🥕 ',
        h2: 'font-size: 18px; font-weight: 800; color: #be5683; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #fdf2f8; border-radius: 14px; border-left: 5px solid #f9a8d4; letter-spacing: 0.4px;',
        h3Prefix: '🍼 ',
        h3: 'font-size: 16px; font-weight: 700; color: #a855b7; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #6b5b6e; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #fdf2f8; border-radius: 16px; border: 1px solid #fbcfe8;',
        listItem: 'font-size: 15px; color: #6b5b6e; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '🐇',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'doodle-note',
    name: '手账涂鸦',
    category: '可爱生活',
    description: '手账贴纸感 + 涂鸦边框，随性记录风，适合手账、日常、plog。',
    style: {
        container: 'font-family: "Kaiti SC", "STKaiti", "KaiTi", "SimSun", serif; line-height: 1.95; color: #5c5350; font-size: 15px; background: #fdfcf8; padding: 26px 22px;',
        h1Prefix: '✏️ ',
        h1: 'font-size: 23px; font-weight: 800; color: #3f3a37; margin: 26px 0 16px 0; line-height: 1.5; padding: 14px 18px; border: 2px dashed #b08968; border-radius: 12px; text-align: center; letter-spacing: 2px; transform: rotate(-0.4deg);',
        h2Prefix: '📌 ',
        h2: 'font-size: 18px; font-weight: 700; color: #8a5a44; margin: 20px 0 12px 0; line-height: 1.5; padding: 8px 14px; background: #f6f0e4; border-radius: 8px; border-left: 5px solid #d4a373; letter-spacing: 0.6px;',
        h3Prefix: '🖍️ ',
        h3: 'font-size: 16px; font-weight: 700; color: #7a5c4d; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.4px;',
        paragraph: 'font-size: 15px; color: #5c5350; line-height: 2; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #faf6ec; border: 1px solid #e3d5bd; border-radius: 10px;',
        listItem: 'font-size: 15px; color: #5c5350; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '·',
        listMarker: 'color: #d4a373; margin-right: 10px; font-size: 18px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'milk-tea',
    name: '奶茶色',
    category: '可爱生活',
    description: '温暖奶茶棕色调，慵懒治愈，适合探店、咖啡、生活方式内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #6b4f3c; font-size: 15px; background: #faf5ec; padding: 24px 20px;',
        h1Prefix: '🧋 ',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, #c68a5b 0%, #a97142 100%); border-radius: 14px; text-align: center; letter-spacing: 1.5px; box-shadow: 0 8px 20px rgba(169,113,66,0.28);',
        h2Prefix: '☕ ',
        h2: 'font-size: 18px; font-weight: 800; color: #8a5a34; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #f5ecdd; border-radius: 10px; border-left: 5px solid #c68a5b; letter-spacing: 0.5px;',
        h3Prefix: '🍮 ',
        h3: 'font-size: 16px; font-weight: 700; color: #9c6b42; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #6b4f3c; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #f5ecdd; border-radius: 12px; border: 1px dashed #d9c3a4;',
        listItem: 'font-size: 15px; color: #6b4f3c; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '🧋',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},

// ============ 商务科技 ============
{
    id: 'fintech-blue',
    name: '金融科技蓝',
    category: '商务科技',
    description: '金融蓝与数据质感，严谨可靠，适合财经、投资、金融科普。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #334155; font-size: 15px; background: #f5f9ff; padding: 24px 20px;',
        h1Prefix: '📊 ',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, #1d4ed8 0%, #0e7490 100%); border-radius: 8px; letter-spacing: 1px; box-shadow: 0 6px 18px rgba(29,78,216,0.28);',
        h2Prefix: '📈 ',
        h2: 'font-size: 18px; font-weight: 700; color: #1e40af; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #e0f2fe; border-radius: 6px; border-left: 5px solid #0ea5e9; letter-spacing: 0.4px;',
        h3Prefix: '🔹 ',
        h3: 'font-size: 16px; font-weight: 700; color: #0369a1; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #334155; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bae6fd;',
        listItem: 'font-size: 15px; color: #334155; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #0ea5e9; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'corporate-dark',
    name: '企业深空',
    category: '商务科技',
    description: '深空蓝黑底色，沉稳大气，适合企业介绍、行业白皮书、高端发布。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.9; color: #cbd5e1; font-size: 15px; background: linear-gradient(160deg, #0f172a 0%, #172554 100%); padding: 28px 24px; border-radius: 12px;',
        h1: 'font-size: 23px; font-weight: 800; color: #ffffff; margin: 28px 0 18px 0; line-height: 1.5; padding: 18px 22px; background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); border-radius: 8px; text-align: center; letter-spacing: 2px; box-shadow: 0 8px 24px rgba(29,78,216,0.35);',
        h2: 'font-size: 18px; font-weight: 700; color: #93c5fd; margin: 22px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: rgba(59,130,246,0.1); border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0; letter-spacing: 0.6px;',
        h3: 'font-size: 16px; font-weight: 700; color: #bfdbfe; margin: 16px 0 10px 0; line-height: 1.5; padding-left: 10px; border-left: 3px solid #60a5fa; letter-spacing: 0.4px;',
        paragraph: 'font-size: 15px; color: #cbd5e1; line-height: 2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(96,165,250,0.3); border-radius: 10px;',
        listItem: 'font-size: 15px; color: #cbd5e1; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #60a5fa; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'data-report',
    name: '数据报告',
    category: '商务科技',
    description: '编号大标题 + 数据蓝配色，结构清晰，适合报告、复盘、方法论。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #3f4756; font-size: 15px; background: #ffffff; padding: 24px 20px;',
        h1Prefix: '0',
        h1: 'font-size: 22px; font-weight: 800; color: #0f172a; margin: 28px 0 14px 0; line-height: 1.5; padding: 8px 0; border-bottom: 3px solid #2563eb; letter-spacing: 0.5px;',
        h2Prefix: '▍',
        h2: 'font-size: 18px; font-weight: 700; color: #1e3a8a; margin: 20px 0 12px 0; line-height: 1.5; padding: 8px 12px; background: #f1f5f9; border-radius: 6px; border-left: 4px solid #2563eb; letter-spacing: 0.4px;',
        h3: 'font-size: 16px; font-weight: 700; color: #2563eb; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #3f4756; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;',
        listItem: 'font-size: 15px; color: #3f4756; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #2563eb; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'startup-gradient',
    name: '创投渐变',
    category: '商务科技',
    description: '活力渐变 + 火箭元素，创业氛围，适合融资、产品发布、增长故事。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #44403c; font-size: 15px; background: #fffafd; padding: 24px 20px;',
        h1Prefix: '🚀 ',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, #f97316 0%, #ec4899 55%, #8b5cf6 100%); border-radius: 10px; text-align: center; letter-spacing: 1px; box-shadow: 0 8px 22px rgba(236,72,153,0.3);',
        h2Prefix: '💡 ',
        h2: 'font-size: 18px; font-weight: 800; color: #be185d; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: linear-gradient(to right, #fff1f2 0%, #faf5ff 100%); border-radius: 8px; border-left: 5px solid #ec4899; letter-spacing: 0.4px;',
        h3Prefix: '⚡ ',
        h3: 'font-size: 16px; font-weight: 700; color: #7c3aed; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #44403c; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #fff7f9; border-radius: 10px; border: 1px dashed #f9a8d4;',
        listItem: 'font-size: 15px; color: #44403c; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #ec4899; margin-right: 10px; font-weight: 800; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},


// ============ 自然清新 ============
{
    id: 'forest-green',
    name: '森林绿',
    category: '自然清新',
    description: '深邃森林绿系，自然沉稳，适合户外、环保、原生态内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #36543a; font-size: 15px; background: #f4f8f2; padding: 24px 20px;',
        h1Prefix: '🌲 ',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, #166534 0%, #14532d 100%); border-radius: 10px; letter-spacing: 1px; box-shadow: 0 8px 20px rgba(22,101,52,0.28);',
        h2Prefix: '🌿 ',
        h2: 'font-size: 18px; font-weight: 800; color: #166534; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #f0fdf4; border-radius: 8px; border-left: 5px solid #16a34a; letter-spacing: 0.4px;',
        h3Prefix: '🍃 ',
        h3: 'font-size: 16px; font-weight: 700; color: #15803d; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #36543a; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #f0fdf4; border-radius: 10px; border: 1px solid #bbf7d0;',
        listItem: 'font-size: 15px; color: #36543a; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '🌱',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'ocean-breeze',
    name: '海洋微风',
    category: '自然清新',
    description: '清爽海洋蓝系，通透凉爽，适合旅行、潜水、夏日内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #315e6b; font-size: 15px; background: #f2fafc; padding: 24px 20px;',
        h1Prefix: '🌊 ',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); border-radius: 12px; letter-spacing: 1px; box-shadow: 0 8px 20px rgba(6,182,212,0.28);',
        h2Prefix: '🐚 ',
        h2: 'font-size: 18px; font-weight: 800; color: #0e7490; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #ecfeff; border-radius: 10px; border-left: 5px solid #06b6d4; letter-spacing: 0.4px;',
        h3Prefix: '🫧 ',
        h3: 'font-size: 16px; font-weight: 700; color: #0891b2; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #315e6b; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #ecfeff; border-radius: 12px; border: 1px solid #a5f3fc;',
        listItem: 'font-size: 15px; color: #315e6b; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '🌊',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'sky-clear',
    name: '晴空蓝',
    category: '自然清新',
    description: '浅蓝晴空色系，轻盈明快，适合天气、旅行、轻阅读内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #3f5870; font-size: 15px; background: #f5faff; padding: 24px 20px;',
        h1Prefix: '☀️ ',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%); border-radius: 14px; text-align: center; letter-spacing: 1.5px; box-shadow: 0 8px 20px rgba(56,189,248,0.28);',
        h2Prefix: '☁️ ',
        h2: 'font-size: 18px; font-weight: 800; color: #0369a1; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #f0f9ff; border-radius: 10px; border-left: 5px solid #38bdf8; letter-spacing: 0.4px;',
        h3Prefix: '🕊️ ',
        h3: 'font-size: 16px; font-weight: 700; color: #0284c7; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #3f5870; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #f0f9ff; border-radius: 12px; border: 1px solid #bae6fd;',
        listItem: 'font-size: 15px; color: #3f5870; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '☁️',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},
{
    id: 'sunrise-peach',
    name: '晨光桃',
    category: '自然清新',
    description: '晨光蜜桃渐变色，温柔明亮，适合早安、治愈、女性生活方式。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #7c4a3a; font-size: 15px; background: #fff8f3; padding: 24px 20px;',
        h1Prefix: '🌅 ',
        h1: 'font-size: 22px; font-weight: 800; color: #ffffff; margin: 26px 0 16px 0; line-height: 1.5; padding: 17px 22px; background: linear-gradient(135deg, #fdba74 0%, #fb923c 100%); border-radius: 16px; text-align: center; letter-spacing: 1.5px; box-shadow: 0 8px 20px rgba(251,146,60,0.28);',
        h2Prefix: '🍑 ',
        h2: 'font-size: 18px; font-weight: 800; color: #c2410c; margin: 20px 0 12px 0; line-height: 1.5; padding: 10px 16px; background: #fff7ed; border-radius: 12px; border-left: 5px solid #fb923c; letter-spacing: 0.4px;',
        h3Prefix: '🌸 ',
        h3: 'font-size: 16px; font-weight: 700; color: #ea580c; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.3px;',
        paragraph: 'font-size: 15px; color: #7c4a3a; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #fff7ed; border-radius: 14px; border: 1px dashed #fed7aa;',
        listItem: 'font-size: 15px; color: #7c4a3a; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '🌷',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 12px;'
    }
},

// ============ 创意大胆 ============
{
    id: 'neon-pop',
    name: '霓虹波普',
    category: '创意大胆',
    description: '霓虹撞色与波普符号，大胆张扬，适合潮牌、夜店、青年文化。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #f5f3ff; font-size: 15px; background: #150a24; padding: 28px 22px; border-radius: 12px;',
        h1: 'font-size: 25px; font-weight: 800; color: #fde047; margin: 28px 0 18px 0; line-height: 1.4; padding: 14px 8px; text-align: center; letter-spacing: 2px; text-shadow: 0 0 12px rgba(253,224,71,0.6), 4px 4px 0 #ec4899, -4px -4px 0 #22d3ee;',
        h2: 'font-size: 18px; font-weight: 800; color: #22d3ee; margin: 22px 0 12px 0; line-height: 1.5; padding: 8px 14px; background: rgba(34,211,238,0.1); border-left: 6px solid #22d3ee; letter-spacing: 1px; text-shadow: 0 0 10px rgba(34,211,238,0.5);',
        h3: 'font-size: 16px; font-weight: 700; color: #f0abfc; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 0.6px;',
        paragraph: 'font-size: 15px; color: #f5f3ff; line-height: 2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; background: rgba(240,171,252,0.07); border: 1px solid rgba(240,171,252,0.4); border-radius: 10px;',
        listItem: 'font-size: 15px; color: #f5f3ff; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '⚡',
        listMarker: 'margin-right: 10px; font-size: 15px; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'brutalist',
    name: '粗野主义',
    category: '创意大胆',
    description: '硬朗黑粗边与硬投影，反精致设计，适合实验、先锋、宣言式内容。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #18181b; font-size: 15px; background: #ffffff; padding: 26px 20px;',
        h1: 'font-size: 26px; font-weight: 900; color: #ffffff; margin: 30px 0 18px 0; line-height: 1.3; padding: 14px 18px; background: #18181b; border: 4px solid #18181b; box-shadow: 6px 6px 0 #facc15; text-align: center; letter-spacing: 1px;',
        h2: 'font-size: 19px; font-weight: 900; color: #18181b; margin: 24px 0 12px 0; line-height: 1.4; padding: 10px 14px; border: 3px solid #18181b; box-shadow: 4px 4px 0 #18181b; letter-spacing: 0.6px;',
        h3: 'font-size: 16px; font-weight: 800; color: #18181b; margin: 16px 0 10px 0; line-height: 1.5; padding: 4px 0; border-bottom: 3px solid #facc15; display: inline-block; letter-spacing: 0.4px;',
        paragraph: 'font-size: 15px; color: #18181b; line-height: 2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 20px; border: 3px solid #18181b; background: #fafafa;',
        listItem: 'font-size: 15px; color: #18181b; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'color: #dc2626; margin-right: 10px; font-weight: 900; flex-shrink: 0;',
        spacing: 'height: 14px;'
    }
},
{
    id: 'ink-splash',
    name: '泼墨涂鸦',
    category: '创意大胆',
    description: '自由泼墨笔触与大字排印，随性张力，适合街头、潮流、音乐内容。',
    style: {
        container: 'font-family: "STKaiti", "KaiTi", "Kaiti SC", "SimSun", serif; line-height: 2; color: #2b2b2b; font-size: 15px; background: #faf8f4; padding: 28px 22px;',
        h1: 'font-size: 28px; font-weight: 900; color: #111; margin: 30px 0 20px 0; line-height: 1.3; text-align: center; letter-spacing: 4px; text-shadow: 2px 2px 0 #fbbf24; transform: rotate(-1deg);',
        h2: 'font-size: 20px; font-weight: 900; color: #111; margin: 24px 0 12px 0; line-height: 1.5; padding: 6px 0 6px 16px; border-left: 8px solid #f59e0b; letter-spacing: 2px;',
        h3: 'font-size: 17px; font-weight: 800; color: #333; margin: 16px 0 10px 0; line-height: 1.5; letter-spacing: 1px;',
        paragraph: 'font-size: 15px; color: #2b2b2b; line-height: 2.2; margin: 14px 0; text-align: justify;',
        listContainer: 'margin: 18px 0; padding: 18px 22px; background: #f3efe6; border: 2px solid #2b2b2b; transform: rotate(-0.3deg);',
        listItem: 'font-size: 15px; color: #2b2b2b; line-height: 2; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarkerContent: '✶',
        listMarker: 'color: #f59e0b; margin-right: 10px; font-size: 18px; font-weight: 900; flex-shrink: 0;',
        spacing: 'height: 16px;'
    }
},
{
    id: 'geometric-color',
    name: '几何撞色',
    category: '创意大胆',
    description: '几何色块与高饱和撞色，现代主义，适合展览、建筑、设计评论。',
    style: {
        container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; line-height: 1.85; color: #27272a; font-size: 15px; background: #ffffff; padding: 24px 20px;',
        h1: 'font-size: 24px; font-weight: 900; color: #ffffff; margin: 28px 0 18px 0; line-height: 1.4; padding: 16px 20px; background: linear-gradient(135deg, #facc15 0%, #f97316 33%, #ec4899 66%, #8b5cf6 100%); border-radius: 4px; text-align: center; letter-spacing: 2px; box-shadow: 8px 8px 0 #18181b;',
        h2: 'font-size: 19px; font-weight: 800; color: #18181b; margin: 22px 0 12px 0; line-height: 1.5; padding: 10px 14px; background: #fde047; border: 2px solid #18181b; box-shadow: 4px 4px 0 #18181b; letter-spacing: 0.6px;',
        h3: 'font-size: 16px; font-weight: 800; color: #18181b; margin: 16px 0 10px 0; line-height: 1.5; padding-left: 12px; border-left: 6px solid #ec4899; letter-spacing: 0.4px;',
        paragraph: 'font-size: 15px; color: #27272a; line-height: 1.95; margin: 12px 0; text-align: justify;',
        listContainer: 'margin: 16px 0; padding: 16px 18px; background: #f4f4f5; border: 2px solid #18181b; box-shadow: 4px 4px 0 #22d3ee;',
        listItem: 'font-size: 15px; color: #27272a; line-height: 1.9; margin: 8px 0; display: flex; align-items: flex-start;',
        listMarker: 'display: inline-block; width: 18px; height: 18px; background: #ec4899; margin-right: 10px; flex-shrink: 0; border-radius: 2px;',
        spacing: 'height: 14px;'
    }
}
];


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
};


// ---------- 调色板库（按分类） ----------
const PALETTES = [
    // 简约专业
    { arch: 'gradientHero', id: 'slate-blue', name: '石板蓝', category: '简约专业', description: '冷静的石板蓝渐变，沉稳耐看。', c1: '#64748b', c2: '#475569', bg: '#f8fafc', text: '#334155' },
    { arch: 'underlineMin', id: 'cool-gray', name: '冷调灰', category: '简约专业', description: '克制冷灰与单线装饰，理性克制。', c1: '#71717a', bg: '#fafafa', text: '#3f3f46' },
    { arch: 'leftStripe', id: 'navy-line', name: '海军线', category: '简约专业', description: '海军蓝竖条标识，利落干脆。', c1: '#1e3a8a', bg: '#ffffff', text: '#334155' },
    { arch: 'paperSerif', id: 'ivory', name: '象牙白', category: '简约专业', description: '象牙白衬线排版，温润耐读。', c1: '#7c5a2e', bg: '#faf6ef', text: '#5c4a32' },
    { arch: 'darkNeon', id: 'graphite', name: '石墨', category: '简约专业', description: '石墨深色与冷静青蓝，克制科技感。', c1: '#1f2937', c2: '#111827', g1: '#94a3b8', g2: '#64748b', text: '#d1d5db' },
    { arch: 'softChip', id: 'sky-simple', name: '浅空', category: '简约专业', description: '浅蓝胶囊标题，轻盈通透。', c1: '#38bdf8', c2: '#0ea5e9', bg: '#f5faff', text: '#3f5870' },
    { arch: 'solidBlock', id: 'charcoal', name: '炭黑', category: '简约专业', description: '炭黑块状标题，硬朗分明。', c1: '#111827', bg: '#ffffff', text: '#374151' },
    { arch: 'frameBorder', id: 'silver', name: '银灰', category: '简约专业', description: '银灰画框标题，精致有序。', c1: '#9ca3af', bg: '#ffffff', text: '#4b5563', cardBg: '#fafafa' },
    { arch: 'numbered', id: 'royal-navy', name: '皇家蓝', category: '简约专业', description: '皇家蓝编号水印，结构化表达。', c1: '#1d4ed8', bg: '#f8faff', text: '#334155' },
    { arch: 'underlineMin', id: 'platinum', name: '铂金', category: '简约专业', description: '铂金灰底细线，干净利落。', c1: '#334155', bg: '#fbfbfd', text: '#3f4756', cardBg: '#ffffff' },

    // 视觉平衡
    { arch: 'gradientHero', id: 'coral-teal', name: '珊瑚青', category: '视觉平衡', description: '珊瑚红与青碧双拼，明快平衡。', c1: '#f43f5e', c2: '#14b8a6', bg: '#fdfafb', text: '#4c4a52' },
    { arch: 'gradientHero', id: 'indigo-rose', name: '靛蓝玫瑰', category: '视觉平衡', description: '靛蓝与玫瑰粉渐变，优雅有张力。', c1: '#6366f1', c2: '#f472b6', bg: '#fbfaff', text: '#4c4a5c' },
    { arch: 'softChip', id: 'mint', name: '薄荷', category: '视觉平衡', description: '薄荷绿胶囊，清新醒神。', c1: '#34d399', c2: '#10b981', bg: '#f3fdf8', text: '#2f5d4b' },
    { arch: 'gradientHero', id: 'amber-sky', name: '琥珀晴', category: '视觉平衡', description: '琥珀与晴蓝对撞，温暖开朗。', c1: '#f59e0b', c2: '#38bdf8', bg: '#fffbf2', text: '#5b4a2e' },
    { arch: 'leftStripe', id: 'jade', name: '翡翠', category: '视觉平衡', description: '翡翠绿竖条，雅致匀称。', c1: '#10b981', bg: '#f5fbf8', text: '#355a4c' },
    { arch: 'softChip', id: 'sky-pink', name: '天空粉', category: '视觉平衡', description: '天蓝与粉色糖果渐变，甜美平衡。', c1: '#0ea5e9', c2: '#f472b6', bg: '#f6fbfe', text: '#3f5870' },
    { arch: 'softChip', id: 'lavender', name: '薰衣草', category: '视觉平衡', description: '薰衣草紫胶囊，静谧柔和。', c1: '#a78bfa', c2: '#8b5cf6', bg: '#faf9ff', text: '#4c4a5c' },
    { arch: 'paperSerif', id: 'peach-cream', name: '蜜桃奶油', category: '视觉平衡', description: '蜜桃奶油衬线，温柔治愈。', c1: '#fb923c', bg: '#fff8f2', text: '#6b4a3a' },
    { arch: 'darkNeon', id: 'ocean-teal', name: '海洋青', category: '视觉平衡', description: '深海青背景配荧光青，冷静通透。', c1: '#042f2e', c2: '#134e4a', g1: '#2dd4bf', g2: '#22d3ee', text: '#ccfbf1' },
    { arch: 'frameBorder', id: 'rose-gold', name: '玫瑰金', category: '视觉平衡', description: '玫瑰金描边，精致浪漫。', c1: '#e11d48', bg: '#fff8fa', text: '#7c3a4e', cardBg: '#fdf2f6' },

    // 丰富装饰
    { arch: 'darkNeon', id: 'galaxy', name: '星河', category: '丰富装饰', description: '深紫星河底配青紫极光，梦幻。', c1: '#1e1b4b', c2: '#0f172a', g1: '#a78bfa', g2: '#22d3ee', text: '#e0e7ff' },
    { arch: 'gradientHero', id: 'rainbow', name: '彩虹', category: '丰富装饰', description: '橙紫大跨度渐变，缤纷热烈。', c1: '#f97316', c2: '#8b5cf6', bg: '#fffaf5', text: '#4c3a3a' },
    { arch: 'emojiList', id: 'confetti', name: '五彩纸屑', category: '丰富装饰', description: '彩色纸屑元素，派对氛围。', c1: '#f59e0b', c2: '#ec4899', bg: '#fffbf5', text: '#5b4a3a', h1e: '🎊', h2e: '🎉', h3e: '🎈', marker: '🎊' },
    { arch: 'frameBorder', id: 'diamond', name: '钻石', category: '丰富装饰', description: '宝蓝双线画框，璀璨精致。', c1: '#0284c7', bg: '#ffffff', text: '#36586b', cardBg: '#f5fbff' },
    { arch: 'solidBlock', id: 'royal-purple', name: '帝王紫', category: '丰富装饰', description: '帝王紫块状标题，华丽醒目。', c1: '#7c3aed', bg: '#fbfaff', text: '#4c4a5c' },
    { arch: 'softChip', id: 'cherry', name: '樱桃红', category: '丰富装饰', description: '樱桃红胶囊，明亮活泼。', c1: '#e11d48', c2: '#be123c', bg: '#fff8fa', text: '#7c3a4e' },
    { arch: 'numbered', id: 'emerald-gold', name: '翡翠金', category: '丰富装饰', description: '翡翠绿配金点缀，贵气内敛。', c1: '#059669', accent: '#b8860b', bg: '#f6fbf8', text: '#2f5d4b' },
    { arch: 'darkNeon', id: 'ocean-night', name: '深海之夜', category: '丰富装饰', description: '深海蓝黑底与亮青，沉浸科技。', c1: '#0f172a', c2: '#082f49', g1: '#22d3ee', g2: '#818cf8', text: '#cbd5e1' },
    { arch: 'emojiList', id: 'sparkle', name: '闪粉', category: '丰富装饰', description: '粉紫闪粉元素，闪闪发光。', c1: '#f472b6', c2: '#a78bfa', bg: '#fff6fb', text: '#7c4560', h1e: '✨', h2e: '💖', h3e: '🌟', marker: '✨' },
    { arch: 'paperSerif', id: 'bronze', name: '古铜', category: '丰富装饰', description: '古铜色衬线，年代质感。', c1: '#b45309', bg: '#faf5ec', text: '#6b4a2a' },

    // 文艺复古
    { arch: 'paperSerif', id: 'old-shanghai', name: '老上海', category: '文艺复古', description: '老上海风情红与米纸，怀旧。', c1: '#8b1a1a', bg: '#f6efe3', text: '#5c4a3a' },
    { arch: 'solidBlock', id: 'chinese-red', name: '中国红', category: '文艺复古', description: '纯正中国红块标题，端庄大气。', c1: '#9e1f1f', bg: '#faf6f1', text: '#5c3a3a' },
    { arch: 'paperSerif', id: 'bamboo', name: '竹韵', category: '文艺复古', description: '竹青衬线排版，清雅脱俗。', c1: '#166534', bg: '#f4f8f2', text: '#36543a' },
    { arch: 'numbered', id: 'seal-red', name: '印泥红', category: '文艺复古', description: '印泥红编号水印，古意盎然。', c1: '#c0392b', bg: '#faf6f1', text: '#5c4a3a' },
    { arch: 'paperSerif', id: 'coffee-stained', name: '咖啡渍', category: '文艺复古', description: '咖啡棕纸张，慵懒复古。', c1: '#6b4a2a', bg: '#f5efe4', text: '#57432e' },
    { arch: 'leftStripe', id: 'blue-porcelain', name: '青花瓷', category: '文艺复古', description: '青花瓷蓝竖条，古典雅致。', c1: '#1e40af', bg: '#f6f8fc', text: '#364a63' },
    { arch: 'frameBorder', id: 'gold-leaf', name: '金箔', category: '文艺复古', description: '金箔描边画框，富丽堂皇。', c1: '#b8860b', bg: '#fbf7ec', text: '#6b5433', cardBg: '#fffdf5' },
    { arch: 'darkNeon', id: 'smoke-ink', name: '烟墨', category: '文艺复古', description: '烟墨深底与暖金，沉静典雅。', c1: '#1c1917', c2: '#292524', g1: '#e7b86a', g2: '#d6a34e', text: '#e7e5e4' },
    { arch: 'paperSerif', id: 'aged-photo', name: '老照片', category: '文艺复古', description: '泛黄老照片色调，时光沉淀。', c1: '#7f1d1d', bg: '#f2ead9', text: '#5c4a3a' },
    { arch: 'paperSerif', id: 'wheat-field', name: '麦田', category: '文艺复古', description: '麦田金黄衬线，丰收温暖。', c1: '#a16207', bg: '#faf3e3', text: '#5c4a2e' },

    // 节日氛围
    { arch: 'emojiList', id: 'lunar-newyear', name: '迎新春', category: '节日氛围', description: '新春红金元素，喜气洋洋。', c1: '#dc2626', c2: '#f59e0b', bg: '#fff8f5', text: '#7c2d2d', h1e: '🧧', h2e: '🏮', h3e: '🎊', marker: '🧧' },
    { arch: 'solidBlock', id: 'christmas-red', name: '圣诞红', category: '节日氛围', description: '圣诞红块标题，节日气氛浓。', c1: '#dc2626', bg: '#fdfaf7', text: '#7c2d2d' },
    { arch: 'leftStripe', id: 'st-patrick', name: '圣帕翠克绿', category: '节日氛围', description: '爱尔兰绿竖条，清爽节日感。', c1: '#16a34a', bg: '#f6fbf6', text: '#36543a' },
    { arch: 'paperSerif', id: 'mid-autumn', name: '中秋月', category: '节日氛围', description: '中秋暖金衬线，团圆静谧。', c1: '#b45309', bg: '#faf5ec', text: '#6b4a2a' },
    { arch: 'softChip', id: 'easter-egg', name: '复活节彩蛋', category: '节日氛围', description: '彩蛋粉绿胶囊，俏皮欢乐。', c1: '#f9a8d4', c2: '#86efac', bg: '#fdfafc', text: '#6b5b6e' },
    { arch: 'emojiList', id: 'birthday', name: '生日派对', category: '节日氛围', description: '生日气球元素，热闹开心。', c1: '#ec4899', c2: '#f59e0b', bg: '#fff6fb', text: '#7c4560', h1e: '🎂', h2e: '🎈', h3e: '🎁', marker: '🎈' },
    { arch: 'darkNeon', id: 'fireworks', name: '烟花', category: '节日氛围', description: '夜空烟花渐变，璀璨夺目。', c1: '#1e1b4b', c2: '#2d1b4e', g1: '#fbbf24', g2: '#ec4899', text: '#e9d5ff' },
    { arch: 'solidBlock', id: 'dragon-boat', name: '端午', category: '节日氛围', description: '端午青绿块标题，传统清新。', c1: '#166534', bg: '#f4f8f2', text: '#36543a' },

    // 可爱生活
    { arch: 'softChip', id: 'strawberry', name: '草莓', category: '可爱生活', description: '草莓红胶囊，甜美可人。', c1: '#fb7185', c2: '#f43f5e', bg: '#fff6f7', text: '#7c4560', emoji: '🍓' },
    { arch: 'gradientHero', id: 'lemon', name: '柠檬黄', category: '可爱生活', description: '柠檬黄渐变，元气活力。', c1: '#facc15', c2: '#f97316', bg: '#fffdf2', text: '#6b5a2e' },
    { arch: 'frameBorder', id: 'panda', name: '熊猫', category: '可爱生活', description: '黑白熊猫画框，憨态可掬。', c1: '#27272a', bg: '#fafafa', text: '#44403c', cardBg: '#ffffff' },
    { arch: 'emojiList', id: 'kitty', name: '猫咪', category: '可爱生活', description: '粉猫元素，软萌治愈。', c1: '#f9a8d4', c2: '#c4b5fd', bg: '#fdf7fc', text: '#6b5b6e', h1e: '🐱', h2e: '🐾', h3e: '🎀', marker: '🐾' },
    { arch: 'softChip', id: 'cotton-candy', name: '棉花糖', category: '可爱生活', description: '棉花糖粉紫，绵软梦幻。', c1: '#f0abfc', c2: '#d8b4fe', bg: '#fdf7fe', text: '#6b5b7a', emoji: '🍭' },
    { arch: 'gradientHero', id: 'bubble-tea-purple', name: '紫芋', category: '可爱生活', description: '紫芋奶茶渐变，香糯温柔。', c1: '#c084fc', c2: '#a855f7', bg: '#faf7ff', text: '#5c4a6e' },
    { arch: 'emojiList', id: 'ice-cream', name: '冰淇淋', category: '可爱生活', description: '冰淇淋蓝粉元素，清凉甜蜜。', c1: '#7dd3fc', c2: '#f9a8d4', bg: '#f4fbff', text: '#3f5870', h1e: '🍦', h2e: '🍧', h3e: '🍨', marker: '🍦' },
    { arch: 'solidBlock', id: 'puppy', name: '小狗', category: '可爱生活', description: '暖棕狗系块标题，忠诚温暖。', c1: '#d97706', bg: '#fffaf3', text: '#6b4a2a' },

    // 商务科技
    { arch: 'darkNeon', id: 'deep-tech', name: '深科技', category: '商务科技', description: '深空蓝黑与电光青，硬核科技。', c1: '#020617', c2: '#1e3a8a', g1: '#22d3ee', g2: '#3b82f6', text: '#cbd5e1' },
    { arch: 'gradientHero', id: 'cloud-azure', name: '云上蓝', category: '商务科技', description: '天蓝到深蓝渐变，云服务质感。', c1: '#0ea5e9', c2: '#2563eb', bg: '#f5faff', text: '#334155' },
    { arch: 'darkNeon', id: 'security-dark', name: '安全深绿', category: '商务科技', description: '深绿安全底色，可靠信赖。', c1: '#022c22', c2: '#064e3b', g1: '#34d399', g2: '#10b981', text: '#d1fae5' },
    { arch: 'gradientHero', id: 'ai-magenta', name: 'AI洋红', category: '商务科技', description: 'AI 洋红紫渐变，前沿智能感。', c1: '#ec4899', c2: '#8b5cf6', bg: '#fdf8ff', text: '#4c4a5c' },
    { arch: 'frameBorder', id: 'blockchain', name: '区块链金', category: '商务科技', description: '区块金描边，数字资产质感。', c1: '#b45309', bg: '#fbf8f2', text: '#6b4a2a', cardBg: '#fffdf7' },
    { arch: 'numbered', id: 'precision', name: '精密仪器', category: '商务科技', description: '精密青编号水印，严谨专业。', c1: '#0f766e', bg: '#f5fbfa', text: '#36544f' },
    { arch: 'gradientHero', id: 'startup-blue', name: '创业蓝', category: '商务科技', description: '创业亮蓝渐变，进取活力。', c1: '#3b82f6', c2: '#06b6d4', bg: '#f5faff', text: '#334155' },
    { arch: 'darkNeon', id: 'matrix', name: '矩阵绿', category: '商务科技', description: '黑客矩阵绿，极客风十足。', c1: '#052e16', c2: '#14532d', g1: '#4ade80', g2: '#22c55e', text: '#bbf7d0' },
    { arch: 'frameBorder', id: 'executive', name: '高管黑金', category: '商务科技', description: '黑金高管画框，低调奢华。', c1: '#111827', accent: '#b8860b', bg: '#fafafa', text: '#374151', cardBg: '#ffffff' },
    { arch: 'softChip', id: 'cloud-soft', name: '云服务浅蓝', category: '商务科技', description: '云服务浅蓝胶囊，友好现代。', c1: '#7dd3fc', c2: '#38bdf8', bg: '#f4fbff', text: '#3f5870' },

    // 自然清新
    { arch: 'gradientHero', id: 'waterfall', name: '瀑布', category: '自然清新', description: '瀑布青蓝渐变，清凉奔涌。', c1: '#2dd4bf', c2: '#0891b2', bg: '#f2fbfa', text: '#315e6b' },
    { arch: 'leftStripe', id: 'meadow', name: '草地', category: '自然清新', description: '草绿竖条，清新开阔。', c1: '#65a30d', bg: '#f7fbf0', text: '#4a5d33' },
    { arch: 'softChip', id: 'sakura', name: '樱花', category: '自然清新', description: '樱花粉胶囊，春日浪漫。', c1: '#fda4af', c2: '#fb7185', bg: '#fff7f8', text: '#7c4560', emoji: '🌸' },
    { arch: 'paperSerif', id: 'bamboo-forest', name: '竹林', category: '自然清新', description: '竹林青衬线，清幽宁静。', c1: '#4d7c0f', bg: '#f5f8ee', text: '#4a5d33' },
    { arch: 'darkNeon', id: 'deep-ocean', name: '深海', category: '自然清新', description: '深海蓝底与荧光青，神秘深邃。', c1: '#082f49', c2: '#0c4a6e', g1: '#38bdf8', g2: '#22d3ee', text: '#e0f2fe' },
    { arch: 'underlineMin', id: 'alpine', name: '高山雪', category: '自然清新', description: '山雪灰蓝细线，清冽纯净。', c1: '#64748b', bg: '#f8fafc', text: '#475569', cardBg: '#ffffff' },
    { arch: 'gradientHero', id: 'rain-forest', name: '雨林', category: '自然清新', description: '雨林深绿渐变，葱郁生机。', c1: '#16a34a', c2: '#0d9488', bg: '#f3faf5', text: '#36543a' },
    { arch: 'gradientHero', id: 'sunrise-meadow', name: '晨曦草地', category: '自然清新', description: '晨光黄与草绿渐变，朝气蓬勃。', c1: '#fbbf24', c2: '#84cc16', bg: '#fffdf4', text: '#5b5a2e' },
    { arch: 'softChip', id: 'coral-reef', name: '珊瑚礁', category: '自然清新', description: '珊瑚粉橙胶囊，热带明媚。', c1: '#fb7185', c2: '#f59e0b', bg: '#fff7f6', text: '#7c4a4a', emoji: '🪸' },
    { arch: 'paperSerif', id: 'misty-lake', name: '雾湖', category: '自然清新', description: '雾湖灰蓝衬线，朦胧诗意。', c1: '#64748b', bg: '#f4f7fa', text: '#475569' },

    // 创意大胆
    { arch: 'darkNeon', id: 'vaporwave', name: '蒸汽波', category: '创意大胆', description: '蒸汽波粉青对撞，复古未来。', c1: '#2a0a3a', c2: '#170a2e', g1: '#f0abfc', g2: '#22d3ee', text: '#e9d5ff' },
    { arch: 'solidBlock', id: 'pop-art', name: '波普艺术', category: '创意大胆', description: '波普黄块标题，大胆醒目。', c1: '#facc15', bg: '#ffffff', text: '#27272a' },
    { arch: 'gradientHero', id: 'acid-green', name: '酸性绿', category: '创意大胆', description: '酸性黄绿渐变，街头锐利。', c1: '#a3e635', c2: '#22d3ee', bg: '#f6fbf4', text: '#3f4a3c' },
    { arch: 'frameBorder', id: 'zebra', name: '斑马', category: '创意大胆', description: '黑白斑马条纹框，摩登复古。', c1: '#18181b', bg: '#ffffff', text: '#27272a', cardBg: '#fafafa' },
    { arch: 'emojiList', id: 'graffiti', name: '涂鸦', category: '创意大胆', description: '涂鸦喷漆元素，自由张扬。', c1: '#f97316', c2: '#ec4899', bg: '#fffaf5', text: '#5b4a3a', h1e: '🎨', h2e: '🖌️', h3e: '🖍️', marker: '✖' },
    { arch: 'darkNeon', id: 'tron', name: '创战纪', category: '创意大胆', description: '创战纪霓虹蓝紫，未来竞速。', c1: '#050a1f', c2: '#111c3d', g1: '#22d3ee', g2: '#818cf8', text: '#c7d2fe' },
    { arch: 'frameBorder', id: 'comic', name: '漫画', category: '创意大胆', description: '漫画描边对话框风，夸张搞笑。', c1: '#dc2626', bg: '#fffbf7', text: '#4c3a3a', cardBg: '#fffdf8' },
    { arch: 'underlineMin', id: 'chrome', name: '电镀', category: '创意大胆', description: '金属灰电镀线条，硬核冷峻。', c1: '#475569', bg: '#f8fafc', text: '#334155', cardBg: '#ffffff' },
    { arch: 'emojiList', id: 'punk', name: '朋克', category: '创意大胆', description: '朋克撞色元素，叛逆率性。', c1: '#ec4899', c2: '#22d3ee', bg: '#fff6fb', text: '#7c4560', h1e: '🤘', h2e: '⚡', h3e: '🔥', marker: '⚡' },
    { arch: 'numbered', id: 'swiss', name: '瑞士国际', category: '创意大胆', description: '瑞士国际主义编号排版，理性先锋。', c1: '#dc2626', bg: '#ffffff', text: '#27272a' }
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

// =========================================================
// 小红书模板生成器（居中排版 / Emoji / 荧光笔 / 卡片等）
// =========================================================

const XHS_ARCHETYPES = {

    // 1. Emoji 装饰（小红书最常用）
    xhsEmoji(p) {
        return {
            container: `font-family: ${F_SANS}; line-height: 1.9; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 26px 22px;`,
            h1Prefix: (p.h1e || '🌷') + ' ',
            h1: `font-size: 23px; font-weight: 800; color: #ffffff; margin: 28px 0 18px 0; line-height: 1.5; padding: 16px 24px; background: linear-gradient(135deg, ${p.c1} 0%, ${p.c2} 100%); border-radius: 16px; text-align: center; letter-spacing: 1px; box-shadow: 0 8px 20px ${hexToRgba(p.c1, 0.25)};`,
            h2Prefix: (p.h2e || '⭐') + ' ',
            h2: `font-size: 18px; font-weight: 800; color: ${p.c1}; margin: 22px 0 12px 0; line-height: 1.6; padding: 8px 16px; background: ${hexToRgba(p.c1, 0.08)}; border-radius: 10px; letter-spacing: 0.4px;`,
            h3Prefix: (p.h3e || '🔸') + ' ',
            h3: `font-size: 16px; font-weight: 700; color: ${p.c1}; margin: 16px 0 10px 0; line-height: 1.6; letter-spacing: 0.3px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 14px 0; text-align: justify;`,
            listContainer: `margin: 18px 0; padding: 18px 20px; background: ${p.bg2 || '#ffffff'}; border-radius: 14px; border: 1px solid ${hexToRgba(p.c1, 0.18)};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 10px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: p.marker || '🌷',
            listMarker: `margin-right: 10px; font-size: 16px; flex-shrink: 0;`,
            spacing: 'height: 16px;'
        };
    },

    // 2. 居中排版（小红书图文特色）
    xhsCentered(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 2; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 28px 24px; text-align: center;`,
            h1Prefix: (p.dec || '✿') + ' ',
            h1Suffix: ' ' + (p.dec || '✿'),
            h1: `font-size: 24px; font-weight: 800; color: ${a}; margin: 30px 0 20px 0; line-height: 1.6; letter-spacing: 2px;`,
            h2Prefix: p.h2e || '',
            h2: `font-size: 19px; font-weight: 800; color: ${a}; margin: 24px 0 14px 0; line-height: 1.6; padding-bottom: 8px; border-bottom: 2px solid ${hexToRgba(a, 0.3)}; display: inline-block; letter-spacing: 1px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${p.text}; margin: 16px 0 10px 0; line-height: 1.6; letter-spacing: 0.6px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2.1; margin: 14px 0; text-align: center;`,
            listContainer: `margin: 18px auto; padding: 18px 20px; background: ${hexToRgba(a, 0.05)}; border-radius: 14px; text-align: left; max-width: 480px;`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 10px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: p.marker || '·',
            listMarker: `color: ${a}; margin-right: 10px; font-weight: 800; flex-shrink: 0;`,
            spacing: 'height: 18px;'
        };
    },

    // 3. 荧光笔高亮（知识干货笔记）
    xhsHighlight(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 2; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 26px 22px;`,
            h1Prefix: p.h1e ? p.h1e + ' ' : '',
            h1: `font-size: 23px; font-weight: 800; color: ${p.text}; margin: 28px 0 18px 0; line-height: 1.6; padding: 6px 14px; background: ${hexToRgba(a, 0.18)}; border-radius: 8px; display: inline-block; letter-spacing: 1px;`,
            h2: `font-size: 18px; font-weight: 800; color: ${a}; margin: 22px 0 12px 0; line-height: 1.6; padding-bottom: 6px; border-bottom: 2px solid ${hexToRgba(a, 0.4)}; letter-spacing: 0.4px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${a}; margin: 16px 0 10px 0; line-height: 1.6; letter-spacing: 0.3px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 14px 0; text-align: justify;`,
            listContainer: `margin: 18px 0; padding: 18px 20px; background: #ffffff; border-radius: 12px; border-left: 5px solid ${a};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 10px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: p.marker || '✅',
            listMarker: `margin-right: 10px; font-size: 15px; flex-shrink: 0;`,
            spacing: 'height: 16px;'
        };
    },

    // 4. 装饰条（极简小红书）
    xhsBar(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 1.95; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 26px 22px;`,
            h1: `font-size: 23px; font-weight: 800; color: ${a}; margin: 30px 0 18px 0; line-height: 1.6; padding: 12px 0; border-top: 3px solid ${a}; border-bottom: 3px solid ${a}; text-align: center; letter-spacing: 2px;`,
            h2Prefix: '▍',
            h2: `font-size: 18px; font-weight: 800; color: ${a}; margin: 22px 0 12px 0; line-height: 1.6; letter-spacing: 0.5px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${p.text}; margin: 16px 0 10px 0; line-height: 1.6; letter-spacing: 0.4px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 14px 0; text-align: justify;`,
            listContainer: `margin: 18px 0; padding: 6px 0; border-top: 1px dashed ${hexToRgba(a, 0.3)}; border-bottom: 1px dashed ${hexToRgba(a, 0.3)};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 10px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: p.marker || '▸',
            listMarker: `color: ${a}; margin-right: 10px; font-weight: 800; flex-shrink: 0;`,
            spacing: 'height: 16px;'
        };
    },

    // 5. 卡片式（生活方式 / 种草）
    xhsCard(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 1.95; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 26px 22px;`,
            h1Prefix: p.emoji ? p.emoji + ' ' : '',
            h1: `font-size: 22px; font-weight: 800; color: #ffffff; margin: 28px 0 18px 0; line-height: 1.5; padding: 16px 22px; background: linear-gradient(135deg, ${p.c1} 0%, ${p.c2 || p.c1} 100%); border-radius: 14px; text-align: center; letter-spacing: 1px; box-shadow: 0 8px 20px ${hexToRgba(p.c1, 0.22)};`,
            h2: `font-size: 18px; font-weight: 800; color: ${a}; margin: 22px 0 12px 0; line-height: 1.6; padding: 12px 16px; background: ${p.cardBg || '#ffffff'}; border-radius: 12px; border: 1px solid ${hexToRgba(a, 0.22)}; letter-spacing: 0.4px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${a}; margin: 16px 0 10px 0; line-height: 1.6; letter-spacing: 0.3px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 14px 0; text-align: justify;`,
            listContainer: `margin: 18px 0; padding: 18px 20px; background: ${p.cardBg || '#ffffff'}; border-radius: 14px; border: 1px solid ${hexToRgba(a, 0.2)}; box-shadow: 0 4px 16px rgba(0,0,0,0.04);`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 10px 0; display: flex; align-items: flex-start;`,
            listMarker: `color: ${a}; margin-right: 10px; font-weight: 800; flex-shrink: 0;`,
            spacing: 'height: 14px;'
        };
    },

    // 6. 大渐变（潮流 / 吸睛）
    xhsGradient(p) {
        const a = p.accent || p.c1;
        return {
            container: `font-family: ${F_SANS}; line-height: 1.95; color: ${p.text}; font-size: 15px; background: ${p.bg}; padding: 26px 22px;`,
            h1Prefix: p.emoji ? p.emoji + ' ' : '',
            h1: `font-size: 24px; font-weight: 800; color: #ffffff; margin: 30px 0 20px 0; line-height: 1.5; padding: 18px 24px; background: linear-gradient(135deg, ${p.c1} 0%, ${p.c2} 100%); border-radius: 18px; text-align: center; letter-spacing: 1.5px; box-shadow: 0 10px 24px ${hexToRgba(p.c1, 0.3)};`,
            h2: `font-size: 18px; font-weight: 800; color: ${a}; margin: 22px 0 12px 0; line-height: 1.6; padding: 8px 16px; background: ${hexToRgba(a, 0.08)}; border-radius: 12px; border-left: 5px solid ${a}; letter-spacing: 0.4px;`,
            h3: `font-size: 16px; font-weight: 700; color: ${a}; margin: 16px 0 10px 0; line-height: 1.6; padding-left: 10px; border-left: 3px solid ${hexToRgba(a, 0.4)}; letter-spacing: 0.3px;`,
            paragraph: `font-size: 15px; color: ${p.text}; line-height: 2.1; margin: 14px 0; text-align: justify;`,
            listContainer: `margin: 18px 0; padding: 18px 20px; background: ${hexToRgba(a, 0.05)}; border-radius: 14px; border: 1px dashed ${hexToRgba(a, 0.3)};`,
            listItem: `font-size: 15px; color: ${p.text}; line-height: 2; margin: 10px 0; display: flex; align-items: flex-start;`,
            listMarkerContent: p.marker || '⭐',
            listMarker: `margin-right: 10px; font-size: 15px; flex-shrink: 0;`,
            spacing: 'height: 16px;'
        };
    }
};

// ---------- 小红书调色板（6 个分类 × 8 套） ----------
const XHS_PALETTES = [
    // 温柔治愈
    { arch: 'xhsEmoji', id: 'rose-quartz', name: '玫瑰石英', category: '温柔治愈', description: '玫瑰石英粉，温柔浪漫。', c1: '#f9a8d4', c2: '#f472b6', bg: '#fff7fa', bg2: '#ffffff', text: '#7c4560', h1e: '🌷', h2e: '🕊️', h3e: '🌸', marker: '🌷' },
    { arch: 'xhsCentered', id: 'peach-center', name: '蜜桃居中', category: '温柔治愈', description: '蜜桃色居中排版，暖暖治愈。', c1: '#fb923c', bg: '#fff8f2', text: '#7c4a3a', dec: '✿' },
    { arch: 'xhsEmoji', id: 'mint-cream', name: '薄荷奶油', category: '温柔治愈', description: '薄荷奶油绿，清新温柔。', c1: '#6ee7b7', c2: '#34d399', bg: '#f4fdf8', bg2: '#ffffff', text: '#365e4c', h1e: '🌿', h2e: '🍃', h3e: '🌱', marker: '🍃' },
    { arch: 'xhsCard', id: 'lavender-dream', name: '薰衣草梦', category: '温柔治愈', description: '薰衣草紫卡片，梦幻安静。', c1: '#a78bfa', c2: '#8b5cf6', bg: '#faf8ff', text: '#5c4a6e', emoji: '💜', cardBg: '#ffffff' },
    { arch: 'xhsHighlight', id: 'warm-pink', name: '暖粉笔记', category: '温柔治愈', description: '暖粉色荧光笔记，治愈系干货。', c1: '#f472b6', bg: '#fff7fa', text: '#7c4560', marker: '💗', h1e: '✨' },
    { arch: 'xhsGradient', id: 'sunset-peach', name: '落日蜜桃', category: '温柔治愈', description: '落日蜜桃渐变，温柔晚霞。', c1: '#fdba74', c2: '#fb7185', bg: '#fff8f3', text: '#7c4a3a', emoji: '🌅', marker: '🌅' },
    { arch: 'xhsEmoji', id: 'cloud-pink', name: '云朵粉', category: '温柔治愈', description: '云朵粉白，轻盈柔软。', c1: '#fbcfe8', c2: '#f9a8d4', bg: '#fffbfd', bg2: '#ffffff', text: '#7c5b6e', h1e: '☁️', h2e: '🎀', h3e: '🧸', marker: '☁️' },
    { arch: 'xhsBar', id: 'oat-beige', name: '燕麦米', category: '温柔治愈', description: '燕麦米色装饰条，温润简约。', c1: '#c08a5e', bg: '#faf6ef', text: '#6b4f3c', marker: '▸' },

    // 清爽简约
    { arch: 'xhsBar', id: 'slate-clean', name: '石板净', category: '清爽简约', description: '石板灰装饰条，干净利落。', c1: '#64748b', bg: '#fafbfc', text: '#475569', marker: '▸' },
    { arch: 'xhsCentered', id: 'mist-gray', name: '雾灰居中', category: '清爽简约', description: '雾灰居中排版，清冷高级。', c1: '#6b7280', bg: '#f8f9fa', text: '#4b5563', dec: '·' },
    { arch: 'xhsGradient', id: 'sky-blue', name: '天空蓝', category: '清爽简约', description: '天空蓝渐变，清爽通透。', c1: '#38bdf8', c2: '#0ea5e9', bg: '#f5faff', text: '#3f5870', emoji: '☁️', marker: '☁️' },
    { arch: 'xhsHighlight', id: 'aqua-note', name: '青蓝笔记', category: '清爽简约', description: '青蓝荧光笔记，重点清晰。', c1: '#0ea5e9', bg: '#f2faff', text: '#36586b', marker: '✅', h1e: '📌' },
    { arch: 'xhsEmoji', id: 'white-linen', name: '白亚麻', category: '清爽简约', description: '亚麻白灰，素净耐看。', c1: '#94a3b8', c2: '#cbd5e1', bg: '#fbfbfd', bg2: '#ffffff', text: '#475569', h1e: '🤍', h2e: '✨', h3e: '◽', marker: '🤍' },
    { arch: 'xhsCard', id: 'ice-blue', name: '冰蓝卡', category: '清爽简约', description: '冰蓝卡片，干净舒适。', c1: '#7dd3fc', c2: '#38bdf8', bg: '#f4fbff', text: '#3f5870', cardBg: '#ffffff' },
    { arch: 'xhsBar', id: 'graphite-min', name: '石墨净', category: '清爽简约', description: '石墨灰装饰条，沉稳克制。', c1: '#334155', bg: '#f8fafc', text: '#3f4756', marker: '▸' },
    { arch: 'xhsCentered', id: 'bone-white', name: '骨白居中', category: '清爽简约', description: '骨白居中排版，留白呼吸。', c1: '#9ca3af', bg: '#fafaf8', text: '#4b5563', dec: '—' },

    // 可爱少女
    { arch: 'xhsEmoji', id: 'pink-dream', name: '粉色梦境', category: '可爱少女', description: '少女粉渐变，甜度满分。', c1: '#f472b6', c2: '#ec4899', bg: '#fff6fa', bg2: '#ffffff', text: '#7c4560', h1e: '🎀', h2e: '💖', h3e: '🍬', marker: '🎀' },
    { arch: 'xhsGradient', id: 'sweet-orange', name: '甜橙', category: '可爱少女', description: '甜橙粉渐变，元气少女。', c1: '#fb923c', c2: '#f472b6', bg: '#fff7f8', text: '#7c4a3a', emoji: '🍊', marker: '🍊' },
    { arch: 'xhsCard', id: 'strawberry-milk', name: '草莓牛奶', category: '可爱少女', description: '草莓牛奶卡，软萌可爱。', c1: '#fb7185', c2: '#f43f5e', bg: '#fff6f7', text: '#7c4560', cardBg: '#ffffff', emoji: '🍓' },
    { arch: 'xhsHighlight', id: 'bubble-gum', name: '泡泡糖', category: '可爱少女', description: '泡泡糖粉笔记，俏皮吸睛。', c1: '#ec4899', bg: '#fff6fb', text: '#7c4560', marker: '💕', h1e: '🫧' },
    { arch: 'xhsCentered', id: 'candy-center', name: '糖果居中', category: '可爱少女', description: '糖果粉居中排版，甜甜圈感。', c1: '#ec4899', bg: '#fff6fb', text: '#7c4560', dec: '♡' },
    { arch: 'xhsEmoji', id: 'rabbit-pink', name: '兔兔粉', category: '可爱少女', description: '兔兔元素粉系，萌力十足。', c1: '#f9a8d4', c2: '#f0abfc', bg: '#fdf7fc', bg2: '#ffffff', text: '#6b5b7a', h1e: '🐰', h2e: '🥕', h3e: '🐾', marker: '🐰' },
    { arch: 'xhsBar', id: 'berry', name: '浆果', category: '可爱少女', description: '浆果红装饰条，俏皮亮眼。', c1: '#db2777', bg: '#fff6f9', text: '#7c3a4e', marker: '♥' },
    { arch: 'xhsGradient', id: 'girly-purple', name: '少女紫', category: '可爱少女', description: '香芋紫渐变，温柔俏丽。', c1: '#c084fc', c2: '#a855f7', bg: '#faf7ff', text: '#5c4a6e', emoji: '💜', marker: '💜' },

    // 复古胶片
    { arch: 'xhsGradient', id: 'amber-film', name: '琥珀胶片', category: '复古胶片', description: '琥珀棕渐变，复古胶片感。', c1: '#d97706', c2: '#b45309', bg: '#fff8ec', text: '#6b4a2a', emoji: '🎞️', marker: '🎞️' },
    { arch: 'xhsBar', id: 'sepia', name: '深褐', category: '复古胶片', description: '深褐装饰条，怀旧沉稳。', c1: '#8a5a34', bg: '#f6efe3', text: '#5c4a32', marker: '▸' },
    { arch: 'xhsEmoji', id: 'film-grain', name: '胶片颗粒', category: '复古胶片', description: '胶片棕 Emoji，故事感满满。', c1: '#b45309', c2: '#92400e', bg: '#faf4e8', bg2: '#fffaf0', text: '#6b4a2a', h1e: '📽️', h2e: '🎬', h3e: '🎥', marker: '🎬' },
    { arch: 'xhsHighlight', id: 'vintage-yellow', name: '旧黄笔记', category: '复古胶片', description: '旧纸黄荧光笔记，年代手账。', c1: '#b8860b', bg: '#fbf6e8', text: '#6b5433', marker: '📌', h1e: '🏷️' },
    { arch: 'xhsCentered', id: 'newspaper', name: '报纸居中', category: '复古胶片', description: '报纸灰居中排版，复古刊物。', c1: '#4a4a4a', bg: '#f4efe3', text: '#3f3a33', dec: '▪' },
    { arch: 'xhsCard', id: 'coffee-retro', name: '复古咖啡', category: '复古胶片', description: '咖啡棕卡片，醇厚复古。', c1: '#a16207', c2: '#854d0e', bg: '#faf4e8', text: '#5c4a2e', cardBg: '#fffdf6', emoji: '☕' },
    { arch: 'xhsBar', id: 'olive', name: '橄榄绿', category: '复古胶片', description: '橄榄绿装饰条，军旅复古。', c1: '#5d6d3e', bg: '#f6f5ee', text: '#4a5438', marker: '▸' },
    { arch: 'xhsEmoji', id: 'kodak', name: '柯达黄', category: '复古胶片', description: '柯达黄，经典胶片记忆。', c1: '#eab308', c2: '#d97706', bg: '#fffdf0', bg2: '#ffffff', text: '#6b5a2e', h1e: '📷', h2e: '🖼️', h3e: '🎞️', marker: '📷' },

    // 个性潮流
    { arch: 'xhsGradient', id: 'neon-pop-xhs', name: '霓虹波普', category: '个性潮流', description: '霓虹红紫渐变，大胆吸睛。', c1: '#f43f5e', c2: '#8b5cf6', bg: '#fff6fa', text: '#4c3a4a', emoji: '⚡', marker: '⚡' },
    { arch: 'xhsBar', id: 'black-white', name: '黑白', category: '个性潮流', description: '黑白极简装饰条，酷感十足。', c1: '#18181b', bg: '#ffffff', text: '#27272a', marker: '▸' },
    { arch: 'xhsHighlight', id: 'acid-note', name: '酸性笔记', category: '个性潮流', description: '酸性荧光绿笔记，街头感。', c1: '#65a30d', bg: '#f8fbf2', text: '#3f4a3c', marker: '🔥', h1e: '🟢' },
    { arch: 'xhsEmoji', id: 'punk-xhs', name: '朋克', category: '个性潮流', description: '朋克撞色 Emoji，叛逆率性。', c1: '#ec4899', c2: '#22d3ee', bg: '#fff6fb', bg2: '#ffffff', text: '#7c4560', h1e: '🤘', h2e: '⚡', h3e: '🔥', marker: '⚡' },
    { arch: 'xhsCentered', id: 'zine', name: '杂志居中', category: '个性潮流', description: '杂志风居中，排版先锋。', c1: '#dc2626', bg: '#fbf7f2', text: '#4c3a3a', dec: '✦' },
    { arch: 'xhsCard', id: 'street', name: '街头卡', category: '个性潮流', description: '街头灰黑卡，潮流态度。', c1: '#0f172a', c2: '#1e293b', bg: '#f8fafc', text: '#334155', cardBg: '#ffffff', emoji: '🛹' },
    { arch: 'xhsGradient', id: 'cyber-pink', name: '赛博粉', category: '个性潮流', description: '赛博青粉渐变，未来机能。', c1: '#22d3ee', c2: '#ec4899', bg: '#f4fbff', text: '#3f5870', emoji: '🤖', marker: '🤖' },
    { arch: 'xhsBar', id: 'lime', name: '荧光绿', category: '个性潮流', description: '荧光绿装饰条，街头醒目。', c1: '#84cc16', bg: '#f7fbf0', text: '#4a5d33', marker: '▸' },

    // 知识干货
    { arch: 'xhsHighlight', id: 'exam-yellow', name: '考试黄', category: '知识干货', description: '考试黄荧光笔记，重点必背。', c1: '#eab308', bg: '#fffdf2', text: '#6b5a2e', marker: '📌', h1e: '⭐' },
    { arch: 'xhsCard', id: 'note-white', name: '笔记白', category: '知识干货', description: '笔记本白卡，清爽好读。', c1: '#2563eb', c2: '#1d4ed8', bg: '#f5f8ff', text: '#334155', cardBg: '#ffffff', emoji: '📝' },
    { arch: 'xhsEmoji', id: 'blue-knowledge', name: '蓝知', category: '知识干货', description: '知识蓝 Emoji，专业清晰。', c1: '#3b82f6', c2: '#2563eb', bg: '#f4f8ff', bg2: '#ffffff', text: '#334155', h1e: '📘', h2e: '✏️', h3e: '📎', marker: '📘' },
    { arch: 'xhsHighlight', id: 'green-point', name: '绿点笔记', category: '知识干货', description: '草绿荧光笔记，要点分明。', c1: '#16a34a', bg: '#f3faf5', text: '#36543a', marker: '✅', h1e: '🌿' },
    { arch: 'xhsBar', id: 'navy-know', name: '藏蓝知', category: '知识干货', description: '藏蓝装饰条，严谨干练。', c1: '#1e40af', bg: '#f4f7ff', text: '#334155', marker: '▸' },
    { arch: 'xhsCentered', id: 'rule-center', name: '规矩居中', category: '知识干货', description: '青绿居中排版，条理井然。', c1: '#0f766e', bg: '#f4fbfa', text: '#36544f', dec: '—' },
    { arch: 'xhsGradient', id: 'growth', name: '成长绿', category: '知识干货', description: '成长绿渐变，进步向上。', c1: '#10b981', c2: '#0d9488', bg: '#f3fbf8', text: '#36544f', emoji: '🌱', marker: '🌱' },
    { arch: 'xhsHighlight', id: 'purple-point', name: '紫点笔记', category: '知识干货', description: '香芋紫荧光笔记，灵感标记。', c1: '#7c3aed', bg: '#f8f6ff', text: '#4c3a6e', marker: '💡', h1e: '💡' }
];

const XHS_TEMPLATES = XHS_PALETTES.map(p => {
    const fn = XHS_ARCHETYPES[p.arch] || XHS_ARCHETYPES.xhsEmoji;
    return {
        id: p.id,
        name: p.name,
        category: p.category,
        description: p.description || '',
        platform: 'xhs',
        style: fn(p)
    };
});

ALL_TEMPLATES.push(...XHS_TEMPLATES);

TEMPLATE_LOADER.registerBatch(ALL_TEMPLATES);

if (typeof window !== 'undefined') {
    window.TEMPLATE_LOADER = TEMPLATE_LOADER;
}



