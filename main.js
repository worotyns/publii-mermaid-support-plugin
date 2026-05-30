class MermaidSupport {
  constructor(API, name, config) {
    this.API = API;
    this.name = name;
    this.config = config;
  }

  addInsertions() {
    this.API.addInsertion('publiiHead', this.addStyles, 1, this);
    this.API.addInsertion('publiiFooter', this.addMermaidScripts, 1, this);
  }

  addStyles(rendererInstance) {
    let styles = '';

    if (this.config.cssFilter) {
      styles += `<link rel="stylesheet" href="${rendererInstance.siteConfig.domain}/media/plugins/mermaidSupport/mermaid-invert-filter.css" />`;
    }

    return styles;
  }

  addModifiers() {
    this.API.addModifier('postText', this.replaceMermaidCodeBlocks, 1, this);
    this.API.addModifier('postExcerpt', this.replaceMermaidCodeBlocks, 1, this);
    this.API.addModifier('pageText', this.replaceMermaidCodeBlocks, 1, this);
    this.API.addModifier('pageExcerpt', this.replaceMermaidCodeBlocks, 1, this);
  }

  replaceMermaidCodeBlocks(rendererInstance, text) {
    text = text.replace(/<pre\b[^>]*>\s*<code\b[^>]*\blanguage-mermaid\b[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/g, (match, code) => {
      const plainCode = code.replace(/<[^>]+>/g, '').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
      return `<pre class="mermaid">${plainCode}</pre>`;
    });

    text = text.replace(/<pre\b[^>]*\blanguage-mermaid\b[^>]*>([\s\S]*?)<\/pre>/g, (match, code) => {
      const plainCode = code.replace(/<[^>]+>/g, '').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
      return `<pre class="mermaid">${plainCode}</pre>`;
    });

    return text;
  }

  addMermaidScripts(rendererInstance) {
    return `
    <script src="${rendererInstance.siteConfig.domain}/media/plugins/mermaidSupport/mermaid.min.js"></script>
    <script>
      mermaid.initialize({ startOnLoad: true, theme: "${this.config.theme}" });
    </script>
    `;
  }
}

module.exports = MermaidSupport;
