class PubliiMermaid {
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
    return text.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
      return `<pre class="mermaid">${code}</pre>`;
    });
  }

  addMermaidScripts(rendererInstance) {
    return `
      <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
        mermaid.initialize({ startOnLoad: true, theme: "${this.config.theme}" });
      </script>
    `;
  }
}

module.exports = PubliiMermaid;
