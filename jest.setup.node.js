// jest.setup.node.js
// Polyfill Web fetch globals (Request, Response, fetch, Headers) so that
// next/server's `class NextRequest extends Request` can be evaluated in all
// Jest test environments (including jsdom where these globals aren't available
// at the Node module scope during the setupFiles phase).
if (typeof globalThis.Request === 'undefined') {
  // Polyfill prerequisites needed by undici
  if (typeof globalThis.TextEncoder === 'undefined') {
    const { TextEncoder, TextDecoder } = require('util')
    globalThis.TextEncoder = TextEncoder
    globalThis.TextDecoder = TextDecoder
  }
  if (typeof globalThis.ReadableStream === 'undefined') {
    const { ReadableStream, WritableStream, TransformStream } = require('stream/web')
    globalThis.ReadableStream = ReadableStream
    globalThis.WritableStream = WritableStream
    globalThis.TransformStream = TransformStream
  }
  if (typeof globalThis.setImmediate === 'undefined') {
    globalThis.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args)
  }
  const { Request, Response, fetch, Headers, FormData } = require('undici')
  globalThis.Request = Request
  globalThis.Response = Response
  globalThis.fetch = fetch
  globalThis.Headers = Headers
  globalThis.FormData = FormData
}
