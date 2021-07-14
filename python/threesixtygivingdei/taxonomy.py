import json


class Taxonomy:

    def __init__(self, taxonomy_file_name):
        with open(taxonomy_file_name) as fp:
            self.taxonomy = json.load(fp)

    def get_all_codes(self):
        out = []
        for population_group in self.taxonomy.get('population_groups', []):
            for category in population_group.get('categories'):
                out.append(category.get('code'))
                for sub_category in population_group.get('sub_categories', []):
                    out.append(sub_category.get('code'))
        return out


