# Project RainbowHole — V0

## Abstract

RainbowHole ist ein dezentrales, P2P-gestütztes Framework zur Sicherstellung kognitiver Souveränität.  
In einer Ära der „Intelligence-as-a-Service“-Monopole dekonstruiert RainbowHole die Abhängigkeit von zentralisierten Cloud-Infrastrukturen.

Das System integriert:

- lokale Inferenz-Engines  
- inhaltsadressierten Speicher (IPFS)  
- asynchrone Konsensmechanismen  

zu einem resilienten Wissens-Mesh.

Ziel ist der Betrieb einer **autarken Intelligenz-Zelle**, die primär auf lokaler Hardware und regenerativer Energie (Off-Grid) operiert.

---

# 1. System-Philosophie & Problemstellung

Zentralisierte Large Language Models (LLMs) unterliegen drei systemischen Risiken:

### Informations-Asymmetrie
Proprietäre Gatekeeper kontrollieren den Zugriff auf das kollektive Wissen.

### Algorithmisches Alignment
Externe Ethik-Vorgaben fungieren als Filter-Ebene (*Censorship-by-Design*).

### Strukturelle Fragilität
Abhängigkeit von monetären Paywalls und physischer Cloud-Infrastruktur.

RainbowHole begegnet diesen Risiken durch:

- das **Primat der lokalen Inferenz**
- das **Prinzip der digitalen Allmende**

---

# 2. Architektur-Spezifikation  
## The Triple Layer

Das System ist in drei funktionale Schichten unterteilt, die **asynchron miteinander interagieren**.

---

# 2.1 Layer I — The Sovereign Node (Compute)

Die Recheneinheit führt die Inferenz lokal aus.

### Inference Engine

Einsatz von:

- `llama.cpp`
- `Ollama`

zur Ausführung hoch-quantisierter Transformer-Modelle.

### Modell-Strategie

Nutzung von **Small Language Models (SLMs)**

Beispiele:

- Qwen2.5-Coder  
- Phi-3  

optimiert auf geringe Speicher-Latenz (VRAM-Management).

### Privacy Isolation

Alle Roh-Prompts und Zwischen-Aktivierungen verbleiben im **flüchtigen Speicher (RAM/VRAM)** des lokalen Knotens.

---

# 2.2 Layer II — Distributed Knowledge Mesh (Memory)

Anstatt Wissen in Modell-Gewichten zu „vergraben“, nutzt RainbowHole ein **externes dezentrales Gedächtnis**.

### Content-Addressed Storage

Integration von **IPFS (InterPlanetary File System)** zur Speicherung von Wissensfragmenten.

Jeder Datensatz wird über eine **unveränderliche CID (Content Identifier)** adressiert.

---

### Vectorized RAG (Retrieval-Augmented Generation)

Lokale Vektor-Datenbanken:

- Orama
- ChromaDB

indizieren CIDs.

Die Suche erfolgt über **mathematische Ähnlichkeit (Cosine Similarity)** im Einbettungsraum.

---

### Deltas & Snapshots

Wissens-Updates werden als **inkrementelle Schichten** im Mesh verteilt.

---

# 2.3 Layer III — Collective Intelligence Protocol (Network)

Die Vernetzung der Knoten zur Bildung eines Schwarms.

### P2P Communication

Technologien:

- `libp2p`
- `WebRTC`

zur Umgehung von NAT-Barrieren.

---

### Consensus of Reason (CoR)

Ein probabilistischer Validierungs-Algorithmus.

Kritische Anfragen werden an **n zufällige Peers** gesendet.  
Die Antwort wird erst akzeptiert, wenn die **semantische Konvergenz** einen Schwellenwert überschreitet.

R_final = centroid({O1, O2, ..., On})
if σ(O1..n) < τ


---

# 3. Das Incentive-Modell  
## Unit of Reason (UoR)

Um das **Free-Rider-Problem** in P2P-Netzwerken zu lösen, implementiert RainbowHole eine **beitragsbasierte Priorisierung**.

### UoR-Guthaben

Knoten verdienen Credits durch:

- Bereitstellen von persistentem Speicher für IPFS-Chunks  
- Validierung von Inferenz-Ergebnissen anderer Knoten  
- Export von Inferenz-Zyklen während solarer Energie-Überschussphasen  

---

### Service Level Agreements (SLA)

Höheres UoR-Guthaben erlaubt Zugriff auf größere Modell-Instanzen innerhalb des Schwarms.

Beispiel:

- **GPU-Sharing via Petals-Protokoll**

---

# 4. Implementierungs-Roadmap  
## V0 — Scaffolding

### Phase 1 — Hybrid Development (aktueller Stand)

**Orchestrierung**

Python-basiertes Framework zur Steuerung von lokalem RAG.

**Inferenz-Brücke**

Temporäre Nutzung von High-End-APIs (z.B. DeepSeek-V3) zur Generierung komplexer Systemkomponenten.

Der Code ist modular aufgebaut, um den **nahtlosen Wechsel auf lokale Backends** zu ermöglichen.

---

### Phase 2 — Autarkie-Modus

- vollständige Entfernung externer API-Abhängigkeiten  
- Optimierung der RAG-Pipeline auf **8 GB RAM System-Limit**  
- Nutzung von **3B-Parameter-Modellen**

---

### Phase 3 — Mesh-Integration

Aktivierung der **IPFS-Synchronisation** zwischen lokalen Kommune-Nodes.

---

# 5. Hardware-Anforderungen & Energetik

| Komponente | Minimal (Guerilla) | Empfohlen (Sovereign) |
|---|---|---|
| CPU / RAM | 8 GB RAM (DDR4/5) | 64 GB Unified Memory (Apple M-Series) |
| GPU | Shared Memory / iGPU | RTX 3090 / 4090 (24 GB VRAM) |
| Storage | 512 GB NVMe SSD | 4 TB+ RAID (IPFS Persistence) |
| Energie | Netzstrom | Solar-gestützte LiFePO4-Batteriebank |

---

# 6. Sicherheit & Integrität

### Sybil-Schutz

Reputationsgewichtung basierend auf **kryptografischen Arbeitsnachweisen**.

(*Proof-of-Useful-Work*)

---

### Modell-Integrität

Verifizierung der Modell-Gewichte via **SHA-256 Hashes** gegen ein dezentrales Register.

---

# 7. Zusammenfassung für wissenschaftliche Evaluation

RainbowHole stellt eine **Abkehr vom monolithischen KI-Paradigma** dar.

Es ersetzt:

**vertikales Scaling**

> größere Modelle in zentralen Rechenzentren

durch

**horizontale Kooperation**

> viele spezialisierte lokale Modelle

Die mathematische Belastbarkeit des Systems ergibt sich aus der **Entkoppelung von Sprachverarbeitung (LLM)** und **faktischer Information (IPFS-RAG)**.

---

## Status

**In Development**

> The ghosts are in the machine.

---

# Anhang

Installationsanweisungen für:

- Docker-Container  
- IPFS-Daemon  

folgen in den entsprechenden **Sub-Directories**.
