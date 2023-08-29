Reference
=========

The DEI Extension for 360Giving defines new properties and structures for use within 360Giving, for the purpose of publishing data using the DEI Data Standard within a 360Giving grants file.

If you are not yet familiar with the 360Giving Data Standard, you should review its [documentation](https://standard.threesixtygiving.org/en/latest/technical/reference/) before reading this page.


## Extension Structure Overview

The DEI Extension uses reusable definitions as much as possible, in order to simplify its structure. The extension adds three new objects: `DEIDetails`, `DEIApplicationArea`, and `DEIResponse`.

The DEI Extension also adds a number of new codelists to validate the contents of various properties.

The DEI Extension adds a new property called `deiDetails` to each grant, which is an object of type `DEIDetails`. Inside `deiDetails` there are three properties: `leadership`, `mission`, and `project`. Each of thse are of the type `DEIApplicationArea`. These represent the application areas of the DEI data standard for grantmaking.

Inside `DEIApplicationArea` are some properties used to represent whether a question was asked (and how), as well as an object containing the response to that question, with the type of `DEIResponse`.

Therefore you can think of the extension structure as follows:

* grants (from [360Giving](https://standard.threesixtygiving.org/en/latest/_static/docson/index.html#../../_static/360-giving-schema.json$$expand))
  * deiDetails (a DEIDetails object)
    * `leadership` (a `DEIApplicationArea` object)
      * `response` (a `DEIResponse` object)
      * Other properties
    * `mission` (a `DEIApplicationArea` object)
      * `response` (a `DEIResponse` object)
      * Other properties
    * project (a `DEIApplicationArea` object)
      * `response` (a `DEIResponse` object)
      * Other properties



## Schema

These is an overview of the extension schema structures.

```{eval-rst}
.. jsonschema:: ../_compiled/360-giving-schema-only-extension.json
```

## Codelists

The extension adds several codelists to promote interoperability between datasets. These are all **closed codelists**, meaning that only values from the codelists may be used.


### Asked Status

```{eval-rst}
.. csv-table:: askedstatus options
   :file: ../codelists/askedStatus.csv
   :header-rows: 1
```

### Available Options

```{eval-rst}
.. csv-table:: availableOptions options
   :file: ../codelists/availableOptions.csv
   :header-rows: 1
```

### Reply Status

```{eval-rst}
.. csv-table:: replyStatus options
   :file: ../codelists/replyStatus.csv
   :header-rows: 1
```

### Taxonomy Codes

The Single Source of Truth (SSOT) for the DEI Taxonomy codes vocabulary is the [DEI Data Standard](https://www.funderscollaborativehub.org.uk/collaborations/dei-data-standard). The DEI Extension for 360Giving takes the vocabulary/codes provided in the DEI Data Standard and encodes it into a JSON file named `taxonomy.json` which represents the taxonomy (available for view and download on the [Taxonomy page](taxonomy)). The `taxonomy.json` file preserves the hierarchical nature of the taxonomy and aims to provide a general-purpose machine-readable form of the taxonomy.

In order to validate the contents of the response codes inside the DEIResponse/taxonomyCodes field, we generate this codelist directly from the `taxonomy.json` file. You should therefore treat this codelist as a reference for validation purposes only. If there are differences between this and the codes available in the official taxonomy, please get in touch with us so that we can update this codelist.

```{eval-rst}
.. csv-table:: taxonomyCodes options
   :file: ../codelists/taxonomyCodes.csv
   :header-rows: 1
```
