import fs from 'fs';

class Html {
    constructor() {
        this.html = null;
    }

    getHtml() {
        if(this.html) {
            return this.html;
        }
        const htmlPath = `./public/index.html`;
        this.html = fs.readFileSync(htmlPath, 'utf8');
        return this.html;
    }
}

export default new Html();
