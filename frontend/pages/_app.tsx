import Page from "../components/Page";
import { ComponentProps } from "react";

export default function MyApp({ Component, pageProps }: ComponentProps<any>)  {
 return <Page>
	 <Component {...pageProps} />
 </Page>
}