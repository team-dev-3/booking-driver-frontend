import axios from 'axios'
import { env } from '../config/env'

export const http = axios.create({
  baseURL: env.apiBaseUrl || undefined,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})
