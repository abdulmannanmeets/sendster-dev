import '../../../lib/drawflow/drawflow.min.js';
export default {
  template: `
<div class="row g-5 g-xl-8">
	<div class="col-xl-3">
		<router-link :to="{name:'mail_history', query:{type:'all'}}" class="card bg-body hoverable card-xl-stretch mb-xl-8">
			<div class="card-body">
				<span class="svg-icon svg-icon-primary svg-icon-3x ms-n1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.3" d="M21 18H3C2.4 18 2 17.6 2 17V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V17C22 17.6 21.6 18 21 18Z" fill="currentColor"/>
        <path d="M11.4 13.5C11.8 13.8 12.3 13.8 12.6 13.5L21.6 6.30005C21.4 6.10005 21.2 6 20.9 6H2.99998C2.69998 6 2.49999 6.10005 2.29999 6.30005L11.4 13.5Z" fill="currentColor"/>
        </svg>
				</span>
				<div class="text-gray-900 fw-bolder fs-2 mb-2 mt-5">Campaigns</div>
				<div class="fw-bold text-gray-400">{{item.composed.toLocaleString()}}</div>
			</div>
		</router-link>
	</div>
	<div class="col-xl-3">
		<router-link :to="{name:'mail_history', query:{type:'sent'}}" class="card bg-body hoverable card-xl-stretch mb-xl-8">
			<div class="card-body">
				<span class="svg-icon svg-icon-primary svg-icon-3x ms-n1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 8.725C6 8.125 6.4 7.725 7 7.725H14L18 11.725V12.925L22 9.725L12.6 2.225C12.2 1.925 11.7 1.925 11.4 2.225L2 9.725L6 12.925V8.725Z" fill="currentColor"/>
        <path opacity="0.3" d="M22 9.72498V20.725C22 21.325 21.6 21.725 21 21.725H3C2.4 21.725 2 21.325 2 20.725V9.72498L11.4 17.225C11.8 17.525 12.3 17.525 12.6 17.225L22 9.72498ZM15 11.725H18L14 7.72498V10.725C14 11.325 14.4 11.725 15 11.725Z" fill="currentColor"/>
        </svg>
				</span>
				<div class="text-gray-900 fw-bolder fs-2 mb-2 mt-5">Delivered mails</div>
				<div class="fw-bold text-gray-400">{{item.delivered.toLocaleString()}}</div>
			</div>
		</router-link>
	</div>
	<div class="col-xl-3">
    <router-link :to="{name:'mail_history', query:{type:'seen'}}" class="card bg-body hoverable card-xl-stretch mb-xl-8">
			<div class="card-body">
				<span class="svg-icon svg-icon-primary svg-icon-3x ms-n1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2">
        <path d="m17.5 11c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5-4.5-2.016-4.5-4.5 2.016-4.5 4.5-4.5zm-5.346 6.999c-.052.001-.104.001-.156.001-4.078 0-7.742-3.093-9.854-6.483-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 4.143 0 7.796 3.09 9.864 6.493.092.156.138.332.138.507 0 .179-.062.349-.15.516-.58-.634-1.297-1.14-2.103-1.472-1.863-2.476-4.626-4.544-7.749-4.544-3.465 0-6.533 2.632-8.404 5.5 1.815 2.781 4.754 5.34 8.089 5.493.09.529.25 1.034.471 1.506zm3.071-2.023 1.442 1.285c.095.085.215.127.333.127.136 0 .271-.055.37-.162l2.441-2.669c.088-.096.131-.217.131-.336 0-.274-.221-.499-.5-.499-.136 0-.271.055-.37.162l-2.108 2.304-1.073-.956c-.096-.085-.214-.127-.333-.127-.277 0-.5.224-.5.499 0 .137.056.273.167.372zm-3.603-.994c-2.031-.19-3.622-1.902-3.622-3.982 0-2.208 1.792-4 4-4 1.804 0 3.331 1.197 3.829 2.84-.493.146-.959.354-1.389.615-.248-1.118-1.247-1.955-2.44-1.955-1.38 0-2.5 1.12-2.5 2.5 0 1.363 1.092 2.472 2.448 2.499-.169.47-.281.967-.326 1.483z" fill-rule="nonzero" fill="currentColor"></path></svg>
				</span>
				<div class="text-gray-900 fw-bolder fs-2 mb-2 mt-5">Seen emails</div>
				<div class="fw-bold text-gray-400">{{item.seen.toLocaleString()}}</div>
			</div>
		</router-link>
	</div>
	<div class="col-xl-3">
		<a href="#" data-bs-toggle="modal" data-bs-target="#mlr_modal_all_leads" mlr-leads-show="true" class="card bg-body hoverable card-xl-stretch mb-xl-8">
			<div class="card-body">
				<span class="svg-icon svg-icon-primary svg-icon-3x ms-n1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.5 13c-1.932 0-3.5 1.567-3.5 3.5s1.568 3.5 3.5 3.5 3.5-1.567 3.5-3.5-1.568-3.5-3.5-3.5zm1.5 4h-1v1h-1v-1h-1v-1h1v-1h1v1h1v1zm-13.001-5.9c0 1.692-.766 2.9-1.206 3.9h-1.397c.227-1 1.954-3.415 1.021-4.982-.55-.923-2.272-.924-2.819-.015-.507.841-.24 2.417.712 4.215.518.978.374 1.734.162 2.197-.406.889-1.303 1.317-2.316 1.612-2.01.588-1.825.055-1.825 1.973h-1.329l-.002-.618c0-1.262.099-1.989 1.59-2.333 1.719-.397 3.319-.745 2.545-2.209-2.361-4.457-.627-6.84 1.866-6.84 1.687 0 2.998 1.09 2.998 3.1zm5.691 1.395c.607 1.146.447 2.016.206 2.543-.66 1.445-2.472 1.863-4.39 2.305-1.252.29-1.172.588-1.172 2.657h-1.331l-.003-.825c0-1.681.132-2.652 2.119-3.111 2.293-.53 4.427-.994 3.394-2.946-3.147-5.941-.835-9.118 2.488-9.118 3.164 0 5.337 2.879 3.041 8h-1.483c1.159-2.325 1.428-4.326.708-5.533-.902-1.517-3.617-1.509-4.512-.022-.768 1.273-.426 3.478.935 6.05z" fill="currentColor"></path></svg>
				</span>
				<div class="text-gray-900 fw-bolder fs-2 mb-2 mt-5">Subscribers</div>
				<div class="fw-bold text-gray-400">{{item.subscribers.toLocaleString()}}</div>
			</div>
		</a>
	</div>
</div>
<div class="col-xl-12">
  <div class="card mb-5 mb-xl-8">
    <div class="card-header border-0 align-items-center py-5 gap-2 gap-md-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">{{day}}'s record</span>
        <span class="text-muted mt-1 fw-bold fs-7">Details of emails sent in {{day.toLowerCase()}}</span>
      </h3>
      <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
        <input class="form-control form-control-solid w-100 mw-250px" placeholder="Pick date range" id="kt_campaign_report_views_daterangepicker">
      </div>
    </div>
    <div class="card-body py-3">
      <div id="dasboard_chart">
        <div class="spinner-border text-primary">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>

  <div class="card mb-5 mb-xl-8">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">Latest mails</span>
        <span class="text-muted mt-1 fw-bold fs-7">Last 10 composed mails</span>
      </h3>
    </div>
    <div class="card-body py-3">
      <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable table-striped" id="latest_emails">
        <thead>
          <tr class="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
            <th>#</th>
            <th>Date</th>
            <th>Subject</th>
            <th>Sent mails</th>
            <th>Opened</th>
            <th>Unopened</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
</div>
<div class="modal fade" id="mlr_modal_all_leads" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered mw-950px">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="fw-bolder">Subscription Leads</h2>
                    <div class="btn btn-icon btn-sm btn-active-icon-primary" data-bs-dismiss="modal">
                        <span class="svg-icon svg-icon-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                                <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
                    <input type="text" data-kt-user-table-filter="search1" class="form-control form-control-solid w-250px ps-14" placeholder="Search Lead">
                    <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped" id="mlr_table_leads">
                        <thead>
                            <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                <th>Name</th>
                                <th>Email</th>
                                <th>List ID</th>
                                <th>Extra fields</th>
                                <th>Created at</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 fw-bold"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
`,

  data() {
    return {
      item: {
        composed: 0,
        delivered: 0,
        seen: 0,
        subscribers: 0,
        report: {},
        lastthirtdaymails: [],
        sequencedata: [],
        _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
      },
      sent: null,
      opens: null,
      unsubs: null,
      legend: null,
      xAxis: null,
      day: "Last 30 days",
      dt: null,
      leadDt: null
    }
  },

  props: ['profile_details'],

  mounted() {
    let __this = this;
    this.leadsTable();
    loadAndRemoveDrawFlow(true)
    var t = moment().subtract(29, "days"), e = moment(), r = $("#kt_campaign_report_views_daterangepicker");
    function o(t, e) {
      __this.graphScriptSpinner(0);
      axios.post("dashboard", {
        startDate: t.format('DD-MM-YYYY'),
        endDate: e.format('DD-MM-YYYY'),
        search: true,
        difference: e.diff(t, "days"),
        type: "dashboard",
      }).then((res) => {
        let data = res.data;
        let lastthirtdaymails = data.thiry_day_record;
        __this.day = this.chosenLabel;
        __this.item = {
          composed: data.composed,
          delivered: data.delivered,
          seen: data.seen,
          subscribers: data.subscribers,
          report: data.report,
          lastthirtdaymails: lastthirtdaymails
        }
        __this.graphScriptSpinner();
        __this.dt.clear().rows.add(__this.item.report).draw();
        __this.xAxis.data.setAll(lastthirtdaymails);
        __this.sent.data.setAll(lastthirtdaymails);
        __this.opens.data.setAll(lastthirtdaymails);
        __this.unsubs.data.setAll(lastthirtdaymails);
      }).catch((error) => {
        swal_fire('', 'error', error.response.data.message)
      });
      r.html(t.format("MMMM D, YYYY") + " - " + e.format("MMMM D, YYYY"));
    }
    r.daterangepicker({
      startDate: t,
      endDate: e,
      ranges: {
        Today: [moment(), moment()],
        "Last 7 days": [moment().subtract(6, "days"), moment()],
        "Last 30 days": [moment().subtract(29, "days"), moment()],
        "Last 365 days": [moment().subtract(364, "days"), moment()],
        "All time": [new Date("01 Jan 2022"), moment()],
      }
    }, o);
    this.getDashboard();
    this.tableScript();
    var processElement = document.getElementById("latest_emails_processing");
    if (processElement) {
      processElement.removeAttribute('style');
    }
  },

  methods: {
    getDashboard() {
      let method = axios.post;
      let url = "dashboard";

      method(url, { type: 'dashboard' }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': this.item._token
        }
      })
        .then((res) => {
          let data = res.data;
          let lastthirtdaymails = data.thiry_day_record;
          this.item = {
            composed: data.composed,
            delivered: data.delivered,
            seen: data.seen,
            report: data.report,
            subscribers: data.subscribers,
            lastthirtdaymails: lastthirtdaymails
          }
          this.dt.rows.add(data.report).draw();
        })
        .catch((error) => {
          swal_fire('', 'error', error.response.data.message)
        }).finally(() => {
          document.getElementById("latest_emails_processing").style.display = "none";
          this.graphScript();
        });
    },

    tableScript() {
      "use strict";

      // Class definition
      var KTDatatablesServerSide = function (__this) {
        // Shared variables
        var table;
        var dt;
        var __this = __this

        // Private functions
        var initDatatable = function () {
          __this.dt = dt = $("#latest_emails").DataTable({
            searchDelay: 500,
            processing: true,
            data: __this.item.report,
            destroy: true,
            language: {
              processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
            },
            responsive: true,
            columns: [
              { data: null },
              { data: 'created_at' },
              { data: 'subject' },
              { data: 'sent' },
              { data: 'opened' },
              { data: 'unopened' },
              { data: 'attempt' },
            ],
            drawCallback: function () {
              $('[data-bs-toggle="tooltip"]').tooltip();
            },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                render: function (data, type, full, meta) {
                  return `
                    <div class="d-flex align-items-center justify-content-center">
                      <div class="d-flex justify-content-center flex-column">
                        <span class="text-muted fw-bold text-muted d-block fs-7">${meta.row + 1}</span>
                      </div>
                    </div>`;
                }
              },
              {
                targets: 1,
                orderable: true,
                className: 'text-nowrap',
                render: function (data) {
                  return data;
                }
              },
              {
                targets: 2,
                orderable: true,
                className: 'text-nowrap',
                render: function (data) {
                  return data;
                }
              },
              {
                targets: 3,
                orderable: true,
                className: 'text-nowrap',
                render: function (data) {
                  return data;
                }
              },
              {
                targets: 4,
                orderable: true,
                className: 'text-nowrap',
                render: function (data) {
                  return data;
                }
              },
              {
                targets: -1,
                data: null,
                orderable: false,
                className: 'text-end',
                render: function (data) {
                  return `
                    <button type="button" value="${data}" class="text-dark fw-bolder text-hover-white d-block mb-1 fs-7 btn btn-danger latest_emails_table" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
                  `;
                },
              },
            ],
          });

          table = dt.$;

          // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
          dt.on('draw', function () {
            initClickButton();
            KTMenu.createInstances();
          });
        }

        var initClickButton = function () {
          var buttons = document.querySelectorAll('.latest_emails_table');
          buttons.forEach(button => {
            button.addEventListener('click', function (e) {
              e.preventDefault();
              const parent = e.target.closest('tr');
              const userName = parent.querySelectorAll('td')[2].innerText;

              Swal.fire({
                text: "Are you sure you want to delete " + userName + "?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, delete!",
                cancelButtonText: "No, cancel",
                customClass: {
                  confirmButton: "btn fw-bold btn-danger",
                  cancelButton: "btn fw-bold btn-active-light-primary"
                }
              }).then(function (result) {
                if (result.value) {
                  // delete row data from server and re-draw datatable
                  let selected_id = [button.value];
                  axios.post("dashboard", {
                    type: "delete",
                    id: selected_id
                  }, {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'X-CSRF-Token': __this._token
                    }
                  }).then((res) => {
                    let post_data = res.data;
                    if (post_data.status) {
                      Swal.fire({
                        text: "You have deleted " + userName + "!.",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                          confirmButton: "btn fw-bold btn-primary",
                        }
                      }).then(function () {
                        __this.dt.row($(parent)).remove().draw();
                      });
                    } else {
                      swal_fire("", "error", userName + " was not deleted");
                    }
                  })
                }
              });
            });
          });
        }

        // Public methods
        return {
          init: function () {
            initDatatable();
            initClickButton();
          }
        }
      }(this);

      // On document ready
      KTUtil.onDOMContentLoaded(function () {
        KTDatatablesServerSide.init();
      }, this);
    },

    graphScriptSpinner(display = 1) {
      var dasboard_chart = document.querySelector("#dasboard_chart");
      dasboard_chart.removeAttribute("style");
      var secondDiv = document.querySelector("#dasboard_chart > div:nth-child(2)");
      if (display) {
        dasboard_chart.style.height = "500px";
        if (secondDiv) {
          secondDiv.classList.remove('d-none');
        }
        dasboard_chart.querySelector(".spinner-border").classList.add("d-none");
        return;
      }
      if (secondDiv) {
        secondDiv.classList.add('d-none');
      }
      dasboard_chart.querySelector(".spinner-border").classList.remove("d-none");
    },

    graphScript() {
      this.graphScriptSpinner();

      var root = am5.Root.new("dasboard_chart");
      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout
      }));

      var legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50
        })
      );
      this.legend = legend

      var data = this.item.lastthirtdaymails;

      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "date",
        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9
        }),
        tooltip: am5.Tooltip.new(root, {})
      }));
      this.xAxis = xAxis;

      xAxis.data.setAll(data);

      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      }));

      yAxis.min = 0;
      yAxis.maxPrecision = 0;
      yAxis.strictMinMax = true;

      function makeSeries(name, fieldName) {
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: "date"
        }));

        series.columns.template.setAll({
          tooltipText: "{name}, {categoryX}:{valueY}",
          width: am5.percent(90),
          tooltipY: 0
        });

        series.data.setAll(data);

        series.appear();

        series.bullets.push(function () {
          return am5.Bullet.new(root, {
            locationY: 0,
            sprite: am5.Label.new(root, {
              text: (value, target, key) => Math.round(value),
              fill: root.interfaceColors.get("alternativeText"),
              centerY: 0,
              centerX: am5.p50,
              populateText: true
            })
          });
        });

        legend.data.push(series);
        return series;
      }

      this.sent = makeSeries("Sent mails", "sent");
      this.opens = makeSeries("Opened mails", "opens");
      this.unsubs = makeSeries("Unsubscribed emails", "unsubs");

      chart.appear(1000, 100);
    },

    show_extrafields(extra_fields) {
      let swal_html = ``
      try {
        let custom_fields = typeof extra_fields == "object" ? extra_fields : JSON.parse(extra_fields);
        if (custom_fields.length > 0) {
          let thead_tr = ``;
          let tbody_tr = ``;
          custom_fields.forEach((value, index) => {
            if (value.property !== "" && value.value !== "") {
              thead_tr += `<th>${value.property}</th>`
              tbody_tr += `<td>${value.value}</td>`
            }
          })
          swal_html = `<div class="card-body py-4 p-0 leads_extra_fields"><table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"><thead><tr class="">${thead_tr}</tr></thead><tbody class="text-gray-600 fw-bold"><tr <tr class="text-center text-muted fw-bolder fs-7 text-uppercase gs-0">${tbody_tr}</tr></tbody></table></div>`;
        } else {
          swal_html = `<div class="table-responsive"><table class="table table-striped"><thead>No data found</thead></table></div>`;
        }
      } catch (err) {
        console.log(err)
        swal_html = `<div class="table-responsive"><table class="table table-striped"><thead>No data found</thead></table></div>`;
      }

      Swal.fire({
        title: 'Custom Data <hr>',
        html: swal_html,
        width: '800px',
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: true,
        closeButtonHtml: '<i class="fas fa-times"></i>'
      });
    },

    leadsTable() {
      var e, __this = this, o = document.getElementById("mlr_table_leads"), showExtraFields = () => {
        var all_rows = document.querySelectorAll('[show_extra_fields="true"'), all_routes = document.querySelectorAll('[data-sendster-click="route"]');
        all_rows.forEach(row => {
          row.addEventListener("click", function (e) {
            e.preventDefault();
            __this.show_extrafields(JSON.parse(decodeURIComponent(escape(window.atob(row.value)))));
          });
        });
        all_routes.forEach(route => {
          route.addEventListener("click", function (e) {
            e.preventDefault();
            __this.$router.push({ name: 'edit_lists', query: { id: route.getAttribute('value') } });
          });
        });
      };

      var handleBtnClick = () => {
        var btn = document.querySelector('[mlr-leads-show="true"]');
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            __this.getLeads("all");
        });
      };
      this.leadDt = e = $(o).DataTable({
        info: 1,
        searchDelay: 500,
        data: [],
        processing: true,
        stripeClasses: ['odd-row', 'even-row'],
        destroy: true,
        language: {
          processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
        },
        pageLength: 10,
        lengthChange: !0,
        oLanguage: {
          sEmptyTable: "No leads found!"
        },
        drawCallback: function () {
          $('[data-bs-toggle="tooltip"]').tooltip();
        },
        columns: [
          { data: 'name' },
          { data: 'email' },
          { data: 'list_id' },
          { data: 'extra_fields' },
          { data: 'created_at' },
        ],
        columnDefs: [
          {
            targets: 0,
            orderable: true,
            className: 'text-nowrap',
            render: function (data) {
              return data;
            }
          },
          {
            targets: 1,
            orderable: true,
            className: 'text-nowrap',
            render: function (data) {
              return data;
            }
          },
          {
            targets: 2,
            orderable: true,
            className: 'text-nowrap',
            render: function (data, type, row) {
              return `<div data-sendster-click="route" data-bs-toggle="tooltip" data-bs-placement="top" title="Visi list" value="${data}" role="button">${data}</div>`;
            }
          },
          {
            targets: 3,
            orderable: true,
            className: 'text-nowrap',
            render: function (data) {
              data = window.btoa(unescape(encodeURIComponent(JSON.stringify(data))));
              return `<button class="btn unstyled-button text-info" show_extra_fields="true" value="${data}"><i class="fas fa-eye"></i></button>`;
            }
          },
          {
            targets: -1,
            orderable: true,
            className: 'text-nowrap',
            render: function (data) {
              return data;
            }
          },
        ]
      }).on("draw", (function () {
        showExtraFields();
      })), document.querySelector('[data-kt-user-table-filter="search1"]').addEventListener("keyup", (function (t) {
        e.search(t.target.value).draw()
      })), showExtraFields(), handleBtnClick();
    },

    getLeads(id) {
      this.leadDt.clear();
      document.getElementById("mlr_table_leads_processing").removeAttribute("style");
      axios.post("list", {
        list_type: "get_form_leads",
        form_id: id
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': this._token
        }
      }).then((res) => {
        res = res.data;
        this.leadDt.clear().rows.add(res).draw();
      }).catch((error) => {
        swal_fire("", "error", error.response.data.message)
      }).finally(() => {
        document.getElementById("mlr_table_leads_processing").style.display = "none";
      })
    }
  },
}