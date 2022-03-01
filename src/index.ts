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
  /* ... */
});

  return reflare.handle(request);
};

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
