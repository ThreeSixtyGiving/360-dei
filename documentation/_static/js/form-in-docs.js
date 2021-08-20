class question {
    constructor(form, reasonForFormMissing) {
        this.form = form;
        this.reasonForFormMissing = reasonForFormMissing;
    }
    getData() {
        if (this.form) {
            return this.form.getData();
        } else {
            return {'asked_status': this.reasonForFormMissing }
        }
    }
}

let q1 = null;
let q2 = null;
let q3 = null;
let codes = null;

function setup() {
    // Change screen
    $('#screenSetup').hide();
    $('#screenForm').show();
    // Common options
    let PreferNotToSayAvailable = $('#setupForm [name="PreferNotToSay"]').val() == "1";
    let GeneralAvailable = $('#setupForm [name="General"]').val() == "1";
    let LivedExperienceAvailable = $('#setupForm [name="LivedExperience"]').val() == "1";
    let GeographyAvailable = $('#setupForm [name="Geography"]').val() == "1";
    let selectedAnswers = $('#setupForm [name="selected_answers"]').val();
    let answers = codes.getAnswers();
    for(let idx in answers) {
        codes.setPopulationGroup(
            answers[idx]['prefix'],
            $('#screenSetupClassificationOptions [value="'+answers[idx]['prefix']+'"]').is(':checked')
        );
    }
    if (selectedAnswers == 'population_groups') {
        codes.deselectAllCategoriesAndSubCategories();
    } else if (selectedAnswers == 'categories') {
        codes.deselectAllSubCategories();
    }
    // Q1
    let q1option = $('#setupForm [name="Q1"]').val();
    if (q1option.substring(0, 5) == "ASKED") {
        $('#Q1FormWrapper').show();
        q1 = new question(
            new form(codes, '#Q1Form', 'Q1-', 'formQ1-', questionCallback, PreferNotToSayAvailable, LivedExperienceAvailable, GeographyAvailable, GeneralAvailable, q1option),
            null
        );
        q1.form.start();
    } else {
        $('#Q1FormWrapper').hide();
        q1 = new question(null, q1option);
    }
    // Q2
    let q2option = $('#setupForm [name="Q2"]').val();
    if (q2option.substring(0, 5) == "ASKED") {
        $('#Q2FormWrapper').show();
        q2 = new question(
            new form(codes, '#Q2Form', 'Q2-', 'formQ2-', questionCallback, PreferNotToSayAvailable, LivedExperienceAvailable, GeographyAvailable, GeneralAvailable, q2option),
            null
        );
        q2.form.start();
    } else {
        $('#Q2FormWrapper').hide();
        q2 = new question(null, q2option);
    }
    // Q3
    let q3option = $('#setupForm [name="Q3"]').val();
    if (q3option.substring(0, 5) == "ASKED") {
        $('#Q3FormWrapper').show();
        q3 = new question(
            new form(codes, '#Q3Form', 'Q3-', 'formQ3-', questionCallback, PreferNotToSayAvailable, LivedExperienceAvailable, GeographyAvailable, GeneralAvailable, q3option),
            null
        );
        q3.form.start();
    } else {
        $('#Q3FormWrapper').hide();
        q3 = new question(null, q3option);
    }
    // Update JSON to initial state
    questionCallback();
}

$( document ).ready(function() {
    codes = new selected_possible_answers_data("taxonomy.json");
    codes.start(
        function() {
            // Hand change some taxonomy names for this form
            for (let idx in codes.data['population_groups']) {
                if (codes.data['population_groups'][idx]['prefix'] == 'DEI80') {
                    codes.data['population_groups'][idx]['name'] = "Northern Ireland: Community Background";
                }
            }
            // Add population groups to setup form
            let answers = codes.getAnswers();
            for(let idx in answers) {
                let checked = answers[idx]['prefix'] != 'DEI70' && answers[idx]['prefix'] != 'DEI80' ? ' checked' : '';
                $('#screenSetupClassificationOptions').append(
                    '<div><label><input type="checkbox" name="" value="'+answers[idx]['prefix']+'"'+checked+'> Include Population Group: '+answers[idx]['name']+'</label></div>'
                );
            }
            // Show setup form
            $('#screenSetup').show();
        }
    )
});

function questionCallback() {
    let data = {
        'project': [ q1.getData() ],
        'recipientOrganization': [
            {
                'mission': [ q2.getData() ],
                'leadership': [ q3.getData() ],
            }
        ]
    };
    data['project'][0]['dei_purposes'] = "A demo form";
    data['recipientOrganization'][0]['mission'][0]['dei_purposes'] = "A demo form";
    data['recipientOrganization'][0]['leadership'][0]['dei_purposes'] = "A demo form";
    $('#JSONOut').val(
        JSON.stringify(
            data,
            null,
            5
        )
    );
    delete data['project'][0]['dei_classification_available_options'];
    delete data['recipientOrganization'][0]['mission'][0]['dei_classification_available_options'];
    delete data['recipientOrganization'][0]['leadership'][0]['dei_classification_available_options'];
    $('#JSONOutSmaller').val(
        JSON.stringify(
            data,
            null,
            5
        )
    );
}