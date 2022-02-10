addEventListener('fetch', (event) => {
    event.respondWith( handleRequest(event.request) );
});


async function handleRequest(request) {
    latitude = request.cf.latitude
    longitude = request.cf.longitude

    const coords = {
        latitude,
        longitude
    }

    return new Response(JSON.stringify( coords ), {
        headers: {
            'content-type': 'application/json',
            // https://developers.cloudflare.com/cache/about/cache-control#examples,
            'Cache-Control': 'no-store, no-cache, max-age=0, s-maxage=0',

            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        },
    })
}