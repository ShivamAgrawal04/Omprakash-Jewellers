/**
 * Builds an optimized images.unsplash.com URL for a given photo id.
 * All photo ids referenced in the catalogue are pre-verified (HTTP 200).
 */
export function unsplash(
  id: string,
  width = 1200,
  height?: number,
): string {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(width),
    q: "80",
    ixlib: "rb-4.0.3",
  });
  if (height) params.set("h", String(height));
  return `https://images.unsplash.com/${id}?${params.toString()}`;
}

export const photo = {
  heroRing: "photo-1515562141207-7a88fb7ce338",
  solitaireDark: "photo-1605100804763-247f67b3557e",
  duoRings: "photo-1611591437281-460bfbe1220a",
  ringMacro: "photo-1601121141461-9d6647bca1ed",
  goldBand: "photo-1617038220319-276d3cfab638",
  goldPieces: "photo-1599643478518-a784e5dc4c8f",
  ringStone: "photo-1573408301185-9146fe634ad0",
  ringBox: "photo-1589674781759-c21c37956a44",
  darkGlow: "photo-1589128777073-263566ae5e4d",
  diamondMacro: "photo-1535632066927-ab7c9ab60908",
  necklace1: "photo-1611652022419-a9419f74343d",
  goldRing2: "photo-1612287230202-1ff1d85d1bdf",
  darkSet: "photo-1599643477877-530eb83abc8e",
  necklace2: "photo-1617814076367-b759c7d7e738",
  earrings: "photo-1611085583191-a3b181a88401",
  flatlay: "photo-1603561591411-07134e71a2a9",
  bangles: "photo-1512909006721-3d6018887383",
  bracelet: "photo-1584302179602-e4c3d3fd629d",
  pieces2: "photo-1598560917505-59a3ad559071",
  pieces3: "photo-1610701596007-11502861dcfa",
  softRing: "photo-1601821765780-754fa98637c1",
} as const;
