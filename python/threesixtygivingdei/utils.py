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
        input_filename=os.path.join(root_dir, "schema", "360-giving-schema.json"),
        codelist_base_directory=os.path.join(root_dir, "codelists")
    )
    schema = ctjs.get()

    ctjs_definition_organisation = CompileToJsonSchema(
        input_schema=copy.deepcopy(schema['definitions']['Organization']),
        codelist_base_directory=os.path.join(root_dir, "codelists")
    )
    schema['definitions']['Organization'] = ctjs_definition_organisation.get()

    del schema['definitions']['DEI_Answer']
    del schema['definitions']['DEI_Classification']

    with open(os.path.join(root_dir, "_compiled",  "360-giving-schema-only-extension.json"), "w") as fp:
        json.dump(schema, fp, indent=4)

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
            rollup=True,
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


def build_schema_file_with_standard_and_extension(standard_schema_filename, extension_schema_filename, output_filename):
    with open(extension_schema_filename) as fp:
        extension_schema = json.load(fp)
    with open(standard_schema_filename) as fp:
        standard_schema = json.load(fp)
    out = jsonmerge.merge(standard_schema, extension_schema)
    with open(output_filename, "w") as fp:
        json.dump(out, fp, indent=4)
