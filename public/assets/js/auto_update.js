function AutoUpdate() {
    this.downloadUrl = 0;
    this.version = 0;
    this.changes = "";
    this.container = 0;
    this.is_gcp = 0;
    this.__token = document.querySelector('meta[name="__token"]').getAttribute('content');

    this.init = function () {
        var thiss = this;
        axios.post("update", { "check_update": "install_dependency" }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRF-Token': thiss.__token
            }
        }).then((data) => {
            data = data.data;
            if (data.status == 1) {
                this.checkForUpdate();
            } else {
                console.log(data);
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    this.checkForUpdate = function () {
        try {
            var thiss = this;
            axios.post("update", { "check_update": "check" }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': thiss.__token
                }
            }).then((data) => {
                data = data.data;
                if (data.status) {
                    try {
                        thiss.downloadUrl = data.download_url;
                        thiss.version = data.version;
                        thiss.changes = data.changes;
                        thiss.showUpdateBox();
                    } catch (exception) {
                        console.log(exception.message);
                    }
                } else {
                    thiss.tryReInstallation(data);
                }
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    this.doDownload = function () {
        var thiss = this;
        thiss.container.querySelectorAll(".card-body")[0].innerHTML = "<div class='text-primary py-3 text-center'><strong>Downloading...</strong></div>";
        axios.post("update", { "check_update": "download", "url": thiss.downloadUrl, "version": this.version }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRF-Token': thiss.__token
            }
        }).then((data) => {
            data = data.data;
            if (data.status) {
                thiss.container.querySelectorAll(".card-body")[0].innerHTML = "<div class='text-primary py-3 text-center'><strong>Installing...</strong></div>";
                thiss.doInstall();
            } else {
                thiss.tryReInstallation(data);
            }
        }).catch((error) => {
            thiss.tryReInstallation(data);
        });
    };

    this.doInstall = function () {
        var thiss = this;
        axios.post("update", { "check_update": "install", "version": this.version }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRF-Token': thiss.__token
            }
        }).then((data) => {
            data = data.data;
            if (data.status) {
                axios.post("update", { "check_update": "install_dependency", "version": thiss.version }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRF-Token': thiss.__token
                    }
                }).then((data) => {
                    data = data.data;
                    if (data.status) {
                        thiss.container.querySelectorAll(".card-body")[0].innerHTML = "<div class='text-success py-3 text-center'><strong>Installed Successfully.</strong></font>";
                        setTimeout(function () { document.body.removeChild(thiss.container); }, 1000);
                    } else {
                        thiss.tryReInstallation(data);
                    }
                }).catch((error) => {
                    thiss.tryReInstallation(data);
                });
            } else {
                thiss.tryReInstallation(data);
            }
        }).catch((error) => {
            thiss.tryReInstallation(data);
        });
    };

    this.tryReInstallation = function (err) {
        console.log(err);
        this.container.getElementsByClassName("card-body")[0].innerHTML = "<div class='text-danger py-3 text-center'><strong>Unable To Install Update.</strong></div>";
        var buttons = this.container.getElementsByTagName("button");
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].disabled) {
                buttons[i].disabled = false;
            }
        }
    };

    this.showUpdateBox = function (version, changes) {
        if (!this.is_gcp) {
            var install_button = `<button class="btn btn-success btn-block">Install&nbsp;Update</button>`;
        }
        else {
            let dependancy_update_url = `index.php?page=install_update_dependencies&after_update_redirect=${btoa(window.location.href)}`;
            var install_button = `<a href="${dependancy_update_url}" target="_blank"><button class="btn btn-success btn-block">Install&nbsp;Update</button></a>`;
        }

        var div = document.createElement("div");
        var html = `<div class="card shadow-lg">
                    <div class="card-header bg-success align-items-center text-white">New Update Available (Version: ${this.version})</div>
                    <div class="card-body p-0">
                        <div class="accordion" id="mlr_update_accordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="mlr_update_accordion_header_2">
                                    <button class="accordion-button fs-4 fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mlr_update_accordion_body_2" aria-expanded="false" aria-controls="mlr_update_accordion_body_2">Whats New In This Version?</button>
                                </h2>
                                <div id="mlr_update_accordion_body_2" class="accordion-collapse collapse" aria-labelledby="mlr_update_accordion_header_2" data-bs-parent="#mlr_update_accordion" style="">
                                    <div class="accordion-body">${this.changes}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                            <div class="row">
                                <div class='col text-left'>
                                    <button class="btn btn-warning btn-block" id="remind_later">Remind&nbsp;Later</button>
                                </div>
                                <div class='col text-right' id="update_button">
                                    ${install_button}
                                </div>
                            </div>
                    </div>
                </div>`;
        div.setAttribute("id", "mlrautoupdatediv");
        div.classList.add('position-fixed', 'bottom-0', 'end-0')
        div.innerHTML = html;
        document.body.appendChild(div);
        var thiss = this;
        div.querySelector("#update_button").onclick = function (e) {
            thiss.doDownload();
            e.target.disabled = true;
            div.querySelector("#remind_later").disabled = true;
        };
        div.querySelector("#remind_later").onclick = function () { thiss.remindLater(); };
        this.container = div;
        var active = 1;
        div.onclick = function () { active = 0; };
        // document.body.onclick = function () {
        //     if (active == 1) {
        //         document.body.removeChild(div);
        //     }
        //     else {
        //         active = 1;
        //     }
        // };
    };

    this.remindLater = function () {
        document.body.removeChild(this.container);
        axios.post("update", { "check_update": "install_later" }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRF-Token': this.__token
            }
        }).then((data) => { }).catch((error) => { });
    };
}