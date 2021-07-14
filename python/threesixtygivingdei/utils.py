import json
from .taxonomy import Taxonomy
import jsonmerge

def build_schema_file_with_codes(input_filename, output_filename, taxonomy_filename):
    with open(input_filename) as fp:
        schema = json.load(fp)
    taxonomy = Taxonomy(taxonomy_filename)
    codes = taxonomy.get_all_codes()

    def _check(schema_to_check):
        if schema_to_check.get("INSERT_ENUM_OF_ALL_CODES_HERE"):
            schema_to_check['enum'] = codes
            del schema_to_check['INSERT_ENUM_OF_ALL_CODES_HERE']
            return
        for k,v in schema_to_check.items():
            if isinstance(v, dict):
                _check(v)

    _check(schema)
    with open(output_filename, "w") as fp:
        json.dump(schema, fp, indent=4)


def build_schema_file_with_standard_and_extension(standard_schema_filename, extension_schema_filename, output_filename):
    with open(extension_schema_filename) as fp:
        extension_schema = json.load(fp)
    with open(standard_schema_filename) as fp:
        standard_schema = json.load(fp)
    out = jsonmerge.merge(standard_schema, extension_schema)
    with open(output_filename, "w") as fp:
        json.dump(out, fp, indent=4)
