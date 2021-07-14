Schema
======

Schema
------

There is a place to put the data for each question:

.. jsonschema:: ../schema/360-giving-schema-extension.json
  :collapse: dei/Q1,dei/Q2,dei/Q3

The JSON for each question has the same structure, which is:

.. jsonschema:: ../schema/360-giving-schema-extension.json
  :pointer: /definitions/DEI_Answer

The values in the codes array are from the taxonomy, and must follow the rules explained there. :ref:`taxonomy`

JSON Schema
-----------

You can download `the JSON Schema merge file for the 360-giving-schema.json standard file <360-giving-schema-only-extension.json>`_.

You can download `the JSON Schema file 360-giving-schema.json with both elements from the standard and the extension <360-giving-schema-including-extension.json>`_.
