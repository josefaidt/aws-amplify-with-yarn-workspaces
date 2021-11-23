import { useState, useEffect, createRef } from 'react'
import { API } from 'aws-amplify'
import awsConfig from '../aws-exports'
const [{ name: API_NAME }] = awsConfig.aws_cloud_logic_custom

async function get(path, options = { response: true }) {
  return await API.get(API_NAME, path, options)
}

export default function HomePage(props) {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  const refA = createRef()
  const refB = createRef()

  const add = async (a, b) => await get(`/add?a=${a}&${b}`)

  const getData = async () => {
    if (!isLoading) setIsLoading(true)
    try {
      setData(await add(refA.current.value, refB.current.value))
    } catch (error) {
      console.error('Unable to fetch hello', error)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <section>
      <h1>Add two numbers</h1>
      <form onSubmit={onSubmit}>
        <input type="number" ref={refA} placeholder={2} />
        <input type="number" ref={refB} placeholder={2} />
        <input type="submit">Submit</input>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && (
        <pre>
          <code>{JSON.stringify(error, null, 2)}</code>
        </pre>
      )}
      {!isLoading && data && (
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )}
    </section>
  )
}
