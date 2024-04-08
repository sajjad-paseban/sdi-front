export default interface VForm extends HTMLFormElement {
    validate(): Promise<{valid:boolean}>;
    reset():Promise<{valid:boolean}>;
}