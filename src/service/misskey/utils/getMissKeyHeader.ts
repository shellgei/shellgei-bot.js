const getMissKeyHookSecret = (headers: any = {}): string => headers['x-misskey-hook-secret'] ?? ''

const getMissKeyHookId = (headers: any = {}): string => headers['x-misskey-hook-id'] ?? ''

const getMissKeyHost = (headers: any = {}): string => headers['x-misskey-host'] ?? ''

export {getMissKeyHookSecret, getMissKeyHookId, getMissKeyHost}