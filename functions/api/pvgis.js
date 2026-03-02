export async function onRequest(context) {

  const { request } = context;
  const url = new URL(request.url);

  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");
  const peakpower = url.searchParams.get("peakpower") || 5;

  if (!lat || !lon) {
    return new Response(JSON.stringify({ error: "Missing lat/lon" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const apiUrl = `https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=${lat}&lon=${lon}&peakpower=${peakpower}&loss=14&outputformat=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "PVGIS fetch failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
