Schema
======


.. warning::
    This is a work in progress. It has not been approved yet.


Schema
------

Overall schema
~~~~~~~~~~~~~~

There is a place to put the data for each question:

.. jsonschema:: ../schema/360-giving-schema-extension.json
  :collapse: dei/Q1,dei/Q2,dei/Q3

For each question
~~~~~~~~~~~~~~~~~

The JSON for each question has the same structure, which is:

.. jsonschema:: ../schema/360-giving-schema-extension.json
  :pointer: /definitions/DEI_Answer

asked_status values
~~~~~~~~~~~~~~~~~~~

The values in the `asked_status` property are:

.. csv-table:: askedStatus options
   :file: ../codelists/askedStatus.csv
   :header-rows: 1

Note every option starts with either:

- `NOT_ASKED` to indicate the question was not asked for some reason
- `ASKED` to indicate the question was asked at some point

This should make it easy to filter the data for only one of these 2 options.

available_options values
~~~~~~~~~~~~~~~~~~~~~~~~


The values in the `available_options` list property are:

.. csv-table:: availableOptions options
   :file: ../codelists/availableOptions.csv
   :header-rows: 1

reply_status values
~~~~~~~~~~~~~~~~~~~

The values in the `reply_status` property are:

.. csv-table:: reply_status options
   :file: ../codelists/replyStatus.csv
   :header-rows: 1

Note every option starts with either:

- `NO_REPLY` to indicate a reply was not received for some reason
- `REPLY` to indicate a reply was received at some point

This should make it easy to filter the data for only one of these 2 options.

codes values
~~~~~~~~~~~~

The values in the codes array are from the taxonomy, and must follow the rules explained there. :ref:`taxonomy`

JSON Schema
-----------

You can download `the JSON Schema merge file for the 360-giving-schema.json standard file <360-giving-schema-only-extension.json>`_.

You can download `the JSON Schema file 360-giving-schema.json with both elements from the standard and the extension <360-giving-schema-including-extension.json>`_.
