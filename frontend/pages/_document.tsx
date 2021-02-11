import Document, {
  Html,
  Head,
  NextScript,
  Main,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';


//@ts-ignore
export default class MyDocument extends Document {
  static getInitialProps({
    renderPage,
  }: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags: Array<React.ReactElement<{}>> = sheet.getStyleElement();
    return { ...page, styleTags };
  }
  render() {
    return (
      <Html lang="en-AU">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
