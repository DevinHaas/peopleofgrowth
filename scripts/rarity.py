# /// script
# requires-python = ">=3.10"
# dependencies = ["wordfreq", "matplotlib", "numpy"]
# ///
"""Per-paragraph word rarity: human posts vs AI-written summaries of the same books.

Run: uv run scripts/rarity.py
Reads content/blog/*.md (human) and data/ai-samples/<model>/*.md (AI),
writes public/images/rarity-violin.svg and data/ai-samples/rarity.json.
"""
import json
import re
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
matplotlib.rcParams["svg.fonttype"] = "path"  # text as outlines, renders the same everywhere
import matplotlib.pyplot as plt
import numpy as np
from wordfreq import tokenize, zipf_frequency

ROOT = Path(__file__).resolve().parent.parent
SAMPLES = ROOT / "data/ai-samples"
MIN_WORDS = 20  # ponytail: drop tiny blocks (captions, one-line lists) that make noisy scores

AUTHORS = {  # dir -> label, plot order
    "human": "My texts",
    "claude-opus": "Claude Opus 5.5",
    "claude-sonnet": "Claude Sonnet 5.5",
    "gpt-6.1-sol": "GPT-6.1 Sol",
    "gpt-5.6-terra": "GPT-5.6 Terra",
}
COLORS = ["#a1756a", "#e06666", "#f0a35e", "#5b9bd5", "#9b7fd1"]


def paragraphs(md):
    md = re.sub(r"\A---.*?---", "", md, flags=re.S)  # front matter
    md = re.sub(r"<[^>]+>|!\[[^\]]*\]\([^)]*\)", " ", md)  # html, images
    md = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", md)  # links -> text
    for block in re.split(r"\n\s*\n", md):
        # headings and blockquotes (quotes from the book) aren't the writer's prose
        lines = [l for l in block.splitlines() if not l.lstrip().startswith(("#", ">"))]
        words = [w for w in tokenize(" ".join(lines), "en") if w.isalpha()]
        if len(words) >= MIN_WORDS:
            yield words


def rarity(words):
    # zipf: ~7 for "the", 0 for unknown words. Higher score = rarer vocabulary.
    return float(np.mean([8 - zipf_frequency(w, "en") for w in words]))


def scores(files):
    return [rarity(p) for f in files for p in paragraphs(f.read_text())]


raw = {"human": scores(sorted((ROOT / "content/blog").glob("*.md")))}
for d in list(AUTHORS)[1:]:
    files = sorted((SAMPLES / d).glob("*.md"))
    if files:
        raw[d] = scores(files)

# Percentile against the pooled AI paragraphs, so AI sits near 0.5 by construction
ai_pool = np.sort(np.concatenate([raw[d] for d in raw if d != "human"]))
pct = {d: np.searchsorted(ai_pool, s, side="right") / len(ai_pool) for d, s in raw.items()}

summary = {AUTHORS[d]: {"paragraphs": len(p), "mean": round(float(np.mean(p)), 3),
                        "median": round(float(np.median(p)), 3)} for d, p in pct.items()}
(SAMPLES / "rarity.json").write_text(json.dumps(summary, indent=2))
print(json.dumps(summary, indent=2))

keys = list(pct)
fig, ax = plt.subplots(figsize=(8, 4.5))
parts = ax.violinplot([pct[k] for k in keys], showextrema=False, widths=0.8)
for body, k in zip(parts["bodies"], keys):
    body.set_facecolor(COLORS[list(AUTHORS).index(k)])
    body.set_alpha(0.85)
for i, k in enumerate(keys, 1):
    ax.hlines(np.mean(pct[k]), i - 0.18, i + 0.18, color="black", lw=2)
    ax.hlines(np.median(pct[k]), i - 0.18, i + 0.18, color="black", lw=1, linestyles="dashed")
ax.set_xticks(range(1, len(keys) + 1), [AUTHORS[k] for k in keys], rotation=20)
ax.set_ylim(0, 1)
ax.set_ylabel("Rarity percentile (vs. AI paragraphs)")
ax.set_title("Per-paragraph word rarity by author")
ax.grid(axis="y", alpha=0.3)
ax.spines[["top", "right"]].set_visible(False)
fig.tight_layout()
fig.savefig(ROOT / "public/images/rarity-violin.svg", transparent=True)
