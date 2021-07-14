Form
====



Demo
----

.. raw:: html

    <div id="screenSetup" style="display: none; margin-bottom: 50px;">

        <h3>Setup</h3>

        <form onsubmit="setup(); return false;" id="setupForm">

            <label>
                Q1
                <select name="Q1">
                    <option value="ask" selected>Ask</option>
                    <option value="n/a">N/A</option>
                </select>
            </label>

            <label>
                Q2
                <select name="Q2">
                    <option value="ask" selected>Ask</option>
                    <option value="n/a">N/A</option>
                </select>
            </label>

            <label>
                Q3
                <select name="Q3">
                    <option value="ask" selected>Ask</option>
                    <option value="n/a">N/A</option>
                </select>
            </label>

            <label>
                Prefer not to say
                <select name="PreferNotToSay">
                    <option value="1">Option is available</option>
                    <option value="0">Option is not available</option>
                </select>
            </label>

            <label>
                Other
                <select name="Other">
                    <option value="1">Option is available</option>
                    <option value="0">Option is not available</option>
                </select>
            </label>

            <input type="submit" value="Show Form">

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
