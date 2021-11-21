import { Amplify } from 'aws-amplify'
import awsConfig from '../aws-exports'

Amplify.configure(awsConfig)

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
