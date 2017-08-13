import { Validators } from 'lc-form-validation';


const MAXSIZE = 5 * 1024 * 1024;
export const PHOTO_FIELDS_VALIDATION = {
    fields: {
        name: [
            { validator: Validators.required },
        ],
        tooltip: [
            { validator: Validators.required }
        ],
        pointer: [
            { validator: Validators.required }
        ],
        // preview: [
        //     { validator: Validators.pattern, customParams: { pattern: MAXSIZE } }
        // ]
    }
};
