import json
from .taxonomy import Taxonomy
import jsonmerge
import os
import flattentool
from compiletojsonschema.compiletojsonschema import CompileToJsonSchema
import copy

def compile():
    root_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)),"..","..")

    # Compile Schema to add in codelists
    ctjs = CompileToJsonSchema(
        input_filename=os.path.join(root_dir, "schema", "360-giving-schema-extension.json"),
        codelist_base_directory=os.path.join(root_dir, "codelists")
    )
    schema = ctjs.get()

    ctjs_definition_organisation = CompileToJsonSchema(
        input_schema=copy.deepcopy(schema['definitions']['Organization']),
        codelist_base_directory=os.path.join(root_dir, "codelists")
    )
    schema['definitions']['Organization'] = ctjs_definition_organisation.get()

    del  schema['definitions']['DEI_Answer']

    # Add in our taxonomy codes
    build_schema_file_with_bits_copied_from_standard(
        standard_schema_filename=os.path.join(root_dir, "standard", "schema", "360-giving-schema.json"),
        schema=schema,
        output_filename=os.path.join(root_dir, "_compiled",  "360-giving-schema-only-extension.json"),
    )

    # Build one schema file with standard AND extensions
    build_schema_file_with_standard_and_extension(
        standard_schema_filename=os.path.join(root_dir, "standard", "schema", "360-giving-schema.json"),
        extension_schema_filename=os.path.join(root_dir, "_compiled", "360-giving-schema-only-extension.json"),
        output_filename=os.path.join(root_dir, "_compiled",   "360-giving-schema-including-extension.json"),
    )

    # Make Spreadsheets of the standard and extension
    for output_format in ['xlsx']:
        flattentool.create_template(
            root_id='',
            output_format=output_format,
            output_name=os.path.join(root_dir, "_compiled", "360-giving-schema-fields." + output_format),
            schema=os.path.join(root_dir, "_compiled", "360-giving-schema-including-extension.json"),
            main_sheet_name='grants',
        )

        flattentool.create_template(
            root_id='',
            output_format=output_format,
            output_name=os.path.join(root_dir, "_compiled", "360-giving-schema-titles." + output_format),
            schema=os.path.join(root_dir, "_compiled", "360-giving-schema-including-extension.json"),
            main_sheet_name='grants',
            rollup=True,
            use_titles=True,
        )



def build_schema_file_with_bits_copied_from_standard(standard_schema_filename, schema, output_filename):
    with open(standard_schema_filename) as fp:
        standard_schema = json.load(fp)

    def _check(schema_to_check):
        if schema_to_check.get("INSERT_LOCATION_BLOCK_AS_ITEMS_HERE"):
            schema_to_check['items'] = standard_schema['definitions']['Location']
            del schema_to_check['INSERT_LOCATION_BLOCK_AS_ITEMS_HERE']
            return
        if schema_to_check.get("INSERT_CLASSIFICATION_BLOCK_AS_ITEMS_HERE"):
            schema_to_check['items'] = standard_schema['definitions']['Classification']
            del schema_to_check['INSERT_CLASSIFICATION_BLOCK_AS_ITEMS_HERE']
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
