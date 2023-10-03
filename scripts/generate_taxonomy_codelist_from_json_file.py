#!/usr/bin/env python3

import os, json

SCRIPT_DIR = os.path.abspath(os.path.dirname(__file__))
TAXONOMY_DATA_FILE = "../taxonomy/taxonomy.json" # Path to file containing the taxonomy, relative to this script
TARGET_CODELIST_FILE = "../codelists/taxonomyCodes.csv" # Path to the target file where the codelist will be stored, relative to this script

CODELIST_FILE_HEADER = "Code,Title,Description"

def parse_taxonomy_data_from_file(taxonomy_file_path):

    with open(taxonomy_file_path, 'r') as taxonomy_file:
        return json.loads(taxonomy_file.read())

def generate_codelist_from_taxonomy_data(json_data):
    output = ""

    for entry in json_data['population_groups']:
        for category in entry['categories']:
            output += f"\n{category['code']},\"{category['name']}\",\"{category['description']}\""

            if len(category['sub_categories']) > 0:
                for subcategory in category['sub_categories']:
                    output += f"\n{subcategory['code']},\"{subcategory['name']}\",\"{subcategory['description']}\""

    return output

def write_codelist_to_file(codelist,target_file_path):

    with open(target_file_path, 'w') as codelist_file:
        codelist_file.write(CODELIST_FILE_HEADER)
        codelist_file.write(codelist)
        

write_codelist_to_file( generate_codelist_from_taxonomy_data( parse_taxonomy_data_from_file(os.path.join(SCRIPT_DIR,TAXONOMY_DATA_FILE)) ),
        os.path.join(SCRIPT_DIR, TARGET_CODELIST_FILE) )
