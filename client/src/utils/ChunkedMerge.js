class ChunkedMerge {
  constructor(title) {
    this.title = title;
    this.chunks = [[]];
    this.inConflict = false;
    this.contextLength = 3;
  }

  addOps(ops) {
    if (this.inConflict) {
      this.chunks.push(ops);
    } else {
      this.chunks[this.chunks.length - 1].push(...ops);
    }
    this.inConflict = false;
  }

  addConflictOps({ mainOps, mergeOps }) {
    if (this.inConflict) {
      const chunk = this.chunks[this.chunks.length - 1];
      chunk.mainOps.push(mainOps);
      chunk.mergeOps.push(mergeOps);
    } else {
      this.chunks.push({ mainOps, mergeOps });
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
        contextBefore: prevChunk.slice(prevChunk.length - this.contextLength),
        contextAfter: nextChunk.slice(0, this.contextLength),
        mainDraft: this.chunks[i].mainOps,
        mergeDraft: this.chunks[i].mergeOps
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
    return {title: this.title, body: {
      entityMap: {},
      blocks: blocks.map(block => block.data)
    }};
  }
}

export default ChunkedMerge;
