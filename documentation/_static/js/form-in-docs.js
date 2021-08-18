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
    codes = new possible_answers_data("taxonomy.json");
    codes.start(
        function() {
            $('#screenSetup').show();
        }
    )
});

function questionCallback() {
    $('#JSONOut').val(
        JSON.stringify(
            {
                'project': [ q1.getData() ],
                'recipientOrganization': [
                    {
                        'mission': [ q2.getData() ],
                        'leadership': [ q3.getData() ],
                    }
                ]
            },
            null,
            5
        )
    );
}