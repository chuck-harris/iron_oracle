class IndexRange {
    constructor(startIndex, endIndex)
    {
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }
}

class OracleList {
    constructor(title) {
        this.title = title
        this.indices = [];
        this.results = [];
    }

    registerResult(startIndex, endIndex, result) {
        this.indices.push( new IndexRange(startIndex, endIndex));
        this.results.push(result);
    }

    get(index) {
        let result = "Nothing found.";
        for (let i = 0; i < this.indices.length; i++) {
            if (index >= this.indices[i].startIndex && index <= this.indices[i].endIndex) {
                result = this.results[i];
            }
        }

        return result;
    }

    roll() {
        let roll = Math.floor(Math.random() * 100) + 1;
        return this.get(roll);
    }
}

module.exports = OracleList;

