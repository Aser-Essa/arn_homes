export type Coordinates = {
  lat: number;
  lng: number;
};

export async function getCoordinates(
  locationInput: string,
): Promise<Coordinates | null> {
  if (!locationInput) return null;

  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY; // Make sure to define this in your .env file
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationInput)}&key=${apiKey}&limit=1`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error("OpenCage API returned error:", response.status);
      return null;
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.warn("No results from OpenCage for:", locationInput);
      return null;
    }

    const { lat, lng } = data.results[0].geometry;

    return { lat, lng };
  } catch (error) {
    console.error("Error during OpenCage geocoding:", error);
    return null;
  }
}
