import { useState } from "react"
import { api } from "../lib/api"

export function useFetch({ path = "", method = "GET" }) {
  const [isLoading, setIsLoading] = useState(false)

  async function execute(data = {}) {
    try {
      setIsLoading(true)
      
      const { data: response, status } = await api({
        method,
        url: path,
        data,
      })

      return {
        response,
        status
      }
    } finally {
      setIsLoading(false)
    }
  }

  return [execute, {
    isLoading,
  }]
}