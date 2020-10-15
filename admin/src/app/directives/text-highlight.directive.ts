import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appTextHighlight]'
})
export class TextHighlightDirective {

    @Input() caseSensitive: boolean = false;

    private _search: string = '';
    private _text: string = '';
    private separatedText: string[] = [];
    private separatedSearchedText: string[] = [];
    private finalText = '';
    searchPattern: any;
    matchpattern: any;
    splitFlag = '';
    matchFlag = '';
    spanStart = '<span class="app-text-highlight">';
    spanEnd = '</span>';

    constructor(private el: ElementRef) {
    }

    @Input('search')
    set search(search: string) {
        this._search = search;
        this.highlight();
    }

    @Input('text')
    set text(text: string) {
        this._text = text;
        this.highlight();
    }

    highlight() {
        this.finalText = '';
        if (!this.caseSensitive) {
            this.splitFlag = 'i';
            this.matchFlag = 'gi';
        } else {
            this.splitFlag = '';
            this.matchFlag = 'g';
        }
        this.searchPattern = new RegExp(this._search, this.splitFlag);
        this.matchpattern = new RegExp(this._search, this.matchFlag);

        if (this._search !== undefined && this._search != null && this._search.length > 0 && this._search[0] !== '.') {

            this.separatedText = this._text.split(this.searchPattern);
            this.separatedSearchedText = this._text.match(this.matchpattern);

            if (this.separatedSearchedText != null && this.separatedSearchedText.length > 0) {
                for (let i = 0; i < this.separatedText.length; i++) {
                    if (i <= this.separatedSearchedText.length - 1) {
                        this.finalText += this.separatedText[i] + this.spanStart + this.separatedSearchedText[i] + this.spanEnd;
                    } else {
                        this.finalText += this.separatedText[i];
                    }
                }
            }
            if (this.finalText.length > 0) {
                this.el.nativeElement.innerHTML = this.finalText;
            } else {
                this.el.nativeElement.innerText = this._text;
            }
        } else {
            this.el.nativeElement.innerText = this._text;
        }

    }

}
