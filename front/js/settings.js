$(document).ready(() => {

    const onSuccess = () => {
        PlayerStatusUpdater.reload();
    }

    new RequestButton('#reset', "/settings-reset", onSuccess).bindClick().delayed();
    new RequestButton('#prisoner', "/settings-reset-prisoner", onSuccess).bindClick().delayed();
    new RequestButton('#reset-10', "/settings-reset", onSuccess).putData({ multiplier: 10 }).bindClick().delayed();
    new RequestButton('#reset-100', "/settings-reset", onSuccess).putData({ multiplier: 100 }).bindClick().delayed();
    new RequestButton('#reset-1000', "/settings-reset", onSuccess).putData({ multiplier: 1000 }).bindClick().delayed();
});