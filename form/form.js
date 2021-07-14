class possible_answers_data {
    constructor(url, callback) {
        this.url = url;
        this.data = null;
    }
    start(callback) {
        var class_instance = this;
        $.ajax({
          method: "GET",
          url: this.url,
        })
        .done(function( msg ) {
          class_instance.data = msg;
          if (callback) {
            callback(this);
          }
        });
    }
    hasData() {
        return this.data != null;
    }
    getPopulationGroups() {
        return this.data['population_groups'];
    }
    getOtherCategoryInPopulationGroupPrefix(population_group_prefix) {
        for (let idx in this.data['population_groups']) {
            if (this.data['population_groups'][idx]['prefix'] == population_group_prefix) {
                for (let category_idx in this.data['population_groups'][idx]['categories']) {
                    let category = this.data['population_groups'][idx]['categories'][category_idx];
                    if (category['is_other_option_in_population_group']) {
                        return category;
                    }
                }
            }
        }
    }
}

class form {
    constructor(possible_answers_data, form_selector, form_element_prefix, css_id_prefix, on_data_change_callback, prefer_not_to_say_option_available, other_option_available) {
        this.possible_answers_data = possible_answers_data;
        this.form_selector = form_selector;
        this.form_element_prefix = form_element_prefix;
        this.css_id_prefix = css_id_prefix;
        this.on_data_change_callback = on_data_change_callback;
        this.prefer_not_to_say_option_available = prefer_not_to_say_option_available;
        this.other_option_available = other_option_available;
    }
    start() {
        // Handy vars
        let population_groups = this.possible_answers_data.getPopulationGroups();


        // Build HTML of form
        var html = '<div id="'+this.css_id_prefix+'_form" class="dei_form">';
        for (let idx in population_groups) {
            let population_group = population_groups[idx];

            html += '<div class="dei_form_population_group" id="'+this.css_id_prefix+'_population_group_'+population_group['prefix']+'">';
            html += '<label class="dei_form_population_group_label">';
            html += '<input type="checkbox">';
            html += escape_html(population_group['name']);
            html += '</label>';
            if (population_group['description']) {
                html += '<div class="dei_form_population_group_description">';
                html += escape_html(population_group['description']);
                html += '</div>';
            }
            if (population_group['categories']) {
                html += '<div class="dei_form_population_group_options">';
                if (!this.possible_answers_data.getOtherCategoryInPopulationGroupPrefix(population_group['prefix'])) {
                    // This is a special population group with no "other" option we can select by default for the user.
                    // So instead, we must have a warning ready to show them
                    html += '<div class="dei_form_must_select_one_in_population_group_warning">You must select one of the following options!</div>'
                }
                for (let category_idx in population_group['categories']) {
                    let category = population_group['categories'][category_idx];
                    html += '<div class="dei_form_category">';
                    html += '<label class="dei_form_category_label">';
                    html += '<input type="radio" name="'+this.form_element_prefix+population_group['prefix']+'" value="'+category['code']+'">';
                    html += escape_html(category['name']);
                    html += " ["+escape_html(category['code'])+"]";
                    html += '</label>';
                    if (category['description']) {
                        html += '<div class="dei_form_category_description">';
                        html += escape_html(category['description']);
                        html += '</div>';
                    }
                    if (category['sub_categories']) {
                        for (let sub_category_idx in category['sub_categories']) {
                            let sub_category = category['sub_categories'][sub_category_idx];
                            html += '<div class="dei_form_sub_category">';
                            html += '<label class="dei_form_sub_category_label">';
                            html += '<input type="radio" name="'+this.form_element_prefix+population_group['prefix']+'" value="'+sub_category['code']+'">';
                            html += escape_html(sub_category['name']);
                            html += " ["+escape_html(sub_category['code'])+"]";
                            html += '</label>';
                            if (sub_category['description']) {
                                html += '<div class="dei_form_sub_category_description">';
                                html += escape_html(sub_category['description']);
                                html += '</div>';
                            }
                            html += '</div>';
                        }
                    }
                    html += '</div>';
                }
                html += '</div>';
            }
            html += '</div>';
        }
        if (this.prefer_not_to_say_option_available) {
            html += '<div class="dei_form_prefer_not_to_say">';
            html += '<label class="dei_form_prefer_not_to_say_label">';
            html += '<input type="checkbox">';
            html += 'Prefer not to say';
            html += '</label>';
            html += '</div>';
        }
        if (this.other_option_available) {
            html += '<div class="dei_form_other">';
            html += '<label class="dei_form_other_label">';
            html += '<input type="checkbox">';
            html += 'Other';
            html += '</label>';
            html += '<textarea id="'+this.css_id_prefix+'_other_reason"></textarea>';
            html += '</div>';
        }
        html += '</div>';

        // Place Form
        $(this.form_selector).html(html);

        // Set up form
        var class_instance = this;
        if (this.prefer_not_to_say_option_available) {
            $('#'+this.css_id_prefix+'_form .dei_form_prefer_not_to_say_label input').change(
                function(event) {
                    class_instance.preferNotToSayChanged();
                }
            );
        }
        if (this.other_option_available) {
            $('#'+this.css_id_prefix+'_other_reason').hide();
            $('#'+this.css_id_prefix+'_form .dei_form_other_label input').change(
                function(event) {
                    class_instance.otherChanged();
                }
            );
            $('#'+this.css_id_prefix+'_form .dei_form_other textarea').change(
                function(event) {
                    class_instance.otherReasonChanged();
                }
            );
        }

        for (let idx in population_groups) {
            let population_group = population_groups[idx];
            // Bind actions to Form
            let selectors = [
                '#'+this.css_id_prefix+'_population_group_'+population_group['prefix'] + ' .dei_form_population_group_label input',
                '#'+this.css_id_prefix+'_population_group_'+population_group['prefix'] + ' .dei_form_category_label input',
                '#'+this.css_id_prefix+'_population_group_'+population_group['prefix'] + ' .dei_form_sub_category_label input',
            ];
            $(selectors.join(", ")).change(
                {
                    "prefix": population_group['prefix']
                },
                function(event) {
                    class_instance.populationGroupChanged(event.data['prefix']);
                }
            );
            // Initial State
            $('#'+this.css_id_prefix+'_population_group_'+population_group['prefix']+ ' .dei_form_population_group_options').hide();
        }
    }

    populationGroupChanged(prefix) {
        var population_group_element = $('#'+this.css_id_prefix+'_population_group_'+prefix+ ' .dei_form_population_group_label input');
        if (population_group_element.is(':checked')) {
            $('#'+this.css_id_prefix+'_population_group_'+prefix+ ' .dei_form_population_group_options').show();

            var cat_or_subcat_checked_elements = $('#'+this.css_id_prefix+'_population_group_'+prefix+ ' .dei_form_category input:checked');
            if (cat_or_subcat_checked_elements.length == 0) {
                let other_category = this.possible_answers_data.getOtherCategoryInPopulationGroupPrefix(prefix);
                if (other_category) {
                    $('#'+this.css_id_prefix+'_population_group_'+prefix+ ' input[name="'+this.form_element_prefix+prefix+'"][value="'+other_category['code']+'"]').attr(
                        'checked',
                        true
                    );
                } else {
                    // There is a special case; one population group without an other option.
                    // In this case, show the warning.
                    $('#'+this.css_id_prefix+'_population_group_'+prefix+ ' .dei_form_must_select_one_in_population_group_warning').show();
                }
            } else {
                $('#'+this.css_id_prefix+'_population_group_'+prefix+ ' .dei_form_must_select_one_in_population_group_warning').hide();
            }

        } else {
            $('#'+this.css_id_prefix+'_population_group_'+prefix+ ' .dei_form_population_group_options').hide();
        }
        if (this.on_data_change_callback) {
            this.on_data_change_callback();
        }
    }

    preferNotToSayChanged() {
        let val = $('#'+this.css_id_prefix+'_form .dei_form_prefer_not_to_say_label input').is(':checked');
        console.log(val);
        let selectors = [
                '#'+this.css_id_prefix+'_form .dei_form_population_group_label input',
                '#'+this.css_id_prefix+'_form .dei_form_category_label input',
                '#'+this.css_id_prefix+'_form .dei_form_sub_category_label input',
                '#'+this.css_id_prefix+'_form .dei_form_other_label input',
            ];
        if (val) {
            $(selectors.join(", ")).prop('disabled', true);
        } else {
            $(selectors.join(", ")).prop('disabled', false);
        }
        if (this.on_data_change_callback) {
            this.on_data_change_callback();
        }
    }

    otherChanged() {
        let val = $('#'+this.css_id_prefix+'_form .dei_form_other_label input').is(':checked');
        console.log(val);
        let selectors = [
                '#'+this.css_id_prefix+'_form .dei_form_population_group_label input',
                '#'+this.css_id_prefix+'_form .dei_form_category_label input',
                '#'+this.css_id_prefix+'_form .dei_form_sub_category_label input',
                '#'+this.css_id_prefix+'_form .dei_form_prefer_not_to_say_label input',
            ];
        if (val) {
            $(selectors.join(", ")).prop('disabled', true);
            $('#'+this.css_id_prefix+'_other_reason').show();
        } else {
            $(selectors.join(", ")).prop('disabled', false);
            $('#'+this.css_id_prefix+'_other_reason').hide();
        }
        if (this.on_data_change_callback) {
            this.on_data_change_callback();
        }
    }

    otherReasonChanged() {
        if (this.on_data_change_callback) {
            this.on_data_change_callback();
        }
    }

    getData() {
        // Prefer not to say
        let preferNotToSayVal = $('#'+this.css_id_prefix+'_form .dei_form_prefer_not_to_say_label input').is(':checked');
        if (preferNotToSayVal) {
            return {"reason_answer_not_given":"prefer_not_to_say_selected"}
        }
        // Other
        let otherVal = $('#'+this.css_id_prefix+'_form .dei_form_other_label input').is(':checked');
        if (otherVal) {
            return {
                "reason_answer_not_given":"other_selected",
                "other": $('#'+this.css_id_prefix+'_other_reason').val()
            }
        }
        // Get codes!
        let out = [];
        let population_groups = this.possible_answers_data.getPopulationGroups();
        for (let idx in population_groups) {
            let population_group = population_groups[idx];
            var population_group_element = $('#'+this.css_id_prefix+'_population_group_'+population_group['prefix']+ ' .dei_form_population_group_label input');
            if (population_group_element.is(':checked')) {
                var cat_or_subcat_checked_elements = $('#'+this.css_id_prefix+'_population_group_'+population_group['prefix']+ ' .dei_form_category input:checked');
                if (cat_or_subcat_checked_elements.length > 0) {
                    out.push(cat_or_subcat_checked_elements.attr('value'));
                }
            }
        }
        return {"codes": out}
    }
}


function escape_html(val) {
    return $("<div>").text(val).html();
}
