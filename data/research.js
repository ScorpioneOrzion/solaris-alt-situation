export default class Research {
    constructor(name, baseCost, level, forumla) {
        this.name = name;
        this.baseCost = baseCost;
        this.level = level;
        this.current = 0;
        this.forumla = forumla;
    }

    addResearch(amount) {
        this.current += amount;
        while (this.current >= this.result) {
            this.current -= this.result;
            this.level += 1;
        }
    }

    get result() {
        return this.forumla(this.baseCost, this.level);
    }
}