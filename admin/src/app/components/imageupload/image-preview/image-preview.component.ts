import { Component, OnInit, Input } from "@angular/core";
import { environment as ENV } from '../../../../environments/environment';

@Component({
    selector: "app-image-preview",
    templateUrl: "./image-preview.component.html",
    styleUrls: ["./image-preview.component.scss"]
})
export class ImagePreviewComponent implements OnInit {
    preview: string = "";
    @Input() imageUrlField: string = "image";

    @Input()
    set source(value) {
        this.setSourceFile(value.file)
    }
    constructor() { }

    ngOnInit() { }

    setSourceFile(source) {
        switch (typeof (source)) {
            case 'object': {
                this.previewFromFile(source)
                return;
            }
            case 'string': {
                this.previewFromUrl(source)
                return;
            }
        }
    }

    loadedBase64File(base64) {
        this.preview = base64
    }

    previewFromFile(file: any) {
        if (file && file.file instanceof File) {
            const fileReader: FileReader = new FileReader();
            const newFile: any = file

            fileReader.onloadend = e => {
                this.loadedBase64File(fileReader.result);
            };
            fileReader.readAsDataURL(newFile.file);
        } else {
            this.preview = file[this.imageUrlField];
        }
    }

    previewFromUrl(source) {
        this.preview = ENV.apiUrl + source;
    }
}
