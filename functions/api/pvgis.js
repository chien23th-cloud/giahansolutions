export async function onRequest(context) {

  const { request } = context;
  const url = new URL(request.url);

  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");
  const peakpower = url.searchParams.get("peakpower") || 5;
  const angle = url.searchParams.get("angle") || 15;
  const aspect = url.searchParams.get("aspect") || 0;
  const loss = url.searchParams.get("loss") || 14;
  const mountingplace = url.searchParams.get("mountingplace") || "building";

  if (!lat || !lon) {
    return new Response(JSON.stringify({ error: "Missing lat/lon" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const apiUrl =
    `https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=${lat}&lon=${lon}&peakpower=${peakpower}&loss=${loss}&angle=${angle}&aspect=${aspect}&mountingplace=${mountingplace}&pvtechchoice=crystSi&outputformat=json`;

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
