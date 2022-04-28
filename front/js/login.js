import { Button } from "./lib/buttons.js";
import { Keep } from './lib/keep.js';
import { RequestButton } from "./lib/request-button.js";

$(document).ready(function () {
    const ethereum = window?.ethereum;
    const getKeepTag = () => { return window?.ethereum.selectedAddress + '-name' };
    const keep = new Keep(getKeepTag())

    const hasMetamask = ethereum?.isMetaMask ?? false;
    $(hasMetamask.if('#connect', '#play')).remove()
    $((!hasMetamask).if('#connect', '#play')).show()

    $('#player-wallet').text(ethereum?.selectedAddress).css('display', ethereum?.selectedAddress ? 'block' : 'none')
    $('#player-name').val(keep.get())

    new RequestButton('#play', "/login").setOnSuccess((player) => {
        console.log(player);
        keep.set(player.name, getKeepTag());
        window.location.replace("/robbery");
    }).onData(() => {
        return { wallet: ethereum.selectedAddress, name: $('#player-name').val() }
    }).onValidate(() => {
        requestMetamaskIfNeed()
        return !!ethereum.selectedAddress && !!$('#player-name').val();
    });

    new Button('#connect', () => {
        window.open('https://metamask.io', '_blank');
    });


});


function requestMetamaskIfNeed() {
    setTimeout(async () => {
        if (!ethereum.selectedAddress) {
            await ethereum.request({ method: 'eth_requestAccounts' });
            location.reload();
        }
    });
}