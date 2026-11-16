// Version B ("The Assurance Atlas") specific data.
// All service wording comes from the content draft (see src/data/content.js).

const img = (name) => `${import.meta.env.BASE_URL}v2/${name}`;

export const photos = {
  adjuster: {
    src: img('adjuster-1600.jpg'), src800: img('adjuster-800.jpg'), w: 1600, h: 1065,
    alt: 'An insurance adjuster takes notes inside a storm-damaged home, with collapsed walls and debris behind him.',
    caption: 'An insurance adjuster reviews a home at Shell Point, Florida, after Hurricane Dennis, 2005.',
    credit: 'Andrea Booher / FEMA',
  },
  ike: {
    src: img('ike-aerial-1600.jpg'), src800: img('ike-aerial-800.jpg'), w: 1600, h: 1065,
    alt: 'Aerial view of waterfront homes on stilts along a debris-covered beach after a hurricane.',
    caption: 'Waterfront homes on Galveston Island, Texas, after Hurricane Ike, September 2008.',
    credit: 'Jocelyn Augustino / FEMA',
  },
  galveston: {
    src: img('galveston-1600.jpg'), src800: img('galveston-800.jpg'), w: 1600, h: 988,
    alt: 'Aerial view of a coastal town grid of streets and houses beside the sea.',
    caption: 'Galveston, Texas, seen from the air, September 2008.',
    credit: 'Jocelyn Augustino / FEMA',
  },
  sandy: {
    src: img('sandy-1600.jpg'), src800: img('sandy-800.jpg'), w: 1600, h: 900,
    alt: 'Satellite image of a large hurricane spiralling over the US east coast.',
    caption: 'Hurricane Sandy seen by the GOES East satellite, October 2012.',
    credit: 'NOAA',
  },
  servers: {
    src: img('servers-1600.jpg'), src800: img('servers-800.jpg'), w: 1600, h: 1062,
    alt: 'A technician crouches beside an open server rack with a laptop, checking cables.',
    caption: 'Maintenance in the server room at NERSC, Berkeley, 2011.',
    credit: 'Derrick Coetzee (CC0)',
  },
  sanborn: {
    src: img('sanborn-1889-1200.jpg'), w: 1200, h: 1423,
    alt: 'A hand-coloured 1889 fire-insurance map sheet showing mills, bridges and buildings along the Spokane River.',
    caption: 'Sanborn fire-insurance map of Spokane Falls, Washington Territory, February 1889, sheet 2.',
    credit: 'Sanborn Map Company / Library of Congress (public domain)',
  },
  sanbornDetail: {
    src: img('sanborn-detail-1200.jpg'), w: 1200, h: 1020,
    alt: 'Detail of the 1889 map: a compass rose, the Spokane Falls title and yellow wood-frame buildings.',
    caption: 'Detail: wood-frame buildings in yellow, brick in pink. Every structure drawn and coded for an underwriter.',
    credit: 'Sanborn Map Company, 1889',
  },
};

export const offeringPhoto = {
  'platform-assurance': 'galveston',
  'assurance-coe': 'servers',
  'ai-agentic-systems-assurance': 'sandy',
};

export const districtOf = {
  'platform-assurance': 'platform',
  'assurance-coe': 'coe',
  'ai-agentic-systems-assurance': 'ai',
};

export const districts = {
  platform: { name: 'Platform Assurance', slug: 'platform-assurance' },
  coe: { name: 'Assurance CoE', slug: 'assurance-coe' },
  ai: { name: 'AI & Agentic Systems Assurance', slug: 'ai-agentic-systems-assurance' },
};

// The insurance "estate" plan. viewBox 0 0 1200 640.
// Streets are the gaps between blocks; customer journeys name the streets.
export const blocks = [
  [580, 30, 220, 180], [840, 30, 180, 180], [1060, 30, 116, 180],
  [580, 250, 220, 180], [840, 250, 180, 180], [1060, 250, 116, 180],
  [24, 470, 516, 146], [580, 470, 220, 146], [840, 470, 336, 146],
];
export const ghostBlocks = [[24, 30, 236, 180], [300, 30, 240, 180], [24, 250, 236, 120], [300, 250, 240, 120]];

export const streets = [
  { label: 'RENEWAL AVENUE', x: 870, y: 222, rotate: 0 },
  { label: 'CLAIMS ROAD', x: 700, y: 442, rotate: 0 },
  { label: 'QUOTE STREET', x: 564, y: 120, rotate: 90 },
  { label: 'BIND STREET', x: 824, y: 340, rotate: 90 },
  { label: 'SETTLE STREET', x: 1044, y: 120, rotate: 90 },
];

export const buildings = [
  { id: 'policycenter', label: ['POLICYCENTER'], d: 'platform', x: 590, y: 40, w: 200, h: 90, note: 'Guidewire testing across policy, claims and billing, including upgrades and the move to the cloud.' },
  { id: 'billingcenter', label: ['BILLINGCENTER'], d: 'platform', x: 590, y: 140, w: 110, h: 60, note: 'BillingCenter and the apps agents and customers use, tested as one flow.' },
  { id: 'portals', label: ['AGENT &', 'CUSTOMER APPS'], d: 'platform', x: 710, y: 140, w: 80, h: 60, note: 'The apps used by agents and customers, checked end to end.' },
  { id: 'claimcenter', label: ['CLAIMCENTER'], d: 'platform', x: 850, y: 40, w: 160, h: 80, note: 'Claims tested across the whole journey, from first report to settlement.' },
  { id: 'duckcreek', label: ['DUCK CREEK'], d: 'platform', x: 850, y: 130, w: 160, h: 70, note: 'Duck Creek policy, claims and billing, its cloud version, and the pricing and document setup behind them.' },
  { id: 'sapiens', label: ['SAPIENS'], d: 'platform', x: 1070, y: 40, w: 96, h: 50, note: 'Sapiens, Insurity, Majesco and older systems get the same insurance-focused testing.' },
  { id: 'majesco', label: ['MAJESCO'], d: 'platform', x: 1070, y: 98, w: 96, h: 48, note: 'Other insurance platforms, tested with the same method.' },
  { id: 'reinsurance', label: ['REINSURANCE'], d: 'platform', x: 1070, y: 154, w: 96, h: 46, note: 'Systems for policy administration, claims and reinsurance.' },
  { id: 'tmo', label: ['TEST MANAGEMENT', 'OFFICE'], d: 'coe', x: 590, y: 260, w: 200, h: 82, hatch: true, note: 'The team that runs the testing service day to day: agreed targets, reporting, planning and handling issues.' },
  { id: 'standards', label: ['STANDARDS'], d: 'coe', x: 590, y: 352, w: 100, h: 68, note: 'A shared rulebook, templates and ready-to-use tools, so every team tests the same way.' },
  { id: 'enabling', label: ['SHARED', 'EXPERTS'], d: 'coe', x: 700, y: 352, w: 90, h: 68, note: 'Shared experts in speed testing, AI-driven automation and test data who support every team.' },
  { id: 'rating', label: ['RATING ENGINE'], d: 'platform', x: 850, y: 260, w: 160, h: 72, note: 'Pricing engine, every rate change, rates across states and rate tables.' },
  { id: 'forms', label: ['FORMS &', 'DOCUMENTS'], d: 'platform', x: 850, y: 342, w: 160, h: 78, note: 'Policy documents compared with the approved version down to the pixel, including large batches.' },
  { id: 'uwmodel', label: ['UNDERWRITING', 'MODEL'], d: 'ai', x: 1070, y: 260, w: 96, h: 76, note: 'Pricing models must be fair and match what was filed with regulators.' },
  { id: 'claimsai', label: ['CLAIMS AI'], d: 'ai', x: 1070, y: 346, w: 96, h: 74, note: 'Claims AI must not overpay, underpay or wrongly deny.' },
  { id: 'warehouse', label: ['DATA WAREHOUSE'], d: 'platform', x: 34, y: 480, w: 216, h: 126, note: 'Data moved from an old system to a new one arrives complete.' },
  { id: 'feeds', label: ['PARTNER FEEDS'], d: 'platform', x: 260, y: 480, w: 140, h: 58, note: 'Data shared with partners, tested so what leaves one system arrives in the next.' },
  { id: 'integration', label: ['INTEGRATION HUB'], d: 'platform', x: 260, y: 548, w: 140, h: 58, note: 'The links between policy and claims systems, checked.' },
  { id: 'legacy', label: ['LEGACY', 'POLICY ADMIN'], d: 'platform', x: 410, y: 480, w: 120, h: 126, note: 'Older systems that have served insurers for years, tested like the new ones.' },
  { id: 'chatbot', label: ['CUSTOMER CHATBOT'], d: 'ai', x: 590, y: 480, w: 200, h: 58, note: 'Chatbots and assistants checked for accuracy, safety limits and a record regulators can review.' },
  { id: 'agentlab', label: ['AI TEST AGENTS'], d: 'ai', x: 590, y: 548, w: 200, h: 58, note: 'AI agents plan, write, run and repair tests. A person approves what they produce.' },
  { id: 'gwcloud', label: ['GUIDEWIRE CLOUD'], d: 'platform', x: 850, y: 480, w: 160, h: 126, note: 'Upgrades and cloud moves, tested before go-live.' },
  { id: 'pricing', label: ['PRICING TOOLS'], d: 'platform', x: 1020, y: 480, w: 146, h: 58, note: 'Standalone rating tools such as Hyperexponential and Earnix, tested on their own and inside the core system.' },
  { id: 'docgen', label: ['DOCUMENT', 'GENERATION'], d: 'platform', x: 1020, y: 548, w: 146, h: 58, note: 'Documents built automatically and in large batches, checked at once.' },
];

// Survey route along the streets, and the defects it catches (dist = distance along the route).
// The route runs on the lower lane of each street so it never crosses the street names.
export const surveyPath = 'M560,628 L560,240 L1040,240 L1040,460 L40,460';
export const surveyLength = 2088;
export const defects = [
  { building: 'billingcenter', x: 645, y: 192, dist: 473, issue: 'Renewal bill total off by $0.01' },
  { building: 'rating', x: 930, y: 268, dist: 758, issue: 'Rate table missing one state' },
  { building: 'uwmodel', x: 1070, y: 268, dist: 896, issue: 'Price drifts from filed rate' },
  { building: 'claimsai', x: 1070, y: 352, dist: 980, issue: 'Denial without escalation' },
  { building: 'forms', x: 930, y: 412, dist: 1198, issue: 'Exclusion wording out of date' },
  { building: 'chatbot', x: 690, y: 488, dist: 1438, issue: 'Answer promises coverage' },
  { building: 'warehouse', x: 142, y: 488, dist: 1986, issue: 'Migrated records incomplete' },
];

export const ledger = [
  { where: 'Rating', d: 'platform', wrong: 'A premium off by a cent, repeated on every policy it touches.', check: 'The pricing engine, every rate change, rates across states and rate tables.' },
  { where: 'Forms', d: 'platform', wrong: 'A policy document with the wrong wording.', check: 'Every document against the approved version, down to the pixel, in large batches.' },
  { where: 'Claims', d: 'platform', wrong: 'A claim that does not add up.', check: 'The whole journey from first report to settlement, and the data in between.' },
  { where: 'AI', d: 'ai', wrong: 'A model that drifts, shows bias or wrongly denies.', check: 'Accuracy, fairness, drift over time, safety limits and a record regulators can review.' },
];
