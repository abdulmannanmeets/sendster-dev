import UploadData from './UploadData.js';

export default {
    template: `<button type="button" class="btn btn-primary">
    <input type="file" multiple @change="upload($event)">
</button>`,
    data: () => ({
        form: new UploadData({ contract_id: 5, files: [] })
    }),
    mounted() {
    },

    methods: {
        upload(event) {
            for (let file of event.target.files) {
                try {
                    let reader = new FileReader();
                    reader.readAsDataURL(file); // Not sure if this will work in this context.
                    this.form.files.push(file);
                } catch { }
            }
        },

        submit() {
            let files = this.contract_file.map((obj) => obj.file);
            let form = new MyFormData({ files: files });

            form.post('contracts/uploadfile/' + this.id_contract)
                .then(function () {
                    //
                })
                .catch(function () {
                    //
                });
        }
    }
}