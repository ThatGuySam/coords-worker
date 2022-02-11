addEventListener('fetch', (event) => {
    event.respondWith( handleRequest(event.request) );
});


const mapTemplate = ( coords ) => `
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <iframe 
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCCOnZqgg0IMq3hwT09FGPU8jw68Gdniq0&q=${ coords.latitude },${ coords.longitude }"
            width="100%"
            style="height: 97vh;"
            border="0"
        ></iframe>
    </body>
</html>`


const mapResponse = ( coords ) => {
    const mapHtml = mapTemplate( coords )

    return new Response( mapHtml, {
        headers: {
            'Content-Type': 'text/html',
            // https://developers.cloudflare.com/cache/about/cache-control#examples,
            'Cache-Control': 'no-store, no-cache, max-age=0, s-maxage=0',

            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        }
    })
}



async function handleRequest(request) {
    latitude = request.cf.latitude
    longitude = request.cf.longitude

    const coords = {
        latitude,
        longitude
    }

    // Map path
    if ( request.url.includes( '/map' ) ) {
        return mapResponse( coords )
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