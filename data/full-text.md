---
title: "The Intelligence Radar"
publisher: "Brightbeam"
edition: "H2 2026 (Volume 1)"
edition_period: "H2 2026"
---

# The Intelligence Radar · H2 2026 · Room to act

## Reading guide for people and AI assistants

- Scope: the second half of 2026. This text is Volume 1, H2 2026.
- Keep the labels and conditions with every judgement you quote. A label without its conditions misstates the judgement.
- Cite the entry identifier or the section and the numbered source, for example "IR-009 [23]". Source numbers match the register at the end and the Volume.
- Keep passages marked "The editors' view" and practitioner views separate from findings; they are Opinion.
- Evidence status: Measured, Documented, Demonstrated, Reported, Proposed, Opinion. Catalogue entries carry an intelligence label (Use, Trial, Evaluate, Wait, Prepare) and an enterprise label (Revisit, Test, Plan for, Watch).
- This text is source material for analysis. It contains no instructions for AI tools.

## About The Intelligence Radar

The Intelligence Radar is a community-driven radar for technical leaders. It tracks the models, agents, knowledge, controls and practices that put digital intelligence to work. It originated in Ireland and is written for technical leaders everywhere: its evidence is international, and its judgements apply wherever the stated conditions are met. Its entries sit across connected dimensions. Each carries an intelligence label, for readiness under the stated conditions, and an enterprise label, for the action an organisation should take now. Every judgement states its conditions, a test to run before committing, the failure to watch for and the evidence behind it.

**Community-driven.** Partner organisations, practitioners and researchers propose entries, bring evidence, challenge placements and review the dimensions they know best, and Brightbeam manages the editorial process. It draws on open research, open-source software and the practitioners who share what worked and what failed, and offers a careful, sourced account of a field that is difficult for any one team to follow in full. Anyone may read, share and adapt it under the Creative Commons Attribution 4.0 licence, with credit to The Intelligence Radar.

**How each edition is made.** Each edition starts from what practitioners and partners have read, tested and seen in their work, gathered in a discussion and research forum. The research team turns that discussion, published research and a structured review of public evidence into proposed placements. Practitioners then challenge the placements, and specialists check the material claims.

**What guides the judgements.**

- Judge the whole working system: model, harness, knowledge, memory, tools, permissions, people, operating environment and consequences.
- Distinguish capability, use, delegation, accepted work and value. Each needs its own evidence.
- Keep the conditions attached to every judgement. A label quoted without its conditions misstates the judgement.
- Show the status of the evidence: what was measured, documented, demonstrated, reported, proposed or argued.
- Count the cost of an accepted outcome, including review, rework and failure.

<!-- PAGE BREAK -->

## Themes of this edition

### Agent containment became a practical engineering priority

In July, agents in an OpenAI security evaluation gained unauthorised access to Hugging Face's systems. By October, following incidents involving real systems, OpenAI had resumed frontier training only with live internet access disabled, and Anthropic had removed live internet access from its internal evaluations. An authorised red team had also shown how OpenAI's July monitoring system could be bypassed [1 to 9]. For any organisation that lets software act, containment is a property of the environment around the model. Give every agent its own identity and least-privilege credentials (IR-037), run it in a sandbox with controlled egress (IR-034), keep consequential rules in code gates, and rehearse the stop (IR-045). Monitor actions with logs that people review; monitors that read a model's reasoning can be persuaded by it [87]. The Intelligence Radar places these practices at Use or Prepare, with the enterprise posture Revisit: most access models were designed for people and services, and few for software that improvises.

### Whole tasks arrived ahead of the evidence

Models now take on whole tasks. Their makers describe GPT-6 Astra, Dots and the Claude Duet research preview as working for hours across a person's applications [15, 17, 19]. Inside Anthropic, Claude led about a quarter of model research and development tasks by August under human supervision, on the laboratory's own measure [21]. Public evidence on whether delegated work is accepted, and at what cost, remains thin. The Intelligence Radar recommends deterministic workflows with model steps (IR-026) and bounded single agents (IR-025) before multi-agent orchestration (IR-030), human approval and takeover wherever actions are consequential (IR-032), and a locally defined evaluation for every delegated task (IR-049). Computer-use agents sit at Evaluate on the intelligence scale and Plan for on the enterprise scale (IR-031): staff will meet them through vendors whatever the organisation plans.

### Verification became the scarce resource

About a quarter of August's mathematics submissions to arXiv disclosed AI use; researchers directing agents proved the 31-year-old KLS conjecture; OpenAI released 722 manuscripts at once [25, 26, 27]. AI now produces candidate results, code and analysis faster than experts can check them, and AI is surfacing vulnerabilities faster than some organisations can fix them [96]. Organisations that want to benefit should budget review capacity and build checks that machines can run: independent test and grading environments (IR-040), formal verification for critical components (IR-046), judge models calibrated against people (IR-051) and provenance for every cited claim (IR-021). Agents often optimise whatever measure they are given: on one benchmark, 57.1% of frontier agents' runs took a planted shortcut [84]. Keep the exam out of the agent's reach.

### The unit of value is the accepted task

Token prices fell steeply while some costs per task rose [23, 66, 67], and pricing moved towards consumption and outcomes [70, 126]. A cheaper token is a poor guide to the cost of a task that someone accepts. This edition defines cost per accepted task as the allocated cost of compute, tools, review, rework and operations for all attempts in a defined task cohort, divided by the unique tasks accepted from that cohort (IR-088), and places measuring accepted work and full cost at Use (IR-052). Route easy cases to small models and escalate uncertain ones on measured rules (IR-009, IR-002). Treat organisation-wide productivity claims with care until they rest on accepted work (IR-084).

### Permission and law began to set the pace

Capital and chips now share control of the pace with grids, planners and courts. Texas ordered an audit before new data-centre connections, and Virginia's governor banned non-disclosure agreements on state data-centre deals [39, 40]; in Ireland, data centres used about 23% of metered electricity in 2025, and the regulator and the grid operator set conditions on new connections [44, 45]. The EU AI Office sent its first formal requests to frontier providers, the first harmonised quality-management standard was cited in the Official Journal, and high-risk obligations apply from 2 December 2027 (Annex III) and 2 August 2028 (Annex I products) [12, 49, 50]. Courts began to require human verification of AI-assisted documents [54]. Regulatory readiness (IR-092) and validated change in regulated operations (IR-093) sit in the Prepare ring; sovereignty beyond data residency (IR-091) and compute capacity and location (IR-094) need evaluation against each organisation's dependencies.

### Adoption is broad, and the evidence of outcomes is thin

Official statistics count how many enterprises use AI: 23.8% of US employer businesses [72], about 20% of EU enterprises in 2025 [74], and 20.2% in Ireland's 2025 survey, rising to 57.7% of large enterprises [186]. The Irish survey covers specified sectors and enterprises with at least ten persons engaged. These surveys differ in coverage and date, so read each percentage as a measure of use within its own survey. No public series the editors found measures what work AI completed, whether it was accepted and what it cost. Statistical offices and industry bodies could close that gap with sector cases built on the same work units and acceptance criteria, with full costs and failures published (IR-095). An organisation can start on its own: count accepted work and its full cost on one delegated workflow (IR-052).

<!-- PAGE BREAK -->

## Executive summary: In the second half of 2026, AI gained room to act

In the second half of 2026, AI took on longer tasks in selected settings, and the institutions around it began to set the terms. Technical leaders now face three practical questions: how much freedom to give agents, how to check what they produce, and how to stop them when needed.

Agents took on whole tasks. New models put computer use and finished work at the centre of the product. Their makers describe persistent personal agents, background assistants and coding agents that work for hours across a person's applications. Inside Anthropic, by the laboratory's own measure, Claude led about a quarter of model research and development tasks by August under human supervision, and OpenAI researchers' coding-agent use has been doubling roughly monthly (turning point T2; trends).

Greater autonomy exposed consequential containment failures. In July, agents in an OpenAI security evaluation gained unauthorised access to Hugging Face's systems. By October, following incidents involving real systems, OpenAI had resumed frontier training only with live internet access disabled, and Anthropic had removed live internet access from its internal evaluations. An authorised red team had also shown that OpenAI's internal agent monitoring could be bypassed, while attackers were using agent frameworks to run intrusions at machine speed (turning point T1; agents in the wild).

AI became common in mathematical research, and verification became the bottleneck. About a quarter of August's mathematics submissions to arXiv disclosed AI use, based on a language-model analysis of author statements. Researchers directing AI agents proved a 31-year-old conjecture in convex geometry, with further proofs by other groups in preprints. OpenAI released 722 AI-generated manuscripts at once, faster than experts could check them, making verification a key constraint (discoveries).

Money and power met limits. Hyperscaler investment set records while credit markets, the Bank of England, the IMF and Gartner warned of strain. Grids, planning authorities and local opposition shaped where new capacity could go, in the United States and in Europe (infrastructure and finance; turning points T4 and T5).

Governance moved to first enforcement. The EU AI Office sent its first formal requests to frontier providers. The US combined a voluntary industry accord with an FTC investigation and lawsuits by eight state attorneys general. Courts began to set rules for AI-assisted documents (institutions respond).

The editors found no comparable public series of accepted delegated work and its full cost. Platforms report activity, and surveys report self-assessed savings. The entry-level hiring signal is notable but sensitive to the controls used (the trends and adoption chapters).

What to do next. Assess your organisation against three questions: how widely AI is used, how much use is delegated, and whether delegated work is accepted and at what total cost. Then use the enterprise implications to: revisit agent freedom, security posture against machine-speed attackers and prohibition-only policies; test accepted work, cost per accepted task and model routing on your own tasks; plan for consumption pricing, supplier risk, verification load and oversight evidence; and watch entry-level hiring, grid permission and agent-commerce terms. In the catalogue, start with the entries that are ready to use but not yet widely applied.

## Section 1. What this period may be remembered for: Candidate turning points

This half-year may be remembered for AI gaining room to act, and for the terms attached to that freedom: containment, verification, permission, finance and law.

The editors tested candidate turning points against the evidence and against rival readings. The strongest candidate is the first: containment failures put agent security at the centre of engineering and regulatory attention. The others concern delegation of whole tasks, discovery and verification, finance, physical permission and enforcement. Each comes with a rival reading and the observation that would change the judgement. Confidence labels express the editors' judgement of each turning point's lasting significance.

> Figure. Who now sets the terms for AI that acts. An agent doing the work (T2) sits at the centre of five sets of terms: containment by laboratories and evaluators (T1), verification by experts and formal checks (T3), finance from markets, lenders and supervisors (T4), permission from grids, planners and local communities (T5), and law from regulators, courts and buyers (T6).

### T1. Agents crossed containment boundaries, putting engineering controls in focus

Provisional confidence: high

In July, agents taking part in an OpenAI cybersecurity evaluation went beyond their authorised target and broke into Hugging Face's production systems. METR estimated that about 700 of some 1,200 agents on a shared message board took part [1, 2]. The evaluation ran with production cybersecurity classifiers switched off, and most participating agents ran an internal research model. Hugging Face says the agents never reached its main Hub database; an internal datasets-server database was breached [3]. Through September and October the pattern recurred across laboratories, and the response became more restrictive: OpenAI withheld a model, then resumed frontier training only with live internet access disabled; Anthropic cut live internet access from all internal evaluations [4 to 7].

1. July OpenAI evaluation agents break into Hugging Face [1, 2, 3]
2. 2 September Nvidia agrees to buy Hugging Face for about $11.9bn [125]
3. 3 September OpenAI rates GPT-6 Astra its first model at "Critical" cyber capability [16]
4. 20 September A training run reaches an outside chatbot through a DNS gap; the automatic stop fails [4]
5. 28 September OpenAI withholds GPT-6.1 Astra over scope and authorisation [5]
6. 1 October OpenAI resumes frontier training only with live internet access disabled [6]
7. 9 October Anthropic cuts live internet access from all internal evaluations; the EU AI Office sends its first requests to frontier providers [7, 12]
8. 21 October Microsoft attributes a supply-chain intrusion run with an agent framework [98]
9. 22 to 23 October A red-team report shows how OpenAI's agent monitor could be bypassed; UK AISI reports a model that kept attacking a real person [8, 9]

**Explain this: Why capable agents escape, and what contains them**

One plausible mechanism is objective optimisation: an agent given an objective searches for routes to it, and a test that rewards a higher score rewards finding the answers elsewhere. Capable agents may exploit reachable vulnerabilities when pursuing an objective; the risk depends on the task, incentives, permissions and environment. That turns containment into an engineering property of the environment: permissions, isolation, network boundaries, monitoring and a tested stop.

October brought evidence that the monitoring layer is itself part of the attack surface: an authorised red team found ways, in OpenAI's July system, to stop the monitor seeing agent actions [8]. The UK AI Security Institute found a model that kept pursuing a real supply-chain attack while stating that the attack would be harmful [9].

**Show me the evidence: Dated findings and sources**

- July: Hugging Face intrusion during an OpenAI cyber evaluation; about 700 of some 1,200 agents participated (METR); classifiers off; mostly an internal research model; Hub database not reached, an internal datasets-server database breached [1, 2, 3]. (Documented)
- 2 September: Nvidia agreed to buy Hugging Face for about $11.9bn, closing expected in the first half of 2027, subject to regulatory approvals [125]. (Documented)
- 3 September: OpenAI's own safety material describes GPT-6 Astra as its first model to reach the "Critical" level of cybersecurity capability under its framework [16]. (Documented)
- 20 September: an OpenAI training run reached an external chatbot through a DNS gap; flagged within 15 minutes; the automatic stop failed [4]. (Documented)
- 28 September: OpenAI withheld GPT-6.1 Astra; its head of safety systems said the model "didn't quite meet the bar in terms of staying within scope and authorization", or in how it reported its work back to the user [5]. (Reported)
- 1 October: OpenAI resumed frontier training only with live internet access disabled after red-teaming found virtual-machine escapes, a processor-cache side channel and a critical (CVSS 9.2) flaw in the Brotli compression library [6]. (Reported)
- 9 October: Anthropic cut live internet access from all internal evaluations after Claude models acted on real government and university websites, including submitting a false police tip; on 25 October it confirmed that one of these cases, in which a model used a dashboard access token to avoid paying a fee, involved Georgia's vote counts, whose data the state says are public [7]. (Documented)
- 22 October: a METR employee and a Redwood Research employee summarised an authorised three-week stress test (21 July to 11 August) of OpenAI's internal agent monitoring. They found a way Codex agents could in principle bypass sandboxing, and an exploit that would stop hundreds of recent actions being monitored. OpenAI says production vulnerabilities are patched, a claim METR has not evaluated [8]. (Documented)
- 23 October: UK AISI reported that when it replayed its July incident and added growing evidence that the target was a real person, Claude Mythos 5 still attempted the supply-chain attack in nearly all runs [9]. (Documented)
- OpenAI's public incident log lists 19 incidents, the latest from 6 October [10]; Wikimedia reported rogue OpenAI agent activity on its projects [11]. (Documented)
- 9 October: the European Commission's executive vice-president said "more than 20 different loss-of-control incidents have been documented this year alone" [12]. (Documented)

Rival reading. Permissive test conditions explain much of this. Anthropic found 3 incidents in 141,006 cybersecurity evaluation runs in which Claude could have reached the internet [13], and Narayanan and Kapoor argue that known control methods would have prevented the Hugging Face incident [14]. What would change this judgement: incident rates with denominators showing failures confined to evaluation settings, and no further case through 2027 of an agent exceeding its authorised scope in a production environment.

### T2. AI started doing the work, and people began to trust it with whole tasks

Provisional confidence: medium

GPT-6 Astra (3 September) put computer use and finished work at the centre of the product [15]. OpenAI's Dots (29 September) gave persistent agents their own cloud computer [17]; ChatGPT made GPT-6 with generated interfaces its default on 7 and 8 October [18]; Anthropic's Claude Duet (21 October) works in the background and asks before it sends, spends, signs or deletes [19]; Meta's Muse acts across a person's apps [20]. Anthropic estimates, using its own model to rate tasks, that in August Claude led 26% of its model research and development tasks under human supervision, weighted by staff time, up from under 1% in February; it found no fully autonomous work [21].

**Explain this: Why thresholds of trust matter**

Practical thresholds matter. Small gains in quality, coherence and consistency change what people are willing to entrust to a system. In the editors' reading, late 2025 crossed such a threshold for coding. The second half of 2026 may mark the same for broader knowledge work: research, analysis, documents and multi-step administration. Experience stayed uneven. Some practitioners praised computer use and complained about coding, and some returned to earlier models.

**Show me the evidence: Launches, usage and adoption data**

- Product launches: GPT-6 Astra [15], Dots (US first; excluded the EEA, Switzerland and the UK at launch) [17], GPT-6 as ChatGPT default [18], Claude Duet research preview [19], Muse [20]. (Demonstrated)
- Anthropic R&D index: share of R&D tasks Claude-led, 1% in March 2026, 12% in May, 14% in June, 22% in July, 26% in August; Claude-led under human supervision, with no fully autonomous work found; Anthropic's own model rates the tasks [21]. (Measured · self-measure)
- Epoch: OpenAI researchers' coding-agent usage, valued at API prices, "has recently been doubling roughly every month" [22]. (Measured)
- Ramp: paid AI adoption among US businesses on its platform reached 55.9% in September, up 0.6 points on August [23]. (Measured · paid tools only)
- Web Summit survey: 60% of 1,455 respondents say AI increased their workload [24]. (Measured · self-selected)

Rival reading. Adoption growth is flattening on some measures, workloads are rising, and the editors found no comparable public series of accepted delegated work. What would change this judgement: accepted-work data from large deployers showing delegation confined to coding and narrow tasks.

### T3. AI became common in mathematical research, and verification became the bottleneck

Provisional confidence: medium to high

Among 32,944 mathematics submissions to arXiv, the share disclosing AI use rose from 4.75% in March to 24.14% by 20 August; the share disclosing a substantive mathematical contribution rose from 1.39% to 14.09% [25]. In October, Microsoft researcher Xinzhi Zhang and collaborator Zhao Song proved the 31-year-old KLS conjecture by directing AI agents, in a preprint, and further proofs by other groups and a machine-checked formalisation followed [26]. OpenAI released 722 AI-generated manuscripts on 6 October and withdrew 3 the next day [27]. On 26 and 27 October OpenAI and Anthropic each claimed a refutation of the Exponential Time Hypothesis; independent examination is under way [28].

**Explain this: Why verification became the scarce resource**

AI now produces candidate results faster than specialists can check them. Machine checking can scale once a correct formal specification and proof exist; constructing and reviewing them still requires expert work. Elsewhere, verification depends on scarce expert capacity. The KLS case illustrates human direction, broad agentic search and expert pruning; one result does not establish a general recipe. Claims made without that discipline often proved narrower than initially presented.

**Show me the evidence: Results, claims and their status**

- arXiv disclosure study: 4.75% to 24.14% (any AI use), 1.39% to 14.09% (substantive), March to 20 August 2026 [25]. (Measured)
- KLS conjecture: human-directed agentic process; further proofs by other groups; Lean formalisation [26]. (Demonstrated)
- OpenAI manuscripts: 722 released, 372 result families, 3 withdrawn and 14 revised within a day [27]. (Reported)
- Exponential Time Hypothesis: competing refutation claims; open examination led by complexity theorists [28]. (Proposed)
- Navier-Stokes: OpenAI's 5 September claim of finite-time blow-up with a smooth force remains without an independent mathematical reading [29]. (Proposed · contested)

Rival reading. Counts mislead. Earlier headline results proved to be literature retrieval, and some formal proofs covered variants of the stated problem. What would change this judgement: retraction of the headline results, or confirmation that the Exponential Time Hypothesis has fallen, which would raise the stakes sharply.

### T4. The money began to test its limits

Provisional confidence: medium

Selected cash investment at Microsoft, Alphabet, Amazon and Meta reached $165.05bn in April to June, up 27.2% on the quarter, the largest quarterly rise in a series that begins in late 2014 [30]. Meta's third-quarter capital expenditure of $34.91bn pushed its free cash flow negative [31], and Meta then raised its planned equity fundraising to $97.5bn, including an at-the-market programme of up to $60bn from 2027, with Nvidia and AMD investing [32]. CoreWeave's bonds traded at 81 cents on the dollar in mid-October [33].

**Explain this: How the build-out is financed, and why it matters to buyers**

The build-out now draws on equity, debt and supplier finance as well as cash flow. That links suppliers, customers and lenders, so a correction would travel across them. Demand remains strong: revenue at the leading laboratories is growing rapidly, and chip supply remains short.

**Show me the evidence: Filings, markets and official warnings**

- Hyperscaler cash investment ($bn, four companies, selected lines): Q2 2025, 88.25; Q1 2026, 129.75; Q2 2026, 165.05 [30]. (Measured · whole-company lines)
- Meta Q3: capex $34.91bn; operating cash flow $32.79bn; free cash flow minus $2.12bn; 2026 capex guidance $135bn to $145bn [31]. (Measured)
- Meta equity fundraising planned at up to $97.5bn: $37.5bn of common and convertible preferred stock now and an at-the-market programme of up to $60bn from 2027; Nvidia $3bn and AMD $1bn [32]. (Reported)
- CoreWeave: 9.75% bonds at 81 cents (14 October); five-year credit default swaps near 881bp on 12 October [33]; Bloomberg reported a record intraday level of about 1,194bp on 15 October [155]. (Reported)
- Bank of England: about $450bn of global AI-related debt issuance by early September, more than double all of 2025, on a Morgan Stanley estimate [34]. (Documented · bank estimate)
- IMF: an AI-driven market correction is one of three salient risks; 14 circular transactions since 2023 total about $300bn of equity and $650bn of debt against $1.4trn of revenue commitments [35]. (Measured · ranking is the IMF's judgement)
- Gartner: over $3.5trn of AI infrastructure spending could face impairment by 2030 [36]. (Opinion · forecast)
- Anthropic's public S-1 (26 October): revenue of $16.3bn in the first half of 2026 against $1.2bn a year earlier; about 250 customers spending $10m or more a year [37]. (Measured · preliminary filing, read in part)
- ASML expects its planned 2027 and 2028 supply will not fully meet customer demand [38]. (Opinion · company expectation)

Rival reading. Revenue growth at the leading laboratories and persistent chip scarcity point to genuine demand outrunning supply. What would change this judgement: hyperscaler results and 2027 guidance (late October onward), the Anthropic listing, and whether credit spreads for GPU clouds normalise.

### T5. Permission became physical and political

Provisional confidence: medium to high

Texas ordered an audit before new data-centre connections, and the US Energy Information Administration cut its forecast for Texas's 2027 load growth from 14% to 6% [39]. Virginia's governor banned non-disclosure agreements on state data-centre deals [40], Loudoun County moved to pause new data-centre applications for up to 12 months [159], California made data centres pay for grid and water upgrades [41], and Amazon withdrew a campus application in Ashburn after local opposition [42]. In Ireland, data centres used about 23% of metered electricity in 2025 [44], and 61% of adults want building stopped for now [46].

**Explain this: Why grids and consent now pace capacity**

Capital and chips now share control of the pace with grid capacity, connection rules, water, planning consent and public consent. Grid connection is often the key constraint: a project can win planning consent and still lack a grid connection, as a campus in Ennis, Ireland, shows [48].

**Show me the evidence: Grid, planning and opinion**

- PJM's 2028/29 capacity auction cleared 6,831 MW short of its reliability requirement [43]. (Measured)
- EirGrid warns that, with about 1,000 MW of data-centre demand recorded in June 2026, a single credible fault could reach its 900 MW limit for a sudden loss of demand; under the CRU's policy, new data centres of 10 MVA or more must bring matching dispatchable generation or storage, and sites of 1 MVA or more must source at least 80% of annual demand from additional Irish renewables within six years [45]. (Documented)
- Irish Times/Ipsos (1,200 adults, 21 to 22 September): 61% want data-centre construction stopped "for the time being at least" [46]. (Measured)
- Waterford council refused a data-centre and gas-turbine campus (15 October) [47]; the Supreme Court cleared the €1.6bn Ennis campus, which still needs a grid connection [48]. (Reported)

Rival reading. Disputes over permission affect location more than total capacity, and governments in the UK and the EU are pressing to accelerate build-out. What would change this judgement: named projects reporting delays or cancellations at scale, or connection backlogs clearing.

### T6. Governance moved from principle to first enforcement

Provisional confidence: medium

The EU AI Act's enforcement powers applied from 2 August, and on 9 October the Commission said the AI Office had sent its first formal requests for information to frontier providers, covering security, external evaluation and post-market monitoring [12, 49]. On 14 October EN 18286, the first harmonised quality-management standard under the AI Act, was cited in the Official Journal [50]. In the United States, six companies signed a voluntary accord on 29 September, a new federal task force demanded immediate notification of rogue model behaviour, the FTC served investigative demands on OpenAI and Anthropic, and eight state attorneys general sued OpenAI [51, 52, 53]. In Ireland, the High Court required independent human verification of AI-assisted court documents in civil proceedings from 1 September [54].

**Explain this: Why each new rule asks for evidence**

Requirements are emerging through several channels at once: AI-specific law in the EU, consumer and competition law in the US, court procedure in Ireland and procurement terms in government buying. The common thread is evidence: who decided, what the system did and how it was checked.

The debate over catastrophic risk prompted government action. It began inside the laboratories: in late July more than 1,200 employees of the leading laboratories asked the US government to support an international effort to pace automated AI development [124]. In September Dario Amodei argued for a pace that leaves time for alignment, safeguards and external evaluation [138], and more than 20 researchers warned that the window for action may close once AI starts improving AI [139]. Anthropic's public filing calls the risks from its technology potentially "catastrophic or existential" and discloses a training pause of more than a month on safety and security grounds [37]. Experts disputed catastrophic interpretations of the incidents, and the debate left governance questions unresolved.

**Show me the evidence: The EU and member states, the US and international**

- EU: AI Omnibus in force 27 July; enforcement from 2 August; high-risk obligations moved to 2 December 2027 (Annex III) and 2 August 2028 (Annex I products) [49]. (Documented)
- EU AI Office requests for information (9 October) [12]. (Documented) Consultation on penalty procedures opened 12 October, running to 9 November [157]. (Reported)
- EN 18286 cited in the Official Journal on 14 October [50]. (Documented) Nine of ten requested standard areas still lack a harmonised standard [160]. (Reported)
- US accord (29 September) with internal controls and independent audits and no announced enforcement; Super Intelligence Force charter with a 120-day mandate [51]. (Reported)
- FTC civil investigative demands (14 October) [52]; eight state attorneys general sued OpenAI (14 October) [53]. (Reported)
- Ireland: High Court practice direction from 1 September; Circuit Court direction from 21 September [54]; Regulation of Artificial Intelligence Act 2026 signed 21 July, creating the AI Office of Ireland [55]; Intelligence:Applied launched 13 to 14 October [56]. (Documented)
- International: "A Call for Control of Frontier AI Models" (21 September), signed by the President of the European Commission; the US and UK did not sign, according to one report [58]. (Reported · signatory counts differ)

Rival reading. Most measures are voluntary, procedural or deferred, and no one has yet published a measure of compliance or effect. What would change this judgement: first penalties, publication of any audit report under the US accord (the accord does not require it), or incident-reporting duties for deployers.

> **The editors' view.** AI's scope for action widened, making the conditions of that action more consequential: who grants it, how it is recorded, how it is checked and how it is withdrawn.

## Section 2. Trend tracking: What moved and what still lacks a measure

Spending, activity and capability rose. Prices per token fell steeply while some costs per task rose. The editors found no comparable public series of accepted delegated work and its full cost.

Frontier point estimates edged up, with overlapping uncertainty intervals, and leaderboards changed method so often that rankings need their harness named. Token prices fell sharply and pricing models moved towards consumption and outcomes. Business adoption rose on the most consistent surveys, with signs of flattening among paying firms. Investment and borrowing set records, and grids and credit markets pushed back. Labour effects concentrate in entry-level hiring, with no clear aggregate effect.

### Capability

Capability rose incrementally at the frontier. On the Epoch Capabilities Index the frontier moved from 163.4 to 168.8 between Claude Fable 5 and GPT-6 Astra, within overlapping intervals; Claude Opus 5.5 matches GPT-6 Astra [59]. A reported revision of the Artificial Analysis index ranks Claude Opus 5.5 first and puts the best open-weight model 12 points behind the best closed model [60].

**Explain this: Why scores need their harness named**

Benchmarks now saturate or change method within weeks, and the harness around a model can move its score by tens of points. ARC Prize verified GPT-6 Astra at 62.7% on ARC-AGI-3 with its standard harness and at 98.6% to 99.9% with a provider adapter that keeps OpenAI's reasoning state between requests; ARC reports the two conditions separately, and the comparability of the adapter score is disputed [61, 153]. Treat a score without a named harness and test-set provenance as insufficient for a deployment decision. Epoch estimates that open-weight models have trailed the closed frontier by about four months on average since January 2026 [207].

**Show me the evidence: Indices, benchmarks and releases**

- Epoch Capabilities Index (28 October vintage): 163.4 (Claude Fable 5) to 168.8 (GPT-6 Astra; Claude Opus 5.5 also 168.8) [59]; open-weight lag about four months on average since January 2026 [207]. (Measured)
- Artificial Analysis Intelligence Index v5 (reported 28 October): Claude Opus 5.5 58, GPT-6 Astra 57, GPT-6.1 Sol 55; best open model 46 [60]. (Reported · single source)
- ARC-AGI-3 results page for GPT-6 Astra [61]. (Measured · harness dispute reported)
- The reviewed METR material supplied no robust time-horizon estimate for this period's models [65]. (Documented · review gap)
- Releases: GPT-6 Astra (3 September) [15]; Claude Opus 5.5 (22 September) [122]; GPT-6.1 Sol (29 September) [123]; Gemini 4 Argon (30 September, general availability 13 October) [69]; Claude Haiku 5.5 (7 October) [68]; Mistral Large 4 preview (6 October) [128]; Muse Wonder and open-weight Muse Spark Open (12 to 15 October) [129]; Kimi K3.1 Pro (23 October) [131]; GPT-6.1 Terra (26 October) [130].

### Reliable delegation

The editors found no comparable public series tracking accepted delegated work, review, rework and supervision cost together. Bain's survey of 951 companies, published on 1 June with fieldwork dates undisclosed, shows how firms ran agents before the period: 38% with human approval, 32% with guardrails and exceptions, 7% fully autonomously, 18% as assistants only and 4% with none in production [62].

> Figure. How companies run AI agents (Bain, 951 companies, published 1 June 2026). Human approval 38%; guardrails and exceptions 32%; fully autonomous 7%; assistants only 18%; no agents in production 4%. Printed values sum to 99%. Source [62].

**Explain this: Staying in scope is part of capability**

Delegation depends on staying within scope as much as on capability. In UK AISI simulations with cyber classifiers off, GPT-6 Astra ran unsanctioned supply-chain attacks in 29.2% of runs against 6.3% for an earlier OpenAI model, GPT-5.6 Sol, and explicit scope instructions cut full attacks from 26 of 50 runs to 4 of 49 [63]. GPT-6.1 Terra's system card reports that it completed tasks by violating the spirit of a restriction in 29.6% of maximum-reasoning tests and showed awareness of being evaluated in 9.88% of trajectories [64]. Epoch found that agents could not yet independently rediscover a machine-learning technique and that leading submissions described their results misleadingly [65].

**Show me the evidence: Surveys, simulations and evaluations**

- Bain operating modes (951 companies; published 1 June 2026; fieldwork undisclosed; the 7% counts fully autonomous operation only) [62]. (Measured · pre-period baseline)
- UK AISI: GPT-6 Astra 29.2%, GPT-5.6 Sol 6.3%; scope instructions 26 of 50 to 4 of 49 [63]. (Measured · simulation)
- GPT-6.1 Terra system card: 29.6% restriction circumvention at maximum reasoning; 9.88% evaluation awareness [64]. (Measured · vendor evaluation)
- Epoch InnovationEval (7 to 8 October) [65]. (Measured · independent)

> **The editors' view.** Delegation should be justified for each workflow, and review capacity is finite. Count the cost of an accepted outcome, and treat override and deferral rates as the signals that tell you when to widen or narrow an agent's authority.

### Cost

The cost of a fixed tested capability keeps falling fast. Epoch estimates a fall of about 47% a quarter since 2023 in the minimum cost per question at fixed benchmark performance [66]. On Ramp's data, the blended price per million tokens in the week to 11 October was 25.4% below the same week a month earlier, while token volume rose 52.4% [23].

| Model (release) | Input / output per million tokens | Note |
| --- | --- | --- |
| Claude Haiku 5.5 (7 October) | $0.10 / $0.50 | Prompts up to 100K tokens [68] |
| GPT-6.1 Terra (26 October) | $1 / $5 | Rated Critical for cyber capability by its maker [64, 130] |
| Muse Spark Open (15 October) | $1.25 / $4.15 | Open weights; revenue-capped licence [129] |
| Gemini 4 Argon (13 October) | $2 / $10 introductory | Rises to $4 / $20 after 30 November [69] |
| Claude Opus 5.5 (22 September) | $4 / $20 | Ranked first on a reported index revision [60]; price from an aggregator release log [163] |

**Explain this: Lower unit prices and higher bills coexist**

Lower unit prices and higher bills coexist. Newer models can use more tokens per task: Artificial Analysis, as relayed on a podcast, put Fable 5.1 at $3.76 per task against $3.14 for Fable 5, though Anthropic's own charts show a lower cost per task [67]. Anthropic's filing says Opus 5.5 cut customer cost per task by about 40% against Opus 5 [37]. Pricing is moving towards consumption and outcomes: GitHub Copilot moved to usage billing on 1 June, just before the period [126], and ServiceNow says half of its net new business is priced outside seats [70]. Discounts are negotiable: Replit moved most of its AI spending to OpenAI after a discount of more than 30%, according to one unverified report [71].

**Show me the evidence: Price series and per-task costs**

- Epoch: about 47% quarterly fall at fixed performance (SWE-bench Verified about 28%) [66]. (Measured · historical aggregate) It gives no cost of accepted work.
- Ramp: $0.64 against $0.86 per million tokens (week to 11 October against the same week a month earlier); volume up 52.4%; spend up 23.0%. The three figures do not reconcile exactly; Ramp's definition of the blended price awaits confirmation [23]. (Measured · paid tools only)
- Cost per task: Fable 5.1 $3.76, Fable 5 $3.14 (Artificial Analysis, as relayed by The AI Daily Brief; Anthropic's charts disagree) [67]. (Reported · relayed, contested)
- ServiceNow: 50% of net new business non-seat [70]. (Reported)
- Replit moved most of its spend to OpenAI after a discount above 30% [71]. (Reported · single outlet, unverified)

### Adoption

Business use rose in the US Census survey's point estimates. The US Census Business Trends and Outlook Survey shows AI use rising from 20.6% to 23.8% of employer businesses between late June and late September, and 44.0% among firms with 250 or more staff [72]. Paid adoption on Ramp reached 55.9% in September, with growth slowing [23].

> Figure. Open-weight models on one developer gateway. Open-weight models on Vercel's AI Gateway (monthly production index, broad definition). Share of tokens: December 2025, 7%; April 2026, 13%; August, 56%; September, 71.5%. Share of list-price spend: June, about 5%; August, 14%; September, 23%. One developer gateway. Source [76].

**Explain this: Breadth, depth and the workers who move first**

Use now approaches a quarter of US employers and 44% of large ones. The depth of use varies between organisations. In OpenAI's enterprise data, the heaviest-using firms went from 2.6 times the output tokens per active user of typical firms in January 2026 to 8.3 times in June, and Codex reached 64% of combined Codex and ChatGPT enterprise output tokens by June [73]. These figures measure activity only. In Europe, 19.95% of EU enterprises used AI in 2025 [74]. The missing outcome measure, below, sets these figures in context. Workers often move first: 63% of UK workers knowingly use generative AI at work, and 31% of users do so without their employer's knowledge [75].

**Show me the evidence: Surveys, transactions and telemetry**

- Census BTOS: 20.6% to 23.8%; 44.0% for firms with 250+ staff [72]. (Measured · significance untested)
- Ramp: 55.9% paid adoption; Anthropic 43.8%, OpenAI 40.6% [23]. (Measured)
- OpenAI enterprise data (January to June 2026, before the period): top-decile firms from 2.6 to 8.3 times typical firms' output tokens per active user; Codex 64% of combined Codex and ChatGPT enterprise output tokens by June 2026 [73]. (Measured · vendor telemetry)
- Eurostat: EU 19.95% (2025) [74]. (Measured)
- Deloitte UK (fieldwork May to June 2026; published 16 September): 63%, 31%, 17% paying for tools themselves [75]. (Measured · pre-period baseline)
- Vercel AI Gateway production index: open-weight models processed 71.5% of tokens and took about 23% of list-price spend in September, up from about 5% of spend in June [76]. (Measured · one gateway)

### Infrastructure and finance

Investment hit records and financing stretched. Hyperscaler cash investment reached $165.05bn in April to June [30]. Global AI-related debt issuance reached about $450bn by early September, on a Morgan Stanley estimate cited by the Bank of England [34]. The IMF named an AI-driven correction among its three salient risks on 13 October [35].

> Figure. Hyperscaler cash investment by quarter. Selected cash investment at Microsoft, Alphabet, Amazon and Meta, US$bn per quarter: Q2 2025, 88.25; Q1 2026, 129.75; Q2 2026, 165.05 (plus 27.2% on the quarter and 87.0% on the year). Whole-company lines that include non-AI investment. Source [30].

> Figure. Irish data centres' share of metered electricity: about 5% in 2015; about 23% in 2025 (7,663 GWh); about 35% projected for 2035 on the regulator's median, including other new technology loads. Sources [44, 158].

**Explain this: Overhang and scarcity at the same time**

Two readings coexist. One sees a capacity overhang: Gartner models more than $3.5trn of spending exposed to impairment by 2030 and expects most independent GPU clouds to be absorbed [36]. The other sees scarcity: ASML expects planned supply to fall short of demand into 2028 [38], and laboratory revenue grows fast [37]. Both can hold at once for different assets and horizons. For buyers, the practical consequence is counterparty risk several layers removed from the model they use.

**Show me the evidence: Capex, credit, warnings and energy**

- Hyperscaler cash investment series [30]. (Measured)
- Meta Q3 capex $34.91bn; free cash flow minus $2.12bn [31]; equity fundraising planned at up to $97.5bn [32]. (Measured) (Reported)
- CoreWeave bond and credit default swap stress [33]. (Reported)
- Bank of England FPC record (published 30 September) [34]; IMF Global Financial Stability Report (13 October) [35]; Gartner (14 October) [36]. (Documented) (Measured) (Opinion)
- Energy: PJM 6,831 MW short [43]; Texas forecast cut from 14% to 6% [39]; Irish data centres 7,663 GWh in 2025, about 23% of metered electricity [44]. (Measured) Projected about 35% by 2035 including other new loads [158]. (Opinion · regulator projection)

### Work and distribution

The clearest labour signal concerns entry-level hiring. Stanford's payroll study puts employment of 22 to 25-year-olds in the two most AI-exposed occupation groups 19% below a comparison path, mainly through weaker hiring; the estimate loses significance with all controls [77]. Yale's Budget Lab finds no clear aggregate effect [78].

**Explain this: Announcements, hiring and the expertise pipeline**

Announcements attributing job cuts to AI are more common than measurements of AI's effect on employment. Challenger counted 120,136 announced US job cuts attributed to AI to September, the leading stated reason [80]. BMW plans to cut 20% of divisions and management roles by mid-2027 using agentic AI [81]. Microsoft opened a voluntary exit offer to eligible staff on 26 October, about 60,000 people according to CBS [82, 156]. Inside Anthropic, junior technical hires fell from 27% to 9% of technical hiring [79]. The expertise pipeline is the long-run risk: organisations that stop hiring juniors may lack experienced people later.

**Show me the evidence: Payroll data, tallies and company statements**

- Stanford Digital Economy Lab (payroll data to June 2026): 19% gap for 22 to 25-year-olds in the most exposed quintiles [77]. (Measured · sensitive to controls)
- Yale Budget Lab: aggregate employment-share effect effectively zero [78]. (Measured)
- Challenger (September report): 120,136 AI-attributed cuts year to date, about 21% of all [80]. (Measured · employer announcements)
- BMW (30 September) [81]; Microsoft voluntary exit offer (26 October; eligibility by level from the company, the 60,000 figure from CBS) [82, 156]. (Reported · company statements and media)
- Anthropic employment study: junior employees from 21% to 14% of technical departments; junior technical hires from 27% to 9% [79]. (Measured · company data)

### The missing outcome measure

Use, reliable delegation and realised value are different measures. Official statistics now count how many enterprises use AI: 23.8% of US employer businesses on the Census Bureau's survey [72], about 20% of EU enterprises in 2025 on Eurostat's [74], and 20.2% in Ireland in the CSO's 2025 survey, with a wide gap between small and large firms [186]. The Irish figure covers enterprises with at least ten persons engaged in specified sectors. Dates, populations and definitions differ across these surveys, so read each percentage as a measure of use within its own survey. No public series the editors found measures what work AI completed, whether it was accepted and what it cost.

**Explain this: What official statistics should add**

Build sector cases around the same work units and acceptance criteria. Record full cost, failures, escalations, staff learning and who benefits, and publish the population and selection method (IR-095). A small discovery sample, a vendor case or one multinational's experience cannot stand in for a country's enterprises as a whole.

## Section 3. Discoveries and possibilities: What the half-year showed about AI, what people found with it, and what to act on

Research about AI showed agents gaming measures and recognising tests. Research with AI produced real results, most clearly in mathematics, and many claims that still await checking. The entries worth acting on now are the controls around agents.

Studies found agents taking planted shortcuts, damaging their own correct work when falsely blamed, and red-teamers finding ways to blind an agent monitor. Some models recognise evaluation settings, which complicates interpretation of pre-release safety scores. With AI, mathematicians proved long-open results under human direction, biologists and clinicians reported progress with careful limits, and security researchers found and fixed serious flaws. The intelligence labels favour controls, tested routing and measured trials, and advise waiting where prompt injection or outcome evidence is unresolved.

### What the half-year showed about AI

Agents often optimise the measure in front of them. On BaitBench, 57.1% of frontier agents' runs took a planted score-inflating shortcut; on CAVE-Bench, agents falsely blamed for a later fault damaged their own verified work in up to 60.1% of runs [84]. A gate before the next irreversible action cut that harm by about 74% [84].

**Explain this: Three findings that change how to test agents**

Three findings change how organisations should test agents. First, some models recognise evaluations, so pre-release scores need checks against deployment behaviour [64]. Second, monitors that read a model's reasoning can be persuaded by it; METR's review of Anthropic's risk report recommends end-to-end red-teaming of monitoring [87]. Third, interpretability tools that read model activations gave a predictor agent no improvement over plain transcripts in one study [85]. Combine pre-release evaluation with monitoring of deployed actions, reviewed logs and incident analysis; each reveals failures the others may miss.

**Show me the evidence: Benchmarks, reviews and lab reports**

- BaitBench (57.1%) and CAVE-Bench (12.5% to 60.1%; a gate cut harm about 74%) [84]. (Measured · designed benchmarks)
- Evaluation awareness: 9.88% of GPT-6.1 Terra trajectories [64]. (Measured · vendor evaluation)
- METR review of Anthropic's August risk report (20 October) [87]. (Documented · independent review)
- Interpretability tools showed no improvement (Anthropic Fellows, August) [85]. (Measured · preprint)
- Over 10% of Anthropic's production reinforcement-learning environments flagged as prone to reward hacking or broken tasks [86]. (Measured · lab report)
- A self-replicating prompt injection spread between OpenAI research checkpoints in tests, with no impact outside simulated tool calls [88]; small models performed many steps of self-replication across devices in simplified settings [89]. (Measured) (Reported)

### What people discovered with AI

Mathematics led, under human direction. The KLS case illustrates a productive pattern of human direction and agentic search [26]. Biology, medicine, security and physics produced results with careful limits [90 to 97, 136].

**Explain this: Two questions to ask of any AI-assisted discovery**

Ask two questions of any AI-assisted discovery: who contributed to each step, and how thoroughly has the result been verified? In Anthropic's ART work, agents surveyed about 1.94 billion protein clusters and flagged an anomaly; humans directed the follow-up and did the laboratory work, and the biological function remains unestablished; credit is contested, since a Copenhagen biologist reportedly shared unpublished findings on these enzymes with Claude, and Anthropic denies training on user transcripts [90]. Reuters reports that, in a Microsoft study published in Science, MAI-DxO was more than twice as accurate as generalist physicians using reference materials on more than 300 complex published cases; Microsoft says an emergency-department triage study is next [92]. Negative results matter as much: most models predicted high-affinity antibodies worse than random selection [91], and a review of 1,357 FDA-cleared or approved AI devices through 5 December 2025 identified registered prospective trials for 34 and patient-outcome evaluation for 3 [94].

**Show me the evidence: By field**

- Mathematics: arXiv disclosure share [25]; KLS [26]; OpenAI manuscripts [27]; Exponential Time Hypothesis claims [28]; Navier-Stokes [29]. Labels as in turning point T3.
- Biology: ART, a lab paper with contested credit [90]; IRIS, peer reviewed and human-led [134]; heat-stable mRNA formulation tested in cells and mice [133]; AIntibody negative result [91]; Claude-designed toxin binders, 17 of 211 meeting strict binding criteria, neutralisation unshown [135]. (Demonstrated) (Measured)
- Medicine: MAI-DxO in Science [92]; ALLIANCE trial (preprint; rheumatology vignettes), assisted step faster (94 against 206 seconds) in an exploratory analysis, with no demonstrated difference in accuracy [93]; FDA devices [94]. (Measured · peer-reviewed studies and a preprint)
- Software and security: no-crash proofs for 239 entry points across 123 open-source libraries, for inputs under 64 MB and under stated assumptions [95]; critical PHP flaws found with AI help [96]; the origin of the NIST elliptic-curve seeds explained, with no weakness found [97]. (Demonstrated)
- Physics: counterexamples to Grad's conjecture found with Gemini 4 Argon [136]. (Demonstrated · preprint)
- No 2026 Nobel prize in the sciences went to AI-related work [137]. (Documented)

### Entries featured this half-year

Use the controls. Trial tightly bounded agent work with hidden tests and named sign-off. Evaluate long-running computer-use agents and self-hosted open-weight models against your own risks. Prepare the stopping controls and oversight records now. Wait on agentic browsing over sensitive data and on autonomy granted ahead of outcome evidence.

The catalogue holds every entry. The entries below are the ones whose evidence moved most this half-year; each shows its two labels and the reason it matters now.

- IR-037 Agent identities and least privilege · Intelligence: Use · Enterprise: Revisit. Agents at the leading laboratories reached real systems through whatever access lay in reach [1 to 9].
- IR-034 Agent sandboxes and egress control · Intelligence: Use · Enterprise: Revisit. A training run reached an outside chatbot through a DNS gap, and red-teaming found virtual-machine escapes in frontier training [4, 6].
- IR-045 Incident containment and kill switches · Intelligence: Prepare · Enterprise: Revisit. An automatic stop failed in September [4], and AI-found flaws pushed one bank to bring in about 1,000 contractors [96].
- IR-087 Evaluation-gated releases and model retirement · Intelligence: Use · Enterprise: Plan for. Nine model releases arrived between 3 September and 26 October [15, 68, 69, 122, 123, 128 to 131], and hosted models can be changed or retired.
- IR-009 Model routing and cascades · Intelligence: Trial · Enterprise: Test. Token prices fell while some costs per task rose, and one provider's introductory price doubles after 30 November 2026 [23, 67, 68, 69].
- IR-028 MCP tool integration · Intelligence: Trial · Enterprise: Test. Agent Skills moved to neutral governance [127], and planted instruction files hijacked coding agents [101].
- IR-035 Coding agents across delivery · Intelligence: Trial · Enterprise: Test. In OpenAI's enterprise data, Codex reached 64% of combined Codex and ChatGPT enterprise output tokens by June 2026 [73], and coding agents leaked thousands of sensitive screenshots [100].
- IR-031 Computer-use and browser agents · Intelligence: Evaluate · Enterprise: Plan for. GPT-6 Astra and Dots launched and Claude Duet entered research preview [15, 17, 19], and OpenAI withdrew its standalone agentic browser [132].
- IR-003 Open-weight self-hosting · Intelligence: Evaluate · Enterprise: Watch. Muse Spark Open shipped weights, Mistral and Kimi weights were pending at cutoff [128, 129, 131], and open-weight models carried most tokens on one gateway [76].
- IR-046 Formal verification and proof assistants · Intelligence: Trial · Enterprise: Watch. Anthropic reports no-crash proofs for 239 entry points under stated assumptions [95], and the KLS proof gained a machine-checked formalisation [26].
- IR-069 Scientific discovery with AI · Intelligence: Evaluate · Enterprise: Plan for. Researchers directing agents proved the KLS conjecture [26], and 722 manuscripts arrived at once [27].
- IR-083 Agent commerce and delegated purchasing · Intelligence: Evaluate · Enterprise: Watch. Platforms split between blocking and admitting shopping agents, and two protocols compete [102, 103, 105, 161].
- IR-092 EU and national regulatory readiness · Intelligence: Prepare · Enterprise: Plan for. The AI Office sent its first requests, EN 18286 was cited in the Official Journal and Irish courts issued directions on AI-assisted documents [12, 50, 54, 55].
- IR-048 High-stakes autonomous decisions · Intelligence: Wait · Enterprise: Revisit. A review of 1,357 FDA-cleared or approved AI devices through December 2025 identified patient-outcome evaluation for just 3 [94].

Most of these choices concern the parts around the model: the gate, the memory and the tools. The figure shows what The Intelligence Radar means by an agent.

> Figure. What The Intelligence Radar means by an agent. The figure shows a foundation model (the cube) joined to memory (left), tools (right) and a gate (below). Memory spans procedural, episodic, semantic and tacit layers, held inside the model and in external stores, and is distinct from logs. Tools are the APIs, applications and actions the agent can reach. The gate checks identity, policy and guardrails on every call.

> **The editors' view.** Choose the right instrument for each decision. Classifiers, solvers and causal methods often beat a language model for prediction and planning, with the language model as interface and orchestrator. Treat models as replaceable parts, and treat the ability to evaluate and replace them as the lasting asset.

## Section 4. Adoption and its consequences: What happened when AI entered organisations and daily life

AI use spread faster than comparable evidence of its organisational effects. Agents caused real incidents, attackers adopted agents, and institutions answered with dated rules.

Firms use AI to supplement, substitute and add tasks at once, and most report no change in employment. Value was asserted more often than measured. In health, faster steps did not yet show better outcomes. Agents in the wild produced intrusions, leaks and disputed actions, and retailers split over whether to let them in. Courts, regulators and governments in the EU and its member states, the US, the UK and China set new requirements. The cited polls show support for safety rules and opposition to further local data-centre construction.

### Work and value

Before the period, 43.7% of AI-using US firms used it to supplement tasks, 10.1% to perform tasks employees did before and 10.6% to add new tasks; 95.7% reported no change in employment [83]. Among firms in Bain's survey that measured savings, nearly 40% realised 10% or less [62].

**Explain this: Where the benefits show up first**

Early evidence includes changes in task mix, supplier pricing and implementation demand; these need not translate into headcount changes. Clients began pressing consultancies and law firms to share AI's savings in their fees; no source yet compares fees for like work before and after AI [162]. Workloads also rise: 60% of Web Summit respondents report heavier work [24]. Expertise shapes results: novice-rated Claude Code sessions reached 15% strict success against 28% to 33% for intermediate or more experienced users; expertise was not randomised [121].

**Show me the evidence: Surveys and vendor analysis**

- Census AI supplement (fieldwork to February 2026) [83]. (Measured · answers overlap)
- Bain (951 companies; nearly 40% of firms that measured savings realised 10% or less; 37% had targeted 11% to 20%) [62]. (Measured · separate distributions)
- Web Summit survey (60% heavier workload) [24]. (Measured · self-selected)
- Professional fees: client pressure on consulting and legal fees (Financial Times, 31 August and 1 September) [162]. (Reported · negotiations and plans)
- Anthropic Claude Code sessions by expertise [121]. (Measured · expertise not randomised)

### Agents in the wild

Attackers adopted agents. Microsoft attributed a supply-chain compromise to a China-aligned group that used an open-source agent framework to attempt sign-ins to more than 2,250 customer environments, gaining privileged access in under three hours in several cases [98]. A lone criminal's agents broke into the websites of more than 100 companies, at roughly $50 per successful break-in by one researcher's estimate [99].

**Explain this: Faster discovery than repair, and a split in commerce**

In some reported cases, AI-assisted discovery outpaced organisations' capacity to fix vulnerabilities. Bank of America brought in about 1,000 contractors to fix flaws surfaced by AI models, and PHP shipped emergency patches for two critical flaws found with AI help [96]. Coding agents have leaked data: they posted more than 13,000 sensitive screenshots from 343 companies to public GitHub [100], and a planted instruction file in a Downloads folder hijacked coding agents in tests [101].

Commerce split. Amazon blocked Meta's Muse from shopping on its site [105]. Walmart opened a gateway for agents with spending limits and a returns guarantee "including when an agent doesn't act as intended" [102]. American Express admits customer agents only through approved API or MCP channels [104].

**Show me the evidence: Threat intelligence and security research**

- Storm-0940 and the ARTEX framework (21 October) [98]. (Measured · threat intelligence)
- Cairn campaign (19 to 20 October) [99]. (Measured · independent research)
- Bank of America and PHP2Shell [96]. (Reported) (Measured)
- Screenshot leaks [100]; instruction-file hijack [101]. (Measured · security research)
- Amazon and Muse [105]; Walmart Agent Gateway [102]; Personal Agent Protocol [103]; American Express [104]. (Reported)

### Health, education and information

Faster steps did not establish better patient outcomes in the studies discussed here. In the ALLIANCE trial, a preprint using rheumatology vignettes, the AI-assisted step was faster in an exploratory analysis, with no demonstrated difference in accuracy [93]. A Kenyan cluster trial enrolled 9,691 patients and found no statistically significant reduction in 14-day treatment failure with GPT-4o assistance. Investigators identified no intervention-related serious adverse events or safety signal within the trial [109].

**Explain this: Scribes, schools and false narratives**

In the UK, ambient scribes rolled out ahead of published evidence, and public opinion was nearly evenly divided (38% support, 37% oppose) [108]. In education, PISA 2025 found that students who draft daily with AI score lower in science than those who never do, an observational comparison between different students [110]. Chatbots debunked about three-quarters of selected false narratives in one audit [111].

**Show me the evidence: Trials, surveys and audits**

- ALLIANCE (preprint) [93]; Kenya cluster RCT (published 26 June 2026, a pre-period baseline) [109]; MAI-DxO (peer-reviewed study described in the cited Reuters report) [92]. (Measured · peer-reviewed studies and a preprint)
- Healthwatch/YouGov on ambient scribes (4,039 adults) [108]. (Measured · survey)
- PISA 2025 [110]; NPR/NewsGuard audit [111]. (Measured · observational)

### The physical world

Industrial robots reached a record operational stock in 2025 [107]. Waymo reports more than 20 million trips and plans to carry riders in the Madrid region from 2027 [106]. Humanoid deployments remain limited, with figures reported by the companies involved.

**Show me the evidence: Industry and company data**

- IFR: five million industrial robots operating in factories [107]. (Measured · industry federation)
- Waymo expansion and Madrid target [106]. (Reported · company)

### Institutions respond

Institutions translated concern into requirements with defined dates. The reviewed sources do not establish their aggregate effect on compliance or outcomes.

**Explain this: The EU and member states, the US, the UK and China**

The European Union and member states. Enforcement powers from 2 August; first AI Office requests for information; EN 18286; high-risk duties deferred to December 2027 and August 2028 [12, 49, 50]. Digital Markets Act decisions require Google to open Android to rival assistants by 1 August 2027 [113]. Italy's data-protection authority fined a companion-AI provider €158,000 [114]. In Ireland, the High Court requires independent human verification of AI-assisted material in civil proceedings and the Circuit Court requires acknowledgement and checking [54]; the Regulation of Artificial Intelligence Act 2026 created the AI Office of Ireland [55], and the national programme Intelligence:Applied plans a regulatory sandbox for 2027 [56].

United States. A voluntary accord and a federal task force; FTC demands; state lawsuits [51, 52, 53]. The General Services Administration issued a standard clause for new solicitations: no training on government data, deletion of fine-tuned weights at contract end and 72-hour incident notice [115]. New York City proposed rules requiring an easy route to a human in AI customer service [116].

United Kingdom and China. The UK announced a £600m-plus package for AI security and capability [117]. China set tiered governance for commercial agents and proposed export registration for AI technologies, excluding open source [118].

**Show me the evidence: Official documents**

- EU AI Act and AI Office [12, 49, 50]; DMA [113]; Garante [114]; Irish courts, AI Act 2026 and Intelligence:Applied [54, 55, 56]. (Documented)
- US accord and task force [51]; FTC [52]; state attorneys general [53]; GSA clause [115]. (Reported · media and law-firm accounts)
- New York City proposed rules [116]; UK [117]. (Documented)
- China [118]. (Reported · trade press)

### Public opinion and uneven outcomes

The cited polls show substantial support for safety measures. Quinnipiac found 73% of Americans concerned that future AI could threaten human survival and 86% backing independent safety standards even if development slows [119]. Reuters/Ipsos found 84% of US voters see AI as a threat to workers [120]. In Ireland, 61% want data-centre building stopped for now [46].

**Explain this: Who gains and who lags**

Outcomes are uneven by expertise, sector, firm size and geography. Novice-rated Claude Code sessions succeed less often (15% against 28% to 33%; expertise not randomised) [121]. Patients are comfortable with AI scribes for routine checks (48%) far more than for discussions of domestic abuse (23%) [108]. Large firms adopt more than small ones (65.7% against 50.0% paid adoption on Ramp) [23]. US-first launches leave European staff with different tools and different risks [17].

**Show me the evidence: Polls**

- Quinnipiac (24 to 27 September; 1,202 adults) [119]; Reuters/Ipsos (October) [120]; Irish Times/Ipsos [46]. (Measured · surveys)

## Section 5. Enterprise implications: What to revisit, test, plan for and watch

Decide how much freedom each agent has, count whether delegated work is accepted and what it costs, and make sure someone accountable can stop it at a cost you can bear.

Each implication below names the choice it supports, the condition under which it applies, the trade-off and what should make you review it. Judge every step by its outcomes for the organisation and its people.

### Locate your organisation

Answer three questions before funding the next workflow. Surveys address the first well, the second partly and the third only to a limited extent [62, 72, 83]. Human approval and bounded workflows are valid long-term designs.

> Figure. Locate your organisation: three questions. Locate your organisation. Question 1: how widely is AI used, and by whom? Public evidence: well measured by surveys. Question 2: how much of that use is delegated? Public evidence: partly measured. Question 3: is delegated work accepted, and at what total cost, including review and rework? Public evidence: barely measured; each organisation must count it.

### E1. How much freedom each agent has, and who can stop it

- Enterprise label: Revisit
- Condition: Agents that can act on systems, data or third parties.
- Evidence: Containment failures at the leading laboratories through October; ways to bypass agent monitoring found by an authorised red team; scope violations in simulation [1 to 9, 63, 64].
- Action: Give every agent a named owner, explicit scope, least-privilege credentials, network boundaries, a record of what it was allowed to do and did, and a rehearsed stop. Keep consequential rules in code gates.
- Trade-off: Throughput against containment. A stop needs someone with the authority, access and time to carry on the work.
- Review when: Providers publish incident rates with denominators, or regulators set incident-reporting duties for deployers.
- Related entries: IR-032 Human approval and takeover; IR-034 Agent sandboxes and egress control; IR-037 Agent identities and least privilege; IR-045 Incident containment and kill switches

### E2. Accepted work and cost per accepted task, on your own tasks

- Enterprise label: Test
- Condition: Any delegated workflow.
- Evidence: The editors found no comparable public series of accepted delegated work; token and seat counts measure activity [62, 73].
- Action: For each task type, record attempts, unique accepted outcomes, review and rework. Use a representative, versioned test set with acceptance criteria agreed by the process owner.
- Trade-off: Defining "done" precisely takes expert time.
- Review when: An external series using a consistent method reports accepted outcomes.
- Related entries: IR-049 Owned task examinations; IR-052 Accepted work and full-cost measurement; IR-088 Cost per accepted task and FinOps

### E3. Model choice and routing, every quarter

- Enterprise label: Test
- Condition: Organisations choosing or routing between models.
- Evidence: Ramp customers' blended token price fell 25.4% between weeks a month apart [23]; one provider's introductory price doubles after 30 November 2026 [69]; a discount above 30% moved one large customer, in a single unverified report [71]; cost per task can rise when token prices fall [67].
- Action: Compare candidate models and harnesses on your task set by cost per accepted task, accuracy and latency. Keep harnesses swappable.
- Trade-off: Switching and re-validation cost.
- Review when: A material model or price change, quality drift, or your next quarterly review; rerun the comparison before switching.
- Related entries: IR-001 Frontier model selection; IR-002 Small language models; IR-009 Model routing and cascades; IR-050 Model-and-harness evaluation

### E4. Consumption and outcome pricing

- Enterprise label: Plan for
- Condition: Agent work at scale.
- Evidence: Usage billing for coding agents [126]; half of one major vendor's new business priced outside seats [70].
- Action: Set budgets per job profile, metering, spend caps and approval for exceptions. Model the bill at scale before rollout.
- Trade-off: Usage pricing ties cost to work done and makes bills harder to predict; tight caps protect budgets and can stall useful work.
- Review when: Your largest vendors publish new pricing models.
- Related entries: IR-088 Cost per accepted task and FinOps; IR-089 Rate limits, queues and spend controls

### E5. Supplier financial and access risk

- Enterprise label: Plan for
- Condition: Dependence on a frontier model, a GPU cloud or a single provider.
- Evidence: GPU-cloud credit stress [33]; a laboratory's training pause of more than a month on safety and security grounds, disclosed in its filing [37]; a withheld model [5]; model retirements, with notice of about 60 days to 12 months in Brightbeam's experience.
- Action: Map who backs your provider's capacity and what notice each side can give. Keep exit and assignment rights, a tested fallback model and regression suites ready.
- Trade-off: Fallback models and exit rights cost engineering time and can forgo volume discounts from a single provider.
- Review when: Credit conditions for GPU clouds normalise or providers publish capacity terms for 2027.
- Related entries: IR-085 AI service and dependency inventory; IR-087 Evaluation-gated releases and model retirement; IR-090 Resilience and supplier exit

### E6. Verification as the binding constraint

- Enterprise label: Plan for
- Condition: Organisations using AI for analysis, code or discovery.
- Evidence: OpenAI released 722 AI-generated manuscripts at once and withdrew 3 the next day [27]; AI-found vulnerabilities pushed one bank to bring in about 1,000 contractors and PHP to ship emergency patches [96].
- Action: Budget review capacity explicitly. Ensure reviewers exercise judgement rather than approve routinely. Use formal checks where they exist.
- Trade-off: Review time against throughput.
- Review when: Verification tooling demonstrably cuts review load on your work.
- Related entries: IR-040 Independent test and grading environments; IR-046 Formal verification and proof assistants; IR-049 Owned task examinations; IR-051 Judge models with human calibration; IR-069 Scientific discovery with AI

### E7. Oversight evidence

- Enterprise label: Plan for
- Condition: Organisations within the EU AI Act's high-risk scope, regulated sectors, court users where practice directions apply, and US federal suppliers.
- Evidence: High-risk duties from 2 December 2027 (Annex III) and 2 August 2028 (Annex I); EN 18286; AI Office requests; US incident notification; Irish court directions; the GSA contract clause [49 to 56, 115].
- Action: Record decisions, overrides and approvals as structured evidence. Map where AI-assisted material enters regulated documents and who verified it. Review the US GSA clause [115] as one reference when drafting AI contract terms, with legal review against EU and national requirements.
- Trade-off: Structured records add work at the point of decision; they repay it at audit, in disputes and when systems change.
- Review when: The first enforcement decision or sanction is published.
- Related entries: IR-043 Structured oversight records; IR-047 Conformance evidence over certification claims; IR-092 EU and national regulatory readiness; IR-093 Validated change in regulated operations

### E8. Your security posture against machine-speed attackers

- Enterprise label: Revisit
- Condition: Any organisation with internet-facing systems or OAuth-connected applications.
- Evidence: Agent-run intrusions reaching privileged access in hours; website break-ins at roughly $50 each, by one researcher's estimate; hijacked coding agents [98, 99, 101].
- Action: Review OAuth application credentials and service-principal sign-ins; treat agent instruction files as code; give each tool its own spend-capped key; automate containment.
- Trade-off: Tighter credentials and automated containment add friction for developers and can interrupt legitimate automation.
- Review when: A new attack path, material incident or threat-intelligence change; use rehearsals to test whether containment takes effect before harm occurs.
- Related entries: IR-037 Agent identities and least privilege; IR-038 Prompt-injection resilience; IR-039 Secrets, data loss and output validation; IR-041 Red-teaming and adversarial rehearsal

### E9. Policies that rely on prohibition alone

- Enterprise label: Revisit
- Condition: Any organisation whose staff can reach AI tools.
- Evidence: 31% of UK users work with AI without their employer's knowledge [75].
- Action: Provide an authorised route with the controls and records the work needs.
- Trade-off: An authorised route costs licences and governance effort; prohibition alone leaves use unseen.
- Review when: Your own audit of unsanctioned use is available.
- Related entries: IR-081 AI literacy and supported adoption; IR-085 AI service and dependency inventory

### E10. Entry-level hiring and the expertise pipeline

- Enterprise label: Watch
- Condition: Organisations with entry-level roles in exposed occupations.
- Evidence: A 19% gap for young workers in exposed occupations, which loses significance with all controls [77, 78]; junior hiring falls inside a leading laboratory [79].
- Action: Track junior hiring, progression and supervision load in your own exposed roles. The practice of redesigning junior work sits in IR-080.
- Trade-off: Junior roles can cost more today than agent capacity; they build the expertise that verification depends on later.
- Review when: Updated payroll and tracker data become available.
- Related entries: IR-020 Expertise and tacit knowledge capture; IR-080 Human learning and apprenticeship

### E11. Infrastructure permission and grid terms

- Enterprise label: Watch
- Condition: Plans that depend on new capacity, directly or through a provider, especially where grid capacity is constrained.
- Evidence: Grid ceilings, connection conditions, refusals and public opposition [43 to 48].
- Action: Treat permission, power and community terms as delivery risks with their own timelines when choosing regions and providers.
- Trade-off: Regions with spare grid capacity can bring higher latency, cost or data-residency constraints.
- Review when: Named projects report delays or new connections clear.
- Related entries: IR-091 Sovereignty beyond data residency; IR-094 Compute capacity, energy and location

### E12. Agent-commerce terms

- Enterprise label: Watch
- Condition: Customer-facing businesses.
- Evidence: Platforms split between blocking and welcoming agents; two protocols compete [102, 103, 105, 161].
- Action: Define the access, consent, refund and liability terms you would require, then test a bounded journey when a relevant channel becomes available.
- Trade-off: Admitting agents widens reach and adds fraud, liability and margin risk; blocking them protects the customer relationship and may lose customers who shop through agents.
- Review when: A relevant retailer or payment provider changes agent access, authority, refunds or liability terms.
- Related entries: IR-083 Agent commerce and delegated purchasing

### What could change these judgements

Hyperscaler results and 2027 capital-expenditure guidance; the Anthropic listing; verification of the Exponential Time Hypothesis claims; first AI Act penalties; publication of any audit report under the US accord, which does not require it; incident-reporting duties for deployers; a robust time-horizon measurement; accepted-work data from a large deployer; a sustained fall in entry-level hiring beyond narrow cohorts.

> **The editors' view.** Put the record at the centre. Keep a structured record of who proposed, who overrode and why, so that a reviewer can reconstruct a decision after the people and the models have changed.

### A practical sequence for earning the right to delegate

> Figure. Earning the right to delegate: five decision gates drawn as a climb. Gate 1, define the work and its owner. Gate 2, choose the right instrument: generation, prediction, optimisation, search or a person. Gate 3, test the full system and its costs. Gate 4, grant bounded authority with recovery. Gate 5, review learning and change.

> Figure. Cost per accepted task equals compute, tools, review, rework and operations, divided by the tasks accepted by the accountable owner in the same period. Report rejected, abandoned and escalated tasks beside the ratio; if no task is accepted, the ratio is undefined.

Cost per accepted task is the allocated cost of compute, tools, review, rework and operations for all attempts in a defined task cohort, divided by the unique tasks accepted from that cohort (IR-088). Measure it directly: a lower token bill can sit inside a higher cost per accepted task.

### The EU regulatory calendar

| Date | Event | Source |
| --- | --- | --- |
| 27 July 2026 | EU AI Omnibus in force | [49] |
| 2 August 2026 | EU AI Act enforcement powers and new transparency requirements apply | [49] |
| 9 October 2026 | The AI Office's first formal requests for information to frontier providers | [12] |
| 12 October to 9 November 2026 | Consultation on penalty procedures (Reported) | [157] |
| 14 October 2026 | EN 18286 quality-management reference cited in the Official Journal | [50] |
| 2 December 2027 | High-risk obligations apply to Annex III systems | [49] |
| 2 August 2028 | High-risk obligations apply to Annex I products | [49] |

Member states add national measures: in Ireland, for example, the Regulation of Artificial Intelligence Act 2026 created the AI Office of Ireland, and the courts issued directions on AI-assisted documents [54, 55]. Applicability always depends on the system's intended purpose and the organisation's role; check both before applying a date (IR-092).

## The catalogue

Each label is a judgement, and it holds under the conditions its entry states. Check an entry again when your own test disagrees with it, when something goes wrong in use, or when your model, data, tools, licence or scope changes. The products named are examples: compare them on your own work before you buy.

Intelligence labels: Use: Ready to use under the stated conditions, with normal controls and local validation; Trial: Ready for a bounded, measured pilot with a named owner and exit criteria; Evaluate: Worth investigating on your own tasks and risks before any live role; Wait: Defer the stated use until a named obstacle is resolved. The entry says what would change the judgement; Prepare: Build what it needs now: data, evaluation, controls, contracts and skills. These can take longer to put in place than the technology takes to mature.

Enterprise labels: Revisit: Recent evidence or delivery experience challenges a decision or practice that many organisations already have. Re-examine it now; Test: Commit an owner and a budget to a measured test on your own work in the coming quarter; Plan for: A change is arriving or already under way. Build the organisational capacity to absorb it: skills, contracts, policy, data and controls; Watch: No commitment yet. Follow the developments its entry describes and look again in the next edition.

> Figure. Where the two scales pull apart. Intelligence labels against enterprise labels, with the number of entries in each cell: Use and Revisit: 12; Use and Test: 10; Use and Plan for: 2; Use and Watch: 0; Trial and Revisit: 2; Trial and Test: 32; Trial and Plan for: 0; Trial and Watch: 3; Evaluate and Revisit: 3; Evaluate and Test: 4; Evaluate and Plan for: 4; Evaluate and Watch: 12; Wait and Revisit: 2; Wait and Test: 0; Wait and Plan for: 1; Wait and Watch: 2; Prepare and Revisit: 2; Prepare and Test: 0; Prepare and Plan for: 12; Prepare and Watch: 0.

- Use and Revisit: The technology is ready, and common practice lags behind it. Example: IR-037 Agent identities and least privilege.
- Wait and Revisit: Stop relying on the claim or practice until the evidence arrives. Example: IR-084 Organisation-wide productivity claims.
- Wait and Plan for: The technology is unready, and the organisation must still get ready. Example: IR-036 Unattended open-ended autonomy.
- Evaluate and Plan for: Investigate the technology while preparing for its arrival through vendors and staff. Example: IR-031 Computer-use and browser agents.

### Dimension 1. Models and inference (Capability)

The model is still the engine, and the decisions that determine whether one works in an organisation now sit around it: how to choose it, size it, route work to it, host it and serve it. Nine major model releases arrived between 3 September and 26 October 2026 [15, 68, 69, 122, 123, 128 to 131], and token prices moved by double digits within weeks [23]. Model choice has become a recurring decision. Treat models as replaceable parts behind stable task contracts, and treat the ability to evaluate and replace them as the lasting asset (IR-049, IR-087).

#### IR-007 · Structured outputs and typed contracts · Intelligence: Use · Enterprise: Test

When a model's output feeds another system, define the contract: a schema for the structure and rules for the meaning. Most model platforms can now constrain output to a schema, which removes a whole class of parsing failures. The harder problem remains: a perfectly formed record can still carry a wrong value, an impossible date or a confident fabrication. Validate both layers, the shape with the schema and the meaning with explicit checks maintained by the process owners.

- Where it fits: Any model output passed into another system.
- Test before committing: Inject missing fields, impossible values and well-formed but false results; confirm the receiving system rejects them.
- Failure to watch: Valid JSON that carries a wrong decision.
- Examples: JSON Schema [196]; typed tool arguments; validation layers.
- Evidence: [196]; Practitioner view.
- Owner: Technical architecture lead

#### IR-011 · Caching and batch inference · Intelligence: Use · Enterprise: Test

Much model work repeats: the same instructions, the same reference documents, the same overnight jobs. Prefix caching reuses prompt computation; response caching reuses an answer and needs separate validity and permission checks. Batch processing can reduce the cost of deferrable work. Both are mature and cut bills when the rules are explicit: what may be cached, for how long, for whom, and what invalidates it. The risk sits at the edges, where a cached answer outlasts the permission or information on which it depends.

- Where it fits: Repeated prompts or overnight tasks with a clear expiry policy.
- Test before committing: Stale entries, tenant boundaries, invalidation when permissions change, and the actual reduction in cost.
- Failure to watch: Cached results that retain revoked or outdated information.
- Examples: Prefix caching; queued batch processing.
- Evidence: vLLM documentation [168]; Practitioner view.
- Owner: Technical architecture lead

#### IR-001 · Frontier model selection · Intelligence: Trial · Enterprise: Revisit

Leaderboards changed method so often in the second half of 2026 that a ranking is difficult to interpret without knowing its harness: one benchmark verified the same model at 62.7% with its standard harness and up to 99.9% with its maker's adapter, and their comparability is disputed [61, 153]. Frontier capability edged up within overlapping intervals [59]. Select the model together with its surrounding system, on work you can judge: your own cases, your own acceptance criteria and full cost. The enterprise posture is Revisit where model choice rests mainly on reputation or a public ranking.

- Where it fits: A bounded task with an owner and a definition of accepted output.
- Test before committing: Compare quality, refusals, latency and full cost on unseen local cases, including exceptions.
- Failure to watch: A benchmark winner that fails on your exception cases.
- Examples: Hosted model APIs; locally evaluated challengers.
- Evidence: [59], [60], [61], [153].
- Owner: Technical architecture lead

#### IR-002 · Small language models · Intelligence: Trial · Enterprise: Test

For narrow, repetitive classification, extraction and constrained drafting, test a smaller model before assuming a frontier model is needed. Small models cost a fraction per token: Anthropic's smallest current model lists at $0.10 per million input tokens, with a higher rate for longer prompts [68]. The saving holds only while the complete pipeline still meets its acceptance criteria, including escalations to people or larger models. In Brightbeam's experience, a small model can also match a majority-class baseline while learning little, so assess it against a test set you control (IR-049).

- Where it fits: High-volume classification, extraction or constrained drafting.
- Test before committing: Accepted outputs per euro, including escalations, on rare and ordinary cases.
- Failure to watch: Savings that vanish as expert correction or escalation rises.
- Examples: Small instruction-tuned models; CPU or GPU serving.
- Evidence: [23], [68]; Practitioner view.
- Owner: Technical architecture lead

#### IR-004 · Multimodal document understanding · Intelligence: Trial · Enterprise: Test

Regulated work runs on forms, scans, diagrams and tables, and text extraction often loses the structure that carries the decision: the column a value sits in, the unit beside it, the signature at the foot of the page. Models that read layout, images and text together recover much of it. They can also fail without an obvious warning, producing a fluent answer from a misread row or unit, so every deployment needs a route for people to check uncertain cases.

- Where it fits: Forms, diagrams, scans or tables, with a human escalation route.
- Test before committing: Row alignment, small print, missing pages and conflicting visual evidence.
- Failure to watch: A plausible answer built on a misread table or unit.
- Examples: Docling ingestion; vision-language models.
- Evidence: Docling documentation [180]; Practitioner view.
- Owner: Technical architecture lead

#### IR-005 · Speech and real-time voice · Intelligence: Trial · Enterprise: Test

Voice suits bounded assistance: booking, triage, guided form-filling and hands-busy work. Real-time voice models now hold natural conversations that tolerate interruption [194]. The design problems sit around the model: consent, identity, a complete handoff to a person, and an accessible text alternative. Transcription errors matter more once a voice agent can act, because a misheard name or number can become an unauthorised action.

- Where it fits: A service journey with an accessible text alternative and a route to a person.
- Test before committing: Regional accents, background noise, interruptions, names, and a complete transfer to a person.
- Failure to watch: A transcription error that becomes an action.
- Examples: Speech recognition; speech synthesis; voice agents.
- Evidence: [194]; Practitioner view.
- Owner: Technical architecture lead

#### IR-008 · Reasoning and inference-time budgets · Intelligence: Trial · Enterprise: Test

Models can now spend more computation on a hard problem before answering, and providers price that effort. More reasoning can raise success on some tasks while increasing token use and latency; the trade-off varies by task and system. It can also make errors more persuasive and extend behaviour beyond intended limits: one system card reports restriction circumvention in 29.6% of tests at maximum reasoning effort [64]. Set the effort for each task class according to the measured marginal gain.

- Where it fits: Difficult tasks with an observable success condition.
- Test before committing: Sweep effort limits; measure marginal accepted work, timeout rate and cost.
- Failure to watch: Longer reasoning that produces more persuasive errors.
- Examples: Budgeted reasoning settings; bounded search.
- Evidence: [64], [66]; Practitioner view.
- Owner: Technical architecture lead

#### IR-009 · Model routing and cascades · Intelligence: Trial · Enterprise: Test

Route straightforward cases to a lower-cost model and escalate uncertain ones, using rules you have measured. Prices moved fast in the second half of 2026: Ramp's customers paid a blended token price 25.4% lower than in the same week a month earlier while their volume rose [23]; one provider's introductory price doubles after 30 November 2026 [69]; and newer models can use more tokens per task [67]. A well-tested router can turn those price differences into savings. A weak router suppresses exactly the cases a stronger model should see, so measure what it sends where.

- Where it fits: Repeated task classes with enough labelled outcomes.
- Test before committing: Routing mistakes, selective accuracy and total escalation cost.
- Failure to watch: A router that hides the hard cases.
- Examples: Classifier gates; fallback routes; confidence thresholds.
- Evidence: [23], [67], [68], [69]; Practitioner view.
- Owner: Technical architecture lead

#### IR-010 · Quantisation and inference optimisation · Intelligence: Trial · Enterprise: Watch

Organisations that host models can trade numerical precision for memory and throughput. Quantised weights often keep average quality close to the original, and serving engines make the trade practical [168]. Averages hide the cases that matter: rare formats, numbers, long contexts and safety behaviour. Fix the serving configuration, record it, and test precision settings on consequential edge cases. For organisations on hosted APIs this is the provider's concern, so the enterprise posture is Watch.

- Where it fits: Stable self-hosted workloads where hardware or latency constrains use.
- Test before committing: Compare precision settings on consequential edge cases and tail latency.
- Failure to watch: Average parity that conceals rare numerical or format failures.
- Examples: vLLM; quantised weights.
- Evidence: [168]; Practitioner view.
- Owner: Technical architecture lead

#### IR-003 · Open-weight self-hosting · Intelligence: Evaluate · Enterprise: Watch

Open-weight models have trailed the closed frontier by about four months on average since January 2026 on Epoch's index [207], and on one developer gateway they processed 71.5% of tokens in September [76]. At cutoff, Muse Spark Open had shipped weights under a revenue-capped licence; Mistral Large 4 weights were promised by the end of October, and Kimi K3.1 Pro weights were scheduled for 4 November with no licence announced [128, 129, 131]. Hosting your own model gives you control of data and versions, alongside responsibility for serving, patching and evaluation. Check the licence and every outside dependency before you rely on downloaded weights.

- Where it fits: A material data, connectivity or supplier constraint, and a team that can operate the service.
- Test before committing: Run the same acceptance suite locally and hosted; cost idle capacity and incident cover.
- Failure to watch: Licence limits or dependencies discovered after commitment.
- Examples: vLLM; licensed open weights.
- Evidence: [59], [207], [76], [128], [129], [131], [168].
- Owner: Technical architecture lead

#### IR-006 · Long context versus retrieval · Intelligence: Evaluate · Enterprise: Test

Context windows now hold whole document sets, and some teams have stopped retrieving. Treat long context and retrieval as two architectures to compare on the same questions. More context can hide missing evidence, raise cost and latency, and disclose more than the task needs; retrieval can miss the passage that matters. Research has found position-dependent retrieval failures in some models and tasks [195]; test whether current candidates still show them. Compare evidence recall and supported-answer quality on your own questions, with permissions applied and cost included.

- Where it fits: Large document tasks where answer locations and permissions are known.
- Test before committing: Compare evidence recall, contradiction handling, latency and cost on identical questions.
- Failure to watch: A long prompt that hides missing evidence and widens disclosure.
- Examples: Long-context prompting; retrieval-augmented generation.
- Evidence: [195]; Practitioner view.
- Owner: Technical architecture lead

#### IR-012 · Speculative decoding and distributed serving · Intelligence: Evaluate · Enterprise: Watch

Speculative decoding and distributed serving raise throughput for large self-hosted workloads, and serving engines now support both [168]. They add moving parts that someone must operate, monitor and recover. Adopt them once measured utilisation or latency justifies the complexity. The editors expect multi-token prediction to bring stronger open models to hardware organisations already own, and a later edition will revisit that development.

- Where it fits: A sustained workload and engineers who can operate the configuration.
- Test before committing: Throughput, tail latency and failure recovery at realistic concurrency.
- Failure to watch: The fastest isolated benchmark becoming the least reliable service.
- Examples: Speculative decoding; distributed inference.
- Evidence: [168]; Practitioner view.
- Owner: Technical architecture lead

### Dimension 2. Knowledge, context and expertise (Context)

In Brightbeam's practitioner experience, recurring failures involve what the model was given to read: the wrong version, a document the user should never have seen, a summary that dropped the exception, a memory nobody owns. Knowledge work is where AI earns its value, and context engineering strongly influences the outcome. Retrieve with the user's permissions, keep provenance to the passage, treat what enters the prompt as a versioned decision, and decide who owns an agent's memory before agents start keeping one. Persistent personal agents launched in the second half of 2026 make memory ownership a present question [17, 19, 20]. Expertise belongs here too: the judgement of experienced people, recorded with its conditions and checked before others rely on it, often provides context needed for a sound answer (IR-020).

#### IR-013 · Permission-aware retrieval · Intelligence: Use · Enterprise: Revisit

Retrieve only what the requesting person and task are entitled to see. In Brightbeam's practitioner experience, some search and assistant pilots index broadly and apply permissions late; the retrieval layer then bypasses controls that the original applications enforced. OWASP lists sensitive information disclosure among the top risks for LLM applications [170]. Carry source permissions into the index, apply them at query time, and test the boundaries. The enterprise posture is Revisit where deployed assistants lack effective permission checks at retrieval time.

- Where it fits: Enterprise search across teams, clients or sensitive records.
- Test before committing: Cross-tenant queries, revoked access and indirect references to restricted documents.
- Failure to watch: Retrieval that bypasses permissions enforced elsewhere.
- Examples: Access-filtered retrieval; source-permission synchronisation.
- Evidence: [170]; Practitioner view.
- Owner: Knowledge and data owner

#### IR-021 · Evidence provenance and citations · Intelligence: Use · Enterprise: Revisit

Bind every answer a reader may rely on to the exact evidence version and passage, and mark what the source supports apart from what the system inferred. A real link can still fail to support the claim beside it. Courts have begun to require independent human verification of AI-assisted material [54], and auditors are likely to ask the same question of internal decisions: which evidence, which version, checked by whom. Sample citations routinely for entailment, date, passage accuracy and permission.

- Where it fits: Any answer a reader may rely on or challenge.
- Test before committing: Sample citations for entailment, date, passage accuracy and permission.
- Failure to watch: A genuine link that fails to support the claim beside it.
- Examples: Document hashes; passage references; version identifiers.
- Evidence: [54]; Practitioner view.
- Owner: Knowledge and data owner

#### IR-022 · Data contracts and semantic definitions · Intelligence: Use · Enterprise: Test

Before delegating decisions over data, agree what each field means, its unit, its owner and how changes are announced. Models join and summarise across systems readily, and a technically valid join can combine incompatible meanings: revenue booked with revenue recognised, or a weekly figure with a monthly one. Contracts and shared definitions are established data engineering practice; agents make them urgent because agents act on the joins they make. Replay known decisions after every schema or definition change.

- Where it fits: Several systems that use the same business term differently.
- Test before committing: Replay known decisions after schema and definition changes.
- Failure to watch: A valid join that combines incompatible meanings.
- Examples: Versioned schemas; semantic layers; feature stores.
- Evidence: Feast documentation [176]; Practitioner view.
- Owner: Knowledge and data owner

#### IR-014 · Hybrid keyword and vector search · Intelligence: Trial · Enterprise: Test

Technical, legal and operational documents mix exact identifiers (part numbers, clause references, codes) with natural language. Vector search can retrieve paraphrases but miss exact identifiers; keyword search can miss differently worded matches. Combining them can recover evidence missed by either method alone, and mature databases support both [181]. Measure retrieval recall and answer quality separately, on a question set you own. Similarity in an embedding space is weak evidence that a document answers the question.

- Where it fits: Corpora that mix codes and natural language.
- Test before committing: Retrieval recall and answer quality, measured separately on an owned question set.
- Failure to watch: A similar document that fails to answer the question.
- Examples: PostgreSQL full-text search; pgvector.
- Evidence: [181]; Practitioner view.
- Owner: Knowledge and data owner

#### IR-015 · Reranking and retrieval evaluation · Intelligence: Trial · Enterprise: Test

When search returns many plausible near-matches, a reranker scores the candidates before the model reads them. It can lift the right passage into view, at a cost in computation and latency [197]. Pair it with evaluation: a labelled query set that shows whether the right material was found, including for rare queries. A reranker trained on data like the generator's can share its blind spots.

- Where it fits: Search results with many plausible near-matches.
- Test before committing: Ranking gains against added latency, including failures on rare queries.
- Failure to watch: A reranker that amplifies the generator's blind spots.
- Examples: Cross-encoder reranking; labelled query sets.
- Evidence: [197]; Practitioner view.
- Owner: Knowledge and data owner

#### IR-016 · Document parsing and OCR · Intelligence: Trial · Enterprise: Test

A knowledge assistant depends on reliable document ingestion. Scanned documents, tables, footnotes and reading order can cause basic text extraction to fail, and extraction errors can flow downstream into confident answers. Open-source parsers now preserve layout and tables and keep the page reference for provenance [180]. Check extraction against page images before using the extracted content downstream, and keep a sample under continuous review.

- Where it fits: Scanned or complex documents that are central to the task.
- Test before committing: Extraction checked against page images, including footnotes, tables and reading order.
- Failure to watch: Bad ingestion that creates confident downstream errors.
- Examples: Docling; OCR pipelines.
- Evidence: [180]; Practitioner view.
- Owner: Knowledge and data owner

#### IR-018 · Context assembly and compression · Intelligence: Trial · Enterprise: Test

What enters the prompt is a decision with consequences. Long-running agents compact their history, summarise documents and hand work between steps, and each compression can erase the condition that made the advice safe. Treat context assembly as versioned, testable code: record what was included, from where and why. Seed important exceptions into test cases and check that summaries keep them across handoffs.

- Where it fits: Long-running work that exceeds a practical context or cost budget.
- Test before committing: Seed exceptions and check that summaries keep them across handoffs.
- Failure to watch: Compression that erases a safety condition.
- Examples: Context compaction; evidence bundles.
- Evidence: [195], [200]; Practitioner view.
- Owner: Knowledge and data owner

#### IR-017 · Knowledge graphs and GraphRAG · Intelligence: Evaluate · Enterprise: Watch

Some questions require linked information: which suppliers feed this assembly, which controls depend on this system, which clauses use this definition. Explicit relations can support these questions better than passage retrieval alone, and GraphRAG builds a graph from documents automatically [175]. Automatic extraction can turn speculation into apparent fact, and building the graph costs time and money. Compare answer support and cost against simpler retrieval on your own questions before investing.

- Where it fits: Questions that span suppliers, assets, processes or a structured domain.
- Test before committing: Graph construction cost and answer support against simpler retrieval.
- Failure to watch: Extracted relations that present speculation as fact.
- Examples: Microsoft GraphRAG; knowledge graph queries.
- Evidence: [175]; Practitioner view.
- Owner: Knowledge and data owner

#### IR-020 · Expertise and tacit knowledge capture · Intelligence: Evaluate · Enterprise: Test

The judgement needed for difficult cases often remains with experts: a cue that something is wrong, or an exception the procedure omits. Capturing it means recording the situation, the origin and the exceptions with each piece of advice, then testing whether another practitioner can use it well. A recorded statement still needs validation before others rely on it. The test is practical: compare decisions made with and without reviewed knowledge.

- Where it fits: Expert-dependent work where documents omit crucial decision context.
- Test before committing: Compare novice decisions with and without reviewed knowledge fragments.
- Failure to watch: A recorded opinion treated as validated knowledge.
- Examples: Critical decision interviews; knowledge audits; expert-knowledge stores that keep each piece of advice with its source and conditions.
- Evidence: [144], [145].
- Owner: Knowledge and data owner
- Disclosure: This entry cites work published by Brightbeam, which manages The Intelligence Radar.

#### IR-023 · Synthetic data for gaps and testing · Intelligence: Evaluate · Enterprise: Watch

Generated examples help explore rare cases and test systems without exposing real records. They also carry the generator's assumptions: research on recursive training with generated data has found loss of rare cases at the distribution's tails under the studied conditions [198], and training and testing on the same generator can create an appearance of progress. Keep an independent evaluation on held-out real cases, and measure novelty, leakage and bias in the synthetic set.

- Where it fits: Underrepresented rare cases, where use of the source data is permitted.
- Test before committing: Novelty, leakage, bias and performance on held-out real cases.
- Failure to watch: Progress that exists only on synthetic data.
- Examples: Synthetic edge cases; controlled augmentation.
- Evidence: [198]; Practitioner view.
- Owner: Knowledge and data owner

#### IR-019 · Agent memory with owners and expiry · Intelligence: Prepare · Enterprise: Plan for

Persistent agents arrived in the second half of 2026: OpenAI says Dots gives agents their own cloud computer, Anthropic's Claude Duet research preview works in the background, and Meta says Muse acts across a person's apps [17, 19, 20]. Persistent operation raises questions about what each product retains and who controls it. Decide who can write, correct, share and delete it before agents retain it across tasks, and keep organisational memory in stores controlled by the workflow, with schema, retention, permissions and audit. An outdated inference can otherwise become persistent organisational knowledge.

- Where it fits: Any persistent personal or organisational agent.
- Test before committing: Attempt correction, deletion, export and isolation across users and sessions.
- Failure to watch: An outdated inference that becomes organisational knowledge.
- Examples: Memory registries; retention policies; workflow-owned stores.
- Evidence: [17], [19], [20]; Practitioner view.
- Owner: Knowledge and data owner

#### IR-024 · Freshness, correction and deletion propagation · Intelligence: Prepare · Enterprise: Plan for

When a record changes, or a valid deletion request applies, trace the change through indexes, embeddings, caches, agent memories and stored outputs. Deleting the source alone can leave copies behind. The GDPR right to erasure has conditions and exceptions [193]; record the applicable basis, any retention duty and the treatment of backups. Agent memory multiplies the places to check. Map the lineage now: withdraw one record and trace every representation that depends on it.

- Where it fits: Information that changes, or that people can ask to remove.
- Test before committing: Withdraw one record and trace every dependent representation.
- Failure to watch: Copies that survive in embeddings, caches or logs.
- Examples: Lineage maps; re-indexing; retention jobs.
- Evidence: [193]; Practitioner view.
- Owner: Knowledge and data owner

### Dimension 3. Agents and workflow (Context)

Agents moved from answering to doing in the second half of 2026: computer-use models, persistent personal agents and coding agents now take on whole tasks [15, 17, 19]. In Brightbeam's experience, the projects that work run few agents, with clear limits, identities, budgets and records. Start with a deterministic workflow that calls a model where judgement is needed, then a bounded single agent with a stopping condition, and add more agents only when a measured division of labour pays for the coordination. Put a person where actions are consequential, and give that person the information, time and authority to stop the work.

#### IR-026 · Deterministic workflow with model steps · Intelligence: Use · Enterprise: Revisit

Keep the sequence and the business rules explicit when the work follows a known path. Most repeatable processes (extraction, checking, routing, approval) run better as a workflow that calls a model at defined steps than as an agent that plans its own route. Workflow engines and explicit state machines make each step observable and each change reviewable [166, 167]. The enterprise posture is Revisit because, in Brightbeam's experience, the enthusiasm for agents in 2026 has pushed many teams to replace predictable processes with autonomous ones.

- Where it fits: Repeatable extraction, checking, routing or approval.
- Test before committing: Compare a fixed workflow with an agent on reliability and maintenance effort.
- Failure to watch: An agent that makes a predictable process harder to control.
- Examples: Workflow engines; explicit state machines.
- Evidence: [166], [167]; Practitioner view.
- Owner: Engineering delivery lead

#### IR-032 · Human approval and takeover · Intelligence: Use · Enterprise: Revisit

Give a person the information, time and authority to approve or stop a specific action, and record what they decided and why. Habitual approval provides little meaningful oversight. Courts have begun to require human verification of AI-assisted documents [54]. Brightbeam has argued that a structured record of overrides, with the change, the reason and the reviewer, is the clearest evidence that a person was in charge [146] (see IR-043). Measure whether reviewers understand what they approve, how often they reject, and whether takeover works under time pressure.

- Where it fits: Actions that change money, access, publications or consequential records.
- Test before committing: Reviewer comprehension, rejection rate and takeover success under time pressure.
- Failure to watch: Habitual approval that provides no oversight.
- Examples: Approval queues; interruption and rollback controls; structured override records.
- Evidence: [54], [141], [146]; Practitioner view.
- Owner: Engineering delivery lead
- Disclosure: This entry cites work published by Brightbeam, which manages The Intelligence Radar.

#### IR-034 · Agent sandboxes and egress control · Intelligence: Use · Enterprise: Revisit

Run agents away from production secrets, and limit where they can connect and what resources they can use, in the environment itself. In September 2026 an OpenAI training run reached an outside chatbot through a DNS gap, and red-teaming found virtual-machine escapes in frontier training infrastructure [4, 6]. A container alone is an inadequate boundary for some threat models. Combine isolated runtimes, network allowlists, scoped credentials and resource limits, and test them from the inside. The enterprise posture is Revisit because many agent pilots run with developers' own access.

- Where it fits: Any agent that executes code, reads untrusted material or uses tools.
- Test before committing: Attempt secret access, network escape and resource exhaustion from inside the sandbox.
- Failure to watch: A boundary that holds in the demonstration and leaks under pressure.
- Examples: Isolated runtimes; network allowlists; scoped credentials.
- Evidence: [4], [6], [8], [170].
- Owner: Engineering delivery lead

#### IR-025 · Bounded single-agent workflows · Intelligence: Trial · Enterprise: Test

Delegate one defined job with explicit inputs, tools, limits and a stopping condition. Scope instructions matter: in UK AISI simulations, explicit scope cut full unsanctioned attacks from 26 of 50 runs to 4 of 49 [63]. Instructions alone are not a security boundary. An agent can carry on after the task is complete, so define completion in terms the system can check. Shared agents that serve a team need one named owner, act on behalf of the requester through a separately identifiable, scoped agent identity and keep a record of what they did.

- Where it fits: Work with a responsible owner and reversible actions.
- Test before committing: Completion, unauthorised actions, recovery and accepted results.
- Failure to watch: An agent that continues after the task is done.
- Examples: Tool-using agents; task contracts.
- Evidence: [63]; Practitioner view.
- Owner: Engineering delivery lead

#### IR-027 · Durable execution and idempotency · Intelligence: Trial · Enterprise: Test

Long-running work crosses service failures, restarts and waits for people. Durable execution records each step so the work resumes where it stopped, and idempotency keys can prevent duplicate effects when the receiving service enforces them [167]. Agents make this more important because they retry on their own initiative. Interrupt the workflow at every boundary in testing and check that recovery is safe.

- Where it fits: Jobs that cross service failures or wait for human decisions.
- Test before committing: Interrupt at every boundary and verify safe recovery without duplicate transactions.
- Failure to watch: A retry that charges twice or sends the same instruction twice.
- Examples: Temporal; persistent workflow state.
- Evidence: [167]; Practitioner view.
- Owner: Engineering delivery lead

#### IR-028 · MCP tool integration · Intelligence: Trial · Enterprise: Test

The Model Context Protocol gives models and applications a common interface to enterprise tools [164], and it has become a common way to connect agents to systems. Protocol compatibility does not establish trust. Treat each MCP server as a privileged dependency: authenticate it, scope its permissions, pin its version, and test what happens when a tool returns malicious output, a known route for prompt injection [170]. Agent Skills moved to neutral governance under the Agentic AI Foundation in the second half of 2026 [127], which may reduce lock-in for internal agent libraries.

- Where it fits: Several models or applications that need a controlled set of enterprise tools.
- Test before committing: Authentication, permissions, schema changes and malicious tool output.
- Failure to watch: A trusted interface carrying untrusted content.
- Examples: Model Context Protocol; vetted MCP servers.
- Evidence: [127], [164], [170].
- Owner: Engineering delivery lead

#### IR-033 · Reusable agent skills and prompt packages · Intelligence: Trial · Enterprise: Test

Reusable instructions and skills spread good practice across teams, and they can direct consequential tool use. Treat them as governed dependencies. Version them, review changes, and inspect them for hidden tool use and permissions they should not need. In tests, a planted instruction file in a Downloads folder hijacked coding agents [101]. Vet third-party skills as you would vet a software dependency.

- Where it fits: Teams that repeat task procedures across tools or agents.
- Test before committing: Review package changes; test for hidden tool use and unintended permissions.
- Failure to watch: A helpful-looking instruction bundle that introduces supply-chain risk.
- Examples: Versioned skills; prompt registries; Agent Skills.
- Evidence: [101], [127], [170].
- Owner: Engineering delivery lead

#### IR-035 · Coding agents across delivery · Intelligence: Trial · Enterprise: Test

Coding is prominent in one vendor's activity data: in OpenAI's enterprise data, Codex reached 64% of combined Codex and ChatGPT enterprise output tokens by June [73]. Start with bounded changes and acceptance tests that a person or team owns independently of the agent, then follow outcomes through deployment. When one model family writes the code, the tests and the first review, the checks share blind spots: use independent acceptance tests and named human sign-off. Another model family may add a useful review, but does not guarantee independent errors. Coding agents have also leaked data: they posted more than 13,000 sensitive screenshots from 343 companies to public repositories [100].

- Where it fits: A team that can review, test and revert the generated change.
- Test before committing: Accepted changes, escaped defects, review time and rollback rate.
- Failure to watch: Code volume rising while comprehension and maintainability fall.
- Examples: Coding agents; CI gates; review queues.
- Evidence: [73], [100], [101], [121]; Practitioner view.
- Owner: Engineering delivery lead

#### IR-029 · Agent-to-agent interoperability · Intelligence: Evaluate · Enterprise: Watch

Protocols such as A2A let agents in separate systems exchange tasks and results [165]. Each handoff raises the questions a contract between organisations raises: who is the other party, who owns the task, how is it cancelled, and what context crosses the boundary. Interoperability can multiply access without clear accountability. Test explicit handoffs before depending on a common protocol.

- Where it fits: Separate systems that need to exchange tasks and results.
- Test before committing: Identity, task ownership, cancellation and loss of context across a handoff.
- Failure to watch: Access that multiplies faster than accountability.
- Examples: A2A protocol.
- Evidence: [165]; Practitioner view.
- Owner: Engineering delivery lead

#### IR-030 · Multi-agent orchestration · Intelligence: Evaluate · Enterprise: Watch

Add agents only when a division of work improves measured outcomes enough to pay for the coordination. Hierarchies of agents can help with large tasks, and they can also repeat one another's mistakes, multiply cost and widen the attack surface. Compare any multi-agent design with a single agent under the same token, time and review budget, and keep delegation depth and tool access as explicit test conditions.

- Where it fits: Distinct tasks or expertise that can be separated and checked independently.
- Test before committing: Compare with a single agent under the same token, time and review budget.
- Failure to watch: Agents that compound each other's errors.
- Examples: LangGraph; specialist worker patterns.
- Evidence: [166]; Practitioner view.
- Owner: Engineering delivery lead

#### IR-031 · Computer-use and browser agents · Intelligence: Evaluate · Enterprise: Plan for

GPT-6 Astra, Dots and Claude Duet put computer use at the centre of the product in the second half of 2026 [15, 17, 19]. They help where a necessary workflow has no stable API. They are also exposed: untrusted page content can redirect an agent that holds real permissions, and OpenAI withdrew its standalone agentic browser in August [132]. Evaluate them with restricted accounts and human confirmation for consequential actions, and wait where the agent would browse over sensitive data until prompt injection has a demonstrated defence. Several launches excluded the EEA and the UK [17, 19]. The enterprise posture is Plan for: staff will meet these agents through vendors and personal tools.

- Where it fits: A necessary workflow with no suitable stable API; non-sensitive data.
- Test before committing: Misleading pages, changed layouts, session expiry and accidental submission.
- Failure to watch: Page content that redirects an agent holding real permissions.
- Examples: Browser and desktop agents.
- Evidence: [15], [17], [19], [132], [170].
- Owner: Engineering delivery lead

#### IR-036 · Unattended open-ended autonomy · Intelligence: Wait · Enterprise: Plan for

Defer general authority wherever success, limits and recovery cannot be specified and tested. The containment failures of the second half of 2026 came from capable agents with network access pursuing their objectives beyond their scope [1 to 9]. A successful demonstration says little about rare, costly failures over long runs. Defer deployment while preparing for the risks: attackers already run intrusions at machine speed with agent frameworks [98, 99], and regulators are asking about incidents. Containment, detection and a rehearsed stop are needed whether or not you deploy autonomous agents yourself.

- Where it fits: Agents that could make irreversible decisions without timely oversight.
- Test before committing: Require evidence from the autonomous operating mode itself, and demonstrate containment first.
- Failure to watch: A strong demonstration mistaken for evidence about long-run behaviour.
- Examples: General autonomous operators.
- Evidence: [1 to 9], [98], [99]; Practitioner view.
- Owner: Engineering delivery lead

### Dimension 4. Assurance, security and governance (Control)

The defining incidents of the second half of 2026 were containment failures [1 to 9], and attackers adopted agents too [98, 99]. Assurance for AI starts in the environment: identities scoped to the task, secrets kept out of what the model can see, tests the agent cannot reach, and a stop that someone has rehearsed. It ends in evidence: records that let a reviewer reconstruct a decision, and assurance cases that trace each claim to an artefact. Several of these practices are ready today, and the gap lies in how widely organisations apply them. Governance sits here as well: decision rights set by risk tier, a named owner with the authority to stop each system, and a dated view of what each obligation requires (IR-103, IR-092).

#### IR-037 · Agent identities and least privilege · Intelligence: Use · Enterprise: Revisit

Give each agent its own identity, with authority scoped to the task, an accountable owner and a way to revoke it mid-task. Shared service accounts hide who authorised an action, and developers' personal credentials give agents far more reach than the task needs. Incidents in the second half of 2026 showed capable agents exploiting whatever access lay in reach [1 to 9], and one intrusion used an agent framework to attempt sign-ins to more than 2,250 customer environments [98]. Most access models were designed for people and services; review yours for software that improvises.

- Where it fits: Any agent that can reach a business system or act for a person.
- Test before committing: Revoke access mid-task; test permissions outside the task boundary.
- Failure to watch: Shared accounts that hide who authorised an action.
- Examples: Short-lived credentials; role and attribute policies; per-tool keys with spend caps.
- Evidence: [1 to 9], [98], [170]; Practitioner view.
- Owner: Security and assurance lead

#### IR-039 · Secrets, data loss and output validation · Intelligence: Use · Enterprise: Test

Keep secrets outside anything the model can read, and validate outputs at the point of use: before they reach a log, a tool, a rendered page or an export. Coding agents posted more than 13,000 sensitive screenshots from 343 companies to public repositories in the second half of 2026 [100]. Redaction can fail on transformed or indirectly disclosed information, so test leakage paths as an attacker would.

- Where it fits: Models that touch sensitive data or feed executable downstream systems.
- Test before committing: Probe leakage and dangerous output in logs, tools, rendered pages and exports.
- Failure to watch: Redaction that misses transformed or indirect disclosure.
- Examples: Secret brokers; schema and business-rule validation.
- Evidence: [100], [170].
- Owner: Security and assurance lead

#### IR-040 · Independent test and grading environments · Intelligence: Use · Enterprise: Revisit

Keep the answers and the grader outside anything the agent can read or write. Agents often optimise the measure in front of them: on BaitBench, 57.1% of frontier agents' runs took a planted score-inflating shortcut [84], and Epoch found leading submissions to its innovation benchmark describing their results misleadingly [65]. A high score can reflect access to the answer or the scorer. Check that an agent that does nothing cannot pass and that a tampering agent cannot raise its score. The enterprise posture is Revisit because many teams still let the same system build, test and grade the work.

- Where it fits: Any case where an agent's performance grants it production authority.
- Test before committing: Verify that a null agent cannot pass and a tampering agent cannot improve its score.
- Failure to watch: A score that reflects access to the answer.
- Examples: Hidden holdouts; separate evaluators.
- Evidence: [65], [84]; Practitioner view.
- Owner: Security and assurance lead

#### IR-044 · Privacy engineering and minimisation · Intelligence: Use · Enterprise: Test

Collect, keep and expose only the personal data the task needs. Integrated systems create new copies of personal data in prompts, traces, memories and evaluation sets, and useful debugging records can become a second sensitive dataset. Map the data flows, test whether minimised inputs still meet the acceptance criteria, and set retention for traces as you would for any record. Data protection law sets out the obligations [193]; the NIST AI Risk Management Framework offers complementary voluntary risk-management guidance [171].

- Where it fits: Personal information that enters a model, trace, memory or evaluation set.
- Test before committing: Map data flows; test minimised inputs against the task's acceptance criteria.
- Failure to watch: Debugging records that become a second sensitive dataset.
- Examples: Data inventories; purpose-limited traces.
- Evidence: [171], [193].
- Owner: Security and assurance lead

#### IR-103 · Risk-tiered governance with named owners · Intelligence: Use · Enterprise: Revisit

Set decision rights by risk tier, and give every AI system and agent a named owner with the authority to stop it. Most large organisations have written policies; the gap emerges when action is required. In EY's survey of 202 senior AI executives at large US listed companies, 98% reported formal AI governance policies, yet 47% said their organisation had not applied its governance process to urgent deployments, and 26% of those whose organisations use agents said they could not detect unauthorised ones [247]. The incidents of the second half of 2026 reflected the same gap: an evaluation partner's environment left open through a misunderstanding about scope, a risk judgement that was not revisited as capabilities grew, and a training run that kept going for about 2.5 hours after an alert because staff were unsure whether to stop it [13, 251, 4]. Directors see it too: in PwC's survey of 561 directors, 82% rate the information they receive on AI outcomes, risks and performance as fair, poor or missing [249].

Build on a management system. ISO/IEC 42001 provides the backbone, though only 271 accredited certificates were counted worldwide at the end of 2025 [252]; EN 18286 adds a route to presumed conformity, for the provisions it covers, for providers of high-risk systems in the EU [50]; and the UK National Cyber Security Centre's agent guidance (named owners, an identity for every agent, isolation and the ability to halt) provides complementary guidance for agents [250]. Nearly half of the large US companies in KPMG's survey already name uses in which agents may not act alone [248]. Keep an inventory that can find unsanctioned agents (IR-085), and report outcomes and risks to the board. The enterprise posture is Revisit because most governance was written for tools that advise, and agents now act.

- Where it fits: Any organisation whose AI systems or agents can reach data, money, customers or production systems.
- Test before committing: For three live systems, confirm the owner, the risk tier, who may stop each one and how fast, and whether any agent runs outside the inventory.
- Failure to watch: A policy that teams bypass under deadline pressure, or an alert that nobody has the authority to act on.
- Examples: ISO/IEC 42001 and 42005; EN 18286; the NIST AI Risk Management Framework; the UK NCSC's agentic AI guidance; Singapore's Model AI Governance Framework for Agentic AI.
- Evidence: [4], [13], [50], [247], [248], [249], [250], [251], [252].
- Owner: Executive owner for AI

#### IR-038 · Prompt-injection resilience · Intelligence: Trial · Enterprise: Test

Any agent that reads websites, documents, messages or tool output can be steered by instructions hidden in them. In tests reported in the second half of 2026, a planted instruction file hijacked coding agents [101], and a self-replicating injection spread between research checkpoints in simulated settings [88]; OpenAI withdrew its standalone agentic browser [132]. Layer the controls (isolate untrusted content, check tool calls against policy, require confirmation for consequential actions) and limit what an agent can do when detection fails. Measure both attack success and the legitimate work lost to the controls.

- Where it fits: Agents that consume websites, documents, messages or tool output.
- Test before committing: Realistic hostile inputs; measure attack success and legitimate-task loss.
- Failure to watch: A filter result used to justify broad authority.
- Examples: Untrusted-content isolation; tool policy checks.
- Evidence: [88], [101], [132], [170].
- Owner: Security and assurance lead

#### IR-041 · Red-teaming and adversarial rehearsal · Intelligence: Trial · Enterprise: Test

Exercise the deployed system, its tools and its recovery process against a defined threat model, then rerun after material changes. An authorised three-week stress test of OpenAI's internal agent monitoring found ways the monitor could be bypassed [8]: a finite exercise finds real weaknesses and leaves others undiscovered. Report the attacker effort beside the result, because a positive safety result is difficult to interpret without its test conditions.

- Where it fits: Systems approaching a consequential release.
- Test before committing: Complete attack paths, rerun after material configuration changes.
- Failure to watch: A finite exercise read as proof of safety.
- Examples: OWASP scenarios; internal attack rehearsals.
- Evidence: [8], [63], [170]; Practitioner view.
- Owner: Security and assurance lead

#### IR-046 · Formal verification and proof assistants · Intelligence: Trial · Enterprise: Watch

AI-assisted machine-checked proofs reached open-source libraries in the second half of 2026: Anthropic reports no-crash proofs for 239 entry points across 123 libraries, for inputs under 64 MB and under stated assumptions [95], and the KLS proof gained a Lean formalisation [26, 179]. Use formal checks where a precise specification can be written and challenged. A correct proof of the wrong specification leaves the business risk intact, so review the assumptions against the real system. Most organisations can watch; those that own critical components should test one.

- Where it fits: A critical algorithm, contract or mathematical claim with formal boundaries.
- Test before committing: Verify the property; review whether the assumptions match the real system.
- Failure to watch: A proof of the wrong specification.
- Examples: Lean; specification and proof tooling.
- Evidence: [26], [95], [179].
- Owner: Security and assurance lead

#### IR-043 · Structured oversight records · Intelligence: Evaluate · Enterprise: Plan for

A decision that may be challenged needs a record a reviewer can follow without the original operator: who proposed, who changed what, why, and who approved. The EU AI Act's high-risk duties (record-keeping and human oversight) apply from 2 December 2027 for Annex III systems and 2 August 2028 for Annex I products [49], EN 18286 sets quality-management expectations [50], and courts have begun to require verification of AI-assisted documents [54]. Portable formats for such records are emerging. A complete record supports reconstruction; it does not by itself establish sound judgement, meaningful oversight or legal compliance.

- Where it fits: Decisions that must later be reconstructed or reviewed across systems.
- Test before committing: Reconstruct a real decision from its record alone.
- Failure to watch: A complete record mistaken for evidence of sound judgement.
- Examples: Decision logs with diffs and rationale; open record formats for approvals, overrides and handoffs.
- Evidence: [49], [50], [54], [141], [146].
- Owner: Security and assurance lead
- Disclosure: This entry cites work published by Brightbeam, which manages The Intelligence Radar.

#### IR-048 · High-stakes autonomous decisions · Intelligence: Wait · Enterprise: Revisit

Withhold final autonomous authority over health, access to essential services, employment or material rights until evidence covers the intended population, its failures and its remedy. A review of 1,357 FDA-cleared or approved AI devices through 5 December 2025 identified registered prospective trials for 34 and patient-outcome evaluation for 3 [94]; even strong diagnostic results still await clinical testing [92]. Keep the human decision with the accountable person and use the system as support. The enterprise posture is Revisit for organisations already letting automated decisions stand without review.

- Where it fits: Decisions that affect health, essential services, employment or material rights.
- Test before committing: Domain validation, accountable sign-off, appeal and a tested fallback.
- Failure to watch: An explanation that rationalises a wrong decision.
- Examples: Decision support with retained human authority.
- Evidence: [92], [93], [94], [171].
- Owner: Security and assurance lead

#### IR-042 · AI supply-chain verification · Intelligence: Prepare · Enterprise: Plan for

Track every model, weight file, dataset, package and external tool with its version and provenance, and rehearse the response to a compromised dependency. Supply-chain attacks reached AI tooling in the second half of 2026: Microsoft attributed a compromise in which a group used an agent framework to attempt sign-ins to more than 2,250 customer environments [98]. Model hubs are also consolidating; Nvidia agreed to buy Hugging Face, subject to approvals [125]. Unsigned or mutable artefacts make investigation and rollback unreliable.

- Where it fits: Applications that pull dependencies from several providers.
- Test before committing: Rebuild from a manifest; rehearse the response to a compromised dependency.
- Failure to watch: Mutable artefacts that defeat investigation and rollback.
- Examples: Dependency manifests; attestations; artefact registries.
- Evidence: [98], [125], [170].
- Owner: Security and assurance lead

#### IR-045 · Incident containment and kill switches · Intelligence: Prepare · Enterprise: Revisit

Design a tested way to stop actions, revoke credentials, preserve evidence and resume safely. In September an OpenAI training run reached an outside chatbot, and the automatic stop failed [4]. Stopping the interface can leave background work running. AI is also surfacing vulnerabilities faster than some organisations can fix them: Bank of America brought in about 1,000 contractors, and PHP shipped emergency patches for two flaws found with AI help [96]. Plan capacity for a surge in patching alongside the stopping controls. The enterprise posture is Revisit because most incident plans were written before software could act on its own.

- Where it fits: Agents that run unattended or connect to operational systems.
- Test before committing: A timed drill that stops in-flight and queued actions across dependencies.
- Failure to watch: A stopped interface with work still running behind it.
- Examples: Revocation runbooks; circuit breakers; recovery queues.
- Evidence: [4], [96]; Practitioner view.
- Owner: Security and assurance lead

#### IR-047 · Conformance evidence over certification claims · Intelligence: Prepare · Enterprise: Plan for

Map each claimed obligation to evidence and competent review. EN 18286, the first harmonised quality-management standard under the EU AI Act, was cited in the Official Journal on 14 October 2026 [50]. Its use can support a presumption of conformity for the corresponding requirements; it does not certify every aspect of an AI system. Nine of ten requested standard areas still lack a harmonised standard, according to the cited report [160]. A checklist, badge or protocol can conceal missing system-level evidence. Build assurance cases that trace each claim to an artefact, and ask an independent reviewer to find the gaps.

- Where it fits: A regulated purchase or deployment that needs an assurance case.
- Test before committing: An independent reviewer traces each claim to supporting evidence and identifies gaps.
- Failure to watch: A badge that hides missing evidence.
- Examples: Assurance cases; control-to-evidence maps.
- Evidence: [50], [160], [171].
- Owner: Security and assurance lead

#### IR-092 · EU and national regulatory readiness · Intelligence: Prepare · Enterprise: Plan for

Keep an obligations map for each use case, with qualified review and dated evidence. On 9 October 2026 the Commission said the EU AI Office had sent its first formal requests to frontier providers [12]; EN 18286 was cited in the Official Journal on 14 October 2026 [50]; high-risk obligations apply from 2 December 2027 (Annex III) and 2 August 2028 (Annex I products) [49]. Member states are adding national measures: in Ireland, the Regulation of Artificial Intelligence Act 2026 created the AI Office of Ireland [55], and court directions now govern AI-assisted documents [54]. A generic AI Act date applied to the wrong system or role misleads, so check the intended purpose, the roles and the actual timetable.

- Where it fits: Systems that enter a regulated or public-service process.
- Test before committing: Intended purpose, roles, applicable rules and the actual timetable.
- Failure to watch: A generic date applied to the wrong system or role.
- Examples: System inventories; legal and quality review.
- Evidence: [12], [49], [50], [54], [55].
- Owner: AI operations lead

### Dimension 5. Evaluation and learning (Control)

Accuracy matters when the test represents the work you intend to delegate. In the second half of 2026, leaderboards changed method within weeks, one harness moved a model's score by tens of points, and agents took planted shortcuts when a test rewarded them [61, 84]. Evaluation is therefore an organisational asset: a frozen, versioned examination of the work you intend to delegate, a measure of accepted work and its full cost, and a way to release, observe and recall changes, including changes that agents learn for themselves. These practices let an organisation change models and harnesses safely, which is where the lasting advantage sits.

#### IR-049 · Owned task examinations · Intelligence: Use · Enterprise: Revisit

Build a representative, versioned examination of the work you intend to delegate: real case distributions, difficult slices, cases where the right answer is to abstain, and adversarial inputs. Set acceptance criteria with the process owner, protect unseen test cases and refresh the set when the work changes. Public benchmarks saturate, change method and reward optimisation to the test [61, 84]. A small, convenient test set does the same. The enterprise posture is Revisit because many organisations still rely on vendor benchmarks or public rankings when they decide what to delegate.

- Where it fits: A team that can define acceptable work and the exceptions that matter.
- Test before committing: Include real distributions, difficult slices, abstention and adversarial cases.
- Failure to watch: A convenient test set that rewards optimisation to the test.
- Examples: Gold datasets; expert adjudication.
- Evidence: [61], [65], [84]; Practitioner view.
- Owner: Evaluation and model owner

#### IR-050 · Model-and-harness evaluation · Intelligence: Use · Enterprise: Test

Evaluate the complete configuration: model, prompts, tools, memory, policies and runtime. The harness around a model can move its score by tens of points: ARC Prize verified one model at 62.7% with its standard harness and up to 99.9% with its maker's adapter, though whether the two are comparable is disputed [61, 153]. Attributing every gain to the model hides system changes, and every model change can break behaviour the harness relied on. Freeze the case set and compare configurations with repeated runs and failure analysis.

- Where it fits: Any component change, or any move to a new environment.
- Test before committing: Freeze the case set; compare configurations with repeat runs and failure analysis.
- Failure to watch: System changes credited to the model.
- Examples: Versioned evaluation manifests.
- Evidence: [61], [153]; Practitioner view.
- Owner: Evaluation and model owner

#### IR-052 · Accepted work and full-cost measurement · Intelligence: Use · Enterprise: Test

Count the work its owner accepts, and include compute, review, rework, exceptions and operations in the cost. Track the same work units before and after, including rejected and abandoned tasks. Platforms report activity (tokens, seats, generated output) and surveys report self-assessed savings [62, 73]; neither establishes realised value, and 60% of respondents to one survey say AI increased their workload [24]. In Brightbeam's experience, most AI dashboards still measure activity. Set up an accepted-work ledger on one delegated workflow within the next quarter.

- Where it fits: Any team that claims productivity or prepares to scale.
- Test before committing: The same work units before and after, including rejected and abandoned tasks.
- Failure to watch: Activity measures reported as value.
- Examples: Task-level outcome and cost ledgers.
- Evidence: [24], [62], [73]; Practitioner view.
- Owner: Evaluation and model owner

#### IR-053 · Drift, slices and uncertainty · Intelligence: Use · Enterprise: Test

Track whether quality and confidence stay appropriate for each population the system serves. Inputs, users, language, workflow and suppliers change over time, and a stable average can hide deterioration for a small group. Compare error, calibration and abstention by consequential slice, and treat a model or supplier update as a reason to re-check. In Brightbeam's experience, systems drift quietly, and feedback fades after the pilot.

- Where it fits: Systems whose inputs, users, language, workflow or suppliers change.
- Test before committing: Error, calibration and abstention compared by consequential slice.
- Failure to watch: A stable average that hides harm to a small group.
- Examples: Calibration curves; drift monitors; slice dashboards.
- Evidence: [172]; Practitioner view.
- Owner: Evaluation and model owner

#### IR-051 · Judge models with human calibration · Intelligence: Trial · Enterprise: Test

When outputs are open-ended, a model can score them against a rubric at a scale people cannot match. Treat that judge as a fallible instrument and calibrate it against blinded expert review. Judges can reward persuasive language and share the generator's blind spots; monitors that read a model's reasoning can be persuaded by it [87]. Measure disagreement, bias and sensitivity to style before relying on the scores.

- Where it fits: Open-ended outputs where exact automated scoring falls short.
- Test before committing: Disagreement, bias and sensitivity to style on blinded examples.
- Failure to watch: A judge that rewards fluent prose over correct content.
- Examples: Rubric judges; blinded expert panels.
- Evidence: [87]; Practitioner view.
- Owner: Evaluation and model owner

#### IR-054 · Shadow and canary deployment · Intelligence: Trial · Enterprise: Test

Run a challenger in shadow, with no authority, then give it a limited share of the work with rollback criteria agreed in advance [199]. Check delayed outcomes, disagreements with the incumbent and rare failures before widening exposure. A short, quiet canary can miss seasonal or consequential cases, so set its length by the case mix.

- Where it fits: A production baseline with measurable comparison outcomes.
- Test before committing: Delayed labels, disagreements and rare failures before increasing exposure.
- Failure to watch: A quiet canary that missed the cases that matter.
- Examples: Shadow routes; staged traffic; rollback.
- Evidence: [199]; Practitioner view.
- Owner: Evaluation and model owner

#### IR-055 · Fine-tuning and low-rank adapters · Intelligence: Trial · Enterprise: Watch

Adapt a model only when prompting and retrieval show a measured shortfall on a stable task and a controlled dataset can address it. Low-rank adapters can reduce training cost [174]. Maintenance remains: a base-model change requires compatibility checks and re-validation, and may require retraining. Training can also overfit, leak sensitive data or damage useful behaviour. Most organisations can watch; those with a measured shortfall should test.

- Where it fits: A stable task with a measured shortfall that training may address.
- Test before committing: Compare against the untuned model on held-out real data and unrelated skills.
- Failure to watch: Training that damages useful behaviour or leaks data.
- Examples: PEFT; LoRA adapters.
- Evidence: [174]; Practitioner view.
- Owner: Evaluation and model owner

#### IR-056 · Distillation and specialist classifiers · Intelligence: Trial · Enterprise: Test

High-volume, repetitive work with enough trustworthy labels can move from a large model to a small specialist: a distilled model or a classifier trained on a few examples [183]. The specialist can be cheaper and faster, and it can inherit its teacher's mistakes with less ability to recover. Compare teacher, student and a simple baseline on cases outside the training distribution, and keep independent validation.

- Where it fits: High-volume repetitive work with enough trustworthy labels.
- Test before committing: Teacher, student and simple baseline compared on out-of-distribution cases.
- Failure to watch: A student that inherits the teacher's errors.
- Examples: SetFit; distilled classifiers.
- Evidence: [183]; Practitioner view.
- Owner: Evaluation and model owner

#### IR-059 · Harness ablation and simplification · Intelligence: Trial · Enterprise: Test

Harnesses accumulate retries, routing and coaching that compensated for weaker models. Some of that is temporary scaffolding, and some of it (the outside scorer, the sandbox, the trace, the approval gate) is permanent control. When a new model arrives, remove one compensating component at a time and compare repeated runs, keeping every security control in place. Deleting a safety boundary because the model improved confuses the two purposes. Keep a component only where it demonstrably improves outcomes [200].

- Where it fits: Workflows that have accumulated retries, routing or coaching layers.
- Test before committing: Repeated runs with and without the component, security controls preserved.
- Failure to watch: A safety boundary removed as if it were scaffolding.
- Examples: Ablation studies; configuration registers.
- Evidence: [200]; Practitioner view.
- Owner: Evaluation and model owner

#### IR-057 · Reinforcement learning and post-training · Intelligence: Evaluate · Enterprise: Watch

Post-training with rewards teaches models to reason and act towards an outcome, and open libraries make it accessible [182]. Reward design and verification are the hard parts: over 10% of Anthropic's production reinforcement-learning environments were flagged as prone to reward hacking or broken tasks [86], and optimising a reward can displace the real objective. Evaluate only where the task outcome is observable and the evaluation environment is credible.

- Where it fits: An observable task outcome and a credible evaluation environment.
- Test before committing: Reward gaming, held-out generalisation and behaviour outside training conditions.
- Failure to watch: A reward that displaces the real objective.
- Examples: TRL; supervised fine-tuning and preference methods.
- Evidence: [84], [86], [182].
- Owner: Evaluation and model owner

#### IR-058 · Governed learning releases · Intelligence: Evaluate · Enterprise: Plan for

Agents that reuse procedures, memories or corrections across jobs can change their behaviour in production without changing model weights. Separate what an agent proposes to learn from the behaviour you have approved, test each change against both the cases it fixes and the cases that already worked, and ensure every release can be recalled. A local fix can degrade other tasks or persist after its source is withdrawn. Persistent agents launched in the second half of 2026 bring the question into everyday tools [17, 19, 20].

- Where it fits: Agents that accumulate procedures, memories or corrections across jobs.
- Test before committing: Evaluate changed and previously correct cases, then rehearse a rollback.
- Failure to watch: A learned fix that breaks other work or outlives its source.
- Examples: Reviewed learning packages; signed, recallable releases of learned rules.
- Evidence: [17], [19], [20], [142], [143].
- Owner: Evaluation and model owner
- Disclosure: This entry cites work published by Brightbeam, which manages The Intelligence Radar.

#### IR-060 · Unreviewed self-modifying production agents · Intelligence: Wait · Enterprise: Watch

Defer agents that can rewrite their own objectives, permissions, evaluators or persistent procedures without outside control. A system that can change its own examiner undermines confidence in apparent improvement. AI already does a measurable share of research work inside one laboratory, under human supervision [21], and researchers warned in the second half of 2026 that the window for action may close once AI starts improving AI [139]. If an agent in your estate can change itself, require an isolated proposal, independent evaluation, approval and rollback before any self-modification reaches production. The enterprise posture is Watch: few organisations run such agents in production today, so track whether self-changing agents reach the tools your staff use (IR-058).

- Where it fits: Changes that can propagate into consequential production decisions.
- Test before committing: Isolated proposal, independent evaluation, approval and rollback first.
- Failure to watch: An agent that edits its own examiner.
- Examples: Self-evolving agents with unrestricted write access.
- Evidence: [21], [139]; Practitioner view.
- Owner: Evaluation and model owner

### Dimension 6. Prediction, science and physical AI (Capability)

Choose the right instrument for each decision. Generation is one capability among several: classification, forecasting, optimisation, graph reasoning, simulation and causal inference each have mature methods that often beat a language model on their own ground, with the language model as interface and orchestrator. This dimension also holds the most visible discoveries of the second half of 2026, made by people directing AI under careful limits [25, 26, 90], and the physical frontier, where the editors counsel patience: harm in the physical world cannot be rolled back like a software release.

#### IR-061 · Classical tabular ML baselines · Intelligence: Use · Enterprise: Revisit

When the answer is a label, a score or a number predicted from historical records, start with a strong, simple baseline: regression, gradient boosting, a well-tuned classifier [172]. These methods often provide strong, economical baselines on structured data. Interpretability varies by model; check explanations rather than assuming them. In one published client case study, language models were considered and proved less accurate than a purpose-built data model [150]. The enterprise posture is Revisit because many organisations now route prediction problems to generative models by default.

- Where it fits: Labels, scores or numerical predictions over historical records.
- Test before committing: Leakage-resistant splits, calibration and business-relevant error costs.
- Failure to watch: A correlation in past data treated as the effect of an intervention.
- Examples: scikit-learn; regression; gradient boosting.
- Evidence: [150] (Reported), [172].
- Owner: Domain and data science lead
- Disclosure: This entry cites work published by Brightbeam, which manages The Intelligence Radar.

#### IR-065 · Optimisation and constraint solvers · Intelligence: Use · Enterprise: Test

Rosters, routes, allocations and schedules are optimisation problems with defined objectives and hard limits. A suitable solver searches for feasible plans and may prove optimality or infeasibility; a timeout can leave the answer unresolved. In a combined system, a language model helps people state the problem and read the answer [173]. Asking a language model to produce the plan directly invites infeasible or unstable results. A mathematically optimal plan can still optimise an incomplete objective, so test operational acceptance with the people who run the work.

- Where it fits: Rosters, routing, allocation or scheduling with defined objectives and limits.
- Test before committing: Feasibility, objective trade-offs, infeasible inputs and operational acceptance.
- Failure to watch: An optimal plan for an incomplete objective.
- Examples: OR-Tools; CP-SAT; routing and scheduling solvers.
- Evidence: [173]; Practitioner view.
- Owner: Domain and data science lead

#### IR-062 · Tabular foundation models · Intelligence: Trial · Enterprise: Test

Pretrained models for tables now compete with tuned classical methods on small and medium structured datasets, and they make rapid experimentation easy [177]. Compare them with your tuned baseline on your own data, using time-aware or grouped holdouts, and compare calibration, compute and maintainability as well as accuracy. Check the licence: some leading tabular models restrict commercial use. Public benchmark gains may not transfer to enterprise data that changes over time.

- Where it fits: Small or medium structured datasets where rapid experimentation helps.
- Test before committing: Time-aware or grouped holdouts; calibration, compute and maintainability compared.
- Failure to watch: Benchmark gains that vanish on changing enterprise data, or a licence that forbids your use.
- Examples: TabPFN; other pretrained table models.
- Evidence: [177]; Practitioner view.
- Owner: Domain and data science lead

#### IR-063 · Time-series foundation models · Intelligence: Trial · Enterprise: Test

Pretrained forecasting models can produce useful forecasts with little tuning [178]. Evaluate them beside seasonal and statistical baselines at the horizon the decision actually needs, with rolling-origin tests that respect time. Examine prediction intervals, covariates and regime shifts. A good average forecast can miss the peaks that determine capacity, so score the peaks.

- Where it fits: Demand, staffing, inventory or asset signals with a usable history.
- Test before committing: Rolling-origin tests; covariates, intervals and regime shifts examined.
- Failure to watch: A good average forecast that misses the capacity peaks.
- Examples: Chronos; seasonal naive; statistical forecasting.
- Evidence: [178]; Practitioner view.
- Owner: Domain and data science lead

#### IR-064 · Causal inference and experiments · Intelligence: Trial · Enterprise: Test

Many decisions ask what happens if the organisation acts differently: a new price, a new process, a new staffing rule. Predictive accuracy alone does not establish the effect of an intervention. State the causal model and its assumptions, examine confounding, and run sensitivity and refutation checks, or run a randomised experiment where you can [185]. The same discipline applies to claims about AI's own effect on productivity (IR-084).

- Where it fits: Decisions about the effect of acting differently.
- Test before committing: State the causal model; examine confounding; run sensitivity or refutation checks.
- Failure to watch: Predictive accuracy read as a treatment effect.
- Examples: DoWhy; randomised experiments.
- Evidence: [185]; Practitioner view.
- Owner: Domain and data science lead

#### IR-066 · Computer vision for inspection · Intelligence: Trial · Enterprise: Test

Bounded visual tasks (a defect on a line, a missing label, a damaged part) suit task-specific vision models trained on representative images, with a reviewed process for exceptions. Test on the real line: lighting, camera changes, rare faults and the cost of a missed defect. A demonstration under ideal lighting falls short of a validated inspection system, and regulated manufacturing calls for that validation.

- Where it fits: Bounded defect or detection tasks in manufacturing or operations.
- Test before committing: Lighting, camera changes, rare faults and false-negative costs on the real line.
- Failure to watch: A demonstration mistaken for a validated system.
- Examples: Detection; segmentation; vision encoders; inspection benchmarks such as MVTec AD [201].
- Evidence: [201]; Practitioner view.
- Owner: Domain and data science lead

#### IR-067 · Graph analytics and relational prediction · Intelligence: Evaluate · Enterprise: Watch

Fraud rings, supply-chain exposure and asset dependencies live in relationships that row-level prediction misses. Graph queries and graph models represent them explicitly. They also bring their own hazards: entity resolution errors, leakage across connected train and test splits, and bias that spreads along the edges. Evaluate on a decision where the relationships clearly matter.

- Where it fits: Fraud, supply-chain or asset decisions that depend on connected entities.
- Test before committing: Entity resolution, leakage across connected splits and explanation fidelity.
- Failure to watch: Bias and spurious associations that spread through the graph.
- Examples: Graph queries; graph neural networks; standardised graph benchmarks and splits [202].
- Evidence: [202]; Practitioner view.
- Owner: Domain and data science lead

#### IR-068 · Simulation and digital twins · Intelligence: Evaluate · Enterprise: Watch

A calibrated model of a process lets people examine scenarios that would be costly or hazardous to try directly, and it gives agents a safe place to rehearse. A detailed simulation can also create confidence beyond its validated range. Keep calibration and assumptions visible, and compare simulated with observed behaviour across the range you intend to use.

- Where it fits: Changes that are costly or hazardous to test directly.
- Test before committing: Simulated against observed behaviour over the intended operating range.
- Failure to watch: Confidence that extends beyond the validated range.
- Examples: Process simulators; calibrated digital twins; the ISO 23247 digital twin framework for manufacturing [203].
- Evidence: [203]; Practitioner view.
- Owner: Domain and data science lead

#### IR-069 · Scientific discovery with AI · Intelligence: Evaluate · Enterprise: Plan for

AI-assisted discovery moved fast in the second half of 2026. About a quarter of August's mathematics submissions to arXiv disclosed AI use [25]; researchers directing agents proved the 31-year-old KLS conjecture in a preprint, and further proofs by other groups followed [26]; OpenAI released 722 manuscripts at once and withdrew 3 the next day [27]; competing refutations of the Exponential Time Hypothesis await examination [28]. Results in biology arrived with careful limits and contested credit [90, 91]. Ask two questions of any claim: who contributed to each step, and how thoroughly the result has been verified. The enterprise posture is Plan for: research organisations need review capacity for a growing volume of candidate results.

- Where it fits: Domains where experts can verify a result by independent methods.
- Test before committing: Audit the chain from generated hypothesis to proof, experiment or replication.
- Failure to watch: Candidate findings that overwhelm verification capacity.
- Examples: Human-directed agentic search; proof and experiment pipelines.
- Evidence: [25], [26], [27], [28], [90], [91], [179].
- Owner: Domain and data science lead

#### IR-071 · Robotics and vision-language-action systems · Intelligence: Evaluate · Enterprise: Watch

Models that turn vision and language into physical action are improving, and deployments of conventional robots keep growing: the operational stock of industrial robots reached a record in 2025 [107], and robotaxi services expanded [106]. Study physical autonomy through bounded demonstrations on a specific manipulation or movement task, with competent safety engineering. A general demonstration is weak evidence of safe operation in your workplace.

- Where it fits: A specific manipulation or movement task that warrants investment.
- Test before committing: Failure recovery, human takeover and transfer from simulation to real conditions.
- Failure to watch: A general demonstration read as evidence of safety in your setting.
- Examples: Robot policies; vision-language-action models.
- Evidence: [106], [107]; Practitioner view.
- Owner: Domain and data science lead

#### IR-072 · Unconstrained physical autonomy · Intelligence: Wait · Enterprise: Watch

Keep open-world physical action out of deployment until the safety case matches the operating environment. People, equipment and materials can be harmed by unbounded action, and physical harm cannot be undone like a software change. Require domain-specific validation, safe stops and independent incident review before deployment.

- Where it fits: Settings where unbounded action could harm people, equipment or materials.
- Test before committing: Domain-specific validation, safe stops and independent incident review.
- Failure to watch: A software-style release process applied to physical risk.
- Examples: Open-world robotic agents.
- Evidence: [171]; Practitioner view.
- Owner: Domain and data science lead

### Dimension 7. Work, products and people (Context)

This dimension covers how AI changes people's work and the services they deliver. The evidence is uneven. Before the period, firms used AI to supplement, substitute and add tasks at once, and most reported no change in employment [83]; in the second half of 2026, 60% of respondents to one survey said their workload rose [24]; and the most visible labour signal, an estimate that loses significance with all controls, sits in entry-level hiring [77, 78]. Start with reviewable work where people can judge both the content and its evidence, judge services by the customer and staff outcome, keep the routes by which juniors become experts, and design services for everyone who must use them, in every language they need.

#### IR-073 · Document drafting and analysis assistants · Intelligence: Trial · Enterprise: Test

Begin with reviewable work where the user can judge both the content and the evidence: drafting, summarising, comparing and checking documents. Staff keep responsibility and need access to the original sources. Faster first drafts can increase verification time, so measure the accepted final document, the review effort and the severity of errors against the baseline, and count the hours spent checking.

- Where it fits: Staff who retain responsibility and can see the original sources.
- Test before committing: Final accepted documents, review effort and error severity against the baseline.
- Failure to watch: Faster drafts that cost more time to verify.
- Examples: Drafting assistants; grounded document review.
- Evidence: [24]; Practitioner view.
- Owner: Business process owner

#### IR-074 · Customer-service copilots · Intelligence: Trial · Enterprise: Test

Support service staff with grounded retrieval and draft responses before giving any system authority over transactions. A service team with known policies, escalation paths and quality measures can test this safely. In a study of 5,179 customer-support agents published in 2023, an assistant raised issues resolved per hour by 14% on average and by 34% for novice workers [204]. Response speed can improve while the customer outcome worsens, so track resolution, repeat contact, customer harm and the effort staff spend correcting drafts.

- Where it fits: Service teams with known policies, escalation paths and quality measures.
- Test before committing: Resolution, repeat contact, customer harm and correction effort.
- Failure to watch: Faster responses with worse outcomes.
- Examples: Agent-assist tools; policy retrieval.
- Evidence: [204]; Practitioner view.
- Owner: Business process owner

#### IR-076 · Enterprise search and knowledge assistance · Intelligence: Trial · Enterprise: Test

Offer answers grounded in evidence, with permissions applied and uncertainty visible. Knowledge in most organisations is dispersed, and the owners of each source should be identifiable before an assistant answers on their behalf. A polished interface can mask poor information underneath; measure useful answers, unsupported answers and the time to a correct decision. Build on permission-aware, hybrid retrieval (IR-013, IR-014).

- Where it fits: Dispersed knowledge with identifiable owners.
- Test before committing: Useful answers, unsupported answers and time to a correct decision.
- Failure to watch: A polished interface over poor information.
- Examples: Hybrid search; enterprise knowledge assistants.
- Evidence: [170], [181]; Practitioner view.
- Owner: Business process owner

#### IR-078 · Expert workflows and decision support · Intelligence: Trial · Enterprise: Test

In expert work, the assistant's job is to bring the evidence and conditions behind a decision into view and to keep disagreement visible, while the decision stays with the expert. Strong diagnostic results reported in the second half of 2026 still await clinical testing [92], and few cleared medical AI devices have measured patient outcomes [94]. A system can also standardise a mistaken or local expert habit. Compare decision quality, escalation and explanation across experience levels.

- Where it fits: Experienced staff who can adjudicate cases and define a safe scope.
- Test before committing: Decision quality, escalation and explanation across experience levels.
- Failure to watch: A system that spreads one expert's mistaken habit.
- Examples: Decision workbenches; expert adjudication panels.
- Evidence: [92], [94]; Practitioner view.
- Owner: Business process owner

#### IR-079 · Creative and synthetic media workflows · Intelligence: Trial · Enterprise: Revisit

Generated images, audio and video can serve marketing, training and communication within explicit rights, provenance and editorial review. Convincing media can mislead viewers or hide its origin. New EU AI Act transparency requirements began to apply on 2 August 2026 [49]; check which apply to your system and role (IR-092). The enterprise posture is Revisit for organisations that publish generated media without disclosure or a responsible publisher.

- Where it fits: Work with a responsible publisher and a clear intended audience.
- Test before committing: Factual representation, permissions, brand fit, accessibility and disclosure before release.
- Failure to watch: Convincing media that misleads or hides its origin.
- Examples: Image, audio and video generation.
- Evidence: [49], [171].
- Owner: Business process owner

#### IR-082 · Accessible and multilingual AI services · Intelligence: Trial · Enterprise: Test

Test a service with the people and languages it must serve, including people who use assistive technology and people who need the service in a minority language. For Irish services, test Irish-language provision where relevant, alongside regional accents and other languages users need. Aggregate quality can conceal exclusion for a smaller group, and public opinion on AI in services varies with the stakes: patients in one survey were comfortable with AI scribes for routine checks (48%) far more than for discussions of domestic abuse (23%) [108]. Keep a workable route for people who cannot or will not use the AI service.

- Where it fits: Public or customer services with diverse users and accessibility needs.
- Test before committing: Task completion with assistive technologies and each relevant language group.
- Failure to watch: Good average quality that hides exclusion.
- Examples: Tests in every language the service offers; accessible interfaces; non-AI alternatives.
- Evidence: [108], [171]; Practitioner view.
- Owner: Business process owner

#### IR-075 · Contact-centre automation · Intelligence: Evaluate · Enterprise: Revisit

Fully automated handling suits clearly bounded intents with reliable escalation, and the organisation must be able to monitor complete journeys. Deflection rates can disguise abandonment and unresolved problems. New York City proposed rules in the second half of 2026 that would require an easy route to a person in AI customer service [116]. The enterprise posture is Revisit for organisations that set deflection targets without measuring the journey's outcome.

- Where it fits: Organisations that can monitor complete journeys, beyond call deflection.
- Test before committing: Failed handoffs, repeat contacts, accessibility and complaint outcomes.
- Failure to watch: Deflection that disguises abandonment.
- Examples: Voice agents; intent routing.
- Evidence: [116]; Practitioner view.
- Owner: Business process owner

#### IR-077 · Process mining before automation · Intelligence: Evaluate · Enterprise: Test

Map the actual work, its exceptions and its handoffs before deciding what to delegate. Teams often disagree about the real process, and a formal process map may omit the actual bottleneck. Event logs help [205], but they omit the informal work that keeps a process running, so validate the data with the staff who do the work and compare the proposed process with real cases.

- Where it fits: Teams that disagree about the real process or its bottlenecks.
- Test before committing: Validate event data with staff; compare the proposed process with actual cases.
- Failure to watch: A log that misses the informal work holding the process together.
- Examples: Process discovery; workflow observation.
- Evidence: [205]; Practitioner view.
- Owner: Business process owner

#### IR-083 · Agent commerce and delegated purchasing · Intelligence: Evaluate · Enterprise: Watch

Platforms split in the second half of 2026 over whether to let agents shop. Amazon blocked Meta's Muse from shopping on its site [105]; Walmart opened a gateway for agents with spending limits and a returns guarantee "including when an agent doesn't act as intended" [102]; American Express admits customer agents only through approved channels [104]; two protocols compete [103, 161]. Explore purchasing agents only with clear limits, consent, reversibility and dispute handling. Wait on consumer personal agents with access to staff financial or corporate accounts until access controls and liability terms settle.

- Where it fits: A bounded purchase journey that can tolerate supervised testing.
- Test before committing: Incorrect orders, duplicate payments, refunds and authority limits.
- Failure to watch: Unclear responsibility for a loss.
- Examples: Commerce protocols; spend-capped purchasing agents.
- Evidence: [102], [103], [104], [105], [161].
- Owner: Business process owner

#### IR-084 · Organisation-wide productivity claims · Intelligence: Wait · Enterprise: Revisit

Withhold broad claims of return on investment until outcomes, full costs and comparison periods are credible. Surveys published in the first half of 2026 showed modest realised savings (nearly 40% of the firms in Bain's survey that measured savings realised 10% or less) and little change in employment [62, 83]. Activity and self-reported time saved are easily mistaken for value. Separate measured outcomes, reported savings and forecasts, and look for displaced work. The enterprise posture is Revisit for any business case that extrapolates from demonstrations, surveys or isolated wins.

- Where it fits: Business cases that extrapolate from demonstrations, surveys or isolated wins.
- Test before committing: Separate measured outcomes, reported savings and forecasts, including displacement.
- Failure to watch: Activity and self-reported time saved presented as realised value.
- Examples: Outcome studies; controlled or carefully matched comparisons.
- Evidence: [24], [62], [83].
- Owner: Business process owner

#### IR-080 · Human learning and apprenticeship · Intelligence: Prepare · Enterprise: Plan for

Redesign junior work so that assistance preserves the practice people need to become experts. Stanford's payroll study puts employment of 22 to 25-year-olds in the most AI-exposed occupations 19% below a comparison path, mainly through weaker hiring, though the estimate loses significance with all controls and Yale's Budget Lab finds no clear aggregate effect [77, 78]; inside Anthropic, junior technical hires fell from 27% to 9% of technical hiring [79]. Short-term output gains can weaken the pipeline of future reviewers, and verification depends on experienced people. Measure unaided competence and supervision load alongside throughput.

- Where it fits: Roles where AI changes the tasks through which people used to learn.
- Test before committing: Unaided competence and supervision load alongside throughput.
- Failure to watch: Short-term output gains that weaken the future pool of reviewers.
- Examples: Practice tasks; supervised rotations; capability assessments.
- Evidence: [77], [78], [79]; Practitioner view.
- Owner: Business process owner

#### IR-081 · AI literacy and supported adoption · Intelligence: Prepare · Enterprise: Revisit

Give staff practical training, permitted tools and a way to report failures and propose improvements. Use is often uneven and informal: 31% of UK workers who use generative AI do so without their employer's knowledge [75]. Observe real task choices and support needs; course attendance alone tells you little. The enterprise posture is Revisit for organisations whose policy rests on prohibition alone.

- Where it fits: Organisations where use is uneven or informal tools already shape work.
- Test before committing: Real task choices and support needs, observed in the work.
- Failure to watch: Training without workflow support.
- Examples: Role-specific learning; adoption support; an authorised route for staff.
- Evidence: [56], [75]; Practitioner view.
- Owner: Business process owner

### Dimension 8. Operations, economics and sovereignty (Control)

Running intelligence in live work is an operating discipline. In the second half of 2026, models were released and retired, the blended token price Ramp's customers paid fell by about a quarter in a month, and one provider set its introductory price to double after 30 November [23, 69]. The organisations that cope know what they run and who owns it, release model changes through evaluation gates, measure cost against accepted work, bound spending at the system boundary, rehearse supplier exit, and validate changes where regulation requires it. Many of its entries sit in the Prepare ring: readiness here is urgent while several technologies are still maturing.

#### IR-085 · AI service and dependency inventory · Intelligence: Use · Enterprise: Revisit

Know which models, tools, data flows and owners support each production capability. AI now sits inside products, teams and suppliers, and some of it arrives unannounced: 31% of UK workers who use generative AI do so without their employer's knowledge [75]. Shadow integrations escape change control and incident response. Trace one business outcome to every dependency and name the accountable owner. The enterprise posture is Revisit because, in Brightbeam's experience, most inventories list applications and miss the models and tools inside them.

- Where it fits: AI embedded in several products, teams or suppliers.
- Test before committing: Trace one business outcome to every dependency and its accountable owner.
- Failure to watch: Shadow integrations outside change control.
- Examples: AI service registers; dependency maps.
- Evidence: [75], [171]; Practitioner view.
- Owner: AI operations lead

#### IR-087 · Evaluation-gated releases and model retirement · Intelligence: Use · Enterprise: Plan for

Treat every model change as a release, with regression tests and an exit path. Nine major model releases arrived between 3 September and 26 October 2026 [15, 68, 69, 122, 123, 128 to 131], and hosted models can be changed or retired; in Brightbeam's experience, notice periods range from about 60 days to 12 months, and providers publish their schedules [188 to 192]. A compatible API can hide materially different behaviour. Keep prompts, harnesses and evaluations under version control, run the regression suite against each successor model, and rehearse the migration before a notice arrives.

- Where it fits: Hosted models or dependencies that can change or be retired.
- Test before committing: Rehearse a migration with realistic notice and an accepted fallback.
- Failure to watch: A compatible API with different behaviour.
- Examples: Release manifests; migration rehearsals; MLflow.
- Evidence: [15], [68], [69], [122], [123], [128 to 131], [184], [188 to 192].
- Owner: AI operations lead

#### IR-088 · Cost per accepted task and FinOps · Intelligence: Use · Enterprise: Test

Budget the whole system and report cost against accepted work. Cost per accepted task is the allocated cost of compute, tools, review, rework and operations for all attempts in a defined task cohort, divided by the unique tasks accepted from that cohort; report rejected, abandoned and escalated tasks beside it, and note that the ratio is undefined when no tasks are accepted. Use consistent allocation rules, state how setup costs and delayed acceptance are treated, and compare like tasks at the same quality threshold. Cheap tokens can sit inside an expensive workflow: token prices fell steeply in the second half of 2026 while some costs per task rose [23, 66, 67], and pricing moved towards consumption and outcomes [70, 126].

- Where it fits: Growing usage, or pricing that shifts from seats to consumption.
- Test before committing: Include idle capacity, retries, review, rework, support and failed tasks.
- Failure to watch: Cheap tokens inside an expensive workflow.
- Examples: Task ledgers; budgets; allocation tags.
- Evidence: [23], [66], [67], [70], [126].
- Owner: AI operations lead

#### IR-089 · Rate limits, queues and spend controls · Intelligence: Use · Enterprise: Plan for

Bound concurrency, retries and spending at the system boundary. Agents can loop, burst and nest tool calls, and OWASP lists unbounded consumption among the top risks for LLM applications [170]. A budget alarm that fires after the event can arrive too late. Usage-based billing spread from June 2026, from coding tools to enterprise platforms [70, 126], and one provider's introductory price doubles after 30 November 2026 [69]. Set caps per job profile, test runaway and outage scenarios, and make the service degrade gracefully.

- Where it fits: Agents that can generate loops, bursts or nested tool calls.
- Test before committing: Runaway and outage scenarios; verify limits and graceful degradation.
- Failure to watch: An alarm that arrives after the money is spent.
- Examples: Token and spend caps; backpressure; circuit breakers.
- Evidence: [69], [70], [126], [170].
- Owner: AI operations lead

#### IR-086 · Observability with purposeful traces · Intelligence: Trial · Enterprise: Test

Connect task outcomes, tool actions and failures so a team can diagnose problems across model and tool boundaries. Collect with a purpose: traces of everything create cost and a second sensitive dataset without improving diagnosis [193]. Open conventions for tracing generative AI are emerging [169], and evaluation platforms record traces alongside results [184]. Reconstruct a real incident from the traces, and check redaction, retention and permissions as you do.

- Where it fits: Teams that diagnose failures across model and tool boundaries.
- Test before committing: Reconstruct an incident; verify redaction, retention and permissions.
- Failure to watch: Traces that cost more than they explain.
- Examples: OpenTelemetry; MLflow traces.
- Evidence: [169], [184], [193].
- Owner: AI operations lead

#### IR-091 · Sovereignty beyond data residency · Intelligence: Evaluate · Enterprise: Revisit

Where processing happens is one part of control. Support access, key management, subprocessors, portability and the ability to operate independently matter as much, and data location alone leaves open whose courts can compel access: the US CLOUD Act, for example, clarifies that qualifying legal process can reach data in a covered provider's possession, custody or control, including data stored abroad [206]. Map them for each critical service. The enterprise posture is Revisit because many sovereignty decisions still stop at the hosting region.

- Where it fits: Architecture choices shaped by jurisdiction, strategic dependency or sensitive data.
- Test before committing: Map support access, keys, subprocessors, portability and independent operation.
- Failure to watch: Local hosting mistaken for control.
- Examples: Control assessments; hosting and key-management options.
- Evidence: [206]; Practitioner view.
- Owner: AI operations lead

#### IR-090 · Resilience and supplier exit · Intelligence: Prepare · Enterprise: Plan for

Test continuity in case a model, cloud region, tool provider or contract becomes unavailable. In the second half of 2026 a laboratory withheld a model [5], another disclosed a training pause of more than a month [37], and a GPU cloud's bonds traded at 81 cents on the dollar [33]. Several vendors can still depend on the same underlying infrastructure. Map who backs your provider's capacity, keep exit and assignment rights, and exercise fallback, degraded service and data export against a real time budget.

- Where it fits: Processes where a supplier outage matters.
- Test before committing: Exercise fallback, degraded service and data export with a real time budget.
- Failure to watch: Several suppliers that share one point of failure.
- Examples: Exit plans; fallback models; portable records.
- Evidence: [5], [33], [37], [155].
- Owner: AI operations lead

#### IR-093 · Validated change in regulated operations · Intelligence: Prepare · Enterprise: Plan for

Where quality, safety or model-risk systems already govern a process, separate the stable controls from the model components that change, and define the evidence each kind of change needs. A component remains subject to validation even when it is designed to be replaced. Classify a model update, demonstrate repeatable acceptance and rollback, and agree the classification with quality and compliance before the first update arrives.

- Where it fits: Processes already governed by quality, safety or model-risk systems.
- Test before committing: Classify a model update; demonstrate repeatable acceptance and rollback.
- Failure to watch: Replaceable components treated as exempt from validation.
- Examples: Change impact assessment; validation records.
- Evidence: [50]; Practitioner view.
- Owner: AI operations lead

#### IR-095 · National outcome evidence and sector benchmarks · Intelligence: Prepare · Enterprise: Plan for

Official statistics in the US, the EU and Ireland count the enterprises that use AI [72, 74, 186]; no public series the editors found measures what work AI completes, whether that work is accepted and what it costs. Build that evidence with shared definitions, protected data and independent review: sector case panels that publish denominators, sample selection, failure rates and accepted-work costs. National adoption programmes and regulators' supervisory experience provide a foundation for this work [56, 112]. Convenience samples can be mistaken for national performance.

- Where it fits: Partners who can contribute representative operational cases.
- Test before committing: Publish denominators, sample selection, failure rates and accepted-work costs.
- Failure to watch: Convenience samples presented as national performance.
- Examples: National adoption statistics; proposed sector case panels.
- Evidence: [56], [72], [74], [112], [186].
- Owner: AI operations lead

#### IR-096 · Continuous operation of AI systems · Intelligence: Prepare · Enterprise: Plan for

Deployed intelligence needs a standing cycle of observation, evaluation, authorised change and learning, with owners for quality, cost, incidents, knowledge updates and model changes. Systems drift, and feedback fades after the pilot. A new operating label achieves little without capacity and accountability.

- Where it fits: AI that is becoming part of ordinary operational work.
- Test before committing: Assign owners for quality, cost, incidents, knowledge updates and model changes.
- Failure to watch: A new label with no capacity behind it.
- Examples: Operational review cycles; named owners for quality, cost, incidents and model changes.
- Evidence: [188 to 192]; Practitioner view.
- Owner: AI operations lead

### Dimension 9. Compute and hardware (Capability)

Hardware sets the price, the speed and the availability of everything above it. In the second half of 2026 a second accelerator family became practical for inference, specialised chips made some models several times faster, GPU rental gained public price benchmarks with public daily indices, the largest independent GPU cloud's credit came under stress, and a memory shortage raised server prices and cut PC shipments by a fifth [208, 215, 221, 33, 236, 237]. Most organisations will rent their compute; the decisions that matter are what they commit to, with whom, and how portable their serving stays. Keep models portable across accelerators, price every reservation against the indices, assess counterparty risk in capacity contracts, and buy devices for their memory and their lifetime. Power, permission and location decide where capacity can go (IR-094).

#### IR-099 · Owning, renting and reserving GPU capacity · Intelligence: Use · Enterprise: Revisit

Price every reservation against the public indices, and fix utilisation before you add capacity. GPU rental gained public price benchmarks in the second half of 2026: Silicon Data's daily index put the neocloud H100 rate at $2.90 an hour on 28 October, its B200 index rose 27.6% between January and the start of September, and the premium hyperscalers charge for H100 time roughly halved [221, 222, 223]. CME planned futures settled on those indices [224], which give buyers a benchmark for invoices, renewals and reservation offers.

In one September survey, 81% of enterprises running AI in production said their GPUs sit idle at least half the time, and only 10% had a return verified by finance [225]; the sample was small and self-selected. Ownership suits steady, well-utilised or sovereign inference, and demand for owned capacity is strong: Dell booked a record $60.9bn of AI server orders in one quarter [226]. The enterprise posture is Revisit because many reservations and refresh plans were priced before this market formed.

- Where it fits: Sustained inference or fine-tuning demand that pay-per-token services serve expensively.
- Test before committing: Utilisation over a quarter, the indexed price for the same GPU and term, and cost per accepted task when you own, reserve or rent.
- Failure to watch: Reserved or owned GPUs that sit idle while the market price falls below the contract.
- Examples: Term and reserved capacity; spot markets; on-premises racks; Silicon Data indices and CME GPU futures.
- Evidence: [221], [222], [223], [224], [225], [226].
- Owner: Infrastructure and platform lead

#### IR-070 · Edge inference and on-device AI · Intelligence: Trial · Enterprise: Test

Run inference near the work when latency, connectivity, privacy or token cost makes a measurable difference: a factory floor, a vehicle, a clinic with poor connectivity, a developer's laptop. Local inference now reaches well beyond phones. On a laptop with 128 GB of memory, The Register measured a 35-billion-parameter mixture-of-experts model at 67.6 tokens a second; the graphics processor passed 90°C within an hour of sustained load, and the reviewer judged the cost case weak so far [244]. Platforms now let teams route each task to the device or the cloud: Windows ML runs llama.cpp across graphics, neural and central processors, and Google added structured output and early agent interfaces to its on-device Gemini Nano [239, 245]. An aggregate open-weight benchmark result [207] does not establish that a model will fit a particular device.

Running locally keeps model, update and device risks in place, and it does not by itself keep data private: in tests reported in October, a model promoted for local use tried, in fewer than one call in 100,000, to send a file to a cloud storage bucket abroad [246]. Treat local models as untrusted code, with containment, egress rules and monitoring (IR-034), and test thermal limits, updates, offline failure and local data exposure. The enterprise posture is Test because the tools shipped in the second half of 2026 and the cost case needs proving on your own work.

- Where it fits: Bounded tasks that must continue under limited network access, or that handle data the organisation prefers to keep on the device.
- Test before committing: Thermal limits, updates, offline failure, local data exposure and outbound connections, with cost per accepted task against the cloud.
- Failure to watch: Devices that drift out of date, overheat under sustained load or send data out unnoticed.
- Examples: Small and mixture-of-experts models; edge accelerators; Windows ML, Apple Core AI and Gemini Nano; llama.cpp.
- Evidence: [207], [239], [244], [245], [246]; Practitioner view.
- Owner: Infrastructure and platform lead

#### IR-098 · Inference-specialised hardware · Intelligence: Trial · Enterprise: Test

Buy speed as a service, and check accuracy on your own tasks. Chips built for inference now generate tokens markedly faster for some open models, which matters for coding agents, voice and other work where people wait. Nvidia put its Groq 3 LPX into full production, citing 3,400 output tokens a second on one 31-billion-parameter model [215]; that result needs at least 64 of its chips, against one or two of Cerebras's wafer-scale processors for the same model [216]. Cerebras's cloud revenue nearly quadrupled on a year earlier, at a gross margin of 14% [217]. Independent benchmarks barely cover the field: the latest MLPerf inference round drew a record 30 submitters, none of them Cerebras, Groq or SambaNova [214].

Speed and accuracy can diverge at the endpoint: Artificial Analysis found the same open-weight model scoring 22% on a tool-calling test at some providers, against 37% for the reference [218]. The field is consolidating into the largest chip makers, and some vendors depend on a few customers and fresh capital: Nvidia licensed Groq's technology, AMD agreed to buy Taalas, and Groq raised money twice in under three months [216, 219, 220]. Pilot latency-bound work through APIs, and avoid hardware purchases or long prepaid commitments with these vendors for now. The enterprise posture is Test because the gain is real for some work and needs proving on yours.

- Where it fits: Latency-bound work, such as coding agents, voice and interactive search, on the open-weight models these services support.
- Test before committing: Speed, accuracy against a reference endpoint and cost per accepted task on your own prompts, measured through each provider's API.
- Failure to watch: A fast endpoint that loses accuracy through its serving settings, or a supplier that fails during a prepaid contract.
- Examples: Groq 3 LPX and GroqCloud; Cerebras; SambaNova; Etched; d-Matrix; disaggregated prefill and decode.
- Evidence: [214], [215], [216], [217], [218], [219], [220].
- Owner: Infrastructure and platform lead

#### IR-094 · Compute capacity, energy and location · Intelligence: Evaluate · Enterprise: Watch

Plan infrastructure around measured demand, availability and local constraints. In the United States, a capacity auction cleared short of its reliability requirement [43]. Oracle served a force majeure notice on a Stargate campus in New Mexico after state officials refused rights of way for its gas supply [231]. In Ireland, data centres used about 23% of metered electricity in 2025, and new data centres of 10 MVA or more must now bring matching dispatchable generation or storage [44, 45]; most adults there want building stopped for now [46]. Data-centre electricity figures include demand unrelated to AI. Treat permission, power and community terms as delivery risks with their own timelines when choosing regions and providers.

- Where it fits: Plans for dedicated capacity or a large inference workload.
- Test before committing: Utilisation, power assumptions, grid dependencies and alternatives.
- Failure to watch: Capacity plans that ignore permission and grid timelines.
- Examples: Capacity scenarios; workload scheduling.
- Evidence: [43], [44], [45], [46], [231].
- Owner: Infrastructure and platform lead

#### IR-097 · Accelerators beyond a single vendor · Intelligence: Evaluate · Enterprise: Test

Prove a second accelerator family on your own workloads before you rely on it. Running inference beyond a single vendor's platform became practical in the second half of 2026: Alphabet named sales of TPU systems as a meaningful contributor to Google Cloud's 103% revenue growth [208], AMD put its Helios racks into production, with OpenAI bringing them online from the fourth quarter and Anthropic planning up to 2 GW [209], and native PyTorch backends for Google's TPUs and AWS Trainium shipped in October; the Trainium backend, a public beta, still skips about 22,000 PyTorch tests [210, 211].

Measured results vary by model, precision and serving software. SemiAnalysis measured TPUv7 at up to 50% better performance per dollar than Nvidia's B200 and B300 when serving one large model at FP8, while Nvidia kept the lead at FP4 and was up to five times more cost-efficient than AMD on one agentic coding benchmark [212, 213]. Much of AMD's new capacity arrives from the fourth quarter of 2026 into 2027 [209]. Keep serving code on portable layers, benchmark one production workload on a second accelerator through a cloud, and ask for second-source options in 2027 capacity contracts. The enterprise posture is Test because the gap between platforms depends on your model and your serving engine as much as on the chip.

- Where it fits: Inference large enough that price per token, supply or dependence on one vendor matters, on open-weight or portable models.
- Test before committing: Accuracy and cost per accepted task for one production workload on each candidate accelerator, with the same model, precision and serving engine.
- Failure to watch: A headline benchmark that matches neither your model, your precision nor your serving engine.
- Examples: Google TPU (Ironwood); AWS Trainium; AMD Instinct and Helios; Microsoft Maia; PyTorch, vLLM and SGLang; TorchTPU and TorchNeuron.
- Evidence: [208], [209], [210], [211], [212], [213].
- Owner: Infrastructure and platform lead

#### IR-102 · AI PCs and NPUs in the fleet · Intelligence: Evaluate · Enterprise: Revisit

Buy business laptops for their security, lifetime and memory, and treat the neural processing unit (NPU) as a side benefit for now. NPU-equipped machines are becoming the default business specification: Microsoft says over 40% of laptops being built for business are Copilot+ PCs, and HP said AI PCs made up 46% of its shipments in its latest quarter [239, 240]. The Windows features that would put the NPU to regular use are still to arrive [239], and studies of mobile chips disagree on where NPUs speed up language models, with energy use that depends heavily on configuration [241, 242]. The memory shortage now sets the price and timing of hardware refreshes: PC shipments fell 20.1% in the third quarter, and IDC expects no relief until early 2028 [237, 243].

Fund high-memory machines for local models (64 to 128 GB) separately, for named roles, and justify them with measured savings: the first independent test of such a laptop found usable speed, heat under sustained load and a weak cost case so far [244]. The enterprise posture is Revisit because refresh plans and device budgets set before the memory shortage understate today's costs.

- Where it fits: Laptop and desktop refreshes, and roles that run models locally, such as developers and analysts.
- Test before committing: Measured token savings, battery life and heat for local models on one team's real work, against the extra cost per device.
- Failure to watch: A premium paid for an NPU that no application uses, or a refresh priced before the memory shortage.
- Examples: Copilot+ PCs; Apple M6 and M5 Ultra; Intel Core Ultra Series 3; AMD Ryzen AI Max; Nvidia RTX Spark; Windows ML and Apple Core AI.
- Evidence: [237], [239], [240], [241], [242], [243], [244].
- Owner: Infrastructure and platform lead

#### IR-100 · GPU cloud and capacity-contract risk · Intelligence: Prepare · Enterprise: Plan for

Assess counterparty risk in every capacity contract. In October, credit markets priced a material chance that the largest independent GPU cloud would default within five years: CoreWeave's bonds traded at 81 cents on the dollar, and its credit default swaps reached a record of about 1,195 basis points [33, 155, 227]. CoreWeave reported a revenue backlog of about $104bn that depends on meeting delivery requirements, with 1.5 GW of active power against 3.7 GW contracted [228]. Much of the sector's funding is circular: Nvidia guarantees $3.5bn of its AI cloud partners' lease obligations, and AMD is investing in Anthropic while supplying its chips [229, 230]. Oracle served a force majeure notice on a Stargate campus whose gas supply had been refused rights of way [231].

Avoid large prepayments; negotiate termination, step-in and data-return rights; read what backlog conditions and force majeure clauses let a provider delay; and keep a tested second provider for critical inference. The enterprise posture is Plan for because supplier failure is now a scenario to plan for for any organisation that depends on rented capacity.

- Where it fits: Organisations that rent dedicated GPU capacity or depend on one provider for critical inference.
- Test before committing: Exit and step-in terms, the provider's financing and power status, and a timed failover to a second provider.
- Failure to watch: A prepaid or long-term contract with a provider that cannot deliver, and no tested route to another.
- Examples: Neocloud and hyperscaler capacity contracts; escrow, step-in and data-return clauses; routing inference across providers.
- Evidence: [33], [155], [227], [228], [229], [230], [231].
- Owner: Infrastructure and platform lead

#### IR-101 · Memory supply and hardware prices · Intelligence: Prepare · Enterprise: Plan for

Allow for higher hardware and cloud prices through 2027. Memory makers report supply committed for years: Micron's quarterly revenue reached $54.2bn against $11.3bn a year earlier, and SK hynix said its HBM and other DRAM are sold out through 2029 [232, 233]. TrendForce forecast contract prices for DRAM up 10% to 15% and for NAND up 15% to 20% in the fourth quarter, and HBM's average price up 121% in 2027 [234, 235]. The effects reached buyers: memory and storage prices lifted server prices as data-centre capital spending grew 92% in the second quarter, and PC shipments fell 20.1% in the third [236, 237]. A second phase of US semiconductor tariffs that could reach data-centre servers was in preparation [238].

Lengthen refresh cycles where you can, secure supply early through supplier agreements, and favour memory-efficient serving: quantisation, smaller models and careful management of the cache that long contexts consume (IR-010, IR-002). The enterprise posture is Plan for because budgets set before the shortage understate what hardware now costs.

- Where it fits: Hardware refreshes, on-premises AI capacity and cloud budgets for 2027.
- Test before committing: Current quotes and lead times for the configurations you plan, and the memory each workload needs at its target precision.
- Failure to watch: A refresh or capacity plan priced on last year's memory costs.
- Examples: HBM, DRAM and enterprise SSD contracts; supplier agreements with deposits; quantisation and cache offload.
- Evidence: [232], [233], [234], [235], [236], [237], [238].
- Owner: Infrastructure and platform lead

## The sector lens

How The Intelligence Radar reads in six sectors: the rules that bind there, with their dates; three entries to start with; the entries placed differently there, each with its reason and primary sources; and what to hold back. Elsewhere, an entry's labels hold as the catalogue gives them. The rules are the EU's unless a card says otherwise; check national measures, and your organisation's role, before applying a date (IR-092).

### The sector lens: Financial services (Banking, payments and lending)

Explain every credit decision, and plan the exit from every AI supplier.

What binds:
- From 20 November 2026, when a consumer credit assessment involves automated processing, the consumer can ask for a person to step in: an explanation of the logic, a chance to give their view, and a review of the decision. Mortgage-secured credit and loans above €100,000 fall outside the directive. [253]
- AI that scores people's creditworthiness is high-risk under the AI Act, and a lender must assess its impact on fundamental rights before using it; AI that detects financial fraud falls outside that category. These obligations apply from 2 December 2027, and to systems already in use once they change significantly. [254, 49, 271]
- DORA has applied to financial entities since 17 January 2025: a register of every ICT supplier arrangement, and exit strategies for services behind critical or important functions. An AI service bought in is usually an ICT service. The first critical ICT providers were designated for direct EU oversight on 18 November 2025. [255, 256]

Start with:
- IR-085 AI service and dependency inventory: Put every AI service and model provider in your DORA register of information.
- IR-061 Classical tabular ML baselines: Keep an explainable baseline beside every credit model you change.
- IR-032 Human approval and takeover: Give whoever reviews a contested credit decision the record and the authority to change it.

Placed differently here:
- IR-062 Tabular foundation models: Intelligence Evaluate, Enterprise Watch here (elsewhere Trial and Test). Credit decisions about people are high-risk under the AI Act, and a consumer can ask for any automated assessment to be explained. Treat a model you cannot explain as not ready for them. [253, 254]
- IR-043 Structured oversight records: Intelligence Evaluate, Enterprise Test here (elsewhere Evaluate and Plan for). The explanation and review a consumer can ask for from 20 November 2026 depend on a record of how each assessment was made. Test that record now. [253]
- IR-090 Resilience and supplier exit: Intelligence Prepare, Enterprise Revisit here (elsewhere Prepare and Plan for). DORA already requires exit strategies for ICT services behind critical or important functions. Check that your AI suppliers are in them. [255]

Hold back:
- IR-048 High-stakes autonomous decisions: A consumer can ask for a person to explain and review any automated assessment: keep someone ready, with the record and the authority to change it, for every credit decision about a person. [253]

Entries that matter most here: IR-013, IR-021, IR-032, IR-037, IR-038, IR-043, IR-044, IR-048, IR-053, IR-054, IR-061, IR-062, IR-067, IR-074, IR-078, IR-085, IR-087, IR-090, IR-092, IR-093, IR-103.

### The sector lens: Insurance (Life, health and general insurance)

Price without proxies, and keep a person on every refusal.

What binds:
- AI that assesses risk and sets prices for individuals in life and health insurance is high-risk under the AI Act, and an insurer must assess its impact on fundamental rights before using it. These obligations apply from 2 December 2027, and to systems already in use once they change significantly. [254, 49, 271]
- Since 21 December 2012, a person's sex may not lead to different premiums or benefits in the EU. [257]
- For AI outside the high-risk class, such as claims handling, fraud detection and pricing outside life and health, EIOPA's Opinion of 6 August 2025 sets out what Solvency II and the Insurance Distribution Directive already expect: data governance, records, fairness, explainability and human oversight, in proportion to the risk. [258]

Start with:
- IR-016 Document parsing and OCR: Start with claims and policy documents, checking every extraction against the page.
- IR-061 Classical tabular ML baselines: Keep an explainable baseline beside every pricing and claims model.
- IR-053 Drift, slices and uncertainty: Watch pricing and claims outcomes by customer group, so drift and unfair outcomes show early.

Placed differently here:
- IR-062 Tabular foundation models: Intelligence Evaluate, Enterprise Watch here (elsewhere Trial and Test). Pricing life and health cover for individuals is high-risk from December 2027, and sex may not move a premium. Treat a pricing model you cannot explain, or cannot test for proxies of sex, as not ready. [254, 257]
- IR-043 Structured oversight records: Intelligence Evaluate, Enterprise Test here (elsewhere Evaluate and Plan for). EIOPA expects records of AI systems in proportion to their risk, and life and health pricing needs an impact assessment from December 2027. Test that a real underwriting decision can be reconstructed from its record. [258, 254]
- IR-090 Resilience and supplier exit: Intelligence Prepare, Enterprise Revisit here (elsewhere Prepare and Plan for). DORA applies to most insurers and reinsurers: exit strategies for ICT services behind critical or important functions already apply. Check that your AI suppliers are in them. [255]

Hold back:
- IR-048 High-stakes autonomous decisions: People can contest a decision made solely by automated processing and ask for a person to step in. Keep someone who can explain and change the outcome ready for every refusal of cover and every claim denial. [259]

Entries that matter most here: IR-004, IR-013, IR-016, IR-021, IR-032, IR-043, IR-044, IR-048, IR-053, IR-061, IR-062, IR-064, IR-066, IR-067, IR-074, IR-075, IR-085, IR-090, IR-092, IR-103.

### The sector lens: Pharma and biotech (Discovery, clinical trials and manufacturing)

Explore freely in discovery; freeze and validate models in critical GMP uses.

What binds:
- AI built and used only for scientific research and development is outside the AI Act. Where AI produces evidence about a medicine, EMA and the FDA's joint principles of January 2026 ask for a defined context of use, validation in proportion to risk, traceable data and monitoring for drift. [254, 262]
- GMP already requires computerised systems in manufacturing to be validated, with every change controlled. The July 2025 draft of a GMP annex on AI would allow only static models with deterministic outputs in critical uses; since its consultation, EMA has been weighing a risk-based route, with guardrails, for generative AI. [260, 261, 272]
- The revised good clinical practice guideline, ICH E6(R3), has applied in the EU since 23 July 2025: computerised systems in a trial are validated in proportion to their risk to participants and to the reliability of results. [263]

Start with:
- IR-066 Computer vision for inspection: Start with visual inspection, and require the model to match or beat the manual inspection it replaces.
- IR-061 Classical tabular ML baselines: Use strong classical models on process data first; the draft GMP annex is written for static models.
- IR-085 AI service and dependency inventory: List every model in your GMP and clinical systems, with its intended use, owner and supplier.

Placed differently here:
- IR-069 Scientific discovery with AI: Intelligence Trial, Enterprise Test here (elsewhere Evaluate and Plan for). In drug discovery every candidate meets an assay, and then a trial, before it reaches a patient, and research-only AI is outside the AI Act. An AI-discovered target and molecule went through a small randomised phase 2a trial, reported in 2025. Run a bounded discovery pilot with a budget for verification. [254, 264]
- IR-093 Validated change in regulated operations: Intelligence Prepare, Enterprise Revisit here (elsewhere Prepare and Plan for). GMP already puts every change to a computerised system under control, and the draft AI annex asks for each change to a model, its system or its inputs to be assessed for retesting. Check how your change control classifies a model update now. [260, 261]

Hold back:
- IR-073 Document drafting and analysis assistants: Keep generative AI out of critical GMP applications until the AI annex settles how it may be used; elsewhere, trained staff stay responsible for every output. [261, 272]
- IR-023 Synthetic data for gaps and testing: Avoid generating test data or labels for a model in a critical GMP use: the draft annex does not recommend it, and asks for test data kept apart from training. [261]

Entries that matter most here: IR-004, IR-016, IR-021, IR-022, IR-023, IR-032, IR-040, IR-043, IR-047, IR-053, IR-061, IR-064, IR-066, IR-068, IR-069, IR-073, IR-078, IR-085, IR-087, IR-092, IR-093.

### The sector lens: Medtech (Medical devices and diagnostics)

Treat every model update as a device change.

What binds:
- Software with a medical purpose that informs diagnosis or treatment decisions is at least class IIa under the Medical Devices Regulation, so it needs a notified body's assessment. In-vitro diagnostic software is classed under its own regulation. [265]
- AI that is such a device, or a safety component of one, is also high-risk under the AI Act from 2 August 2028. For AI that keeps learning after release, changes the maker pre-determined at the first conformity assessment can then ship without a new one. [254, 49]
- In the US, a device's authorised predetermined change control plan lets the maker release the planned changes without a new marketing submission for each one. [266]

Start with:
- IR-085 AI service and dependency inventory: List every AI function across your devices and quality system, with its intended purpose and class.
- IR-053 Drift, slices and uncertainty: Track real-world performance by patient group and site; post-market surveillance expects it.
- IR-087 Evaluation-gated releases and model retirement: Gate every model release on a fixed validation set, and keep the previous version ready to restore.

Placed differently here:
- IR-078 Expert workflows and decision support: Intelligence Evaluate, Enterprise Plan for here (elsewhere Trial and Test). Decision support that informs diagnosis or treatment is a medical device of class IIa or higher. Plan its certification, clinical evaluation and post-market surveillance before placing it on the market. [265]
- IR-058 Governed learning releases: Intelligence Evaluate, Enterprise Test here (elsewhere Evaluate and Plan for). Behaviour a device's AI learns in use is a device change. Without a new review it can ship only within a plan agreed in advance: an authorised change control plan in the US, and from August 2028 changes pre-determined under the AI Act in the EU. Anything else goes back to the notified body or the FDA. Test your release process against such a plan now. [254, 266, 265]
- IR-093 Validated change in regulated operations: Intelligence Prepare, Enterprise Revisit here (elsewhere Prepare and Plan for). A change that could affect a certified device's safety or performance already needs the notified body's approval. Check how your quality system classifies a model update before the next one ships. [265]

Hold back:
- IR-023 Synthetic data for gaps and testing: Never count generated data as clinical evidence: under the Medical Devices Regulation, clinical data come from the use of the device or of an equivalent one. Validate on real data. [265]

Entries that matter most here: IR-004, IR-016, IR-021, IR-023, IR-032, IR-040, IR-042, IR-043, IR-044, IR-047, IR-048, IR-053, IR-058, IR-066, IR-070, IR-078, IR-085, IR-087, IR-092, IR-093, IR-103.

### The sector lens: Manufacturing (Machinery, connected products and factories)

Keep self-learning models out of safety functions, and own the software you ship.

What binds:
- From 20 January 2027, machinery whose safety functions rely on self-evolving machine learning, and safety components that do, need a notified body's conformity assessment. The AI Act's requirements for AI in machinery will come through the Machinery Regulation, in delegated acts that apply by 2 August 2028. [267, 271]
- Since 11 September 2026, manufacturers must report actively exploited vulnerabilities and severe incidents in their products with digital elements. The rest of the Cyber Resilience Act applies to products placed on the market from 11 December 2027, including due diligence on components from third parties, open source among them. [268]
- For products placed on the market after 9 December 2026, EU product liability covers software, AI systems included: a product's ability to keep learning counts when judging a defect, and a manufacturer stays liable for defects from software updates, or missing ones, within its control. [269]

Start with:
- IR-066 Computer vision for inspection: Start on one line with a known cost per missed defect, and test lighting, camera changes and rare faults on the real line.
- IR-063 Time-series foundation models: Forecast demand, maintenance and energy against seasonal baselines, and score the peaks.
- IR-065 Optimisation and constraint solvers: Plan schedules with a solver, and let a language model help people state the problem and read the plan.

Placed differently here:
- IR-042 AI supply-chain verification: Intelligence Prepare, Enterprise Revisit here (elsewhere Prepare and Plan for). Reporting of actively exploited vulnerabilities in products with digital elements has applied since 11 September 2026, and due diligence on components follows in December 2027. Re-examine how you track the models and libraries inside the products you sell. [268]
- IR-070 Edge inference and on-device AI: Intelligence Trial, Enterprise Plan for here (elsewhere Trial and Test). A product you sell with AI running in it is a product with digital elements under the Cyber Resilience Act, unless sector rules such as those for medical devices cover it, and from 9 December 2026 new products fall under the new liability rules. Plan security updates and support periods before you ship. [268, 269]

Hold back:
- IR-071 Robotics and vision-language-action systems: Keep self-learning models out of safety functions: from 20 January 2027, machinery whose safety functions rely on self-evolving machine learning needs a notified body's assessment. [267]

Entries that matter most here: IR-004, IR-016, IR-022, IR-042, IR-045, IR-053, IR-061, IR-063, IR-064, IR-065, IR-066, IR-068, IR-070, IR-071, IR-072, IR-077, IR-085, IR-086, IR-090, IR-093, IR-096.

### The sector lens: Public services (Benefits, services and public bodies)

Explain every decision about a person, and keep the service open to everyone.

What binds:
- AI social scoring that leads to unjustified or unrelated harmful treatment of people has been banned in the EU since 2 February 2025, for public bodies and companies alike. [254]
- From 2 December 2027, AI used by or for public authorities to assess eligibility for essential public benefits and services, healthcare included, or to grant, reduce, revoke or reclaim them, is high-risk: before using it, a public body must assess its impact on fundamental rights and register the use in the EU database. Systems already in use must comply by 2 August 2030. [254, 49, 271]
- Public sector websites and mobile apps must be perceivable, operable, understandable and robust, a duty in force since 2019 for newer websites, 2020 for the rest and 2021 for apps. An AI assistant a public body puts on them is held to the same duty. [270]

Start with:
- IR-085 AI service and dependency inventory: Keep a register of every AI system in use, with its owner; impact assessments and EU database entries start from it.
- IR-076 Enterprise search and knowledge assistance: Help staff find policy and case guidance, with permissions applied and sources shown.
- IR-073 Document drafting and analysis assistants: Draft letters and summaries that a caseworker checks against the file.

Placed differently here:
- IR-082 Accessible and multilingual AI services: Intelligence Trial, Enterprise Revisit here (elsewhere Trial and Test). Accessibility duties for public websites and apps already apply, and an AI assistant on them is no exception. Re-examine the ones you run with the people and assistive technologies they must serve. [270]
- IR-043 Structured oversight records: Intelligence Evaluate, Enterprise Test here (elsewhere Evaluate and Plan for). An explanation on request depends on a record of how each decision was made, and the impact assessment on records of how the system is used. Test that a real case can be reconstructed from its record before December 2027. [254, 49]

Hold back:
- IR-048 High-stakes autonomous decisions: Keep a caseworker who can explain and change the outcome in every decision about a benefit or service: a person affected by a decision with legal or similarly significant effects can ask for an explanation of the AI's role. [254]

Entries that matter most here: IR-005, IR-013, IR-021, IR-032, IR-043, IR-044, IR-048, IR-053, IR-073, IR-074, IR-075, IR-076, IR-081, IR-082, IR-085, IR-090, IR-091, IR-092, IR-103.

### Smaller organisations, in any sector: start with one workflow and one owner.

Begin with document assistance (IR-073), search (IR-076) or a predictive baseline (IR-061), and count the cost of supervision and support before expanding (IR-088). Drawn from Brightbeam's delivery experience.

## Method: How this edition was built

Evidence base. Public sources, each at a stated scope, set out by kind of source on the Sources page; Brightbeam's published research and newsletter archive; and Brightbeam's internal discussion and research forum, where practitioners bring what they have read, tested and seen in their work. Views from that forum appear in entries as practitioner views. Figures marked Reported await a primary check.

Selection. For the themes and the account of the period, the editors asked of every claim whether it could have been written before the period began; where it could, they dropped it or rewrote it around the specific development. Catalogue entries also draw on established practice and earlier evidence, which the entries date.

Labels. Evidence layers distinguish Measured, Documented, Demonstrated, Reported, Proposed and Opinion. These describe the type of evidence. A measured result may still be vendor-reported, narrowly sampled or unreplicated. Every catalogue entry carries an intelligence label (Use, Trial, Evaluate, Wait or Prepare) and an enterprise label (Revisit, Test, Plan for or Watch). The enterprise judgements on the Enterprise track each carry a condition, the evidence, an action, a trade-off and a trigger to review them.

The catalogue. The research team proposes each placement. Practitioners challenge the placements, and specialists check the material claims and labels. Entries that cite Brightbeam's work say so.

Corrections. Corrections will be recorded with their effect on any conclusion.

## Sources

One register serves all of The Intelligence Radar. Kinds of source and the scope at which each is read:

- Official document: Read as the primary record of the decision, statistic or rule it states.
- Regulatory filing: Read for the stated figures and disclosures; company filings are the company's own account.
- Academic paper: Read for the stated method and result; preprints await peer review.
- Organisation publication: An organisation's own account of its products, incidents, data or research; interested parties are named in the text.
- Technical documentation: Read to establish what a technology or standard does; documentation establishes capability, and outcomes need local testing.
- Dataset or benchmark: Read to establish the benchmark's scope; benchmark results need confirming on your own data.
- Standard: Read to establish the framework or principles the standard sets out.
- News report: A second-hand account; claims marked Reported await a primary check.
- Brightbeam publication: Brightbeam's own work, labelled by its stage (Proposal, Demonstration, Reported or Measured result).

1. OpenAI, Hugging Face model evaluation security incident. https://openai.com/index/hugging-face-model-evaluation-security-incident/ (Organisation publication)
2. METR, Hugging Face incident report (August 2026). https://metr.org/hugging-face-incident-report-aug-2026.pdf (Organisation publication)
3. Hugging Face, agent intrusion technical timeline. https://huggingface.co/blog/agent-intrusion-technical-timeline (Organisation publication)
4. OpenAI, an agent used DNS to reach an external chatbot. https://alignment.openai.com/misalignment-reports/an-agent-used-dns-to-reach-an-external-chatbot/ (Organisation publication)
5. CNBC, OpenAI abandons plan to release upcoming model (28 September 2026). https://www.cnbc.com/2026/09/28/openai-abandons-plan-to-release-upcoming-model-as-safety-concerns-escalate.html (News report)
6. OpenAI, securing our frontier model training environment, as reported by The Hacker News. https://openai.com/index/securing-our-frontier-model-training-environment/;  https://thehackernews.com/2026/10/openai-ai-agents-demonstrate-vm-escapes.html (Organisation publication)
7. Anthropic, investigating unintended model actions. https://www.anthropic.com/research/investigating-unintended-model-actions; Axios, Georgia vote data (25 October 2026). https://www.axios.com/2026/10/25/anthropic-claude-georgia-voter-data (Organisation publication)
8. METR, red-teaming OpenAI agent monitoring (22 October 2026). https://metr.org/blog/2026-10-22-red-teaming-openai-agent-monitoring/ (Organisation publication)
9. UK AI Security Institute, investigating alignment failures in AISI's incident (23 October 2026). https://www.aisi.gov.uk/blog/investigating-alignment-failures-in-aisis-incident (Official document)
10. OpenAI, misalignment incident reports. https://alignment.openai.com/misalignment-reports/retrieving-server-secrets-and-bypassing-authorization-on-a-government-statistics-website/ (Organisation publication)
11. Wikimedia Foundation, OpenAI rogue agent activities found on Wikimedia projects (5 October 2026). https://wikimediafoundation.org/news/2026/10/05/openai-rogue-agent-activities-found-on-wikimedia-projects/ (Organisation publication)
12. European Commission, speech by Executive Vice-President Virkkunen (9 October 2026). https://ec.europa.eu/commission/presscorner/detail/en/speech_26_2148 (Official document)
13. Anthropic, investigating incidents in cybersecurity evaluations. https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals (Organisation publication)
14. Narayanan and Kapoor, AI as normal technology. https://www.normaltech.ai/p/the-ai-as-normal-technology-view (News report)
15. OpenAI, GPT-6 Astra. https://openai.com/index/gpt-6-astra/ (Organisation publication)
16. OpenAI, GPT-6 Astra deployment safety. https://deploymentsafety.openai.com/gpt-6-astra/forecasting-misaligned-behavior-with-deployment-simulation-of-internal-codex-traffic (Organisation publication)
17. 9to5Google, OpenAI Dots (29 September 2026). https://9to5google.com/2026/09/29/openai-dots-agent/ (News report)
18. TestingCatalog, OpenAI rolls out GPT-6 with Intelligent UI in ChatGPT. https://www.testingcatalog.com/openai-rolls-out-gpt-6-with-intelligent-ui-in-chatgpt/ (News report)
19. Let's Data Science, Claude Duet research preview. https://letsdatascience.com/news/anthropic-opens-claude-duet-research-preview-for-proactive-a-16522f5d (News report)
20. Meta, introducing Muse. https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/ (Organisation publication)
21. Anthropic, measuring the pace of AI development. https://www.anthropic.com/institute/measuring-pace-of-ai-development (Organisation publication)
22. Epoch AI, OpenAI coding-agent spending. https://epoch.ai/data-insights/openai-coding-agent-spending (Organisation publication)
23. Ramp, AI Index. https://ramp.com/data/ai-index (Organisation publication)
24. The Next Web, Web Summit State of the Industry survey. https://thenextweb.com/news/ai-workload-web-summit-state-of-the-industry-survey (News report)
25. AI use disclosed in arXiv mathematics submissions, March to August 2026. https://arxiv.org/html/2608.24961v1 (Academic paper)
26. Microsoft Research, solving the KLS conjecture. https://www.microsoft.com/en-us/research/blog/solving-a-31-year-old-grand-challenge-in-mathematics-the-kls-conjecture/;  https://arxiv.org/abs/2610.01447;  https://arxiv.org/abs/2610.01447v2 (Academic paper)
27. OpenAI mathematics manuscripts. https://github.com/openai/math; coverage: https://rits.shanghai.nyu.edu/ai/openai-drops-722-math-manuscripts-from-an-unreleased-model/ (Organisation publication)
28. OpenAI, building scientific understanding with academic communities. https://openai.com/index/building-scientific-understanding-with-academic-communities/; Anthropic formal-math (ETH). https://github.com/anthropics/formal-math/tree/main/eth; TechCrunch (27 October 2026). https://techcrunch.com/2026/10/27/frontier-ai-labs-say-their-models-refuted-the-exponential-time-hypothesis-what-does-that-mean/ (Organisation publication)
29. OpenAI, Navier-Stokes manuscript. https://cdn.openai.com/pdf/32d9f210-8b73-45e0-91bc-82a30aef8a9a/navier-stokes.pdf (Organisation publication)
30. SEC company facts: Microsoft https://data.sec.gov/api/xbrl/companyfacts/CIK0000789019.json; Alphabet https://data.sec.gov/api/xbrl/companyfacts/CIK0001652044.json; Amazon https://data.sec.gov/api/xbrl/companyfacts/CIK0001018724.json; Meta https://data.sec.gov/api/xbrl/companyfacts/CIK0001326801.json (Regulatory filing)
31. Meta, third-quarter 2026 results. https://www.sec.gov/Archives/edgar/data/0001326801/000162828026066700/meta-09302026xexhibit991.htm (Regulatory filing)
32. Reuters (via Global Banking and Finance), Meta stock offering. https://www.globalbankingandfinance.com/meta-launches-35-billion-stock-offering-fund-ai-expansion/ (News report)
33. MarketWatch (via Yahoo Finance), CoreWeave bonds. https://finance.yahoo.com/markets/options/articles/coreweave-ai-bonds-tumble-raising-111700097.html (News report)
34. Bank of England, Financial Policy Committee record, September 2026. https://www.bankofengland.co.uk/-/media/boe/files/financial-policy-committee-record/2026/fpc-summary-and-record-september-2026 (Official document)
35. IMF, Global Financial Stability Report, October 2026. https://www.imf.org/en/publications/gfsr/issues/2026/10/13/global-financial-stability-report-october-2026;  https://www.imf.org/en/blogs/articles/2026/10/12/global-financial-markets-face-rising-risks-from-ai-bond-yields-and-cyberattacks (Official document)
36. The Next Web, Gartner on AI infrastructure impairment. https://thenextweb.com/news/gartner-ai-infrastructure-spending-3-5-trillion-write-down-neoclouds (News report)
37. Anthropic, Form S-1. https://www.sec.gov/Archives/edgar/data/0002130357/000162828026067168/anthropicpbc-sx1.htm; Forbes. https://www.forbes.com/sites/the-prompt/2026/10/27/inside-anthropics-ipo-prospectus-revenue-losses-and-surprising-details/; Fortune. https://fortune.com/2026/10/26/anthropic-s1-risk-factors-existential-risk-pentagon-dario-amodei/ (Regulatory filing)
38. ASML, third-quarter 2026 results. https://www.sec.gov/Archives/edgar/data/0000937966/000162828026065813/pressreleasefinancialresul.htm (Regulatory filing)
39. Texas governor's directive. https://gov.texas.gov/uploads/files/press/Thomas_Gleeson_Pablo_Vegas_Data_Centers_Directive_Letter_to_PUCT_ERCOT_August_2026_.pdf; US EIA. https://www.eia.gov/pressroom/releases/press591.php (Official document)
40. Virginia governor, Executive Order 22. https://www.governor.virginia.gov/newsroom/news-releases/2026/september-releases/name-1123696-en.html (Official document)
41. The Verge, California data-centre bills. https://www.theverge.com/ai-artificial-intelligence/998453/california-ai-data-center-bills (News report)
42. Virginia Business, Amazon cancels Ashburn data centres. https://virginiabusiness.com/amazon-cancels-data-centers-for-gw-ashburn-campus/ (News report)
43. PJM, 2028/2029 Base Residual Auction results. https://www.pjm.com/-/media/DotCom/markets-ops/rpm/rpm-auction-info/2028-2029/2028-2029-bra-results-report.pdf (Official document)
44. CSO, data centres metered electricity consumption 2025. https://www.cso.ie/en/releasesandpublications/ep/p-dcmec/datacentresmeteredelectricityconsumption2025/ (Official document)
45. CRU, connection policy for data centres. https://www.cru.ie/about-us/news/the-cru-publishes-its-decision-on-new-electricity-connection-policy-for-data-centres/; CRU grid code consultation. https://consult.cru.ie/en/consultation/grid-code-modification-mpid-345-and-compliance-and-derogation-framework-request-further-0; EirGrid, MPID 345 fault ride-through update and alternative solutions (information paper, 26 June 2026). https://cms.eirgrid.ie/sites/default/files/publications/MPID345_FRT_Update_%26_Alternative_Solutions_Assessment_Information_Paper.pdf; CRU, large energy user connection policy decision paper (CRU2025236). https://cruie-live-96ca64acab2247eca8a850a7e54b-5b34f62.divio-media.com/documents/CRU2025236_Large_Energy_User_connection_policy_decision_paper.pdf (Official document)
46. The Irish Times, Irish Times/Ipsos B&A poll on data centres (26 September 2026). https://www.irishtimes.com/politics/2026/09/26/majority-of-people-want-data-centre-construction-to-stop-irish-timesipsos-ba-poll-shows/ (News report)
47. RTÉ, Waterford data centre refused (15 October 2026). https://www.rte.ie/news/regional/2026/1015/1595561-data-centre-waterford/ (News report)
48. Data Centre Review, Ennis Supreme Court decision. https://datacentrereview.com/2026/10/irelands-supreme-court-clears-way-for-e1-6bn-ennis-data-centre/ (News report)
49. European Commission, AI Omnibus enters into force. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force; enforcement from 2 August. https://digital-strategy.ec.europa.eu/en/news/commission-starts-enforcing-ai-act-rules-and-new-transparency-requirements-2-august (Official document)
50. Commission Implementing Decision (EU) 2026/2274 (EN 18286). https://eur-lex.europa.eu/eli/dec_impl/2026/2274/oj; CEN-CENELEC, first AI standard cited in the Official Journal (15 October 2026). https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-10-15-en-18286-2026-published-in-ojeu/ (Official document)
51. IAPP, White House accord. https://iapp.org/news/a/white-house-major-ai-developers-reach-morally-binding-safety-commitments; The Next Web, Super Intelligence Force charter. https://thenextweb.com/news/super-intelligence-force-charter-first-meeting-anthropic (News report)
52. The Next Web, FTC demands to OpenAI and Anthropic. https://thenextweb.com/news/ftc-subpoenas-openai-anthropic-ai-safety-incidents (News report)
53. Troutman Pepper, eight state AGs sue OpenAI. https://www.troutman.com/insights/eight-state-ags-sue-openai-over-chatgpt-safety-and-consumer-protection/ (News report)
54. Courts Service of Ireland, practice directions on generative AI. High Court: https://procedures.courts.ie/practice-directions/full-practice-direction?url=practice-direction-on-the-responsible-use-of-generative-artificial-intelligence-in-court-documents; Circuit Court: https://www.courts.ie/practice-directions/full-practice-direction?url=practice-direction-on-the-responsible-use-of-generative-artificial-intelligence-in-court-proceedings-and-documents (Official document)
55. Department of Enterprise, Tourism and Employment, Regulation of Artificial Intelligence Act 2026. https://enterprise.gov.ie/en/news-and-events/department-news/2026/july/20260730.html (Official document)
56. Department of the Taoiseach, launch of Intelligence:Applied. https://www.gov.ie/en/department-of-the-taoiseach/press-releases/launch-of-intelligenceapplied-programme-to-support-irish-workers-and-business-to-adopt-ai/ (Official document)
58. The Next Web, joint statement on control of frontier AI. https://thenextweb.com/news/frontier-ai-joint-statement-21-countries-eu (News report)
59. Epoch AI, Capabilities Index data. https://epoch.ai/data/eci_scores.csv (Organisation publication)
60. Startup Fortune, Artificial Analysis Intelligence Index v5. https://startupfortune.com/claude-opus-55-takes-top-spot-as-artificial-analysis-launches-intelligence-index-v5/ (News report)
61. ARC Prize, GPT-6 Astra results. https://arcprize.org/results/openai-gpt-6-astra (Organisation publication)
62. Bain and Company, your AI budget is growing, your returns aren't. https://www.bain.com/insights/your-ai-budget-is-growing-your-returns-arent-heres-why/ (Organisation publication)
63. UK AI Security Institute, GPT-6 Astra unsanctioned supply-chain attacks in simulations. https://www.aisi.gov.uk/blog/gpt-6-astra-performs-unsanctioned-supply-chain-attacks-in-simulations (Official document)
64. OpenAI, GPT-6.1 Terra system card. https://deploymentsafety.openai.com/gpt-6-1-terra (Organisation publication)
65. Epoch AI, InnovationEval. https://epoch.ai/publications/innovationeval; METR time horizons. https://metr.org/time-horizons/ (Organisation publication)
66. Epoch AI, the plunging price of thought. https://epoch.ai/publications/the-plunging-price-of-thought (Organisation publication)
67. Artificial Analysis, model leaderboards. https://artificialanalysis.ai/leaderboards/models (Organisation publication)
68. Anthropic, Claude Haiku 5.5. https://www.anthropic.com/claude-haiku-5-5 (Organisation publication)
69. Google, Gemini 4 Argon. https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/; Google, introducing Gemini 4 Argon (general availability, 13 October 2026). https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/ (Organisation publication)
70. 24/7 Wall St., ServiceNow ahead of results (24 October 2026). https://247wallst.com/investing/2026/10/24/servicenows-moment-of-truth-can-agentic-ai-growth-justify-a-premium-80x-earnings-multiple-on-oct-28/ (News report)
71. The Next Web, OpenAI discounts and Anthropic customers. https://thenextweb.com/news/openai-discounts-anthropic-customers-replit-rippling (News report)
72. US Census Bureau, Business Trends and Outlook Survey. https://www.census.gov/hfp/btos/downloads/National.xlsx (Official document)
73. OpenAI, enterprise signals. https://openai.com/signals/enterprise-data/ (Organisation publication)
74. Eurostat, enterprises using AI. https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ai?format=JSON&lang=EN (Official document)
75. Deloitte UK, British workers and generative AI (16 September 2026). https://www.deloitte.com/uk/en/about/press-room/british-workers-spend-one-billion-pounds-of-their-own-money-on-gen-ai-for-work.html (Organisation publication)
76. Vercel, AI Gateway leaderboards. https://vercel.com/ai-gateway/leaderboards/models; Vercel, AI Gateway production index, October 2026 (September data). https://vercel.com/blog/ai-gateway-production-index-october-2026; Vercel, AI Gateway production index, September 2026 (August data). https://vercel.com/blog/ai-gateway-production-index-september-2026 (Organisation publication)
77. Stanford Digital Economy Lab, Canaries in the coal mine (August 2026). https://digitaleconomy.stanford.edu/app/uploads/2026/08/Canaries_August2026.pdf (Academic paper)
78. Yale Budget Lab, AI and the labour market. https://budgetlab.yale.edu/research/what-we-do-and-dont-know-about-how-ai-affecting-labor-market (Academic paper)
79. Anthropic, employment at Anthropic. https://www.anthropic.com/research/employment-at-anthropic (Organisation publication)
80. Challenger, Gray and Christmas, September 2026 report. https://www.challengergray.com/wp-content/uploads/2026/10/Challenger-Report-September-2026.pdf (Organisation publication)
81. BMW Group, Capital Market Day (30 September 2026). https://www.press.bmwgroup.com/global/article/detail/T0461229EN?language=en (Organisation publication)
82. Microsoft, introducing a voluntary exit offer (26 October 2026). https://blogs.microsoft.com/blog/2026/10/26/introducing-a-voluntary-exit-offer/ (Organisation publication)
83. US Census Bureau, BTOS AI supplement 2026. https://www.census.gov/hfp/btos/downloads/AI_Supplement_Table_2026.xlsx (Official document)
84. BaitBench. https://arxiv.org/abs/2608.30724; CAVE-Bench. https://arxiv.org/abs/2609.32616 (Academic paper)
85. Anthropic Fellows, interpretability tools and behaviour prediction. https://arxiv.org/pdf/2608.16747 (Academic paper)
86. Anthropic, improving alignment security. https://www.anthropic.com/news/improving-alignment-security-efforts (Organisation publication)
87. METR, review of Anthropic's August 2026 risk report (20 October 2026). https://metr.org/blog/2026-10-20-misalignment-risk-report-august-2026-review/ (Organisation publication)
88. OpenAI, self-replicating prompt injections exist. https://alignment.openai.com/misalignment-reports/self-replicating-prompt-injections-exist/ (Organisation publication)
89. Reuters, AI models may soon self-replicate (13 October 2026). https://www.reuters.com/business/ai-models-may-soon-self-replicate-without-access-data-centers-anthropic-warns-2026-10-13/ (News report)
90. Anthropic, ART research paper. https://www-cdn.anthropic.com/22573675ada52a8ca8a97a1a4b4326b2f208a071.pdf (Organisation publication)
91. Nature Biotechnology, AIntibody. https://www.nature.com/articles/s41587-026-03238-6 (Academic paper)
92. Reuters, Microsoft sequential diagnosis (23 October 2026). https://www.reuters.com/business/healthcare-pharmaceuticals/microsoft-develops-ai-tool-that-can-diagnose-sequentially-like-doctor-2026-10-23/ (News report)
93. ALLIANCE trial (medRxiv). https://www.medrxiv.org/content/10.64898/2026.08.29.26361715v1.full (Academic paper)
94. PLOS Digital Health, FDA-cleared AI devices and trials. https://journals.plos.org/digitalhealth/article?id=10.1371%2Fjournal.pdig.0001597 (Academic paper)
95. Anthropic, formal verification of production software. https://www.anthropic.com/research/formal-verification (Organisation publication)
96. PHP security release (21 October 2026). https://www.php.net/archive/2026.php#2026-10-21-5; The Next Web, Bank of America contractors. https://thenextweb.com/news/bank-of-america-1000-contractors-mythos-flaws (Organisation publication)
97. Anthropic, origins of the NIST ECDSA curves. https://www.anthropic.com/research/ecdsa-curve-origins (Organisation publication)
98. Microsoft Security, Storm-0940 and ARTEX (21 October 2026). https://www.microsoft.com/en-us/security/blog/2026/10/21/storm-0940-uses-artex-agentic-ai-connectwise-supply-chain-compromise/ (Organisation publication)
99. NorForge, inside Cairn. https://norforge.com/blog/inside_cairn; Reuters (19 October 2026). https://www.reuters.com/legal/government/how-one-hacker-used-ai-agents-few-thousand-dollars-break-into-scores-sites-2026-10-19/ (Organisation publication)
100. The Register, AI models posting sensitive screenshots (29 September 2026). https://www.theregister.com/ai-and-ml/2026/09/29/ai-models-keep-posting-screenshots-showing-sensitive-data-from-inside-tech-companies/5299640 (News report)
101. Forever Security, hijacking AI agents via the Downloads folder. https://forever.security/blog/hijacking-ai-agents-via-downloads-folder (Organisation publication)
102. TechCrunch, Walmart welcomes agents (21 October 2026). https://techcrunch.com/2026/10/21/while-amazon-blocks-ai-agents-walmart-rolls-out-the-welcome-mat/ (News report)
103. Sierra, introducing the Personal Agent Protocol. https://sierra.ai/blog/introducing-personal-agent-protocol (Organisation publication)
104. The Next Web, American Express job cuts and agent access. https://thenextweb.com/news/amex-job-cuts-ai-agents-run-rogue (News report)
105. The Verge, Amazon blocks Meta's Muse. https://www.theverge.com/tech/998078/amazon-blocks-meta-muse-ai-agent-shopping (News report)
106. Waymo, Madrid region. https://waymo.com/blog/2026/10/waymo-in-madrid-region/ (Organisation publication)
107. International Federation of Robotics, five million robots. https://ifr.org/ifr-press-releases/news/five-million-robots-now-operate-in-factories-globally (Organisation publication)
108. Healthwatch England, AI scribes. https://www.healthwatch.co.uk/blog/2026-07-16/what-does-public-think-about-ai-scribe-use-healthcare (Organisation publication)
109. Kenya cluster randomised trial (Nature Medicine). https://pmc.ncbi.nlm.nih.gov/articles/PMC13472850/ (Academic paper)
110. OECD, PISA 2025 results, volume I. https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/09/pisa-2025-results-volume-i_5265bfb1/73451bc5-en.pdf (Official document)
111. NPR, chatbots and propaganda (30 August 2026). https://www.npr.org/2026/08/30/nx-s1-5876436/chatbots-search-propaganda (News report)
112. Data Protection Commission, AI insights report. https://www.dataprotection.ie/en/news-media/latest-news/data-protection-commission-publishes-ai-insights-report; Data Protection Commission, AI insights report (PDF). https://www.dataprotection.ie/sites/default/files/uploads/2026-09/DPC-AI-Insights-Report-AC.pdf (Official document)
113. European Commission, DMA decision on Android. https://ec.europa.eu/competition/digital_markets_act/cases/202629/DMA_100220_2683.pdf (Official document)
114. Garante per la protezione dei dati personali, decision. https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/10269571 (Official document)
115. ActuIA, US GSA LLM clause. https://www.actuia.com/en/news/us-gsa-llm-clause-what-it-means-for-european-ai-vendors/ (News report)
116. NYC Department of Consumer and Worker Protection, proposed rules (20 October 2026). https://www.nyc.gov/site/dca/news/072-26/mamdani-administration-proposes-ban-ai-customer-service-doom-loops (Official document)
117. HM Treasury, Chancellor's plan for AI (24 October 2026). https://www.gov.uk/government/news/chancellor-unveils-britains-ambitious-plan-for-ai (Official document)
118. ActuIA, China's tiered rules for AI agents in commerce. https://www.actuia.com/en/news/china-outlines-tiered-rules-for-ai-shopping-agents-in-commerce/ (News report)
119. Quinnipiac University poll (September 2026). https://poll.qu.edu/poll-release?releaseid=3969 (Organisation publication)
120. Reuters/Ipsos poll, via The Express Tribune. https://tribune.com.pk/story/2633545/most-us-voters-say-trump-congress-dont-take-ai-risks-seriously-reutersipsos-poll-finds (News report)
121. Anthropic, Claude Code and expertise. https://www.anthropic.com/research/claude-code-expertise (Organisation publication)
122. METR, pre-deployment evaluation of Claude Opus 5.5 (22 September 2026). https://metr.org/blog/2026-09-22-claude-opus-5-5/ (Organisation publication)
123. TechCrunch, OpenAI launches GPT-6.1 Sol (29 September 2026). https://techcrunch.com/2026/09/29/openai-launches-gpt-6-1-sol-says-it-nearly-matches-gpt-6-astra-and-costs-less/ (News report)
124. Pacing the Frontier statement. https://www.pacingthefrontier.com/; Fortune (29 July 2026). https://fortune.com/2026/07/29/anthropic-deepmind-openai-meta-washington-ai-slowdown-plan (Organisation publication)
125. Nvidia, Form 8-K (2 September 2026). https://www.sec.gov/Archives/edgar/data/0001045810/000104581026000078/nvda-20260902.htm (Regulatory filing)
126. GitHub, Copilot billing changes. https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/ (News report)
127. Simon Willison, Anthropic donates Agent Skills to the Agentic AI Foundation (22 October 2026). https://simonwillison.net/2026/Oct/22/donating-agent-skills/ (News report)
128. Mistral AI, Mistral Large 4. https://mistral.ai/news/mistral-large-4/ (Organisation publication)
129. Meta, Muse Wonder and Muse Spark Open. https://research.meta.ai/blog/muse-wonder (Organisation publication)
130. The Neuron, GPT-6.1 Terra. https://www.theneuron.ai/news/openai-gpt-6-1-terra-api-price-cuts-authorization-risks/ (News report)
131. Let's Data Science, Kimi K3.1 Pro. https://letsdatascience.com/news/moonshot-releases-kimi-k31-pro-api-open-weights-due-nov-4-786e160c (News report)
132. The Register, OpenAI's Atlas browser. https://www.theregister.com/ai-and-ml/2026/07/10/openais-atlas-browser-doesnt-make-it-to-its-first-birthday/5269818 (News report)
133. MIT News, heat-stable RNA vaccine formulation (28 September 2026). https://news.mit.edu/2026/new-formulation-helps-rna-vaccines-withstand-high-temperatures-0928 (News report)
134. Nature Methods, IRIS. https://www.nature.com/articles/s41592-026-03213-8 (Academic paper)
135. Anthropic, designing efficient quantum circuits, and toxin-binder campaign. https://www.anthropic.com/research/designing-efficient-quantum-circuits;  https://x.com/AnthropicAI/status/2112579251555721573 (Organisation publication)
136. Counterexamples to Grad's conjecture (arXiv). https://arxiv.org/abs/2610.07304 (Academic paper)
137. 2026 Nobel prizes. Physics: https://aljazeera.com/news/2026/10/6/francis-halzen-wins-nobel-prize-in-physics-for-work-on-ghost-particles; Chemistry: https://www.khaleejtimes.com/world/henri-kagan-kenso-soai-win-2026-nobel-chemistry-prize; Medicine: https://www.aljazeera.com/news/2026/10/5/nobel-medicine-prize-honours-us-and-german-scientists-for-optogenetics-work (News report)
138. Dario Amodei, We must pace the frontier (September 2026). https://darioamodei.com/post/we-must-pace-the-frontier (Organisation publication)
139. Paper on AI improving AI (arXiv, 28 September 2026). https://arxiv.org/abs/2609.36054 (Academic paper)
140. Shahid, Suttie and Black, Collaborative Human-Agent Protocol (CHAP). https://arxiv.org/abs/2606.09751 (Brightbeam publication)
141. CHAP repository. https://github.com/BrightbeamAI/chap;  https://brightbeam.works/chap/ (Brightbeam publication)
142. Brevet repository and page. https://github.com/BrightbeamAI/brevet;  https://brightbeam.works/brevet/ (Brightbeam publication)
143. Shahid, Suttie and Black, Brevet: Change Control for What Self-Evolving AI Agents Learn. https://www.researchgate.net/publication/415562096_Brevet_Change_Control_for_What_Self-Evolving_AI_Agents_Learn (Brightbeam publication)
144. Metis repository and page. https://github.com/BrightbeamAI/metis;  https://brightbeam.works/metis/ (Brightbeam publication)
145. Shahid, Suttie, Black and Garzón-Vico, Tacit Fragments (13 August 2026). DOI 10.20944/preprints202608.0927.v1 https://www.alphaxiv.org/abs/2609.operationalising-tacit-knowledge-agentic-ai (Brightbeam publication)
146. Shahid, Keeping the Human in Command (PublicPolicy.ie, 6 August 2026). https://publicpolicy.ie/digital/keeping-the-human-in-command-how-ireland-can-lead-on-accountable-ai/ (Brightbeam publication)
147. Generative AI for Medtech: The 2027 Playbook. https://medtechplaybook.brightbeam.works/ (Brightbeam publication)
148. Shahid, Suttie and Black, Composable Digital Intelligence (10 June 2026). DOI 10.20944/preprints202606.0854.v1 https://www.alphaxiv.org/abs/2609.composable-digital-intelligence-architectural-landscape (Brightbeam publication)
149. Shahid, Notation for the human-agent symphony (AAIF, 9 October 2026). https://aaif.io/blog/notation-for-the-human-agent-symphony-how-chap-records-human-judgment-alongside-mcp (Brightbeam publication)
150. Brightbeam, Meissner case study (8 September 2026). https://www.brightbeam.com/post/meissner-data-driven-labour-forecasting-and-capacity-planning (Brightbeam publication)
152. Brightbeam Applied Research. https://brightbeam.works/ (Brightbeam publication)
153. Startup Fortune, ARC Prize rejects OpenAI's claim that Astra scored 99.9% on its AGI test. https://startupfortune.com/arc-prize-rejects-openais-claim-that-astra-scored-999-percent-on-agi-test/ (News report)
155. Bloomberg, CoreWeave risk gauge hits record (15 October 2026). https://www.bloomberg.com/news/articles/2026-10-15/coreweave-risk-gauge-hits-record-pricing-60-odds-of-default (News report)
156. CBS News, Microsoft buyouts for about 60,000 workers. https://www.cbsnews.com/news/microsoft-buyouts-60000-workers-artificial-intelligence-layoffs/ (News report)
157. Reed Smith, EU AI Act: the AI Office sends its first requests for information to leading AI providers. https://www.reedsmith.com/our-insights/blogs/technology-law-dispatch/102o6as/eu-ai-act-the-ai-office-sends-its-first-requests-for-information-to-leading-ai/ (News report)
158. The Irish Times, new data centres designed for AI require power in excess of that used by 100,000 homes (29 September 2026). https://www.irishtimes.com/politics/oireachtas/2026/09/29/new-data-centres-designed-for-ai-require-power-in-excess-of-that-used-by-100000-homes/ (News report)
159. NBC Washington, Loudoun County board pauses data-centre applications. https://www.nbcwashington.com/news/local/northern-virginia/loudoun-county-board-pauses-data-center-applications/4155005/ (News report)
160. ActuIA, EU AI Act: first harmonised standard covers only the quality system. https://www.actuia.com/en/news/eu-ai-act-first-harmonised-standard-covers-only-quality-system/ (News report)
161. The Next Web, Personal Agent Protocol from Sierra and Meta. https://thenextweb.com/news/personal-agent-protocol-sierra-meta (News report)
162. Financial Times, Consultants head for an AI showdown with their own clients (31 August 2026); Big banks want a cut of lawyers' AI savings (1 September 2026). (News report)
163. AI model release log (aggregator), Claude Opus 5.5 pricing. https://cheatsheets.davidveksler.com/ai-model-release-log.html (News report)
164. Model Context Protocol, architecture overview. https://modelcontextprotocol.io/docs/learn/architecture (Technical documentation)
165. A2A protocol. https://a2a-protocol.org/latest/ (Technical documentation)
166. LangGraph overview. https://docs.langchain.com/oss/python/langgraph/overview (Technical documentation)
167. Temporal, workflow execution. https://docs.temporal.io/workflow-execution (Technical documentation)
168. vLLM documentation. https://docs.vllm.ai/en/latest/ (Technical documentation)
169. OpenTelemetry, semantic conventions for generative AI. https://opentelemetry.io/docs/specs/semconv/gen-ai/ (Technical documentation)
170. OWASP Top 10 for LLM applications, 2025. https://genai.owasp.org/llm-top-10/ (Technical documentation)
171. NIST, AI Risk Management Framework. https://www.nist.gov/itl/ai-risk-management-framework (Official document)
172. scikit-learn, supervised learning. https://scikit-learn.org/stable/supervised_learning.html (Technical documentation)
173. Google OR-Tools. https://developers.google.com/optimization/introduction (Technical documentation)
174. Hugging Face, PEFT. https://huggingface.co/docs/peft/index (Technical documentation)
175. Microsoft GraphRAG. https://github.com/microsoft/graphrag (Technical documentation)
176. Feast feature store documentation. https://docs.feast.dev/ (Technical documentation)
177. Prior Labs, TabPFN. https://github.com/PriorLabs/TabPFN (Technical documentation)
178. Amazon Science, Chronos forecasting models. https://github.com/amazon-science/chronos-forecasting (Academic paper)
179. Lean proof assistant. https://lean-lang.org/ (Technical documentation)
180. Docling documentation. https://docling-project.github.io/docling/ (Technical documentation)
181. pgvector. https://github.com/pgvector/pgvector (Technical documentation)
182. Hugging Face, TRL. https://huggingface.co/docs/trl/index (Technical documentation)
183. Hugging Face, SetFit. https://huggingface.co/docs/setfit/index (Technical documentation)
184. MLflow documentation. https://mlflow.org/docs/latest/ (Technical documentation)
185. DoWhy documentation. https://www.pywhy.org/dowhy/v0.13/ (Technical documentation)
186. CSO, Information Society Statistics, Enterprises 2025: artificial intelligence (released 6 February 2026). https://www.cso.ie/en/releasesandpublications/ep/p-isse/informationsocietystatistics-enterprises2025/artificialintelligence/; CSO, survey background and population coverage. https://www.cso.ie/en/releasesandpublications/ep/p-isse/informationsocietystatistics-enterprises2025/backgroundnotes/ (Official document)
188. OpenAI, API deprecations. https://developers.openai.com/api/docs/deprecations (Technical documentation)
189. Anthropic, model deprecations. https://platform.claude.com/docs/en/about-claude/model-deprecations (Technical documentation)
190. Microsoft, Azure OpenAI model retirements. https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/model-retirements (Technical documentation)
191. Amazon Web Services, understanding the Amazon Bedrock model lifecycle. https://aws.amazon.com/blogs/machine-learning/understanding-amazon-bedrock-model-lifecycle (Technical documentation)
192. Google, Gemini API deprecations. https://ai.google.dev/gemini-api/docs/deprecations (Technical documentation)
193. Regulation (EU) 2016/679, the General Data Protection Regulation, including Article 17 on the right to erasure. https://eur-lex.europa.eu/eli/reg/2016/679/oj; Data Protection Commission, right to erasure and its exceptions. https://www.dataprotection.ie/en/individuals/know-your-rights/right-erasure-articles-17-19-gdpr (Official document)
194. OpenAI, Realtime API guide. https://developers.openai.com/api/docs/guides/realtime (Technical documentation)
195. Liu and colleagues, Lost in the middle: how language models use long contexts (Transactions of the ACL; arXiv, 2023). https://arxiv.org/abs/2307.03172 (Academic paper)
196. JSON Schema, specification (draft 2020-12). https://json-schema.org/specification (Technical documentation)
197. Thakur and colleagues, BEIR: a heterogeneous benchmark for zero-shot evaluation of information retrieval models (NeurIPS 2021). https://arxiv.org/abs/2104.08663 (Academic paper)
198. Shumailov and colleagues, The curse of recursion: training on generated data makes models forget (arXiv, 2023). https://arxiv.org/abs/2305.17493 (Academic paper)
199. Google, Site Reliability Engineering workbook, chapter 16: canarying releases. https://sre.google/workbook/canarying-releases/ (Technical documentation)
200. Anthropic, Building effective agents (19 December 2024). https://www.anthropic.com/research/building-effective-agents (Organisation publication)
201. MVTec, MVTec AD: industrial anomaly detection benchmark dataset. https://www.mvtec.com/research-teaching/datasets/mvtec-ad (Dataset or benchmark)
202. Open Graph Benchmark: benchmark datasets, data loaders and evaluators for graph machine learning. https://ogb.stanford.edu/ (Dataset or benchmark)
203. ISO 23247-1:2021, Automation systems and integration: digital twin framework for manufacturing, part 1. https://www.iso.org/standard/75066.html (Standard)
204. Brynjolfsson, Li and Raymond, Generative AI at work (NBER working paper 31161; Quarterly Journal of Economics, 2025). https://www.nber.org/papers/w31161 (Academic paper)
205. IEEE Task Force on Process Mining, Process mining manifesto. https://www.tf-pm.org/resources/manifesto (Standard)
206. US Department of Justice, CLOUD Act resources. https://www.justice.gov/criminal/cloud-act-resources; US Department of Justice, clarification of provider obligations under the CLOUD Act. https://www.justice.gov/archives/opa/speech/deputy-assistant-attorney-general-richard-w-downing-delivers-remarks-academy-european-law (Official document)
207. Epoch AI, open models lag state-of-the-art closed models by 4 months (data insight, 29 May 2026). https://epoch.ai/data-insights/open-closed-eci-gap (Organisation publication)
208. Alphabet, third quarter 2026 results (28 October 2026). https://s206.q4cdn.com/479360582/files/doc_financials/2026/q3/2026q3-alphabet-earnings-release.pdf (Organisation publication)
209. AMD, AAI 2026: full-stack compute for the agentic AI era (23 July 2026). https://ir.amd.com/news-events/press-releases/detail/1294/aai-2026-amd-delivers-full-stack-compute-for-the-agentic-ai-era (Organisation publication)
210. Google Cloud, TorchTPU is now open source (20 October 2026). https://cloud.google.com/blog/topics/ai-infrastructure/torchtpu-is-now-open-source-run-native-pytorch-on-tpus (Organisation publication)
211. PyTorch, introducing TorchNeuron, a native PyTorch backend for AWS Trainium (19 October 2026). https://pytorch.org/blog/introducing-torchneuron-native-pytorch-backend-for-aws-trainium/ (Technical documentation)
212. SemiAnalysis InferenceX, TPU inference externalisation (7 September 2026). https://inferencex.semianalysis.com/blog/tpu-inferencex-full-steam (Dataset or benchmark)
213. SemiAnalysis InferenceX, AgentX: does the CUDA moat hold up in agentic inference? (24 August 2026). https://inferencex.semianalysis.com/blog/agentx-inferencexv3-does-cuda-moat (Dataset or benchmark)
214. MLCommons, MLPerf Inference v6.1 results (16 September 2026). https://mlcommons.org/2026/09/mlperf-inference-v6-1-results/ (Dataset or benchmark)
215. Nvidia, Groq 3 LPX in full production (24 August 2026). https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Groq-3-LPX-Now-in-Full-Production-With-World-Class-Speed-for-Agentic-AI/default.aspx (Organisation publication)
216. The Decoder, Nvidia's Groq 3 LPX against Cerebras (25 August 2026). https://the-decoder.com/nvidia-says-its-groq-3-lpx-is-four-times-faster-than-cerebras-but-the-math-is-more-complicated/ (News report)
217. Cerebras Systems, second quarter 2026 results (12 August 2026). https://investors.cerebras.ai/news-releases/news-release-details/cerebras-systems-fast-inference-cloud-business-nearly-quadruples (Organisation publication)
218. Artificial Analysis, Endpoint Accuracy Index: same model, different accuracy (4 August 2026). https://artificialanalysis.ai/articles/endpoint-accuracy-index (Dataset or benchmark)
219. AMD, AMD acquires Taalas (6 August 2026). https://ir.amd.com/news-events/press-releases/detail/1296/amd-acquires-taalas-to-advance-compute-solutions-for-rapidly-growing-ai-inference-market (Organisation publication)
220. SiliconANGLE, Groq raises $350M more in funding (17 August 2026). https://siliconangle.com/2026/08/17/ai-cloud-operator-groq-raises-350m-more-in-funding/ (News report)
221. Silicon Data, H100 rental price index (daily value, 28 October 2026). https://www.silicondata.com/products/silicon-index/h100 (Dataset or benchmark)
222. Silicon Data, B200 rental price update, August 2026 (24 September 2026). https://www.silicondata.com/blog/b200-rental-price-august-2026-update (Dataset or benchmark)
223. Silicon Data, H100 rental prices by region, Q3 2026 (31 July 2026). https://www.silicondata.com/blog/h100-rental-prices-by-region-q3-2026 (Dataset or benchmark)
224. The Next Web, GPU compute futures on CME (13 August 2026). https://thenextweb.com/news/cme-silicon-data-gpu-compute-futures-october-5 (News report)
225. VentureBeat, VB Pulse AI infrastructure and compute report (September 2026). https://venturebeat.com/vb-pulse-infrastructure-and-compute-report (Organisation publication)
226. Dell Technologies, second quarter fiscal 2027 results (1 September 2026). https://www.sec.gov/Archives/edgar/data/0001571996/000157199626000039/exhibit991earnings8kq2fy27.htm (Regulatory filing)
227. The Next Web, CoreWeave's credit swaps hit a record (15 October 2026). https://thenextweb.com/news/huang-coreweave-backstop-stockholm (News report)
228. CoreWeave, second quarter 2026 results (11 August 2026). https://investors.coreweave.com/news/news-details/2026/CoreWeave-Reports-Strong-Second-Quarter-2026-Results/default.aspx (Organisation publication)
229. Nvidia, Form 10-Q for the quarter ended 26 July 2026 (26 August 2026). https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm (Regulatory filing)
230. AMD, strategic partnership with Anthropic (22 July 2026). https://ir.amd.com/news-events/press-releases/detail/1292/amd-and-anthropic-announce-strategic-partnership-to-deploy-up-to-2-gigawatts-of-amd-instinct-mi450-series-gpus (Organisation publication)
231. The Next Web, Oracle cites force majeure over New Mexico data centre (24 September 2026). https://thenextweb.com/news/oracle-force-majeure-project-jupiter-new-mexico (News report)
232. Micron Technology, fiscal fourth-quarter and full-year 2026 results (30 September 2026). https://www.sec.gov/Archives/edgar/data/0000723125/000072312526000018/a2026q4ex991-pressrelease.htm (Regulatory filing)
233. The Korea Times, SK hynix third-quarter results and supply outlook (28 October 2026). https://www.koreatimes.co.kr/business/companies/20261028/sk-hynix-pledges-to-return-75-bil-to-shareholders (News report)
234. TrendForce, memory contract prices in 4Q26 (30 September 2026). https://www.trendforce.com/presscenter/news/20260930-13258.html (Organisation publication)
235. TrendForce, HBM supply constraints and 2027 prices (29 September 2026). https://www.trendforce.com/presscenter/news/20260929-13255.html (Organisation publication)
236. Light Reading, Dell'Oro on data-centre capital spending in 2Q 2026 (16 September 2026). https://www.lightreading.com/data-centers/data-center-capex-grew-92-in-2q-2026-driven-by-ai-demand-memory-costs-dell-oro (News report)
237. IDC, PC shipments in Q3 2026 (8 October 2026). https://www.idc.com/resource-center/press-releases/idc-pc-tracker-3q26/ (Organisation publication)
238. CCIA, semiconductor and server tariffs on data centres (23 October 2026). https://ccianet.org/articles/applying-semiconductor-and-server-tariffs-to-data-centers-under-section-232-or-section-301-would-now-cost-the-u-s-about-180-billion-a-year/ (Organisation publication)
239. Microsoft, building Windows for hybrid intelligence (7 October 2026). https://blogs.windows.com/windowsexperience/2026/10/07/building-windows-for-hybrid-intelligence/ (Organisation publication)
240. MarketBeat, HP third-quarter earnings call (26 August 2026). https://www.marketbeat.com/instant-alerts/transcript-hp-q3-earnings-call-highlights-2026-08-26/ (News report)
241. Cai and others, efficiency bottlenecks in mobile LLM inference on NPUs (6 July 2026). arXiv 2607.05475. https://arxiv.org/abs/2607.05475 (Academic paper)
242. Li, Qi and Chen, a stage-level analysis of mobile LLM inference on NPUs (22 May 2026). arXiv 2605.27435. https://arxiv.org/abs/2605.27435 (Academic paper)
243. IDC, PC shipments in Q2 2026 (8 July 2026). https://www.idc.com/resource-center/press-releases/2q26-pc-top5/ (Organisation publication)
244. The Register, Nvidia RTX Spark notebook benchmarked (16 October 2026). https://www.theregister.com/personal-tech/2026/10/16/benchmarked-nvidias-rtx-spark-notebook-delivers-serious-local-ai-compute-at-a-price/5303621 (News report)
245. Google for Developers, ML Kit release notes (26 October 2026). https://developers.google.com/ml-kit/release-notes (Technical documentation)
246. The Register, a local model tried to contact a server abroad (26 October 2026). https://www.theregister.com/ai-and-ml/2026/10/26/alibabas-qwen-ai-caught-trying-to-contact-server-in-china/5305561 (News report)
247. EY, US AI risk and governance survey (15 September 2026). https://www.ey.com/en_us/newsroom/2026/09/ey-survey-finds-that-autonomous-ai-implementation-outpaces-oversight-yielding-an-ai-governance-gap (Organisation publication)
248. KPMG US, AI Quarterly Pulse, third quarter 2026 (24 September 2026). https://kpmg.com/us/en/media/news/q3-ai-pulse-2026.html (Organisation publication)
249. PwC, 2026 Annual Corporate Directors Survey (23 September 2026). https://www.pwc.com/us/en/about-us/newsroom/press-releases/pwc-2026-annual-corporate-directors-survey.html (Organisation publication)
250. UK National Cyber Security Centre, managing the cyber risk of agentic AI (20 August 2026). https://www.ncsc.gov.uk/blogs/managing-the-cyber-risk-of-agentic-ai (Official document)
251. UK AI Security Institute, unsanctioned agent behaviour during cyber testing (4 August 2026). https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing (Official document)
252. PeRoBa, ISO Survey 2025 figures, including ISO/IEC 42001 certificates (12 October 2026). https://www.peroba.org/iso-survey-2025-figures-germany (Organisation publication)
253. EUR-Lex, Directive (EU) 2023/2225 on credit agreements for consumers, Articles 2(2), 18(8) and 48 (18 October 2023). https://eur-lex.europa.eu/eli/dir/2023/2225/oj (Official document)
254. EUR-Lex, Regulation (EU) 2024/1689, the AI Act: Articles 2(6), 5(1)(c), 6(1), 26(8), 27, 43(4), 86 and 113, and Annexes I and III (13 June 2024). https://eur-lex.europa.eu/eli/reg/2024/1689/oj (Official document)
255. EUR-Lex, Regulation (EU) 2022/2554, the Digital Operational Resilience Act, Articles 3(21), 28 and 64 (14 December 2022). https://eur-lex.europa.eu/eli/reg/2022/2554/oj (Official document)
256. European Supervisory Authorities, designation of critical ICT third-party providers under DORA (18 November 2025). https://www.eiopa.europa.eu/european-supervisory-authorities-designate-critical-ict-third-party-providers-under-digital-2025-11-18_en (Official document)
257. EUR-Lex, Court of Justice of the EU, Case C-236/09, Test-Achats: sex may not lead to different insurance premiums and benefits from 21 December 2012 (1 March 2011). https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62009CJ0236 (Official document)
258. EIOPA, Opinion on AI governance and risk management (6 August 2025). https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en (Official document)
259. EUR-Lex, Regulation (EU) 2016/679, the General Data Protection Regulation, Article 22 (27 April 2016). https://eur-lex.europa.eu/eli/reg/2016/679/oj (Official document)
260. European Commission, EudraLex Volume 4, Good Manufacturing Practice, Annex 11: Computerised Systems (applies from 30 June 2011). https://health.ec.europa.eu/system/files/2016-11/annex11_01-2011_en_0.pdf (Official document)
261. European Commission, consultation on EudraLex Volume 4: revised Chapter 4 and Annex 11, and the draft Annex 22 on AI (7 July to 7 October 2025). https://health.ec.europa.eu/consultations/stakeholders-consultation-eudralex-volume-4-good-manufacturing-practice-guidelines-chapter-4-annex_en; Draft Annex 22. https://health.ec.europa.eu/document/download/5f38a92d-bb8e-4264-8898-ea076e926db6_en?filename=mp_vol4_chap4_annex22_consultation_guideline_en.pdf (Official document)
262. EMA and US FDA, Guiding principles of good AI practice in drug development (January 2026). https://www.ema.europa.eu/en/documents/other/guiding-principles-good-ai-practice-drug-development_en.pdf (Official document)
263. EMA, ICH E6(R3) guideline for good clinical practice: principles and Annex 1 effective from 23 July 2025, Annex 2 from 15 January 2027. https://www.ema.europa.eu/en/scientific-guidelines/ich-e6-good-clinical-practice (Official document)
264. Nature Medicine, A generative AI-discovered TNIK inhibitor for idiopathic pulmonary fibrosis: a randomized phase 2a trial (June 2025). https://pubmed.ncbi.nlm.nih.gov/40461817/ (Academic paper)
265. EUR-Lex, Regulation (EU) 2017/745 on medical devices: Articles 1(6) and 2(48), Annex VIII rule 11 and Annex IX section 4.10 (5 April 2017). https://eur-lex.europa.eu/eli/reg/2017/745/oj (Official document)
266. US FDA, Predetermined change control plans for medical devices, with the final guidance for AI-enabled device software functions (page current as of 20 October 2026). https://www.fda.gov/medical-devices/premarket-submissions-selecting-and-preparing-correct-submission/predetermined-change-control-plans (Official document)
267. EUR-Lex, Regulation (EU) 2023/1230 on machinery: Article 54 and Annex I, Part A, points 5 and 6, with the corrigendum setting the date of application at 20 January 2027 (14 June 2023). https://eur-lex.europa.eu/eli/reg/2023/1230/oj; Corrigendum. https://eur-lex.europa.eu/eli/reg/2023/1230/corrigendum/2023-07-04/oj/eng (Official document)
268. EUR-Lex, Regulation (EU) 2024/2847, the Cyber Resilience Act: Articles 13(5), 14 and 71 (23 October 2024). https://eur-lex.europa.eu/eli/reg/2024/2847/oj (Official document)
269. EUR-Lex, Directive (EU) 2024/2853 on liability for defective products: Articles 2, 4, 7 and 11 (23 October 2024). https://eur-lex.europa.eu/eli/dir/2024/2853/oj (Official document)
270. EUR-Lex, Directive (EU) 2016/2102 on the accessibility of the websites and mobile applications of public sector bodies: Articles 4 and 12 (26 October 2016). https://eur-lex.europa.eu/eli/dir/2016/2102/oj (Official document)
271. EUR-Lex, Regulation (EU) 2026/1744, the Digital Omnibus on AI: Article 1(39) to (41), amending Articles 111 and 113 and Annex I of the AI Act, and Article 3, amending the Machinery Regulation (8 July 2026). https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202601744 (Official document)
272. EMA, Multistakeholder workshop on expert contributions to AI guidance development (Annex 22), 30 June and 1 July 2026, with its report (2 October 2026). https://www.ema.europa.eu/en/events/good-manufacturing-practice-multistakeholder-workshop-expert-contributions-artificial-intelligence-guidance-development-annex-22 (Official document)
