360Giving DEI Extension
===========================================

This is the documentation site for the DEI Extension for 360Giving. The DEI Extension is an extension to the 360Giving Data Standard which will support you validating and publishing data using the [Diversity, Equality, and Inclusion (DEI) Data Standard](https://www.funderscollaborativehub.org.uk/dei-data-standard) inside of your [360Giving Data](https://standard.threesixtygiving.org/en/latest/#).

The DEI Data Standard is developed and maintained by the DEI Data Group. The 360Giving Data Standard is developed and maintained by [360Giving](https://www.threesixtygiving.org/).

This DEI Extension for 360Giving is developed and maintained by 360Giving as a response to the publication of the DEI Data Standard.

## Governance and Versioning

As an extension to the 360Giving standard, the DEI Extension for 360Giving is not tied directly to the governance process of the 360Giving standard itself.

We will strive to maintain compatibility with the latest release of 360Giving. We envision that this is a straightforward process, as the design of the DEI Extension is such that its footprint is limited to the `deiDetails` field. Any changes to 360giving should not directly affect the DEI Extension.

Similarly, we will strive to maintain compatibility with the DEI Standard itself. We will do this by issuing updates to the DEI Extension to bring it in line with the taxonomy structure and codes included in the DEI Data Standard, as well as any guidance about how to apply this to grantmaking. From the perspective of the DEI Extension for 360Giving we anticipate that this mostly means updating our codelists to match the DEI Data Standard taxonomies, however it may also entail some other structural changes.

We will use semantic versioning to version this extension: MAJOR updates will not be compatible with previous versions of the extension, MINOR updates will add new features that are backwards compatible, and PATCH updates will fix bugs and amend documentation. This version number is separate from each: the version number of the 360Giving Data Standard; and the version number of the DEI Data Standard.

```{eval-rst}
.. toctree::
   :maxdepth: 2

   reference
   examples
   taxonomy
   form
   spreadsheet
```
