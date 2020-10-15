import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    OnDestroy,
    ViewEncapsulation
} from "@angular/core";
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    FormControl,
    FormArray
} from "@angular/forms";
import { Subscription } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { ImageUploadConfig } from './image-upload.config';

@Component({
    selector: "app-imageupload",
    templateUrl: "./imageupload.component.html",
    styleUrls: ["./imageupload.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageuploadComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class ImageuploadComponent
    implements ControlValueAccessor, OnInit, OnDestroy {
    @Input() label: string;
    @Input() type: string = "single";
    @Input() disabled: boolean = false;
    @Input() noLabel: boolean = false;
    @Input() imageUrlField: string;

    @Input() uploadConfig: ImageUploadConfig = {
        autoUpload: false
    }
    @Output() valueChange = new EventEmitter();
    @Output() uploadCallback = new EventEmitter();
    formArray: FormArray = new FormArray([]);
    formControl: FormArray = new FormArray([]);
    formSubscriber: Subscription;
    formError: any;
    onChange = (value: any) => { };
    onTouched = (value: any) => { };


    options: any = {
        fileSize: 2048,
        minWidth: 0,
        maxWidth: 0,
        minHeight: 0,
        maxHeight: 0,
        fileType: ["image/gif", "image/jpeg", "image/png"],
        height: 400,
        quality: 0.8
    };

    constructor(
        private httpClient: HttpClient
    ) { }

    @Input()
    set error(value: any) {
        this.formError = value;
    }

    ngOnInit() {
        this.formSubscriber = this.formControl.valueChanges.subscribe(val => {
            this.formError = null;
            let data = this.formControl.value
            if (data && data.length) {
                if (this.type == 'single') {
                    data = data[0].file
                }
            } else {
                data = ''
            }
            this.onChange(data);
        });
    }

    ngOnDestroy() {
        this.formSubscriber.unsubscribe();
    }

    onUpload(file) {
        if (this.uploadConfig.autoUpload) {
            const formData = new FormData();
            formData.append('file', file);

            this.httpClient.post(this.uploadConfig.api, formData).subscribe((response: any) => {
                this.formControl.push(new FormControl({
                    name: this.randomName(),
                    file: response.url
                }));
            })
        }
    }

    writeValue(value: any): void {
        if (this.type == "single") {
            this.formControl.clear()
            if (value) {
                this.formControl.push(new FormControl({ file: value }));
            }
        } else {
            value.map(item => {
                this.formControl.push(new FormControl({ file: item }));
            });
        }
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    randomName() {
        return (
            Math.random()
                .toString(36)
                .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15) +
            ".png"
        );
    }

    getFile(event) {
        const file = event.target.files[0];
        if (!this.uploadConfig.autoUpload) {
            this.formControl.push(new FormControl({
                name: this.randomName(),
                file: file
            }));
        }
        this.onUpload(file)
    }

    removeImage(index) {
        const form = this.formControl as FormArray;
        form.removeAt(index);
    }
}
