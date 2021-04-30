import express from 'express'

type ResponseVariants<Model> =
  | { message: string }
  | { message: string[] }
  | { data: Model }

type Locals = { currentUserId: string; [key: string]: unknown }

export type Response<Model> = express.Response<ResponseVariants<Model>, Locals>
