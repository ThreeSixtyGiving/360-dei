Form
====



Demo
----

.. raw:: html

    <div id="screenSetup" style="display: none; margin-bottom: 50px;">

        <h3>Setup</h3>

        <form onsubmit="setup(); return false;" id="setupForm">

            <div>
                <label>
                    Q1
                    <select name="Q1">
                        <option value="NOT_ASKED_NOT_APPLICABLE">Not Asked Not Applicable</option>
                        <option value="NOT_ASKED_HISTORICAL_DATA">Not Asked Historical Data</option>
                        <option value="ASKED_DURING_APPLICATION" selected>Asked during the application process</option>
                        <option value="ASKED_AFTER_APPLICATION">Asked after the application process</option>
                    </select>
                </label>
            </div>

            <div>
                <label>
                    Q2
                    <select name="Q2">
                        <option value="NOT_ASKED_NOT_APPLICABLE">Not Asked Not Applicable</option>
                        <option value="NOT_ASKED_HISTORICAL_DATA">Not Asked Historical Data</option>
                        <option value="ASKED_DURING_APPLICATION" selected>Asked during the application process</option>
                        <option value="ASKED_AFTER_APPLICATION">Asked after the application process</option>
                    </select>
                </label>
            </div>

            <div>
                <label>
                    Q3
                    <select name="Q3">
                        <option value="NOT_ASKED_NOT_APPLICABLE">Not Asked Not Applicable</option>
                        <option value="NOT_ASKED_HISTORICAL_DATA">Not Asked Historical Data</option>
                        <option value="ASKED_DURING_APPLICATION" selected>Asked during the application process</option>
                        <option value="ASKED_AFTER_APPLICATION">Asked after the application process</option>
                    </select>
                </label>
            </div>

            <div>
                <label>
                    Geography
                    <select name="Geography">
                        <option value="1" selected>Option is available</option>
                        <option value="0">Option is not available</option>
                    </select>
                </label>
            </div>

            <div>
                <label>
                    Lived Experience
                    <select name="LivedExperience">
                        <option value="1" selected>Option is available</option>
                        <option value="0">Option is not available</option>
                    </select>
                </label>
            </div>

            <div>
                <label>
                    Prefer not to say (Not recommended)
                    <select name="PreferNotToSay">
                        <option value="1">Option is available</option>
                        <option value="0" selected>Option is not available</option>
                    </select>
                </label>
            </div>

            <div>
                <input type="submit" value="Show Form">
            </div>

        </form>


    </div>

    <div id="screenForm" style="display: none; margin-bottom: 50px;">

        <div id="Q1FormWrapper">
            <h3>Q1</h3>
            <div id="Q1Form">
            </div>
        </div>

        <div id="Q2FormWrapper">
            <h3>Q2</h3>
            <div id="Q2Form">
            </div>
        </div>

        <div id="Q3FormWrapper">
            <h3>Q3</h3>
            <div id="Q3Form">
            </div>
        </div>

        <h3>JSON</h3>
        <textarea id="JSONOut" disabled="true" style="width: 100%; height: 300px;"></textarea>

    </div>

    <link rel="stylesheet" href="form.css">
    <script src="form.js"></script>
    <script src="_static/js/form-in-docs.js"></script>
