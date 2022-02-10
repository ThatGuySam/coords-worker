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
        },
    })
}