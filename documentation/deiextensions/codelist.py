
import json
import os
from sphinx.directives.code import LiteralInclude

from docutils.parsers.rst import Directive, directives
from docutils import nodes
from myst_parser.main import to_docutils


taxonomy_data_file = os.path.join(
    os.path.dirname(os.path.realpath(__file__)),
    "..",
    "..",
    "taxonomy",
    "taxonomy.json"
)
with open(taxonomy_data_file) as fp:
    TAXONOMY_DATA = json.load(fp)



class DEITaxonomy(LiteralInclude):
    headers = ['Category', 'Name','Description', 'Sub-Category', 'Name','Description', ]
    widths = [1, 1, 1, 1, 1,1]
    option_spec = {
        'prefix': directives.unchanged,
    }

    def run(self):
        prefix = self.options['prefix']
        data = [i for i in TAXONOMY_DATA['population_groups'] if i['prefix'] == prefix]
        if data:
            return [self.table(data[0])]
        else:
            return []

    def table(self, data):
        tgroup = nodes.tgroup(cols=len(self.headers))
        for width in self.widths:
            tgroup += nodes.colspec(colwidth=width)

        table = nodes.table('', tgroup)
        header_row = nodes.row()
        for header in self.headers:
            header_row += self.cell(header, source='sphinxcontrib-jsonschema')

        tgroup += nodes.thead('', header_row)
        tbody = nodes.tbody()
        tgroup += tbody

        for category in data['categories']:
            row = nodes.row()
            row += self.cell(category['code'])
            row += self.cell(category['name'])
            row += self.cell(category['description'])
            row += self.cell('')
            row += self.cell('')
            row += self.cell('')
            tbody += row
            for sub_category in category['sub_categories']:
                row = nodes.row()
                row += self.cell('')
                row += self.cell('')
                row += self.cell('')
                row += self.cell(sub_category['code'])
                row += self.cell(sub_category['name'])
                row += self.cell(sub_category['description'])
                tbody += row

        return table


    def cell(self, text, morecols=0, source=None):
        entry = nodes.entry(morecols=morecols)
        if not isinstance(text, str):
            text = str(text)

        for child in to_docutils(text).children[:]:
            child.source = source
            entry += child
        return entry

def setup(app):
    app.add_directive('dei_taxonomy', DEITaxonomy)




