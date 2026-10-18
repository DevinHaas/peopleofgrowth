---
title: "Written by me, not by AI"
description: "How my book summaries compare to summaries written by AI models, and how the comparison was made."
---

Every summary on this site is written by me. Claims are cheap, so here is a test you can check yourself: I compared my texts with summaries of the same books written by four AI models.

![Per-paragraph word rarity by author](/images/rarity-violin.svg)

### What the chart shows

Each shape is a violin plot [6]: the wider it is at a given height, the more paragraphs score there. The solid line is the average, the dashed line is the median.

The height is **word rarity**: how unusual the words in a paragraph are. A paragraph at 0.2 uses more common words than 80% of all AI-written paragraphs.

My texts sit low. The AI models reach for less common words, which matches published research on AI writing: language models overuse words like "delve", "intricate" or "meticulous" far more often than people do [4, 5].

| Author | Paragraphs | Average | Median |
|---|---|---|---|
| My texts | 243 | 0.25 | 0.14 |
| Claude Opus 5.5 | 295 | 0.40 | 0.36 |
| Claude Sonnet 5.5 | 233 | 0.41 | 0.37 |
| GPT-6.1 Sol | 382 | 0.60 | 0.63 |
| GPT-5.6 Terra | 105 | 0.64 | 0.69 |

### How it was calculated

1. **Same books, same task.** Each of the four AI models got one identical prompt: write a blog summary of each of the 14 books on this site, at about the same length as mine. The models never saw my texts.
2. **Split into paragraphs.** Every text was split into paragraphs. Headings, images and quotes from the books were removed, because they are not anyone's own writing. Paragraphs with fewer than 20 words were dropped.
3. **Score every word.** Each word gets a frequency score from *wordfreq* [2], a database of how often words appear in everyday English. The scores use the Zipf scale [1]: "the" scores about 7, a rare word close to 0. A word's rarity is `8 − Zipf score`.
4. **Score every paragraph.** A paragraph's score is the average rarity of its words. Measuring writing by how many uncommon words it uses is an established method in linguistics [3].
5. **Compare.** Every paragraph is ranked against all AI-written paragraphs together (a percentile from 0 to 1), and the results are drawn as violin plots [6] using kernel density estimation [7].

### Limits

This shows that my writing *differs* from how these models write. It is not a lie detector, and no single number can prove authorship. One model (GPT-5.6 Terra) wrote shorter texts than asked, so its shape is based on fewer paragraphs.

The full method, the prompt and all AI-written texts are in the [source code of this site](https://github.com/DevinHaas/peopleofgrowth) under `scripts/rarity.py` and `data/ai-samples/`, so anyone can rerun it.

### References

1. van Heuven, W. J. B., Mandera, P., Keuleers, E., & Brysbaert, M. (2014). SUBTLEX-UK: A new and improved word frequency database for British English. *Quarterly Journal of Experimental Psychology*, 67(6), 1176–1190. [doi:10.1080/17470218.2013.850521](https://doi.org/10.1080/17470218.2013.850521)
2. Speer, R. (2022). *wordfreq* (v3.0) [Software]. Zenodo. [doi:10.5281/zenodo.7199437](https://doi.org/10.5281/zenodo.7199437)
3. Laufer, B., & Nation, P. (1995). Vocabulary size and use: Lexical richness in L2 written production. *Applied Linguistics*, 16(3), 307–322. [doi:10.1093/applin/16.3.307](https://doi.org/10.1093/applin/16.3.307)
4. Liang, W., Izzo, Z., Zhang, Y., Lepp, H., et al. (2024). Monitoring AI-modified content at scale: A case study on the impact of ChatGPT on AI conference peer reviews. *ICML 2024*. [doi:10.48550/arXiv.2403.07183](https://doi.org/10.48550/arXiv.2403.07183)
5. Kobak, D., González-Márquez, R., Horvát, E.-Á., & Lause, J. (2025). Delving into LLM-assisted writing in biomedical publications through excess vocabulary. *Science Advances*, 11(27). [doi:10.1126/sciadv.adt3813](https://doi.org/10.1126/sciadv.adt3813)
6. Hintze, J. L., & Nelson, R. D. (1998). Violin plots: A box plot-density trace synergism. *The American Statistician*, 52(2), 181–184. [doi:10.1080/00031305.1998.10480559](https://doi.org/10.1080/00031305.1998.10480559)
7. Scott, D. W. (1992). *Multivariate Density Estimation: Theory, Practice, and Visualization*. Wiley. [doi:10.1002/9780470316849](https://doi.org/10.1002/9780470316849)
