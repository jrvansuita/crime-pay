import { RequestButton } from "./lib/request-button.js";
import { PlayerStatusUpdater } from "./player-status.js";

$(document).ready(function () {

    const onSuccess = (data) => {
        window.toast.success(data.message);
        new PlayerStatusUpdater(data.player).coins().bars()
    };


    new RequestButton('#regenerate', "/hospital-regenerate", onSuccess)

});
