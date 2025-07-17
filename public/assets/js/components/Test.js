export default {
  template: `
    <div class="card-body py-4 overflow-auto">
        <!--begin::Table-->
        {{}}
        <!--end::Table-->
      </div>
    `,

  data() {
    return {
      list_id: 'c81e728d9d4c2f636f067f89cc14862c',
      _token: document.querySelector('meta[name="__token"]').getAttribute('content')
    }
  },

  mounted() {
    this.func();
  },

  methods: {
    func() {
      axios.post("test", {}, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': this._token
        }
      }).then((res) => {
        res = res.data;
        console.log(res);
      });
    }
  },
}