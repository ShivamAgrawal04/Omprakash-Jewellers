export const dictionaries = {
  en: () => import("./en").then((m) => m.en),
  hi: () => import("./hi").then((m) => m.hi),
} as const;

export type Locale = keyof typeof dictionaries;

export type Dictionary = {
  nav: {
    collections: string;
    jewellery: string;
    bridal: string;
    newArrivals: string;
    ourStory: string;
    craftsmanship: string;
    gallery: string;
    visitUs: string;
    contact: string;
    search: string;
    wishlist: string;
    menu: string;
    close: string;
    explore: string;
  };
  common: {
    explore: string;
    viewDetails: string;
    enquireNow: string;
    priceOnRequest: string;
    addToWishlist: string;
    removeFromWishlist: string;
    share: string;
    backToHome: string;
    loading: string;
    retry: string;
    somethingWentWrong: string;
    pleaseTryAgain: string;
    showMore: string;
    showLess: string;
  };
  search: {
    placeholder: string;
    results: string;
    noResults: string;
    noResultsHint: string;
    empty: string;
    emptyHint: string;
  };
  wishlist: {
    title: string;
    emptyTitle: string;
    emptyBody: string;
    added: string;
    removed: string;
  };
  footer: {
    explore: string;
    about: string;
    visit: string;
    policies: string;
    follow: string;
    rights: string;
  };
  enquiry: {
    title: string;
    subtitle: string;
    name: string;
    phone: string;
    email: string;
    contactMethod: string;
    preferredDate: string;
    message: string;
    send: string;
    sending: string;
    successTitle: string;
    successBody: string;
    whatsapp: string;
  };
};
