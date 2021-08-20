Spreadsheet
===========


.. warning::
    This is a work in progress. It has not been approved yet.


Templates
---------

You can download `a spreadsheet template with field names <360-giving-schema-fields.xlsx>`_.

You can download `a spreadsheet template with titles <360-giving-schema-titles.xlsx>`_.



Unflattening
------------

**EXAMPLE IN PROGRESS**

Open the spreadsheet template including field names.

In the `grants` tab, add a row with:

* `id`=`grant1`
* `project/0/dei_asked_status`=`ASKED_DURING_APPLICATION`
* `project/0/dei_available_options`=`TAXONOMY,GEOGRAPHY,LIVED_EXPERIENCE`
* `project/0/dei_reply_status`=`REPLY_GOT`
* `project/0/classification_entered`=`Specifically people with Autism`
* `project/0/location/0/description`=`Everywhere`

In the `pro_classification` tab, add a row with:

* `id`=`grant1`
* `project/0/classification/0/vocabulary`=`DEI`
* `project/0/classification/0/code`=`DEI020330`

Then run: `flatten-tool unflatten -o data.json -f xlsx  spreadsheet.xlsx`

**EXAMPLE IN PROGRESS**
