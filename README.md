# 360-dei

This is the repo for the DEI Extension for 360Giving

## Maintaining this extension

This section contains instructions on maintaining this extension,

### Generating the taxonomyCodes.csv codelist file from taxonomy.json

The DEI taxonomy codes are hierarchical and thus modelled using JSON (`taxonomy/taxonomy.json`), but this cannot be used for validation since codelist files must be in CSV format.

In order to avoid maintaining two separate copies of the taxonomy codes and keeping them in sync; it's better to generate the validation codelist (`codelists/taxonomyCodes.csv`) directly from the JSON file.

For simplicity, brevity, and speed, this is accomplished using [jq](https://jqlang.github.io/jq/) inside of the `Makefile`. Just run either `make` or `make taxonomy-codes` in your terminal when at the root of the repository. Historically, this was previously accomplished using a [python script](https://github.com/ThreeSixtyGiving/360-dei/commit/c5330dd078f5636cfbb15a8eb4b84bcef6437a07#diff-b27f53041b80d97ae35d861e86e9774a2f71bedf18eef3ff91ab66cc8155d1a3).

You can install jq easily on most systems, see the [download page](https://jqlang.github.io/jq/download/).

If the structure of the taxonomy JSON file changes, the jq command will need to be updated to match. If the location of the taxonomy JSON file changes, the Makefile will need to be updated to match.

```bash
jq '[ .population_groups[].categories[] | {code,name,description}, (.sub_categories[]) ]' ./taxonomy/taxonomy.json | jq -r '["Code","Title","Description"],(.[] | [ .code, .name, .description ]) | @csv' > ./codelists/taxonomyCodes.csv
```
