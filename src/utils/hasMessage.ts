export function hasMessage(arg: unknown): arg is { message: any } {
  return typeof arg === 'object' && arg !== null && 'message' in arg
}
