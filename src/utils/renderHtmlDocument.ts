interface TemplateData {
    html: string;
    css: string;
}

export const renderHtmlDocument = ({ html, css }: TemplateData) =>
    `<!DOCTYPE html>
    <html lang="en-GB">
      <head>
        <meta charset="utf-8" />
        <title>Contributions Service Preview</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- <link rel="stylesheet" href="css/normalize.css" /> -->
        <style>
          ${css}
        </style>
      </head>
      <body>
        <div style="width: 1200px; margin: 0 auto;">
          ${html}
        </div>
      </body>
    </html>
    `;
