// All copy comes from "Software & AI Assurance — Website content draft".
// Review notes from the draft are intentionally NOT published.

export const BASE = '/capabilities/software-and-ai-assurance';

export const seo = {
  title: 'Software & AI Assurance for Insurance | ValueMomentum',
  description:
    'Insurance QA and testing for Guidewire, Duck Creek, rating and forms, plus AI assurance for LLMs and agentic systems. Talk to ValueMomentum.',
};

export const hero = {
  eyebrow: 'Quality engineering for P&C insurers',
  h1: 'Software & AI Assurance',
  line: 'Insurance runs on trust. We make sure your platforms and your AI deserve it.',
};

export const positioning = {
  heading: 'In insurance, small mistakes get expensive fast.',
  p1: 'A price that is off by a cent. A policy document with the wrong wording. A claim that does not add up. Now insurers are also using AI to help price risks and handle claims, so someone has to check that the AI gets it right too.',
  p2a: 'That is what our Software & AI Assurance team does. In plain terms, we do quality engineering and testing for property and casualty (',
  p2b: ') insurers. We test the main systems insurers run on, starting with Guidewire and Duck Creek. We set up the team and standards that keep testing consistent across the business. And we check the AI tools insurers are starting to rely on.',
  mistakes: [
    { label: 'Rating', wrong: 'Premium  $1,284.37', right: 'Premium  $1,284.38', note: 'A price off by a cent' },
    { label: 'Forms', wrong: '“Water damage covered”', right: '“Flood excluded”', note: 'The wrong wording' },
    { label: 'Claims', wrong: 'Payout  $4,920 + $4,920', right: 'Payout  $4,920', note: 'A claim that does not add up' },
    { label: 'AI', wrong: 'Model: “Deny claim”', right: 'Escalated to adjuster', note: 'AI that gets it wrong' },
  ],
};

export const pillars = [
  { title: 'Insurance-native', body: 'Our people know insurance: policies, rating, forms, claims and the regulators behind them.' },
  { title: 'Platform-certified', body: 'Certified on the platforms insurers run on, starting with Guidewire and Duck Creek.' },
  { title: 'AI-accelerated', body: 'We use AI agents to plan, write, run and repair tests, so releases move faster.' },
];

export const offerings = [
  {
    slug: 'platform-assurance',
    num: '01',
    title: 'Platform Assurance',
    art: 'platform',
    accent: '#086afc',
    card: 'Testing built for insurance. We check your core insurance systems work properly during upgrades, modernization and growth, using a proven method and ready-made tools.',
    summary: 'Insurance-grade testing for Guidewire, Duck Creek and every core system in between.',
    intro: [
      'Core insurance systems are big, customized and always changing. Platform Assurance is for P&C insurers running Guidewire, Duck Creek, Sapiens, Insurity, Majesco or older systems through upgrades, cloud moves and growth.',
      'We test policy, claims and billing end to end, and give pricing and policy documents the separate attention they need, because that is where small slips become real money.',
    ],
    seoTitle: 'Platform Assurance: Guidewire & Duck Creek Testing | ValueMomentum',
    subs: [
      {
        title: 'Guidewire Testing Services',
        card: "Full testing of Guidewire's policy, claims and billing systems and their companion apps, including upgrades and the move to the cloud.",
        body: 'Guidewire systems are big, customized and always changing. We test PolicyCenter (policies), ClaimsCenter (claims), BillingCenter (billing) and the apps used by agents and customers. We test the whole flow, plus upgrades and cloud moves. As a Guidewire partner, our team already knows the platform.',
      },
      {
        title: 'Duck Creek Testing Services',
        card: "Testing for Duck Creek's policy, claims and billing systems, including its cloud version and the pricing and document setup behind them.",
        body: 'Duck Creek systems are set up through configuration, and its cloud version updates often. We test policy, claims and billing, and check the pricing and document settings behind each product, so changes go live with fewer surprises.',
      },
      {
        title: 'Other Insurance Platforms',
        card: 'We also test other insurance systems, including Sapiens, Insurity and Majesco, and systems for policy administration, claims and reinsurance.',
        body: 'Not every insurer uses Guidewire or Duck Creek. Many run Sapiens, Insurity, Majesco or an older system that has served them for years. We bring the same insurance-focused testing to those, and to systems for policy administration, claims and reinsurance.',
      },
      {
        title: 'Cross-Platform & Functional Testing',
        card: 'Checks a whole process from start to finish, such as getting a quote and renewing, or reporting a claim and being paid, even when several systems are involved.',
        body: 'Customers do not care which system handles which step. We test the whole journey, from quote to renewal and from the first report of a claim to settlement, across Guidewire, older systems and others, including the connections and data in between.',
      },
      {
        title: 'Rating Testing',
        card: 'Checks that premiums are calculated correctly. We test the pricing engine, rate changes, rates across states and rate tables.',
        body: "Pricing is where a small slip becomes real money. We check the pricing engine, re-test after every rate change, confirm rates work across states and verify rate tables. This covers Guidewire's own rating and standalone tools such as Hyperexponential and Earnix, which let pricing experts update rates without waiting on developers.",
      },
      {
        title: 'Forms Testing',
        card: 'Checks policy documents for errors in layout, wording and style, including documents built automatically and in large batches.',
        body: 'Every policy comes with documents, and each one has to be right. We compare documents with the approved version down to the pixel, check wording and style, test documents built automatically and check large batches at once, so a form change does not turn into a compliance problem.',
      },
      {
        title: 'Integration & Data Testing',
        card: 'Makes sure information moves correctly between systems, including when data is moved from an old system to a new one.',
        body: 'Insurance depends on information moving between systems. We check the links between policy and claims systems, test moves of data from old systems to new ones, and test data shared with partners, so what leaves one system arrives complete in the next.',
      },
      {
        title: 'Non-Functional Testing',
        card: 'Checks systems stay fast, safe and available when it matters, such as a surge of claims after a major storm.',
        body: 'Systems must hold up when it matters most, such as after a storm when claims surge. We test heavy usage, security, and how well systems recover and stay available, using realistic insurance workloads.',
      },
    ],
    proof: [
      { display: 'Near zero', label: 'defects reaching customers' },
      { prefix: 'Up to ', to: 50, suffix: '%', label: 'less testing effort' },
      { display: 'Certified', label: 'platform professionals' },
    ],
    tools: ['Guidewire', 'Duck Creek', 'Insurity', 'Hyperexponential', 'Earnix', 'Tricentis', 'BrowserStack', 'Playwright'],
  },
  {
    slug: 'assurance-coe',
    num: '02',
    title: 'Assurance CoE',
    art: 'coe',
    accent: '#5eba46',
    card: 'One team that sets the rules for quality. It provides the standards, tools and oversight so testing is done the same reliable way everywhere.',
    summary: 'One Center of Excellence, so every team tests the same reliable way.',
    intro: [
      'Standards stop ten teams from testing ten different ways. The Assurance CoE (Center of Excellence) is for insurers who want quality run as a service: accountable, measured and consistent across every line of business.',
      'It brings a team that runs the service day to day, a shared rulebook and tools, insurance know-how built into every test, and shared experts every team can call on.',
    ],
    seoTitle: 'Assurance CoE: Testing Center of Excellence for Insurance | ValueMomentum',
    subs: [
      {
        title: 'Test Management Office',
        card: 'The team that runs the testing service day to day: agreed targets, reporting, planning and handling issues.',
        body: 'A testing program needs someone accountable. This team runs the service: it agrees targets, holds regular reviews, handles issues, plans the workload and reports on quality.',
      },
      {
        title: 'Assurance CoE Standards',
        card: 'A shared rulebook, templates and ready-to-use tools, so every team tests the same way.',
        body: 'Standards stop ten teams from testing ten different ways. The Assurance CoE (Center of Excellence) provides the shared methods, templates and tools every line of business uses.',
      },
      {
        title: 'Domain Assurance',
        card: 'Insurance know-how built into testing: realistic customer journeys, a library of test scenarios, and extra checks whenever rates, rules or forms change.',
        body: 'Insurance knowledge sits at the heart of the work. We test full customer journeys, keep a library of real-world scenarios, and add checks whenever rates, rules or forms change.',
      },
      {
        title: 'Engineering Assurance',
        card: 'The technical backbone: test automation, test data, test environments and speed testing, with AI helping where useful.',
        body: 'The technical side of testing: automation, test data, test environments and speed testing, with AI helping where it makes sense. The result is testing that is faster, repeatable and needs less manual effort.',
      },
      {
        title: 'Process Assurance',
        card: 'Testing built into everyday delivery: checking work as it is built, re-testing what changed, approving releases and finding the cause of defects.',
        body: 'Quality belongs inside the build, not after it. We test as each piece of work is finished, re-test only what changed, check releases against agreed gates and trace defects back to their cause.',
      },
      {
        title: 'Enabling Functions',
        card: 'Shared experts in speed testing, AI-driven automation and test data who support every team.',
        body: 'Shared specialists keep every team moving: speed and load testing for big releases, plus AI-powered automation and test data support, covering the tools and environments teams need.',
      },
    ],
    proof: [
      { prefix: '<', to: 2, suffix: '%', label: 'of serious defects reaching customers' },
      { prefix: '~', to: 35, suffix: '%', label: 'lower QA cost over 3 years' },
      { display: 'One', label: 'rulebook for every line of business' },
    ],
    tools: ['Tricentis', 'BrowserStack', 'Playwright', 'GitHub Copilot', 'Functionize', 'AccelQ'],
  },
  {
    slug: 'ai-agentic-systems-assurance',
    num: '03',
    title: 'P&C AI & Agentic Systems Assurance',
    shortTitle: 'AI & Agentic Systems Assurance',
    art: 'ai',
    accent: '#febc10',
    card: 'Your AI needs checking too. We test chatbots, AI assistants and AI models for accuracy, fairness and safety before they touch a policy or a claim.',
    summary: 'Accuracy, fairness and safety checks for the AI that prices risks and handles claims.',
    intro: [
      'When an AI model prices a risk or answers a customer, it needs at least the same scrutiny as any critical system. This offering is for insurers putting chatbots, AI assistants, AI models and AI agents into underwriting, claims and service.',
      'AI can give different answers to the same question and can get less accurate over time, so a simple pass or fail is not enough. We check for bias, watch accuracy over time, confirm safety limits hold and keep records regulators can review.',
    ],
    seoTitle: 'AI & Agentic Systems Assurance for Insurance | ValueMomentum',
    subs: [
      {
        title: 'Assurance of AI Systems',
        card: 'Checks that AI is accurate, fair and safe: it works as intended, shows no bias, stays accurate over time, stays within set limits and leaves a record regulators can review.',
        body: 'When an AI model prices a risk or answers a customer, it needs at least the same scrutiny as any critical system. We check that models work as intended, test for bias, watch for accuracy slipping over time, confirm safety limits hold and create the records regulators such as the NAIC expect.',
      },
      {
        title: 'AI in the Insurance Value Chain',
        card: 'Different jobs carry different AI risks. Pricing models must be fair; claims AI must not overpay, underpay or wrongly deny. We tailor the checks to the job.',
        body: 'Underwriting, claims and customer service each carry different AI risks. Pricing models must be fair and match what was filed with regulators; claims AI must not overpay, underpay or wrongly deny. We shape the checks and service targets to the job the AI does.',
      },
      {
        title: 'AI-Enabled Quality Engineering',
        card: 'We use AI to test better. AI agents plan, write, run and maintain tests, and a person approves what the AI produces.',
        body: 'We use AI in our own testing. AI agents plan, write, run and repair tests, and people approve what the AI produces. The tools run inside our platform, so there is no separate automation license to buy.',
      },
    ],
    proof: [
      { range: [40, 60], suffix: '%', label: 'faster checking of AI models' },
      { range: [30, 50], suffix: '%', label: 'fewer AI model problems' },
      { display: 'NAIC-ready', label: 'records regulators can review' },
    ],
    tools: ['Playwright', 'GitHub Copilot', 'Functionize', 'AccelQ', 'Tricentis'],
  },
];

export const headlineProof = [
  { display: 'Near zero', label: 'defects reaching customers', tag: 'Platform Assurance' },
  { prefix: 'Up to ', to: 50, suffix: '%', label: 'less testing effort', tag: 'Platform Assurance' },
  { prefix: '<', to: 2, suffix: '%', label: 'serious defects reaching customers', tag: 'Assurance CoE' },
  { prefix: '~', to: 35, suffix: '%', label: 'lower QA cost over 3 years', tag: 'Assurance CoE' },
  { range: [40, 60], suffix: '%', label: 'faster checking of AI models', tag: 'AI Assurance' },
  { range: [30, 50], suffix: '%', label: 'fewer AI model problems', tag: 'AI Assurance' },
];

export const partners = [
  { group: 'Insurance platforms', items: ['Guidewire', 'Duck Creek', 'Insurity', 'Hyperexponential', 'Earnix'] },
  { group: 'Anchor tools', items: ['Tricentis', 'BrowserStack', 'Playwright', 'GitHub Copilot'] },
  { group: 'Emerging AI-led tools', items: ['Functionize', 'AccelQ'] },
];

export const marquee = ['Guidewire', 'Duck Creek', 'Sapiens', 'Insurity', 'Majesco', 'Hyperexponential', 'Earnix', 'PolicyCenter', 'ClaimsCenter', 'BillingCenter', 'Duck Creek OnDemand', 'LLMs', 'AI agents'];

export const insights = [
  { type: 'Case study', title: 'Rating testing: how to be sure your prices are calculated correctly', art: 'rating', read: '6 min read' },
  { type: 'Blog', title: 'Testing Guidewire and Duck Creek releases and cloud upgrades', art: 'cloud', read: '5 min read' },
  { type: 'White paper', title: 'Checking AI in underwriting and claims: bias, accuracy over time and NAIC expectations', art: 'ai', read: '14 min read' },
];

export const faqs = [
  {
    q: 'What is software and AI assurance?',
    a: 'It is quality checking for two things: the software insurers run on, and the AI that increasingly sits inside it. Software assurance is the testing insurers already know. AI assurance checks that AI tools are accurate, fair and safe.',
  },
  {
    q: 'Why test rating and forms separately?',
    a: 'Pricing and policy documents are where small errors cost real money and can cause regulatory trouble. Many insurers also use standalone pricing tools next to their main system, so we test those on their own as well as inside Guidewire or Duck Creek.',
  },
  {
    q: 'Do you only work with Guidewire and Duck Creek?',
    a: 'No. Guidewire and Duck Creek are our core focus, but we also test Sapiens, Insurity and Majesco, along with systems for policy administration, claims and reinsurance.',
  },
  {
    q: 'How is AI assurance different from normal testing?',
    a: 'AI can give different answers to the same question and can get less accurate over time, so a simple pass or fail is not enough. We also check for bias, watch accuracy over time, confirm safety limits hold and keep records regulators can review.',
  },
];

export const glossary = {
  gw: { term: 'Guidewire, Duck Creek', def: 'Two leading software products insurers use to run policies, claims and billing.' },
  rating: { term: 'Rating', def: 'Calculating the price (premium) of an insurance policy.' },
  forms: { term: 'Forms', def: 'The documents that come with a policy, such as the policy contract and notices.' },
  defect: { term: 'Defect', def: 'A bug or error in software. A defect that reaches customers is a defect “leaking” through.' },
  coe: { term: 'Center of Excellence (CoE)', def: 'A central team that sets standards and shares best practice with everyone else.' },
  fnol: { term: 'First report of a claim (FNOL)', def: 'The moment a customer first tells the insurer something has happened.' },
  llm: { term: 'AI model, LLM, GenAI', def: 'Software that learns from data to make predictions or write text. Chatbots are an example.' },
  agentic: { term: 'Agentic AI, AI agents', def: 'AI that can carry out tasks on its own, not just answer questions.' },
  bias: { term: 'Bias', def: 'AI treating some groups of people unfairly.' },
  naic: { term: 'NAIC', def: 'The group of US state insurance regulators. It has issued guidance on how insurers should govern AI.' },
  pc: { term: 'P&C', def: 'Property and casualty insurance, such as home, auto and business cover.' },
};

// Illustrative scenarios for the interactive AI assurance demo (not client data)
export const aiLab = [
  {
    id: 'underwriting',
    tab: 'Underwriting model',
    risk: 'Pricing models must be fair and match what was filed with regulators.',
    input: 'Applicant · 3-bed home · coastal ZIP · roof replaced 2009 · no prior claims',
    output: 'Recommended premium $2,184 / yr · Tier B',
    checks: [
      { k: 'Accuracy vs. filed rates', v: 99.7, unit: '% match', ok: true },
      { k: 'Fairness across groups', v: 98.9, unit: '% parity', ok: true },
      { k: 'Stays within filed rate bands', v: 100, unit: '% in band', ok: true },
    ],
    drift: [62, 63, 61, 64, 63, 62, 64, 63, 65, 63, 64, 63],
    verdict: 'Cleared · filed-rate parity confirmed',
  },
  {
    id: 'claims',
    tab: 'Claims AI',
    risk: 'Claims AI must not overpay, underpay or wrongly deny.',
    input: 'FNOL · rear-end collision · 6 photos · repair estimate $4,920',
    output: 'Suggested payout $4,860 · fast-track eligible',
    checks: [
      { k: 'Payout accuracy (no over / under)', v: 98.8, unit: '% within tolerance', ok: true },
      { k: 'Wrongful denial screen', v: 100, unit: '% reviewed', ok: true },
      { k: 'Escalates high-value claims', v: 100, unit: '% routed to adjuster', ok: true },
    ],
    drift: [58, 60, 59, 61, 63, 66, 64, 61, 60, 59, 60, 59],
    verdict: 'Cleared · drift event caught & retrained',
  },
  {
    id: 'chatbot',
    tab: 'Customer chatbot',
    risk: 'Assistants must stay grounded in the policy and never promise coverage.',
    input: 'Customer · “Am I covered if my basement floods?”',
    output: '“Standard home policies usually exclude flood. Let me connect you with an agent to review yours.”',
    checks: [
      { k: 'Answers grounded in policy', v: 99.2, unit: '% grounded', ok: true },
      { k: 'Guardrails (no coverage promises)', v: 100, unit: '% held', ok: true },
      { k: 'Consistent across rephrasings', v: 97.6, unit: '% consistent', ok: true },
    ],
    drift: [70, 71, 70, 72, 71, 71, 72, 70, 71, 72, 71, 72],
    verdict: 'Cleared · human approved for release',
  },
];
