import '../styles/global.css'; 
import { ClerkProvider } from '@clerk/clerk-react';
import Layout from "../components/layout";


const MyApp = ({ Component, pageProps }) => {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}> 
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  )
}

export default MyApp
