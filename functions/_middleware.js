export async function onRequest(context) {
  const { request, next } = context;

  // 'dev:dev' převedeno do formátu Base64 je 'ZGV2OmRldg=='
  const expectedAuth = 'Basic ZGV2OmRldg==';
  const authHeader = request.headers.get('Authorization');

  // Pokud heslo nesouhlasí nebo nebylo zadáno
  if (authHeader !== expectedAuth) {
    return new Response('Neautorizovany pristup', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Zabezpecena sekce"',
      },
    });
  }

  // Pokud je heslo správné, pokračuj na samotný web
  return next();
}
