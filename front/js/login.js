import { Button } from "./lib/buttons.js";
import { FormControl } from "./lib/form-control.js";

$(document).ready(function () {
    loadPlayerLoginForm();
});

function getWalletAddress() {
    return window?.ethereum?.selectedAddress;
}

function loadPlayerLoginForm() {

    new FormControl("/login-form")
        .bind(".login-form-holder", ".login-form-placeholder")
        .setData({ wallet: 'x' + getWalletAddress() })
        .addAction('#play', "/login", () => {
            window.location.replace("/robbery");
        }).onData(() => {
            return { wallet: getWalletAddress(), name: $('#player-name').val() }
        }).onValidate(() => {
            requestMetamaskIfNeed()
            return $('#player-wallet').text() && $('#player-name').val();
        })
        .show()
        .load(onRefreshForm)
}

function onRefreshForm() {
    const ethereum = window?.ethereum;
    const hasMetamask = ethereum?.isMetaMask ?? false;

    $('#player-wallet').text(ethereum?.selectedAddress).css('display', hasMetamask && getWalletAddress() ? 'block' : 'none');

    $(hasMetamask.if('#connect', '#play')).remove()
    $((!hasMetamask).if('#connect', '#play')).show()

    new Button('#connect', () => {
        window.open('https://metamask.io', '_blank');
    });
}


function requestMetamaskIfNeed() {
    setTimeout(async () => {
        if (!ethereum.selectedAddress) {
            await ethereum.request({ method: 'eth_requestAccounts' });
            location.reload();
        }
    });
}