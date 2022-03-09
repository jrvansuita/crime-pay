
$(document).ready(function () {
    new RobberyLayoutManager().reloadPlaces();
});

class RobberyLayoutManager {

    getPlaceItemsHolders() {
        return $(".robbery-places-holder .robbery-place-item-ph");
    }

    getPlaceItems() {
        return $(".robbery-places-holder .robbery-place-item");
    }

    getPlacesHolder() {
        return $(".robbery-places-holder");
    }

    getFormHolder() {
        return $(".robbery-form-holder");
    }

    getFormPlaceHolder() {
        return $(".robbery-form-placeholder");
    }

    getResultHolder() {
        return $(".robbery-result-holder");
    }

    onBeginLoadPlaces() {
        this.getPlaceItems().remove();
        this.getPlaceItemsHolders().show();

        this.getFormPlaceHolder().show();
        this.getFormHolder().hide();
    }

    onTerminateLoadPlaces() {
        this.getPlaceItemsHolders().hide();
        this.getPlaceItems().hide().fadeIn();

        this.getFormPlaceHolder().hide();
        this.getFormHolder().hide().fadeIn();;
    }

    reloadPlaces() {
        this.onBeginLoadPlaces();

        setTimeout(() => {
            this.getPlacesHolder().load("/robbery-places", () => {
                this.onTerminateLoadPlaces();
                this.getPlaceItems().on("click", this.onRobberyPlaceItemSelected());

                //Select the last place clicked or the first one
                this.getPlaceItems().first().add("[data-key='" + lastSelectedPlaceId + "']").last().click();
            });
        }, 800);
    }

    onRobberyPlaceItemSelected() {
        const _this = this;
        return function () {
            _this.getPlaceItems().removeClass('selected');
            var placeId = $(this).addClass('selected').data('key');
            lastSelectedPlaceId = placeId;

            _this.getFormHolder().load("/robbery-form?_id=" + placeId, function () {
                _this.getFormHolder().hide().fadeIn();

                _this.getFormHolder().data('place', placeId)
                $('#robbery-submit').click(_this.onRobberyPlaceSubmit());
            });
        }
    }

    onRobberyPlaceSubmitButtonPressed() {
        $('#robbery-submit').attr('disabled', '');
        $('#robbery-submit .no-display').css('display', 'inherit');
        $('#robbery-submit .robbery-submit-text').hide();
    }

    onRobberyPlaceSubmit() {
        const _this = this;
        return () => {
            this.onRobberyPlaceSubmitButtonPressed();

            setTimeout(() => {
                $.post("/robbery-submit", { placeId: _this.getFormHolder().data('place') }).done((data) => {
                    $('#result-police').hide();

                    _this.reloadPlaces();

                    _this.updateRobberyResult(data.result)
                    _this.updateThiedStatus(data.thief);
                });
            }, 2000);
        }
    }

    updateRobberyResult(result) {
        var sign = n => { return n > 0 ? '+ ' + n : n }
        $('#result-info').hide().fadeIn();
        $('#result-info .card-text').text(result.msg)

        $('#result-coins').text(sign(result.coins)).parent().toggle(!!result.coins);
        $('#result-respect').text(sign(result.respect)).parent().toggle(!!result.respect);
        $('#result-intelligence').text(sign(result.intelligence));
        $('#result-dexterity').text(sign(result.dexterity));
        $('#result-strength').text(sign(result.strength));
    }

    updateThiedStatus(thief) {
        $('#coins').text(thief.coins);
        $('#stamina-percent').text(thief.stamina + '%');
        $('#stamina').css('width', thief.stamina + '%').attr('aria-valuenow', thief.stamina);

        $('#intelligence').text(thief.intelligence);
        $('#dexterity').text(thief.dexterity);
        $('#strength').text(thief.strength);
    }
}

