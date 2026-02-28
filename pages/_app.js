import '../styles/global.css'; 
import { ClerkProvider } from '@clerk/clerk-react';
import { ThemeProvider } from '../lib/theme';
import Layout from "../components/layout";


const MyApp = ({ Component, pageProps }) => {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}> 
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ClerkProvider>
  )
}

export default MyApp
