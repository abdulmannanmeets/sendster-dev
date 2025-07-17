import * as index from "../../custom/documentation/charts/amcharts/index.js";
import * as xy from "../../custom/documentation/charts/amcharts/xy.js";
import * as Animated from "../../custom/documentation/charts/amcharts/Animated.js";

export default {
	template: `
<div class="modal fade" id="mlr_live_sending_emails" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered mw-650px">
		<div class="modal-content rounded">
			<div class="modal-header pb-0 border-0">
				<input type="text" data-mlr-live-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search Email">
				<div class="btn btn-sm btn-icon btn-active-color-primary justify-content-end" data-bs-dismiss="modal">
					<span class="svg-icon svg-icon-1">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>
							<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>
						</svg>
					</span>
				</div>
			</div>
			<div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
				<table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped" id="mlr_table_live_sending">
					<!--begin::Table head-->
                	<thead>
                	    <!--begin::Table row-->
                	    <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                	        <th class="min-w-125px">Email</th>
                	        <th class="min-w-125px">Status/Error</th>
                	    </tr>
                	    <!--end::Table row-->
                	</thead>
					<tbody class="text-gray-600 fw-bold"></tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<button type="button" data-bs-toggle="modal" class="d-none" id="data-mlr-modal-button" data-bs-target="#mlr_live_sending_emails" />

<div class="card card-xl-stretch mb-xl-8">
	<div class="card-header border-0 py-5">
		<h3 class="card-title align-items-start flex-column">
			<span class="card-label fw-bolder fs-3 mb-1">Live Statistics</span>
			<span class="text-muted fw-bold fs-7">{{subject}}</span>
		</h3>
	</div>
	<div class="card-body d-flex flex-column p-0">
		<div class="card-p position-relative">
			<div class="row g-0">
				<div class="col bg-light-primary px-6 py-8 rounded-2 mb-7 me-7">
					<h1 class="text-primary">{{recipients.total.toLocaleString()}}</h1>
					<a @click="showMlrTable('recipients')" class="text-primary fw-bold fs-6">Recipients</a>
				</div>
				<div class="col bg-light-primary px-6 py-8 rounded-2 mb-7">
					<h1 class="text-primary">{{delievered_emails.total.toLocaleString()}}</h1>
					<a @click="showMlrTable('delievered_emails')" class="text-primary fw-bold fs-6">Delivered mails</a>
				</div>
			</div>
			<div class="row g-0">
				<div class="col bg-light-primary px-6 py-8 rounded-2 mb-7 me-7">
					<h1 class="text-primary">{{pending_emails.total.toLocaleString()}}</h1>
					<a @click="showMlrTable('pending_emails')" class="text-primary fw-bold fs-6">Pending mails</a>
				</div>
				<div class="col bg-light-primary px-6 py-8 rounded-2 mb-7">
					<h1 class="text-primary">{{seen.total.toLocaleString()}}</h1>
					<a @click="showMlrTable('seen')" class="text-primary fw-bold fs-6">Seen</a>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="card card-bordered">
	<div class="card-body">
		<div class="bg-">
			<span class="indicator-progress">Please wait...
				<span data-kt-indicator="on" class="spinner-border spinner-border-sm align-middle ms-2"></span>
			</span>
		</div>
        <div id="live_sending_column" style="height: 500px;">
		</div>
    </div>
</div>
    `,
	props: ['profile_details'],
	data() {
		return {
			interval1: null,
			interval2: null,
			chartData: [{
				status: "Recipients",
				value: 0
			}, {
				status: "Delivered mails",
				value: 0
			}, {
				status: "Seen",
				value: 0
			}, {
				status: "Pending mails",
				value: 0
			}],
			seen: {
				total: 0,
				emails: []
			},
			selected: "recipients",
			subject: 'Loading...',
			recipients: {
				total: 0,
				emails: []
			},
			composed: {
				total: 0,
				emails: []
			},
			pending_emails: {
				total: 0,
				emails: []
			},
			delievered_emails: {
				total: 0,
				emails: []
			},
			live_sending_assets: {
				requesting: false,
				current_attempt_id: 0,
				email_title: "Loading...",
				id: this.$route.query.qmlr_id === undefined ? 0 : this.$route.query.qmlr_id,
				attempt: this.$route.query.compose_token,
			},
			dt: null,
			_token: document.querySelector('meta[name="__token"]').getAttribute('content'),
		}
	},

	mounted() {
		// this.checkDetails();
		this.createChart();
		this.tableInit();
		let query = this.$route.query;
		// this.live_sending_assets.id = query.qmlr_id;
		this.live_sending_assets.current_attempt_id = query.token ?? query.compose_token;

		this.interval1 = setInterval(function (__this) {
			if (!__this.live_sending_assets.requesting) {
				__this.doCheck();
			}
		}, 3000, this);
	},

	methods: {
		checkDetails() {
			let query = this.$route.query
			let url = "api/index_email_settings"
			let method = axios.post
			let __this = this
			if (query.compose_token !== undefined) {
				method(url, {
					runserver: 1,
					compose_token: query.compose_token
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-CSRF-Token': __this._token
					}
				}).then((res) => {
				}).finally(() => {
					this.createChart()
				})
			} else {
				this.createChart()
			}
		},

		showMlrTable(str) {
			this.selected = str;
			this.dt.clear().rows.add(this[str].emails).draw();
			document.getElementById("data-mlr-modal-button").click();
		},

		doCheck() {
			let url = 'api/live_sending'
			let method = axios.post;
			let __this = this;

			if (__this.live_sending_assets.current_attempt_id > 0) {
				__this.live_sending_assets.requesting = true
				method(url, {
					attempt: __this.live_sending_assets.current_attempt_id,
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-CSRF-Token': __this._token
					}
				}).then((res) => {
					let post_data = res.data
					if (post_data.attempt_id !== undefined) {
						__this.live_sending_assets.current_attempt_id = post_data.attempt_id
						delete post_data.attempt_id
						__this.live_sending_assets.email_title = post_data.email_title.trim()
						__this.subject = post_data.email_title.trim()
						delete post_data.email_title
					}
					if (post_data.count_subs !== undefined) {
						__this.recipients = {
							total: parseInt(post_data.count_subs),
							emails: post_data.emails_subs
						};
						__this.composed = {
							total: parseInt(post_data.count_delivered) + parseInt(post_data.count_unsent),
							emails: post_data.unsent_emails.concat(post_data.delievered_emails)
						}
					}
					__this.delievered_emails = {
						total: parseInt(post_data.count_delivered),
						emails: post_data.delievered_emails
					};
					__this.pending_emails = {
						total: parseInt(post_data.count_unsent),
						emails: post_data.unsent_emails
					};
					__this.seen = {
						total: parseInt(post_data.count_seen),
						emails: post_data.seen_emails
					};
					__this.chartData = [{
						status: "Recipients",
						value: __this.recipients.total
					}, {
						status: "Delivered mails",
						value: __this.delievered_emails.total
					}, {
						status: "Seen",
						value: __this.seen.total
					}, {
						status: "Pending mails",
						value: __this.pending_emails.total
					}];
				}).catch((error) => {
				})

				__this.live_sending_assets.requesting = false
			}
		},

		createChart() {
			let __this = this
			am5.ready(function () {
				var root = am5.Root.new("live_sending_column");

				// Set themes
				root.setThemes([
					am5themes_Animated.new(root)
				]);

				// Create chart
				let chart = root.container.children.push(am5xy.XYChart.new(root, {
					panX: true,
					panY: true,
					wheelX: "panX",
					wheelY: "zoomX",
					pinchZoomX: true
				}));

				// Add cursor
				let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
				cursor.lineY.set("visible", false);


				// Create axes
				let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
				xRenderer.labels.template.setAll({
					rotation: 0,
					centerY: am5.p50,
					centerX: am5.p100,
					paddingRight: 15
				});

				let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
					maxDeviation: 0.3,
					categoryField: "status",
					renderer: xRenderer,
					tooltip: am5.Tooltip.new(root, {})
				}));

				let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
					maxDeviation: 0.3,
					renderer: am5xy.AxisRendererY.new(root, {})
				}));

				let series = chart.series.push(am5xy.ColumnSeries.new(root, {
					name: "Series 1",
					xAxis: xAxis,
					yAxis: yAxis,
					valueYField: "value",
					sequencedInterpolation: true,
					categoryXField: "status",
					tooltip: am5.Tooltip.new(root, {
						labelText: "{valueY}"
					})
				}));

				series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
				series.columns.template.adapters.add("fill", function (fill, target) {
					return chart.get("colors").getIndex(series.columns.indexOf(target));
				});

				series.columns.template.adapters.add("stroke", function (stroke, target) {
					return chart.get("colors").getIndex(series.columns.indexOf(target));
				});

				__this.interval2 = setInterval(function () {
					xAxis.data.setAll(__this.chartData);
					series.data.setAll(__this.chartData);
				}, 1500)
				xAxis.data.setAll(__this.chartData);
				series.data.setAll(__this.chartData);
				series.appear(1000);
				chart.appear(1000, 100);
			});
		},

		tableInit() {
			let __this = this;
			const o = document.getElementById("mlr_table_live_sending");
			this.dt = $(o).DataTable({
				info: 1,
				order: [],
				searchDelay: 500,
				processing: true,
				data: this.recipients.emails,
				pageLength: 10,
				lengthChange: 1,
				language: {
					processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
				},
				oLanguage: {
					sEmptyTable: "No emails found!"
				},
				columns: [
					{ data: null },
					{ data: null },
				],
				columnDefs: [
					{
						targets: 0,
						orderable: 1,
						className: 'text-nowrap',
						render: function (data, type, row) {
							return row.email;
						}
					},
					{
						targets: 1,
						orderable: 0,
						class: 'text-nowrap',
						render: function (data, type, row) {
							var selected = __this.selected;
							if (selected == "recipients")
								return data.error ? '<span class="text-danger">' + row.error + '</span>' : '<span class="text-info">Queue</span>';
							else if (selected == "delievered_emails")
								return '<span class="text-success">Delievered</span>';
							else if (selected == "pending_emails")
								return '<span class="text-danger">' + row.error + '</span>';
							else if (selected == "seen")
								return '<span class="text-success">Seen</span>';
						}
					},
				]
			}).on("draw", (function () {
				// console.log(__this.dt);
			})), document.querySelector('[data-mlr-live-table-filter="search"]').addEventListener("keyup", (function (t) {
				__this.dt.search(t.target.value).draw();
			}));
		}
	},

	unmounted() {
		clearInterval(this.interval1)
		clearInterval(this.interval2)
	},
}