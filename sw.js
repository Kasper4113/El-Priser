const cache = "el-priser-cache-v1"; // skifter nummer hver gang jeg ændrer filerne, så hvis en ny kommer ind og reloader, så går det ikke i smader.

const files = [
    "./",
    "./index.html",
    "./assets/css/style.css",

    "./assets/js/app.js",
    "./assets/js/controller.js",
    "./assets/js/model.js",

    "./assets/js/components/calender.js",
    "./assets/js/components/footer.js",
    "./assets/js/components/highLowPrice.js",
    "./assets/js/components/navigation.js",
    "./assets/js/components/priceNow.js",
    "./assets/js/components/prisoversigt.js",
    "./assets/js/components/settingFooter.js",
    "./assets/js/components/tandhjul.js",

    "./assets/js/desktop/desktop.js",

    "./assets/js/pages/historik.js",
    "./assets/js/pages/ligeNu.js",
    "./assets/js/pages/oversigt.js",
    "./assets/js/pages/settings.js",

    "./assets/img/bolt512x512.svg",
    "./assets/img/Cirkle-rings.svg",
    "./assets/img/Group9.svg",
    "./assets/img/icon_cog.svg",
    "./assets/img/oversigt-cirkel.svg",
];

// Gemmer alle filer i cachen, der er listet i "files" så jeg kan se hvilke der fejler.
async function cacheFiles() {
    let storage = await caches.open(cache);

    for (let i = 0; i < files.length; i++) {
        try {
            await storage.add(files[i]);
        } catch (error) {
            console.log("SW: kunne ikke gemme", files[i], error);
        }
    }
}

// Installerer service worker og gemmer alle filer i cachen
self.addEventListener("install", (event) => {
    event.waitUntil(cacheFiles());
});

// Sletter gamle caches, når der kommer en ny version
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys
                .filter((key) => key.startsWith("el-priser-cache-") && key !== cache)
                .map((key) => caches.delete(key))
        )).then(() => self.clients.claim())
    );
});

// Håndterer fetch-events. Jeg prøver cachen først, der efter nettet. Hvis det er en side, så viser jeg index.html
self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    const isPriceApi = url.hostname === "www.elprisenligenu.dk";

    if (isPriceApi) {
        event.respondWith(networkFirst(event.request));
    } else if (url.origin === self.location.origin) {
        event.respondWith(cacheFirst(event.request));
    }
});

// Filer: jeg prøver cachen først, der efter nettet. Hvis det er en side, så viser jeg index.html
async function cacheFirst(request) {
    let cached = await caches.match(request, { ignoreSearch: true });

    if (cached) {
        return (cached);
    }

    try {
        let response = await fetch(request);
        return (response);
    } catch (error) {
        
        if (request.mode === "navigate") {
            let page = await caches.match("./index.html");

            if (page) {
                return (page);
            }
        }

        let offlineResponse = new Response("Du er offline", { status: 503 });
        return (offlineResponse);
    }
}

// her prøver jeg nettet først, der efter cachen. Hvis det fejler, så viser jeg en fejlbesked
async function networkFirst(request) {
    try {
        let response = await fetch(request);

        if (response.ok) {
            let storage = await caches.open(cache);
            await storage.put(request, response.clone());
        }

        return (response);
    } catch (error) {
        let cached = await caches.match(request);

        if (cached) {
            return (cached);
        }

        let offlineResponse = new Response(
            JSON.stringify({ error: true, reason: "Du er offline, og der er ingen gemte data." }),
            { status: 503, headers: { "Content-Type": "application/json" } }
        );
        return (offlineResponse);
    }
}

// her viser jeg en notifikation, når jeg modtager en push-besked. Beskeden kommer fra serveren, som sender den til service workeren.
self.addEventListener("push", (event) => {
    const text = event.data ? event.data.text() : "Ingen data modtaget";
    event.waitUntil(
        self.registration.showNotification("El-priser", {
            body: text,
            icon: "./assets/img/bolt512x512.svg"
        })
    );
});