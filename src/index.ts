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
      domain: 'as-archive.a-soul.fans',
      protocol: 'https',
      weight: 50,
    },
    {
      domain: 'as-archive-02.a-soul.fans',
      protocol: 'https',
      weight: 50,
    },

  ],
  cors: {
    origin: '*',
  },

  // cors: {
  //   origin: ['https://music.a-soul.fans'],
  //   methods: [
  //     'GET',
  //     'POST',
  //   ],
  //   allowedHeaders: [
  //     'music.a-soul.fans',
  //   ],
  //   exposedHeaders: [
  //     'music.a-soul.fans',
  //   ],
  //   credentials: false,
  //   maxAge: 86400,
  // },
  // headers: {
  //   request: {
  //     'x-example-header': 'hello server',
  //   },
  //   response: {
  //     'x-example-header': 'hello client',
  //   },


  /* ... */
});

  return reflare.handle(request);
};

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
