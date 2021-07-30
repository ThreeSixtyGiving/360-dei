Schema
======


.. warning::
    This is a work in progress. It has not been approved yet.


Schema
------

Overall schema
~~~~~~~~~~~~~~

For each grant, there is a new key `beneficiaries`. This holds a list of data objects, which are defined in the next section.

Each grant can have multiple `recipientOrganization` objects. Each of those objects has 2 new keys.

* `mission`
* `leadership`

Both of these hold a list of data objects, which are defined in the next section.

Each data object in a list
~~~~~~~~~~~~~~~~~~~~~~~~~~

For each of the 3 places listed in the previous section, the JSON for each data object in the list has the same structure. This is:

.. jsonschema:: ../_compiled/360-giving-schema-only-extension.json
  :pointer: /properties/beneficiaries/items

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

Examples
--------

Not asked because not applicable
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A funder has decided that these questions are not applicable and has not asked them at all.

.. jsoninclude:: ../examples/not-asked-not-applicable.json
    :jsonpointer:


Asked after grant was made and no reply was received
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A funder has asked people it recently made grants to answer the DEI questions, but no reply has been received from the organisation.

.. jsoninclude:: ../examples/asked-after-no-reply-received.json
    :jsonpointer:


JSON Schema
-----------

You can download `the JSON Schema merge file for the 360-giving-schema.json standard file <360-giving-schema-only-extension.json>`_.

You can download `the JSON Schema file 360-giving-schema.json with both elements from the standard and the extension <360-giving-schema-including-extension.json>`_.
