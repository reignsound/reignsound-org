# Reignsound Documentation Provenance Model

**Status:** Proposed architecture note  
**Authority:** Reignsound  
**Last reviewed:** 2026-10-25

## Purpose

Provenance explains what a record or published view represents, which authority governs it, where its source lives, and which revision was rendered. It should support verification without repeating the same facts across every page.

## Record layers

1. **Canonical record** — the authoritative structured record for a governed concept or document.
2. **Relationship record** — a typed, queryable link between two identified records.
3. **Derived view** — a generated public page, onboarding handbook, summary, filtered registry, count, or report.
4. **Build/render record** — identifies the renderer and version, input revisions, configuration, output artifact, and validation result when traceability is needed.

## Canonical record minimum

Use existing Reignsound identity and registry conventions where available. A minimal record identifies its stable UUIDv7-based RSID, canonical name, record type, classification, lifecycle/status, authority, canonical source, provenance/revision, and relevant relationships. Add metadata only when a real governance, validation, operational, publishing, or query need justifies it.

## Typed relationships

Relationships should be records, not repeated informal text. A relationship type needs a stable identifier, label, definition, directionality, and applicable validation rules. Candidate examples for review: `implements-standard`, `renders-document`, `derived-from`, `supersedes`, `compatible-with`, `uses-module`, and `overrides-configuration`. These examples are not an adopted closed vocabulary.

Typed relationships enable queries such as: which sites implement a standard; which public pages were rendered from a canonical document; which deployments use a framework version; and which configuration overrides apply to dark mode.

## Derived values and counts

Do not copy counts into every canonical record merely because a parser can calculate them. Prefer querying relationship records or maintaining a materialized projection with an explicit definition, source revision, and calculation timestamp. Persist a derived value only when it has independent operational value, needs historical preservation, or is expensive and necessary to calculate. Mark it as derived and retain enough provenance to reproduce it.

## Public-safe rendering

A public rendering includes only information approved for publication. Canonical records may contain restricted metadata that public renderers must not expose. Each renderer needs an output profile, field allowlist, redaction rules, and validation tests. Public pages, onboarding handbooks, and technical references can differ in detail while preserving approved facts and document identity.

## Keep version concepts separate

- **Standard version:** governed edition of a standard.
- **Framework version:** Reignsound Web release actually used by a site.
- **Site release:** site-specific code, content, and configuration release.
- **Renderer version:** tool or parser that generated a derived document.
- **Source revision:** immutable commit or canonical-record revision used as input.
- **Deployment reference:** deployed artifact identifier, when relevant.

Do not invent a framework version for a site that does not yet run the shared framework.

## Configuration and overrides

Apply shared defaults before site configuration. Explicit site settings take precedence over defaults; declared overrides take precedence only within their scope. Overrides must be reviewable and testable, and upgrades must not silently discard them. Breaking changes require migration rules and a rollback path.

## Efficiency rule

**As-needed, no fluff.** Add a field, relationship type, index, or generated artifact only when it supports a defined need. Prefer references and reusable relationships over duplicated facts. Do not create metadata merely because it is technically possible.

## Implementation status

This note describes a proposed architecture. It does not prove that the registry, renderer pipeline, universal runtime, or example relationship types are implemented. Adopted rules should be recorded in the canonical Reignsound governance repository and reflected in generated public views.
