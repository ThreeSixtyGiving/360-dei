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
    constructor(
        possible_answers_data,
        form_selector,
        form_element_prefix,
        css_id_prefix,
        on_data_change_callback,
        prefer_not_to_say_option_available,
        lived_experience_option_available,
        geography_option_available,
        general_option_available,
        asked_status
    ) {
        this.possible_answers_data = possible_answers_data;
        this.form_selector = form_selector;
        this.form_element_prefix = form_element_prefix;
        this.css_id_prefix = css_id_prefix;
        this.on_data_change_callback = on_data_change_callback;
        this.prefer_not_to_say_option_available = prefer_not_to_say_option_available;
        this.lived_experience_option_available = lived_experience_option_available;
        this.geography_option_available = geography_option_available;
        this.general_option_available = general_option_available;
        this.asked_status = asked_status;
    }
    start() {
        // Handy vars
        let population_groups = this.possible_answers_data.getPopulationGroups();


        // Build HTML of form
        var html = '<div id="'+this.css_id_prefix+'_form" class="dei_form">';

        // Geography
        if (this.geography_option_available) {
            html += '<div class="dei_form_geography">';
            html += '<label class="dei_form_geography_label">';
            html += '<input type="checkbox">';
            html += 'Geography';
            html += '</label>';
            html += '<textarea id="'+this.css_id_prefix+'_geography_value"></textarea>';
            html += '</div>';
        }

        // Taxonomy
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
        if (this.lived_experience_option_available) {
            html += '<div class="dei_form_lived_experience">';
            html += '<label class="dei_form_lived_experience_label">';
            html += '<input type="checkbox">';
            html += 'Lived Experience';
            html += '</label>';
            html += '<textarea id="'+this.css_id_prefix+'_lived_experience_value"></textarea>';
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
        if (this.general_option_available) {
            html += '<div class="dei_form_general">';
            html += '<label class="dei_form_general_label">';
            html += '<input type="checkbox">';
            html += 'This is general and is not aimed at or consists of a specific group of people';
            html += '</label>';
            html += '</div>';
        }
        console.log(this.general_option_available);
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
        if (this.general_option_available) {
            $('#'+this.css_id_prefix+'_form .dei_form_general_label input').change(
                function(event) {
                    class_instance.generalChanged();
                }
            );
        }
        if (this.lived_experience_option_available) {
            $('#'+this.css_id_prefix+'_lived_experience_value').hide();
            $('#'+this.css_id_prefix+'_form .dei_form_lived_experience_label input').change(
                function(event) {
                    class_instance.livedExperienceChanged();
                }
            );
            $('#'+this.css_id_prefix+'_form .dei_form_lived_experience textarea').on("keyup change",
                function(event) {
                    class_instance.livedExperienceValueChanged();
                }
            );
        }
        if (this.geography_option_available) {
            $('#'+this.css_id_prefix+'_geography_value').hide();
            $('#'+this.css_id_prefix+'_form .dei_form_geography_label input').change(
                function(event) {
                    class_instance.geographyChanged();
                }
            );
            $('#'+this.css_id_prefix+'_form .dei_form_geography textarea').on("keyup change",
                function(event) {
                    class_instance.geographyValueChanged();
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
        let selectors = [
                '#'+this.css_id_prefix+'_form .dei_form_geography_label input',
                '#'+this.css_id_prefix+'_form .dei_form_population_group_label input',
                '#'+this.css_id_prefix+'_form .dei_form_category_label input',
                '#'+this.css_id_prefix+'_form .dei_form_sub_category_label input',
                '#'+this.css_id_prefix+'_form .dei_form_lived_experience_label input',
                '#'+this.css_id_prefix+'_form .dei_form_general_label input',
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

    generalChanged() {
        let val = $('#'+this.css_id_prefix+'_form .dei_form_general_label input').is(':checked');
        let selectors = [
                '#'+this.css_id_prefix+'_form .dei_form_geography_label input',
                '#'+this.css_id_prefix+'_form .dei_form_population_group_label input',
                '#'+this.css_id_prefix+'_form .dei_form_category_label input',
                '#'+this.css_id_prefix+'_form .dei_form_sub_category_label input',
                '#'+this.css_id_prefix+'_form .dei_form_lived_experience_label input',
                '#'+this.css_id_prefix+'_form .dei_form_prefer_not_to_say_label input',
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

    livedExperienceChanged() {
        let val = $('#'+this.css_id_prefix+'_form .dei_form_lived_experience_label input').is(':checked');
        if (val) {
            $('#'+this.css_id_prefix+'_lived_experience_value').show();
        } else {
            $('#'+this.css_id_prefix+'_lived_experience_value').hide();
        }
        if (this.on_data_change_callback) {
            this.on_data_change_callback();
        }
    }

    livedExperienceValueChanged() {
        if (this.on_data_change_callback) {
            this.on_data_change_callback();
        }
    }

    geographyChanged() {
        let val = $('#'+this.css_id_prefix+'_form .dei_form_geography_label input').is(':checked');
        if (val) {
            $('#'+this.css_id_prefix+'_geography_value').show();
        } else {
            $('#'+this.css_id_prefix+'_geography_value').hide();
        }
        if (this.on_data_change_callback) {
            this.on_data_change_callback();
        }
    }

    geographyValueChanged() {
        if (this.on_data_change_callback) {
            this.on_data_change_callback();
        }
    }

    getData() {
        let out = {
            "dei_asked_status": this.asked_status,
            "dei_available_options": ["TAXONOMY"],
            "dei_reply_status": "REPLY_GOT"
        }
        if (this.prefer_not_to_say_option_available) {
            out['dei_available_options'].push('PREFER_NOT_TO_SAY');
        }
        if (this.lived_experience_option_available) {
            out['dei_available_options'].push('LIVED_EXPERIENCE');
        }
        if (this.geography_option_available) {
            out['dei_available_options'].push('GEOGRAPHY');
        }
        if (this.general_option_available) {
            out['dei_available_options'].push('GENERAL');
        }

        // Prefer not to say (This rules out all other options, so do this early and return straight away if so)
        if (this.prefer_not_to_say_option_available) {
            let preferNotToSayVal = $('#'+this.css_id_prefix+'_form .dei_form_prefer_not_to_say_label input').is(':checked');
            if (preferNotToSayVal) {
                out['reply_status'] = 'REPLY_PREFER_NOT_TO_SAY';
                return out;
            }
        }

        // General (This rules out all other options, so do this early and return straight away if so)
        if (this.general_option_available) {
            let generalVal = $('#'+this.css_id_prefix+'_form .dei_form_general_label input').is(':checked');
            if (generalVal) {
                out['reply_status'] = 'REPLY_GENERAL';
                return out;
            }
        }

        // Lived Experience
        if (this.lived_experience_option_available) {
            let livedExperience = $('#'+this.css_id_prefix+'_form .dei_form_lived_experience_label input').is(':checked');
            let livedExperienceValue = $('#'+this.css_id_prefix+'_lived_experience_value').val();
            if (livedExperience && livedExperienceValue) {
                out['classification_entered'] = [livedExperienceValue];
            }
        }

        // Geography
        if (this.geography_option_available) {
            let geography = $('#'+this.css_id_prefix+'_form .dei_form_geography_label input').is(':checked');
            let geographyValue = $('#'+this.css_id_prefix+'_geography_value').val();
            if (geography && geographyValue) {
                out['location'] = [ { "description":geographyValue} ];
            }
        }

        // Get codes!
        let codes_out = [];
        let population_groups = this.possible_answers_data.getPopulationGroups();
        for (let idx in population_groups) {
            let population_group = population_groups[idx];
            var population_group_element = $('#'+this.css_id_prefix+'_population_group_'+population_group['prefix']+ ' .dei_form_population_group_label input');
            if (population_group_element.is(':checked')) {
                var cat_or_subcat_checked_elements = $('#'+this.css_id_prefix+'_population_group_'+population_group['prefix']+ ' .dei_form_category input:checked');
                if (cat_or_subcat_checked_elements.length > 0) {
                    codes_out.push({"vocabulary":"DEI", "code":cat_or_subcat_checked_elements.attr('value')});
                }
            }
        }
        out['classification'] = codes_out;

        return out;
    }
}


function escape_html(val) {
    return $("<div>").text(val).html();
}
