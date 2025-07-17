"use strict";
var KTUsersList = function() {
	var e, t, n, r, mom,o = document.getElementById("kt_table_users"), date_picker = document.querySelector('#kt_ecommerce_report_views_daterangepicker'), export_trigger = document.querySelector('[data-kt-export-trigger="true"]'), form_appear = document.querySelector('[data-kt-create-model="true"]'),
		c = () => {
		},
		l = () => {
			const c = o.querySelectorAll('[type="checkbox"]'), s = document.querySelector('[data-kt-user-table-select="delete_selected"]');
			n = document.querySelector('[data-kt-user-table-toolbar="selected"]'), r = document.querySelector('[data-kt-user-table-select="selected_count"]');
			c.forEach((e => {
				e.addEventListener("click", (function() {
					setTimeout((function() {
						a()
					}), 50)
				}))
			}))
		};
	const a = () => {
		const e = o.querySelectorAll('tbody [type="checkbox"]');
		let c = !1,
			l = 0;
		e.forEach((e => {
			e.checked && (c = !0, l++)
		})), c ? (r.innerHTML = l, n.classList.remove("d-none"), date_picker.classList.add('d-none'), export_trigger.classList.add('d-none'), form_appear.classList.add('d-none')) : (n.classList.add("d-none"), date_picker.classList.remove('d-none'), export_trigger.classList.remove('d-none'), form_appear.classList.remove('d-none'))
	};
	return {
		init: function() {
			o && (o.querySelectorAll("tbody tr").forEach((e => {
				const t = e.querySelectorAll("td"),
					n = t[3].innerText.toLowerCase();
				let r = 0,
					o = "minutes";
				n.includes("yesterday") ? (r = 1, o = "days") : n.includes("mins") ? (r = parseInt(n.replace(/\D/g, "")), o = "minutes") : n.includes("hours") ? (r = parseInt(n.replace(/\D/g, "")), o = "hours") : n.includes("days") ? (r = parseInt(n.replace(/\D/g, "")), o = "days") : n.includes("weeks") && (r = parseInt(n.replace(/\D/g, "")), o = "weeks");
				const c = moment().subtract(r, o).format();
				t[3].setAttribute("data-order", c);
				try {
					const l = moment(t[5].innerHTML, "DD MMM YYYY, LT").format();
					t[5].setAttribute("data-order", l)
				} catch {
					const l = moment(t[2].innerHTML, "DD MMM YYYY, LT").format();
					t[2].setAttribute("data-order", l)
				}
			})), (e = $(o).DataTable({
				info: !1,
				order: [],
				pageLength: 10,
				lengthChange: !0,
				columnDefs: [{
					orderable: !1,
					targets: 0
				}, {
					orderable: !1,
					targets: 0
				}]
			})).on("draw", (function() {
				l(), c(), a()
			})), (() => {
                var t = moment().subtract(29, "days"),
					e = moment(),
					r = $("#kt_ecommerce_report_views_daterangepicker");

				function o(t, e) {
					r.html(t.format("MMMM D, YYYY") + " - " + e.format("MMMM D, YYYY"))
				}
				r.daterangepicker({
					startDate: t,
					endDate: e,
					ranges: {
						Today: [moment(), moment()],
						Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
						"Last 7 Days": [moment().subtract(6, "days"), moment()],
						"Last 30 Days": [moment().subtract(29, "days"), moment()],
						"This Month": [moment().startOf("month"), moment().endOf("month")],
						"Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
					}
				}, o), o(t, e)
			})(), (() => {
				const e = "Product Views Report";
				new $.fn.dataTable.Buttons(o, {
					buttons: [{
						extend: "copyHtml5",
						title: e
					}, {
						extend: "excelHtml5",
						title: e
					}, {
						extend: "csvHtml5",
						title: e
					}, {
						extend: "pdfHtml5",
						title: e
					}]
				}).container().appendTo($("#kt_ecommerce_report_views_export")), document.querySelectorAll("#kt_ecommerce_report_views_export_menu [data-kt-ecommerce-export]").forEach((t => {
					t.addEventListener("click", (t => {
						t.preventDefault();
						const e = t.target.getAttribute("data-kt-ecommerce-export");
						document.querySelectorAll(".dt-buttons .buttons-" + e)[1].click()
					}))
				}))
			})(), l(), document.querySelector('[data-kt-user-table-filter="search"]').addEventListener("keyup", (function(t) {
				console.log(t.target.value, e)
				e.search(t.target.value).draw()
			})), c())
		}
	}
}();
KTUtil.onDOMContentLoaded((function() {
	KTUsersList.init()
}));