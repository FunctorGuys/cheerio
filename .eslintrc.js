module.exports = {
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  parserOptions: {
    // Only ESLint 6.2.0 and later support ES2020.
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  globals: {
    window: true,
    document: true,
    $: true,
    URLSearchParams: true,
    UniversalCookie: true,
    IntersectionObserver: true,
    document: true,
    NODE_ENV: true,
    PORT: true,
    URL: true,
    console: true,
    Promise: true,
    Intl: true,
    RTCPeerConnection: true,
    RTCSessionDescription: true,
    RTCIceCandidate: true,
    AudioContext: true,
    Audio: true,
    Uint8Array: true,
    setTimeout: true,
    clearTimeout: true,
    navigator: true,
    If: true,
    process: true,
    Image: true,
    require: true,
    fetch: true,
    module: true,
    FormData: true,
    FileReader: true,
    import: true,
    __dirname: true,
  },
  rules: {
    'node/exports-style': ['error', 'module.exports'],
    'node/file-extension-in-import': 'off',
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],
    'node/prefer-promises/dns': 'error',
    'node/prefer-promises/fs': 'error',
    'node/no-missing-import': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    semi: ['error', 'always'],
  },
};
