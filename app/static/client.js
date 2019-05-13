function showPicker() { $("#file-input").click(); }

function showPicked(input) {
    var reader = new FileReader();
    reader.onload = function (e) {
		$("#image-picked").attr("src", e.target.result);
		$("#image-picked").removeClass("d-none");
		clearProgress();
		clearAlert();
    }
    reader.readAsDataURL(input.files[0]);
}

function clearAlert() {
	$("#alert").addClass("d-none")
}

function showAlert(message) {
	$("#alert").html(message).removeClass("d-none");
}

function displayLoading() {
	$("#analyze-button-loading").removeClass("d-none");
	$("#analyze-button").addClass("d-none");
}

function hideLoading() {
	$("#analyze-button").removeClass("d-none");
	$("#analyze-button-loading").addClass("d-none");
}

function clearProgress() {
	setProgressValue($("#first"), "unknown", 0)
	setProgressValue($("#second"), "unknown", 0)
	setProgressValue($("#third"), "unknown", 0)
}

function setProgressValue(progressElement, predictedClass, predictionValue) {
	value = Math.round(predictionValue*100)
	progressElement.css("width", value+"%").attr("aria-valuenow", value);
	progressElement.html(predictedClass + " (" + value + "%)")
}

function analyze() {
	clearAlert();
	
    var uploadFiles = $("#file-input").prop("files");
    if (uploadFiles.length != 1) {
		showAlert("Please select 1 file to analyze!");
		return;
	}

    displayLoading();
    var xhr = new XMLHttpRequest();
    var loc = window.location
	
	if (loc.protocol=="file:") {
		showAlert("Can not analyze locally :-(");
		setTimeout(hideLoading, 2000);
		setProgressValue($("#first"), "Some Class", 0.98)
		setProgressValue($("#second"), "Other Class", 0.08)
		setProgressValue($("#third"), "Any Class", 0.01)
	} else {
		xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`, true);
		xhr.timeout = 5000; // timeout in ms
		xhr.onerror = function() {
			hideLoading();
			showAlert("Error sending request :-(");
		}
		xhr.ontimeout = function() {
			hideLoading();
			showAlert("Request timed out :-(");
		}
		xhr.onload = function(e) {
			if (this.readyState === 4) {
				if (this.status === 200) {
					var response = JSON.parse(e.target.responseText);
					setProgressValue($("#first"), response['scores'][0][0], response['scores'][0][1])
					setProgressValue($("#second"), response['scores'][1][0], response['scores'][1][1])
					if(response['scores'].length > 2) setProgressValue($("#third"), response['scores'][2][0], response['scores'][2][1])
				} else {
					showAlert(`Request failed: ${this.statusText}`);
				}
			}
			hideLoading();
		}
		var fileData = new FormData();
		fileData.append("file", uploadFiles[0]);
		xhr.send(fileData);
	}
}