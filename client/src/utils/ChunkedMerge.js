class ChunkedMerge {
  constructor(title) {
    this.title = title;
    this.chunks = [[]];
    this.inConflict = false;
    this.contextLength = 3;
  }

  addOps(ops) {
    const lines = ops.map(op => op.data);
    if (this.inConflict) {
      this.chunks.push(lines);
    } else {
      this.chunks[this.chunks.length - 1].push(...lines);
    }
    this.inConflict = false;
  }

  addConflictOps({ mainOps, mergeOps }) {
    const mainLines = mainOps.map(op => op.data);
    const mergeLines = mergeOps.map(op => op.data);
    if (this.inConflict) {
      const chunk = this.chunks[this.chunks.length - 1];
      chunk.mainLines.push(mainLines);
      chunk.mergeLines.push(mergeLines);
    } else {
      this.chunks.push({ mainLines, mergeLines });
    }
    this.inConflict = true;
  }

  getConflicts() {
    const conflicts = [];
    for (let i = 0; i < this.chunks.length; i++) {
      if (i % 2 === 0) continue;
      const prevChunk = this.chunks[i - 1];
      const nextChunk = this.chunks[i + 1] || [];
      conflicts.push({
        contextBefore: prevChunk
          .slice(prevChunk.length - this.contextLength)
          .join(),
        contextAfter: nextChunk.slice(0, this.contextLength).join(''),
        mainDraft: this.chunks[i].mainLines.join(''),
        mergeDraft: this.chunks[i].mergeLines.join('')
      });
    }
    return conflicts;
  }

  resolveConflicts(newChunks) {
    const blocks = [];
    if (newChunks.length !== Math.floor(this.chunks.length / 2)) {
      throw Error(`Wrong number of resolved chunks.
Expected: ${Math.floor(this.chunks.length / 2)}
Passed: ${newChunks.length}`);
    }
    for (let i = 0; i < this.chunks.length; i++) {
      if (i % 2 === 0) {
        blocks.push(...this.chunks[i]);
      } else {
        blocks.push(...newChunks[Math.floor(i / 2)]);
      }
    }
    return {
      title: this.title,
      bodyHTML: blocks.join('')
    };
  }
}

export default ChunkedMerge;
