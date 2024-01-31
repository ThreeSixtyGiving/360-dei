.PHONY: default taxonomy-codelist

default: taxonomy-codelist

taxonomy-codelist: ./taxonomy/taxonomy.json
	@jq '[ .population_groups[].categories[] | {code,name,description}, (.sub_categories[]) ]' ./taxonomy/taxonomy.json | jq -r '["Code","Title","Description"],(.[] | [ .code, .name, .description ]) | @csv' > ./codelists/taxonomyCodes.csv
