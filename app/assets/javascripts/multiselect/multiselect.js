(function () {
    function getValuesFrom(selector) {
        const options = Array.from(selector.querySelectorAll('option'));

        return options.map((opt) => {
            const selected = ko.observable(opt.selected);

            selected.subscribe((newValue) => {
                opt.selected = newValue;
            });
            return {
                label: opt.textContent,
                value: opt.value,
                selected
            }
        });
    }

    function htmlToElement(html) {
        const template = document.createElement('template');

        template.innerHTML = html.trim();
        return template.content.firstChild;
    }

    window.osMultiSelect = function (originalSelector) {
        const filter = ko.observable('');
        const options = ko.observableArray(getValuesFrom(originalSelector));
        const selections = ko.pureComputed(() =>
            options().filter((opt) => Boolean(opt.selected()))
        );
        const vm = {
            options,
            name: 'subject',
            prompt: 'Select one or more',
            filter,
            clearFilter() {
                filter('');
            },
            selections,
            filteredOptions: ko.pureComputed(
                () => options().filter(
                    (opt) => !selections().includes(opt)
                )
            ),
            addSelection(item) {
                item.selected(true);
            }
        };
        const container = htmlToElement(`
            <div class="os-multiselect">
                <label data-bind="text:prompt"></label>
                <div class="selections-and-filter">
                    <ms-selections params="selections: selections"></ms-selections>
                    <input type="text" class="filter" data-bind="textInput: filter">
                    <span class="clear-filter" role="button" data-bind="click: clearFilter">
                        &times;
                    </span>
                </div>
                <ms-filtered-results params="options: filteredOptions, filter: filter, onClick: addSelection"></ms-filtered-results>
            </div>
        `);

        originalSelector.parentNode.insertBefore(container, originalSelector);
        originalSelector.style.display = 'none';
        ko.applyBindings(vm, container);
    };
}());
