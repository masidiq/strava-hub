import "../global.css";

import { ChakraProvider } from "@chakra-ui/react";

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
