import useReflare from 'reflare';

const handleRequest = async (
  request: Request,
): Promise<Response> => {
  const reflare = await useReflare();

reflare.push({
  path: '/*',
  loadBalancing: {
    policy: 'random',
  },
  upstream: [
    {
      domain: 'as-archive-02.kzmidc.workers.dev',
      protocol: 'https',
      weight: 50,
    },
    {
      domain: 'as-archive.kzmidc.workers.dev',
      protocol: 'https',
      weight: 50,
    },
  ],
  // cors: {
  //   origin: '*',
  // },
  cors: {
    origin: true,
    methods: [
      'GET',
      'POST',
    ],
    allowedHeaders: [
      'a-soul.fans',
      'workers.dev',
    ],
    exposedHeaders: [
      'a-soul.fans',
      'workers.dev',
    ],
    credentials: false,
    maxAge: 86400,
  },



  /* ... */
});

  return reflare.handle(request);
};

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
